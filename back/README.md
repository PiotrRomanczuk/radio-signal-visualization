# Basic Express WebSocket Server Documentation

## Overview

This project is a simple Node.js server using Express and WebSocket. The server generates an undefined number of objects, each of which produces a random number every second. These numbers are sent to the frontend via WebSockets in real time.

## Features

- Express HTTP server for basic API or health check endpoints.
- WebSocket server for real-time communication with the frontend.
- Dynamically generates objects, each emitting a random number every second.
- Broadcasts these numbers to all connected WebSocket clients.

## How It Works

1. When the server starts, it creates a set of objects (the number can be configured or left undefined for demonstration).
2. Each object generates a random number every second.
3. The server sends these numbers to all connected clients via WebSockets.
4. The frontend receives and displays the numbers in real time.

## Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)
- npm (Node package manager)

### Installation

1. Navigate to the `back` directory:

   ```bash
   cd back
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

### Running the Server

```bash
node server.js
```

The server will start on the default port (e.g., 3000). You can connect to the WebSocket endpoint from your frontend to receive random numbers.

## Example WebSocket Message

```json
{
  "objectId": 1,
  "randomNumber": 42
}
```

## Customization

- You can modify the number of objects or the frequency of number generation in `server.js`.

## License

MIT
