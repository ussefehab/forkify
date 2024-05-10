import View from "./view";
import previewView from "./previewView";
 class bookmarkView extends View {
    _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it :)';
    _message = '';
    _parentElement = document.querySelector('.bookmarks__list');
    addHandlerRender(handler) {
        window.addEventListener('load',handler);
    }
    _generateMarkup() {
        return this._data.map(bookmark=>previewView.render(bookmark,false)).join('');
    }
 }
export default new bookmarkView();