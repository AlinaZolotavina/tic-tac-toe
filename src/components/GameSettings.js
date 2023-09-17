import PlayersSelection from "./PlayersSelection";
import ShapeSelection from "./ShapeSelection";

function GameSettings({
    isPlayersSelectionOpen, 
    isShapeSelectionOpen,
    onOnePlayerClick,
    onTwoPlayersClick,
    onShapeSelect,
    onBackToSettingsBtnClick,
}) {
    return(
        <div className='settings-container'>
        <p className='legend'>{isPlayersSelectionOpen ? 'Select number of players' : isShapeSelectionOpen ? 'Choose your shape' : ''}</p>
        {isPlayersSelectionOpen && <PlayersSelection 
            isOpen={isPlayersSelectionOpen}
            onOnePlayerClick={onOnePlayerClick}
            onTwoPlayersClick={onTwoPlayersClick}            
        />}
        {isShapeSelectionOpen && <ShapeSelection
            isOpen={isShapeSelectionOpen}
            onShapeSelect={onShapeSelect}
            onBackToSettingsBtnClick={onBackToSettingsBtnClick}
        />}
        {isShapeSelectionOpen && <button className='settings__btn' onClick={onBackToSettingsBtnClick} >Back to game settings</button>}
    </div>
    )
};

export default GameSettings;