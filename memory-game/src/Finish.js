import React from 'react';
import winner from './img/winner.png';
import './Finish.css';

// Props attendus : username, moves, duration, deck (array d'images)
function formatTime(seconds) {
    const min = String(Math.floor(seconds / 60)).padStart(2, '0');
    const sec = String(seconds % 60).padStart(2, '0');
    return `${min}:${sec}`;
}

function Finish({ username = 'Joueur', moves = 0, duration = 0, deck = [] }) {
    return (
        <div className="center">
            <div className="bulle-victory">
                <div className="victory-flex">
                    <img src={winner} alt="winner" className="winner-icon" />
                    <div className="victory-content">
                        <h3 className="victory-title">Victoire !</h3>
                        <p>Joueur : {username}</p>
                        <p>Coups : {moves}</p>
                        <p>Durée : {formatTime(duration)}</p>
                    </div>
                    <img src={winner} alt="winner" className="winner-icon" />
                </div>
                <div className="victory-links">
                    <a className="btn" href="/">Rejouer</a>
                    <a className="btn" href="/top10">Top 10</a>
                    <a className="btn" href="/profil">Mon profil</a>
                </div>
            </div>
            <div className="game-grid">
                {deck.map((img, i) => (
                    <div key={i}>
                        <button className="card" disabled>
                            <img src={img} alt="carte" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Finish;
