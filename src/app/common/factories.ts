import { IArtista } from "../Interfaces/IArtista";
import { IFaixa } from "../Interfaces/IFaixa";
import { IMusica } from "../Interfaces/IMusica";

export function newArtista(): IArtista{
    return {
        id: '',
        imagemUrl: '',
        nome: '',
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