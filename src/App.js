import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Playlist } from "./views/playlist/Playlist";
import { fetchPlaylists } from "./views/state/playlists/actions";
import { fetchTracks } from "./views/state/tracks/actions";
import { Tracks } from "./views/track/Tracks";

export function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPlaylists());
    dispatch(fetchTracks());
  }, [dispatch]);

  return (
    <Router>
      <Switch>
        <Route path="/playlist/:playlistId?/:trackId?">
          <Playlist />
        </Route>
        <Route path="/tracks">
          <Tracks />
        </Route>
      </Switch>
    </Router>
  );
}
