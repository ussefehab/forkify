import View from './view';
import icons from 'url:../../img/icons.svg';

class paginationView extends View {
  _parentElement = document.querySelector('.pagination');
  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function(e){
        const btn = e.target.closest('.btn--inline');
        if(!btn) return;
        const goToPage = +btn.dataset.goto;
        handler(goToPage);
    });
}
    _generateMarkup(){
        this.curPage = this._data.page;
        const numPages = Math.ceil(this._data.results.length / this._data.resultPerPage);
        
        // console.log(this._data.results)
        // console.log(this._data.resultsPerPage)
        // console.log(numPages);

        //page1 and there are other pages
        if(this.curPage === 1 && numPages > 1){
            return this._goToNext();
        }
        //last page
        if (this.curPage === numPages && numPages > 1 ){
            return this._goToPrev();
        }
        //other pages 
        if (this.curPage < numPages ){
            return [this._goToPrev(),this._goToNext()];
        }
        //psge1 and there are  no other pages
        return "";
    
    }
_goToNext(){
    return `<button data-goto="${this.curPage +1}" class="btn--inline pagination__btn--next">
    <span>page ${this.curPage +1}</span>
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-right"></use>
    </svg>
  </button> `;
}
_goToPrev(){
    return `<button data-goto="${this.curPage -1}" class="btn--inline pagination__btn--prev">
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-left"></use>
    </svg>
    <span>Page ${this.curPage -1}</span>
  </button>`;
}



}
export default new paginationView();