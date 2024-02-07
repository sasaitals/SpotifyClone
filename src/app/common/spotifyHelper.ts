import { add, addMilliseconds, format } from "date-fns";
import { IArtista } from "../Interfaces/IArtista";
import { IMusica } from "../Interfaces/IMusica";
import { IPlaylist } from "../Interfaces/IPlaylist";
import { IUsuario } from "../Interfaces/IUsuario";
import { IFaixa } from "../Interfaces/IFaixa";
import axios from "axios";
import { newMusica, newPlaylist } from "./factories";

export function SpotifyUserParaUsuario(user: SpotifyApi.CurrentUsersProfileResponse): IUsuario{
    return {
        id: user.id,
        nome: user.display_name,
        imagemUrl: user.images.pop().url
      }
}

export function SpotifyPlaylistParaPlaylist(playlist: SpotifyApi.PlaylistObjectSimplified): IPlaylist{
    return{
        id: playlist.id,
        nome: playlist.name,
        imagemUrl: playlist.images.pop().url
    }
}

export function SpotifySinglePlaylistParaPlaylist(playlist: SpotifyApi.SinglePlaylistResponse): IPlaylist{
    if(!playlist)
        return newPlaylist();

    return{
        id: playlist.id,
        nome: playlist.name,
        imagemUrl: playlist.images.shift().url,
        musica: []
    }
}

export function SpotifyArtistaParaArtista(spotifyArtista: SpotifyApi.ArtistObjectFull) : IArtista{
    return {
        id: spotifyArtista.id,
        imagemUrl: spotifyArtista.images.sort((a,b) => a.width - b.width).pop().url,
        nome: spotifyArtista.name,
    };
}

export function principalTrackArtista(spotifyFaixa: SpotifyApi.TrackObjectFull): IFaixa{
    return{
        id: spotifyFaixa.id,
        nome: spotifyFaixa.name,
        previewUrl: spotifyFaixa.preview_url
    }
}

export function SpotifyTrackparaMusica(spotifyTrack: SpotifyApi.TrackObjectFull) : IMusica{

    if(!spotifyTrack)
        return newMusica();

    const msParaMinutos = (ms: number) => {
        const data = addMilliseconds(new Date(0), ms);
        return format(data, 'mm:ss')
    }

    return{
        id: spotifyTrack.uri,
        titulo: spotifyTrack.name,
        album: {
            id: spotifyTrack.album.id,
            imagemUrl: spotifyTrack.album.images.shift().url,
            nome: spotifyTrack.album.name
        },
        artistas: spotifyTrack.artists.map(artista =>({
            id: artista.id,
            nome: artista.name
        })),
        tempo: msParaMinutos(spotifyTrack.duration_ms)
    }
}