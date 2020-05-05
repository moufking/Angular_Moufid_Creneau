import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ItuneListService } from '../shared/itune_music.service';
import {Injectable} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
@Injectable()
export class SearchComponent implements OnInit {

  term = '';
  constructor(private router: Router, public route: ActivatedRoute, public itunemusicservice: ItuneListService) {
    const options = {
      headers: {
          'Content-Type': 'application/json'
      }
  };
        // tslint:disable-next-line:align
        const jsonResponse = new Response('{}', options);

        // tslint:disable-next-line:align
        // tslint:disable-next-line:align
        this.route.params.subscribe(params => {
      // tslint:disable-next-line:no-string-literal
      if (params['term']) {
        // tslint:disable-next-line:no-string-literal
        this.term = params['term'];
        console.log(this.term);
        this.onSearch( this.term);
       // console.log(this.onSearch(this.term));
        this.term = ''; // empty this case
      }
    });
}

  ngOnInit() {
  }


  doSearch() {
    this.router.navigate(['search', { term : this.term , page : this.itunemusicservice.page}]);
   // console.log(this.term);
  }


  onSearch(term: string) {
    this.itunemusicservice.searchMusics(term);
  }
}
