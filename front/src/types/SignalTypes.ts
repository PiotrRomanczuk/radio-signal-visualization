export type SignalData = number[];

export interface SignalCanvasProps {
	signalData: SignalData | null;
	maxHistory?: number;
}
