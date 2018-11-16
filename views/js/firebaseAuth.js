

var config = {
    apiKey: 'AIzaSyCz1-DKtRO6JIwr50UfrKx6rHLqoUzVO_c',
    authDomain: 'pmm-site-a57b9.firebaseapp.com',
    databaseURL: 'https://pmm-site-a57b9.firebaseio.com',
    projectId: 'pmm-site-a57b9',
    storageBucket: 'pmm-site-a57b9.appspot.com',
    messagingSenderId: '6786740573'
  };
firebase.initializeApp(config);

function checkIfLoggedIn(){
  firebase.auth().onAuthStateChanged(function(user) {
    if( user ){
      console.log('User signed in');
      document.getElementById('google-signin')
      .setAttribute('style', 'display: none; visibility: hidden;')
      document.getElementById('signout')
      .setAttribute('style', 'display: inline-block; visibility: visible')
    }else{
      console.log('User not signed in');
      document.getElementById('google-signin')
      .setAttribute('style', 'display: inline-block; visibility: visible;')
      document.getElementById('signout')
      .setAttribute('style', 'display: none; visibility: hidden')
    }
  })
}

window.onload = function(){
  checkIfLoggedIn()
}

document.getElementById('signout').onclick = function signOut(){
  firebase.auth().signOut()

  checkIfLoggedIn()
}

document.getElementById('google-signin').onclick = function signInWithGoogle(){
    let googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(googleAuthProvider)
    .then((result) => {
        result.user.getIdToken()
        .then((token) => {
            localStorage.setItem('firebase_idToken', token);
        }).catch((err) => {
          console.log(err);
        });
    }).catch((err) => {
      console.log(err);
    });
}
