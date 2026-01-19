import React from 'react';

function formatTime(seconds) {
    if (seconds == null) return '-';
    const min = String(Math.floor(seconds / 60)).padStart(2, '0');
    const sec = String(seconds % 60).padStart(2, '0');
    return `${min}:${sec}`;
}

function Profil({ login = 'Joueur', bestMoves = null, bestTime = null, history = [] }) {
    return (
        <div className="container">
            <div className="top10-table-blur">
                <h2>Profil de {login}</h2>
                <h3>Historique des parties</h3>
                {history.length === 0 ? (
                    <p>Aucune partie jouée.</p>
                ) : (
                    <table style={{ width: '100%', background: 'transparent', borderRadius: '12px', borderCollapse: 'collapse', marginTop: 16, fontSize: '1.25rem' }}>
                        <thead>
                            <tr>
                                <th>Coups</th>
                                <th>Durée</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {history.map((g, i) => (
                                <tr key={i}>
                                    <td>{g.moves}</td>
                                    <td>{formatTime(g.time_seconds)}</td>
                                    <td>{g.played_at || ''}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default Profil;
