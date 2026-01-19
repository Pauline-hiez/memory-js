import React from 'react';

function formatTime(seconds) {
    if (seconds == null) return '-';
    const min = String(Math.floor(seconds / 60)).padStart(2, '0');
    const sec = String(seconds % 60).padStart(2, '0');
    return `${min}:${sec}`;
}

function Profil({ login = 'Joueur' }) {
    // Récupère l'historique du joueur courant depuis localStorage
    const [history, setHistory] = React.useState([]);

    React.useEffect(() => {
        const all = JSON.parse(localStorage.getItem('globalHistory') || '[]');
        setHistory(all.filter(g => g.pseudo === login));
    }, [login]);

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
                                <th style={{ border: '1px solid #ccc', padding: '12px 18px', background: '#f5f5f5' }}>Coups</th>
                                <th style={{ border: '1px solid #ccc', padding: '12px 18px', background: '#f5f5f5' }}>Durée</th>
                                <th style={{ border: '1px solid #ccc', padding: '12px 18px', background: '#f5f5f5' }}>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {history.map((g, i) => (
                                <tr key={i}>
                                    <td style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'center' }}>{g.moves}</td>
                                    <td style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'center' }}>{formatTime(g.duration)}</td>
                                    <td style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'center' }}>{g.date || ''}</td>
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
