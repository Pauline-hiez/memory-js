import React, { createContext, useState } from 'react';

const PlayerContext = createContext({
    player: '',
    setPlayer: () => { },
    addGame: () => { },
    history: [],
});

export function PlayerProvider({ children }) {
    const [player, setPlayer] = useState('');
    const [history, setHistory] = useState([]);

    function addGame(moves, duration) {
        setHistory(h => [...h, { moves, duration, date: new Date().toLocaleString() }]);
    }

    return (
        <PlayerContext.Provider value={{ player, setPlayer, addGame, history }}>
            {children}
        </PlayerContext.Provider>
    );
}

export default PlayerContext;
