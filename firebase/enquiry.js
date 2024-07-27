
//   // Import the functions you need from the SDKs you need
//   import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
//   import { getDatabase,ref, set, get, child } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";
//   // TODO: Add SDKs for Firebase products that you want to use
//   // https://firebase.google.com/docs/web/setup#available-libraries

//   // Your web app's Firebase configuration
//   // For Firebase JS SDK v7.20.0 and later, measurementId is optional
//   const firebaseConfig = {
//     apiKey: "AIzaSyBuDVWInt9XbnPBAb5l7RUTr7TrdglHJEk",
//     authDomain: "kittivaasal-website.firebaseapp.com",
//     projectId: "kittivaasal-website",
//     storageBucket: "kittivaasal-website.appspot.com",
//     messagingSenderId: "4222968083",
//     appId: "1:4222968083:web:408956f42f035b096bfae6"
//   };

//   // Initialize Firebase
//   const app = initializeApp(firebaseConfig);
// //   const analytics = getAnalytics(app);

// //get ref to database services
// const db =getDatabase(app);
// document.getElementById("Send Message").addEventListener('click',function(e){
    
//     set(ref(db,'user/'+document.getElementById("Name").value),
//     {

//     Name:document.getElementById("Name").value,
//     Contact:document.getElementById("Contact").value,
//     email:document.getElementById("email").value,
//     Message:document.getElementById("Message").value

// });
//   alert("login sucessfully !")
// })



const firebaseConfig = {
  //   copy your firebase config informations
  apiKey: "AIzaSyBuDVWInt9XbnPBAb5l7RUTr7TrdglHJEk",
  authDomain: "kittivaasal-website.firebaseapp.com",
  databaseURL: "https://kittivaasal-website-default-rtdb.firebaseio.com",
  projectId: "kittivaasal-website",
  storageBucket: "kittivaasal-website.appspot.com",
  messagingSenderId: "4222968083",
  appId: "1:4222968083:web:408956f42f035b096bfae6"
};

firebase.initializeApp(firebaseConfig);


var contactFormDB = firebase.database().ref("contactForm");

document.getElementById("contactForm").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  var name = getElementVal("name-input");
  var emailid = getElementVal("emailid-input");
  var msgContent = getElementVal("msgContent");

  saveMessages(name, emailid, msgContent);

  
  document.querySelector(".alert").style.display = "block";

  setTimeout(() => {
    document.querySelector(".alert").style.display = "none";
  }, 3000);


  document.getElementById("contactForm").reset();
}

const saveMessages = (name, emailid, msgContent) => {
  var newContactForm = contactFormDB.push();

  newContactForm.set({
    name: name,
    emailid: emailid,
    msgContent: msgContent,
  });
};

const getElementVal = (id) => {
  return document.getElementById(id).value;
};
