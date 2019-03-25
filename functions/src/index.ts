import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();

export const fcmSend = functions.database.ref('/public_spend/{spendId}').onCreate((snapshot, context) => {
  const spendInfo = snapshot.val();

  const payload = {
    notification: {
      title: 'Donn! 新規入力💰',
      body: spendInfo.memo + '( ¥' + spendInfo.amount + ') が入力されました',
      clickAction: "https://donn-a0b1c.firebaseapp.com/spend-list?isPublic=true",
      icon: "https://user-images.githubusercontent.com/33277426/45892904-7bbe0f00-be04-11e8-8780-940767b3dddb.png"
    }
  };

  admin.database()
    .ref('/fcmTokens/')
    .once('value')
    .then(token => {
      const tokenList = (token.val()) || '';

      Object.keys(tokenList).map(function(key, index) {
        console.log(tokenList[key]);
        admin.messaging().sendToDevice(tokenList[key], payload)
          .then(res => {
            console.log("Sent Successfully", res);
          })
          .catch(err => {
            console.log(err);
          });
      });
    })
    .catch(err => {
      console.log(err);
    });

});
