import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';
import { SocialSharing } from '@ionic-native/social-sharing';
import { GoogleMaps, GoogleMap} from '@ionic-native/google-maps';

declare var google;

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  @ViewChild('map') mapElement: ElementRef;
  map: GoogleMap;

  scores: string[];

  constructor(public navCtrl: NavController, private storage: Storage, private socialSharing: SocialSharing, private _googleMaps: GoogleMaps) {

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
  ngAfterViewInit(){
    this.initMap();
  }

  initMap(){
    let element = this.mapElement.nativeElement;
    this.map = this._googleMaps.create(element)
  }
}
