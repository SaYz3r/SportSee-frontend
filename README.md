# SportSee — Frontend

## Prérequis

- Node.js >= 16
- Le backend SportSee lancé sur `http://localhost:3000`
- [Repo backend](https://github.com/SaYz3r/SportSee)

## Installation

Cloner le repo puis installer les dépendances :

```bash
npm install
```

Lancer le projet :

```bash
npm run dev
```

L'application sera disponible sur `http://localhost:5173`.

## Stack technique

- **React 19** + **Vite**
- **D3.js** — graphiques
- **React Router v7** — routing
- **CSS** — styles

## Basculer entre mock et API réelle

Dans `src/services/api.js` :

```js
const USE_MOCK = true // données mockées
const USE_MOCK = false // appels vers http://localhost:3000
```

## Utilisateurs disponibles

Naviguer vers `/user/12` ou `/user/18` pour changer d'utilisateur.

## Résolution minimale

L'application est optimisée pour les écrans **desktop** à partir de **1024 x 780 pixels**.
