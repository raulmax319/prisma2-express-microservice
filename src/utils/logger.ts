class Logger {
  constructor(private readonly debug?: boolean) {}
  private readonly colors: ColorList = {
    red: '\u001b[31m',
    yellow: '\x1B[33m',
    green: '\x1B[32m',
    black: '\x1B[39m',
  };
  private readonly codes: LogCodes = {
    Log: 'black',
    Info: 'yellow',
    Status: 'green',
    Debug: 'yellow',
    Fail: 'red',
    Error: 'red',
  };

  private color: Color = (idx, str) => {
    return (this.colors[idx] || this.colors.black) + str + this.colors.black;
  };

  private log: Log = (type, txt) => {
    const msg = this.color(this.codes[type], `[ ${type} ] ${txt || ''}`);
    console.log(msg ?? '');
  };

  public detail = (msg: string) => {
    if (this.debug) {
      this.log('Debug', msg);
    }
  };

  public info = (msg: string) => {
    if (this.debug) {
      this.log('Info', msg);
    }
  };

  public status = (msg: string) => {
    if (this.debug) {
      this.log('Status', msg);
    }
  };

  public fail = (msg: string) => {
    if (this.debug) {
      this.log('Fail', msg);
    }
  };

  public error = (msg: string) => {
    if (this.debug) {
      this.log('Error', msg);
    }
  };
}

export const logger = new Logger();
