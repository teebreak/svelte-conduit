import { writable } from 'svelte/store';
import type User from '$lib/models/User';

export const user = writable<User | null>(null);

user.subscribe((value) => {
	if (value) {
		localStorage.setItem('token', value.token);
	} else {
		localStorage.removeItem('token');
	}
});
