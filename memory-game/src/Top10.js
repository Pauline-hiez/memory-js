import React from 'react';


function formatTime(seconds) {
    if (seconds == null) return '-';
    const min = String(Math.floor(seconds / 60)).padStart(2, '0');
    const sec = String(seconds % 60).padStart(2, '0');
    return `${min}:${sec}`;
}
function getTop10() {
    const history = JSON.parse(localStorage.getItem('globalHistory') || '[]');
    // Trie par nombre de coups croissant, puis temps croissant
    history.sort((a, b) => {
        if (a.moves !== b.moves) return a.moves - b.moves;
        return a.duration - b.duration;
    });
    return history.slice(0, 10);
}
function Top10() {
    const [top10, setTop10] = React.useState([]);

    React.useEffect(() => {
        setTop10(getTop10());
    }, []);

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
                                        <td style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'center' }}>{i + 1} {medal}</td>
                                        <td style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'center' }}>{h.pseudo}</td>
                                        <td style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'center' }}>{h.moves}</td>
                                        <td style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'center' }}>{formatTime(h.duration)}</td>
                                        <td style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'center' }}>{h.date}</td>
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
