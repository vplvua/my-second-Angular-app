import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs/subject';

import { Ingredient } from '../shared/ingredient.model';
// import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
// import * as fromShoppingListService from '../shopping-list/store/shopping-list.reducer';
import * as fromApp from '../store/app.reducer';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'A Test Recipe',
  //     'This is simply a test',
  //     'https://upload.wikimedia.org/wikipedia/commons/3/39/Recipe.jpg',
  //     [new Ingredient('Meat', 20), new Ingredient('Fries', 100)]
  //   ),
  //   new Recipe(
  //     'A Second Test Recipe',
  //     'Of course this is simply a test with the same image',
  //     'https://upload.wikimedia.org/wikipedia/commons/3/39/Recipe.jpg',
  //     [
  //       new Ingredient('Buns', 2),
  //       new Ingredient('Meat', 500),
  //       new Ingredient('Tomato', 100),
  //     ]
  //   ),
  // ];
  private recipes: Recipe[] = [];

  constructor(
    // private slService: ShoppingListService,
    private store: Store<fromApp.AppState>
  ) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    // this.slService.addIngredients(ingredients);
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
