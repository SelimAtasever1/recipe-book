import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.module';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[];
  private subs : Subscription;

  /* @Input() newIngredient : Ingredient; */

  /* AddNewIngredient(ingredient : Ingredient){
    this.ingredients.push(ingredient);
  } */

  constructor(private shoppingListService : ShoppingListService){}
  
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit() {
    this.ingredients = this.shoppingListService.GetIngredients();
    this.subs = this.shoppingListService.ingredientChange.subscribe(
      (ingredients : Ingredient[])=>{
        this.ingredients = ingredients;
      }
    );
  }

  onEditItem(id : number){
    this.shoppingListService.startedEditing.next(id);
  }
}
