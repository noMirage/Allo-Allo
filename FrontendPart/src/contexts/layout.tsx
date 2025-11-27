import { createContext } from "react";

export const layout: {value: boolean, handleChange: () => void} = {
    value: true,
    handleChange: () => {},
}

export const ShowLayout = createContext(layout);