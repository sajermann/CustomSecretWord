import './StartScreen.css';

type Props = {
	handleStartGame: () => void;
};

export default function StartScreen({ handleStartGame }: Props) {
	return (
		<div className="start">
			<h1>Secret Word</h1>
			<p>Clique no botão abaixo para começar a jogar</p>
			<button type="button" onClick={handleStartGame}>
				Começar o jogo
			</button>
		</div>
	);
}
