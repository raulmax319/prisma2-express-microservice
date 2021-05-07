export type ColorList = {
  red: '\u001b[31m';
  yellow: '\x1B[33m';
  green: '\x1B[32m';
  black: '\x1B[39m';
};

export type index = 'black' | 'green' | 'yellow' | 'red';

export type Color = (idx: index, str: string) => string;

export type LogCodes = {
  Log: 'black';
  Info: 'yellow';
  Status: 'green';
  Debug: 'yellow';
  Fail: 'red';
  Error: 'red';
};

export type Type = 'Log' | 'Info' | 'Status' | 'Debug' | 'Fail' | 'Error';

export type Log = (type: Type, txt: string) => void;
