import './Cell.css';
import React, {useEffect, useState} from 'react';
function Cell({x, y, color}) {
    const CELL_SIZE = 20;

    useEffect(() => {
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