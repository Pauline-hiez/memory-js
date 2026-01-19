import React from 'react';

// Exemple de données fictives (à remplacer par un fetch API ou props)
const top10 = [
    // { username: 'Alice', moves: 12, time_seconds: 75, played_at: '2026-01-17' },
];

function formatTime(seconds) {
    if (seconds == null) return '-';
    const min = String(Math.floor(seconds / 60)).padStart(2, '0');
    const sec = String(seconds % 60).padStart(2, '0');
    return `${min}:${sec}`;
}

function Top10() {
    return (
        <div className="container">
            <div className="top10-table-blur">
                <h2>Top 10 joueurs</h2>
                {top10.length === 0 ? (
                    <p>Aucun score enregistré.</p>
                ) : (
                    <table style={{ width: '100%', background: 'transparent', borderRadius: '12px', borderCollapse: 'collapse', marginTop: 16, fontSize: '1.25rem' }}>
                        <thead>
                            <tr>
                                <th style={{ border: '1px solid #ccc', padding: '12px 18px', background: '#f5f5f5' }}>Rang</th>
                                <th style={{ border: '1px solid #ccc', padding: '12px 18px', background: '#f5f5f5' }}>Pseudo</th>
                                <th style={{ border: '1px solid #ccc', padding: '12px 18px', background: '#f5f5f5' }}>Coups</th>
                                <th style={{ border: '1px solid #ccc', padding: '12px 18px', background: '#f5f5f5' }}>Temps</th>
                                <th style={{ border: '1px solid #ccc', padding: '12px 18px', background: '#f5f5f5' }}>Date et heure</th>
                            </tr>
                        </thead>
                        <tbody>
                            {top10.map((h, i) => {
                                let medal = '';
                                if (i === 0) medal = '🥇';
                                else if (i === 1) medal = '🥈';
                                else if (i === 2) medal = '🥉';
                                return (
                                    <tr key={i}>
                                        <td style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'center' }}>{i + 1}</td>
                                        <td style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'center' }}>
                                            {h.username} {medal && <span style={{ marginLeft: 8 }}>{medal}</span>}
                                        </td>
                                        <td style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'center' }}>{h.moves}</td>
                                        <td style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'center' }}>{formatTime(h.time_seconds)}</td>
                                        <td style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'center' }}>{h.played_at || ''}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default Top10;
