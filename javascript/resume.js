
// Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-storage.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBuDVWInt9XbnPBAb5l7RUTr7TrdglHJEk",
    authDomain: "kittivaasal-website.firebaseapp.com",
    databaseURL: "https://kittivaasal-website-default-rtdb.firebaseio.com",
    projectId: "kittivaasal-website",
    storageBucket: "kittivaasal-website.appspot.com",
    messagingSenderId: "4222968083",
    appId: "1:4222968083:web:408956f42f035b096bfae6"
};
firebase.initializeApp(firebaseConfig);

// Reference to the Firebase Realtime Database
const database = firebase.database();
// Reference to Firebase Storage
const storage = firebase.storage();

document.getElementById('resumeForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const fileInput = document.getElementById('resume');
    const file = fileInput.files[0];

    if (file) {
        const storageRef = storage.ref('resumes/' + file.name);

        // Upload the file to Firebase Storage
        const uploadTask = storageRef.put(file);

        uploadTask.on('state_changed',
            function(snapshot) {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            },
            function(error) {
                // Handle unsuccessful uploads
                console.error('Upload failed:', error);
            },
            function() {
                // Handle successful uploads on complete
                uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                    console.log('File available at', downloadURL);

                    // Save the download URL to Firebase Realtime Database
                    const resumeData = {
                        name: file.name,
                        url: downloadURL,
                        uploadedAt: firebase.database.ServerValue.TIMESTAMP
                    };

                    const newResumeKey = database.ref().child('resumes').push().key;
                    const updates = {};
                    updates['/resumes/' + newResumeKey] = resumeData;

                    database.ref().update(updates)
                        .then(function() {
                            console.log('Resume data saved to Realtime Database');
                        })
                        .catch(function(error) {
                            console.error('Error saving data to Realtime Database:', error);
                        });
                });
            }
        );
    }
});
