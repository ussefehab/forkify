import "core-js/stable";
import "regenerator-runtime/runtime";
import * as model from "./model.js";
import RecipeView from "./views/recipeView.js";
import SearchView from "./views/searchView.js";
import ResultsView from "./views/resultsView.js";
import bookmarkView from "./views/bookMarkView.js";
import paginationView from "./views/paginationView.js";
import addrecipeView from "./views/addrecipeView.js";
import { Time_sec_close } from "./configure";



//
// https://forkify-api.herokuapp.com/v2
//get recipe
const controlRecipe= async function(){
  try{
    const id= window.location.hash.slice(1);
    
    if(!id) return;
    RecipeView.renderSpinner();
    
    //show selected element
    ResultsView.update(model.getSearchResultsPage());
    //update bookmark view
    bookmarkView.update(model.state.bookmarks);

    //loading recipe
    await model.loadRecipe(id);
    //render recipe
    RecipeView.render(model.state.recipe);
    // controlServings();


}catch(error){
  RecipeView.renderError();
}
}
const controlSearchResults = async function(){
  //get querry 
  const query = SearchView.getQuery();
  if(!query) return;
  try {
    ResultsView.renderSpinner(); 
    //load results
    await model.loadSearchResults(query);
    // render results
    ResultsView.render(model.getSearchResultsPage());
    // render pagnation buttons
    paginationView.render(model.state.search);
  } catch (error) {
    console.log(error);
  }
}
const controlPagination = function(goToPage){
  ResultsView.render(model.getSearchResultsPage(goToPage));
  // render pagnation buttons
  paginationView.render(model.state.search);

  console.log('pag controller');
}
const controlServings = function (updateTo){
  model.updateServings(updateTo);
  RecipeView.update(model.state.recipe);

}
const controlAddBookMarks = function(){
  //add or del bookmark
  if(!model.state.recipe.bookmarked)model.addBookMark(model.state.recipe);
  else model.deleteBookMark(model.state.recipe.id);
  //update bookmark
  RecipeView.update(model.state.recipe);
  //render bookmark
  bookmarkView.render(model.state.bookmarks);


}
const controlBookmark = function(){
  bookmarkView.render(model.state.bookmarks);
}

const controlAddRecipe = async function(newRecipe){
try {

  //upload new recipe
  await model.uploadRecipe(newRecipe);
  console.log(model.state.recipe);
  
  //add spinner
  
  addrecipeView.renderSpinner();
  //render recipe
  RecipeView.render(model.state.recipe);
  
  //seccessfull message
  addrecipeView.renderMessage();
  //close form
  setTimeout(function(){
    addrecipeView.toggleWindow();
  },Time_sec_close * 1000)
  //render bookmark view
  bookmarkView.render(model.state.bookmarks);
  //change id in url
  window.history.pushState(null,'',`#${model.state.recipe.id}`);
} catch (error) {
  addrecipeView.renderError(error.message);
} 
}

const init= function(){
bookmarkView.addHandlerRender(controlBookmark);
SearchView.addHandlerSearch(controlSearchResults); 
RecipeView.addHandlerRender(controlRecipe);
RecipeView.addHandlerServing(controlServings);
RecipeView.addHandlerBookMark(controlAddBookMarks);
paginationView.addHandlerClick(controlPagination);
addrecipeView.addHandlerUpload(controlAddRecipe);
}
init();