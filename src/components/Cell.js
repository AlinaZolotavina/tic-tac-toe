// import { useState } from "react";

function Cell({ value, win, winner, onClick }) {
    // const [classname, setClassname] = useState('');
    // // function handleClick() {
    // //     onClick();
    // //     setClassname(`cell_shape_${value}`);
    // // }

    return(
        <button className={`cell  ${win && 'cell_win'} ${(!win & winner != null) ? 'cell_lose' : '' }`}  onClick={onClick}>{value}</button>
    );
};

export default Cell;