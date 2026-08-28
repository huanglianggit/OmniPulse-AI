/**
 * OmniPulse AI - Main Application Controller
 * Handles UI interactions, tab routing, dataset updates, chart re-renders, and exports.
 */

import { PRESET_SCENARIOS, generateCustomScenario } from './presetData.js';
import { ChartEngine } from './charts.js';
import { AgentSwarmEngine } from './agentEngine.js';

export const PROVIDER_PRESETS = {
  deepseek: {
    name: "DeepSeek",
    base: "https://api.deepseek.com/v1",
    models: [
      { id: "deepseek-chat", name: "deepseek-chat (DeepSeek-V3 推荐)" },
      { id: "deepseek-reasoner", name: "deepseek-reasoner (DeepSeek-R1 深度推理)" }
    ]
  },
  openai: {
    name: "OpenAI",
    base: "https://api.openai.com/v1",
    models: [
      { id: "gpt-4o", name: "gpt-4o (Omni 全能旗舰)" },
      { id: "gpt-4o-mini", name: "gpt-4o-mini (极速轻量)" },
      { id: "o1-preview", name: "o1-preview (深度推理)" },
      { id: "o3-mini", name: "o3-mini (新一代推理模型)" }
    ]
  },
  gemini: {
    name: "Google Gemini",
    base: "https://generativelanguage.googleapis.com/v1beta/openai/",
    models: [
      { id: "gemini-1.5-pro", name: "gemini-1.5-pro (超长上下文)" },
      { id: "gemini-1.5-flash", name: "gemini-1.5-flash (极速响应)" },
      { id: "gemini-2.0-flash-exp", name: "gemini-2.0-flash-exp (下一代)" }
    ]
  },
  siliconflow: {
    name: "SiliconFlow 硅基流动",
    base: "https://api.siliconflow.cn/v1",
    models: [
      { id: "deepseek-ai/DeepSeek-V3", name: "deepseek-ai/DeepSeek-V3" },
      { id: "deepseek-ai/DeepSeek-R1", name: "deepseek-ai/DeepSeek-R1" },
      { id: "Qwen/Qwen2.5-72B-Instruct", name: "Qwen/Qwen2.5-72B-Instruct" }
    ]
  },
  ollama: {
    name: "Ollama (Local)",
    base: "http://localhost:11434/v1",
    models: [
      { id: "llama3.3:latest", name: "llama3.3:latest" },
      { id: "qwen2.5:latest", name: "qwen2.5:latest" },
      { id: "deepseek-r1:latest", name: "deepseek-r1:latest" }
    ]
  },
  custom: {
    name: "Custom Endpoint",
    base: "https://api.openai.com/v1",
    models: []
  }
};

class App {
  constructor() {
    this.currentScenarioKey = 'ai_workspace';
    this.currentScenario = PRESET_SCENARIOS[this.currentScenarioKey];
    this.agentEngine = null;
    this.activeTab = 'dashboard';
    
    this.config = {
      provider: localStorage.getItem('omnipulse_provider') || 'deepseek',
      apiKey: localStorage.getItem('omnipulse_api_key') || '',
      apiBase: localStorage.getItem('omnipulse_api_base') || 'https://api.deepseek.com/v1',
      model: localStorage.getItem('omnipulse_model') || 'deepseek-chat',
      webhookUrl: localStorage.getItem('omnipulse_webhook') || 'https://hooks.slack.com/services/OMNIPULSE/EXECUTIVE_ALERT'
    };

    this.init();
  }

  init() {
    this.setupAgentEngine();
    this.setupNavigation();
    this.setupScenarioPicker();
    this.setupEventListeners();
    this.setupSettingsUI();
    this.renderActiveScenario();
    this.showToast('✨ OmniPulse AI Intelligence Engine initialized.');
  }

  /**
   * Setup Settings Provider & Model Dropdowns
   */
  setupSettingsUI() {
    const providerSelect = document.getElementById('settings-provider');
    const modelSelect = document.getElementById('settings-model-select');
    const modelInput = document.getElementById('settings-model');
    const apiBaseInput = document.getElementById('settings-api-base');
    const apiKeyInput = document.getElementById('settings-api-key');
    const webhookInput = document.getElementById('settings-webhook');

    const updateModelOptions = (providerKey, preserveModel = null) => {
      const preset = PROVIDER_PRESETS[providerKey] || PROVIDER_PRESETS.deepseek;
      
      if (providerKey === 'custom' || preset.models.length === 0) {
        if (modelSelect) modelSelect.style.display = 'none';
        if (modelInput) {
          modelInput.style.display = 'block';
          modelInput.value = preserveModel || this.config.model || '';
        }
      } else {
        if (modelInput) modelInput.style.display = 'none';
        if (modelSelect) {
          modelSelect.style.display = 'block';
          modelSelect.innerHTML = preset.models.map(m => `
            <option value="${m.id}" ${m.id === (preserveModel || this.config.model) ? 'selected' : ''}>
              ${m.name}
            </option>
          `).join('');
          
          if (!preserveModel && preset.models.length > 0) {
            this.config.model = preset.models[0].id;
          }
        }
      }
    };

    if (providerSelect) {
      providerSelect.value = this.config.provider;
      providerSelect.addEventListener('change', (e) => {
        const pKey = e.target.value;
        this.config.provider = pKey;
        const preset = PROVIDER_PRESETS[pKey];
        if (preset && apiBaseInput) {
          apiBaseInput.value = preset.base;
          this.config.apiBase = preset.base;
        }
        updateModelOptions(pKey);
      });
    }

    if (modelSelect) {
      modelSelect.addEventListener('change', (e) => {
        this.config.model = e.target.value;
      });
    }

    // Initialize UI values
    updateModelOptions(this.config.provider, this.config.model);
    if (apiBaseInput && this.config.apiBase) apiBaseInput.value = this.config.apiBase;
    if (apiKeyInput && this.config.apiKey) apiKeyInput.value = this.config.apiKey;
    if (webhookInput && this.config.webhookUrl) webhookInput.value = this.config.webhookUrl;
  }

  /**
   * Initialize the Agent Swarm Orchestrator
   */
  setupAgentEngine() {
    const terminalBody = document.getElementById('terminal-logs');
    
    this.agentEngine = new AgentSwarmEngine({
      onLog: (logObj) => {
        if (!terminalBody) return;
        const entry = document.createElement('div');
        entry.className = 'log-entry';
        
        let tagClass = 'log-tag-scout';
        if (logObj.tag === 'SENTIMENT') tagClass = 'log-tag-sentiment';
        if (logObj.tag === 'STRATEGY') tagClass = 'log-tag-strategy';
        if (logObj.tag === 'PLAYBOOK') tagClass = 'log-tag-playbook';
        if (logObj.tag === 'ORCHESTRATOR') tagClass = 'log-tag-scout';

        entry.innerHTML = `
          <span class="log-time">[${logObj.time}]</span>
          <span class="${tagClass}">[${logObj.tag}]</span>
          <span class="log-text">${logObj.text}</span>
        `;
        terminalBody.appendChild(entry);
        terminalBody.scrollTop = terminalBody.scrollHeight;
      },
      onAgentStateChange: (agentId, status, progress) => {
        const nodeCard = document.getElementById(`agent-node-${agentId}`);
        const statusBadge = document.getElementById(`status-badge-${agentId}`);
        const progressBar = document.getElementById(`progress-bar-${agentId}`);

        if (nodeCard) {
          nodeCard.className = `agent-node-card ${status}`;
        }
        if (statusBadge) {
          statusBadge.className = `agent-status-badge status-${status}`;
          statusBadge.innerText = status.toUpperCase();
        }
        if (progressBar) {
          progressBar.style.width = `${progress}%`;
        }
      },
      onComplete: (realData) => {
        const runBtn = document.getElementById('btn-run-mission');
        if (runBtn) {
          runBtn.disabled = false;
          runBtn.innerHTML = '🚀 Trigger Autonomous Swarm Scan';
        }

        if (realData && realData.metrics) {
          this.currentScenario = realData;
          this.showToast('✅ Live Telemetry Crawled & Synthesized by Multi-Agent Swarm!');
        } else {
          this.showToast('✅ Intelligence Scan Complete! Dashboard updated with fresh telemetry.');
        }

        this.renderMetrics();
        this.renderBattlecards();
        this.renderPlaybooks();
        this.renderFeatureMatrix();
        ChartEngine.renderRadarChart('radar-chart-container', this.currentScenario);
        ChartEngine.renderCircularGauge('threat-gauge-container', this.currentScenario.metrics.threatIndex, 'Threat Score');
        ChartEngine.renderTrendChart('trend-chart-container', this.currentScenario.trendHistory);
      }
    });
  }

  /**
   * Setup Sidebar Tab Navigation
   */
  setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item[data-tab]');
    navItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const tab = item.getAttribute('data-tab');
        this.switchTab(tab);
      });
    });
  }

  switchTab(tabId) {
    this.activeTab = tabId;
    
    // Update nav classes
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    const activeNav = document.querySelector(`.nav-item[data-tab="${tabId}"]`);
    if (activeNav) activeNav.classList.add('active');

    // Update view panels
    document.querySelectorAll('.view-panel').forEach(panel => panel.classList.remove('active'));
    const targetPanel = document.getElementById(`view-${tabId}`);
    if (targetPanel) targetPanel.classList.add('active');

    // Trigger chart redraw if switching to dashboard
    if (tabId === 'dashboard') {
      setTimeout(() => {
        ChartEngine.renderRadarChart('radar-chart-container', this.currentScenario);
        ChartEngine.renderCircularGauge('threat-gauge-container', this.currentScenario.metrics.threatIndex, 'Threat Score');
        ChartEngine.renderTrendChart('trend-chart-container', this.currentScenario.trendHistory);
      }, 50);
    }
  }

  /**
   * Setup Dataset Scenario Switcher
   */
  setupScenarioPicker() {
    const select = document.getElementById('scenario-select');
    if (!select) return;

    select.addEventListener('change', (e) => {
      const key = e.target.value;
      if (PRESET_SCENARIOS[key]) {
        this.currentScenarioKey = key;
        this.currentScenario = PRESET_SCENARIOS[key];
        this.renderActiveScenario();
        this.showToast(`Switched sector intelligence: ${this.currentScenario.name}`);
      }
    });
  }

  /**
   * Event Listeners for Buttons and Modals
   */
  setupEventListeners() {
    // Run Mission Button
    const runBtn = document.getElementById('btn-run-mission');
    if (runBtn) {
      runBtn.addEventListener('click', () => {
        runBtn.disabled = true;
        runBtn.innerHTML = '⚡ Swarm Executing in Parallel...';
        
        // Clear terminal
        const terminal = document.getElementById('terminal-logs');
        if (terminal) terminal.innerHTML = '';

        // Switch to mission control to let user watch execution
        this.switchTab('mission-control');
        this.agentEngine.runMission(this.currentScenario.targetCompany, "", this.config);
      });
    }

    // Export Dossier Button
    const exportBtn = document.getElementById('btn-export-dossier');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => {
        this.openExportModal();
      });
    }

    // Custom Scan Modal Trigger
    const customBtn = document.getElementById('btn-open-custom-scan');
    if (customBtn) {
      customBtn.addEventListener('click', () => {
        const modal = document.getElementById('modal-custom-scan');
        if (modal) modal.classList.add('active');
      });
    }

    // Start Custom Scan Button
    const startCustomBtn = document.getElementById('btn-start-custom-scan');
    if (startCustomBtn) {
      startCustomBtn.addEventListener('click', () => {
        const nameInput = document.getElementById('custom-target-name');
        const urlInput = document.getElementById('custom-target-url');

        const targetName = nameInput && nameInput.value.trim() ? nameInput.value.trim() : 'Linear App';
        const targetUrl = urlInput && urlInput.value.trim() ? urlInput.value.trim() : 'https://linear.app';

        // Close modal
        document.getElementById('modal-custom-scan').classList.remove('active');

        // Generate preliminary dynamic scenario
        const customScenario = generateCustomScenario(targetName, targetUrl);
        this.currentScenario = customScenario;
        this.renderActiveScenario();

        // Switch to mission control and launch live crawl + LLM synthesis
        this.switchTab('mission-control');
        this.showToast(`🚀 Autonomous swarm launched for target: ${targetName}`);
        
        const terminal = document.getElementById('terminal-logs');
        if (terminal) terminal.innerHTML = '';
        this.agentEngine.runMission(targetName, targetUrl, this.config);
      });
    }

    // Settings Form Save Button
    const saveSettingsBtn = document.getElementById('btn-save-settings');
    if (saveSettingsBtn) {
      saveSettingsBtn.addEventListener('click', () => {
        const providerSelect = document.getElementById('settings-provider');
        const modelSelect = document.getElementById('settings-model-select');
        const modelInput = document.getElementById('settings-model');
        const apiKeyInput = document.getElementById('settings-api-key');
        const apiBaseInput = document.getElementById('settings-api-base');
        const webhookInput = document.getElementById('settings-webhook');

        if (providerSelect) {
          this.config.provider = providerSelect.value;
          localStorage.setItem('omnipulse_provider', this.config.provider);
        }

        if (this.config.provider === 'custom') {
          if (modelInput) {
            this.config.model = modelInput.value.trim() || 'deepseek-chat';
          }
        } else {
          if (modelSelect) {
            this.config.model = modelSelect.value || 'deepseek-chat';
          }
        }
        localStorage.setItem('omnipulse_model', this.config.model);

        if (apiKeyInput) {
          this.config.apiKey = apiKeyInput.value.trim();
          localStorage.setItem('omnipulse_api_key', this.config.apiKey);
        }
        if (apiBaseInput) {
          this.config.apiBase = apiBaseInput.value.trim() || 'https://api.deepseek.com/v1';
          localStorage.setItem('omnipulse_api_base', this.config.apiBase);
        }
        if (webhookInput) {
          this.config.webhookUrl = webhookInput.value.trim();
          localStorage.setItem('omnipulse_webhook', this.config.webhookUrl);
        }

        this.showToast(`✅ Configuration saved! Active model: ${this.config.model}`);
      });
    }

    // Test LLM Connection Button
    const testLlmBtn = document.getElementById('btn-test-llm');
    if (testLlmBtn) {
      testLlmBtn.addEventListener('click', async () => {
        const apiKeyInput = document.getElementById('settings-api-key');
        const apiBaseInput = document.getElementById('settings-api-base');
        const modelSelect = document.getElementById('settings-model-select');
        const modelInput = document.getElementById('settings-model');
        const resultBox = document.getElementById('llm-test-result');

        const key = apiKeyInput ? apiKeyInput.value.trim() : '';
        const base = apiBaseInput ? apiBaseInput.value.trim() : 'https://api.deepseek.com/v1';
        let model = 'deepseek-chat';
        if (modelSelect && modelSelect.style.display !== 'none') {
          model = modelSelect.value;
        } else if (modelInput) {
          model = modelInput.value.trim() || 'deepseek-chat';
        }

        if (!key) {
          if (resultBox) {
            resultBox.style.display = 'block';
            resultBox.style.background = 'rgba(239, 68, 68, 0.1)';
            resultBox.style.border = '1px solid rgba(239, 68, 68, 0.3)';
            resultBox.style.color = '#F87171';
            resultBox.innerHTML = '⚠️ <strong>API Key 不能为空</strong>：请先在上方输入您的 API Key 后再进行连通性测试。';
          }
          return;
        }

        testLlmBtn.disabled = true;
        testLlmBtn.innerText = '⏳ Testing Connection...';
        if (resultBox) resultBox.style.display = 'none';

        try {
          const resp = await fetch('/api/test-llm', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ apiKey: key, apiBase: base, model: model })
          });
          const data = await resp.json();

          if (resultBox) {
            resultBox.style.display = 'block';
            if (data.success) {
              resultBox.style.background = 'rgba(16, 185, 129, 0.1)';
              resultBox.style.border = '1px solid rgba(16, 185, 129, 0.3)';
              resultBox.style.color = 'var(--emerald)';
              resultBox.innerHTML = `🟢 <strong>API 连通测试成功！</strong><br>服务商返回响应耗时: <strong>${data.latencyMs}ms</strong> | 当前模型: <code>${data.model}</code><br>您的 API Key 已完全生效并已准备就绪！`;
              this.showToast(`🟢 连通测试成功！响应耗时: ${data.latencyMs}ms`);
            } else {
              resultBox.style.background = 'rgba(239, 68, 68, 0.1)';
              resultBox.style.border = '1px solid rgba(239, 68, 68, 0.3)';
              resultBox.style.color = '#F87171';
              resultBox.innerHTML = `🔴 <strong>连通测试失败</strong>：${data.error}<br><small style="color: var(--text-muted);">请检查 API Key 是否正确、账户余额是否充足或网络接口地址是否畅通。</small>`;
              this.showToast(`🔴 连通测试失败: ${data.error}`);
            }
          }
        } catch (err) {
          if (resultBox) {
            resultBox.style.display = 'block';
            resultBox.style.background = 'rgba(239, 68, 68, 0.1)';
            resultBox.style.border = '1px solid rgba(239, 68, 68, 0.3)';
            resultBox.style.color = '#F87171';
            resultBox.innerHTML = `🔴 <strong>网络错误</strong>：${err.message}`;
          }
        } finally {
          testLlmBtn.disabled = false;
          testLlmBtn.innerText = '⚡ Test API Connection (测试连通性)';
        }
      });
    }

    // Modal close buttons
    document.querySelectorAll('[data-close-modal]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
      });
    });

    // Copy Dossier Markdown Button
    const copyBtn = document.getElementById('btn-copy-dossier');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        const text = document.getElementById('dossier-preview-text').innerText;
        navigator.clipboard.writeText(text).then(() => {
          this.showToast('📋 Executive Briefing copied to clipboard!');
        });
      });
    }

    // Print Dossier PDF Button
    const printBtn = document.getElementById('btn-print-dossier');
    if (printBtn) {
      printBtn.addEventListener('click', () => {
        window.print();
      });
    }

    // Confirm Playbook Dispatch
    const confirmDispatchBtn = document.getElementById('btn-confirm-dispatch');
    if (confirmDispatchBtn) {
      confirmDispatchBtn.addEventListener('click', () => {
        document.getElementById('modal-playbook-detail').classList.remove('active');
        this.showToast('🚀 Playbook dispatched to Slack #executive-strategy & Jira sprint backlog!');
      });
    }
  }

  loadSettingsToUI() {
    const apiKeyInput = document.getElementById('settings-api-key');
    const apiBaseInput = document.getElementById('settings-api-base');
    const modelInput = document.getElementById('settings-model');
    const webhookInput = document.getElementById('settings-webhook');

    if (apiKeyInput && this.config.apiKey) apiKeyInput.value = this.config.apiKey;
    if (apiBaseInput && this.config.apiBase) apiBaseInput.value = this.config.apiBase;
    if (modelInput && this.config.model) modelInput.value = this.config.model;
    if (webhookInput && this.config.webhookUrl) webhookInput.value = this.config.webhookUrl;
  }

  /**
   * Render all components for current scenario
   */
  renderActiveScenario() {
    this.renderHero();
    this.renderMetrics();
    this.renderBattlecards();
    this.renderPlaybooks();
    this.renderSentiment();
    this.renderFeatureMatrix();
    
    // Render Charts
    ChartEngine.renderRadarChart('radar-chart-container', this.currentScenario);
    ChartEngine.renderCircularGauge('threat-gauge-container', this.currentScenario.metrics.threatIndex, 'Threat Score');
    ChartEngine.renderTrendChart('trend-chart-container', this.currentScenario.trendHistory);
  }

  renderHero() {
    const title = document.getElementById('hero-title');
    const subtitle = document.getElementById('hero-subtitle');
    const companyTag = document.getElementById('hero-company-tag');

    if (title) title.innerText = `${this.currentScenario.targetCompany} Strategic Mission Control`;
    if (subtitle) subtitle.innerText = `Continuous Autonomous Multi-Agent Reconnaissance in ${this.currentScenario.marketSector}.`;
    if (companyTag) companyTag.innerText = this.currentScenario.targetCompany;
  }

  renderMetrics() {
    const m = this.currentScenario.metrics;
    const threatVal = document.getElementById('metric-threat-val');
    const threatDelta = document.getElementById('metric-threat-delta');
    const pricingVal = document.getElementById('metric-pricing-val');
    const pricingNote = document.getElementById('metric-pricing-note');
    const sentimentVal = document.getElementById('metric-sentiment-val');
    const sentimentDelta = document.getElementById('metric-sentiment-delta');
    const featureVal = document.getElementById('metric-feature-val');
    const featureCount = document.getElementById('metric-feature-count');

    if (threatVal) threatVal.innerText = `${m.threatIndex} / 100`;
    if (threatDelta) threatDelta.innerText = m.threatChange;
    if (pricingVal) pricingVal.innerText = m.pricingGap;
    if (pricingNote) pricingNote.innerText = m.pricingGapNote;
    if (sentimentVal) sentimentVal.innerText = m.sentimentScore;
    if (sentimentDelta) sentimentDelta.innerText = m.sentimentDelta;
    if (featureVal) featureVal.innerText = m.featureParity;
    if (featureCount) featureCount.innerText = m.featureCount;
  }

  renderFeatureMatrix() {
    const container = document.getElementById('dashboard-feature-matrix-container');
    if (!container) return;

    const list = this.currentScenario.featureMatrix || [];
    container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 10px;">
        ${list.map(f => `
          <div style="background: rgba(0,0,0,0.25); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 12px 16px; display: flex; justify-content: space-between; align-items: center;">
            <div style="font-weight: 600; font-size: 13px; color: var(--text-primary);">
              ⚡ ${f.feature}
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span class="nav-badge" style="background: rgba(0,242,254,0.15); color: var(--cyan); font-weight: 700;">
                ${f.omniflow || 'Native'}
              </span>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  renderBattlecards() {
    const tbody = document.getElementById('battlecard-tbody');
    if (!tbody) return;

    tbody.innerHTML = this.currentScenario.competitors.map(comp => `
      <tr>
        <td>
          <div class="target-badge">
            <span style="font-size: 18px;">🏢</span>
            <div>
              <div style="font-weight: 700;">${comp.name}</div>
              <div style="font-size: 11px; color: var(--text-muted);">${comp.tier}</div>
            </div>
          </div>
        </td>
        <td>
          <span class="threat-pill threat-${comp.threatLevel}">
            ${comp.threatScore} / 100 (${comp.threatLevel.toUpperCase()})
          </span>
        </td>
        <td style="font-family: var(--font-mono); font-weight: 600; color: var(--cyan);">${comp.pricing}</td>
        <td>
          <div style="font-weight: 600; color: var(--emerald);">${comp.sentiment}</div>
          <div style="font-size: 11px; color: var(--text-muted);">${comp.growthVelocity}</div>
        </td>
        <td style="max-width: 240px; font-size: 12px; color: var(--text-secondary);">
          <div style="margin-bottom: 4px;"><strong style="color: var(--text-primary);">Strength:</strong> ${comp.coreStrength}</div>
          <div><strong style="color: #F87171;">Vulnerability:</strong> ${comp.keyVulnerability}</div>
        </td>
      </tr>
    `).join('');
  }

  renderPlaybooks() {
    const container = document.getElementById('playbooks-container');
    if (!container) return;

    container.innerHTML = this.currentScenario.playbooks.map(pb => `
      <div class="playbook-card">
        <div>
          <div class="playbook-type">${pb.type}</div>
          <div class="playbook-title">${pb.title}</div>
          <div class="playbook-desc">${pb.description}</div>
          
          <div class="playbook-steps">
            <div style="font-size: 11px; font-weight: 700; color: var(--text-muted); margin-bottom: 8px; text-transform: uppercase;">Execution Steps:</div>
            ${pb.steps.map((step, idx) => `
              <div class="step-item">
                <span class="step-num">${idx + 1}.</span>
                <span>${step}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="playbook-footer">
          <span class="impact-metric">${pb.impact}</span>
          <button class="btn btn-secondary btn-sm" style="font-size: 11px; padding: 6px 12px;" onclick="window.appInstance.dispatchPlaybook('${pb.id}')">
            ⚡ View & Dispatch
          </button>
        </div>
      </div>
    `).join('');
  }

  renderSentiment() {
    const posList = document.getElementById('sentiment-positive-list');
    const fricList = document.getElementById('sentiment-friction-list');
    const s = this.currentScenario.sentimentVectors;

    if (posList && s.positiveVectors) {
      posList.innerHTML = s.positiveVectors.map(item => `
        <div style="background: rgba(16, 185, 129, 0.06); border: 1px solid rgba(16, 185, 129, 0.2); border-radius: var(--radius-md); padding: 14px; margin-bottom: 12px;">
          <div style="display: flex; justify-content: space-between; font-weight: 600; font-size: 13px; color: var(--emerald); margin-bottom: 6px;">
            <span>${item.topic}</span>
            <span>${item.percentage}% Sentiment</span>
          </div>
          <p style="font-size: 12px; color: var(--text-secondary); font-style: italic;">"${item.quote}"</p>
        </div>
      `).join('');
    }

    if (fricList && s.frictionVectors) {
      fricList.innerHTML = s.frictionVectors.map(item => `
        <div style="background: rgba(239, 68, 68, 0.06); border: 1px solid rgba(239, 68, 68, 0.2); border-radius: var(--radius-md); padding: 14px; margin-bottom: 12px;">
          <div style="display: flex; justify-content: space-between; font-weight: 600; font-size: 13px; color: #F87171; margin-bottom: 6px;">
            <span>${item.topic}</span>
            <span>${item.percentage}% Friction Risk</span>
          </div>
          <p style="font-size: 12px; color: var(--text-secondary); font-style: italic;">"${item.quote}"</p>
        </div>
      `).join('');
    }
  }

  dispatchPlaybook(playbookId) {
    const pb = this.currentScenario.playbooks.find(p => p.id === playbookId) || this.currentScenario.playbooks[0];
    const modal = document.getElementById('modal-playbook-detail');
    const title = document.getElementById('playbook-modal-title');
    const content = document.getElementById('playbook-modal-content');

    if (!modal || !content) return;

    if (title) title.innerText = `🎯 ${pb.title}`;
    content.innerHTML = `
      <div style="margin-bottom: 16px;">
        <span class="nav-badge" style="background: rgba(0,242,254,0.15); color: var(--cyan);">${pb.type}</span>
        <span class="nav-badge" style="background: rgba(16,185,129,0.15); color: var(--emerald); margin-left: 8px;">ROI: ${pb.impact}</span>
      </div>
      <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.6; margin-bottom: 18px;">
        ${pb.description}
      </p>

      <div style="background: rgba(0,0,0,0.3); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 16px; margin-bottom: 16px;">
        <div style="font-size: 12px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 10px;">Sprint Backlog Items:</div>
        ${pb.steps.map((step, i) => `
          <div style="display: flex; align-items: center; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid rgba(255,255,255,0.04); font-size: 12px;">
            <span><strong style="color: var(--cyan);">Task #${i+1}:</strong> ${step}</span>
            <span style="font-size: 10px; padding: 2px 6px; border-radius: 4px; background: rgba(255,255,255,0.06); color: var(--text-muted);">Ready to Sync</span>
          </div>
        `).join('')}
      </div>

      <div style="font-size: 11px; color: var(--text-muted);">
        📡 Webhook target: <code>${this.config.webhookUrl}</code>
      </div>
    `;

    modal.classList.add('active');
  }

  openExportModal() {
    const modal = document.getElementById('modal-export');
    const preview = document.getElementById('dossier-preview-text');
    if (!modal || !preview) return;

    const s = this.currentScenario;
    const md = `
# 📑 OmniPulse AI - Executive Intelligence Dossier
**Target Platform:** ${s.targetCompany}
**Sector:** ${s.marketSector}
**Generated Date:** ${new Date().toUTCString()}
**Generated by:** Autonomous Multi-Agent Swarm (Scout, Sentiment, StratOps, Playbook)

---

## 1. Executive Telemetry
- **Overall Threat Index:** ${s.metrics.threatIndex} / 100 (${s.metrics.threatStatus})
- **Pricing Parity:** ${s.metrics.pricingGap} (${s.metrics.pricingGapNote})
- **Customer Sentiment:** ${s.metrics.sentimentScore} (${s.metrics.sentimentDelta})
- **Feature Parity:** ${s.metrics.featureParity}

---

## 2. Key Competitor Breakdown
${s.competitors.map(c => `
### ${c.name} (${c.tier})
- **Threat Score:** ${c.threatScore}/100
- **Pricing Structure:** ${c.pricing}
- **Core Moat:** ${c.coreStrength}
- **Exploitable Vulnerability:** ${c.keyVulnerability}
- **Recent Movements:** ${c.recentMoves}
`).join('')}

---

## 3. Recommended Strategic Playbooks
${s.playbooks.map(p => `
### [${p.type}] ${p.title}
- **Projected ROI Impact:** ${p.impact}
- **Risk Profile:** ${p.risk}
- **Executive Summary:** ${p.description}
- **Tactical Action Items:**
${p.steps.map(step => `  1. ${step}`).join('\n')}
`).join('')}

---
*OmniPulse AI (c) 2026 - Autonomous Market Intelligence Engine*
    `.trim();

    preview.innerText = md;
    modal.classList.add('active');
  }

  showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>⚡</span><span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }
}

// Instantiate and expose globally
window.addEventListener('DOMContentLoaded', () => {
  window.appInstance = new App();
});
