(function () {
    const reviewTitle = document.getElementById('reviewTitle');
    const reviewText = document.getElementById('reviewText');
    const reviewComment = document.getElementById('reviewName');

    const form = document.getElementById('form');
    const reviewButton = document.getElementById('reviewButton');
    const reviewsRow = document.getElementById('reviewsRow');

    form.addEventListener('submit', (ev) => {
        ev.preventDefault();
    })


    const createNewReview = (title, comment, text) => {
        return `<div class="col-lg-4 col-md-6 py-3">
                        <div class="card h-100">
                            <div class="card-body">
                                <h4 class="card-title">${title}</h4>
                                <blockquote class="blockquote mb-0">
                                    <p>${comment}</p>
                                    <footer class="text-end blockquote-footer font-italic"><i>${text}</i></footer>
                                </blockquote>
                            </div>
                        </div>
                    </div>`
    }


    reviewButton.addEventListener('click', () => {
        const title = reviewTitle.value;
        const text = reviewText.value;
        const comment =  reviewComment.value ? reviewComment.value : 'Anonymous';


        reviewsRow.insertAdjacentHTML('beforeend', createNewReview(title, text, comment));
    })
} ())