import logo from '../assets/logo.png';
import '../styles/Loading.css';

export default function Loading() {
    return (
        <div className='loading'>
            <div className="logo">
                <img src={logo} alt="Rick and Morty logo" height={400} />
            </div>

            <h1>Loading...</h1>
        </div>
    )
}
