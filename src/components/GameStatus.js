function GameStatus({ status, winner }) {
    return(
        <p className={`status ${winner !== null ? 'status_winner' : ''}`}>{status}</p>
    )
};

export default GameStatus;