import React, {useState, useRef, useEffect} from 'react';
import './Game.css';
import Cell from './Cell';

function Game() {
    const CELL_SIZE = 20;
    const WIDTH_SIZE = 800;
    const HEIGHT = window.screen.availHeight;
    const WIDTH = window.screen.availWidth;
    const rows = HEIGHT / CELL_SIZE;
    const cols = WIDTH / CELL_SIZE;
    let boardRef = useRef([]);
    let [isRunning, setIsRunning] = useState(true);
    let [cells, setCells] = useState([]);
    let [board, setBoard] = useState([]);
    let [timeoutHandler, setTimeoutHandler] = useState(null);
    let [interval, setInterval] = useState(1000);

    useEffect(() => {
        handleInitial();
    }, []);

    useEffect(() => {
        if(board.length != 0){
            setCells(makeCells(board))
        }

    }, [board]);

    useEffect(() => {
        if(cells.length != 0){
            if (isRunning){
                setTimeoutHandler(window.setTimeout(() => {
                    runIteration();
                }, interval))
            }
        }

    }, [cells]);

    function setRandomColor(){
        let maxVal = `0xFFFFFF`;
        let randomNum = Math.random() * maxVal;
        let randomNumber = Math.floor(randomNum);
        randomNumber = randomNumber.toString(16);
        let randColor = randomNumber.padStart(6, 0);
        randColor = "#" + randColor
        return randColor.toUpperCase();
    }

    function calculateNeighbors(board, x, y) {
        let neighbours = 0
        const dirs =  [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];
        for (let i = 0; i<dirs.length; i++){
            const dir = dirs[i];
            let y1 = y + dir[0];
            let x1 = x + dir[1];
            if (x1 >= 0 && x1 < cols && y1 >= 0 && y1 < rows && board[y1][x1]) {
                neighbours++;
            }
        }
        return neighbours;
    }

    function makeEmptyBoard() {
        let temp_board = [];
        for (let y=0; y<rows; y++){
            temp_board[y] = [];
            for (let x=0; x < cols; x++){
                temp_board[y][x] = false;
            }
        }
        return temp_board;
    }

    function makeCells(board){
        let temp_cells = [];
        for (let y=0; y < rows; y++){
            for (let x=0; x< cols; x++){
                if(board[y][x]){
                    let color = setRandomColor()
                    temp_cells.push({x,y, color})
                }
            }
        }
        return temp_cells;
    }

    function getElementOffset(){
        const rect = boardRef.current.getBoundingClientRect();
        const doc = document.documentElement;
        return {
            x: (rect.left + window.pageXOffset) - doc.clientLeft,
            y: (rect.top + window.pageYOffset) - doc.clientTop,
        };
    }

    function handleClick(event){
        const elemOffset = getElementOffset();
        const offsetX = event.clientX - elemOffset.x;
        const offsetY = event.clientY - elemOffset.y;
        const x = Math.floor(offsetX / CELL_SIZE);
        const y = Math.floor(offsetY / CELL_SIZE);
        if (x >= 0 && x <= cols && y >= 0 && y <= rows) {
            board[y][x] = !board[y][x];
        }
        console.log("y: ", y, "x: ", x)

        setCells(makeCells(board));
    }

    function handleIntervalChange(event){
        setInterval(event.target.value)
    }

    function handleClear(){
        setBoard(makeEmptyBoard);
    }

    function handleInitial(){
        let newBoard = makeEmptyBoard();
        console.log(rows)
        console.log(cols)
        // for(let y=0; y<rows; y++){
        //     for(let x=0; x<cols; x++){
        //         newBoard[y][x] = (Math.random() >= 0.5) 
        //     }
        // }
        let list = [
            // the pulsar pattern
            [9, 12],
            [10, 12],
            [11, 12],
            [12, 11],
            [12, 10],
            [12, 9],
            [11, 7],
            [10, 7],
            [9, 7],
            [7, 11],
            [7, 10],
            [7, 9],

            [9, 14],
            [10, 14],
            [11, 14],
            [12, 15],
            [12, 16],
            [12, 17],
            [11, 19],
            [10, 19],
            [9, 19],
            [7, 15],
            [7, 16],
            [7, 17],

            [14, 9],
            [14, 10],
            [14, 11],
            [15, 12],
            [16, 12],
            [17, 12],
            [19, 11],
            [19, 10],
            [19, 9],
            [15, 7],
            [16, 7],
            [17, 7],

            [15, 14],
            [16, 14],
            [17, 14],
            [14, 15],
            [14, 16],
            [14, 17],
            [15, 19],
            [16, 19],
            [17, 19],
            [19, 15],
            [19, 16],
            [19, 17],

            // The Penta-decathlon pattern 
            [9, 5],
            [9, 6],
            [8, 7],
            [10, 7],
            [9, 8],
            [9, 9],
            [9, 10],
            [9, 11],
            [8, 12],
            [10, 12],
            [9, 13],
            [9, 14],

            // blinker patter
            // [1, 1],
            // [2, 1],
            // [3, 1]

        ]
        list.forEach((element) => {
            newBoard[element[0]][element[1]] = true;
        })

    
        setBoard(newBoard);
        // setCells(makeCells(board));

    }

    function runIteration() {
        let newBoard = makeEmptyBoard();
        for (let y = 0; y < rows; y++){
            for(let x = 0; x < cols; x++){
                let neighbours = calculateNeighbors(board, x, y);
                if (board[y][x]) {
                    if (neighbours === 2 || neighbours === 3){
                        newBoard[y][x] = true;
                    } else {
                        newBoard[y][x] = false;
                    }
                } else {
                    if(!board[y][x] && neighbours === 3) {
                        newBoard[y][x] = true;
                    }
                }
            }
        }

        setBoard(newBoard);

    }


    return ( 
        <div>        
            <div className="Board"          
            style={{ 
                width: WIDTH, 
                height: HEIGHT,
                backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px` 
            }}
            onClick={(event) => handleClick(event)}
            ref={boardRef}
            > 
            {
                cells.map(cell => (
                    // console.log(cell)
                    <Cell 
                        x={cell.x} 
                        y={cell.y} 
                        color={cell.color}
                        key={`${cell.x}, ${cell.y}`}
                    />
                ))
            }
            </div>
        </div>    
    );
}

export default Game;
