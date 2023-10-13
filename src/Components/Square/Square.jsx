import "./square.css"
const Square = ({ value, handleClick, isWinningSquare }) => {
    const squareStyle = isWinningSquare ? { backgroundColor: "yellow" } : {};
    return (
        <>
            <div className="col" onClick={handleClick} style={squareStyle}>{value}</div>
        </>
    );
}

export default Square;