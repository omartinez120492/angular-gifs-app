import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({providedIn: 'root'})
export class GifsService {
  public gifList: Gif[] = [];
  private _tagsHistory:string[] = [];
  private apiKey:string = '91OTb8Cg2zRbiWXlq8yWz4BNUM4tOhR8'
  private serviceUrl:string = 'https://api.giphy.com/v1/gifs'


  constructor(private http:HttpClient) {
    this.loadLocalStorage()
  }

  //! Para obtener el arreglo desde cualquier componente o modulo
  get tagsHistory(): string[]{
    return [...this._tagsHistory];
  }

  //! Filtros antes de insertar a la lista
  private organizeHistory(tag: string){
    //! A mayuscula para mejor busqueda
    tag = tag.toLowerCase();
    //! Borramos el tag anterior si existe
    if(this._tagsHistory.includes( tag )){
      this._tagsHistory = this._tagsHistory.filter( t => t!== tag);
    }
    //! Y agregamos el tag al inicio de la lista
    this._tagsHistory.unshift( tag );
    //! Mantenemos la lista con un tamaño de 10 items
    this._tagsHistory = this._tagsHistory.splice(0,10);
    //? guardamos al localStorage
    this.saveLocalStorage()
  }

  //! Metodo para agregar al localStorge
  private saveLocalStorage():void{
    localStorage.setItem('history', JSON.stringify(this._tagsHistory))
  }

  //! Cargar el localStorage
  private loadLocalStorage():void{
    if(!localStorage.getItem('history')) return;
    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);
    //! cuando se carga el historial se muestra el primer item
    if(this._tagsHistory.length === 0 ) return;
    this.searchNewTag(this._tagsHistory[0])
  }

  //!Add a tag to history
  async searchNewTag(tag:string):Promise<void>{
    if(tag.length === 0) return;
    //! Organizando y filtrando las busquedas, sidebar
    this.organizeHistory(tag);
    //! aquí comptactamos los parametros de la peticion
    const params = new HttpParams()
    .set('api_key', this.apiKey)
    .set('limit', 10)
    .set('q',tag)
    //! Realizamos la peticion http, con HttpClient
    //! Se debe importar el HttpClientModule al app.module.ts
    //! SearchResponse es el tipo de dato que va regresar la peticion,
    //? Por ello creamos las interfaces (gifs.interfaces.ts)
    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, {params})
      .subscribe( resp => {
        this.gifList = resp.data;
      })

  }



}
