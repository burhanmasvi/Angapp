import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model"
import { Ingridient } from "../shared/ingridient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService {
   recipesChanged = new Subject<Recipe[]>();
   private recipes:Recipe[] = [
        new Recipe('A Schenitzel', 'Tasty just awesome!','/assets/image/schnitzel.jpg',
        [
         new Ingridient('Meat', 1),
         new Ingridient('French fries', 20)
        ]),
        new Recipe('A big Fat Burger', 'What else you can have?','/assets/image/burger.jpg',
        [
         new Ingridient('Buns', 2),
         new Ingridient('Meat', 1),

        ])
    
      ]
 constructor(private slService:ShoppingListService){}   

 setRecipes(recipes:Recipe[]){
  this.recipes = recipes; 
  this.recipesChanged.next(this.recipes.slice());
 }
 getRecipes() {
    return this.recipes.slice();
 }     
 getRecipe(index:number){
   return this.recipes[index];

 }
 addIngridientsToShoppingList(ingridients:Ingridient[]){
    this.slService.addIngridients(ingridients);
 }
 addRecipe(recipe:Recipe){
   this.recipes.push(recipe);
   this.recipesChanged.next(this.recipes.slice());
 }
 updateRecipe(index:number,newRecipe:Recipe){
   this.recipes[index]=newRecipe;
   this.recipesChanged.next(this.recipes.slice());
 }
 deleteRecipe(index:number){
   this.recipes.splice(index,1);
   this.recipesChanged.next(this.recipes.slice())
 }
}