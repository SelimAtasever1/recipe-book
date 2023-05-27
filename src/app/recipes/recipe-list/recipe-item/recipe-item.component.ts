import { Component, OnInit, Input } from '@angular/core';
import { RecipeModel } from '../../recipe.model';
import { Router } from '@angular/router';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent {
  @Input() recipe : RecipeModel;
  @Input() index : number;

  constructor(private router: Router, private recipeService : RecipeService){}

  onRecipeItemSelected(){

    console.log(this.recipe);
    this.router.navigate(['/recipes/' + this.index]);
    console.log(this.index);
    /* this.recipeService.setRecipeId(this.recipe.product_index); */
  }
  
}
