// Contexte React pour gérer le joueur courant et son historique de parties
import React, { createContext, useState } from 'react';

// Crée le contexte avec des valeurs par défaut
const PlayerContext = createContext({
    player: '',           // Nom du joueur courant
    setPlayer: () => { }, // Fonction pour changer le joueur
    addGame: () => { },   // Fonction pour ajouter une partie à l'historique
    history: [],          // Historique des parties du joueur
});

// Fournit le contexte joueur à tous les composants enfants
export function PlayerProvider({ children }) {
    // State pour le nom du joueur
    const [player, setPlayer] = useState('');
    // State pour l'historique des parties du joueur
    const [history, setHistory] = useState([]);

    // Ajoute une partie à l'historique local du joueur
    function addGame(moves, duration) {
        setHistory(h => [...h, { moves, duration, date: new Date().toLocaleString() }]);
    }

    // Fournit les valeurs du contexte aux enfants
    return (
        <PlayerContext.Provider value={{ player, setPlayer, addGame, history }}>
            {children}
        </PlayerContext.Provider>
    );
}

// Export du contexte pour utilisation dans l'app
export default PlayerContext;
