
import React, { useState, useEffect } from 'react';
import './style.css';

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
    'satan.webp',
    'servietsky.webp',
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

function getDeck() {
    // 5 paires aléatoires parmi les images
    const selected = shuffle(imageNames).slice(0, 5);
    const deck = shuffle([...selected, ...selected]);
    return deck.map((img, idx) => ({
        id: idx,
        img,
        revealed: false,
        matched: false,
    }));
}

function Game() {
    const [deck, setDeck] = useState(getDeck());
    const [first, setFirst] = useState(null);
    const [second, setSecond] = useState(null);
    const [moves, setMoves] = useState(0);
    const [lock, setLock] = useState(false);
    const [startTime, setStartTime] = useState(Date.now());
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        if (first !== null && second !== null) {
            setLock(true);
            if (deck[first].img === deck[second].img) {
                setTimeout(() => {
                    setDeck(d => d.map((card, i) =>
                        i === first || i === second ? { ...card, matched: true } : card
                    ));
                    setFirst(null);
                    setSecond(null);
                    setLock(false);
                }, 800);
            } else {
                setTimeout(() => {
                    setDeck(d => d.map((card, i) =>
                        i === first || i === second ? { ...card, revealed: false } : card
                    ));
                    setFirst(null);
                    setSecond(null);
                    setLock(false);
                }, 800);
            }
            setMoves(m => m + 1);
        }
    }, [first, second, deck]);

    useEffect(() => {
        if (deck.every(card => card.matched)) {
            // Fin de partie
            setTimeout(() => alert('Partie terminée !'), 300);
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

    const handleRestart = () => {
        setDeck(getDeck());
        setFirst(null);
        setSecond(null);
        setMoves(0);
        setDuration(0);
        setStartTime(Date.now());
    };

    const formatTime = s => {
        const min = String(Math.floor(s / 60)).padStart(2, '0');
        const sec = String(s % 60).padStart(2, '0');
        return `${min}:${sec}`;
    };

    return (
        <div className="container">
            <div className="login">
                <h2>Votre partie</h2>
                <div className="stat-bulle">
                    <p>Nombre de coups : {moves}</p>
                    <p>Temps : {formatTime(duration)}</p>
                </div>
                <form className="form-pseudo" onSubmit={e => { e.preventDefault(); handleRestart(); }}>
                    <button className="btn" type="submit">Recommencer</button>
                </form>
            </div>
            <div className="game-grid" id="game-grid">
                {deck.map((card, i) => (
                    <div key={card.id}>
                        <button
                            className="card"
                            disabled={card.revealed || card.matched || lock}
                            onClick={() => handleCardClick(i)}
                        >
                            <img
                                src={card.revealed || card.matched ? require(`./img/${card.img}`) : require('./img/carte.webp')}
                                alt="carte"
                                style={{ width: 80, height: 80, objectFit: 'cover' }}
                            />
                        </button>
                    </div>
                ))}
            </div>
            <div className="center"></div>
        </div>
    );
}

export default Game;
