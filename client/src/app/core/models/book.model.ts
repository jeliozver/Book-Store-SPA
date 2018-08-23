import { Comment } from './comment.model';

export class Book {
  constructor(
    public _id: string,
    public title: string,
    public author: string,
    public genre: string,
    public year: number,
    public description: string,
    public cover: string,
    public isbn: string,
    public pagesCount: number,
    public price: number,
    public qty?: number,
    public creationDate?: Date,
    public currentRating?: number,
    public ratingPoints?: number,
    public ratedCount?: number,
    public purchasesCount?: number,
    public comments?: Comment[]
  ) { }
}
