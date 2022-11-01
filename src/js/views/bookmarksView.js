import View from './View.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it ;)';
  _message = '';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    // console.log(this._parentElement);
    return this._data.map(this._generateMarkupPreview).join('');
  }

  _generateMarkupPreview(bookmark) {
    const id = window.location.hash.slice(1);

    // console.log(id);
    // console.log(bookmark);
    return `
      <li class="preview">
        <a class="preview__link ${
          bookmark.id === id ? 'preview__link--active' : ''
        }" href="#${bookmark.id}">
          <figure class="preview__fig">
              <img src=${bookmark.image} alt="Test" />
          </figure>
          <div class="preview__data">
              <h4 class="preview__title">${bookmark.title}</h4>
              <p class="preview__publisher">${bookmark.publisher}</p>
          </div>
        </a>
      </li>`;
  }
}

export default new BookmarksView();
