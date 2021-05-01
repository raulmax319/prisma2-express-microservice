declare type ColorList = {
  red: '\u001b[31m';
  yellow: '\x1B[33m';
  green: '\x1B[32m';
  black: '\x1B[39m';
};

declare type index = 'black' | 'green' | 'yellow' | 'red';

declare type Color = (idx: index, str: string) => string;

declare type LogCodes = {
  Log: 'black';
  Info: 'yellow';
  Status: 'green';
  Debug: 'yellow';
  Fail: 'red';
  Error: 'red';
};

declare type Type = 'Log' | 'Info' | 'Status' | 'Debug' | 'Fail' | 'Error';

declare type Log = (type: Type, txt: string) => void;
