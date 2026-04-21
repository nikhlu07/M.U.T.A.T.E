<div align="center">

<img src="assets/hero_banner.png" alt="M.U.T.A.T.E. — Evolutionary AI for Digital Culture" width="100%"/>

# 🧬 M.U.T.A.T.E.

### **Multi-agent Unsupervised Token Adaptation and Trait Evolution**

*Autonomous A/B Testing and Evolution for Digital Culture & Tokenomics*

[![Four.Meme AI Sprint](https://img.shields.io/badge/Four.Meme-AI_Sprint-FFD700?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iI0ZGRDcwMCIgZD0iTTEyIDJMMyAyMGgyMHoiLz48L3N2Zz4=&logoColor=white)](https://four.meme)
[![BNB Chain](https://img.shields.io/badge/BNB_Chain-Mainnet-F0B90B?style=for-the-badge&logo=binance&logoColor=white)](https://www.bnbchain.org/)
[![Gemma 4](https://img.shields.io/badge/Gemma_4-Multimodal-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![License](https://img.shields.io/badge/License-MIT-00C853?style=for-the-badge)](LICENSE)

---

> **M.U.T.A.T.E.** deploys a swarm of **15,000+ autonomous AI agents** that utilize evolutionary computation and simulated market pressure to **breed, test, and optimize memecoins** with mathematical precision — before executing a live mainnet deployment.

<br/>

| 🧬 Generations | 🤖 AI Agents | 📊 Signals | ⛓️ Target Chain |
|:---:|:---:|:---:|:---:|
| **50+** evolutionary cycles | **15,000+** autonomous traders | **Multi-signal** hybrid fitness | **BNB Chain** via Four.Meme |

</div>

---

## 📖 Table of Contents

- [The Problem Landscape](#-the-problem-landscape)
- [Architecture Overview](#-the-mutate-architecture)
- [Synthetic Market Swarm](#1-the-synthetic-market-swarm)
- [Multi-Signal Fitness Function](#2-multi-signal-fitness-function)
- [Dual-Engine Evolution](#3-dual-engine-evolution)
- [Real-Time Dashboard](#4-real-time-evolutionary-dashboard)
- [Integration Topology](#-bnb-chain-integration-topology)
- [Quick Start](#-quick-start)
- [Mainnet Graduation](#5-mainnet-graduation)
- [Tech Stack](#-tech-stack)

---

## ⚠️ The Problem Landscape

Current AI agent deployments in decentralized finance rely heavily on historical data or raw human intuition to generate tokens, hitting a **"data wall"** when attempting to create novel cultural artifacts.

```mermaid
graph LR
    subgraph Current_Approaches ["❌ Current Approaches"]
        direction TB
        A["📉 Historical Data<br/>Backward-looking"]
        B["🧠 Human Intuition<br/>Unscalable"]
        C["🤖 Static AI Generators<br/>No adaptation"]
    end

    subgraph Failure_Modes ["💀 Failure Modes"]
        direction TB
        D["🔁 Testnet Paradox<br/>Bots ≠ Real users"]
        E["📦 Low Structural Fidelity<br/>No cultural understanding"]
        F["📐 Vectorization Gap<br/>Culture is discrete, not continuous"]
    end

    A --> D
    B --> E
    C --> F

    style Current_Approaches fill:#1a1a2e,stroke:#e74c3c,color:#fff
    style Failure_Modes fill:#1a1a2e,stroke:#ff6b6b,color:#fff
```

<details>
<summary><b>🔍 Deep Dive: The Three Core Challenges</b></summary>

<br/>

| Challenge | What Goes Wrong | Why It Matters |
|:---|:---|:---|
| **🔁 The Testnet Paradox** | Optimizing tokens with valueless testnet currency produces agents that appeal only to bots — not real users or economic conditions | Market feedback is synthetic and misleading |
| **📦 Structural Fidelity** | High-fidelity simulations (e.g., NASDAQ-like order books) rely on simplistic agents incapable of understanding narrative or culture | Technical accuracy without behavioral realism is useless |
| **📐 Vectorizing Culture** | Cultural resonance is discrete and semantic — not continuous. Gradient descent cannot capture meme virality | You can't `loss.backward()` your way to a good meme |

</details>

---

## 💡 The M.U.T.A.T.E. Architecture

M.U.T.A.T.E. resolves these issues by **decoupling economic optimization from cultural evolution** and replacing testnets with a **high-fidelity synthetic market** powered by LLMs.

### 🏛️ High-Level System Flow

```mermaid
graph TD
    subgraph Input_Layer ["🌱 Seed Layer"]
        SEED["Initial Token Genome<br/>Name · Logo · Narrative · Tokenomics"]
    end

    subgraph Evolution_Core ["🧬 Evolution Core"]
        direction LR
        ECO["🧮 Economic Engine<br/>CMA-ES Optimizer"]
        CUL["🎨 Cultural Engine<br/>Gemma 4 + Slerp"]
    end

    subgraph Simulation_Environment ["🌐 Synthetic Market"]
        EX["📊 Synthetic Exchange<br/>Continuous Double Auction"]
        SWARM["🤖 15,000+ AI Agents<br/>Diverse Behavioral Profiles"]
        EX <--> SWARM
    end

    subgraph Evaluation ["📈 Fitness Evaluation"]
        FIT["Multi-Signal Hybrid Scorer"]
    end

    subgraph Output_Layer ["🚀 Output"]
        DASH["📺 D3.js Dashboard<br/>Real-Time Monitoring"]
        DEPLOY["⛓️ BNB Chain<br/>Four.Meme SDK"]
    end

    SEED --> Evolution_Core
    ECO --> EX
    CUL --> EX
    EX --> FIT
    FIT -->|"Score < Target"| Evolution_Core
    FIT -->|"Score ≥ Target"| DEPLOY
    Evolution_Core -.->|"Live Telemetry"| DASH
    FIT -.->|"Fitness Data"| DASH

    style Input_Layer fill:#0d1117,stroke:#58a6ff,color:#c9d1d9
    style Evolution_Core fill:#0d1117,stroke:#a855f7,color:#c9d1d9
    style Simulation_Environment fill:#0d1117,stroke:#22c55e,color:#c9d1d9
    style Evaluation fill:#0d1117,stroke:#f59e0b,color:#c9d1d9
    style Output_Layer fill:#0d1117,stroke:#ef4444,color:#c9d1d9
```

### 🔄 Evolutionary Lifecycle (Per Generation)

```mermaid
stateDiagram-v2
    [*] --> Seeding: Initialize Population
    Seeding --> Deployment: Deploy tokens to Synthetic Exchange
    Deployment --> Simulation: 15K agents trade for simulated window
    Simulation --> Evaluation: Collect market signals
    Evaluation --> Selection: Rank by Hybrid Fitness Score
    Selection --> Crossover: Top performers breed
    Crossover --> Mutation: Stochastic perturbation
    Mutation --> Deployment: Next generation deployed

    Selection --> Graduation: Score ≥ Target Threshold
    Graduation --> HumanApproval: Dashboard alert
    HumanApproval --> MainnetDeploy: Approved
    HumanApproval --> Selection: Rejected — continue evolving
    MainnetDeploy --> [*]

    note right of Simulation
        Each cycle simulates 30-420 min
        of real market behavior
    end note
```

---

### 1. The Synthetic Market Swarm

<div align="center">
<img src="assets/swarm_visualization.png" alt="Synthetic Market Swarm — 15,000+ AI Agents" width="85%"/>
<br/>
<em>Visualization: 15,000+ AI agents with distinct behavioral profiles interacting through a central synthetic exchange</em>
</div>

<br/>

Tokens are deployed into an **off-chain simulated exchange** featuring **nanosecond-resolution continuous double auction** mechanics. The swarm is powered by **Google AI Studio**.

#### 🤖 Agent Taxonomy

```mermaid
mindmap
  root((🤖 Agent Swarm<br/>15,000+))
    🐂 Momentum Traders
      Trend followers
      FOMO-driven entry
      High turnover
    💎 Diamond Hands
      Long-term holders
      High loss aversion
      Community builders
    🎰 Speculators
      High-risk appetite
      Narrative-driven
      Quick flip strategy
    🐑 Herd Followers
      Social proof dependent
      Late adopters
      Copy-trading behavior
    🐋 Whales
      Large position sizing
      Market-moving trades
      Strategic accumulation
    📢 Influencers
      Narrative amplifiers
      Social signal generators
      Community catalysts
```

#### Agent Behavioral Dimensions

| Dimension | Range | Impact |
|:---|:---|:---|
| **Loss Aversion** | `0.5 — 3.0` | Sell pressure sensitivity |
| **Herding Coefficient** | `0.0 — 1.0` | Social proof influence |
| **Risk Appetite** | `Conservative → Degen` | Position sizing & entry timing |
| **Narrative Sensitivity** | `Low → High` | Meme/culture responsiveness |
| **Time Horizon** | `Seconds → Weeks` | Hold duration distribution |
| **Information Processing** | `Noise → Signal` | Fundamental vs. hype trading |

---

### 2. Multi-Signal Fitness Function

The system evaluates tokens using a **Hybrid Score** composed of weighted market signals. This avoids gaming any single metric.

```mermaid
graph LR
    subgraph Market_Signals ["📡 Market Signals"]
        H["👥 Holder Count Growth"]
        T["⏱️ Temporal Dynamics"]
        V["💰 Trading Volume"]
        L["📊 Liquidity Depth"]
        S["📣 Social Propagation"]
    end

    subgraph Weights ["⚖️ Weight Distribution"]
        W1["w₁ = 0.35"]
        W2["w₂ = 0.25"]
        W3["w₃ = 0.20"]
        W4["w₄ = 0.12"]
        W5["w₅ = 0.08"]
    end

    subgraph Score ["🎯 Output"]
        HS["Hybrid<br/>Fitness<br/>Score"]
    end

    H --> W1 --> HS
    T --> W2 --> HS
    V --> W3 --> HS
    L --> W4 --> HS
    S --> W5 --> HS

    style Market_Signals fill:#0d1117,stroke:#22c55e,color:#c9d1d9
    style Weights fill:#0d1117,stroke:#f59e0b,color:#c9d1d9
    style Score fill:#0d1117,stroke:#ef4444,color:#c9d1d9
```

<details>
<summary><b>📐 Fitness Formula Breakdown</b></summary>

<br/>

```
F(token) = w₁·ΔHolders + w₂·TemporalVelocity + w₃·Volume + w₄·LiquidityDepth + w₅·SocialSpread
```

| Signal | Weight | Rationale |
|:---|:---:|:---|
| **Holder Count Growth** | `0.35` | Highest weight — hardest metric to fake. Organic growth = real traction |
| **Temporal Dynamics** | `0.25` | Measures engagement velocity during the critical 30–420 min window |
| **Trading Volume** | `0.20` | Captures sustained economic interest beyond initial hype |
| **Liquidity Depth** | `0.12` | Order book health — shallow depth = fragile market |
| **Social Propagation** | `0.08` | Cross-agent narrative spread — culture is contagious |

</details>

---

### 3. Dual-Engine Evolution

M.U.T.A.T.E. runs **two parallel evolutionary engines** that co-evolve a token's economic parameters and cultural identity simultaneously.

```mermaid
flowchart TB
    subgraph Parent_Selection ["🏆 Parent Selection"]
        P1["Parent A<br/>High Fitness"]
        P2["Parent B<br/>High Fitness"]
    end

    subgraph Economic_Engine ["🧮 Economic Engine — CMA-ES"]
        direction TB
        E1["Extract numeric genome<br/>fees, supply, bonding curve params"]
        E2["Covariance Matrix Adaptation"]
        E3["Margin correction<br/>prevents premature convergence"]
        E1 --> E2 --> E3
    end

    subgraph Cultural_Engine ["🎨 Cultural Engine — Gemma 4 + Slerp"]
        direction TB
        C1["Extract semantic genome<br/>name, logo, narrative, vibe"]
        C2["Gemma 4 Multimodal Crossover<br/>text · image · audio"]
        C3["Spherical Linear Interpolation<br/>preserves latent space integrity"]
        C1 --> C2 --> C3
    end

    subgraph Offspring ["🧬 Next Generation"]
        CHILD["Child Token<br/>Optimized Economics + Evolved Culture"]
    end

    P1 --> E1
    P2 --> E1
    P1 --> C1
    P2 --> C1
    E3 --> CHILD
    C3 --> CHILD

    style Economic_Engine fill:#0d1117,stroke:#3b82f6,color:#c9d1d9
    style Cultural_Engine fill:#0d1117,stroke:#a855f7,color:#c9d1d9
    style Offspring fill:#0d1117,stroke:#22c55e,color:#c9d1d9
```

#### Why Two Engines?

| Aspect | 🧮 Economic (CMA-ES) | 🎨 Cultural (Gemma 4 + Slerp) |
|:---|:---|:---|
| **Domain** | Continuous numerical parameters | Discrete semantic artifacts |
| **Genome** | Fees, supply, bonding curves | Name, logo, narrative, vibe |
| **Crossover** | Matrix-weighted recombination | Multimodal semantic blending |
| **Interpolation** | Standard linear | Spherical (Slerp) — preserves manifold geometry |
| **Mutation** | Gaussian noise + margin correction | LLM-guided creative perturbation |
| **Risk** | Premature convergence | Latent space collapse → blurry outputs |
| **Mitigation** | CMA-ES adaptive step sizing | Slerp normalizes on unit hypersphere |

<details>
<summary><b>🔬 Technical: Why Slerp over Lerp?</b></summary>

<br/>

Standard linear interpolation (`Lerp`) in high-dimensional embedding spaces causes vectors to "cut through" the hypersphere, producing semantically invalid midpoints (the "blurry average" problem).

**Spherical Linear Interpolation** (`Slerp`) follows the geodesic on the unit hypersphere surface:

```
Slerp(p₀, p₁, t) = p₀ · sin((1-t)·Ω) / sin(Ω) + p₁ · sin(t·Ω) / sin(Ω)
```

where `Ω = arccos(p₀ · p₁)` is the angle between parent embeddings.

This ensures every interpolated point lies on the semantic manifold, producing culturally coherent offspring rather than noise.

</details>

---

### 4. Real-Time Evolutionary Dashboard

Built with **D3.js**, the dashboard provides live observability into every layer of the evolutionary process.

```mermaid
block-beta
    columns 3

    block:header:3
        columns 3
        h1["🧬 M.U.T.A.T.E. Evolution Monitor"]
        h2["Generation: 34/50"]
        h3["Best Fitness: 0.847"]
    end

    block:left
        columns 1
        l1["📊 Live Auction Market"]
        l2["Bid/Ask · Price · Volume"]
    end

    block:center
        columns 1
        c1["🌳 Phylogenetic Tree"]
        c2["Token lineage across generations"]
    end

    block:right
        columns 1
        r1["🎯 Fitness Heatmap"]
        r2["Signal breakdown per token"]
    end

    block:bottom:3
        columns 2
        b1["🤖 Agent Behavior Monitor — Swarm sentiment & cluster activity"]
        b2["📈 Generation Stats — Population diversity · Convergence rate"]
    end

    style header fill:#161b22,stroke:#30363d,color:#c9d1d9
    style left fill:#0d1117,stroke:#3b82f6,color:#c9d1d9
    style center fill:#0d1117,stroke:#22c55e,color:#c9d1d9
    style right fill:#0d1117,stroke:#f59e0b,color:#c9d1d9
    style bottom fill:#0d1117,stroke:#a855f7,color:#c9d1d9
```

#### Dashboard Views

| Panel | Visualization | Purpose |
|:---|:---|:---|
| **Live Auction** | Real-time candlestick + order book depth | Monitor micro-level token price action |
| **Phylogenetic Tree** | Tidy tree / dendrogram | Track evolutionary lineage across generations |
| **Fitness Heatmap** | Multi-signal heatmap grid | Identify which signals drive top performers |
| **Agent Monitor** | Force-directed graph | Observe swarm sentiment shifts & cluster behavior |
| **Generation Stats** | Line charts + bar charts | Track convergence, diversity, and fitness trajectory |

---

## 🔗 BNB Chain Integration Topology

```mermaid
graph TB
    subgraph MUTATE_Core ["🧬 M.U.T.A.T.E. Core"]
        ENGINE["Evolution Engine"]
    end

    subgraph Bounty_Integrations ["🏆 Bounty Integrations"]
        FM["🔗 Four.Meme SDK<br/>Token Deployment"]
        DG["⚡ DGrid AI Gateway<br/>Agent Infrastructure"]
        PC["🐾 Pieverse Purrfect Claw<br/>Secure Agent Wallet"]
        MYX["💰 MYX Finance<br/>Perpetual Markets"]
    end

    subgraph BNB ["⛓️ BNB Chain"]
        MAIN["BNB Mainnet"]
        NFT["ERC-8004 Identity NFT"]
        PERP["Perpetual Market"]
    end

    ENGINE -->|"Winning token"| FM
    ENGINE -->|"15K agent calls"| DG
    ENGINE -->|"Wallet ops"| PC
    ENGINE -->|"Post-launch"| MYX

    FM -->|"create-instant"| MAIN
    FM -->|"8004-register"| NFT
    PC -->|"TEE-signed txns"| MAIN
    MYX -->|"$20K TVL"| PERP

    style MUTATE_Core fill:#0d1117,stroke:#a855f7,color:#c9d1d9
    style Bounty_Integrations fill:#0d1117,stroke:#f59e0b,color:#c9d1d9
    style BNB fill:#0d1117,stroke:#F0B90B,color:#c9d1d9
```

<details>
<summary><b>🔗 Four.Meme SDK — Token Deployment Pipeline</b></summary>

<br/>

Deploys winning tokens to BNB Chain via the Four.Meme API:

```
POST /meme-api/v1/public/user/login    → Authenticate
fourmeme create-instant                 → Deploy token contract
fourmeme 8004-register                  → Mint ERC-8004 identity NFT
```

</details>

<details>
<summary><b>⚡ DGrid AI Gateway — Agent Infrastructure</b></summary>

<br/>

Handles the **15,000+ agent** swarm with:
- Hardware-anchored infrastructure
- Leaderless P2P coordination
- x402 settlement resilience

</details>

<details>
<summary><b>🐾 Pieverse Purrfect Claw — Secure Agent Wallet</b></summary>

<br/>

Secure agent wallet via **TEE (Trusted Execution Environment)**:
- **x402b protocol** for gasless transactions
- Fully auditable payment trail
- Private key never leaves the enclave

</details>

<details>
<summary><b>💰 MYX Finance ($5,000 Bounty) — Perpetual Markets</b></summary>

<br/>

Integrates with the **MYX V2 engine** for post-launch perpetual market activation:
- Minimum **$20,000 TVL** threshold
- Automatic perpetual market creation for graduated tokens

</details>

---

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone https://github.com/your-org/mutate-agent.git
cd mutate-agent
pip install -r requirements.txt
```

### 2. Environment Configuration

Copy `.env.example` → `.env`

> [!CAUTION]
> **Never commit your `.env` or private keys to version control.**

```env
# LLM & Swarm Infrastructure (Google AI Studio)
GOOGLE_API_KEY=AIzaSy...
DGRID_GATEWAY_URL=https://...

# BNB Chain & Four.Meme Deployment
WALLET_PRIVATE_KEY=0x...
BSC_RPC_URL=https://bsc-dataseed.binance.org/
```

### 3. Run the Synthetic Evolution Sandbox

```bash
python scripts/run_evolution.py --generations 50 --swarm-size 15000
```

### 4. Start the D3.js Dashboard

```bash
cd dashboard && npm install && npm run start
```

Open: 👉 [http://localhost:3000](http://localhost:3000) — Watch your AI swarm evolve memecoins in real time.

---

### 5. Mainnet Graduation

```mermaid
sequenceDiagram
    participant S as 🧬 M.U.T.A.T.E. Engine
    participant D as 📺 D3.js Dashboard
    participant H as 👤 Human Operator
    participant F as 🔗 Four.Meme SDK
    participant B as ⛓️ BNB Chain

    Note over S: Generation N complete
    S->>S: Evaluate Hybrid Fitness Score
    
    alt Score ≥ Target Threshold
        S->>D: 🚨 Trigger Graduation Alert
        D-->>H: Prompt for manual approval
        H->>D: ✅ Approves deployment
        D->>F: POST /meme-api/v1/public/user/login
        F->>F: fourmeme create-instant
        F->>F: fourmeme 8004-register
        F->>B: Deploy token to mainnet
        B-->>S: ✅ Confirm live deployment
        Note over B: Token is LIVE on BNB Chain
    else Score < Target
        S->>S: Continue evolution → Gen N+1
    end
```

```bash
fourmeme create-instant   # Deploys optimized token to BNB Chain
```

---

## 🛠️ Tech Stack

```mermaid
graph LR
    subgraph AI_Layer ["🧠 AI & Evolution"]
        G4["Gemma 4 Multimodal"]
        CMA["CMA-ES Optimizer"]
        GAS["Google AI Studio"]
    end

    subgraph Infra_Layer ["⚙️ Infrastructure"]
        DG["DGrid AI Gateway"]
        PV["Pieverse TEE Wallet"]
        D3["D3.js Dashboard"]
    end

    subgraph Chain_Layer ["⛓️ Blockchain"]
        FM["Four.Meme SDK"]
        BNB["BNB Chain"]
        MYX["MYX Finance V2"]
    end

    AI_Layer --> Infra_Layer --> Chain_Layer

    style AI_Layer fill:#0d1117,stroke:#4285F4,color:#c9d1d9
    style Infra_Layer fill:#0d1117,stroke:#22c55e,color:#c9d1d9
    style Chain_Layer fill:#0d1117,stroke:#F0B90B,color:#c9d1d9
```

| Layer | Technology | Role |
|:---|:---|:---|
| **AI** | Gemma 4 Multimodal | Cultural crossover, narrative generation, image evolution |
| **AI** | CMA-ES | Numerical tokenomics optimization |
| **AI** | Google AI Studio | LLM inference for 15K agent swarm |
| **Infra** | DGrid AI Gateway | Scalable agent orchestration (P2P, x402) |
| **Infra** | Pieverse Purrfect Claw | TEE-secured wallet operations |
| **Infra** | D3.js | Real-time evolutionary dashboard |
| **Chain** | Four.Meme SDK | Token deployment to BNB Chain |
| **Chain** | BNB Chain | Target mainnet for graduated tokens |
| **Chain** | MYX Finance V2 | Post-launch perpetual market creation |

---

<div align="center">

### Built for the [Four.Meme AI Sprint](https://four.meme) 🧬

*Evolving digital culture, one generation at a time.*

<br/>

[![BNB Chain](https://img.shields.io/badge/Deployed_on-BNB_Chain-F0B90B?style=flat-square&logo=binance&logoColor=white)](https://www.bnbchain.org/)
[![Google AI](https://img.shields.io/badge/Powered_by-Gemma_4-4285F4?style=flat-square&logo=google&logoColor=white)](https://ai.google.dev/)
[![Four.Meme](https://img.shields.io/badge/Four.Meme-SDK-FFD700?style=flat-square)](https://four.meme)

</div>
