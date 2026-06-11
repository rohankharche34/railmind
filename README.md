# RailMind

**AI-Powered Railway Safety, Monitoring & Decision Intelligence Platform**

> *"Predicting incidents before they happen and helping operators respond in real time."*

---

## Overview

RailMind is an intelligent co-pilot for railway operations. Instead of operators staring at dozens of disparate screens, RailMind continuously watches CCTV feeds, monitors track conditions, predicts delays, detects dangerous situations, and suggests actions automatically.

### The Problem

Railways suffer from:
- Track failures and signal faults
- Human intrusions (trespassing, track crossing)
- Unattended objects at stations and platforms
- Delays cascading across the network
- Slow emergency response
- Lack of unified monitoring

Current systems are **reactive**. RailMind makes them **predictive**.

---

## System Architecture

```
                    CCTV Feeds
                         |
                         V
      +--------------------------------+
      |    Computer Vision Engine      |
      |  (YOLOv8 + ByteTrack + OpenCV) |
      +--------------------------------+
                         |
                         V
      +--------------------------------+
      |     Event Intelligence Layer   |
      +--------------------------------+
          /         |           \
         /          |            \
 Track Risk    Delay Engine    Safety Engine
 Prediction    Forecasting     Incident AI
         \         |            /
          \        |           /
               RailMind
          Decision Engine
                    |
                    V
      +--------------------------------+
      |   Control Room Dashboard      |
      |   (Next.js + Tailwind + Map)  |
      +--------------------------------+
```

---

## Modules

### 1. Human / Obstacle Detection on Tracks ✅ *(built)*

Real-time detection of objects and hazards from CCTV feeds using computer vision.

| Feature | Description |
|---------|-------------|
| **Human Intrusion** | Detect people on tracks, trespassing, crossing railway lines |
| **Unattended Object** | Detect bags, suitcases, suspicious objects near platforms/tracks |
| **Track Obstacle** | Detect vehicles, debris, and obstructions on railway lines |
| **Animal Detection** | Detect animals on or near tracks |

**Tech:** YOLOv8, ByteTrack, OpenCV, PyTorch

#### Usage

```bash
# Run with webcam
python3 run_detection.py 0

# Run with video file (enable ByteTrack)
python3 run_detection.py sample_video.mp4 --track

# Run on single image
python3 run_detection.py image.jpg

# Record output
python3 run_detection.py 0 --output recording.mp4
```

### 2. Incident Risk Prediction ✅ *(built)*

Predict incident likelihood using weather, track condition, crowd density, and operational data.

**Inputs:** Weather, train speed, track conditions, maintenance history, crowd density, visibility, time of day, track geometry
**Output:** Section risk score (0–100), risk category, top 5 contributing factors, inspection recommendation
**Model:** XGBoost (trained on 10K synthetic railway samples)

#### Usage

```bash
# Start the API
uvicorn modules.risk_prediction.app:app --host 0.0.0.0 --port 8001

# Predict risk for a section
curl -X POST http://localhost:8001/risk/predict \
  -H "Content-Type: application/json" \
  -d '{"weather_encoded":3,"track_condition_encoded":2,"crowd_density_encoded":3,"is_night":1}'
```

### 3. Emergency Recommendation Agent ✅ *(built)*

When an incident is detected, an AI agent generates structured response actions. Uses LangGraph for the stateful workflow: `classify → recommend → format`. Falls back to a comprehensive rule engine when no LLM API key is set.

**Example:**
> Person detected on track → Risk: Critical → Actions: Stop Train 12045, Notify nearest station, Activate platform announcement, Alert RPF, Dispatch emergency unit

**Tech:** LangGraph, LangChain, OpenAI (optional), rule-based fallback

#### Usage

```bash
# Without LLM (rule-based fallback — works immediately)
uvicorn modules.emergency_agent.app:app --host 0.0.0.0 --port 8002

# With LLM (set API key in .env)
export OPENAI_API_KEY=sk-...
uvicorn modules.emergency_agent.app:app --host 0.0.0.0 --port 8002

# Assess an incident
curl -X POST http://localhost:8002/emergency/assess \
  -H "Content-Type: application/json" \
  -d '{"incident_type":"fire_hazard","location":"Platform 3, Dadar","severity":"critical","risk_score":92}'
```

### 4. Delay Propagation Intelligence *(planned)*

Predict how a single delayed train cascades across the network.

**Model:** XGBoost over temporal graph data

### 5. Railway Digital Twin *(planned)*

Interactive map dashboard showing trains, stations, incidents, alerts, and delays in real time.

**Tech:** Next.js, React, Tailwind, WebSockets

### 6. AI Agent Layer *(planned)*

Conversational agent that operators can query:

> *"Why is Train 12045 delayed?"*
> → "Delay caused by signal congestion near Nashik. Estimated recovery: 18 minutes."

**Tech:** LangGraph, RAG (FAISS), LLM

---

## AI Stack

| Component | Technology |
|-----------|------------|
| Vision Detection | YOLOv8 (Ultralytics) |
| Object Tracking | ByteTrack |
| Risk Prediction | XGBoost |
| Agent Framework | LangGraph + LangChain |
| LLM (optional) | OpenAI (GPT-4o-mini) |
| Rule Engine | Built-in fallback (7 incident types) |
| Backend | FastAPI |
| Database | PostgreSQL |
| Realtime | WebSockets + Redis |
| Frontend | Next.js + React + Tailwind |
| Deployment | Docker |

---

## Project Structure

```
rail-mind/
├── data/                      # Sample images and videos
├── models/                    # Trained model files
├── modules/
│   ├── __init__.py
│   ├── detection/             # Human/Obstacle Detection (YOLOv8 + ByteTrack)
│   │   ├── __init__.py
│   │   ├── config.py
│   │   ├── detector.py
│   │   ├── tracker.py
│   │   ├── alert.py
│   │   ├── pipeline.py
│   │   └── cli.py
│   ├── risk_prediction/       # Incident Risk Prediction (XGBoost + FastAPI)
│   │   ├── __init__.py
│   │   ├── config.py
│   │   ├── data_generator.py
│   │   ├── train.py
│   │   ├── model.py
│   │   ├── schemas.py
│   │   ├── router.py
│   │   └── app.py
│   └── emergency_agent/       # Emergency Recommendation Agent (LangGraph)
│       ├── __init__.py
│       ├── config.py
│       ├── schemas.py
│       ├── nodes.py
│       ├── graph.py
│       ├── router.py
│       └── app.py
├── run_detection.py
├── requirements.txt
├── .env.example
├── .gitignore
├── LICENSE
└── README.md
```

---

## Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `OPENAI_API_KEY` | No | — | API key for LLM-powered emergency recommendations. Without it, a rule-based fallback is used. |
| `OPENAI_MODEL` | No | `gpt-4o-mini` | OpenAI model name. |

## Getting Started

### Prerequisites

- Python 3.10+
- pip

### Install

```bash
git clone https://github.com/rohankharche34/rail-mind.git
cd rail-mind
pip install -r requirements.txt
```

### Run Detection Module

```bash
# Webcam
python3 run_detection.py 0 --track

# Video file
python3 run_detection.py path/to/video.mp4 --track --output result.mp4

# Image
python3 run_detection.py path/to/image.jpg
```

### Run Risk Prediction API

```bash
uvicorn modules.risk_prediction.app:app --host 0.0.0.0 --port 8001
```

### Run Emergency Agent API

```bash
# Without LLM (rule-based)
uvicorn modules.emergency_agent.app:app --host 0.0.0.0 --port 8002

# With LLM
export OPENAI_API_KEY=sk-...
uvicorn modules.emergency_agent.app:app --host 0.0.0.0 --port 8002
```

---

## What Makes RailMind Stand Out

Most teams: **Detect object → Send alert**

RailMind: **Detect → Predict → Recommend → Simulate → Assist**

A complete intelligence platform, not just a detection system.

---

## License

MIT
