import { Component, OnInit } from '@angular/core';
import { FurnitureService } from '../furniture.service';
import { Observable } from 'rxjs';
import { Furniture } from 'src/app/models/furniture';

@Component({
  selector: 'app-furniture-user',
  templateUrl: './furniture-user.component.html',
  styleUrls: ['./furniture-user.component.css']
})
export class FurnitureUserComponent implements OnInit {
  userFurniture$: Observable<Array<Furniture>>
  constructor(private furnitureService: FurnitureService) { }

  ngOnInit() {
    this.userFurniture$ = this.furnitureService.getUserFurniture()
  }

  deleteFurniture(id) {
    this.furnitureService.deleteFurniture(id)
      .subscribe(data =>
        this.userFurniture$ = this.furnitureService.getUserFurniture()
      )};
}
