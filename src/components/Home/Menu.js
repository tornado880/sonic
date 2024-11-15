import React, { useState } from "react";
import { MenuList } from "../../helpers/MenuList";
import MenuItem from "../../UI/MenuItem";

import Banner_img_1 from "../../image/banner_1.png";
import Banner_img_2 from "../../image/banner_2.png";
import Banner_img_3 from "../../image/banner_3.png";

const Menu = () => {
    const [visibleItemsCount, setVisibleItemsCount] = useState(4); // Start with the first 4 items

    // Load the next 4 items each time the button is clicked
    const loadMoreItems = () => {
        setVisibleItemsCount((prevCount) => prevCount + 4);
    };

    return (
        <div
            className="m-0 p-0 d-flex flex-column align-items-center"
            style={{
                backgroundImage: `url(${Banner_img_2})`, // Correct way to use a variable for background image
                backgroundSize: "cover", // Make sure the image covers the div properly
                backgroundPosition: "top", // Centers the background image
                objectFit: "cover", // Ensures the image maintains its aspect ratio and covers the container
            }}
        >
            <div
                style={{
                    backdropFilter: "blur(24px)",
                    width: "100vw",
                }}
                className="m-0 p-0 row align-items-evenly justify-content-center"
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
                    Figurki
                </div>{" "}
                <div style={{ height: "60px" }} className="m-0 p-0 row"></div>
                {MenuList.slice(0, visibleItemsCount).map((menuItem, key) => (
                    <MenuItem
                        key={menuItem.id}
                        id={menuItem.id}
                        image={menuItem.image}
                        name={menuItem.name}
                        price={menuItem.price}
                    />
                ))}
                <div style={{ height: "60px" }} className="m-0 p-0 row"></div>

                {visibleItemsCount < MenuList.length && (
                    <button
                        style={{
                            height: "60px",
                            width: "300px",
                        }}
                        className="o_btn d-flex flex-column justify-content-center align-items-center text-start fw-bold border border-5 border-primary bg-primary"
                        onClick={loadMoreItems} // Trigger the handleClick logic
                    >
                        Download next 4 items0
                    </button>
                )}
                <div style={{ height: "60px" }} className="m-0 p-0 row"></div>
            </div>
        </div>
    );
};

export default Menu;
