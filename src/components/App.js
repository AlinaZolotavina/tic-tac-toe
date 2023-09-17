import { Route, Switch } from 'react-router-dom';
import GameSettings from './GameSettings';
import Board from './Board';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useState } from 'react';

function App() {
    const history = useHistory();
    const [AI, setAI] = useState(false);
    const [aiShape, setAiShape] = useState('o');
    const [humanShape, setHumanShape] = useState('x');
    const [isPlayersSelectionOpen, setIsPlayersSelectionOpen] = useState(true);
    const [isShapeSelectionOpen, setIsShapeSelectionOpen] = useState(false);
    function handleTwoPlayersClick() {
        // history.push('/tic-tac-toe/new-game');
        // // history.push('/tic-tac-toe/two-players-game');
        setAI(false);
        setIsPlayersSelectionOpen(false);
        setIsShapeSelectionOpen(true);
    }

    function handleOnePlayerClick() {
        // history.push('/tic-tac-toe/new-game');
        // // history.push('/tic-tac-toe/one-player-game');
        setAI(true);
        setIsPlayersSelectionOpen(false);
        setIsShapeSelectionOpen(true);
    }

    function handleShapeSelect(shape) {
        history.push('/tic-tac-toe/new-game');
        setHumanShape(shape);
        if( shape === 'x') {
            console.log('human shape is x');
            setAiShape('o');
        } else {
            console.log('human shape is o');
            setAiShape('x');
        }
    };

    function handleBackToSettingsBtnClick() {
        history.push('/tic-tac-toe');
        setIsPlayersSelectionOpen(true);
        setIsShapeSelectionOpen(false);
    };

    return(
        <Switch>
            <Route exact path='/tic-tac-toe' >
                <GameSettings
                    isPlayersSelectionOpen={isPlayersSelectionOpen}
                    isShapeSelectionOpen={isShapeSelectionOpen}
                    onTwoPlayersClick={handleTwoPlayersClick}
                    onOnePlayerClick={handleOnePlayerClick}
                    onShapeSelect={handleShapeSelect}
                    onBackToSettingsBtnClick={handleBackToSettingsBtnClick}
                />
            </Route>
            <Route path='/tic-tac-toe/new-game' >
                <div className='game'>
                    <Board
                        AiMode={AI}
                        ai={aiShape}
                        human={humanShape}
                        onBackToSettingsBtnClick={handleBackToSettingsBtnClick}
                    />
                </div>
            </Route>
            {/* <Route path='/tic-tac-toe/one-player-game' >
                <div className='game'>
                    <Board AI={true} />
                </div>
            </Route>
            <Route path='/tic-tac-toe/two-players-game' >
                <div className='game'>
                    <Board AI={false} />
                </div>
            </Route> */}
        </Switch>
    )
};

export default App;