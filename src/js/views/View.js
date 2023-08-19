import icons from 'url:../../img/icons.svg';

export default class View {
    _data;

    /**
     * Render the received object on the DOM
     * @param {Object | Object[]} data The data to be rendered (e.g. recipe)
     * @param {boolean } [render=true] If false, create markup sting instead of rendering to the DOM
     * @returns {undefined | string} A markup sting is returned if render=false
     * @this {Object} View instance
     * @author Tabish Javed
     * @todo Finish implementation
     */
    render (data, render = true) {
        if (!data || (Array.isArray(data) && data.length === 0)) return this.renderErrorMessage();

        this._data = data;
        const markup = this._generateMarkup();

        if (!render) return markup;

        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }


    // This update method is used to update DOM elements without reloading container elements.
    update (data) {
        this._data = data;
        const newMarkup = this._generateMarkup();

        const newDOM = document.createRange().createContextualFragment(newMarkup);
        const newElements = Array.from(newDOM.querySelectorAll('*'));
        const currentElements = Array.from(this._parentElement.querySelectorAll('*'));

        newElements.forEach((newElement, index) => {
            const currentElement = currentElements[index];
            // Update changed TEXT
            if (!newElement.isEqualNode(currentElement) &&
                newElement.firstChild?.nodeValue.trim() !== '') {
                currentElement.textContent = newElement.textContent;
            }
            // Update changed ATTRIBUTES
            if (!newElement.isEqualNode(currentElement))
                Array.from(newElement.attributes).forEach(attribute =>
                    currentElement.setAttribute(attribute.name, attribute.value));
        });
    }


    _clear () {
        this._parentElement.innerHTML = '';
    }


    renderSpinner () {
        const markup = `
        <div class="spinner">
            <svg>
                <use href="${icons}#icon-loader"></use>
            </svg>
        `;
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }


    renderErrorMessage (message = this._errorMessage) {
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
    }


    renderSuccessMessage (message = this._successMessage) {
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
    }
}