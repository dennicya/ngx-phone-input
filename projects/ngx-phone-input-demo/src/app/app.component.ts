import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  telInput: any;

  telInputObject(obj: any) {
    this.telInput = obj;
  }
}
