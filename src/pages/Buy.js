import React from "react";

import Banner from "../components/Banner";

import Menu2 from "../components/Buy/Menu2";
import Form from "../components/Buy/Form";
import Zaplac from "../components/Buy/Zaplac";

function Buy() {
    return (
        <div>
            <Banner title="Carta" />
            <Menu2 />
            <Form  />
            <Zaplac />

        </div>
    );
}

export default Buy;
