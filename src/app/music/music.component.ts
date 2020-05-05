import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItuneListService } from '../shared/itune_music.service';
import { Music } from '../shared/music';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.css']
})
export class MusicComponent  {
  music: Music;

  constructor(private router: Router,
              private route: ActivatedRoute,
              public itunemusicservice: ItuneListService) {

                this.route.params.subscribe(params => {
                  // tslint:disable-next-line:no-string-literal
                  if ( params['musicId'] ) {

                    // tslint:disable-next-line:no-string-literal
                    console.log(params['musicId']);
                    // tslint:disable-next-line:no-string-literal
                    this.getMusic (params['musicId']);
                  }
                });
              }

              getMusic(musicId: string) {
                this.itunemusicservice.retrieveBook(musicId)
                .pipe(
                  tap(data => {
                    const res: any = data;
                  }),
                  map(data => {
                    const res: any = data;
                    console.log(res.results);
                    return res.results ? res.results : [];

                  }),
                  map(items => {
                    return items.map(item => this.bookFactory(item));
                  }),
              ).subscribe((music) => this.music = music );

              // tslint:disable-next-line:align
              console.log(this.music);
              }
  bookFactory(item: any): Music {
    return new Music(
      item.artistName,
      item.previewUrl,
      item.artworkUrl30,
      item.artworkUrl100,
      item.artworkUrl60,
      item.trackId
    );
  }

}
