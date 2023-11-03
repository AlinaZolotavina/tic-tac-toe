import { useState } from "react";
import { useEffect } from "react";

function Cell({ value, win, winner, onClick }) {
    const [classname, setClassname] = useState('');
    useEffect(() => {
        if (value === null) {
            setClassname('');
        } else if (value === 'x') {
            setClassname('cell_shape_x');
        } else if (value === 'o') {
            setClassname('cell_shape_o');
        }
    }, [value]);

    return(
        <button className={`cell ${classname} ${win && 'cell_win'} ${(!win & winner != null) ? 'cell_lose' : '' }`}  onClick={onClick}>{value}</button>
    );
};

export default Cell;