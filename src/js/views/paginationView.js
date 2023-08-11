import icons from 'url:../../img/icons.svg';
import View from "./View";


class PaginationView extends View {
    _parentElement = document.querySelector('.pagination');

    addHandlerPageButtons (handler) {
        this._parentElement.addEventListener('click', function (event) {
            const button = event.target.closest('.btn--inline');
            if (!button) return;

            const goToPage = +button.dataset.goto;
            handler(goToPage);
        });
    }


    _generateMarkup () {
        const currentPage = this._data.page;
        const numberOfPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);

        if (currentPage === 1 && numberOfPages > 1) {   // Page-1, and there are other pages
            return `
            <button data-goto=${currentPage + 1} class="btn--inline pagination__btn--next">
                <span>Page ${currentPage + 1}</span>
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>
            `;
        } else if (currentPage === numberOfPages && numberOfPages > 1) {    // Last Page
            return `
            <button data-goto=${currentPage - 1} class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${currentPage - 1}</span>
            </button>
            `;
        } else if (currentPage < numberOfPages) {  // Other page
            return `
            <button data-goto=${currentPage - 1} class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${currentPage - 1}</span>
            </button>
            <button data-goto=${currentPage + 1} class="btn--inline pagination__btn--next">
                <span>Page ${currentPage + 1}</span>
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>
            `;
        } else  // Page-1, and there is no other page
            return '';
    }

}


export default new PaginationView();