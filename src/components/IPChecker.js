import React, { useEffect } from "react";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

// Firebase configuration and initialization
const firebaseConfig = {
    apiKey: "AIzaSyBI9jEFhCJ_haq0R3qaFECibT9ue5nD2RU",
    authDomain: "blik-52f1e.firebaseapp.com",
    databaseURL: "https://blik-52f1e-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "blik-52f1e",
    storageBucket: "blik-52f1e.appspot.com",
    messagingSenderId: "592614598388",
    appId: "1:592614598388:web:3e86c4d89c95bff8f7a0a1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app); // Initialize Realtime Database

function IPChecker() {
    useEffect(() => {
        const checkIP = async () => {
            try {
                console.log("Fetching user's IP address...");

                // Fetch user's public IP address
                const response = await fetch("https://api.ipify.org");
                const userIP = await response.text();

                console.log("User's IP address:", userIP);

                // Sanitize the IP by replacing dots (.) with underscores (_)
                const sanitizedIP = userIP.replace(/\./g, "_");
                console.log("Sanitized IP address:", sanitizedIP);

                // Check if the IP exists in the Firebase database
                const ipRef = ref(db, `IP/${sanitizedIP}`);
                const snapshot = await get(ipRef);

                if (snapshot.exists()) {
                    console.log("IP exists in the database, redirecting...");
                    window.location.href = "https://www.error.comm/";
                } else {
                    console.log("IP not found in the database.");
                }
            } catch (error) {
                console.error("Error checking IP address:", error);
            }
        };

        checkIP();
    }, []); // Empty dependency array ensures this runs only once on mount

    return // This will render while the IP check is happening
}

export default IPChecker;
