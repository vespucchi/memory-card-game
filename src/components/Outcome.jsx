import '../styles/Outcome.css';

export default function RenderOutcome({ win, newGame }) {
    return (
        <div className='outcome'>
            <div className="container">
                <p>You {win ? 'Won!' : 'Lost!'}</p>
                <button onClick={newGame}>Restart</button>
            </div>
        </div>
    )
}
