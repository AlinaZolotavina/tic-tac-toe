export type FireworkClassName =
  | "firework_number_first"
  | "firework_number_second"
  | "firework_number_third"
  | "firework_number_fourth"
  | "firework_number_fifth"
  | "firework_number_sixth"
  | "firework_number_seventh";

export type FireworkColor = "light-blue" | "yellow" | "pink" | "green";

export interface FireworkConfig {
  classname: FireworkClassName;
  color: FireworkColor;
}

export interface FireworkProps {
  classname: string;
  visible: boolean;
  color: FireworkColor;
}
