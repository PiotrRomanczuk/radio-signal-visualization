# Radio Signal Visualization

Real-time radio signal visualization system with WebSocket communication.

## Prerequisites

- Docker and Docker Compose
- OR Node.js 20+ (for local development)

## Quick Start with Docker

1. Clone the repository
2. Copy environment file:
   ```bash
   cp .env.example .env
   ```

3. Start all services:
   ```bash
   docker-compose up
   ```

4. Access the application:
   - Frontend: http://localhost:5173
   - Backend: http://localhost:3000

## Local Development (Without Docker)

### Backend

```bash
cd back
npm install
npm test
npm start
```

### Frontend

```bash
cd front
npm install
npm run dev
```

## Docker Commands

### Start services
```bash
docker-compose up -d
```

### Stop services
```bash
docker-compose down
```

### Rebuild containers
```bash
docker-compose up --build
```

### View logs
```bash
docker-compose logs -f
```

### Backend logs only
```bash
docker-compose logs -f backend
```

### Frontend logs only
```bash
docker-compose logs -f frontend
```

## Project Structure

```
.
├── back/                 # Backend Node.js + TypeScript
│   ├── lib/             # Signal generation logic
│   ├── App.ts           # Express server setup
│   ├── WebSocketService.ts  # WebSocket management
│   └── server.ts        # Entry point
├── front/               # Frontend React + TypeScript
│   └── src/
│       ├── types/       # TypeScript interfaces
│       ├── hooks/       # React hooks
│       └── components/  # React components
├── docker-compose.yml   # Multi-container orchestration
└── REQUIREMENTS_DOCS/   # Project documentation
```

## Development Workflow

1. Make changes to source code
2. Docker volumes will auto-sync changes
3. Backend: ts-node will auto-restart
4. Frontend: Vite will hot-reload

## Testing

### Backend
```bash
cd back
npm test
```

### Frontend
```bash
cd front
npm test
```

## Architecture

- **Backend**: Generates 1000 random numbers (0-255) every 100ms
- **WebSocket**: Real-time data streaming
- **Frontend**: Renders data as 40×25 colored grid on canvas

## License

ISC
