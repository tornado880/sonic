import React, { useEffect, useState } from "react";
import MenuItem2 from "../../UI/MenuItem2";

import Banner_img_1 from "../../image/banner_1.png";
import Banner_img_2 from "../../image/banner_2.png";
import Banner_img_3 from "../../image/banner_3.png";

const Menu2 = () => {
    const [menuItems, setMenuItems] = useState([]); // Store menu items in state
    const [storedSum, setStoredSum] = useState(0); // Store total sum
    const [totalQuantity, setTotalQuantity] = useState(0); // Store total quantity

    useEffect(() => {
        let totalSum = 0;
        let quantitySum = 0;
        const items = [];

        // Fetch each item from sessionStorage
        Object.keys(sessionStorage).forEach((key) => {
            if (key.startsWith("id-")) {
                const id = sessionStorage.getItem(key);
                const image = sessionStorage.getItem(`image-${id}`);
                const name = sessionStorage.getItem(`name-${id}`);
                const price =
                    parseFloat(sessionStorage.getItem(`price-${id}`)) || 0;
                const sum =
                    parseFloat(sessionStorage.getItem(`sum-${id}`)) || 0;
                const qty =
                    parseInt(sessionStorage.getItem(`quantity-${id}`)) || 0;

                // Calculate totals only if valid values are found
                if (sum && qty) {
                    totalSum += sum;
                    quantitySum += qty;
                    items.push({ id, image, name, price, sum, quantity: qty });
                }
            }
        });

        // Update state after data processing
        setStoredSum(totalSum);
        setTotalQuantity(quantitySum);
        setMenuItems(items);
    }, []);

    // Remove item by id and update the state accordingly
    const handleItemDelete = (itemId) => {
        // Remove item from session storage and menuItems state
        ["id", "image", "name", "price", "sum", "quantity"].forEach((key) =>
            sessionStorage.removeItem(`${key}-${itemId}`)
        );

        // Update menu items and total state
        const updatedItems = menuItems.filter((item) => item.id !== itemId);
        const newTotalSum = updatedItems.reduce(
            (acc, item) => acc + item.sum,
            0
        );
        const newTotalQuantity = updatedItems.reduce(
            (acc, item) => acc + item.quantity,
            0
        );

        setMenuItems(updatedItems);
        setStoredSum(newTotalSum);
        setTotalQuantity(newTotalQuantity);
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
                    className="o_title ms-auto me-auto col-12 d-flex flex-column justify-content-center align-items-center text-start fw-bold border-0 "
                >
                    Towar
                </div>{" "}
                <div style={{ height: "60px" }} className="m-0 p-0 row"></div>
                {menuItems.length > 0 ? (
                    menuItems.map((item) => (
                        <MenuItem2
                            key={item.id}
                            {...item}
                            onItemDelete={handleItemDelete} // Handle item deletion
                        />
                    ))
                ) : (
                    <div className="m-0 p-0 row justify-content-center bg-primary">
                        <p className="o_btn m-0 p-3 ps-5 pe-5 fs-1 col-12 text-center border border-primary">
                            Choose figurku
                        </p>
                    </div>
                )}
                <div style={{ height: "60px" }} className="m-0 p-0 row"></div>
                {/* <div
                    style={{
                        height: "60px",
                        fontSize: "18px",
                        backgroundColor: "hsla(0, 0%, 0%, 0.5)",
                    }}
                    className="o_title ms-auto me-auto col-6 d-flex flex-column justify-content-center align-items-center text-start fw-bold border-0 "
                >
                    Towar: {totalQuantity} szt
                </div>{" "} */}
                <div
                    className="o_title ms-auto me-auto col-auto d-flex flex-column justify-content-center align-items-center text-start fw-bold border-0 "
                    style={{
                        height: "60px",
                        fontSize: "18px",
                        backgroundColor: "hsla(0, 0%, 0%, 0.5)",
                    }}
                >
                    Razem do zaplaty: {storedSum} zl
                </div>{" "}
                <div style={{ height: "60px" }} className="m-0 p-0 row"></div>
            </div>
        </div>
    );
};

export default Menu2;
