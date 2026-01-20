// Import de React pour utiliser les hooks et JSX
import React from 'react';

// Formate un nombre de secondes en mm:ss
function formatTime(seconds) {
    if (seconds == null) return '-';
    const min = String(Math.floor(seconds / 60)).padStart(2, '0');
    const sec = String(seconds % 60).padStart(2, '0');
    return `${min}:${sec}`;
}


// Composant Profil : affiche l'historique des parties du joueur courant
function Profil({ login = 'Joueur' }) {
    // State pour stocker l'historique des parties du joueur
    const [history, setHistory] = React.useState([]);

    // Effet pour charger l'historique depuis le localStorage à chaque changement de login
    React.useEffect(() => {
        // Récupère tout l'historique global
        const all = JSON.parse(localStorage.getItem('globalHistory') || '[]');
        // Filtre pour ne garder que les parties du joueur courant
        setHistory(all.filter(g => g.pseudo === login));
    }, [login]);

    // Rendu du composant
    return (
        <div className="container">
            <div className="top10-table-blur">
                {/* Titre du profil */}
                <h2>Profil de {login}</h2>
                <h3>Historique des parties</h3>
                {/* Affiche un message si aucune partie n'a été jouée */}
                {history.length === 0 ? (
                    <p>Aucune partie jouée.</p>
                ) : (
                    // Affiche le tableau des parties jouées
                    <table style={{ width: '100%', background: 'transparent', borderRadius: '12px', borderCollapse: 'collapse', marginTop: 16, fontSize: '1.25rem' }}>
                        <thead>
                            <tr>
                                <th style={{ border: '1px solid #ccc', padding: '12px 18px', background: '#f5f5f5' }}>Coups</th>
                                <th style={{ border: '1px solid #ccc', padding: '12px 18px', background: '#f5f5f5' }}>Durée</th>
                                <th style={{ border: '1px solid #ccc', padding: '12px 18px', background: '#f5f5f5' }}>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Boucle sur chaque partie pour afficher une ligne */}
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
