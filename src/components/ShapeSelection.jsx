import { useState } from 'react';
import HomeBtn from './HomeBtn';

function ShapeSelection({
    onShapeSelect,
    onHomeBtnClick
}) {
    const [crossActiveClassname, setCrossActiveClassname] = useState('');
    const [zeroActiveClassname, setZeroActiveClassname] = useState('');

    function handleShapeSelect(shape) {
        onShapeSelect(shape);
    };

    function handleMouseOver(shape) {
        if (shape === 'cross') {
            setCrossActiveClassname('shape-selection__option_state_hover-on');
            setZeroActiveClassname('shape-selection__option_state_hover-off');
        } else if (shape === 'zero') {
            setZeroActiveClassname('shape-selection__option_state_hover-on');
            setCrossActiveClassname('shape-selection__option_state_hover-off');
        }
    };

    function handleMouseOut() {
        setCrossActiveClassname('');
        setZeroActiveClassname('');
    }

    return (
        <div className='shape-selection' >
            <HomeBtn onClick={onHomeBtnClick} />
            <p className='shape-selection__legend'>Choose your side ;)</p>
            <div className='shape-selection__options' >
                <div
                    className={`shape-selection__option cross ${crossActiveClassname}`}
                    onClick={() => handleShapeSelect('x')}
                    onMouseOver={() => handleMouseOver('cross')}
                    onMouseOut={handleMouseOut}
                /> 
                <div
                    className={`shape-selection__option zero ${zeroActiveClassname}`}
                    onClick={() => handleShapeSelect('o')}
                    onMouseOver={() => handleMouseOver('zero')}
                    onMouseOut={handleMouseOut}
                />
            </div>
        </div>
    );
};

export default ShapeSelection;