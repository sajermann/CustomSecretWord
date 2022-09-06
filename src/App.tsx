import { useEffect, useState } from 'react';
import End from './Components/End';
import Game from './Components/Game';
import StartScreen from './Components/StartScreen';
import wordsList from './Data/words';

const stages = [
	{ id: 1, name: 'start' },
	{ id: 2, name: 'game' },
	{ id: 3, name: 'end' },
];

type WordsList = {
	carro: string[];
	fruta: string[];
	corpo: string[];
	computador: string[];
	programação: string[];
	alimento: string[];
};

function App() {
	const [gameStage, setGameStage] = useState(stages[0].name);
	const [words] = useState<WordsList>(wordsList);
	const [pickedWord, setPickedWord] = useState('');
	const [pickedCategory, setPickedCategory] = useState('');
	const [letters, setLetters] = useState<string[]>([]);
	const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
	const [wrongLetters, setWrongLetters] = useState<string[]>([]);
	const [guesses, setGuesses] = useState(3);
	const [score, setScore] = useState(0);

	function defineGame() {
		const categories = Object.keys(words);
		const category = categories[Math.floor(Math.random() * categories.length)];
		const wordsTemp = { ...words } as {
			[index: string]: string[];
		};

		const word =
			wordsTemp[category][
				Math.floor(Math.random() * wordsTemp[category].length)
			];

		return { word, category };
	}

	function handleStartGame() {
		setGuessedLetters([]);
		setWrongLetters([]);
		const { word, category } = defineGame();
		const wordLetters = word.split('').map(letter => letter.toLowerCase());
		setPickedWord(word);
		setPickedCategory(category);
		setLetters(wordLetters);
		setGameStage(stages[1].name);
	}

	function verifyLetter(letter: string) {
		const normalizedLetter = letter.toLowerCase();

		if (
			guessedLetters.includes(normalizedLetter) ||
			wrongLetters.includes(normalizedLetter)
		) {
			return;
		}

		if (letters.includes(normalizedLetter)) {
			setGuessedLetters(prev => [...prev, normalizedLetter]);
		} else {
			setWrongLetters(prev => [...prev, normalizedLetter]);
			setGuesses(guesses - 1);
		}
	}

	useEffect(() => {
		if (guesses === 0) {
			setGameStage(stages[2].name);
		}
	}, [guesses]);

	useEffect(() => {
		const uniqueLetters = [...new Set(letters)];
		if (guessedLetters.length === uniqueLetters.length) {
			setScore(prev => prev + 100);
			handleStartGame();
		}
	}, [guessedLetters, letters]);

	function handleRetry() {
		setScore(0);
		setGuesses(3);
		setGameStage(stages[0].name);
	}

	return (
		<div className="App">
			{gameStage === 'start' && (
				<StartScreen handleStartGame={handleStartGame} />
			)}
			{gameStage === 'game' && (
				<Game
					verifyLetter={verifyLetter}
					pickedWord={pickedWord}
					pickedCategory={pickedCategory}
					letters={letters}
					guessedLetters={guessedLetters}
					wrongLetters={wrongLetters}
					guesses={guesses}
					score={score}
				/>
			)}
			{gameStage === 'end' && <End handleRetry={handleRetry} score={score} />}
		</div>
	);
}

export default App;
