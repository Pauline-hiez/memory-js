import React, { useState } from 'react';
import Game from './Game';
import Profil from './Profil';
import Top10 from './Top10';
import { PlayerProvider } from './PlayerContext';
import './App.css';

function App() {
  const [page, setPage] = useState('login');
  const [pseudo, setPseudo] = useState('');
  const [nbPaires, setNbPaires] = useState(5);
  const navItems = [
    { label: 'Accueil', page: 'login' },
    { label: 'Jeu', page: 'game' },
    { label: 'Profil', page: 'profil' },
    { label: 'Top 10', page: 'top10' },
  ];
  return (
    <PlayerProvider>
      <nav style={{ background: '#049353', padding: '0.7rem 2rem', display: 'flex', gap: 20, alignItems: 'center', color: '#fff', marginBottom: 0 }}>
        {navItems.map(item => (
          <button
            key={item.page}
            className="btn"
            style={{ background: page === item.page ? '#026f3e' : '#049353', color: '#fff', margin: 0, border: 'none', borderRadius: 6, fontWeight: 'bold' }}
            onClick={() => {
              if (item.page === 'game' && !pseudo) return;
              setPage(item.page);
            }}
            disabled={
              page === item.page ||
              (item.page === 'game' && !pseudo)
            }
          >
            {item.label}
          </button>
        ))}
      </nav>
      {page === 'login' && (
        <div className="container">
          <div className="login">
            <h2>Bienvenue !</h2>
            <form onSubmit={e => { e.preventDefault(); if (pseudo) setPage('game'); }}>
              <input
                type="text"
                placeholder="Entrez votre pseudo"
                value={pseudo}
                onChange={e => setPseudo(e.target.value)}
                style={{ fontSize: '1.1rem', padding: '0.5rem', borderRadius: 6, border: '1px solid #ccc', marginBottom: 12, width: '100%' }}
                required
              />
              <label style={{ marginTop: 10, marginBottom: 6, fontWeight: 'bold' }}>Nombre de paires :</label>
              <select
                value={nbPaires}
                onChange={e => setNbPaires(Number(e.target.value))}
                style={{ fontSize: '1.1rem', padding: '0.5rem', borderRadius: 6, border: '1px solid #ccc', marginBottom: 12, width: '100%' }}
              >
                {[...Array(8)].map((_, i) => (
                  <option key={i + 3} value={i + 3}>{i + 3}</option>
                ))}
              </select>
              <button className="btn" type="submit" disabled={!pseudo}>Jouer</button>
            </form>
          </div>
        </div>
      )}
      {page === 'game' && pseudo && <Game pseudo={pseudo} nbPaires={nbPaires} goProfil={() => setPage('profil')} />}
      {page === 'profil' && <Profil login={pseudo} />}
      {page === 'top10' && <Top10 />}
    </PlayerProvider>
  );
}

export default App;