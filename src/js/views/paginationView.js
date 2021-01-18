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
      //   console.log(btn);
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      console.log(goToPage);
      handler(goToPage);
    });
  }

  _generateMarkup() {
    this._curPage = this._data.page;
    console.log(this);
    this._numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    console.log(this._numPages);
    // page1 ,and there are other pages
    if (this._curPage === 1 && this._numPages > 1) {
      return `${this._renderNumPages()}${this._renderButton('next')}`;
    }

    // last page
    if (this._curPage === this._numPages && this._numPages > 1) {
      return `${this._renderButton('prev')}${this._renderNumPages()}`;
    }
    //   return `
    //     <button class="btn--inline pagination__btn--prev">
    //         <svg class="search__icon">
    //             <use href="${icons}#icon-arrow-left"></use>
    //         </svg>
    //         <span>Page ${curPage - 1}</span>
    //     </button>
    //   `;
    // }

    // // other page
    if (this._curPage < this._numPages) {
      return `${this._renderButton(
        'prev'
      )}${this._renderNumPages()}${this._renderButton('next')}`;
    }
    //   return `
    //     <button class="btn--inline pagination__btn--prev">
    //         <svg class="search__icon">
    //             <use href="${icons}#icon-arrow-left"></use>
    //         </svg>
    //         <span>Page ${curPage - 1}</span>
    //     </button>
    //     <button class="btn--inline pagination__btn--next">
    //         <span>Page ${curPage + 1}</span>
    //         <svg class="search__icon">
    //             <use href="${icons}#icon-arrow-right"></use>
    //         </svg>
    //     </button>
    //   `;
    // }

    // page1 ,and there are NO other pages
    return '';
  }

  _renderButton(btnType) {
    console.log(this._curPage);
    console.log(btnType);
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
    <div class="pagination__numpages">there is ${this._numPages}, pages</div>
    `;
  }
}

export default new PaginationView();
