import { Component, OnInit } from '@angular/core';
import { faGuitar, faHome, faMusic, faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-painel-esquerdo',
  templateUrl: './painel-esquerdo.component.html',
  styleUrl: './painel-esquerdo.component.scss'
})
export class PainelEsquerdoComponent implements OnInit {
  
  menuSelecionado = 'Home';

  //icones
  homeIcone = faHome;
  pesquisarIcone= faSearch;
  artistaIcone = faGuitar;
  playlist = faMusic;

  constructor() { }

  ngOnInit(): void {
  }

  botaoClick(botao: string){
    this.menuSelecionado = botao;
  }

}
