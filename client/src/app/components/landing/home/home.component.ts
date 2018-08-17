// Decorators and Lifehooks
import { Component, OnInit } from '@angular/core';

// Services
import { BookService } from '../../../core/services/book.service';

// Models
import { Book } from '../../../core/models/book.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private bookService: BookService) { }

  ngOnInit(): void {

  }

}
