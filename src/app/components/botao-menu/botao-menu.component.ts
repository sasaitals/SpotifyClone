import { Component, EventEmitter, Input, OnInit, Output, input} from '@angular/core';

@Component({
  selector: 'app-botao-menu',
  templateUrl: './botao-menu.component.html',
  styleUrl: './botao-menu.component.scss'
})
export class BotaoMenuComponent implements OnInit {
  
  @Input()
  descricao = '';

  @Input()
  selecionado = false; 

  @Output()
  click = new EventEmitter<void>()
  constructor() { }

  ngOnInit(): void {
  }

  onClick(){
    this.click.emit();
  }
}
