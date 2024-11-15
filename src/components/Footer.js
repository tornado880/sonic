import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Banner_img_1 from "../image/banner_1.png";
import Banner_img_2 from "../image/banner_2.png";
import Banner_img_3 from "../image/banner_3.png";

function Footer() {
    return (
        <div
            className="o_slider"
            style={{
                position: "relative",
                width: "100%",
                height: "420px",
                backgroundImage: `url(${Banner_img_3})`, // Correct way to use a variable for background image
                backgroundSize: "cover", // Make sure the image covers the div properly
                backgroundPosition: "bottom", // Centers the background image
                objectFit: "cover", // Ensures the image maintains its aspect ratio and covers the container
            }}
        >
            <div
                style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    textAlign: "center",
                    color: "white",
                    backdropFilter: "blur(5px)",
                    backgroundColor: "hsla(0, 0%, 0%, 0.5)",
                }}
                className="m-0 p-0 row align-items-end justify-content-between border-top border-4 border-primary"
            >
                <div
                    style={{
                    }}
                    className="m-0 p-0 col-12 text-white row justify-content-around align-items-center"
                >
                    <div className="m-0 p-0 col-auto fw-bold text-center fs-6 d-flex flex-column ">
                        <a
                            style={{ height: "60px" }}
                            className="o_btn d-flex flex-column justify-content-center text-center text-decoration-none"
                            href="/"
                        >
                            Home
                        </a>
                        <a
                            style={{ height: "60px" }}
                            className="o_btn d-flex flex-column justify-content-center text-center text-decoration-none"
                            href="#menu"
                        >
                            Menu
                        </a>{" "}
                        <a
                            style={{ height: "60px" }}
                            className="o_btn d-flex flex-column justify-content-center text-center text-decoration-none"
                            href="/Buy"
                        >
                            Buy
                        </a>
                        <a
                            id="footer"
                            style={{ height: "60px" }}
                            className="o_btn d-flex flex-column justify-content-center text-center text-decoration-none"
                            href="#footer"

                        >
                            Contact
                        </a>
                    </div>

                    <div className="m-0 p-0 col-auto fw-bold text-center fs-6 d-flex flex-column justify-content-center ">
                    <p
                            style={{ height: "60px", boxShadow: 'none'}}
                            className="o_btn d-flex flex-column justify-content-center text-center border-0"
                        >
                            Contact
                        </p>
                        <p
                            style={{ height: "60px" }}
                            className="o_btn d-flex flex-column justify-content-center text-center border-0 fw-normal"
                        >
                            +48 123 456 789
                        </p>
                        <p
                            style={{ height: "60px" }}
                            className="o_btn d-flex flex-column justify-content-center text-center border-0 fw-normal"
                        >
                            lodo-sklep@gmail.com
                        </p>{" "}
                        <p
                            style={{ height: "60px" }}
                            className="o_btn d-flex flex-column justify-content-center text-center border-0 fw-normal"
                        >
                            Kurze Str., 33613 Bielefeld
                        </p>
                    </div>
                </div>

                <Link
                    style={{
                        textShadow:
                            "1px 1px 5px black, 1px 1px 10px black, 1px 1px 15px black, 1px 1px 25px black, 1px 1px 30px black, 1px 1px 35px black",
                        height: "60px",
                    }}
                    className="o_btn col d-flex flex-column justify-content-center text-center border-0" to='/Admin'
                >
                    © 2024 Wanapix
                </Link>
            </div>

           
        </div>
    );
}

export default Footer;
