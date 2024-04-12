import { writable } from 'svelte/store';
import type User from '$lib/models/User';
import { browser } from '$app/environment';

export const user = writable<User | null>(null);

user.subscribe((value) => {
	if (browser) {
		if (value) {
			localStorage.setItem('token', value.token);
		} else {
			localStorage.removeItem('token');
		}
	}
});
