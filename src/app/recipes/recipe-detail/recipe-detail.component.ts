import { Component, OnInit } from '@angular/core';
import { RecipeModel } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe : RecipeModel;
  id: number;

  constructor(private recipeService : RecipeService,
    private route : ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipe = this.recipeService.GetRecipeById(this.id);
      }
    );
  }

  editSelectedRecipe(){
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  deleteSelectedRecipe(){
    this.recipeService.DeleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

  onAdIngredientsToShoppingList(){
    console.log("works");
    this.recipeService.AddIngredientsToShoppingList(this.recipe.ingredients);

  }
}
