# NotebookLM Presentation Prompt
## Spot Exposure Monitor — CoinDCX

---

## HOW TO USE THIS WITH NOTEBOOKLM

1. Go to **notebooklm.google.com**
2. Create a new notebook
3. Upload two sources: this file + the `architecture.html` file
4. Use the prompts below one by one in the chat window
5. Each prompt generates one section of your presentation

---

## CONTEXT BLOCK
*(Feed this first — paste into NotebookLM before any other prompts)*

```
I am presenting a technical project called the "Spot Exposure Monitor" — a 
risk intelligence dashboard built for CoinDCX's spot trading desk. Here is 
the full project context:

WHAT THE PROJECT DOES:
- Reads a spot exposure Excel sheet and renders a live, interactive risk 
  dashboard in the browser
- Shows top 10 long and short token exposures as a treemap and ranked tables
- Fires alerts for any token with >$50,000 exposure on either side
- Allows clicking any token to see its 30-day exposure buildup on a chart
- Provides a full searchable/sortable table of all 672+ tokens
- Loads with NO pre-embedded data — the user uploads the file, privacy-first

KEY DESIGN DECISIONS:
- Single HTML file, zero backend in Phase 1 — file upload processed entirely 
  in the browser using SheetJS
- Data never sent to any server (verifiable by network inspection)
- Single fetchData() function is the only seam between data source and UI
- In Phase 2: swap fetchData() to call REST API — zero frontend changes
- In Phase 3: swap fetchData() to subscribe to WebSocket — zero UI changes
- Node.js server in 15 lines, Railway deployment in 4 steps

TECH STACK:
- SheetJS — Excel parsing in browser
- Chart.js — time-series visualization  
- Vanilla JavaScript — no build toolchain, fully portable
- Node.js (http module) — serves the HTML file
- Railway — GitHub push-to-deploy hosting

THE DATA:
- Source: CoinDCX Spot Exposure calculations Excel sheet
- ~1,244 tokens tracked
- Key columns: Exposure in USDT, Price, Net Assets, Binance, Binance Futures, 
  TPE, User, FB Cold, Huobi, KuCoin, GateIO, Total AUC, Total Assets $
- Alert threshold: $50,000 USD exposure on either long or short side
- Current architecture: single snapshot in time (file upload)
- Future architecture: real-time Kafka → Flink → TimescaleDB → Express → 
  WebSocket pipeline

MY ROLE:
- Conceived and designed the architecture
- Built the complete frontend: treemap, charts, alerts, tables, state management
- Designed the pipeline integration strategy (phased approach)
- Created the deployment infrastructure on Railway
```

---

## PROMPT 1 — OPENING SLIDE

```
Write the content for the opening slide of a presentation about the Spot 
Exposure Monitor. Include:
- A punchy one-line headline that captures what this does for a risk team
- A 2-sentence subheadline explaining the problem it solves
- Three bullet points with the key capabilities (exposure visibility, 
  alerts, timeline)
- A footnote: "Built for CoinDCX Spot Trading Desk · March 2026"

Tone: confident, technical but not jargon-heavy. Audience is a mix of 
engineering managers and risk/finance stakeholders.
```

---

## PROMPT 2 — THE PROBLEM SLIDE

```
Write the "Problem Statement" slide. Structure it as:

Header: "The Challenge Before This Dashboard"

Three problem statements, each with a bold label and 2-sentence description:
1. Fragmented visibility — exposure data lived only in Excel, manually updated
2. No alerts — risk managers had to read row by row to find large positions
3. No trend context — a snapshot can't show if exposure is building or shrinking

End with one line: "What we built: a real-time-ready risk surface that works 
today with zero new infrastructure."
```

---

## PROMPT 3 — HOW IT WORKS (DEMO SCRIPT)

```
Write a 90-second demo script I can use when screen-sharing the dashboard. 
Walk through these steps in natural spoken language:

1. The blank upload screen — explain why data isn't pre-loaded (privacy, no stale data)
2. Drag-drop the Excel file — what happens (SheetJS parses in browser, nothing sent to server)
3. The alert ticker appears — explain the $50K threshold
4. The treemap — explain how size = exposure magnitude, colors = long/short
5. Click a token (e.g. AWE which has -$130K short) — timeline chart appears
6. The full table — show search, filter by Long/Short/Alerts, click-to-sort
7. Close: "Everything you just saw runs in a single HTML file with no backend"

Make it sound conversational and confident, not scripted. Use "I" voice.
```

---

## PROMPT 4 — ARCHITECTURE SLIDE

```
Write the content for an architecture slide titled "How It's Built — And 
Where It's Going". 

Structure as two columns:

LEFT COLUMN — "Phase 1: Today"
- Browser-only data processing
- SheetJS parses Excel → normalizeRow() → STATE → renderAll()
- 15-line Node.js server on Railway
- Zero external dependencies, zero ongoing cost

RIGHT COLUMN — "Phase 2-4: Future (same frontend, new data source)"
- Phase 2: REST API → fetchData() calls fetch('/api/exposure/latest')
- Phase 3: WebSocket → fetchData() subscribes to live stream  
- Phase 4: Kafka → Flink → TimescaleDB → Express → dashboard

Include a callout box: "Only one function changes across all 4 phases: 
fetchData(). The entire UI — treemaps, alerts, charts, tables — reuses 
as-is."
```

---

## PROMPT 5 — TECH STACK JUSTIFICATION SLIDE

```
Write a "Why These Technologies?" slide. For each technology below, write 
one sentence justifying the choice in non-technical language:

- SheetJS: "The Excel reader that runs in the browser"
- Chart.js: "Lightweight charts with no build toolchain required"
- Vanilla JavaScript: "Zero npm dependencies = zero broken deployments"
- Node.js (http): "The world's simplest web server — 15 lines"
- Railway: "GitHub push → live URL in 2 minutes, free tier available"
- TimescaleDB (future): "Postgres with time-series — stores every hourly snapshot"
- Kafka (future): "Industry standard for exchange event streaming"

Frame this as "right tool for each phase" not "over-engineered from day one".
```

---

## PROMPT 6 — IMPACT & NUMBERS SLIDE

```
Write a "What This Delivers" impact slide. Use these real numbers from the 
project:

- 1,244 tokens monitored per snapshot
- 672 tokens with active (non-zero) exposure
- Alert ticker shows all positions above $50,000 threshold
- Top short exposure example: AWE at -$130,873
- Top long exposure example: USDT at +$13.7M
- Alert scanning time: 0 seconds (vs scanning 1,244 Excel rows)
- Deployment time from code to live URL: ~4 minutes (Railway)
- Backend server code: 15 lines of Node.js
- Data privacy: 0 bytes of financial data leave the user's browser

Frame these as "before vs after" where relevant. 
Headline the slide with: "From a spreadsheet to a risk surface."
```

---

## PROMPT 7 — ROADMAP SLIDE

```
Write a 4-phase roadmap slide titled "The Path to Real-Time Risk Intelligence"

Phase 1 (Now — Complete):
"File Upload Dashboard"
- Browser-based Excel ingestion
- Treemap, alerts, tables, charts
- Railway deployment

Phase 2 (Next Sprint):
"REST API Integration"  
- Connect to internal exposure API
- Store snapshots in TimescaleDB
- Real historical timeseries charts
- Replace simulated data with real history

Phase 3 (Q3 2026):
"Live Streaming"
- WebSocket push from data pipeline
- Sub-second exposure updates
- Live alert sound + push notifications
- Multi-user synchronized view

Phase 4 (Q4 2026):
"Full Pipeline"
- Kafka consumer for exchange events
- Flink aggregations for real-time netting
- Historical analytics and anomaly detection
- Slack/email alert integrations

Each phase: label it as "1 function change on the frontend" to reinforce 
the architecture decision.
```

---

## PROMPT 8 — CLOSING SLIDE

```
Write the closing slide content. Include:

A headline: "Built to Scale From a File to a Feed"

Three key takeaways:
1. Privacy-first: financial data never leaves the browser in Phase 1
2. Future-proof: one function change connects to any data pipeline
3. Deployable today: 4-step Railway deploy, no DevOps team needed

A "What's Next" section with two bullet points:
- Connect to the internal exposure calculation API as it goes live
- Add real historical snapshots to replace simulated timeseries

A contact/handoff line: 
"Dashboard code, architecture document, and deployment guide available. 
Ready to demo live or share the Railway URL."

End with a single memorable line about the project vision.
```

---

## BONUS: PODCAST/AUDIO OVERVIEW PROMPT

```
Write a 3-minute spoken overview of this project as if I'm explaining it 
to a new engineering team member on their first day. Cover:

1. What the business problem is (risk visibility for a crypto spot desk)
2. What we built (the dashboard features)
3. The key architecture decision (fetchData() as the only seam)
4. How to deploy it (Railway, 4 steps)
5. What comes next (REST API, then WebSocket, then Kafka)

Use casual, friendly language. Avoid acronyms without explanation. 
The listener is a competent engineer but unfamiliar with this project.
End by saying what files they should look at first: index.html, 
architecture.html, and server.js.
```

---

*End of NotebookLM Prompt Pack*
*Spot Exposure Monitor · CoinDCX · v1.0 · March 2026*
