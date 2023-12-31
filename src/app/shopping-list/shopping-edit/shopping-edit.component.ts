import { Component,OnInit, OnDestroy,ViewChild} from '@angular/core';
import { Ingridient } from 'src/app/shared/ingridient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy{
@ViewChild('f',{static:false})slForm:NgForm;

  subscription:Subscription 
 editMode = false;
 editedItemIndex : number;
 editedItem : Ingridient;
  constructor(private slService:ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.slService.startedEditing.
    subscribe(
      (index:number)=>{this.editedItemIndex=index ;
                    this.editMode=true;
                    this.editedItem=this.slService.getIngridients(index);
                    this.slForm.setValue({
                      name:this.editedItem.name,
                      amount:this.editedItem.amount

                    })}
    );
  }
 onSubmit(form:NgForm){ 
  const value = form.value;
    const newIngridient = new Ingridient(value.name, value.amount);
    if(this.editMode){
      this.slService.updateIngridient(this.editedItemIndex,newIngridient)
    }
    else{
    this.slService.addIngridient(newIngridient);
    }
    this.editMode=false;
    form.reset()
  }
  onClear(){
    this.slForm.reset();
    this.editMode=false;
  }
  onDelete(){
    this.slService.deleteIngridient(this.editedItemIndex)
    this.onClear();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
