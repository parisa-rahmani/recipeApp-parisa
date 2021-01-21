import View from './View.js';
import icons from 'url:../../img/icons.svg'; //parcel 2

class ShopListView extends View {
  _parentElement = document.querySelector('.shop__list');

  _errorMessage = 'Save a nice recipe and see what do you need to buy :)';
  _message = '';

  constructor() {
    super();
    this._addHandlerDeleteListItem();
  }

  addHandlerRenderShopList(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    return `
      ${this._data
        .map(el => el.ingredients.map(this._generateIngredients))
        .join('')
        .replaceAll(',', '')}
      `;
  }

  deleteListItem(e) {
    if (e.target.closest('.delete-item')) {
      e.target.closest('.shop__item').remove();
    }
  }

  _addHandlerDeleteListItem() {
    this._parentElement.addEventListener('click', this.deleteListItem);
  }

  _generateIngredients(ing) {
    return ` 
      <li class="shop__item">
          <label class="item-text">
            <svg class="recipe__icon check">
                <use href="${icons}#icon-send"></use>
              </svg>
            <span class="recipe__quantity">${
              ing.quantity ? new Fraction(ing.quantity).toString() : ''
            }</span>
            <span class="recipe__description">
              <span class="recipe__unit">${ing.unit}</span>
                ${ing.description}
            </span>
          </label>
          <label class="delete-item">
            <svg class="delete-icon">
              <use href="${icons}#icon-bin"></use>
            </svg>
         </label>
      </li>
    `;
  }
}

export default new ShopListView();
