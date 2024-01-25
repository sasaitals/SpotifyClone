import { Injectable } from '@angular/core';
import { SpotifyConfiguration } from '../../environments/environment';
import Spotify from 'spotify-web-api-js'
import { Router } from '@angular/router';
import { SpotifyPlaylistParaPlaylist, SpotifyUserParaUsuario } from '../common/spotifyHelper';
import { IPlaylist } from '../Interfaces/IPlaylist';
import { IUsuario } from '../Interfaces/IUsuario';

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
    console.log(playlists);
    return playlists.items.map(SpotifyPlaylistParaPlaylist);
  }
}