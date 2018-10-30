export class TimeRecord {
  public from: Date;
  public to: Date;
  public type: string;

  constructor(from: Date, to: Date, type: string) {
    this.from = from;
    this.to = to;
    this.type = type;
  }
}
