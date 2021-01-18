import View from './View.js';
import icons from 'url:../../img/icons.svg'; //parcel 2

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  _curPage;
  _numPages;

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      e.preventDefault();
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    this._curPage = this._data.page;
    this._numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // page1 ,and there are other pages
    if (this._curPage === 1 && this._numPages > 1) {
      return `${this._renderNumPages()}${this._renderButton('next')}`;
    }

    // last page
    if (this._curPage === this._numPages && this._numPages > 1) {
      return `${this._renderButton('prev')}${this._renderNumPages()}`;
    }

    // other page
    if (this._curPage < this._numPages) {
      return `${this._renderButton(
        'prev'
      )}${this._renderNumPages()}${this._renderButton('next')}`;
    }

    // page1 ,and there are NO other pages
    return '';
  }

  _renderButton(btnType) {
    return `
        <button data-goto="${
          btnType === 'prev' ? this._curPage - 1 : this._curPage + 1
        }" class="btn--inline pagination__btn--${btnType}">
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-${
      btnType === 'prev' ? 'left' : 'right'
    }"></use>
            </svg>
            <span>Page ${
              btnType === 'prev' ? this._curPage - 1 : this._curPage + 1
            }</span>
        </button>
    `;
  }
  _renderNumPages() {
    return `
    <div class="pagination__numpages">There is ${this._numPages}, Pages</div>
    `;
  }
}

export default new PaginationView();
