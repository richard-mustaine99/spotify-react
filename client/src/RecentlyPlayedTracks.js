import React from "react"

export default function RecentlyPlayedTracks({ track }) {
  // Retorno de los resultados
  return (
    <div
      className="d-flex m-2 align-items-center"
      style={{ cursor: "pointer" }}
    >
      <img src={track.albumUrl} style={{ height: "64px", width: "64px" }} />
      <div className="ml-3">
        <div>Canción: {track.title}</div>
        <div className="text-muted">Artista: {track.artist}</div>
        <div className="text-muted">Álbum: {track.album}</div>
      </div>
    </div>
  )
}
