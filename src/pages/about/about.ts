import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  scores: string[];
  latitude: number;
  longitude: number;

  constructor(public navCtrl: NavController, private storage: Storage, private socialSharing: SocialSharing, private geolocation: Geolocation) {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
    }).catch((error) => {
      console.log('Error getting location', error);
    });
    storage.set('scores', [121, 123213, 4344]);

    storage.get('scores').then((val) => {
      this.scores = val;
    });
  }

  facebookShare() {
    this.socialSharing.shareViaFacebook('My score is XXX', null, null).then(() => {
      console.log('Sharing via Facebook success');
    }).catch(() => {
      console.log('Sharing via Facebook error');
    });
  }

}
