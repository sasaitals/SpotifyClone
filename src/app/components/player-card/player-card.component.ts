import { Component, OnDestroy, OnInit } from '@angular/core';
import { IMusica } from '../../Interfaces/IMusica';
import { newMusica } from '../../common/factories';
import { PlayerService } from '../../services/player.service';
import { faPause, faPlay, faStepBackward, faStepForward } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrl: './player-card.component.scss'
})
export class PlayerCardComponent implements OnInit, OnDestroy{
track: any;
toggle(arg0: any): string|string[]|Set<string>|{ [klass: string]: any; } {
throw new Error('Method not implemented.');
}

  musica: IMusica = newMusica();
  subs: Subscription[] = [];

  //icones
  anteriorIcone = faStepBackward;
  pauseIcone = faPause
  proximoIcone = faStepForward;
  playIcone = faPlay;

  constructor(private playerService: PlayerService) { }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  ngOnInit(): void {
    this.obterMusicaTocando();
  }

  obterMusicaTocando(){
    const sub = this.playerService.musicaAtual.subscribe(musica => {
      this.musica = musica;
      console.log(this.musica)
    })

    this.subs.push();
  }

  voltarMusica(){
    this.playerService.voltarMusica();
    
  }

  pausarMusica(){
    this.playerService.pausarMusica();
  }

  playMusica(){
    this.playerService.playMusica();
  }
  
  proximaMusica(){
    
    this.playerService.proximaMusica();

  }

  

}
