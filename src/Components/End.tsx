import './End.css';

type Props = {
	handleRetry: () => void;
	score: number;
};

export default function End({ handleRetry, score }: Props) {
	return (
		<div className="start">
			<h1>Fim de jogo!</h1>
			<h2>
				A sua pontuação foi: <span>{score}</span>
			</h2>
			<button type="button" onClick={handleRetry}>
				Reiniciar jogo
			</button>
		</div>
	);
}
