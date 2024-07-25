import { fetchServer } from './fetch.js';
import { initializeSearch } from './serach.js';


window.addEventListener('DOMContentLoaded', () => {
	// Old ID Fix
	if (localStorage.getItem('lastId')) {
		localStorage.setItem('serverId', localStorage.getItem('lastId'));
		localStorage.removeItem('lastId');
	}

	initializeSearch(); // Player Search

	// Server Id Serach
	const serverIdSearch = document.querySelector('#server-players');
	serverIdSearch.addEventListener('keyup', (event) => {
		if (event.key === 'Enter' || event.keyCode === 13) {
			const value = serverIdSearch.value;
			if (value.length < 1) return;
			fetchServer(value);
			setId(value);
			console.info('Fetching by input.');
		}
	});

	const url = new URL(window.location.href);
	if (url.searchParams.has('serverId')) {
		const serverId = url.searchParams.get('serverId');
		fetchServer(serverId);
		setId(serverId);
		console.info('Fetching by URL.');
		return;
	}

	const storageServerId = localStorage.getItem('serverId');
	if (storageServerId) {
		fetchServer(storageServerId);
		setId(storageServerId);
		console.info('Fetching by localStorage.');
	}
});

const setId = (serverId) => {
	const url = new URL(window.location.href);
	url.searchParams.set('serverId', serverId);
	window.history.replaceState(null, null, url);
	localStorage.setItem('serverId', serverId);
};
