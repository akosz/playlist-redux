import { playlistsStorage } from "../../../api/PlaylistsStorage";
import { getPlaylists } from "./selectors";

export const SET_PLAYLISTS = "SET_PLAYLISTS";
export const ADD_PLAYLIST = "ADD_PLAYLIST";
export const ADD_TRACK_TO_PLAYLIST = "ADD_TRACK_TO_PLAYLIST";
export const UPDATE_PLAYLIST = "UPDATE_PLAYLIST";

//Sync
export const setPlaylists = (playlists) => ({
  type: SET_PLAYLISTS,
  payload: playlists,
});

export const addPlaylistToStore = (playlist) => ({
  type: ADD_PLAYLIST,
  payload: playlist,
});

export const updatePlaylist = (playlist) => ({
  type: UPDATE_PLAYLIST,
  payload: playlist,
});

export const addTrackToPlaylistToStore = (playlistId, trackId) => ({
  type: ADD_TRACK_TO_PLAYLIST,
  payload: { playlistId, trackId },
});

//Async
export const fetchPlaylists = () => async (dispatch) => {
  const playlists = await playlistsStorage.getAll();
  console.log(playlists);
  dispatch(setPlaylists(playlists));
};

export const addPlaylist = (title) => async (dispatch) => {
  const newPlaylist = await playlistsStorage.create({ title, tracks: [] });
  dispatch(addPlaylistToStore(newPlaylist));
};

export const addTrackToPlaylist =
  (playlistId, trackId) => async (dispatch, getState) => {
    const playlists = getPlaylists(getState());
    const playlist = playlists.find((pl) => pl.id === playlistId);

    if (!playlist) return;

    if (playlist.tracks.includes(trackId)) return;

    const modifiedPlaylist = {
      ...playlist,
      tracks: playlist.tracks.concat(trackId),
    };

    const updatedPlaylist = await playlistsStorage.update(modifiedPlaylist);
    dispatch(updatePlaylist(updatedPlaylist));
  };

export const deleteTrackFromAllPlaylist =
  (track) => async (dispatch, getState) => {
    const playlists = getPlaylists(getState());

    for (const playlist of playlists) {
      if (playlist.tracks.includes(track.id)) {
        const modifiedPlaylist = {
          ...playlist,
          tracks: playlist.tracks.filter((id) => id !== track.id),
        };

        const updatedPlaylist = await playlistsStorage.update(modifiedPlaylist);
        dispatch(updatePlaylist(updatedPlaylist));
      }
    }
  };
