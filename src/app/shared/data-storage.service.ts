import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {tap,map,take, exhaustMap} from 'rxjs/operators';

import { RecipeService } from '../recipes/recipes.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';
@Injectable({providedIn:'root'})
export class DataStorageService {

    constructor(private http:HttpClient,
         private recipeService:RecipeService,
         private authService:AuthService){}

    storeRecipes(){
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://ng-course-recipebook-12111-default-rtdb.firebaseio.com/recipes.json',
        recipes).subscribe(response => {console.log(response)});
    }
    fetchRecipes(){
      
            return this.http.get<Recipe[]>
            ('https://ng-course-recipebook-12111-default-rtdb.firebaseio.com/recipes.json'
            ).pipe(map(recipes => {
                return recipes.map(recipe => {
                  return {
                    ...recipe,
                    ingredients: recipe.ingridients ? recipe.ingridients : []
                  };
                });
              }),
                tap(recipes=>{this.recipeService.setRecipes(recipes)}));
         
        
    }
}