import Player from "./Player";
import GameStatus from "./GameStatus";

function PlayersPanel({ AI, gameStatus, winner }) {
    return(
        <div className='players'>
            <Player playerClassname='player player__first' />
            <GameStatus status={gameStatus} winner={winner} />
            <Player playerClassname={`player ${AI ? 'player__ai' : 'player__second'}`} />
        </div>
    )
};

export default PlayersPanel;