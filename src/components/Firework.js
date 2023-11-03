function Firework({ classname, visible, color }) {
    return(
        <div className={`firework ${classname} ${visible && 'firework_visible'}`}>
            <div className={`firework__explosion firework__explosion_color_${color}`} ></div>
            <div className={`firework__explosion firework__explosion_color_${color}`} ></div>
            <div className={`firework__explosion firework__explosion_color_${color}`} ></div>
            <div className={`firework__explosion firework__explosion_color_${color}`} ></div>
            <div className={`firework__explosion firework__explosion_color_${color}`} ></div>
            <div className={`firework__explosion firework__explosion_color_${color}`} ></div>
            <div className={`firework__explosion firework__explosion_color_${color}`} ></div>
            <div className={`firework__explosion firework__explosion_color_${color}`} ></div>
            <div className={`firework__explosion firework__explosion_color_${color}`} ></div>
            <div className={`firework__explosion firework__explosion_color_${color}`} ></div>
            <div className={`firework__explosion firework__explosion_color_${color}`} ></div>
            <div className={`firework__explosion firework__explosion_color_${color}`} ></div>
        </div>
    );
};

export default Firework;