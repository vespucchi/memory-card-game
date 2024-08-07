import '../styles/Menu.css';
import logo from '../assets/logo.png';

export default function RenderMenu({ changeDifficulty }) {
    return (
        <div className='menu'>
            <div className="logo">
                <img src={logo} alt="Rick and Morty logo" height={400}/>
            </div>

            <h1>Memory Game</h1>

            <section className="difficulty-btns">
                <button onClick={() => changeDifficulty('easy')}>Easy</button>
                <button onClick={() => changeDifficulty('medium')}>Medium</button>
                <button onClick={() => changeDifficulty('hard')}>Hard</button>
            </section>
        </div>
    )
}
