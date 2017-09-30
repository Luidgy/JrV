import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  score: any;

  constructor(public navCtrl: NavController, private storage: Storage) {
    storage.set('score', 12);
    storage.get('score').then((val) => {
      this.score = val;
    });
  }

}
