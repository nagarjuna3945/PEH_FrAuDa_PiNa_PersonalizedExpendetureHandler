// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase:{
    apiKey: "AIzaSyDEIsCxS_uX1IWYEuTWI5MK70_A0owwhmY",
    authDomain: "fir-firebase-app-4b1e9.firebaseapp.com",
    databaseURL: "https://fir-firebase-app-4b1e9.firebaseio.com",
    projectId: "fir-firebase-app-4b1e9",
    storageBucket: "fir-firebase-app-4b1e9.appspot.com",
    messagingSenderId: "928847153054"
  }
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
