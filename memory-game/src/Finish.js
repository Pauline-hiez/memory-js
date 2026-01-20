// Composant de fin de partie (victoire)
import React from 'react';
import winner from './img/winner.png';
import Button from './components/Button/Button';
import Card from './components/Card/Card';
import Title from './components/Title/Title';
import './Finish.css';

// Formate un nombre de secondes en mm:ss
function formatTime(seconds) {
    const min = String(Math.floor(seconds / 60)).padStart(2, '0');
    const sec = String(seconds % 60).padStart(2, '0');
    return `${min}:${sec}`;
}


// Composant Finish : affiche l'écran de victoire avec stats et deck final
function Finish({ username = 'Joueur', moves = 0, duration = 0, deck = [] }) {
    return (
        <div className="center">
            {/* Bulle de victoire avec infos joueur et boutons */}
            <div className="bulle-victory">
                <div className="victory-flex">
                    {/* Icône winner à gauche */}
                    <img src={winner} alt="winner" className="winner-icon" />
                    <div className="victory-content">
                        <Title className="victory-title">Victoire !</Title>
                        <p>Joueur : {username}</p>
                        <p>Coups : {moves}</p>
                        <p>Durée : {formatTime(duration)}</p>
                    </div>
                    {/* Icône winner à droite */}
                    <img src={winner} alt="winner" className="winner-icon" />
                </div>
                {/* Liens d'action après la victoire */}
                <div className="victory-links">
                    <Button className="btn" as="a" href="/">Rejouer</Button>
                    <Button className="btn" as="a" href="/top10">Top 10</Button>
                    <Button className="btn" as="a" href="/profil">Mon profil</Button>
                </div>
            </div>
            {/* Affiche le deck final (cartes) */}
            <div className="game-grid">
                {deck.map((img, i) => (
                    <div key={i}>
                        <Card image={img} isFlipped isMatched disabled />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Finish;
