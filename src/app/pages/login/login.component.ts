import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

  constructor(private spotifyService: SpotifyService,
    private router: Router,) { }

  ngOnInit(): void{
    this.verificarTokenUrlCallback();
  }

  verificarTokenUrlCallback(){
    const token = this.spotifyService.obterTokenUrlCallback();
    if(!!token){
    this.spotifyService.definirAccessToken(token);
    this.router.navigate(['/player/home']);
    }
  }

  abrirPaginaLogin(){
    window.location.href = this.spotifyService.obterUrlLogin();
  }
}

