function Player({
    playerClassname,
    playerIconClassname,
    player,
    playerShape,
    active }) {
    return(
        <div className={`${playerClassname} ${active && 'player_active'}`}>
            <div className={playerIconClassname}/>
            <p className='player__name' >{player}</p>
            <div className={`player__shape player__shape_type_${playerShape}`}/>
        </div>
    )
};

export default Player;