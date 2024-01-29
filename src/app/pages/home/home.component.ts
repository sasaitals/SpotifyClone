import { Component } from '@angular/core';
import { IMusica } from '../../Interfaces/IMusica';
import { SpotifyService } from '../../services/spotify.service';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  musicas: IMusica[] = []

  //icone Play
  playIcone = faPlay

  constructor(
    private spotifyService: SpotifyService
  ) { }

  ngOnInit(): void {
    this.obterMusicas();
  }

  async obterMusicas(){
    this.musicas = await this.spotifyService.buscarMusica()
    console.log(this.musicas);
  }

  obterArtistas(musica: IMusica){
    return musica.artistas.map(artista => artista.nome).join(', ');
  }

  async executarMusica(musica: IMusica){
    await this.spotifyService.executarMusica(musica.id);
  }

}
