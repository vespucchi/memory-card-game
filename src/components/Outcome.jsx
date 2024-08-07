export default function RenderOutcome({ win, newGame }) {
    return (
        <div>
            <p>You {win ? 'Won!' : 'Lost!'}</p>
            <button onClick={newGame}>Restart</button>
        </div>
    )
}
