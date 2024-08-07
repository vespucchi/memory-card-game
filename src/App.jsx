import { useState, useEffect } from 'react';
import Loading from './components/Loading';
import RenderMenu from './components/Menu';
import RenderGame from './components/Game';
import axios from 'axios';
import './App.css';
import video from './assets/rick_sanchez.mp4';

let characters;
let gameCharacters = [];
let unchosenCharacters = [];

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
                    gameCharacters.push(characters[i]);
                    unchosenCharacters = [1, 2, 3, 4, 5];
                }
                break;
            case 'medium':
                for (let i = 0; i < 7; i++) {
                    gameCharacters.push(characters[i]);
                    unchosenCharacters = [1, 2, 3, 4, 5, 6, 7];
                }
                break;
            case 'hard':
                for (let i = 0; i < 10; i++) {
                    gameCharacters.push(characters[i]);
                    unchosenCharacters = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
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
                    : <RenderGame key={difficulty} changeDifficulty={changeDifficulty} characters={gameCharacters} unchosenCharacters={unchosenCharacters}/>
            }
            
            <div className="video-container">
                <video autoPlay={true} loop={true} muted={true} id="myVideo">
                    <source src={video} type="video/mp4" />
                </video>
            </div>
            
        </>
    )
}

export default App
