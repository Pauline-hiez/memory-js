import React, { useState, useEffect, useContext } from 'react';
import Fireworks from './Fireworks';
import PlayerContext from './PlayerContext';
import './App.css';

const imageNames = [
    'butters.png',
    'cartman.webp',
    'chef.webp',
    'garrison.webp',
    'hankey.webp',
    'kenny.webp',
    'kyle.webp',
    'mackey.png',
    'randy.webp',
    'stan.webp',
];

function shuffle(array) {
    let arr = array.slice();
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function getDeck(nbPaires) {
    // nbPaires paires aléatoires parmi les images
    const selected = shuffle(imageNames).slice(0, nbPaires);
    const deck = shuffle([...selected, ...selected]);
    return deck.map((img, idx) => ({
        id: idx,
        img,
        revealed: false,
        matched: false,
    }));
}

function formatTime(s) {
    const min = String(Math.floor(s / 60)).padStart(2, '0');
    const sec = String(s % 60).padStart(2, '0');
    return `${min}:${sec}`;
}

function Game({ pseudo, nbPaires, goProfil }) {
    const [deck, setDeck] = useState(getDeck(nbPaires));
    const [first, setFirst] = useState(null);
    const [second, setSecond] = useState(null);
    const [moves, setMoves] = useState(0);
    const [lock, setLock] = useState(false);
    const [startTime, setStartTime] = useState(Date.now());
    const [duration, setDuration] = useState(0);
    const { setPlayer, addGame } = useContext(PlayerContext);
    const [showFireworks, setShowFireworks] = useState(false);
    const [showEnd, setShowEnd] = useState(false);

    useEffect(() => {
        setPlayer(pseudo);
    }, [pseudo, setPlayer]);

    useEffect(() => {
        if (first !== null && second !== null) {
            setLock(true);
            setDeck(d => {
                const normalize = s => s && s.toLowerCase().replace(/\s+/g, '').replace(/\.[a-z0-9]+$/, '');
                const normFirst = normalize(d[first].img);
                const normSecond = normalize(d[second].img);
                console.log('Comparaison:', d[first].img, 'vs', d[second].img, '| normalisés:', normFirst, 'vs', normSecond);
                if (normFirst === normSecond) {
                    // Ajoute la bordure animée temporairement
                    setTimeout(() => {
                        setDeck(dd => dd.map((card, i) =>
                            i === first || i === second ? { ...card, matched: true, bordered: false } : card
                        ));
                        setFirst(null);
                        setSecond(null);
                        setLock(false);
                    }, 800);
                    return d.map((card, i) =>
                        i === first || i === second ? { ...card, revealed: true, bordered: true } : card
                    );
                } else {
                    setTimeout(() => {
                        setDeck(dd => dd.map((card, i) =>
                            i === first || i === second ? { ...card, revealed: false } : card
                        ));
                        setFirst(null);
                        setSecond(null);
                        setLock(false);
                    }, 800);
                    return d;
                }
            });
            setMoves(m => m + 1);
        }
    }, [first, second]);

    useEffect(() => {
        if (deck.every(card => card.matched)) {
            setShowFireworks(true);
            setShowEnd(true);
            setTimeout(() => {
                addGame(moves, duration);
                // Ajout au classement global (localStorage)
                const globalHistory = JSON.parse(localStorage.getItem('globalHistory') || '[]');
                globalHistory.push({ pseudo: pseudo || 'Anonyme', moves, duration, date: new Date().toLocaleString() });
                localStorage.setItem('globalHistory', JSON.stringify(globalHistory));
            }, 300);
        }
    }, [deck]);

    useEffect(() => {
        const timer = setInterval(() => {
            setDuration(Math.floor((Date.now() - startTime) / 1000));
        }, 1000);
        return () => clearInterval(timer);
    }, [startTime]);

    const handleCardClick = idx => {
        if (lock || deck[idx].revealed || deck[idx].matched) return;
        setDeck(d => d.map((card, i) => i === idx ? { ...card, revealed: true } : card));
        if (first === null) {
            setFirst(idx);
        } else if (second === null && idx !== first) {
            setSecond(idx);
        }
    };

    useEffect(() => {
        setDeck(getDeck(nbPaires));
        setFirst(null);
        setSecond(null);
        setMoves(0);
        setDuration(0);
        setStartTime(Date.now());
    }, [nbPaires]);

    const handleRestart = () => {
        setDeck(getDeck(nbPaires));
        setFirst(null);
        setSecond(null);
        setMoves(0);
        setDuration(0);
        setStartTime(Date.now());
        setShowFireworks(false);
        setShowEnd(false);
    };

    return (
        <>
            {showFireworks && showEnd && <Fireworks trigger={showFireworks} />}
            <div className="container">
                {showEnd && (
                    <div className="end-modal">
                        <div className="end-content">
                            <button
                                aria-label="Fermer"
                                onClick={() => {
                                    setShowEnd(false);
                                    setShowFireworks(false);
                                }}
                                style={{
                                    position: 'absolute',
                                    top: 12,
                                    right: 16,
                                    background: 'transparent',
                                    border: 'none',
                                    fontSize: 28,
                                    cursor: 'pointer',
                                    color: '#049353',
                                    zIndex: 1300
                                }}
                            >
                                ×
                            </button>
                            <h2>Partie terminée !</h2>
                            <p>Joueur : <b>{pseudo || 'Anonyme'}</b></p>
                            <p>Nombre de coups : <b>{moves}</b></p>
                            <p>Temps : <b>{formatTime(duration)}</b></p>
                            <button className="btn" onClick={() => { handleRestart(); setShowFireworks(false); }} style={{ marginTop: 16 }}>Rejouer</button>
                            <button className="btn" style={{ marginTop: 8, marginLeft: 8 }} onClick={() => { setShowEnd(false); setShowFireworks(false); goProfil(); }}>Voir le profil</button>
                            <button
                                aria-label="Fermer"
                                onClick={() => setShowEnd(false)}
                                style={{
                                    position: 'absolute',
                                    top: 12,
                                    right: 16,
                                    background: 'transparent',
                                    border: 'none',
                                    fontSize: 28,
                                    cursor: 'pointer',
                                    color: '#1976d2',
                                    zIndex: 1300
                                }}
                            >
                                ×
                            </button>
                        </div>
                    </div>
                )}
                <div className="login" style={showEnd ? { opacity: 0.3, pointerEvents: 'none' } : {}}>
                    <h2>Votre partie, {pseudo}</h2>
                    <div className="stat-bulle">
                        <p>Nombre de coups : {moves}</p>
                        <p>Temps : {formatTime(duration)}</p>
                    </div>
                    <form className="form-pseudo" onSubmit={e => { e.preventDefault(); handleRestart(); }}>
                        <button className="btn" type="submit">Recommencer</button>
                    </form>
                </div>
                <div className="game-grid" id="game-grid" style={showEnd ? { opacity: 0.3, pointerEvents: 'none' } : {}}>
                    {deck.map((card, i) => (
                        <div key={card.id}>
                            <button
                                className={`card${card.revealed || card.matched ? ' flip' : ''}`}
                                disabled={card.revealed || card.matched || lock}
                                onClick={() => handleCardClick(i)}
                            >
                                <div className="card-inner">
                                    <div className="card-back">
                                        <div className="card-image-container">
                                            <img
                                                src={require('./img/carte.webp')}
                                                alt="dos de carte"
                                                style={{ width: '160px', height: '220px', objectFit: 'cover' }}
                                            />
                                        </div>
                                    </div>
                                    <div className={`card-front${card.bordered ? ' bordered-animate' : ''}`}>
                                        <div className="card-image-container">
                                            <img
                                                src={require(`./img/${card.img}`)}
                                                alt="carte"
                                                style={{ width: '160px', height: '220px', objectFit: 'contain' }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </button>
                        </div>
                    ))}
                </div>
                <div className="center"></div>
            </div>
        </>
    );
}

export default Game;


