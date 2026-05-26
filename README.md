# BlockLog

An interactive blockchain-based security log system built as a university project (IT475). The application demonstrates how blockchain technology can be used to ensure the integrity of system audit logs — and how tampering with those logs can be detected.

## Overview

BlockLog simulates a multi-user environment where users can log in, access files, and trigger various security events. Every action is recorded as an immutable block in a blockchain. A dedicated verification page checks the integrity of the entire chain by recomputing each block's hash and detecting any discrepancies.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Python 3.12, FastAPI, Uvicorn |
| Frontend | React 19, Vite, Tailwind CSS v4 |
| Icons | Lucide React |
| HTTP client | Axios |
| Routing | React Router v7 |
| Storage | JSON file (`storage/chain.json`) |

## Project Structure

```
.
├── blocklog/
│   ├── backend/
│   │   ├── blockchain/
│   │   │   ├── block.py        # Block model and SHA-256 hashing
│   │   │   └── chain.py        # Blockchain logic (add, validate, tamper, reset)
│   │   ├── routers/
│   │   │   └── logs.py         # FastAPI route handlers
│   │   ├── storage/
│   │   │   └── chain.json      # Persisted blockchain state
│   │   ├── main.py             # FastAPI app entry point
│   │   └── requirements.txt
│   └── frontend/
│       └── src/
│           ├── constants/
│           │   └── simulation.js       # Users, files, passwords, file contents
│           ├── hooks/
│           │   ├── useBlockchain.js    # Chain state, log(), tamperBlock()
│           │   ├── useAuth.js          # Login/logout logic
│           │   └── useValidation.js    # Integrity check logic
│           ├── utils/
│           │   └── eventBadge.js       # Event type → badge color mapping
│           ├── components/
│           │   ├── blockchain/
│           │   │   ├── LoginForm.jsx
│           │   │   ├── FileActions.jsx
│           │   │   ├── FilePreviewModal.jsx
│           │   │   ├── HackerPanel.jsx
│           │   │   └── BlockCard.jsx
│           │   ├── BlockChain.jsx      # Main simulation page
│           │   └── Validate.jsx        # Integrity verification page
│           ├── api.js                  # Axios API calls
│           └── App.jsx                 # Router and nav
└── README.md
```

## Getting Started

### Prerequisites

- Python 3.12+
- Node.js 18+

### Backend

```bash
cd blocklog/backend
python -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`.  
Interactive docs: `http://localhost:8000/docs`

### Frontend

```bash
cd blocklog/frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/chain` | Returns the full blockchain |
| `POST` | `/api/logs` | Adds a new log entry as a block |
| `GET` | `/api/validate` | Validates the integrity of the chain |
| `POST` | `/api/tamper` | Modifies a block's content (simulation only) |
| `DELETE` | `/api/chain` | Resets the chain to genesis block |

## Demo Accounts

| Username | Password | Role |
|----------|----------|------|
| `ana.jovic` | `1234` | Regular user |
| `marko.petrovic` | `1234` | Regular user |
| `admin` | `admin` | Administrator |
| `hacker` | `hack123` | Attacker — can tamper with blocks |

## Features

- **Blockchain simulation** — every event is stored as a linked block with a SHA-256 hash
- **Multi-user login** — simulated users with password authentication
- **File system simulation** — open files to preview their contents, delete files from the list
- **Hacker mode** — log in as `hacker` and modify any block's content directly
- **Integrity verification** — detects tampered blocks by recomputing and comparing hashes
- **Chain reset** — restore the blockchain to its initial state for a fresh demo
- **Persistent storage** — the chain is saved to `chain.json` and survives backend restarts
