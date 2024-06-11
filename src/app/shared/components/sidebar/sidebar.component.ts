import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.services';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  @ViewChild('searcGif')
  public searGifButton!: ElementRef<HTMLButtonElement>;

  constructor(private gifsService: GifsService){
  }

  get tags(): string[]{
    return this.gifsService.tagsHistory;
  }

  onClickGif(gif: string): void {
    this.gifsService.searchNewTag(gif)
  }

}
