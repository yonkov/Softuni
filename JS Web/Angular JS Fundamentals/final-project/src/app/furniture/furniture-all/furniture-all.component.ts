import { Component, OnInit } from '@angular/core';
import { Furniture } from 'src/app/models/furniture';
import { Observable } from 'rxjs';
import { FurnitureService } from '../furniture.service';

@Component({
  selector: 'app-furniture-all',
  templateUrl: './furniture-all.component.html',
  styleUrls: ['./furniture-all.component.css']
})
export class FurnitureAllComponent implements OnInit {
  furniture: Observable<Array<Furniture>>;
  constructor(private furnitureService: FurnitureService) { }

  ngOnInit() {
    this.furniture = this.furnitureService.getAllFurniture()
  }

}
