import { useState, useEffect } from "react"
import useAuth from "./useAuth"
import Player from "./Player"
import TrackSearchResult from "./TrackSearchResult"
import { Container, Form } from "react-bootstrap"
import SpotifyWebApi from "spotify-web-api-node"
import axios from "axios"

const spotifyApi = new SpotifyWebApi({
  clientId: "73a8dd42c4134ed9a2bd297dd9c6f19c",
})

export default function Dashboard({ code }) {
  const accessToken = useAuth(code) //Se verirfica que el token esté activo
  const [search, setSearch] = useState("")
  const [searchResults, setSearchResults] = useState([]) //Se setea la busqueda en vacio
  const [playingTrack, setPlayingTrack] = useState()
  const [lyrics, setLyrics] = useState("")

  function chooseTrack(track) {
    setPlayingTrack(track)
    setSearch("")
    setLyrics("")
  }

  useEffect(() => {
    if (!playingTrack) return

    axios
      .get("http://localhost:3001/lyrics", {
        params: {
          track: playingTrack.title,
          artist: playingTrack.artist,
        },
      })
      .then(res => {
        setLyrics(res.data.lyrics)
      })
  }, [playingTrack])

  useEffect(() => {
    if (!accessToken) return
    spotifyApi.setAccessToken(accessToken)
  }, [accessToken])

  useEffect(() => {
    if (!search) return setSearchResults([]) //Si no se busca nada, se vuelve el search a vacio
    if (!accessToken) return //Si no hay token, se retorna

    let cancel = false //Variable usada para buscar cada vez que se escribe algo en el buscador
    spotifyApi.searchTracks(search).then(res => {
      console.log(res.body.tracks.items)
      if (cancel) return
      setSearchResults(
        // Se recorre lo que arroja la busqueda
        res.body.tracks.items.map(track => {
          // Se deja un tamaño estandar para todas las imagenes de disco
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image
              return smallest
            },
            track.album.images[0]
          )

          // Se recuperan los datos de la busqueda, tales como artista, titulo, imagen, etc
          return {
            artist: track.artists[0].name,
            album: track.album.name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          }
        })
      )
    })

    return () => (cancel = true)
  }, [search, accessToken])

  return (
    <Container className="d-flex flex-column py-2" style={{ height: "100vh" }}>
      <Form.Control
        type="search"
        placeholder="Buscar Canción/Álbum/Artista"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
        {searchResults.map(track => (
          <TrackSearchResult
            track={track}
            key={track.uri}
            chooseTrack={chooseTrack}
          />
        ))}
        {searchResults.length === 0 && (
          <div className="text-center" style={{ whiteSpace: "pre" }}>
            {lyrics}
          </div>
        )}
      </div>
      <div>
        <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
      </div>
    </Container>
  )
}
