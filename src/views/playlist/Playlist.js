import React from "react";
import { TrackDetails } from "./TrackDetails";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getPlaylistsWithTracks } from "../state/selectors";
import { addPlaylist } from "../state/playlists/actions";

export function Playlist() {
  const dispatch = useDispatch();
  const { playlistId: selectedPlaylistId, trackId: selectedTackId } =
    useParams();

  const playlistsWithTracks = useSelector(getPlaylistsWithTracks);

  const playList = playlistsWithTracks.find(
    (play) => play.id === selectedPlaylistId
  );

  const handleNewPlaylist = (title) => {
    dispatch(addPlaylist(title));
  };

  const track =
    playList && playList.tracks.find((tr) => tr.id === selectedTackId);

  return (
    <div className="ui container">
      <h1>My Playlists</h1>
      <div className="ui stackable two column grid">
        <div className="ui six wide column">
          <h3>Playlists</h3>
        </div>
        <div className="ui ten wide column">
          <TrackList playlist={playList} selectedTrackId={selectedTackId} />
        </div>
      </div>
      <div className="ui divider"></div>
      <TrackDetails track={track} />
    </div>
  );
}
