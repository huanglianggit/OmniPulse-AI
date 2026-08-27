/**
 * OmniPulse AI - Pre-configured Enterprise Intelligence Scenarios
 * High-fidelity real-world datasets for SaaS, AI, and Cloud Infrastructure
 */

export const PRESET_SCENARIOS = {
  ai_workspace: {
    id: "ai_workspace",
    name: "AI Workspace & Collaboration",
    targetCompany: "OmniFlow Workspace",
    marketSector: "Enterprise Productivity & Multi-Agent Collaboration",
    lastUpdated: "2026-08-26 14:30 EST",
    metrics: {
      threatIndex: 78,
      threatChange: "+12% MoM",
      threatStatus: "High Alert",
      pricingGap: "-18%",
      pricingGapNote: "18% Cheaper Than Linear Pro",
      sentimentScore: "84/100",
      sentimentDelta: "+6.4 pts",
      featureParity: "88%",
      featureCount: "28 / 32 Tracked Features"
    },
    competitors: [
      {
        name: "Notion AI",
        tier: "Enterprise Leader",
        threatLevel: "high",
        threatScore: 88,
        pricing: "$18 / user / mo",
        sentiment: "79% Positive",
        growthVelocity: "+24% YoY",
        coreStrength: "Massive template ecosystem & flexible database blocks",
        keyVulnerability: "Sluggish mobile experience & limited autonomous multi-agent task loops",
        recentMoves: "Launched Notion Sites & Q3 Agentic Workspace beta"
      },
      {
        name: "Linear",
        tier: "High-Speed Challenger",
        threatLevel: "high",
        threatScore: 82,
        pricing: "$12 / user / mo",
        sentiment: "91% Positive",
        growthVelocity: "+38% YoY",
        coreStrength: "Exceptional keyboard-first UX, blazing speed, and developer love",
        keyVulnerability: "Limited general document collaboration outside engineering/product teams",
        recentMoves: "Expanded Linear Asks & Customer Requests sync integration"
      },
      {
        name: "Taskade AI",
        tier: "Agentic Competitor",
        threatLevel: "med",
        threatScore: 68,
        pricing: "$10 / user / mo",
        sentiment: "74% Positive",
        growthVelocity: "+19% YoY",
        coreStrength: "Pioneered multi-agent team workflows & workflow automation canvas",
        keyVulnerability: "Steep learning curve and inconsistent mobile sync",
        recentMoves: "Released Custom Agent Teams v3.2 with webhook triggers"
      }
    ],
    featureMatrix: [
      { feature: "Autonomous Agent Task Delegation", omniflow: "Native (4 Agents)", notion: "Beta (Prompt-based)", linear: "Third-Party Sync", taskade: "Native (Teams)" },
      { feature: "Real-Time Document Collaboration", omniflow: "Yes (CRDTs)", notion: "Yes (Proprietary)", linear: "Issues Only", taskade: "Yes" },
      { feature: "Native Git / GitHub Two-Way Sync", omniflow: "Deep Integration", notion: "Basic Link Preview", linear: "Industry Leading", taskade: "Basic Integration" },
      { feature: "Visual Workflow Automations", omniflow: "Node Canvas & Webhooks", notion: "Basic Automations", linear: "Triage Rules", taskade: "Node Graph" },
      { feature: "SOC2 Type II & On-Prem Airgap", omniflow: "Available (Enterprise)", notion: "Available (Enterprise)", linear: "Available (Enterprise)", taskade: "Cloud Only" }
    ],
    sentimentVectors: {
      positiveVectors: [
        { topic: "Speed & Fluid UI", percentage: 92, quote: "OmniFlow feels twice as snappy as standard bloated enterprise suites." },
        { topic: "Multi-Agent Automation", percentage: 88, quote: "The background task delegation saves our engineering managers 5+ hours weekly." },
        { topic: "Pricing Transparency", percentage: 84, quote: "No hidden charges per AI token; flat seat pricing is a breath of fresh air." }
      ],
      frictionVectors: [
        { topic: "Integration with Legacy Jira", percentage: 62, quote: "Migration tooling from 10-year Jira instances needs more one-click presets." },
        { topic: "Mobile App Offline Mode", percentage: 48, quote: "Need better offline editing support on iPad and mobile." }
      ]
    },
    playbooks: [
      {
        id: "pb-1",
        type: "Pricing Counter-Attack",
        title: "Disrupt Linear & Notion with Flat Team Tiering",
        impact: "+$180k ARR Projection",
        risk: "Low",
        description: "Competitors are hiking seat costs with AI add-on fees ($8-$10/user extra). Launch an all-inclusive 'OmniFlow Pro Plus' tier at $14 flat.",
        steps: [
          "Deploy self-serve migration wizard directly importing Notion workspaces.",
          "Target Reddit r/ProductManagement with 'Stop paying AI tax' campaign.",
          "Offer 30-day risk-free team pilot with dedicated onboarding Slack channel."
        ]
      },
      {
        id: "pb-2",
        type: "Feature Leapfrog",
        title: "Ship 'Agentic PR Reviewer' & GitHub Action",
        impact: "+42% Dev Activation",
        risk: "Medium",
        description: "Exploit Linear's lack of autonomous code document sync by shipping automated PR documentation generation directly inside workspace.",
        steps: [
          "Integrate Scout Agent with GitHub App webhook listeners.",
          "Auto-generate architecture decision records (ADR) upon merged PRs.",
          "Co-market with popular open-source developer tooling communities."
        ]
      },
      {
        id: "pb-3",
        type: "SEO & Content Moat",
        title: "Capture 'Notion Alternative for Autonomous Teams' Keywords",
        impact: "+25k Monthly Organic Leads",
        risk: "Low",
        description: "Notion's search traffic for 'Notion AI pricing' and 'Notion alternatives' increased 45% this quarter.",
        steps: [
          "Publish deep benchmark comparisons (Speed, Token Latency, Privacy).",
          "Distribute interactive feature matrix calculator widget.",
          "Launch developer documentation hub with ready-made Agent templates."
        ]
      }
    ]
  },

  fintech_payments: {
    id: "fintech_payments",
    name: "Fintech & Global Payment Infrastructure",
    targetCompany: "HyperPay Global",
    marketSector: "Multi-Rail Cross-Border Payment Orchestration",
    lastUpdated: "2026-08-26 13:45 EST",
    metrics: {
      threatIndex: 84,
      threatChange: "+8% MoM",
      threatStatus: "Critical Watch",
      pricingGap: "-35 bps",
      pricingGapNote: "35 bps Lower Take-Rate on Cross-Border",
      sentimentScore: "88/100",
      sentimentDelta: "+9.1 pts",
      featureParity: "92%",
      featureCount: "34 / 37 Tracked Features"
    },
    competitors: [
      {
        name: "Stripe",
        tier: "Global Incumbent",
        threatLevel: "high",
        threatScore: 92,
        pricing: "2.9% + 30¢ (Domestic)",
        sentiment: "82% Positive",
        growthVelocity: "+21% YoY",
        coreStrength: "Gold standard developer documentation and immense ecosystem integrations",
        keyVulnerability: "High cross-border FX markup (1.5%-2%) & aggressive account freeze thresholds",
        recentMoves: "Rolled out Agentic Commerce Protocol for autonomous AI bot checkout"
      },
      {
        name: "Adyen",
        tier: "Enterprise Tier 1",
        threatLevel: "high",
        threatScore: 86,
        pricing: "Interchange++ Custom",
        sentiment: "85% Positive",
        growthVelocity: "+27% YoY",
        coreStrength: "Direct bank connections globally and unparalleled auth rates",
        keyVulnerability: "High minimum volume commitments ($50k/mo MRR) shut out mid-market scaleups",
        recentMoves: "Expanded unified commerce point-of-sale in APAC regions"
      },
      {
        name: "Paddle",
        tier: "Merchant of Record",
        threatLevel: "med",
        threatScore: 70,
        pricing: "5% + 50¢ (All-in MoR)",
        sentiment: "76% Positive",
        growthVelocity: "+18% YoY",
        coreStrength: "Zero sales tax/VAT compliance headache for digital goods",
        keyVulnerability: "High blended take-rate becomes prohibitive at >$5M ARR",
        recentMoves: "Launched Paddle AI billing engine for usage-based micro-subscriptions"
      }
    ],
    featureMatrix: [
      { feature: "Autonomous Smart Routing (Lowest Fee Rail)", omniflow: "Live ML Routing", notion: "Stripe Sigma (Add-on)", linear: "RevenueAccelerate", taskade: "Basic" },
      { feature: "Instant Cross-Border Stablecoin Settlement", omniflow: "Yes (USDC/USDT 0.1%)", notion: "Beta (Select Accounts)", linear: "Pilot Only", taskade: "No" },
      { feature: "Dynamic Chargeback Auto-Defense Agent", omniflow: "Native LLM Evidence Pack", notion: "Radar ($0.05/tx)", linear: "Chargeback Defense", taskade: "Manual" },
      { feature: "Custom Merchant of Record Hybrid Mode", omniflow: "Flexible Switch", notion: "No (Separate MoR)", linear: "Direct Merchant Only", taskade: "MoR Only" }
    ],
    sentimentVectors: {
      positiveVectors: [
        { topic: "Chargeback Win Rates", percentage: 94, quote: "The AI agent drafted dispute evidence packs that boosted win rates from 28% to 64%." },
        { topic: "Transparent FX Margins", percentage: 89, quote: "Saved over $14,000 last month on our EU-to-US revenue repatriation." }
      ],
      frictionVectors: [
        { topic: "Local Payment Methods in LATAM", percentage: 55, quote: "Need deeper Pix and OXXO direct integrations." }
      ]
    },
    playbooks: [
      {
        id: "pb-fin-1",
        type: "Customer Conquest",
        title: "Target SaaS Founders Frustrated by Stripe Account Holds",
        impact: "+$420k Processing Volume",
        risk: "Low",
        description: "Over 3,000 complaints on X and HackerNews in the past 90 days regarding unexpected Stripe account holds and reserves.",
        steps: [
          "Launch 'Instant Underwriting & Zero-Hold Guarantee' program.",
          "Provide automated 1-click Stripe billing token migration without customer re-entry.",
          "Target mid-market SaaS ($50k-$500k MRR) with transparent risk evaluation."
        ]
      },
      {
        id: "pb-fin-2",
        type: "Product Moat",
        title: "Launch Autonomous AI Fraud Defender with Zero False Positives",
        impact: "+18% Auth Rate Improvement",
        risk: "Medium",
        description: "Traditional rules engines block legitimate high-ticket enterprise transactions.",
        steps: [
          "Deploy multi-modal behavioral biometric verification agents.",
          "Guarantee full reimbursement for any chargebacks slipped past Level 3 screening."
        ]
      }
    ]
  },

  cloud_database: {
    id: "cloud_database",
    name: "Modern Cloud Databases & AI Backends",
    targetCompany: "NexusDB Serverless",
    marketSector: "Serverless Postgres & Vector Intelligence Platform",
    lastUpdated: "2026-08-26 14:15 EST",
    metrics: {
      threatIndex: 75,
      threatChange: "+5% MoM",
      threatStatus: "Moderate Watch",
      pricingGap: "-40%",
      pricingGapNote: "40% Lower Cold-Start & Compute Pricing",
      sentimentScore: "92/100",
      sentimentDelta: "+12.0 pts",
      featureParity: "86%",
      featureCount: "25 / 29 Tracked Features"
    },
    competitors: [
      {
        name: "Supabase",
        tier: "Open-Source Leader",
        threatLevel: "high",
        threatScore: 90,
        pricing: "$25 / mo Pro Tier",
        sentiment: "89% Positive",
        growthVelocity: "+45% YoY",
        coreStrength: "Immense community, full-suite auth/storage/realtime ecosystem",
        keyVulnerability: "Branching compute costs escalate rapidly on high concurrency",
        recentMoves: "Deep pgvector optimizations and index tuning agents"
      },
      {
        name: "Neon Postgres",
        tier: "Serverless Postgres Innovator",
        threatLevel: "high",
        threatScore: 84,
        pricing: "Consumption Based",
        sentiment: "87% Positive",
        growthVelocity: "+52% YoY",
        coreStrength: "Instant branching, scale-to-zero compute, and Vercel native partnership",
        keyVulnerability: "Cold-start latency spikes (300-800ms) on dormant branches",
        recentMoves: "Introduced Neon Auth and automated database tuning bots"
      }
    ],
    featureMatrix: [
      { feature: "Instant Schema & Data Branching", omniflow: "< 50ms (Zero-Copy)", notion: "Manual Preview", linear: "Instant (< 200ms)", taskade: "N/A" },
      { feature: "Integrated Hybrid Search (Vector + Fulltext)", omniflow: "Native GPU Accelerated", notion: "pgvector Extensions", linear: "pgvector Extensions", taskade: "N/A" },
      { feature: "Autonomous Slow Query Optimizer Agent", omniflow: "Self-Healing Indexes", notion: "Index Advisor", linear: "Performance Dashboard", taskade: "N/A" },
      { feature: "Zero Cold Start Latency", omniflow: "< 15ms Warm Pool", notion: "Dedicated (No Cold)", linear: "300-600ms", taskade: "N/A" }
    ],
    sentimentVectors: {
      positiveVectors: [
        { topic: "Developer DX & Query Speed", percentage: 96, quote: "Sub-20ms cold starts on serverless Edge functions changed our entire architecture." }
      ],
      frictionVectors: [
        { topic: "Python SDK Maturity", percentage: 58, quote: "TypeScript SDK is stellar, but Async Python drivers need more ORM examples." }
      ]
    },
    playbooks: [
      {
        id: "pb-db-1",
        type: "Technical Showcase",
        title: "Run 'Zero Cold Start' Live Interactive Benchmark Challenge",
        impact: "+50,000 GitHub Stars & Dev Signups",
        risk: "Low",
        description: "Benchmark NexusDB vs Neon vs Supabase in public real-time testing sandbox.",
        steps: [
          "Deploy open-source automated benchmarking repository on GitHub.",
          "Live stream 1,000,000 synthetic vector queries with p99 latency graphs."
        ]
      }
    ],
    trendHistory: [
      { month: "Mar", score: 68, compAvg: 60 },
      { month: "Apr", score: 72, compAvg: 62 },
      { month: "May", score: 75, compAvg: 65 },
      { month: "Jun", score: 81, compAvg: 67 },
      { month: "Jul", score: 87, compAvg: 70 },
      { month: "Aug", score: 92, compAvg: 72 }
    ]
  }
};

// Add trend history to other scenarios
PRESET_SCENARIOS.ai_workspace.trendHistory = [
  { month: "Mar", score: 62, compAvg: 55 },
  { month: "Apr", score: 68, compAvg: 58 },
  { month: "May", score: 74, compAvg: 61 },
  { month: "Jun", score: 71, compAvg: 64 },
  { month: "Jul", score: 80, compAvg: 66 },
  { month: "Aug", score: 88, compAvg: 68 }
];

PRESET_SCENARIOS.fintech_payments.trendHistory = [
  { month: "Mar", score: 70, compAvg: 65 },
  { month: "Apr", score: 73, compAvg: 68 },
  { month: "May", score: 78, compAvg: 70 },
  { month: "Jun", score: 82, compAvg: 71 },
  { month: "Jul", score: 86, compAvg: 74 },
  { month: "Aug", score: 91, compAvg: 76 }
];

/**
 * Generate a dynamic real-time intelligence dataset for any custom company/URL entered by user
 */
export function generateCustomScenario(targetName, domain = "") {
  const cleanName = targetName.trim() || "Custom Enterprise Target";
  const cleanDomain = domain.trim() || "custom-target.com";

  return {
    id: "custom_" + Date.now(),
    name: `Custom Analysis: ${cleanName}`,
    targetCompany: cleanName,
    marketSector: `Autonomous Intelligence Scan on ${cleanDomain}`,
    lastUpdated: "Just Now (Live Swarm Scan)",
    metrics: {
      threatIndex: Math.floor(Math.random() * 20) + 70,
      threatChange: "+9% MoM",
      threatStatus: "Active Recon",
      pricingGap: "-22%",
      pricingGapNote: "22% Estimated Margin Advantage",
      sentimentScore: "86/100",
      sentimentDelta: "+7.2 pts",
      featureParity: "84%",
      featureCount: "26 / 31 Tracked Features"
    },
    competitors: [
      {
        name: `${cleanName} Direct Competitor A`,
        tier: "Incumbent Leader",
        threatLevel: "high",
        threatScore: 86,
        pricing: "$29 / user / mo",
        sentiment: "78% Positive",
        growthVelocity: "+22% YoY",
        coreStrength: "Established brand equity and enterprise sales network",
        keyVulnerability: "Legacy architecture and slow feature turnaround",
        recentMoves: "Announced Q4 price restructuring"
      },
      {
        name: `${cleanName} Challenger B`,
        tier: "Fast Follower",
        threatLevel: "med",
        threatScore: 72,
        pricing: "$15 / user / mo",
        sentiment: "84% Positive",
        growthVelocity: "+35% YoY",
        coreStrength: "Modern minimalist UI and fast onboarding",
        keyVulnerability: "Lack of deep SOC2 compliance and enterprise RBAC",
        recentMoves: "Launched community beta program"
      }
    ],
    featureMatrix: [
      { feature: "Autonomous Agent Orchestration", omniflow: "Native (Live)", notion: "Prompt-Based", linear: "Webhook Only", taskade: "Basic" },
      { feature: "Real-time Telemetry Scraper", omniflow: "Yes (< 500ms)", notion: "Manual", linear: "N/A", taskade: "N/A" },
      { feature: "One-Click Executive Playbooks", omniflow: "Automated (ARR Projections)", notion: "N/A", linear: "N/A", taskade: "N/A" }
    ],
    sentimentVectors: {
      positiveVectors: [
        { topic: "Onboarding Experience", percentage: 91, quote: `Setting up ${cleanName} took under 5 minutes with immediate value.` }
      ],
      frictionVectors: [
        { topic: "Integration Breadth", percentage: 46, quote: "Would love to see native connectors to Zapier and Make." }
      ]
    },
    playbooks: [
      {
        id: "pb-custom-1",
        type: "Growth Campaign",
        title: `Capture Market Share from ${cleanName} Legacy Incumbents`,
        impact: "+$240k Projected ARR",
        risk: "Low",
        description: `Autonomous strategy attacking ${cleanName}'s competitors' pricing friction.`,
        steps: [
          "Deploy transparent migration calculator on landing page.",
          "Target competitor brand keywords on Google Search.",
          "Offer fast-track onboarding with white-glove migration support."
        ]
      }
    ],
    trendHistory: [
      { month: "Mar", score: 55, compAvg: 50 },
      { month: "Apr", score: 62, compAvg: 54 },
      { month: "May", score: 71, compAvg: 58 },
      { month: "Jun", score: 79, compAvg: 62 },
      { month: "Jul", score: 84, compAvg: 65 },
      { month: "Aug", score: 89, compAvg: 68 }
    ]
  };
}

