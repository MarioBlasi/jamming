// util/Spotify.js

const clientId = '84aca0f49d0244d394eca7c2894f5a8e';
const redirectUri = 'http://localhost:3000/callback';

let accessToken;

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
    }
  },

  async search(term) {
    const accessToken = Spotify.getAccessToken();
    try {
      const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        if (!jsonResponse.tracks) {
          return [];
        }
        return jsonResponse.tracks.items.map(track => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri
        }));
      }
      throw new Error('Request failed!');
    } catch (error) {
      console.error(error);
      return [];
    }
  },

  async getUserId() {
    const accessToken = Spotify.getAccessToken();
    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse.id;
    }
    throw new Error('Failed to get user ID');
  },

  async createPlaylist(userId, name) {
    const accessToken = Spotify.getAccessToken();
    const response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        description: 'New playlist description'
      })
    });

    if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse.id;
    }
    throw new Error('Failed to create playlist');
  },

  async addTracksToPlaylist(playlistId, trackUris) {
    const accessToken = Spotify.getAccessToken();
    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        uris: trackUris
      })
    });

    if (response.ok) {
      return 'Tracks added successfully';
    }
    throw new Error('Failed to add tracks to playlist');
  },

  async savePlaylist(playlistName, trackUris) {
    try {
      const userId = await Spotify.getUserId();
      const playlistId = await Spotify.createPlaylist(userId, playlistName);
      await Spotify.addTracksToPlaylist(playlistId, trackUris);
      return 'Playlist saved successfully';
    } catch (error) {
      console.error(error);
      throw new Error('Failed to save playlist');
    }
  }
};

export default Spotify;
