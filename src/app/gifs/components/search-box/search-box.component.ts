import { GifsService } from './../../services/gifs.services';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'gifs-search-box',
  template: `
  <h5>Buscar</h5>
  <input type="text" class="form-control"
    placeholder="Buscar Gifs ..."
    (keyup.enter)="searchTag()"
    #txtTagInput
  >
  `
})

export class SearchBoxComponent {
  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService){

  }

  // searchTag(newTag: string){
  //   console.log(newTag)
  //   newTag = ''
  // }
  searchTag(){
    //! Referencia del input Search
    const newTag = this.tagInput.nativeElement.value
    //! Agregando la nueva busqueda al historial
    this.gifsService.searchNewTag(newTag)
    //! limpiando el input search
    this.tagInput.nativeElement.value = ''

  }
}
