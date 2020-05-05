// tslint:disable-next-line:whitespace
import { map,tap } from 'rxjs/operators';
import {Injectable, Inject} from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../app-config/app-config.module';
import { Music } from './music';

@Injectable()

export class ItuneListService  {
   // tslint:disable-next-line:no-inferrable-types
   public loading: boolean = false;

  // tslint:disable-next-line:no-inferrable-types
  public initialised: boolean = false;

  // tslint:disable-next-line:no-inferrable-types
  public totalItems: number = 0;
  // tslint:disable-next-line:no-inferrable-types
  public page: number = 1;
  // tslint:disable-next-line:no-inferrable-types
  public pageSize: number = 10;
  // tslint:disable-next-line:no-inferrable-types
  public query: string = '';

  public music: Music[];

  constructor(private http: HttpClient, @Inject(APP_CONFIG) private config: AppConfig) {
  }

  get startIndex() {
    return this.page * this.pageSize;
  }

  get totalPages() {
    try {
      return Math.ceil(this.totalItems / this.pageSize);
    } catch (e) {
      console.error(e);
      return 0;
    }
  }

  get page_get(): number {
    return this.page;
  }

  set page_set(val: number) {
    if (val !== this.page) {
      this.page = val;
      this.searchMusics(this.query);
    }
  }

  public searchMusics(queryTitle: string) {
    this.query = queryTitle;
    this.loading = true;
    this.initialised = true;
    this.music = [];
    // tslint:disable-next-line:object-literal-shorthand
    this.http.get(`${this.config.apiEndpoint}search?term=${this.query}`).pipe(
        tap(data => {
          const res: any = data;
          this.totalItems = res.totalItems;

        }),
        map(data => {
          const res: any = data;
          console.log(res.results);
          return res.results ? res.results : [];

        }),
        map(items => {
          return items.map(item => this.bookFactory(item));
        }),

        tap(_ => this.loading = false)

    ).subscribe((music) => this.music = music );

      }

      retrieveBook(bookId: string) {
        return this.http.get(`${this.config.apiEndpoint}lookup/?id=${bookId}`);
      }

    public bookFactory(item: any): Music {
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
