import firebase from 'firebase';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBaj38yCJEOHYapjgx79y9KBQFc04VIfUw",
  authDomain: "my-recipes-e4fc9.firebaseapp.com",
  databaseURL: "https://my-recipes-e4fc9.firebaseio.com",
  projectId: "my-recipes-e4fc9",
  storageBucket: "my-recipes-e4fc9.appspot.com",
  messagingSenderId: "217320962428",
  appId: "1:217320962428:web:5af5c4dbf89b3a0258ccf9",
  measurementId: "G-X4TZGZ9LS4"
};

class Fire {
  constructor(callback) {
    this.init( callback )
  }

  init(callback) {

    if( !firebase.apps.length ) {
      firebase.initializeApp(firebaseConfig);
    }

    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        callback(null, user)
      } else {
        firebase
          .auth()
          .signInAnonymously()
          .catch(error => {
            callback(error)
          });
      }
    })
  }

  getRecipes(callback) {
    let ref = this.ref.orderBy("name");

      this.unsubscribe = ref.onSnapshot( snapshot => {
        var recipes = [];

        snapshot.forEach(doc => {
          recipes.push({ id: doc.id, ...doc.data() });
        });

        callback(recipes);
      });
  }

  addRecipe( recipe ) {
    let ref = this.ref;

    ref.add(recipe);
  }

  updateRecipe( recipe ) {
    let ref = this.ref;

    ref.doc(recipe.id).update(recipe);
  }

  deleteRecipe( recipe)  {
    let ref = this.ref;

    ref.doc(recipe.id).delete();
  }

  get userId() {
    return firebase.auth().currentUser.uid; 
  }

  get ref() {
    return firebase
      .firestore()
      .collection('users')
      .doc(this.userId)
      .collection('recipes');
  }

  detach() {
    this.unsubscribe();
  }

}

export default Fire;