import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import End from './Components/End';
import Game from './Components/Game';
import StartScreen from './Components/StartScreen';
import wordsList from './Data/words';

const stages = [
	{ id: 1, name: 'start' },
	{ id: 2, name: 'game' },
	{ id: 3, name: 'end' },
];

type Batata = {
	[index: string]: string;
};

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
		const { word, category } = defineGame();
		const wordLetters = word.split('').map(letter => letter.toLowerCase());
		setPickedWord(word);
		setPickedCategory(category);
		setLetters(wordLetters);
		setGameStage(stages[1].name);
	}

	function verifyLetter(letter: string) {
		console.log({ letter });
	}

	function handleRetry() {
		setGameStage(stages[0].name);
	}

	return (
		<BrowserRouter>
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
				{gameStage === 'end' && <End handleRetry={handleRetry} />}
			</div>
		</BrowserRouter>
	);
}

export default App;
