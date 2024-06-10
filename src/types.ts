export type Box = {
  type: string;
  size: number;
  offset: number;
  children?: Box[]
};
