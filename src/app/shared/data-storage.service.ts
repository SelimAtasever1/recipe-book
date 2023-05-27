import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { RecipeService } from '../recipes/recipe.service';
import { RecipeModel } from '../recipes/recipe.model';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService { // subscribe yaptıgın yer response a ihtiyac duydugun yer..mesela loading istiyorsan cagrıldıgı yerde de subs edebilirsn.

  constructor(private http: HttpClient, private recipiesService : RecipeService, private authService : AuthService) { }

  StoreRecepies(){
    const recipies = this.recipiesService.GetRecipies();
    this.http.put("https://ng-recipebook-8a101-default-rtdb.firebaseio.com/recipies.json", recipies).subscribe(
      response => {
        console.log(response);
      }
    ); //overrides every post.
  }

  FetchRecepies(){
    return this.authService.user.pipe(take(1), exhaustMap(user => {
      return this.http.get<RecipeModel[]>("https://ng-recipebook-8a101-default-rtdb.firebaseio.com/recipies.json",
      {
        params: new HttpParams().set('auth', user.token)
      })


    }), 
    map(recipes => {
      return recipes.map(recipe =>{
        return{
          ...recipe,
          ingredients: recipe.ingredients ? recipe.ingredients : []
        };
      });
    }),
    tap(recipes =>{
      this.recipiesService.SetRecipies(recipes);
    }));
  }
}
 