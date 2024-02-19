import { Injectable } from '@angular/core';
import { SpotifyConfiguration } from '../../environments/environment';
import Spotify from 'spotify-web-api-js'
import { Router } from '@angular/router';
import { SpotifyArtistaParaArtista, SpotifyPlaylistParaPlaylist, SpotifySinglePlaylistParaPlaylist, SpotifyTrackparaMusica, SpotifyUserParaUsuario, principalTrackArtista } from '../common/spotifyHelper';
import { IPlaylist } from '../Interfaces/IPlaylist';
import { IUsuario } from '../Interfaces/IUsuario';
import { IArtista } from '../Interfaces/IArtista';
import { IMusica } from '../Interfaces/IMusica';
import { IFaixa } from '../Interfaces/IFaixa';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})

export class SpotifyService {

  spotifyApi: Spotify.SpotifyWebApiJs = null;
  usuario: IUsuario;


  constructor(private router: Router) {
    this.spotifyApi = new Spotify();
  }

  async inicializarUsuario() {
    //verificar se o usuario foi iniciado na memória
    if(!!this.usuario)
      return true;

    //pega o token
    const token = localStorage.getItem('token');
    //se não tem o token já retorna o false pois, se não tem token não está logado
    if(!token)
      return false;

    try {

      this.definirAccessToken(token);
      await this.obterSpotifyUsuario();
      return true;

    }catch(ex){
      return false;
    }
  }

  async obterSpotifyUsuario() {
    const userInfo = await this.spotifyApi.getMe();
    this.usuario = SpotifyUserParaUsuario(userInfo);
  }

  async buscarMusicasPlaylist(playlistId: string, offset = 0, limit = 50){
    const playlistSpotify = this.spotifyApi.getPlaylist(playlistId);

    if(!playlistSpotify)
      return null;

    const playlist = SpotifySinglePlaylistParaPlaylist(await playlistSpotify);

    const musicasSpotify = await this.spotifyApi.getPlaylistTracks(playlistId, { offset, limit });

    playlist.musica = musicasSpotify.items.map(musica => SpotifyTrackparaMusica(musica.track as SpotifyApi.TrackObjectFull));

    return playlist;
  }

  obterUrlLogin() {
    const authEndpoint = `${SpotifyConfiguration.authEndpoint}?`;
    const clientId = `client_id=${SpotifyConfiguration.clientId}&`;
    const redirectUrl = `redirect_uri=${SpotifyConfiguration.redirecUrl}&`;
    const scopes = `scope=${SpotifyConfiguration.scopes.join('%20')}&`;
    const responseType = `response_type=token&show_dialog=true`;
    return authEndpoint + clientId + redirectUrl + scopes + responseType; 
  }

  obterTokenUrlCallback(){
    if (!window.location.hash)
      return '';

    const params = window.location.hash.substring(1).split('&');
    return params[0].split('=')[1];
  }

  definirAccessToken(token: string){
    this.spotifyApi.setAccessToken(token);
    localStorage.setItem('token', token);
  }

  async buscarPlaylistUsuario(offset = 0, limit = 50): Promise<IPlaylist[]>{
    const playlists = await this.spotifyApi.getUserPlaylists(this.usuario.id, { offset, limit });
    return playlists.items.map(SpotifyPlaylistParaPlaylist);
  }

  async buscarTopArtistas(limit = 10):Promise<IArtista[]> {
    const artistas = await this.spotifyApi.getMyTopArtists({ limit });
    return artistas.items.map(SpotifyArtistaParaArtista);
  }

  //get track
  //async principalTrackArtista(artistaId: string, limit = 10): Promise<IFaixa[]>{
  //  const faixa = await this.spotifyApi.getArtistTopTracks(`https://api.spotify.com/v1/artists/${artistaId}/top-tracks?country=US`);
  //  return faixa;
  //}

  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  async buscarMusica(offset=0, limit=50): Promise<IMusica[]>{
    const musicas = await this.spotifyApi.getMySavedTracks({ offset, limit });
    return musicas.items.map(x => SpotifyTrackparaMusica(x.track));
  }

  async executarMusica(musicaID: string){
    await this.spotifyApi.queue(musicaID);
    await this.spotifyApi.skipToNext();
  }

  async obterMusicaAtual(): Promise<IMusica>{
    const musicaSpotify = await this.spotifyApi.getMyCurrentPlayingTrack();
    return SpotifyTrackparaMusica(musicaSpotify.item);
  }

  async voltarMusica(){
    await this.spotifyApi.skipToPrevious();
  }

  async pausarMusica(){
    await this.spotifyApi.pause();
  }

  async playMusica(){
    await this.spotifyApi.play();
  }

  async proximaMusica(){
    await this.spotifyApi.skipToNext();
  }
}