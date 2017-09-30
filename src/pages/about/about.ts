import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { SocialSharing } from '@ionic-native/social-sharing';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  scores: string[];

  constructor(public navCtrl: NavController, private storage: Storage, private socialSharing: SocialSharing) {
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
