import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.module';
import { FormsModule } from '@angular/forms'; 
import {NgForm} from '@angular/forms';
import { ShoppingListService } from '../shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy{
  subscription : Subscription;
  editMode = false;
  selectedItemIndex: number; 
  editedItem : Ingredient; 
  @ViewChild('myForm') slForm : NgForm;

  constructor(private shoppingListService : ShoppingListService){}
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing
      .subscribe(
        (index : number) => {
          this.selectedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.shoppingListService.GetIngredient(index);
          this.slForm.setValue({
            name: this.editedItem.name,
            amount : this.editedItem.amount
          });
        }
      );
  }

  ngAfterViewInit(){
    console.log("bum");
  }

  onDeleteItem(){
    console.log(this.selectedItemIndex);
    this.shoppingListService.DeleteItem(this.selectedItemIndex);
    this.ClearForm();
  }

  SubmitNewItem(form: NgForm){

    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);

    if(this.editMode){
      this.shoppingListService.UpdateIngredient(this.selectedItemIndex, newIngredient);
    } else {
      this.shoppingListService.AddNewIngredient(newIngredient);
    }

    this.slForm.reset();
    this.editMode = false;
    console.log(newIngredient);
  }

  ClearForm(){
    this.slForm.reset();
    this.editMode = false;
  }

}
