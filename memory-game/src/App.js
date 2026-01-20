// Composant principal de l'application Memory Game
import React, { useState } from 'react';
import Game from './Game';
import Profil from './Profil';
import Top10 from './Top10';
import Button from './components/Button/Button';
import Title from './components/Title/Title';
import { PlayerProvider } from './PlayerContext';
import './App.css';

// Fonction App : gère la navigation et l'état global
function App() {
  // page : page courante (login, game, profil, top10)
  const [page, setPage] = useState('login');
  // pseudo : nom du joueur
  const [pseudo, setPseudo] = useState('');
  // nbPaires : nombre de paires à trouver
  const [nbPaires, setNbPaires] = useState(5);

  // Définition des onglets de navigation
  const navItems = [
    { label: 'Accueil', page: 'login' },
    { label: 'Jeu', page: 'game' },
    { label: 'Profil', page: 'profil' },
    { label: 'Top 10', page: 'top10' },
  ];

  return (
    // Fournit le contexte joueur à toute l'application
    <PlayerProvider>
      {/* Barre de navigation principale */}
      <nav style={{ background: '#049353', padding: '0.7rem 2rem', display: 'flex', gap: 20, alignItems: 'center', color: '#fff', marginBottom: 0 }}>
        {navItems.map(item => (
          <Button
            key={item.page}
            className="btn"
            style={{ background: page === item.page ? '#026f3e' : '#049353', color: '#fff', margin: 0, border: 'none', borderRadius: 6, fontWeight: 'bold' }}
            onClick={() => {
              // Empêche d'accéder au jeu sans pseudo
              if (item.page === 'game' && !pseudo) return;
              setPage(item.page);
            }}
            disabled={
              page === item.page ||
              (item.page === 'game' && !pseudo)
            }
          >
            {item.label}
          </Button>
        ))}
      </nav>

      {/* Page d'accueil : formulaire de pseudo et choix du nombre de paires */}
      {page === 'login' && (
        <div className="container">
          <div className="login">
            <Title>Bienvenue !</Title>
            <form onSubmit={e => { e.preventDefault(); if (pseudo) setPage('game'); }}>
              {/* Champ pour entrer le pseudo */}
              <input
                type="text"
                placeholder="Entrez votre pseudo"
                value={pseudo}
                onChange={e => setPseudo(e.target.value)}
                style={{ fontSize: '1.1rem', padding: '0.5rem', borderRadius: 6, border: '1px solid #ccc', marginBottom: 12, width: '100%' }}
                required
              />
              {/* Sélecteur du nombre de paires */}
              <label style={{ marginTop: 10, marginBottom: 6, fontWeight: 'bold' }}>Nombre de paires :</label>
              <select
                value={nbPaires}
                onChange={e => setNbPaires(Number(e.target.value))}
                style={{ fontSize: '1.1rem', padding: '0.5rem', borderRadius: 6, border: '1px solid #ccc', marginBottom: 12, width: '100%' }}
              >
                {/* Génère les options de 3 à 10 paires */}
                {[...Array(8)].map((_, i) => (
                  <option key={i + 3} value={i + 3}>{i + 3}</option>
                ))}
              </select>
              {/* Bouton pour lancer la partie */}
              <Button className="btn" type="submit" disabled={!pseudo}>Jouer</Button>
            </form>
          </div>
        </div>
      )}

      {/* Page du jeu : affiche le composant Game si pseudo renseigné */}
      {page === 'game' && pseudo && <Game pseudo={pseudo} nbPaires={nbPaires} goProfil={() => setPage('profil')} />}

      {/* Page profil : historique du joueur */}
      {page === 'profil' && <Profil login={pseudo} />}

      {/* Page top 10 : classement global */}
      {page === 'top10' && <Top10 />}
    </PlayerProvider>
  );
}

export default App;