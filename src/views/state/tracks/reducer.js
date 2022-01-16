import { ADD_TRACK, UPDATE_TRACK, DELETE_TRACK, SET_TRACKS } from "./actions";

const initialState = [];
export const tracksReducer = (state = initialState, action) => {
  const { type, payload } = action;

  if (type === SET_TRACKS) return payload;

  if (type === ADD_TRACK) {
    const tracks = state;
    const track = payload;

    return [...tracks, track];
  }

  if (type === UPDATE_TRACK) {
    const tracks = state;
    const track = payload;

    return tracks.map((tr) => (tr.id !== track.id ? tr : track));
  }

  if (type === DELETE_TRACK) {
    const tracks = state;
    const track = payload;

    return tracks.filter((tr) => tr.id !== track.id);
  }

  return state;
};
