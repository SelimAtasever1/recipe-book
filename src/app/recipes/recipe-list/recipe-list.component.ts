import { Component, OnInit } from '@angular/core';
import { RecipeModel } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: RecipeModel[];
  filteredString : string = "";
  index : number;
  constructor(private recipeService : RecipeService, private router: Router){}
  
  ngOnInit() {

    this.recipes = this.recipeService.GetRecipies();
    this.recipeService.recipesChanged.subscribe(
      (recipes : RecipeModel[]) => {
        this.recipes = recipes;
      }
    )
  }

  onCreateNewRecipe(){
    this.router.navigate(['/recipes/new']);
  }

}
