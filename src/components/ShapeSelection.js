function ShapeSelection({
    isOpen,
    onShapeSelect,
    onBackToSettingsBtnClick,
}) {
    function handleShapeSelect(shape) {
        onShapeSelect(shape);
    };

    return (
        <div className={`settings ${isOpen ? 'settings_open' : ''}`}>
            <div className='settings__option' onClick={() => handleShapeSelect('x')}>
                <div className='settings__icon settings__icon_cross' />
            </div>
            <div className='settings__option' onClick={() => handleShapeSelect('o')}>
                <div className='settings__icon settings__icon_zero' />
            </div>
        </div>
    );
};

export default ShapeSelection;