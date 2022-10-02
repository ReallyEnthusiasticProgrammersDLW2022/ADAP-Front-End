// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getDatabase, ref, onValue} from "firebase/database";
// import { collection, query, where, getDocs } from "firebase/firestore";

const { initializeApp } = require("firebase/app")
const database = require('firebase/database')
const { collection, query, where, doc, getDoc, getDocs, setDoc, getFirestore } = require("firebase/firestore");
const { getStorage, ref, uploadBytes, getDownloadURL } = require("firebase/storage");

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCMCvf1yX5YWW0qlfznZHv1eeHF7Y9VleA",
    authDomain: "dlw-2022-mlda.firebaseapp.com",
    projectId: "dlw-2022-mlda",
    storageBucket: "dlw-2022-mlda.appspot.com",
    messagingSenderId: "917432888244",
    appId: "1:917432888244:web:05dfe5aaf82eb9a724a0e1"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();


const getImgData = async () => {
    const documents = []
    const querySnapshot = await getDocs(collection(db, "images"));
    querySnapshot.forEach((docs) => {
        let data = docs.data()
        data.id = docs.id
        documents.push(data)
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
    });
    // console.log(documents)  // [{}, {}]
    return documents
}

// get documents where plan_name = Jurong
const getImgDataByPlanName = async (plan_name) => {
    // console.log(plan_name)
    const documents = []
    const q = query(collection(db, "images"), where("plan_name", "==", plan_name));
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((docs) => {
        let data = docs.data()
        data.id = docs.id
        documents.push(data)
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
    });
    // console.log(documents)  // [{}, {}]
    return documents
}

const getPlans = async () => {
    const documents = []
    const querySnapshot = await getDocs(collection(db, "plans"));
    querySnapshot.forEach((docs) => {
        let data = docs.data()
        data.id = docs.id
        documents.push(data)
    });
    // console.log("Plans" + documents)
    // console.log(documents)  // [{}, {}]
    return documents
}

// let plan = {
//     name: 'CBD'
// }

const addNewPlan = async (plan) => {
    const plansRef = collection(db, "plans");
    await setDoc(doc(plansRef), plan);
}

// after calculate score, store image details in firebase
// const img = {
//     walk_score: 95,
//     bike_score: 87,
//     coord: "1.2.4",
//     location: "image3",
//     plan_name: "CBD",
// }

const storage = getStorage();

const setImgData = async (det, file, base64String, type) => {

    let response = await fetch(file)
    let blob = await response.blob()

    // update image data db
    const detRef = collection(db, "images");
    await setDoc(doc(detRef), det); // Auto-Id

    const documents = []
    const q = query(collection(db, "images"), where("location", "==", det.location));
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((docs) => {
        let data = docs.data()
        data.id = docs.id
        documents.push(data)
    });

    const storageRef = ref(storage, `images/${det.location}`);
    let metadata = {
        contentType: type,
    };
    await uploadBytes(storageRef, blob, metadata);
    response = await fetch(`data: image/jpg;base64, ${base64String}`)
    blob = await response.blob()
    metadata = {
        contentType: 'image/jpg',
    };
    const storageRef_seg = ref(storage, `images/${det.location_seg}`);

    await uploadBytes(storageRef_seg, blob, metadata);
    console.log(documents[0])
    return documents[0].id
}

const getSingleImg = async(imgID) => {
    const docRef = doc(db, "images", imgID)
    const snap = await getDoc(docRef)
    // { coord, location, location_seg, walk_score, bike_score }
    let imgDet = snap.data()

    // get image
    const img_ref = ref(storage, `images/${imgDet.location}`)
    // console.log(imgDet.location)
    let url = await getDownloadURL(img_ref)

    // get segmented image
    const img_seg_ref = ref(storage, `images/${imgDet.location_seg}`)
    let url_seg = await getDownloadURL(img_seg_ref)
    
    // delete local file to free disk space
    // fs.unlinkSync('./temp1.png');
    // fs.unlinkSync('./temp2.png');
    // unlink files once done! 
    return [ url, url_seg, imgDet ]
}

export { getImgData, getImgDataByPlanName, setImgData, getPlans, addNewPlan, getSingleImg }