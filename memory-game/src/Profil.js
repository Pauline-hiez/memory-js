import React from 'react';
import './Profil.css';

// Props attendus : login, bestMoves, bestTime, history (array)
function formatTime(seconds) {
    if (seconds == null) return '-';
    const min = String(Math.floor(seconds / 60)).padStart(2, '0');
    const sec = String(seconds % 60).padStart(2, '0');
    return `${min}:${sec}`;
}

function Profil({ login = 'Joueur', bestMoves = null, bestTime = null, history = [] }) {
    return (
        <div className="container">
            <div className="login">
                <h2 className="profil-title">Profil de {login}</h2>
                <p>Meilleur nombre de coups : {bestMoves ?? '-'}</p>
                <p>Meilleur temps : {formatTime(bestTime)}</p>
            </div>
            <div className="profil">
                <h4 className="profil-history-title">Historique des parties</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Coups</th>
                            <th>Durée</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.length === 0 ? (
                            <tr>
                                <td colSpan="3" className="center">Aucune partie</td>
                            </tr>
                        ) : (
                            history.map((g, i) => (
                                <tr key={i}>
                                    <td>{g.moves}</td>
                                    <td>{formatTime(g.time_seconds)}</td>
                                    <td>{g.played_at || ''}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Profil;
