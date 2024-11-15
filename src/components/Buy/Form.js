import React, { useState, useEffect } from "react";

import Banner_img_1 from "../../image/banner_1.png";
import Banner_img_2 from "../../image/banner_2.png";
import Banner_img_3 from "../../image/banner_3.png";

function Form() {
    const [imie, setImie] = useState("");
    const [nazwisko, setNazwisko] = useState("");
    const [telefon, setTelefon] = useState("");
    const [email, setEmail] = useState("");
    const [miasto, setMiasto] = useState("");
    const [paczkomat, setPaczkomat] = useState("");

    useEffect(() => {
        // Retrieve data from sessionStorage on component mount
        const storedImie = sessionStorage.getItem("imie");
        const storedNazwisko = sessionStorage.getItem("nazwisko");
        const storedTelefon = sessionStorage.getItem("telefon");
        const storedEmail = sessionStorage.getItem("email");
        const storedMiasto = sessionStorage.getItem("miasto");
        const storedPaczkomat = sessionStorage.getItem("paczkomat");

        if (storedImie) setImie(storedImie);
        if (storedNazwisko) setNazwisko(storedNazwisko);
        if (storedTelefon) setTelefon(storedTelefon);
        if (storedEmail) setEmail(storedEmail);
        if (storedMiasto) setMiasto(storedMiasto);
        if (storedPaczkomat) setPaczkomat(storedPaczkomat);
    }, []); // Empty dependency array ensures this runs only on mount

    useEffect(() => {
        // Save each state to sessionStorage whenever it changes
        sessionStorage.setItem("imie", imie);
        sessionStorage.setItem("nazwisko", nazwisko);
        sessionStorage.setItem("telefon", telefon);
        sessionStorage.setItem("email", email);
        sessionStorage.setItem("miasto", miasto);
        sessionStorage.setItem("paczkomat", paczkomat);
    }, [imie, nazwisko, telefon, email, miasto, paczkomat]);

    return (
        <div
            className="m-0 p-0 row justify-content-center border-top border-4 border-primary"
            style={{
                position: "relative",
                height: "auto",
                backgroundImage: `url(${Banner_img_3})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                objectFit: "cover",
            }}
        >
            <div
                style={{
                    textShadow:
                        "1px 1px 5px black, 1px 1px 10px black, 1px 1px 15px black, 1px 1px 25px black, 1px 1px 30px black, 1px 1px 35px black",
                    backdropFilter: "blur(24px)",
                    width: "100vw",
                }}
                className="m-0 p-0 text-white row justify-content-around align-items-center"
            >
                <div
                    style={{ height: "60px", outline: "none" }}
                    className="m-0 p-0 row"
                ></div>
                <div
                    style={{
                        backgroundColor: "hsla(0, 0%, 0%, 0.5)",
                    }}
                    className="o_title col-12 d-flex flex-column justify-content-center align-items-center text-center fw-bold border-0 "
                >
                    Dostawa i Platnosc
                </div>
                <div className="m-0 p-0 col-12 col-sm-11 col-md-9 col-lg-8 col-xl-7 col-xxl-6">
                    <div style={{ height: "60px" }} className="m-0 p-0 row"></div>

                    {[
                        { label: "Imie", value: imie, onChange: setImie },
                        { label: "Nazwisko", value: nazwisko, onChange: setNazwisko },
                        { label: "Telefon komorkowy", value: telefon, onChange: setTelefon },
                        { label: "Email", value: email, onChange: setEmail },
                        { label: "Miasto", value: miasto, onChange: setMiasto },
                        { label: "Paczkomat InPost", value: paczkomat, onChange: setPaczkomat }
                    ].map((field, index) => (
                        <div
                            key={index}
                            style={{ height: "60px", outline: "none" }}
                            className="m-0 p-0 row"
                        >
                            <p
                                style={{ fontSize: "18px" }}
                                className="o_title m-0 ps-4 pe-4 col-auto d-flex flex-column justify-content-center text-center fw-bold"
                            >
                                {field.label}
                            </p>
                            <input
                                className="o_btn col d-flex flex-column justify-content-center text-center bg-transparent"
                                value={field.value}
                                onChange={(e) => field.onChange(e.target.value)}
                            />
                        </div>
                    ))}

                    <div style={{ height: "60px" }} className="m-0 p-0 row"></div>

                    <button
                        style={{
                            height: "60px",
                            width: "300px",
                            backgroundColor: "hsla(0, 0%, 0%, 0.5)",
                        }}
                        className="o_btn ms-auto me-auto col-auto d-flex flex-column justify-content-center align-items-center text-start fw-bold border border-5 border-primary bg-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal1"
                    >
                        Kupuje i Place BLIK
                    </button>

                    <div style={{ height: "60px" }} className="m-0 p-0 row"></div>
                </div>
            </div>
        </div>
    );
}

export default Form;
