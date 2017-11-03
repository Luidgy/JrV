import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { SocialSharing } from '@ionic-native/social-sharing';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  smileys: {feeling: string, latitude: number, longitude: number}[];
  feeling: string;

  constructor(public navCtrl: NavController, private storage: Storage, private geolocation: Geolocation, private socialSharing: SocialSharing) {
    this.storage.get('smileys').then((val) => {
      if (val === null) {
        this.smileys = [];
      } else {
        this.smileys = val;
      }
    });
  }

  smileyClick(icon:string) {
    this.feeling = icon;
  }

  saveFeeling() {
    this.geolocation.getCurrentPosition().then((resp) => {
      let smiley = {
        feeling: this.feeling,
        latitude: resp.coords.latitude,
        longitude: resp.coords.longitude
      };
      this.smileys.push(smiley);
      this.storage.set('smileys', this.smileys);
      console.log(this.smileys);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  shareFeeling() {
    var feel;

    switch (this.feeling)
    {
      case'sad2':
        feel = 'veeeery sad'
        break;
      case'sad1':
        feel = 'a bit sad'
        break;
      case'meh':
        feel = 'just meh'
        break;
      case'happy1':
        feel = 'good'
        break;
      case'happy2':
        feel = 'happy'
        break;
      default:
        feel = 'weird'
    }
    this.socialSharing.shareViaTwitter("I'm feeling " + feel, null, null).then(() => {
      console.log('Sharing via Facebook success');
    }).catch(() => {
      console.log('Sharing via Facebook error');
    });
  }
}
