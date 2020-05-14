import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ItuneListService } from '../shared/itune_music.service';
import {Injectable} from '@angular/core';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { formatDate } from '@angular/common';
import { MatSnackBar } from '@angular/material';



@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
@Injectable()
export class SearchComponent implements OnInit {

  events: string[] = [];
  public status = false;
  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2020, 0, 1);



  term = '';
  // tslint:disable-next-line:max-line-length
  constructor(private router: Router, public route: ActivatedRoute, public itunemusicservice: ItuneListService, public snackBar: MatSnackBar) {
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

  addEvent(type: string, event: MatDatepickerInputEvent<any>) {
    this.events.push(`${type}: ${event.value}`);
    //console.log(event.value);

    const locale = 'en-US';
    // tslint:disable-next-line:whitespace
    const format = formatDate(event.value,'yyyy-MM-ddThh:mm:ss',locale );
    console.log(format);
   // tslint:disable-next-line:align
     this.itunemusicservice.searchTime(format).subscribe((result) => {
      this.status = result['available']
      console.log(this.status);
      if (this.status) {
        this.snackBar.open('Cette Horaire est disponible', '', {
          duration: 2000,
       });
      } else {
        this.snackBar.open('Cette Horaire n\'est disponible', '', {
          duration: 2000,
       });
      }
    }

     );
   // this.itunemusicservice.searchMusics(event.value);
  }


  doSearch() {
    this.router.navigate(['search', { term : this.term , page : this.itunemusicservice.page}]);
   // console.log(this.term);
  }


  onSearch(term: string) {
    this.itunemusicservice.searchMusics(term);
  }
}
