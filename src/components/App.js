import Board from './Board';
import Player from './Player';
import Cell from './Cell';

function App() {
    return(
        <>
            <div>
                <Player />
                <Player />
            </div>
            <Board>
                <Cell />
                <Cell />
                <Cell />
                <Cell />
                <Cell />
                <Cell />
                <Cell />
                <Cell />
                <Cell />
            </Board>
        </>
    )
};

export default App;