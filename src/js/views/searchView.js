class SearchView {
  _parentElement = document.querySelector('.search');

  getQuery() {
    const query = this._parentElement.querySelector('.search__field').value;
    this._clearQuery();
    return query;
  }

  _clearQuery() {
    this._parentElement.querySelector('.search__field').value = '';
  }

  addHandler(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
      //   console.log('okay');
    });
  }
}

export default new SearchView();
