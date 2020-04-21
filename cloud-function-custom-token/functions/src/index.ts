import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";

export const getCustomToken = functions.https.onRequest((request, response) => {
    if (admin.apps.length < 1) {   //Checks if app already initialized
        admin.initializeApp();
    }
    const uid = "NSBFu2YJNDgLQJCZ99dRJlP4DRo2"; 

    admin.auth().createCustomToken(uid)
        .then(function (customToken) {
            console.log(customToken.toString);
            response.send(customToken);
        })
        .catch(function (error) {
            console.log("Error creating custom token:", error);
        });
});

