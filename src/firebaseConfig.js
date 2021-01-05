import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

let firebaseConfig = {
	apiKey: "AIzaSyCoryeuFOWrOtykFOPAzAq1RbAHxE8BXrw",
	authDomain: "it-infobox.firebaseapp.com",
	projectId: "it-infobox",
	storageBucket: "it-infobox.appspot.com",
	messagingSenderId: "288519113893",
	appId: "1:288519113893:web:7b3e4b1ee924165613114c",
	measurementId: "G-PK8SECKF03"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);