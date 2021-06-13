export interface IColumns {
  title?: string;
  key: string;
  replaceValue?: any;
}

export interface IIconButtons {
  icon: string;
  action: (...e: any) => void;
  args?: any[];
}
