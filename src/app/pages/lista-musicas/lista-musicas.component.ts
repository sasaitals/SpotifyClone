import { Component, OnDestroy, OnInit } from '@angular/core';
import { IMusica } from '../../Interfaces/IMusica';
import { newMusica } from '../../common/factories';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SpotifyService } from '../../services/spotify.service';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-lista-musicas',
  templateUrl: './lista-musicas.component.html',
  styleUrl: './lista-musicas.component.scss'
})
export class ListaMusicasComponent implements OnInit, OnDestroy {

  bannerImagrmUrl = '';
  bannerTexto = '';

  musicas: IMusica[] = [];
  musicaAtual: IMusica = newMusica();
  playIcone = faPlay;

  title= '';

  subs: Subscription[] = [];
  
  constructor(
    private spotifyService: SpotifyService,
    private activedRoute: ActivatedRoute,
    private playerService: PlayerService
    ) { }
  
  ngOnInit(): void {
    this.obterMusicas();
    this.obterMusicaAtual();
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  obterMusicaAtual(){
    const sub = this.playerService.musicaAtual.subscribe(musica => {
      this.musicaAtual = musica;
    });

    this.subs.push(sub);
  }

  obterMusicas(){
    const sub = this.activedRoute.paramMap
      .subscribe(async params =>{
        const tipo = params.get('tipo');
        const id = params.get('id');
        await this.obterDadosDaPagina(tipo,id);
      })

    this.subs.push(sub);
  }

  async obterDadosDaPagina(tipo: string, id: string){
    if(tipo === 'playlist')
      await this.obterDadosPlaylist(id);
    else
      await this.obterDadosArtista(id);
  }

  async obterDadosPlaylist(playlistId: string){
    const playlistMusicas = await this.spotifyService.buscarMusicasPlaylist(playlistId);
    this.definirDadosDaPagina(playlistMusicas.nome, playlistMusicas.imagemUrl,playlistMusicas.musica);
    this.title = 'Musicas Playlist: ' + playlistMusicas.nome;
  }

  async obterDadosArtista(artistaId: string){

  }

  definirDadosDaPagina(bannerTexto: string, bannerImage: string, musicas: IMusica[]){
    this.bannerImagrmUrl = bannerImage;
    this.bannerTexto = bannerTexto;
    this.musicas = musicas;
  }

  async executarMusica(musica: IMusica){
    await this.spotifyService.executarMusica(musica.id);
    this.playerService.definirMusicaAtual(musica);
  }

  obterArtistas(musica: IMusica){
    return musica.artistas.map(artista => artista.nome).join(', ');
  }


}
