import { writable } from 'svelte/store';

export const token = writable('');
export const isAuthenticated = writable(false);
export const user = writable({});
export const popupOpen = writable(false);
export const error = writable();
export const games = writable([]);

export const isLoading = writable(false);
