function Player({ playerClassname, player, playerShape }) {
    return(
        <div className={playerClassname}>
            <div className={playerClassname}/>
            <p>{player}</p>
            <div className={`${playerShape}`}/>
        </div>
    )
};

export default Player;