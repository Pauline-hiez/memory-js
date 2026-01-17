import React from 'react';
import winner from './img/winner.png';
import './Top10.css';

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
      <div className="bulle">
        <div className="top-10-container">
          <div className="top-10">
            <img src={winner} alt="winner" className="winner-icon" />
            <h3 className="top-10-title">Top 10</h3>
            <img src={winner} alt="winner" className="winner-icon" />
          </div>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Joueur</th>
            <th>Coups</th>
            <th>Durée</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {top10.length === 0 ? (
            <tr>
              <td colSpan="5" className="center">Aucune partie enregistrée</td>
            </tr>
          ) : (
            top10.map((row, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{row.username}</td>
                <td>{row.moves}</td>
                <td>{formatTime(row.time_seconds)}</td>
                <td>{row.played_at || ''}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Top10;
