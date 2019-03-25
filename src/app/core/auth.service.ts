import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class AuthService {
  user: Observable<firebase.User>;
  uid: string;

  constructor(private afAuth: AngularFireAuth) {
    this.user = afAuth.authState;

    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.uid = user.uid;
      } else {
        // Logout
        this.uid = null;
      }
    });
  }

  login(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
      .then( res => {
        resolve(res);
      }, err => reject(err) );
    });
  }

  logout() {
    return new Promise((resolve, reject) => {
      if (firebase.auth().currentUser) {
        this.uid = null;
        this.afAuth.auth.signOut();
        resolve();
      } else {
        reject();
      }
    });
  }
}
