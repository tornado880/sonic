import React, { useState, useEffect } from "react";
import Quantity from "./Quantity";

function MenuItem({ id, image, name, price }) {
    const [quantity, setQuantity] = useState(1);
    const [sum, setSum] = useState(price);

    // useEffect to initialize stored values from sessionStorage
    useEffect(() => {
        const storedSum = sessionStorage.getItem(`sum-${id}`);
        const storedQuantity = sessionStorage.getItem(`quantity-${id}`);

        if (storedSum) {
            setSum(Number(storedSum)); // Ensure sum is a number
        }

        if (storedQuantity) {
            setQuantity(Number(storedQuantity)); // Ensure quantity is a number
        }
    }, [id]); // This effect runs only when `id` changes (initialization)

    // Update `sum` whenever `quantity` or `price` changes
    useEffect(() => {
        // Calculate the sum when price or quantity changes
        setSum(price * quantity);
    }, [price, quantity]); // Only trigger this effect on `price` or `quantity` changes

    function buy() {
        const total = price * quantity;
        setSum(total); // Update the sum to reflect the final total

        // Store the total and quantity in sessionStorage
        sessionStorage.setItem(`sum-${id}`, total);
        sessionStorage.setItem(`quantity-${id}`, quantity);
        sessionStorage.setItem(`id-${id}`, id);
        sessionStorage.setItem(`name-${id}`, name);
        sessionStorage.setItem(`image-${id}`, image);
        sessionStorage.setItem(`price-${id}`, price);
    }

    function decrement() {
        if (quantity > 0) {
            setQuantity(quantity - 1);
        }
    }

    function increment() {
        setQuantity(quantity + 1);
    }

    return (
        <div
            style={{
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "300px",
                height: "336px",
                boxShadow: "1px 1px 50px black",
            }}
            className="m-2 p-0 "
        >
            <div className="m-0 p-0 position-relative row justify-content-start">
                <img src={image} className="m-0 p-0" alt={name} />

                <p
                    style={{
                        fontSize: "24px",
                        color: "white",
                        position: "absolute",
                        textShadow:
                            "1px 1px 10px black, 1px 1px 15px black, 1px 1px 20px black, 1px 1px 25px black, 1px 1px 30px black",
                    }}
                    className="m-0 p-1 ps-2 col-6"
                >
                    {name}
                </p>

                <p
                    style={{
                        fontSize: "24px",
                        color: "white",
                        position: "absolute",
                        right: "0px",
                        bottom: "36px",
                        textShadow:
                            "1px 1px 10px black, 1px 1px 15px black, 1px 1px 20px black, 1px 1px 25px black, 1px 1px 30px black",
                    }}
                    className=" m-0 p-0 pe-2 col-6 text-end fw-bold"
                >
                    {sum} <span className="m-0 p-0 fw-normal">zł</span>
                </p>

                <div
                    style={{
                        backgroundColor: "hsla(0, 0%, 0%, 0.5)",
                        backdropFilter: "blur(24px)",
                        height: "36px",
                    }}
                >
                    <p
                        style={{
                            fontSize: "24px",
                            color: "white",
                            display: "block",
                            right: "0",
                            height: "36px",
                            textShadow:
                                "1px 1px 10px black, 1px 1px 15px black, 1px 1px 20px black, 1px 1px 25px black, 1px 1px 30px black",
                        }}
                        className=" m-0 p-2 col-6 text-end fw-bold"
                    ></p>

                    <Quantity
                        left="0vh"
                        quantity={quantity}
                        increment={increment}
                        decrement={decrement}
                    />

                    <div
                        style={{
                            right: "0",
                            bottom: "0px",
                            cursor: "pointer",
                            zIndex: 800,
                            height: "36px",
                            width: "60px",
                        }}
                        className="o_btn m-0 p-0 col-lg-8 fw-bold position-absolute d-flex justify-content-center align-items-center"
                        onClick={buy}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            width="36"
                            height="36"
                            className="bi bi-bag-fill m-0 p-1"
                            viewBox="0 0 16 16"
                        >
                            <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4z" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MenuItem;
