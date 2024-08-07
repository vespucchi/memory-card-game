import React from 'react';
import uniqid from 'uniqid';
import '../styles/Menu.css';

export default function RenderMenu({ changeDifficulty }) {
    return (
        <div className='menu'>
            <section className="difficulty">
                <button onClick={() => changeDifficulty('easy')}>Easy</button>
                <button onClick={() => changeDifficulty('medium')}>Medium</button>
                <button onClick={() => changeDifficulty('hard')}>Hard</button>
            </section>
        </div>
    )
}
