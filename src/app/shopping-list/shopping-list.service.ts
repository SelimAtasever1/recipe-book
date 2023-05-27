import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.module';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  ingredientChange = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient("Apples", 5),
    new Ingredient("Tomatoes", 15),
    new Ingredient("Chocolate", 3),
    new Ingredient("Pistaccio", 911)
  ];

  constructor() { }

  GetIngredient(index : number){
    return this.ingredients[index];
  }

  DeleteItem(index : number){
    this.ingredients.splice(index, 1);
    this.ingredientChange.next(this.ingredients.slice());
  }

  UpdateIngredient(index : number, newIngredient : Ingredient){
    this.ingredients[index] = newIngredient;
    this.ingredientChange.next(this.ingredients.slice());
  }

  GetIngredients(){
    return this.ingredients.slice();
  }

  AddNewIngredient(ingredient : Ingredient){
    this.ingredients.push(ingredient);
    this.ingredientChange.next(this.ingredients.slice());
  }
}
