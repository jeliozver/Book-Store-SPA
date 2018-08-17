export class Comment {
  constructor(
    public user: string,
    public content: string,
    public book?: string,
    public creationDate?: Date
  ) { }
}
