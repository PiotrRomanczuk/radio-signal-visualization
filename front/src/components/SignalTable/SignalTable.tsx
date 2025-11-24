import type { SignalData } from '../../types';
import './SignalTable.css';

interface SignalTableProps {
	signalData: SignalData | null;
}

export function SignalTable({ signalData }: SignalTableProps) {
	if (!signalData || signalData.length === 0) {
		return (
			<div className='signal-table-container'>
				<h2>Signal Values</h2>
				<p className='no-data'>Waiting for signal data...</p>
			</div>
		);
	}

	// Create rows of 10 columns each
	const rows: number[][] = [];
	for (let i = 0; i < signalData.length; i += 10) {
		rows.push(signalData.slice(i, i + 10));
	}

	return (
		<div className='signal-table-container'>
			<h2>Signal Values (1000 points)</h2>
			<div className='table-wrapper'>
				<table className='signal-table'>
					<thead>
						<tr>
							<th>#</th>
							{Array.from({ length: 10 }, (_, i) => (
								<th key={i}>{i}</th>
							))}
						</tr>
					</thead>
					<tbody>
						{rows.map((row, rowIndex) => (
							<tr key={rowIndex}>
								<td className='row-header'>{rowIndex * 10}</td>
								{row.map((value, colIndex) => (
									<td key={colIndex} className='value-cell'>
										{value}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
