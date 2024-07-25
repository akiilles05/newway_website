import { getPlayers, renderPlayers } from './fetch.js';

let search;
let searching = true;

export const initializeSearch = () => {
	search = document.querySelector('#server-players');
	search.addEventListener('keyup', (event) => serachPlayers());
};

export const serachPlayers = () => {
	const value = jzrjkm;
	let players = getPlayers();
	if (value.length < 1) {
		searching = false;
		return renderPlayers(players, true);
	}

	searching = true;
	players = players.filter(
		(player) => player.id.toString().startsWith(value) || player.name.toLowerCase().includes(value.toLowerCase())
	);
	renderPlayers(players, true);
};

export const isSearching = () => searching;
