import { useState, useEffect } from 'react';
import uniqid from 'uniqid';

let chosenCards = [];
let unchosenCards = [0, 1, 2, 3, 4];

export default function RenderGame({ changeDifficulty, characters }) {
    const [round, setRound] = useState(0);
    const [cards, setCards] = useState([]);
    const [bestScore, setBestScore] = useState(0);
    const [win, setWin] = useState(false);

    useEffect(() => {
        if (win === false) {
            const generatedCards = [];
            if (characters.length === 5) {
                for (let i = 0; i < 3; i++) {
                    if (i === 0) {
                        let randomId = unchosenCards[Math.floor(Math.random() * unchosenCards.length)];
                        generatedCards.push(characters[randomId]);
                    } else {
                        const randomId = Math.floor(Math.random() * 4);
                        generatedCards.push(characters[randomId]);
                    }
                }
                console.log(generatedCards)

                setCards([...generatedCards]);
            }
        }
        return(() => setCards([]));
    }, [round, win, characters]);

    const resetUnchosenCardsArray = () => {
        unchosenCards = [0, 1, 2, 3, 4];
    }

    const resetChosenCardsArray = () => {
        chosenCards.length = 0;
    }

    const newRound = (cardId) => {
        const cardIndex = cardId - 1;
        if (chosenCards.includes(cardIndex)) {
            console.log('lose');

            setRound(0);
            resetChosenCardsArray();
            resetUnchosenCardsArray();
        } else {
            if (round === 4) {
                console.log('win');
                setRound(0);
                setWin(true);
                resetChosenCardsArray();
                resetUnchosenCardsArray();
                bestScore !== 5 && setBestScore(5);
                return;
            }
            console.log('next');
            setRound(round + 1);
            chosenCards.push(cardIndex);
            unchosenCards = unchosenCards.filter((card) => card != cardIndex);
            console.log(chosenCards)
            console.log(unchosenCards)
            chosenCards.length > bestScore && setBestScore(chosenCards.length);
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

                <p>{round} / 5</p>
            </section>
        </div>
    )
}
