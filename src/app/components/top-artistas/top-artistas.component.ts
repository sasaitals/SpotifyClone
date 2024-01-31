import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { IArtista } from '../../Interfaces/IArtista';
import { newArtista, newFaixa } from '../../common/factories';
import { IFaixa } from '../../Interfaces/IFaixa';

@Component({
  selector: 'app-top-artistas',
  templateUrl: './top-artistas.component.html',
  styleUrl: './top-artistas.component.scss'
})
export class TopArtistasComponent implements OnInit {

  topArtista: IArtista = newArtista();
  topFaixas: IFaixa = newFaixa();

  constructor (private spotifyService: SpotifyService){

  }
  ngOnInit(): void{
    this.buscarArtista();
    //this.buscarFaixa();
  }

  async buscarArtista(){
    const artistas = await this.spotifyService.buscarTopArtistas(5);

    if(!!artistas)
      this.topArtista = artistas.pop();

    console.log(this.topArtista);
  }

  //async buscarFaixa(){
  //  const faixa = await this.spotifyService.principalTrackArtista(this.topArtista.id)
  //  return faixa;
  //}

}
