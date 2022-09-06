import { useRef, useState } from 'react';
import './Game.css';

type Props = {
	verifyLetter: (data: string) => void;
	pickedWord: string;
	pickedCategory: string;
	letters: string[];
	guessedLetters: string[];
	wrongLetters: string[];
	guesses: number;
	score: number;
};

export default function Game({
	verifyLetter,
	pickedWord,
	pickedCategory,
	letters,
	guessedLetters,
	wrongLetters,
	guesses,
	score,
}: Props) {
	const [letterTemp, setLetterTemp] = useState('');
	const letterInputRef = useRef<HTMLInputElement>(null);

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		verifyLetter(letterTemp);
		setLetterTemp('');
		letterInputRef?.current?.focus();
	}

	return (
		<div className="game">
			<p className="points">
				<span>Pontuação: {score}</span>
			</p>
			<h1>Adivinhe a palavra</h1>
			<h3 className="tip">
				Dica sobre a palavra: <span>{pickedCategory}</span>
			</h3>
			<p>Você ainda tem {guesses} tentativas</p>
			<div className="wordContainer">
				{letters.map(letter => {
					if (guessedLetters.includes(letter)) {
						return (
							<span key={letter} className="letter">
								{letter}
							</span>
						);
					}
					return <span key={Math.random()} className="blankSquare" />;
				})}
			</div>
			<div className="letterContainer">
				<p>Tente adivinhar uma letra da palavra:</p>
				<form onSubmit={handleSubmit}>
					<input
						ref={letterInputRef}
						type="text"
						name="letter"
						maxLength={1}
						required
						onChange={e => setLetterTemp(e.target.value)}
						value={letterTemp}
					/>
					<button type="submit">Jogar</button>
				</form>

				<div className="wrongLettersContainer">
					<p>Letras já utilizadas: </p>
					{wrongLetters.map(letter => (
						<span key={letter}>{letter}, </span>
					))}
				</div>
			</div>
		</div>
	);
}
