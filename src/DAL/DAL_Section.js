import firebase from "firebase/app";
import "firebase/firestore";
//firebase firestore function
export async function setSectionItemDAL (sectionItems,userId) {
	return await firebase.firestore().collection(userId)
	.doc("sectionItems").set({sectionItems: sectionItems}).then(()=>{
		return '1';
	}).catch((err)=>{
		console.log(err.message)
	});
}
