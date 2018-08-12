export class ServerResponse<T> {
  constructor(
    public message: string,
    public data?: { [key: string]: T },
    public errors?: { [key: string]: string }
  ) { }
}
