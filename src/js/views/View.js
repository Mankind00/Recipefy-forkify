import icons from 'url:../../img/icons.svg';

export default class View {
  _data;

  render(data) {
    // if (!data || (Array.isArray(data) && data.length === 0))
    //   return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();

    // if (!render) return markup;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);

    // console.log(this._parentElement);
  }

  renderExamples(data) {
    this._data = data;
    const exampleMarkUp = this._generateSearchExamples();
    this._messageElement.insertAdjacentHTML('afterbegin', exampleMarkUp);
  }

  update(data) {
    this._data = data;

    const newMarkUp = this._generateMarkup();
    const newDom = document.createRange().createContextualFragment(newMarkUp);
    // console.log(newDom);
    const newElement = Array.from(newDom.querySelectorAll('*'));
    // console.log(newElement);
    const currElement = Array.from(this._parentElement.querySelectorAll('*'));

    // Update Changed TEXT

    newElement.forEach((newEl, i) => {
      const currEl = currElement[i];

      if (
        !newEl.isEqualNode(currEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        // console.log(newEl.textContent);
        currEl.textContent = newEl.textContent;
      }

      if (!newEl.isEqualNode(currEl)) {
        // console.log(newEl.attributes);
        Array.from(newEl.attributes).forEach(attr => {
          // console.log(attr);
          currEl.setAttribute(attr.name, attr.value);
        });
      }
    });
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    const markup = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
     <div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
    // return this._errorMessage;
  }

  renderMessage(message = this._message) {
    const markup = `
     <div class="message">
      <div>
        <svg>
          <use href="${icons}#icon-smile"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
    // return this._errorMessage;
  }
}
