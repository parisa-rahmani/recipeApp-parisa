import View from './View.js';

class IngListView extends View {
  _parentElement = document.querySelector('.shop__list');
  _errorMessage = 'Save a nice recipe and see what need you do :)';
  _message = '';

  addHandlerRenderIng(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    const [...data] = this._data;
    return `
         ${data
           .map(el => el.ingredients.map(this._generateIngredients))
           .join('')}
    `;
  }

  _generateIngredients(ing) {
    return ` 
    <li class="shop__item">
        <div class="wrapper">
            <span>
                <input type="checkbox" name="item" id="" />
            </span>     
            <div class="recipe__quantity">${
              ing.quantity ? new Fraction(ing.quantity).toString() : ''
            }</div>
            <div class="recipe__description">
                <span class="recipe__unit">${ing.unit}</span>
                ${ing.description}
            </div>
        </div>
    </li>
    `;
  }
}

export default new IngListView();
