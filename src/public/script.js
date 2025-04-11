document.addEventListener("DOMContentLoaded", () => {
    const editButtons = document.querySelectorAll(".edit-movie");
    const popup = document.getElementById("editPopup");
    const form = document.getElementById("editForm");

    const cancelBtn = document.getElementById("cancelEditBtn");

    editButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Uzupełnianie formularza
            form.elements["id"].value = button.dataset.id;
            form.elements["title"].value = button.dataset.title;
            form.elements["vote_average"].value = button.dataset.vote;
            form.elements["popularity"].value = button.dataset.popularity;
            form.elements["adult"].value = button.dataset.adult;
            form.elements["release_date"].value = button.dataset.release;

            popup.classList.remove("hidden");
            popup.classList.add("active");
        });
    });

    cancelBtn.addEventListener("click", () => {
        popup.classList.remove("active");
    });
});

const addForm = document.getElementById('addRecipeForm');
if (addForm) {
    addForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(addForm);

        fetch('/add', {
            method: 'POST',
            body: formData
        })
            .then(response => response.text())
            .then(data => {
                console.log(data);
                alert(data);
                window.location.href = '/';
            })
            .catch(error => {
                console.error('ERROR - POST /add:', error);
            });
    });
}

const modifyForm = document.getElementById('addRecipeForm');
if (modifyForm) {
    addForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(modifyform);

        fetch('/add', {
            method: 'POST',
            body: formData
        })
            .then(response => response.text())
            .then(data => {
                console.log(data);
                alert(data);
                window.location.href = '/';
            })
            .catch(error => {
                console.error('ERROR - POST /add:', error);
            });
    });
}

document.querySelectorAll('.delete-movie').forEach(button => {
    button.addEventListener('click', function (event) {
        event.preventDefault();

        const movieId = this.getAttribute('href').split('/').pop();

        fetch('/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: movieId }),
        })
            .then(response => response.text())
            .then(data => {
                console.log(data);
                alert(data);
                window.location.reload();
            })
            .catch(err => {
                console.error('ERROR - POST /delete:', err);
            });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const itemsPerPage = 6;
    const articles = Array.from(document.querySelectorAll('article.movie'));
    const paginationContainer = document.getElementById('pagination');
    let currentPage = 1;
    const totalPages = Math.ceil(articles.length / itemsPerPage);

    function showPage(page) {
        articles.forEach((article, index) => {
            article.classList.toggle('hidden', !(index >= (page - 1) * itemsPerPage && index < page * itemsPerPage));
        });
        renderPaginationButtons(page);
    }

    function renderPaginationButtons(page) {
        paginationContainer.innerHTML = '';

        for (let i = 1; i <= totalPages; i++) {
            const btn = document.createElement('button');
            btn.textContent = i;
            btn.classList.add('pagination-btn');
            if (i === page) {
                btn.classList.add('active');
            }

            btn.addEventListener('click', () => {
                currentPage = i;
                showPage(currentPage);
            });

            paginationContainer.appendChild(btn);
        }
    }

    if (articles.length > 0) {
        showPage(currentPage);
    }
});