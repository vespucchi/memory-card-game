import { useState, useEffect } from 'react';
import Loading from './components/Loading';
import RenderMenu from './components/Menu';
import RenderGame from './components/Game';
import axios from 'axios';
import './App.css';

let characters;
let gameCharacters = [];

function App() {
    const [difficulty, setDifficulty] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let interval;

        axios.get('https://rickandmortyapi.com/api/character')
            .then(data => {
                characters = data.data.results;
                interval = setInterval(() => setIsLoading(false), 1000);
            })
            .catch(err => console.log(err));

        return () => clearInterval(interval);
    }, []);
    
    const getCharacters = (difficulty) => {
        gameCharacters.length = 0;

        switch (difficulty) {
            case 'easy':
                for (let i = 0; i < 5; i++) {
                    console.log(characters[i]);
                    gameCharacters.push(characters[i]);
                }
                break;
            case 'medium':
                for (let i = 0; i < 7; i++) {
                    gameCharacters.push(characters[i]);
                }
                break;
            case 'hard':
                for (let i = 0; i < 10; i++) {
                    gameCharacters.push(characters[i]);
                }
                break;
        }

    };

    const changeDifficulty = (diff) => {
        setDifficulty(diff);
        getCharacters(diff);
    };

    return (
        <>
            { isLoading 
                ? <Loading />
                : difficulty === null
                    ? <RenderMenu changeDifficulty={changeDifficulty} />
                    : <RenderGame changeDifficulty={changeDifficulty} characters={gameCharacters}/>
            }
            
        </>
    )
}

export default App
