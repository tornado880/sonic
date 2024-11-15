import React, { useState, useEffect } from "react";

import Img_1 from "../image/1.png";
import Img_2 from "../image/2.png";
import Img_3 from "../image/3.png";

function BuyList({ image, name, price }) {
    const [quantity, setQuantity] = useState(1);
    const [sum, setSum] = useState(price);

    // Update `sum` whenever `quantity` or `price` changes
    useEffect(() => {
        setSum(price * quantity);
    }, [price, quantity]);

    function decrement() {
        if (quantity > 0) {
            setQuantity(quantity - 1);
        }
    }

    function increment() {
        setQuantity(quantity + 1);
    }


const BuyList = ({data}) => {
    return (
    );
};



export const BuyList = [
  {
    name: "Sonic",
    image: Img_1,
    price: 19,
  },
  {
    name: "Mario",
    image: Img_2,
    price: 19,
  },
  {
    name: "Hulk",
    image: Img_3,
    price: 19,
  },

];
