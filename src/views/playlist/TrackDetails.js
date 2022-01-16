import React from "react";
import { Link } from "react-router-dom";

export function TrackDetails({ track }) {
  return !track ? null : (
    <div className="ui segment">
      <div className="ui items">
        <div className="item">
          <div className="image">
            <img src={track.thumbnailURL} alt={track.thumbnailURL} />
          </div>
          <div className="content">
            <Link to="" className="header">
              {track.title}
            </Link>
            <div className="meta">
              <span>{track.artist}</span>
              <span>{track.length}</span>
            </div>
            <div className="extra">
              {track.spotifyURL ? (
                <Link
                  href={track.spotifyURL}
                  className="ui button tiny green button"
                  target="_blank"
                >
                  <i className="spotify icon"></i>
                  Listen on Spotify
                </Link>
              ) : null}
              {track.lyricsURL && (
                <Link
                  href={track.lyricsURL}
                  className="ui button tiny orange button"
                  target="_blank"
                >
                  <i className="guitar icon"></i>
                  Show chords
                </Link>
              )}

              {track.chordsURL && (
                <Link
                  href={track.chordsURL}
                  className="ui button tiny teal button"
                  target="_blank"
                >
                  <i className="microphone icon"></i>
                  Show lyrics
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
