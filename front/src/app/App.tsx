import './App.css';
import { useState } from 'react';
import { useRadioSignal } from '../hooks/useRadioSignal';
import { SignalCanvas } from '../components/SignalCanvas';
import { SignalTable } from '../components/SignalTable';
import { WS_URL } from '../config/constants';

function App() {
	const { signalData, isConnected, error } = useRadioSignal(WS_URL);
	const [maxHistory, setMaxHistory] = useState(100);

	return (
		<div className='App'>
			<header className='app-header'>
				<h1>Radio Signal Visualization</h1>
				<div className='status'>
					<span
						className={`status-indicator ${
							isConnected ? 'connected' : 'disconnected'
						}`}
					>
						{isConnected ? '● Connected' : '○ Disconnected'}
					</span>
					{error && (
						<span className='error-message'>Error: {error.message}</span>
					)}
				</div>
				<div className='controls'>
					<label htmlFor='history-slider'>
						History Length: {maxHistory} snapshots (
						{(maxHistory * 0.1).toFixed(1)}s)
					</label>
					<input
						id='history-slider'
						type='range'
						min='10'
						max='500'
						step='10'
						value={maxHistory}
						onChange={(e) => setMaxHistory(Number(e.target.value))}
						className='history-slider'
					/>
				</div>
			</header>
			<main className='app-main'>
				<div className='visualization-section'>
					<SignalCanvas signalData={signalData} maxHistory={maxHistory} />
				</div>
				<div className='data-section'>
					<SignalTable signalData={signalData} />
				</div>
			</main>
			<footer className='app-footer'>
				<p>
					Real-time WebSocket data visualization • 1000 signal points • Updates
					every 100ms
				</p>
			</footer>
		</div>
	);
}

export default App;
