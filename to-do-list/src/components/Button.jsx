import React from "react";
import { Children } from "react";

const Button = ({onClick, children, type}) => {
    return (
        <button onClick={onClick} type={type}>
            {children}
        </button>
    );
};

export default Button;