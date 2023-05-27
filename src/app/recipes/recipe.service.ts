import { EventEmitter, Injectable } from '@angular/core';
import { RecipeModel } from './recipe.model';
import { Ingredient } from '../shared/ingredient.module';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable({ 
  providedIn: 'root'
})
export class RecipeService {

  recipeSelected = new Subject<RecipeModel>();
  recipesChanged = new Subject<RecipeModel[]>();

  recipeId : number;
  private recipes: RecipeModel[] = [];

  /* private recipes: RecipeModel[] = [
    new RecipeModel(
      "sbaklava",
      "Turkish desert with pistaccio or walnut",
      "https://st2.myideasoft.com/idea/gx/27/myassets/products/399/kuru-baklava-32-jpg.jpeg?revision=1612024970",
      [
        new Ingredient("pistaccio" , 500),
        new Ingredient("walnut" , 300)
      ]
      ),
    new RecipeModel(
      "sushi",
      "Japanese dish of raw fish",
      "https://cdn.yemek.com/mncrop/940/625/uploads/2020/04/sushi-tarifi.jpg",
      [
        new Ingredient("salmon" , 2),
        new Ingredient("rice" , 500)
      ]
      )
  ]; */

  setRecipeId(number: number) {
    this.recipeId = number;
  }

  getRecipeId(): number {
    return this.recipeId;
  }

  DeleteRecipe(index : number){
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());  }

  AddRecipe(recipe : RecipeModel){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());

  }

  UpdateRecipe(index : number, newRecipe : RecipeModel){
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  constructor(private slService: ShoppingListService) { }

  SetRecipies(recipies: RecipeModel[]){
    this.recipes = recipies;
    this.recipesChanged.next(this.recipes.slice());
  }
 
  GetRecipies(){
    return this.recipes.slice(); // slice ile array in kopyasına erişiliyor, dısardan array ın kendisine erişilmesin deyü
  }

  AddIngredientsToShoppingList(ingredients : Ingredient[]){
    ingredients.forEach(element => {
      this.slService.AddNewIngredient(element);
    });
  }

  GetRecipeById(id: number){
    return this.recipes[id];
  }
  
}
