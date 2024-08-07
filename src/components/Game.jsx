import { useState, useEffect } from 'react';
import uniqid from 'uniqid';

let chosenCards = [];

export default function RenderGame({ changeDifficulty, characters }) {
    const [round, setRound] = useState(0);
    const [cards, setCards] = useState([]);
    const [bestScore, setBestScore] = useState(0);
    const [chosenCards, setChosenCards] = useState([]);

    useEffect(() => {
        console.log('test');
        const generatedCards = [];
        if (characters.length === 5) {
            for (let i = 0; i < 3; i++) {
                const randomId = Math.floor(Math.random() * 4);
                console.log(randomId);
                generatedCards.push(characters[randomId]);
            }
            setCards([...generatedCards]);
        }
        return(() => setCards([]));
    }, [round, characters]);

    const newRound = (cardId) => {
        if (chosenCards.includes(cardId)) {
            setRound(0);
            chosenCards.length = 0;
        } else if (chosenCards.length === characters.length) {
            setRound(0);
            chosenCards.length = 0;
            setBestScore(characters.length);
        } else {
            setRound(round + 1);
            chosenCards.push(cardId);
            chosenCards.length > bestScore && setBestScore(chosenCards.length);
        }
    };

    console.log(cards);

    return (
        <div className='game'>
            <button onClick={() => changeDifficulty(null)}>Back</button>
            <p>{round}</p>
            <p>{bestScore}</p>

            <section className="cards">
                { cards.map((card) => (
                    <button className="card-item" key={uniqid()} onClick={() => newRound(card.id)}>
                        <img src={card.image} alt="" />
                        <p>{card.name}</p>
                    </button>
                ))}
            </section>
        </div>
    )
}
