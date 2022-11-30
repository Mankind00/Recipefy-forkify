import View from './View.js';
// import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _messageElement = this._parentElement.querySelector('.message');
  _errorMessage = 'No recipes found for your query! Please try again ;)';
  _message = '';

  _generateSearchExamples() {
    return `
    <p>Search for keywords like ${this._data.join(', ')} </p>
    `;
  }

  _generateMarkup() {
    // console.log(this._data);
    return this._data.map(this._generateMarkupPreview).join('');
  }

  _generateMarkupPreview(result) {
    const id = window.location.hash.slice(1);

    // console.log(id);
    return `
      <li class="preview">
        <a class="preview__link ${
          result.recipe_id === id ? 'preview__link--active' : ''
        }" href="#${result.recipe_id}">
          <figure class="preview__fig">
              <img src=${result.image_url} alt="Test" />
          </figure>
          <div class="preview__data">
              <h4 class="preview__title">${result.title}</h4>
              <p class="preview__publisher">${result.publisher}</p>
          </div>
        </a>
      </li>`;
  }
}

export default new ResultsView();
