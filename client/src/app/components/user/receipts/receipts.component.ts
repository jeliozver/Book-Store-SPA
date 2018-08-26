// Decorators and Lifehooks
import { Component, OnInit } from '@angular/core';

// Services
import { UserService } from '../../../core/services/user.service';

// Models
import { Receipt } from '../../../core/models/receipt.model';

@Component({
  selector: 'app-receipts',
  templateUrl: './receipts.component.html',
  styleUrls: ['./receipts.component.css']
})
export class ReceiptsComponent implements OnInit {
  receipts: Receipt[];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService
      .getPurchaseHistory()
      .subscribe((res) => {
        this.receipts = res.data;
      });
  }

}
