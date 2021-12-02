import React from "react"
import { Card, Button } from "react-bootstrap"
import imagen from './img/spotify_logo.png'

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=73a8dd42c4134ed9a2bd297dd9c6f19c&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20user-library-read%20playlist-modify%20user-read-private%20user-read-recently-played"

export default function Login() {
  return (
    <Card style={{ width: '38rem', textAlign: "center", alignItems: "center", marginTop:"25vh", marginLeft:"auto", marginRight: "auto" }}>
      <Card.Img variant="top" src={imagen} />
      <Card.Body>
        <Card.Title><h1>¡Bienvenido al clon de spotify! ♥</h1></Card.Title>
        <Card.Text>
          Este clon básico de spotify fue hecho con mucho cariño por Richard Castro.
        </Card.Text>
        <Button variant="success" href={AUTH_URL}>Iniciar sesión con Spotify</Button>
      </Card.Body>
    </Card>
  )
}
