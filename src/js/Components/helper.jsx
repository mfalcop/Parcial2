import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyCLZfoIelpvhpUwZhDx7OCFevm336gAMro",
    authDomain: "myforum-e4fc9.firebaseapp.com",
    databaseURL: "https://myforum-e4fc9.firebaseio.com",
    projectId: "myforum-e4fc9",
    storageBucket: "myforum-e4fc9.appspot.com",
    messagingSenderId: "982113231161"
};
firebase.initializeApp(config);

const ref = firebase.database().ref()
const firebaseAuth = firebase.auth

export function auth (email, pw) {
  //console.log(name);
  return firebaseAuth().createUserWithEmailAndPassword(email, pw)
    //.then(saveUser)
}

export function logout () {
  return firebaseAuth().signOut()
}

export function login (email, pw) {
  return firebaseAuth().signInWithEmailAndPassword(email, pw)
}

export function resetPassword (email) {
  return firebaseAuth().sendPasswordResetEmail(email)
}

export function saveUser (user) {
  return ref.child(`users/${user.uid}/info`)
    .set({
      email: user.email,
      uid: user.uid, 
     name:user.name
    })
    .then(() => user)
}

export function savePost(post){

  const refElem = firebase.database().ref().child('/posts');
  const elemento = {
    title: post.title,
    description: post.descr,
    author:post.authorid,
    datetime: post.datetime
  }

  refElem.push(elemento);
}
export function getPost(postId){
  
  var ref= firebase.database().ref("posts/"+postId);
  let newState = [];
  var title="";
  var author="";
  var descr="";
  var datetime="";
  

  console.log('GETPOST'+postId);
  ref.orderByKey().equalTo("title").on("child_added",function(data){
      title = data.val(); 
    
  
  });
   ref.orderByKey().equalTo("author").on("child_added",function(data){
      author = data.val(); 
  });
  ref.orderByKey().equalTo("datetime").on("child_added",function(data){
      datetime = data.val(); 
  });
  ref.orderByKey().equalTo("description").on("child_added",function(data){
      descr = data.val(); 
  });
  //console.log("THIS.TITLE"+ title);
  
  const elem ={
      title:title,
      datetime:datetime,
      author:author,
      descr:descr
  }
  
  return elem;


}

export function createComment(postId, userID, commen){
  
  const refElem = firebase.database().ref().child('posts/'+postId+'/comments');
  //console.log(postId);
  console.log(userID);
  //console.log(commen);
  const elemento = {
    comment:commen,
    user: userID,
    datetime: Date()
  }

  refElem.push(elemento);

}

export function verify(){
  
  var user = firebase.auth().currentUser;
  console.log(user);
  if(user){
    return true;
  }else{
    return false;
  }
  //return firebaseAuth().currentUser.getToken(true);
}

export function getToken(){
  const user =firebaseAuth().currentUser;
  return user;
}