import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { IArtista } from '../../Interfaces/IArtista';
import { newArtista } from '../../common/factories';

@Component({
  selector: 'app-top-artistas',
  templateUrl: './top-artistas.component.html',
  styleUrl: './top-artistas.component.scss'
})
export class TopArtistasComponent implements OnInit {

  topArtista: IArtista = newArtista();

  constructor (private spotifyService: SpotifyService){

  }
  ngOnInit(): void{
    this.buscarArtista();
  }

  async buscarArtista(){
    const artistas = await this.spotifyService.buscarTopArtistas(5);

    if(!!artistas)
      this.topArtista = artistas.pop();

    console.log(this.topArtista);
  }

}
