import { IArtista } from "../Interfaces/IArtista";
import { IFaixa } from "../Interfaces/IFaixa";
import { IMusica } from "../Interfaces/IMusica";
import { IPlaylist } from "../Interfaces/IPlaylist";

export function newArtista(): IArtista{
    return {
        id: '',
        imagemUrl: '',
        nome: '',
        musicas: []
    };
}

export function newMusica(): IMusica{
    return{
        id: '',
        album: {
            id: '',
            imagemUrl: '',
            nome: '',
        },
        artistas: [],
        tempo: '',
        titulo: '',

    };
}

export function newFaixa(): IFaixa{
    return{
        id: '',
        nome: '',
        previewUrl: '',
    }
}

export function newPlaylist(): IPlaylist{
    return{
        id: '',
        imagemUrl: '',
        nome: '',
        musica: []
    }
}