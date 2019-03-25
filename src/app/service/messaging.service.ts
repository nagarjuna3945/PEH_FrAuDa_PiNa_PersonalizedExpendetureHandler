import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { BehaviorSubject } from 'rxjs';
import * as firebase from 'firebase';
import 'firebase/messaging';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  messaging = firebase.messaging();
  currentMessage = new BehaviorSubject(null);
  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) {
    // Add the public key generated from the console here.
    this.messaging.usePublicVapidKey('BNrR721Wd9x1252B91V4rYwmbZZ6nZ6Xx1KpbjZYHGqh5IyQq7pD9N5QaMt9dakfvslW1VmUFEjTiOnsZozd_Sg');
  }

  updateToken(token) {
    this.afAuth.authState.subscribe(user => {
      if (!user) {
        return;
      }

      const data = { [user.uid]: token };
      this.db.object('fcmTokens/').update(data);
    });
  }

  getPermission() {
    this.messaging.requestPermission()
      .then(() => {
        console.log('Notification permission granted.');
        return this.messaging.getToken();
      })
      .then(token => {
        console.log(token);
        this.updateToken(token);
      })
      .catch((err) => {
        console.log('Unable to get permission to notify.', err);
      });
  }

  receiveMessage() {
    this.messaging.onMessage((payload) => {
      console.log('Message received. ', payload);
      this.currentMessage.next(payload);
    });
  }
}
