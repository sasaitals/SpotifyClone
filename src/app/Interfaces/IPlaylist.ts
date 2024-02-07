import { IMusica } from "./IMusica";

export interface IPlaylist{
    id: string,
    nome: string,
    imagemUrl: string;
    musica?: IMusica[]
}