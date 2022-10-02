// import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
// import admin from "firebase-admin";
// import { getFirestore, Timestamp, FieldValue} from 'firebase-admin/firestore';
// import serviceAccount from './dlw2022-7a082-firebase-adminsdk-76qls-8405c1e01a.json' 
// import fs from 'fs'

const admin = require('firebase-admin');
const getFirestore = () => admin.firestore();

// const { initializeApp, applicationDefault, cert } = require('firebase-admin/app')
// const admin = require('firebase-admin')
// const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore')
// const serviceAccount = require('./dlw2022-7a082-firebase-adminsdk-76qls-8405c1e01a.json')
// const fs = require('fs')

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = getFirestore();

// get all images
async function read() {
    const documents = [];
    await db.collection('images').get()
        .then(snapshot => {
            snapshot.docs.map(doc => {
                documents.push(doc.data());
                console.log(doc.data());
            });

        });
    console.log(documents)

    // get image from bucket 
    const bucket = admin.storage().bucket('gs://dlw2022-7a082.appspot.com');
    await bucket.file('image1.jpg').download({ destination: './temp.png' });
    console.log('Image downloaded locally to', './temp.png');
    // delete local file to free disk space
    fs.unlinkSync('./temp.png');

    return documents;
}


// get all images details + image (bucket) under plan_name


// upload 1. image details 2. image (bucket) to firebase

// read() 
export default read