import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';
import { SocialSharing } from '@ionic-native/social-sharing';

declare var google;

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  start = 'chicago, il';
  end = 'chicago, il';
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  latitude: number;
  longitude: number;
  smileys: {feeling: string, latitude: number, longitude: number}[];

  constructor(public navCtrl: NavController, private storage: Storage, private socialSharing: SocialSharing, private geolocation: Geolocation) {

    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  facebookShare() {
    this.socialSharing.shareViaFacebook('My score is XXX', null, null).then(() => {
      console.log('Sharing via Facebook success');
    }).catch(() => {
      console.log('Sharing via Facebook error');
    });
  }
  ionViewDidLoad(){
    this.initMap();
  }

  initMap() {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 7,
      center: {lat: 41.85, lng: -87.65}
    });
    let marker = new google.maps.Marker({
      position:  {lat: 76.3, lng: -77},
      map: this.map,
      title: "hello"
    });
    this.storage.get('smileys').then((val) => {
      this.smileys = val;
      console.log("heeey " + val);
      for (let smiley of val) {
        console.log(smiley);
        let marker = new google.maps.Marker({
          position:  {lat: smiley.latitude, lng: smiley.longitude},
          map: this.map,
          title: smiley.feeling
        });
      }
      this.directionsDisplay.setMap(this.map);
    });
  }

  calculateAndDisplayRoute() {
    this.directionsService.route({
      origin: this.start,
      destination: this.end,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }
}
