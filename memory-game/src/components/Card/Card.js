// Composant Card réutilisable pour une carte du jeu
import React from 'react';

function Card({ image, isFlipped, isMatched, onClick, disabled, children }) {
    return (
        <button
            className={`card${isFlipped || isMatched ? ' flip' : ''}`}
            onClick={onClick}
            disabled={disabled || isFlipped || isMatched}
        >
            <div className="card-inner">
                <div className="card-back">
                    <div className="card-image-container">
                        <img src={require('../../img/carte.webp')} alt="dos de carte" style={{ width: '140px', height: '200px', objectFit: 'cover' }} />
                    </div>
                </div>
                <div className="card-front">
                    <div className="card-image-container">
                        <img src={image} alt="carte" style={{ width: '140px', height: '200px', objectFit: 'contain' }} />
                    </div>
                </div>
            </div>
            {children}
        </button>
    );
}

export default Card;
