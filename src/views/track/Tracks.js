import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTrack, deleteTrack, updateTrack } from "../state/tracks/actions";
import { getTracks } from "../state/tracks/selectors";
import { Track } from "./Track";
import { TrackForm } from "./TrackForm";

export function Tracks() {
  const dispatch = useDispatch();
  const tracks = useSelector(getTracks);

  const [open, setOpen] = useState(false);
  const [editedTrack, setEditedTrack] = useState({});

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleTrack = (track) => {
    if (!track.id) dispatch(addTrack(track));
    else {
      dispatch(updateTrack(track));
    }
  };

  const handleNew = () => {
    setEditedTrack({});
    handleOpen();
  };

  const handleEdit = (track) => {
    setEditedTrack(track);
    handleOpen();
  };

  const handleDelete = (track) => {
    dispatch(deleteTrack(track));
  };

  return (
    <>
      <div className="ui container">
        <button
          onClick={handleNew}
          className="ui right floated green button"
          id="newModal"
        >
          <i className="plus icon"></i>
          New track
        </button>
        <h1>Tracks</h1>
        <table className="ui celled striped table">
          <thead>
            <tr>
              <th>Artist</th>
              <th>Title</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tracks.map((track) => (
              <Track
                onDelete={() => handleDelete(track)}
                onEdit={() => handleEdit(track)}
                track={track}
                key={track.id}
              />
            ))}
          </tbody>
        </table>
      </div>
      <TrackForm
        open={open}
        onClose={handleClose}
        onSubmit={handleTrack}
        track={editedTrack}
      />
    </>
  );
}
