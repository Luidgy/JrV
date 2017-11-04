import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Toast } from '@ionic-native/toast';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  smileys: {feeling: string, latitude: number, longitude: number}[];
  feeling: string;
  lat: number;
  long: number;

  constructor(public navCtrl: NavController, private storage: Storage, private geolocation: Geolocation, private socialSharing: SocialSharing, private toast: Toast) {

    this.storage.get('smileys').then((val) => {
      if (val === null) {
        this.smileys = [];
      } else {
        this.smileys = val;
      }
    });
    this.toast.show('Click a feeling then save it or share it :)', '5000', 'bottom').subscribe();
  }

  smileyClick(icon:string) {
    this.feeling = icon;
    this.toast.show('Got it!', '1000', 'center').subscribe();
  }

  saveFeeling() {
    var options = {
      enableHighAccuracy: true,
      maximumAge: 0
    };

    this.geolocation.getCurrentPosition(options).then((resp) => {
      let smiley = {
        feeling: this.feeling,
        latitude: resp.coords.latitude,
        longitude: resp.coords.longitude
      };
      this.smileys.push(smiley);
      this.storage.set('smileys', this.smileys);
      this.toast.show('Feeling saved.', '1000', 'center').subscribe();
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
    this.socialSharing.share("I'm feeling " + feel + ".", null, null, null).then(() => {
      console.log('Sharing success');
    }).catch(() => {
      console.log('Sharing error');
    });
  }
}
