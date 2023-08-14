import View from "./View";


class PreviewView extends View {
    _parentElement = '';


    _generateMarkup () {
        const ID = window.location.hash.slice(1);

        return `
        <li class="preview">
            <a class="preview__link ${this._data.id === ID ? 'preview__link--active' : ''}"
            href="#${this._data.id}">
                <figure class="preview__fig">
                    <img src="${this._data.imageURL}" alt="${this._data.title}" />
                </figure>
                <div class="preview__data">
                    <h4 class="preview__title">${this._data.title}</h4>
                    <p class="preview__publisher">${this._data.publisher}</p>
                </div>
            </a>
      </li>
        `;
    }
}


export default new PreviewView();