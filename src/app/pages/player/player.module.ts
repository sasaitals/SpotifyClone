import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player.component';
import { RouterModule } from '@angular/router';
import { PlayerRotas } from './player.routes';
import { PainelEsquerdoComponent } from '../../components/painel-esquerdo/painel-esquerdo.component';
import { BotaoMenuComponent } from '../../components/botao-menu/botao-menu.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RodapeUsuarioComponent } from '../../components/rodape-usuario/rodape-usuario.component';
import { HomeComponent } from '../home/home.component';
import { TopArtistasComponent } from '../../components/top-artistas/top-artistas.component';
import { PainelDireitoComponent } from '../../components/painel-direito/painel-direito.component';
import { BuscarRecentesComponent } from '../../components/buscar-recentes/buscar-recentes.component';
import { FormsModule } from '@angular/forms';
import { TopArtistaComponent } from '../../components/top-artista/top-artista.component';
import { ArtistaItemImagemComponent } from '../../components/artista-item-imagem/artista-item-imagem.component';
import { PlayerCardComponent } from '../../components/player-card/player-card.component';
import { ListaMusicasComponent } from '../lista-musicas/lista-musicas.component';
import { BannerComponent } from '../../components/banner/banner.component';



@NgModule({
  declarations: [
    PlayerComponent,
    ListaMusicasComponent,
    PainelEsquerdoComponent,
    BotaoMenuComponent,
    RodapeUsuarioComponent,
    HomeComponent,
    TopArtistasComponent,
    PainelDireitoComponent,
    BuscarRecentesComponent,
    TopArtistaComponent,
    ArtistaItemImagemComponent,
    PlayerCardComponent,
    BannerComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    RouterModule.forChild(PlayerRotas)
  ]
})
export class PlayerModule { }
