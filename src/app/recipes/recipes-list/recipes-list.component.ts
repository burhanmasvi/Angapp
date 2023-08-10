import { Component, OnInit} from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipes.service';
import {Router, ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {
  recipes:Recipe[]; 

  constructor(private recipeservice:RecipeService,
    private router:Router,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.recipeservice.recipesChanged.
    subscribe((recipes:Recipe[])=>{
      this.recipes = recipes
    });
    this.recipes = this.recipeservice.getRecipes();
  }
  onNewRecipe(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
