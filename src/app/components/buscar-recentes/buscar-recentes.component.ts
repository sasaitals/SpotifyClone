import { Component } from '@angular/core';

@Component({
  selector: 'app-buscar-recentes',
  templateUrl: './buscar-recentes.component.html',
  styleUrl: './buscar-recentes.component.scss'
})
export class BuscarRecentesComponent {

  pesquisasRecentes = [
    'Top Brasil',  'Top Global', 'Funk Hits', 'Dominguêra', 'Pagodin'
  ];

  campoPesquisa = ''

  constructor () { }

  ngOnInit(): void {
  }

  definirPesquisa(pesquisa: string){
    this.campoPesquisa = pesquisa;
  }

  buscar(){
    console.log('Buscando...', this.campoPesquisa)
  }
}
