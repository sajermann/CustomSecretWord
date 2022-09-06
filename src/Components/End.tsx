/* eslint-disable react/button-has-type */
import './End.css';

type Props = {
	handleRetry: () => void;
};

export default function End({ handleRetry }: Props) {
	return (
		<div className="start">
			<h1>End</h1>
			<button type="button" onClick={handleRetry}>
				Reiniciar
			</button>
		</div>
	);
}
