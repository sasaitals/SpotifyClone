import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { SpotifyService } from "../services/spotify.service";

export const usuarioEstaLogadoResolver = () => new Promise(async (res, rej) => {
    const spotifyService = inject(SpotifyService);
    const router = inject(Router);

    //vai limpar o local storage, vai para o localhost:4200/login e retorna um falso
    const naoAutenticado = () => {
      localStorage.clear();
      router.navigateByUrl('/login');
      rej('USER NOT AUTHENTICATED')
      return false;
    }
  
    const token = localStorage.getItem('token');
    
    //caso não tenha um token, vai executar o não autenticado, ou seja, não tem token, não entra
    if (!token) {
      return naoAutenticado();
    }
    
    const usuarioCriado = await spotifyService.inicializarUsuario();
    if (usuarioCriado !== null && usuarioCriado !== undefined)
      res(true);
    else
      res(naoAutenticado());
    
    return false;
})