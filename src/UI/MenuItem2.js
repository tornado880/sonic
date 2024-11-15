import React, { useState, useEffect } from "react";
import Quantity from "./Quantity";

function MenuItem2({ id, image, name, price, sum, quantity, onItemDelete }) {
    const [itemQuantity, setItemQuantity] = useState(quantity);
    const [itemSum, setItemSum] = useState(sum);

    // Update sum and sync sessionStorage whenever quantity changes
    useEffect(() => {
        const newSum = price * itemQuantity;
        setItemSum(newSum);

        sessionStorage.setItem(`quantity-${id}`, itemQuantity);
        sessionStorage.setItem(`sum-${id}`, newSum);
    }, [itemQuantity, price, id]);

    const increment = () => setItemQuantity((prev) => prev + 1);
    const decrement = () => setItemQuantity((prev) => (prev > 1 ? prev - 1 : prev));

    const handleDelete = () => {
        ["id", "image", "name", "price", "sum", "quantity"].forEach((key) =>
            sessionStorage.removeItem(`${key}-${id}`)
        );

        onItemDelete(id); // Notify parent to remove the item
    };

    return (
        <div
            style={{
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "150px",
                width: '300px',
                position: "relative",
                backgroundColor: "hsla(0, 0%, 0%, 0.3)",
                boxShadow: '1px 1px 50px black'

            }}
            className="m-2 p-0 col-12 col-sm-11 col-md-9 col-lg-8 col-xl-7 border"
        >
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(255, 255, 255, 0)",
                    backdropFilter: "blur(24px)",
                    zIndex: 1,
                }}
            ></div>

            <img
                style={{
                    width: "150px",
                    position: "relative",
                    zIndex: 2,
                }}
                src={image}
                alt={name}
                className="m-0 p-0"
            />

            <p
                style={{
                    position: "absolute",
                    top: 0,
                    left: "150px",
                    zIndex: 995,
                    fontSize: 24,
                    color: "white",
                    textShadow:
                        "1px 1px 10px black, 1px 1px 15px black, 1px 1px 20px black, 1px 1px 25px black, 1px 1px 30px black",
                }}
                className="m-0 p-1 ps-2"
            >
                {name}
            </p>

            <div
                style={{
                    right: 0,
                    top: 0,
                    zIndex: 9,
                    position: "absolute",
                    width: "36px",
                    height: "36px",
                }}
                className="o_btn m-0 p-0 col fw-bold d-flex justify-content-center align-items-center border-0"
                onClick={handleDelete}
                aria-label={`Delete ${name}`}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    width="24"
                    height="24"
                    className="bi bi-x-lg m-0 p-1"
                    viewBox="0 0 16 16"
                    style={{ zIndex: 888 }}
                >
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                </svg>
            </div>

            <Quantity
                left="160px"
                quantity={itemQuantity}
                increment={increment}
                decrement={decrement}
            />

            <p
                style={{
                    position: "absolute",
                    left: '150px',
                    top: '55px',
                    zIndex: 995,
                    fontSize: 24,
                    color: "white",
                    textShadow:
                        "1px 1px 10px black, 1px 1px 15px black, 1px 1px 20px black, 1px 1px 25px black, 1px 1px 30px black",
                }}
                className="m-0 p-0 ps-2 col text-end fw-bold align-self-end"
            >
                {itemSum} zł
            </p>
        </div>
    );
}

export default MenuItem2;
