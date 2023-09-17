function PlayersSelection({
    isOpen,
    onOnePlayerClick,
    onTwoPlayersClick
}) {
    return (
        <div className={`settings ${isOpen ? 'settings_open' : ''}`}>
            <div className='settings__option' onClick={onTwoPlayersClick}>
                <div className='settings__icon settings__icon_two-players' />
                <p className='settings__caption' >Two players</p>
            </div>
            <div className='settings__option' onClick={onOnePlayerClick}>
                <div className='settings__icon settings__icon_ai' />
                <p className='settings__caption' >Play with computer</p>
            </div>
        </div>
    );
};

export default PlayersSelection;