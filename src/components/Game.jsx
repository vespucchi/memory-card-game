import { useState, useEffect } from 'react';
import uniqid from 'uniqid';

let chosenCharacters = [];

export default function RenderGame({ changeDifficulty, characters, unchosenCharacters }) {
    const [round, setRound] = useState(0);
    const [cards, setCards] = useState([]);
    const [bestScore, setBestScore] = useState(0);
    const [win, setWin] = useState(false);
    const [unChosenCharacters, setUnChosenCharacters] = useState([...unchosenCharacters]);

    console.log(characters)

    useEffect(() => {
        if (win === false) {
            console.log('start')
            let uniqueCharacters = [];
            const generatedCards = [];

            // Generate at least 1 unchosen character
            let randomId = unChosenCharacters[Math.floor(Math.random() * unChosenCharacters.length)];
            generatedCards.push(characters[randomId - 1]);
            uniqueCharacters = characters.filter((char) => char.id !== randomId).map((char) => char.id);

            // Generate remaining cards either unchosen or chosen
            for (let i = 0; i < characters.length - 3; i++) {
                let randomId = Math.floor(Math.random() * uniqueCharacters.length);
                generatedCards.push(characters[uniqueCharacters[randomId] - 1]);
                uniqueCharacters.splice(randomId, 1);
            }
            
            // Shuffle array
            const x = Math.floor(Math.random() * generatedCards.length);
            const y = Math.floor(Math.random() * generatedCards.length);
            [generatedCards[x], generatedCards[y]] = [generatedCards[y], generatedCards[x]];

            setCards([...generatedCards]);
        }
    }, [unChosenCharacters, win, characters]);

    const resetUnChosenCharactersArray = () => {
        setUnChosenCharacters([...unChosenCharacters]);
    }

    const resetChosenCharactersArray = () => {
        chosenCharacters.length = 0;
    }

    const newRound = (cardId) => {
        if (chosenCharacters.includes(cardId)) {
            console.log('lose');

            setRound(0);
            resetChosenCharactersArray();
            resetUnChosenCharactersArray();
        } else {
            if (unChosenCharacters.length === 1) {
                console.log('win');

                setRound(0);
                setWin(true);
                resetChosenCharactersArray();
                resetUnChosenCharactersArray();
                bestScore !== characters.length && setBestScore(characters.length);
                return;
            }
            console.log('next');

            setRound(round + 1);
            chosenCharacters.push(cardId);
            setUnChosenCharacters([...unChosenCharacters.filter((char) => char != cardId)]);
            chosenCharacters.length > bestScore && setBestScore(chosenCharacters.length);

            console.log(unChosenCharacters)
            return;
        }
    };

    return (
        <div className='game'>
            <button onClick={() => changeDifficulty(null)}>Back</button>
            <p>Score: {round}</p>
            <p>Best score: {bestScore}</p>

            <section className="cards">
                { cards.map((card) => (
                    <button className="card-item" key={uniqid()} onClick={() => newRound(card.id)}>
                        <img src={card.image} alt="" />
                        <p>{card.name}</p>
                    </button>
                ))}

                <p>{round} / {characters.length}</p>
            </section>
        </div>
    )
}
