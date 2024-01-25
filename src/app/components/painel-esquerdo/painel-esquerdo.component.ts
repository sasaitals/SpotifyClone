import { Component, OnInit } from '@angular/core';
import { faGuitar, faHome, faMusic, faSearch } from '@fortawesome/free-solid-svg-icons';
import { IPlaylist } from '../../Interfaces/IPlaylist';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-painel-esquerdo',
  templateUrl: './painel-esquerdo.component.html',
  styleUrl: './painel-esquerdo.component.scss'
})
export class PainelEsquerdoComponent implements OnInit {
  
  menuSelecionado = 'Home';

  playlists: IPlaylist[] = [];

  //icones
  homeIcone = faHome;
  pesquisarIcone= faSearch;
  artistaIcone = faGuitar;
  playlistIcone = faMusic;

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.buscarPlaylists()
  }

  botaoClick(botao: string){
    this.menuSelecionado = botao;
  }

  async buscarPlaylists(){
    this.playlists = await this.spotifyService.buscarPlaylistUsuario();
  }

}
