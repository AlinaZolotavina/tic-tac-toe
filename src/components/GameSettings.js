import PlayersSelection from "./PlayersSelection";

function GameSettings({
    onOnePlayerClick,
    onTwoPlayersClick,
}) {
    return(
        <div className='home' >
            <div className='logo' />
            <div className='zero zero_type_first' />
            <div className='zero zero_type_second' />
            <div className='zero zero_type_third' />
            <div className='zero zero_type_fourth' />
            <div className='cross cross_type_first' />
            <div className='cross cross_type_second' />
            <div className='cross cross_type_third' />
            <div className='cross cross_type_fourth' />
            <PlayersSelection 
                onOnePlayerClick={onOnePlayerClick}
                onTwoPlayersClick={onTwoPlayersClick}            
            />
        </div>
    )
};

export default GameSettings;