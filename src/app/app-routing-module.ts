import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { NoSelectionComponent } from "./recipes/no-selection/no-selection.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { RecipeResolverResolver } from "./recipes/recipe-resolver.resolver";
import { AuthComponent } from "./auth/auth/auth.component";
import { AuthGuard } from "./auth/auth/auth-guard";

const appRoutes : Routes = [

    {path: '', redirectTo: '/recipes', pathMatch: 'full'},
    {path : 'recipes', component: RecipesComponent, canActivate: [AuthGuard],  children:[
        { path : '', component: NoSelectionComponent },
        { path : 'new', component: RecipeEditComponent }, // bu id önünde olmalı yoksa new'i id olarak algılar (hierarşi.)
        { path : ':id', component: RecipeDetailComponent, resolve: [RecipeResolverResolver] },
        { path : ':id/edit', component: RecipeEditComponent, resolve: [RecipeResolverResolver] },
    ] 
    },
    {path: 'shopping-list', component: ShoppingListComponent},
    {path: 'auth', component: AuthComponent}

  ] 

@NgModule({
    imports:[
        RouterModule.forRoot(appRoutes)
    ],
    exports:[RouterModule] 
})
export class AppRoutingModule{
    
}