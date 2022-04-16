const {initializeApp} = require('firebase/app');
const {getStorage} = require('firebase/storage');  

const {
    FB_APP_BUCKET_URL,
    FB_APP_API_KEY,
    FB_APP_AUTH_DOMAIN,
    FB_APP_PROJECT_ID,
    FB_APP_STORAGE_BUCKET,
    FB_APP_MESSAGING_SENDER_ID,
    FB_APP_APP_ID
} = process.env; 

const firebaseConfig = {
    apiKey: FB_APP_API_KEY,
    authDomain: FB_APP_AUTH_DOMAIN,
    projectId: FB_APP_PROJECT_ID,
    storageBucket: FB_APP_STORAGE_BUCKET,
    messagingSenderId: FB_APP_MESSAGING_SENDER_ID,
    appId: FB_APP_APP_ID
}

const app = initializeApp(firebaseConfig);
const storage = getStorage(app, FB_APP_BUCKET_URL);
module.exports = storage; 