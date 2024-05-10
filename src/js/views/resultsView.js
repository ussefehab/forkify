import View from "./view";
import previewView from "./previewView";

 class ResultView extends View {
    _errorMessage = 'no recipes found';
    _message = '';
    _parentElement = document.querySelector('.results');
    _generateMarkup() {
      return this._data.map(bookmark=>previewView.render(bookmark,false)).join('');
  }
 }
export default new ResultView();