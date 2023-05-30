export interface Color {
  id: string;
  code: string;
  name: string;
  quantity: number;
}

export type ColorArr = Omit<Color, "id" | "code"> & { checked: false };
