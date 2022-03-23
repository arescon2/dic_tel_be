import { IRoot } from 'src/interfaces/root.i';

export interface IFiles extends IRoot {
  name: string;
  originalname: string;
  type: string;
  path: string;
  size: number;
}

export interface IFileFront {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}
