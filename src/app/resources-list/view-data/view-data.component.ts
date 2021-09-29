import {Component, OnInit} from '@angular/core';
import {GlobalService} from 'src/app/global.service';

@Component({
  selector: 'app-view-data',
  templateUrl: './view-data.component.html',
  styleUrls: ['./view-data.component.scss']
})
export class ViewDataComponent implements OnInit {
  queries: Array<{ name: string, inUse: boolean, showPopup: boolean, query?: any, editing: boolean }> = []
  query: boolean = false;
  dummyQuery: string = `
  {
"type": 200,
"title": "success",
"results": [
{}
]
}
  `

  constructor(private global: GlobalService) {
    this.queries = [
      {name: 'Search by today', inUse: false, editing: false, showPopup: false},
      {
        name: 'Search by yesterday',
        inUse: false,
        editing: false,
        showPopup: false
      },
      {
        name: 'Search by during',
        inUse: false, editing: false,
        showPopup: false,
        query: [{name: 'Timerel during 09:00:00 and 16:00:00', selected: false}
          , {name: 'Endime 15:30:00', selected: false}],

      },
      {
        name: 'Search by before',
        inUse: false,
        editing: false,
        showPopup: false
      },
      {
        name: 'Search by after and before',
        inUse: false,
        editing: false,
        showPopup: false
      },
      {name: 'Complex Search', inUse: false, editing: false, showPopup: false},
      {name: 'Search by after', inUse: false, editing: false, showPopup: false},
    ]
  }

  ngOnInit(): void {
  }

  closePopup(): void {
    this.global.set_popup(false, 'view-data')
  }

  copyResource(): void {
    this.global.copy('resource id', 'Resource id copied')
  }

  selectQuery(queryName: string): void {
    this.queries.forEach(item => {
      if (item.name === queryName) {
        item.inUse = true;
      }
    })
  }

  unselectQuery(event: any, queryName: string): void {
    event.stopPropagation();
    this.queries.forEach(item => {
      if (item.name === queryName) {
        item.inUse = false;
      }
    })
  }

  runQuery(event: Event): void {
    event.preventDefault();
    this.query = true;
  }

  copyResultQuery(): void {
    this.global.copy(this.dummyQuery, 'Result has been copied to your clipboard')
  }

  toggleEditing(event:Event,item: any): void {
    event.stopPropagation();
    item.editing = !item.editing;
  }

  toggleSubQuery(event: Event, query: any, item: any) {
    event.stopPropagation();
    query.query.forEach((q: any) => {
      if (q.name === item) {
        q.selected = !q.selected;
      }
    })
  }

  closeAllSubQueryPopup(event:Event): void {
    this.queries.forEach(item => {
      item.editing = false;
    })
  }
}
