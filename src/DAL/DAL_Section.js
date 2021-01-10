import firebase from "firebase/app";
import "firebase/firestore";

//firebase firestore function
export async function setSectionItemDAL (sectionItems,userId) {
	let copy = JSON.parse(JSON.stringify(sectionItems));
	copy.map(el => el.folderItems = []);
	return await firebase.firestore().collection(userId)
	.doc("sectionItems").set({sectionItems: copy}).then(()=>{
		return '1';
	}).catch((err)=>{
		console.log(err.message)
	});
}
export async function deleteSectionItemDAL (id,userId) {
	return await firebase.firestore().collection(userId)
	.doc(id.toString()).delete().then(()=>{
		return '1';
	}).catch((err)=>{
		console.log(err.message)
	});
}
export async function updateSectionItemDAL (activeSection,userId) {
	return await firebase.firestore().collection(userId)
	.doc(activeSection.id.toString()).set({folderItems: activeSection.folderItems}).then(()=>{
		return '1';
	}).catch((err)=>{
		console.log(err.message)
	});
}
export async function getSectionItemDAL (userId) {

	return  await firebase.firestore().collection(userId)
	.doc("sectionItems").get().then(function(doc) {
		if (doc.exists) {
			return  doc.data();
		} else {
			console.log("No such document!");
		}
	}).catch(function(error) {
		console.log("Error getting document:", error);
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
	return await firebase.firestore().collection(userId)
	.doc(id.toString()).set({folderItems: sectionItems[number].folderItems})
	.then(()=>{
		return 'success setNavItem';
	}).catch((err)=>{
		console.log(err.message)
	});
}
export async function getNavItemsDAL (id = 0,userId) {

	const snapshot = await firebase.firestore().collection(userId).get();
	if (snapshot.size > 1 && id !== 0){
		return await firebase.firestore().collection(userId).doc(id.toString())
		.get().then(function(doc) {
			if (doc.exists) {
				return  doc.data();
			} else {
				console.log("No such document!");
			}
		}).catch(function(error) {
			console.log("Error getting document:", error);
		});
	}else return 0;

}
