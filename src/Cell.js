import './Cell.css';
import React, {useEffect, useState} from 'react';
function Cell({x, y, color}) {
    const CELL_SIZE = 20;

    useEffect(() => {
        // index1 = Math.random()
        // index2 = Math.random()
        // index3 = Math.random()
        // setCellColor(`rgb(${index1}, ${index2}, ${index2})`)
        // setCellColor(`0xFFFFFF`)
        // let maxVal = `0xFFFFFF`;
        // let randomNum = Math.random() * maxVal;
        // let randomNumber = Math.floor(randomNum);
        // randomNumber = randomNumber.toString(16);
        // let randColor = randomNumber.padStart(6, 0);   
        // setCellColor(randColor.toUpperCase())
        console.log("color: ", color)
    }, [color])

    return (
        <div className="Cell" style={{
            left: `${CELL_SIZE * x + 1}px`,
            top: `${CELL_SIZE*y + 1}px`,
            width: `${CELL_SIZE -1}px`,
            height: `${CELL_SIZE -1}px`,
            background: color
        }} />
    );
}

export default Cell;