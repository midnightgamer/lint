import {Component, OnInit} from '@angular/core';
import {GlobalService} from "../../global.service";

@Component({
  selector: 'app-files-popup',
  templateUrl: './files-popup.component.html',
  styleUrls: ['./files-popup.component.scss']
})
export class FilesPopupComponent implements OnInit {
  files: Array<{ resource_name: string, file_name: string, date: string, checked: boolean }> = []

  constructor(private global: GlobalService) {
    this.files = [{
      resource_name: 'Adaptive traffic control system corridor info',
      file_name: 'File001',
      date: '20/07/2021',
      checked: false,
    }, {
      resource_name: 'Adaptive traffic control system corridor info',
      file_name: 'File002',
      date: '20/07/2021',
      checked: false,
    }, {
      resource_name: 'Adaptive traffic control system corridor info',
      file_name: 'File003',
      date: '20/07/2021',
      checked: false,
    }, {
      resource_name: 'Adaptive traffic control system corridor info',
      file_name: 'File004',
      date: '20/07/2021',
      checked: false,
    }, {
      resource_name: 'Adaptive traffic control system corridor info',
      file_name: 'File005',
      date: '20/07/2021',
      checked: false,
    }, {
      resource_name: 'Adaptive traffic control system corridor info',
      file_name: 'File006',
      date: '20/07/2021',
      checked: false,
    }]
  }

  ngOnInit(): void {
  }

  toggleCheckbox(id: string): void {
    this.files.forEach(item => {
      if (item.file_name === id) {
        item.checked = !item.checked;
      }
    })
  }

  closePopup(): void {
    this.global.set_popup(false, 'files')
  }

  openAPIPopup(): void {
    this.global.set_popup(false, 'files')
    this.global.set_popup(true, 'api')

  }

}
