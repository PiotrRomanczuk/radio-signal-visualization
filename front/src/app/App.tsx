import './App.css';
import { useRadioSignal } from '../hooks/useRadioSignal';
import { SignalCanvas } from '../components/SignalCanvas';
import { SignalTable } from '../components/SignalTable';
import { WS_URL } from '../config/constants';

function App() {
	const { signalData, isConnected, error } = useRadioSignal(WS_URL);

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
			</header>
			<main className='app-main'>
				<div className='visualization-section'>
					<SignalCanvas signalData={signalData} />
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
