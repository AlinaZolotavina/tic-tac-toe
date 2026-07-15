function Firework({ classname, visible, color }) {
  return (
    <div
      className={`firework ${classname} ${visible ? "firework_visible" : ""}`}
    >
      {[...Array(12)].map((_, index) => (
        <div
          key={index}
          className={`firework__explosion firework__explosion_color_${color}`}
        />
      ))}
    </div>
  );
}

export default Firework;
