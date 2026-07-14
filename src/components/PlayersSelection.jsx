function PlayersSelection({
    onOnePlayerClick,
    onTwoPlayersClick
}) {
    return (
        <div className='players-selection' >
            <div className='players-selection__option-container'>
                <button className='players-selection__option' onClick={onOnePlayerClick}>SINGLE PLAYER</button>
            </div>
            <div className='players-selection__option-container'>
                <button className='players-selection__option' onClick={onTwoPlayersClick}>TWO PLAYERS</button>
            </div>
        </div>
    );
};

export default PlayersSelection;