import { Routes } from '@angular/router';
import { usuarioEstaLogadoResolver } from './resolvers/resolver-usuario-esta-logado.resolver';


export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'player',
    pathMatch: 'full'
  },
  {
    path: 'player',
    //loadChildren: so vai carregar a pagina de player quando estiver no player, ou seja,
    //quando esá se logando no login, por exemplo, a pagina player não vai estar aberta
    //e assim não vai estar consumindo dados
    loadChildren: () => import('./pages/player/player.module').then(x => x.PlayerModule),
    //só vai entrar na player quando o resiolver for resolvido
    resolve: {
      usuarioEstaLogado: usuarioEstaLogadoResolver,
    }
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(x => x.LoginModule)
  }
]