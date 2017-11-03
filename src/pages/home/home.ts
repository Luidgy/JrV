import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  smileys: {smiley: string, latitute: string, longitude: string}[];

  constructor(public navCtrl: NavController, private storage: Storage) {
    this.storage.get('smileys').then((val) => {
      if (val === null) {
        this.smileys = [];
      } else {
        this.smileys = val;
      }
    });
  }

  smileyClick(icon:string) {
    this.smileys.push({smiley: icon, latitute: "234234", longitude: "12123123"});
    this.storage.set('smileys', this.smileys);
    console.log(this.smileys);
  }
}
