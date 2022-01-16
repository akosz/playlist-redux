import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { App } from "./App";
import { PlaylistsProvider } from "./views/state/PlaylistsService";
import { configureStore } from "./views/state/store";
import { TracksProvider } from "./views/state/TracksService";

const store = configureStore();

const render = () =>
  ReactDOM.render(
    <Provider store={store}>
      <TracksProvider>
        <PlaylistsProvider>
          <App />
        </PlaylistsProvider>
      </TracksProvider>
    </Provider>,
    document.getElementById("root")
  );

const start = async () => {
  //const newPlaylists = await playlistsStorage.fill(examplePlaylists);
  //const newTracks = await tracksStorage.fill(exampleTracks);

  render();
};
start();
