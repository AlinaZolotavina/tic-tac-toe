import type { FireworkProps } from "../types/firework";

function Firework({ classname, visible, color }: FireworkProps) {
  return (
    <div
      className={`firework ${classname} ${visible ? "firework_visible" : ""}`}
    >
      {Array.from({ length: 12 }).map((_, index) => (
        <div
          key={index}
          className={`firework__explosion firework__explosion_color_${color}`}
        />
      ))}
    </div>
  );
}

export default Firework;
