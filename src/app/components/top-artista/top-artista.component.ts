import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { IArtista } from '../../Interfaces/IArtista';

@Component({
  selector: 'app-top-artista',
  templateUrl: './top-artista.component.html',
  styleUrl: './top-artista.component.scss'
})
export class TopArtistaComponent implements OnInit {

  artistas: IArtista[] = [];
  
  constructor(private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.buscarTopArtistas();
  }

  async buscarTopArtistas(){
    this.artistas = await this.spotifyService.buscarTopArtistas(5);
    console.log(this.artistas);
  }
  

}
