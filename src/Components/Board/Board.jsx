import { useState } from "react";
import "./board.css";
import Square from "../Square/Square";
import { getUniqueElements, getPositionHistoryClicked, checkWinner, findArrWinner, checkDraw } from "./SupportFunctions";
const Board = () => {
    const [squareValueArr, setSquareValueArr] = useState(Array(9).fill(null));
    const [nextValue, setNextValue] = useState("X");
    const [isWinner, setIsWinner] = useState(false);
    const [whoWinner, setWhoWinner] = useState(null);
    const [isDraw, setIsDraw] = useState(false);
    const [arrWinner, setArrWinner] = useState(null);
    const [history, setHistory] = useState([squareValueArr]);
    const [squarePositionList, setSquarePositionList] = useState([]);
    const [isClickedHistory, setIsClickedHistory] = useState(null);
    const [typeSort, setTypeSort] = useState("Sort descending");
    const resultPosition = getUniqueElements(squarePositionList);
    const resultHistory = getUniqueElements(history);
    function handleClickSort() {
        if (typeSort === "Sort descending") {
            setTypeSort("Sort ascending");
        }
        else if (typeSort === "Sort ascending") {
            setTypeSort("Sort descending");
        }
    }
    let moves = null;
    if (resultHistory.length === 1) {
        moves = resultHistory.map((squares, move) => {
            return (
                <li key={move}>
                    You are at move #0
                </li>
            );
        });
    }
    else if (resultHistory.length > 1) {
        if (!isClickedHistory) {
            if (typeSort === "Sort descending") {
                let moves1 = resultHistory.slice(0, resultHistory.length - 1);
                moves1 = resultHistory.slice(0, resultHistory.length - 1).map((squares, move) => {
                    let description;
                    if (move > 0) {
                        // Display the location for each move in the format (row, col) in the move history list
                        description = `Go to move #(${resultPosition[move - 1][0]}, ${resultPosition[move - 1][1]})`;
                    } else {
                        description = 'Go to game start';
                    }
                    return (
                        <li key={move}>
                            <button onClick={() => {
                                setSquareValueArr((prev) => {
                                    if (checkWinner(squares) === "X") {
                                        const getArrWinner = findArrWinner(squares);
                                        setWhoWinner("X");
                                        setArrWinner(getArrWinner);
                                        setIsWinner(true);
                                    }
                                    else if (checkWinner(squares) === "O") {
                                        const getArrWinner = findArrWinner(squares);
                                        setWhoWinner("O");
                                        setArrWinner(getArrWinner);
                                        setIsWinner(true);
                                    }
                                    else setIsWinner(false);
                                    if (checkDraw(squares) === "Draw") {
                                        setIsDraw(true);
                                    }
                                    else setIsDraw(false);
                                    const counts = squares.reduce((acc, currentValue) => {
                                        if (currentValue === "X") {
                                            acc.X++;
                                        } else if (currentValue === "O") {
                                            acc.O++;
                                        }
                                        return acc;
                                    }, { X: 0, O: 0 });
                                    if (counts.X === counts.O || counts.X < counts.O) setNextValue("X");
                                    else setNextValue("O");
                                    return squares;
                                });
                                setIsClickedHistory(squares);
                            }}>{description}</button>
                        </li>
                    );
                });
                let moves2 = resultHistory.slice(resultHistory.length - 1, resultHistory.length);
                moves2 = moves2.map((squares, move) => {
                    let description;
                    // For the current move only, show “You are at move #…” instead of a button
                    description = `You are at move #${resultPosition.length}`;
                    return (
                        <li key={resultHistory.length - 1}>
                            {description}
                        </li>
                    );
                });
                moves = moves1.concat(moves2);
            }
            else if (typeSort === "Sort ascending") {
                let moves1 = resultHistory.slice(0, resultHistory.length - 1);
                moves1 = resultHistory.slice(0, resultHistory.length - 1).map((squares, move) => {
                    let description;
                    if (move > 0) {
                        // Display the location for each move in the format (row, col) in the move history list
                        description = `Go to move #(${resultPosition[move - 1][0]}, ${resultPosition[move - 1][1]})`;
                    } else {
                        description = 'Go to game start';
                    }
                    return (
                        <li key={move}>
                            <button onClick={() => {
                                setSquareValueArr((prev) => {
                                    if (checkWinner(squares) === "X") {
                                        const getArrWinner = findArrWinner(squares);
                                        setWhoWinner("X");
                                        setArrWinner(getArrWinner);
                                        setIsWinner(true);
                                    }
                                    else if (checkWinner(squares) === "O") {
                                        const getArrWinner = findArrWinner(squares);
                                        setWhoWinner("O");
                                        setArrWinner(getArrWinner);
                                        setIsWinner(true);
                                    }
                                    else setIsWinner(false);
                                    if (checkDraw(squares) === "Draw") {
                                        setIsDraw(true);
                                    }
                                    else setIsDraw(false);
                                    const counts = squares.reduce((acc, currentValue) => {
                                        if (currentValue === "X") {
                                            acc.X++;
                                        } else if (currentValue === "O") {
                                            acc.O++;
                                        }
                                        return acc;
                                    }, { X: 0, O: 0 });
                                    if (counts.X === counts.O || counts.X < counts.O) setNextValue("X");
                                    else setNextValue("O");
                                    return squares;
                                });
                                setIsClickedHistory(squares);
                            }}>{description}</button>
                        </li>
                    );
                });
                let moves2 = resultHistory.slice(resultHistory.length - 1, resultHistory.length);
                moves2 = moves2.map((squares, move) => {
                    let description;
                    // For the current move only, show “You are at move #…” instead of a button
                    description = `You are at move #${resultPosition.length}`;
                    return (
                        <li key={resultHistory.length - 1}>
                            {description}
                        </li>
                    );
                });
                const movess = moves1.reverse();
                moves = moves2.concat(movess);
            }
        }
        else {
            if (typeSort === "Sort descending") {
                let x = getPositionHistoryClicked(resultHistory, isClickedHistory);
                let moves1 = resultHistory.slice(0, x).map((squares, move) => {
                    let description;
                    if (move > 0) {
                        // Display the location for each move in the format (row, col) in the move history list
                        description = `Go to move #(${resultPosition[move - 1][0]}, ${resultPosition[move - 1][1]})`;
                    } else {
                        description = 'Go to game start';
                    }
                    return (
                        <li key={move}>
                            <button onClick={() => {
                                setSquareValueArr((prev) => {
                                    if (checkWinner(squares) === "X") {
                                        const getArrWinner = findArrWinner(squares);
                                        setWhoWinner("X");
                                        setArrWinner(getArrWinner);
                                        setIsWinner(true);
                                    }
                                    else if (checkWinner(squares) === "O") {
                                        const getArrWinner = findArrWinner(squares);
                                        setWhoWinner("O");
                                        setArrWinner(getArrWinner);
                                        setIsWinner(true);
                                    }
                                    else setIsWinner(false);
                                    if (checkDraw(squares) === "Draw") {
                                        setIsDraw(true);
                                    }
                                    else setIsDraw(false);
                                    const counts = squares.reduce((acc, currentValue) => {
                                        if (currentValue === "X") {
                                            acc.X++;
                                        } else if (currentValue === "O") {
                                            acc.O++;
                                        }
                                        return acc;
                                    }, { X: 0, O: 0 });
                                    if (counts.X === counts.O || counts.X < counts.O) setNextValue("X");
                                    else setNextValue("O");
                                    return squares;
                                });
                                setIsClickedHistory(squares);
                            }}>{description}</button>
                        </li>
                    );
                });
                let moves2 = resultHistory.slice(x, x + 1);
                moves2 = moves2.map((squares, move) => {
                    let description;
                    // For the current move only, show “You are at move #…” instead of a button
                    description = `You are at move #${x}`;
                    return (
                        <li key={x}>
                            {description}
                        </li>
                    );
                });
                let moves3 = resultHistory.slice(x + 1).map((squares, move) => {
                    let description;
                    let newMove = move + x + 1;
                    if (newMove > 0) {
                        // Display the location for each move in the format (row, col) in the move history list
                        description = `Go to move #(${resultPosition[newMove - 1][0]}, ${resultPosition[newMove - 1][1]})`;
                    } else {
                        description = 'Go to game start';
                    }
                    return (
                        <li key={newMove}>
                            <button onClick={() => {
                                setSquareValueArr((prev) => {
                                    if (checkWinner(squares) === "X") {
                                        const getArrWinner = findArrWinner(squares);
                                        setWhoWinner("X");
                                        setArrWinner(getArrWinner);
                                        setIsWinner(true);
                                    }
                                    else if (checkWinner(squares) === "O") {
                                        const getArrWinner = findArrWinner(squares);
                                        setWhoWinner("O");
                                        setArrWinner(getArrWinner);
                                        setIsWinner(true);
                                    }
                                    else setIsWinner(false);
                                    const counts = squares.reduce((acc, currentValue) => {
                                        if (currentValue === "X") {
                                            acc.X++;
                                        } else if (currentValue === "O") {
                                            acc.O++;
                                        }
                                        return acc;
                                    }, { X: 0, O: 0 });
                                    if (counts.X === counts.O || counts.X < counts.O) setNextValue("X");
                                    else setNextValue("O");
                                    return squares;
                                });
                                setIsClickedHistory(squares);
                            }}>{description}</button>
                        </li>
                    );
                });
                moves = (moves1.concat(moves2)).concat(moves3);
            }
            else if (typeSort === "Sort ascending") {
                let x = getPositionHistoryClicked(resultHistory, isClickedHistory);
                let moves1 = resultHistory.slice(0, x).map((squares, move) => {
                    let description;
                    if (move > 0) {
                        // Display the location for each move in the format (row, col) in the move history list
                        description = `Go to move #(${resultPosition[move - 1][0]}, ${resultPosition[move - 1][1]})`;
                    } else {
                        description = 'Go to game start';
                    }
                    return (
                        <li key={move}>
                            <button onClick={() => {
                                setSquareValueArr((prev) => {
                                    if (checkWinner(squares) === "X") {
                                        const getArrWinner = findArrWinner(squares);
                                        setWhoWinner("X");
                                        setArrWinner(getArrWinner);
                                        setIsWinner(true);
                                    }
                                    else if (checkWinner(squares) === "O") {
                                        const getArrWinner = findArrWinner(squares);
                                        setWhoWinner("O");
                                        setArrWinner(getArrWinner);
                                        setIsWinner(true);
                                    }
                                    else setIsWinner(false);
                                    if (checkDraw(squares) === "Draw") {
                                        setIsDraw(true);
                                    }
                                    else setIsDraw(false);
                                    const counts = squares.reduce((acc, currentValue) => {
                                        if (currentValue === "X") {
                                            acc.X++;
                                        } else if (currentValue === "O") {
                                            acc.O++;
                                        }
                                        return acc;
                                    }, { X: 0, O: 0 });
                                    if (counts.X === counts.O || counts.X < counts.O) setNextValue("X");
                                    else setNextValue("O");
                                    return squares;
                                });
                                setIsClickedHistory(squares);
                            }}>{description}</button>
                        </li>
                    );
                });
                let moves2 = resultHistory.slice(x, x + 1);
                moves2 = moves2.map((squares, move) => {
                    let description;
                    // For the current move only, show “You are at move #…” instead of a button
                    description = `You are at move #${x}`;
                    return (
                        <li key={x}>
                            {description}
                        </li>
                    );
                });
                let moves3 = resultHistory.slice(x + 1).map((squares, move) => {
                    let description;
                    let newMove = move + x + 1;
                    if (newMove > 0) {
                        // Display the location for each move in the format (row, col) in the move history list
                        description = `Go to move #(${resultPosition[newMove - 1][0]}, ${resultPosition[newMove - 1][1]})`;
                    } else {
                        description = 'Go to game start';
                    }
                    return (
                        <li key={newMove}>
                            <button onClick={() => {
                                setSquareValueArr((prev) => {
                                    if (checkWinner(squares) === "X") {
                                        const getArrWinner = findArrWinner(squares);
                                        setWhoWinner("X");
                                        setArrWinner(getArrWinner);
                                        setIsWinner(true);
                                    }
                                    else if (checkWinner(squares) === "O") {
                                        const getArrWinner = findArrWinner(squares);
                                        setWhoWinner("O");
                                        setArrWinner(getArrWinner);
                                        setIsWinner(true);
                                    }
                                    else setIsWinner(false);
                                    const counts = squares.reduce((acc, currentValue) => {
                                        if (currentValue === "X") {
                                            acc.X++;
                                        } else if (currentValue === "O") {
                                            acc.O++;
                                        }
                                        return acc;
                                    }, { X: 0, O: 0 });
                                    if (counts.X === counts.O || counts.X < counts.O) setNextValue("X");
                                    else setNextValue("O");
                                    return squares;
                                });
                                setIsClickedHistory(squares);
                            }}>{description}</button>
                        </li>
                    );
                });
                const moves4 = moves3.reverse();
                const moves5 = moves1.reverse();
                moves = (moves4.concat(moves2)).concat(moves5);
            }
        }
    }
    function handleClickSquare(i) {
        if (isWinner) {
            return;
        }
        if (isDraw) {
            return;
        }
        else {
            if (squareValueArr[i]) {
                return;
            }
            setIsClickedHistory(null);
            const counts = squareValueArr.reduce((acc, currentValue) => {
                if (currentValue === "X" || currentValue === "O") {
                    acc++;
                }
                return acc;
            }, 0);
            setSquareValueArr((prev) => {
                const newSquareValueArr = [...prev];
                newSquareValueArr[i] = nextValue;

                setHistory((prev) => {
                    const newHistory = prev.slice(0, counts + 1);
                    const resultNewHistory = [...newHistory, newSquareValueArr];
                    setSquarePositionList((prev) => {
                        let listPrev = [];
                        for (let y = 0; y < resultNewHistory.length; y++) {
                            for (let z = 0; z < 9; z++) {
                                if (resultNewHistory[y][z] === "O" || resultNewHistory[y][z] === "X") {
                                    if (listPrev.length === 0) {
                                        listPrev.push([Math.floor(z / 3) + 1, z % 3 + 1]);
                                    }
                                    else {
                                        let checkContain = false;
                                        for (let b = 0; b < listPrev.length; b++) {
                                            let [r, s] = listPrev[b];
                                            if (Math.floor(z / 3) + 1 === r && z % 3 + 1 === s) {
                                                checkContain = true;
                                                break;
                                            }
                                        }
                                        if (checkContain === false) {
                                            listPrev.push([Math.floor(z / 3) + 1, z % 3 + 1]);
                                        }
                                    }
                                }
                            }
                        }
                        return listPrev;
                    })
                    return resultNewHistory;
                });
                if (checkWinner(newSquareValueArr) === "X") {
                    const getArrWinner = findArrWinner(newSquareValueArr);
                    setWhoWinner("X");
                    setArrWinner(getArrWinner);
                    setIsWinner(true);
                }
                else if (checkWinner(newSquareValueArr) === "O") {
                    const getArrWinner = findArrWinner(newSquareValueArr);
                    setWhoWinner("O");
                    setArrWinner(getArrWinner);
                    setIsWinner(true);
                }
                else {
                    if (checkDraw(newSquareValueArr) === "Draw") {
                        setIsDraw(true);
                    }
                }
                return newSquareValueArr;
            })
            setNextValue((prev) => {
                if (prev === "X") {
                    return "O";
                }
                else if (prev === "O") {
                    return "X";
                }
            })
        }
    }
    return (
        <>
            <div className="board-container">
                {isWinner ? (
                    <div className="winner-player">Winner : {whoWinner}</div>
                ) : (
                    isDraw ? (
                        <div className="draw-result">Draw</div>
                    ) : (
                        <div className="next-player">Next player : {nextValue}</div>
                    )
                )}
                <div className="main-board-container">
                    <div className="main-board">
                        {/* Rewrite the Board to use two loops to make the squares instead of hardcoding them */}
                        {
                            Array(3).fill().map((rowElement, rowIndex) => {
                                return (
                                    <div key={rowIndex} className="row">
                                        {
                                            Array(3).fill().map((colElement, colIndex) => {
                                                // When someone wins, highlight the three squares that caused the win
                                                const isWinnerColorSquare = isWinner && arrWinner.includes(rowIndex * 3 + colIndex);
                                                return (
                                                    <Square isWinningSquare={isWinnerColorSquare} value={squareValueArr[rowIndex * 3 + colIndex]} key={rowIndex * 3 + colIndex}
                                                        handleClick={() => { handleClickSquare(rowIndex * 3 + colIndex) }} />
                                                )
                                            })
                                        }
                                    </div>
                                )
                            })
                        }
                        <button onClick={() => { handleClickSort() }} className="sort-btn">
                            {/* Add a toggle button that lets you sort the moves in either ascending or descending order */}
                            {typeSort}
                        </button>
                    </div>
                    <ol className="current-step">
                        {moves}
                    </ol>
                </div>
            </div >
        </>
    );
}

export default Board;