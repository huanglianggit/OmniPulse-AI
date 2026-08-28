/**
 * OmniPulse AI - Charting Engine
 * Pure SVG & Canvas Visualizations with Sleek Glowing Aesthetics
 */

export class ChartEngine {
  /**
   * Render a multi-dimensional Capability Radar Chart
   */
  static renderRadarChart(containerId, data) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const width = 360;
    const height = 300;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = 105;

    const axes = [
      { label: "Product Velocity", key: "velocity" },
      { label: "Pricing Advantage", key: "pricing" },
      { label: "Developer Sentiment", key: "sentiment" },
      { label: "Enterprise Moat", key: "moat" },
      { label: "Agent Autonomy", key: "autonomy" }
    ];

    const totalAxes = axes.length;
    const angleSlice = (Math.PI * 2) / totalAxes;

    // Background web grid
    let gridCircles = "";
    const levels = 4;
    for (let level = 1; level <= levels; level++) {
      const r = (radius / levels) * level;
      let points = [];
      for (let i = 0; i < totalAxes; i++) {
        const angle = i * angleSlice - Math.PI / 2;
        const x = centerX + r * Math.cos(angle);
        const y = centerY + r * Math.sin(angle);
        points.push(`${x},${y}`);
      }
      gridCircles += `<polygon points="${points.join(' ')}" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1" />`;
    }

    // Axis Lines & Labels
    let axisElements = "";
    axes.forEach((axis, i) => {
      const angle = i * angleSlice - Math.PI / 2;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      
      const labelX = centerX + (radius + 24) * Math.cos(angle);
      const labelY = centerY + (radius + 18) * Math.sin(angle);
      
      axisElements += `
        <line x1="${centerX}" y1="${centerY}" x2="${x}" y2="${y}" stroke="rgba(255,255,255,0.08)" stroke-width="1" />
        <text x="${labelX}" y="${labelY}" text-anchor="middle" dominant-baseline="central" fill="#94A3B8" font-size="10" font-family="'Inter', sans-serif" font-weight="500">${axis.label}</text>
      `;
    });

    // Target Company Polygon (OmniPulse / Scanned Target)
    const caps = (data && data.capabilities) || {
      velocity: data && data.metrics ? Math.min(96, Math.max(60, data.metrics.threatIndex + 8)) : 90,
      pricing: 82,
      sentiment: data && data.metrics ? Math.min(95, parseInt(data.metrics.sentimentScore) || 86) : 86,
      moat: 80,
      autonomy: 92
    };

    const compCaps = (data && data.competitorCapabilities) || {
      velocity: Math.max(50, (caps.velocity || 85) - 10),
      pricing: Math.max(45, (caps.pricing || 80) - 15),
      sentiment: Math.max(55, (caps.sentiment || 85) - 12),
      moat: Math.min(95, (caps.moat || 78) + 8),
      autonomy: Math.max(40, (caps.autonomy || 90) - 25)
    };

    const targetValues = [
      caps.velocity || 88,
      caps.pricing || 80,
      caps.sentiment || 86,
      caps.moat || 82,
      caps.autonomy || 90
    ];

    const compValues = [
      compCaps.velocity || 78,
      compCaps.pricing || 68,
      compCaps.sentiment || 74,
      compCaps.moat || 85,
      compCaps.autonomy || 65
    ];

    const targetPoints = targetValues.map((val, i) => {
      const r = (radius * (Math.min(100, Math.max(20, val)) / 100));
      const angle = i * angleSlice - Math.PI / 2;
      return `${centerX + r * Math.cos(angle)},${centerY + r * Math.sin(angle)}`;
    });

    const compPoints = compValues.map((val, i) => {
      const r = (radius * (Math.min(100, Math.max(20, val)) / 100));
      const angle = i * angleSlice - Math.PI / 2;
      return `${centerX + r * Math.cos(angle)},${centerY + r * Math.sin(angle)}`;
    });

    const svg = `
      <svg viewBox="0 0 ${width} ${height}" class="radar-svg" style="width: 100%; height: auto; max-height: 280px;">
        <defs>
          <linearGradient id="radarTargetGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#00F2FE" stop-opacity="0.5"/>
            <stop offset="100%" stop-color="#8B5CF6" stop-opacity="0.3"/>
          </linearGradient>
          <linearGradient id="radarCompGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FF5F56" stop-opacity="0.25"/>
            <stop offset="100%" stop-color="#FFBD2E" stop-opacity="0.1"/>
          </linearGradient>
        </defs>
        
        <!-- Grid -->
        ${gridCircles}
        ${axisElements}
        
        <!-- Competitor Polygon -->
        <polygon points="${compPoints.join(' ')}" fill="url(#radarCompGrad)" stroke="#FF5F56" stroke-width="1.5" stroke-dasharray="4,4" opacity="0.8" />
        
        <!-- Target Company Polygon -->
        <polygon points="${targetPoints.join(' ')}" fill="url(#radarTargetGrad)" stroke="#00F2FE" stroke-width="2" />
        
        <!-- Target Point Dots -->
        ${targetValues.map((val, i) => {
          const r = (radius * (val / 100));
          const angle = i * angleSlice - Math.PI / 2;
          const x = centerX + r * Math.cos(angle);
          const y = centerY + r * Math.sin(angle);
          return `<circle cx="${x}" cy="${y}" r="3.5" fill="#00F2FE" stroke="#06080D" stroke-width="1.5" />`;
        }).join('')}
      </svg>
      <div style="display: flex; justify-content: center; gap: 20px; font-size: 11px; margin-top: 8px;">
        <span style="display: flex; align-items: center; gap: 6px; color: var(--cyan);">
          <span style="width: 8px; height: 8px; background: var(--cyan); border-radius: 50%;"></span> Your Platform
        </span>
        <span style="display: flex; align-items: center; gap: 6px; color: #FF5F56;">
          <span style="width: 8px; height: 8px; background: #FF5F56; border-radius: 50%;"></span> Competitor Avg
        </span>
      </div>
    `;

    container.innerHTML = svg;
  }

  /**
   * Render a Glowing Circular Threat Gauge
   */
  static renderCircularGauge(containerId, score, label) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const size = 150;
    const strokeWidth = 12;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;

    let strokeColor = "#10B981";
    if (score > 60 && score <= 80) strokeColor = "#F59E0B";
    if (score > 80) strokeColor = "#EF4444";

    const svg = `
      <div style="position: relative; width: ${size}px; height: ${size}px; margin: 0 auto;">
        <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
          <circle
            cx="${size / 2}" cy="${size / 2}" r="${radius}"
            fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="${strokeWidth}"
          />
          <circle
            cx="${size / 2}" cy="${size / 2}" r="${radius}"
            fill="none" stroke="${strokeColor}" stroke-width="${strokeWidth}"
            stroke-dasharray="${circumference}" stroke-dashoffset="${offset}"
            stroke-linecap="round"
            style="transform: rotate(-90deg); transform-origin: 50% 50%; transition: stroke-dashoffset 0.8s ease;"
          />
        </svg>
        <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center;">
          <span style="font-family: var(--font-display); font-size: 32px; font-weight: 700; color: ${strokeColor};">${score}</span>
          <span style="font-size: 11px; color: var(--text-muted); text-transform: uppercase; font-weight: 600;">${label}</span>
        </div>
      </div>
    `;

    container.innerHTML = svg;
  }

  /**
   * Render a Smooth Glowing Historical Trend Line Chart
   */
  static renderTrendChart(containerId, trendData) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const width = 500;
    const height = 180;
    const padding = { top: 20, right: 30, bottom: 30, left: 40 };

    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;

    const points = trendData || [
      { month: "Mar", score: 62, compAvg: 55 },
      { month: "Apr", score: 68, compAvg: 58 },
      { month: "May", score: 74, compAvg: 61 },
      { month: "Jun", score: 71, compAvg: 64 },
      { month: "Jul", score: 80, compAvg: 66 },
      { month: "Aug", score: 88, compAvg: 68 }
    ];

    const maxVal = 100;
    const minVal = 40;

    const getX = (idx) => padding.left + (idx / (points.length - 1)) * chartW;
    const getY = (val) => padding.top + chartH - ((val - minVal) / (maxVal - minVal)) * chartH;

    // Build SVG Path for Your Platform
    const pathD = points.reduce((acc, pt, i) => {
      const x = getX(i);
      const y = getY(pt.score);
      return i === 0 ? `M ${x},${y}` : `${acc} L ${x},${y}`;
    }, "");

    const areaD = `${pathD} L ${getX(points.length - 1)},${padding.top + chartH} L ${getX(0)},${padding.top + chartH} Z`;

    // Build SVG Path for Competitor Avg
    const compPathD = points.reduce((acc, pt, i) => {
      const x = getX(i);
      const y = getY(pt.compAvg);
      return i === 0 ? `M ${x},${y}` : `${acc} L ${x},${y}`;
    }, "");

    // Axis gridlines and month labels
    let gridLines = "";
    let monthLabels = "";
    points.forEach((pt, i) => {
      const x = getX(i);
      gridLines += `<line x1="${x}" y1="${padding.top}" x2="${x}" y2="${padding.top + chartH}" stroke="rgba(255,255,255,0.04)" stroke-width="1" />`;
      monthLabels += `<text x="${x}" y="${height - 8}" fill="#64748B" font-size="11" font-family="'Inter', sans-serif" text-anchor="middle">${pt.month}</text>`;
    });

    const svg = `
      <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: auto; max-height: 180px;">
        <defs>
          <linearGradient id="trendGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#00F2FE" stop-opacity="0.35"/>
            <stop offset="100%" stop-color="#00F2FE" stop-opacity="0.0"/>
          </linearGradient>
        </defs>

        <!-- Horizontal baseline -->
        <line x1="${padding.left}" y1="${padding.top + chartH}" x2="${width - padding.right}" y2="${padding.top + chartH}" stroke="rgba(255,255,255,0.08)" stroke-width="1" />

        ${gridLines}
        ${monthLabels}

        <!-- Competitor Curve -->
        <path d="${compPathD}" fill="none" stroke="#F87171" stroke-width="1.5" stroke-dasharray="3,3" opacity="0.75" />

        <!-- Target Platform Gradient Area -->
        <path d="${areaD}" fill="url(#trendGradient)" />

        <!-- Target Platform Curve -->
        <path d="${pathD}" fill="none" stroke="#00F2FE" stroke-width="2.5" />

        <!-- Target Dots -->
        ${points.map((pt, i) => `
          <circle cx="${getX(i)}" cy="${getY(pt.score)}" r="3.5" fill="#00F2FE" stroke="#06080D" stroke-width="2" />
        `).join('')}
      </svg>
      <div style="display: flex; justify-content: flex-end; gap: 16px; font-size: 11px; margin-top: 4px;">
        <span style="color: var(--cyan); display: flex; align-items: center; gap: 4px;">
          <span style="width: 8px; height: 2px; background: var(--cyan); display: inline-block;"></span> Your Platform Velocity
        </span>
        <span style="color: #F87171; display: flex; align-items: center; gap: 4px;">
          <span style="width: 8px; height: 2px; background: #F87171; border-top: 1px dashed #F87171; display: inline-block;"></span> Sector Avg
        </span>
      </div>
    `;

    container.innerHTML = svg;
  }
}

