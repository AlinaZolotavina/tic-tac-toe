import { Route, Switch } from 'react-router-dom';
import GameSettings from './GameSettings';
import Board from './Board';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useState } from 'react';
import ShapeSelection from './ShapeSelection';
import Firework from './Firework';

function App() {
    const history = useHistory();
    const [AI, setAI] = useState(false);
    const [aiShape, setAiShape] = useState('o');
    const [humanShape, setHumanShape] = useState('x');
    const [winner, setWinner] = useState(null);
    function handleTwoPlayersClick() {
        history.push('/tic-tac-toe/new-game');
        // // history.push('/tic-tac-toe/two-players-game');
        setAI(false);
    }

    function handleOnePlayerClick() {
        history.push('/tic-tac-toe/shape-selection');
        // // history.push('/tic-tac-toe/one-player-game');
        setAI(true);
    }

    function handleShapeSelect(shape) {
        history.push('/tic-tac-toe/new-game');
        setHumanShape(shape);
        if( shape === 'x') {
            setAiShape('o');
        } else {
            setAiShape('x');
        }
    };

    function handleBackToSettingsBtnClick() {
        history.push('/tic-tac-toe');
        setWinner(null);
    };

    function handleHomeBtnClick() {
        history.push('/');
        setWinner(null);
    }

    return(
        <Switch>
            <Route exact path='/tic-tac-toe' >
                <GameSettings
                    onTwoPlayersClick={handleTwoPlayersClick}
                    onOnePlayerClick={handleOnePlayerClick}
                    onShapeSelect={handleShapeSelect}
                    onBackToSettingsBtnClick={handleBackToSettingsBtnClick}
                />
            </Route>
            <Route exact path='/tic-tac-toe/shape-selection' >
                <ShapeSelection
                    onShapeSelect={handleShapeSelect}
                    onHomeBtnClick={handleHomeBtnClick}
                />
            </Route>
            <Route path='/tic-tac-toe/new-game' >
                <div className='game'>
                    <Board
                        AiMode={AI}
                        ai={aiShape}
                        human={humanShape}
                        onBackToSettingsBtnClick={handleBackToSettingsBtnClick}
                        onHomeBtnClick={handleHomeBtnClick}
                        winnerSetter={setWinner}
                    />
                    <Firework classname='firework_number_first' visible={winner} color='light-blue' />
                    <Firework classname='firework_number_second' visible={winner} color='yellow'/>
                    <Firework classname='firework_number_third' visible={winner} color='pink' />
                    <Firework classname='firework_number_fourth' visible={winner} color='green' />
                    <Firework classname='firework_number_fifth' visible={winner} color='light-blue' />
                    <Firework classname='firework_number_sixth' visible={winner} color='yellow'/>
                    <Firework classname='firework_number_seventh' visible={winner} color='pink' />
                </div>
            </Route>
        </Switch>
    )
};

export default App;