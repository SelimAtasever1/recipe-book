import { Component, OnInit } from '@angular/core';
import { RecipeModel } from './recipe.model';
import { RecipeService } from './recipe.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  /* providers: [RecipeService] */
})
export class RecipesComponent implements OnInit {

  selectedRecipe : RecipeModel;

  constructor(private recipeService : RecipeService, private dataStorageService : DataStorageService){}

  ngOnInit(): void {
    this.dataStorageService.FetchRecepies().subscribe();

    this.recipeService.recipeSelected
    .subscribe(
      (recipe : RecipeModel) => {
        this.selectedRecipe = recipe;
      }
    );
  }

}
