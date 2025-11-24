# Radio Signal Visualization Project Requirements

## Project Overview
A real-time radio signal visualization system that generates mock radio signal data on the backend and displays it as a colored canvas grid on the frontend.

## Technical Stack
- **Backend**: Node.js with TypeScript
- **Frontend**: React with TypeScript (Vite)
- **Communication**: WebSocket
- **Testing**: Jest (backend), Vitest (frontend)

## Architecture Principles
1. **Modular Design**: Break functionality into small, independent modules
2. **Functional Programming**: Use functional coding patterns (no classes in backend)
3. **Test-Driven Development**: Write tests before implementation
4. **TypeScript**: Use TypeScript for type safety across both frontend and backend
5. **Interface-Driven**: Define clear interfaces for data structures

## Backend Requirements

### Signal Generation
- **Module**: `SignalGenerator.ts`
- **Function**: `generateSignal(length: number, min: number, max: number): number[]`
- **Purpose**: Mock radio signal data generation
- **Parameters**:
  - `length`: Number of samples to generate (default: 1000)
  - `min`: Minimum value for signal intensity (default: 0)
  - `max`: Maximum value for signal intensity (default: 255)
- **Output**: Array of random integers representing signal samples

### WebSocket Service
- **Module**: `WebSocketService.ts`
- **Function**: `createWebSocketServer(server: HttpServer)`
- **Purpose**: Manage WebSocket connections and broadcast signal data
- **Behavior**:
  - Accept WebSocket connections
  - Generate signal data every 100ms
  - Broadcast to all connected clients
  - Return cleanup function for graceful shutdown

### Server Application
- **Module**: `App.ts`
- **Purpose**: Express HTTP server setup
- **Requirements**:
  - Simple and minimal
  - Provide health check endpoint (`/`)
  - Return HTTP server instance for WebSocket attachment

### Entry Point
- **File**: `server.ts`
- **Purpose**: Compose and start the application
- **Behavior**:
  - Initialize Express app
  - Attach WebSocket service
  - Start listening on port 3000

### Testing Requirements
- All core functions must have unit tests
- Tests must be written before implementation (TDD)
- Minimum 3 test cases per function:
  - Correct output length
  - Values within specified range
  - Data type validation

## Frontend Requirements

### Type Definitions
- **File**: `types/SignalTypes.ts`
- **Interfaces**:
  ```typescript
  export type SignalData = number[];
  
  export interface SignalCanvasProps {
      data: SignalData;
      width: number;
      height: number;
  }
  ```

### WebSocket Hook
- **File**: `hooks/useRadioSignal.ts`
- **Purpose**: Manage WebSocket connection and signal data state
- **Requirements**:
  - Connect to `ws://localhost:3000`
  - Parse incoming JSON data
  - Maintain current signal data in state
  - Handle connection lifecycle
  - Must be tested before implementation

### Canvas Component
- **File**: `components/SignalCanvas.tsx`
- **Purpose**: Render signal data as a colored grid
- **Specifications**:
  - Canvas size: 800x500px
  - Grid layout: 40 columns × 25 rows (1000 cells total)
  - Color mapping: Map signal value (0-255) to color intensity
  - Small, focused component
  - Must be tested before implementation

### App Integration
- **File**: `App.tsx`
- **Purpose**: Compose the application
- **Requirements**:
  - Use `useRadioSignal` hook to get data
  - Pass data to `SignalCanvas` component
  - Keep minimal and focused

### Testing Requirements
- Test WebSocket hook with mocked WebSocket
- Test canvas component receives correct props
- Use Vitest and Testing Library
- All tests written before implementation

## Data Flow
1. Backend generates 1000 random numbers (0-255) every 100ms
2. Backend broadcasts array via WebSocket to all clients
3. Frontend receives array via WebSocket hook
4. Frontend renders array as 40×25 colored grid on canvas
5. Updates occur in real-time (10 times per second)

## Visualization Specifications
- **Grid Dimensions**: 40 columns × 25 rows = 1000 cells
- **Canvas Size**: 800px × 500px
- **Cell Size**: 20px × 20px
- **Color Scheme**: Map value (0-255) to color gradient
  - Example: `rgb(value, 0, 0)` for red intensity
  - Alternative: HSL mapping for full spectrum

## Performance Considerations
- WebSocket update rate: 100ms (10 FPS)
- Data payload size: ~4KB per message (1000 numbers)
- Canvas redraws: Throttled to match WebSocket rate

## Development Workflow
1. Write test first (TDD approach)
2. Implement minimal code to pass test
3. Refactor if needed
4. Repeat for next feature

## Project Structure
```
back/
  ├── lib/
  │   ├── SignalGenerator.ts
  │   └── SignalGenerator.test.ts
  ├── App.ts
  ├── WebSocketService.ts
  ├── server.ts
  ├── jest.config.js
  ├── tsconfig.json
  └── package.json

front/
  ├── src/
  │   ├── types/
  │   │   └── SignalTypes.ts
  │   ├── hooks/
  │   │   ├── useRadioSignal.ts
  │   │   └── useRadioSignal.test.ts
  │   ├── components/
  │   │   ├── SignalCanvas.tsx
  │   │   └── SignalCanvas.test.tsx
  │   ├── App.tsx
  │   └── main.tsx
  ├── vite.config.ts
  ├── tsconfig.json
  └── package.json
```

## Future Enhancements (Not in Scope)
- Configurable signal parameters via UI
- Multiple visualization modes (waveform, spectrogram)
- Signal processing (FFT, filtering)
- Recording and playback
- Real radio hardware integration
