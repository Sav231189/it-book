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
export async function setNavInSectionDAL (sectionItems,userId) {
	let id = null;
	let number = null;
	for (let i = 0; i < sectionItems.length; i++) {
		if (sectionItems[i].isActive === true){
			id = sectionItems[i].id;
			number = i;
		}
	}
	console.log(id);
	return await firebase.firestore().collection(userId)
	.doc(id.toString()).set({nav: sectionItems[number].nav}).then(()=>{
		return '1';
	}).catch((err)=>{
		console.log(err.message)
	});
}
