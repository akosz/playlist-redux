import { getPlaylists } from "./playlists/selectors";
import { getTracks } from "./tracks/selectors";

export const getPlaylistsWithTracks = (state) => {
  const playlists = getPlaylists(state);
  const tracks = getTracks(state);

  return playlists.map((pl) => ({
    ...pl,
    tracks: pl.tracks.map((trackId) =>
      tracks.find((track) => track.id === trackId)
    ),
  }));
};
