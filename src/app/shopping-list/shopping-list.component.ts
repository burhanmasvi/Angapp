import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingridient } from '../shared/ingridient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs-compat';
 
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit , OnDestroy {

  ingridients:Ingridient[];
  private igChangedSub : Subscription;

  constructor(private slService:ShoppingListService) { }

  ngOnInit(): void {
    this.ingridients = this.slService.getIngridient();
    this.igChangedSub =  this.slService.ingridientsChanged.subscribe((ingridients:Ingridient[]) => {this.ingridients = ingridients});
    
  }
  onEditItem(index:number){
    this.slService.startedEditing.next(index)
  }
  ngOnDestroy(): void {
    this.igChangedSub.unsubscribe();
  }
  
}
