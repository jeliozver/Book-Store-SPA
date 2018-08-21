export class Comment {
  constructor(
    public _id: string,
    public user: string,
    public content: string,
    public book?: string,
    public creationDate?: Date
  ) { }
}
