document.getElementById('search-button').addEventListener('click', function () {
    const query = document.getElementById('search-box').value.toLowerCase();
    const resultContainer = document.getElementById('result');

    resultContainer.innerHTML = '';

    fetch('https://ghibliapi.vercel.app/films')
        .then(response => response.json())
        .then(data => {
            const filteredMovies = data.filter(movie =>
                movie.title.toLowerCase().includes(query) ||
                movie.description.toLowerCase().includes(query)
            );

            if (filteredMovies.length > 0) {
                filteredMovies.forEach(movie => {
                    const movieCard = document.createElement('div');
                    movieCard.classList.add('movie-card');

                    movieCard.innerHTML = `
                        <h2 class="movie-title">${movie.title}</h2>
                        <p class="movie-description">${movie.description}</p>
                        <p><strong>Director:</strong> ${movie.director}</p>
                        <p><strong>Release Date:</strong> ${movie.release_date}</p>
                    `;

                    resultContainer.appendChild(movieCard);
                });
            } else {
                resultContainer.innerHTML = '<p>No movies found.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            resultContainer.innerHTML = '<p>Failed to fetch data. Please try again later.</p>';
        });
});