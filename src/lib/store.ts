import { writable, derived } from "svelte/store";

import type { Auth0Client } from '@auth0/auth0-spa-js';

export const isAuthenticated = writable(false);
export const user = writable({} as User)
export const popupOpen = writable(false);
export const error = writable('');
export const logging = writable(false);
export const auth0Client = writable({} as Auth0Client)

export const sightings = writable([]);

export const user_sightings = derived([sightings, user], ([$sightings, $user]) => {
  let logged_in_user_sightings = [];

  if ($user && $user.email) {
    logged_in_user_sightings = $sightings.filter((sighting) => sighting.user === $user.email);
  }

  return logged_in_user_sightings;
});
