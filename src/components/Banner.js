import React from "react";

import Banner_img_1 from "../image/banner_1.png";

function Banner({ title }) {
    return (
        <div
            className="m-0 p-0 border-bottom border-4 border-primary"
            style={{
                position: "relative",
                width: "100%",
                height: "420px",
                cursor: "pointer",
            }}
        >
            <a
                className="m-0 p-0"
                style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    cursor: "default",
                }}
            >
                <img
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                    }}
                    src={Banner_img_1}
                />
            </a>

            <div
                style={{
                    margin: 0,
                    padding: "12px 36px",
                    fontSize: "48px", // Adjusted to be responsive
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textShadow: "1px 1px 10px black, 1px 1px 30px black",
                    boxShadow: "1px 1px 30px black",
                    border: "4px solid var(--bs-primary)",
                    backdropFilter: "blur(5px)",
                    backgroundColor: "hsla(0, 0%, 0%, 0.5)",
                }}
                className="o_title fw-bold text-white text-center"
                href="#menu" // If this is a navigation item, keep href; otherwise, switch to a button element
            >
                {title}
            </div>

            {/* <div
                id="menu"
                style={{ position: "absolute", bottom: "120px" }}
            ></div> */}
        </div>
    );
}

export default Banner;
