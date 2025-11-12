// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Movie data - mix of real and fictional movies
    const movies = [
        { id: 1, title: "O Último Portal", category: "scifi", year: 2023, rating: 4.2, image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDIwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiMwMDc3RkYiLz48dGV4dCB4PSIxMDAiIHk9IjE1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE2IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+Q2luZW1hIEltYWdlPC90ZXh0Pjwvc3ZnPg==", isOriginal: true },
        { id: 2, title: "Sombras do Amanhã", category: "drama", year: 2023, rating: 4.8, image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDIwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiMwMDc3RkYiLz48dGV4dCB4PSIxMDAiIHk9IjE1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE2IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+Q2luZW1hIEltYWdlPC90ZXh0Pjwvc3ZnPg==", isOriginal: true },
        { id: 3, title: "Aventuras no Espaço", category: "action", year: 2023, rating: 4.5, image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDIwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiMwMDc3RkYiLz48dGV4dCB4PSIxMDAiIHk9IjE1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE2IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+Q2luZW1hIEltYWdlPC90ZXh0Pjwvc3ZnPg==", isOriginal: true },
        { id: 4, title: "O Enigma do Tempo", category: "scifi", year: 2022, rating: 4.3, image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDIwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiMwMDc3RkYiLz48dGV4dCB4PSIxMDAiIHk9IjE1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE2IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+Q2luZW1hIEltYWdlPC90ZXh0Pjwvc3ZnPg==", isOriginal: true },
        { id: 5, title: "Risos à Meia-Noite", category: "comedy", year: 2022, rating: 4.0, image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDIwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiMwMDc3RkYiLz48dGV4dCB4PSIxMDAiIHk9IjE1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE2IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+Q2luZW1hIEltYWdlPC90ZXh0Pjwvc3ZnPg==", isOriginal: true },
        { id: 6, title: "O Destino de Helena", category: "drama", year: 2021, rating: 4.7, image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDIwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiMwMDc3RkYiLz48dGV4dCB4PSIxMDAiIHk9IjE1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE2IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+Q2luZW1hIEltYWdlPC90ZXh0Pjwvc3ZnPg==", isOriginal: true },
        { id: 7, title: "Stranger Things", category: "scifi", year: 2016, rating: 4.8, image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDIwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiMwMDc3RkYiLz48dGV4dCB4PSIxMDAiIHk9IjE1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE2IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+Q2luZW1hIEltYWdlPC90ZXh0Pjwvc3ZnPg==", isOriginal: false },
        { id: 8, title: "The Crown", category: "drama", year: 2016, rating: 4.6, image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDIwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiMwMDc3RkYiLz48dGV4dCB4PSIxMDAiIHk9IjE1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE2IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+Q2luZW1hIEltYWdlPC90ZXh0Pjwvc3ZnPg==", isOriginal: false },
        { id: 9, title: "Breaking Bad", category: "drama", year: 2008, rating: 4.9, image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDIwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiMwMDc3RkYiLz48dGV4dCB4PSIxMDAiIHk9IjE1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE2IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+Q2luZW1hIEltYWdlPC90ZXh0Pjwvc3ZnPg==", isOriginal: false },
        { id: 10, title: "The Witcher", category: "action", year: 2019, rating: 4.4, image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDIwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiMwMDc3RkYiLz48dGV4dCB4PSIxMDAiIHk9IjE1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE2IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+Q2luZW1hIEltYWdlPC90ZXh0Pjwvc3ZnPg==", isOriginal: false },
        { id: 11, title: "Friends", category: "comedy", year: 1994, rating: 4.7, image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDIwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiMwMDc3RkYiLz48dGV4dCB4PSIxMDAiIHk9IjE1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE2IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+Q2luZW1hIEltYWdlPC90ZXh0Pjwvc3ZnPg==", isOriginal: false },
        { id: 12, title: "The Mandalorian", category: "scifi", year: 2019, rating: 4.6, image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDIwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiMwMDc3RkYiLz48dGV4dCB4PSIxMDAiIHk9IjE1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE2IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+Q2luZW1hIEltYWdlPC90ZXh0Pjwvc3ZnPg==", isOriginal: false }
    ];

    // DOM Elements
    const moviesGrid = document.querySelector('.movies-grid');
    const tabButtons = document.querySelectorAll('.tab-btn');
    const modal = document.getElementById('trailerModal');
    const closeModal = document.querySelector('.close-modal');
    const modalTitle = document.getElementById('modalTitle');
    const playButtons = document.querySelectorAll('.btn-play');
    const contactForm = document.getElementById('contactForm');

    // Initialize the movie grid
    function initMovieGrid() {
        displayMovies(movies);
        
        // Add event listeners to category tabs
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                tabButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Filter movies based on category
                const category = this.getAttribute('data-category');
                filterMovies(category);
            });
        });
    }

    // Display movies in the grid
    function displayMovies(moviesToShow) {
        moviesGrid.innerHTML = '';
        
        moviesToShow.forEach(movie => {
            const movieElement = document.createElement('div');
            movieElement.className = 'movie-grid-item';
            movieElement.innerHTML = `
                <div class="movie-grid-image">
                    <img src="${movie.image}" alt="${movie.title}">
                </div>
                <div class="movie-grid-info">
                    <h4>${movie.title}</h4>
                    <p>${movie.year}</p>
                    <div class="movie-rating">
                        <span class="stars">${getStarRating(movie.rating)}</span>
                        <span>${movie.rating}</span>
                    </div>
                </div>
            `;
            
            // Add click event to open trailer modal
            movieElement.addEventListener('click', function() {
                openTrailerModal(movie.title);
            });
            
            moviesGrid.appendChild(movieElement);
        });
    }

    // Filter movies by category
    function filterMovies(category) {
        let filteredMovies;
        
        if (category === 'all') {
            filteredMovies = movies;
        } else if (category === 'originals') {
            filteredMovies = movies.filter(movie => movie.isOriginal);
        } else {
            filteredMovies = movies.filter(movie => movie.category === category);
        }
        
        displayMovies(filteredMovies);
    }

    // Convert numeric rating to star representation
    function getStarRating(rating) {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
        
        return '★'.repeat(fullStars) + (halfStar ? '½' : '') + '☆'.repeat(emptyStars);
    }

    // Open trailer modal
    function openTrailerModal(title) {
        modalTitle.textContent = `Trailer: ${title}`;
        modal.style.display = 'flex';
        
        // Add animation class
        setTimeout(() => {
            document.querySelector('.modal-content').classList.add('show');
        }, 10);
    }

    // Close modal
    function closeTrailerModal() {
        document.querySelector('.modal-content').classList.remove('show');
        
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }

    // Handle form submission
    function handleFormSubmit(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Simple validation
        if (name && email && message) {
            alert(`Obrigado, ${name}! Sua mensagem foi enviada com sucesso. Entraremos em contato em breve.`);
            contactForm.reset();
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    }

    // Navbar scroll effect
    function handleNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        
        if (window.scrollY > 100) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.backgroundColor = 'var(--white)';
            navbar.style.backdropFilter = 'none';
        }
    }

    // Initialize all functionality
    function init() {
        initMovieGrid();
        
        // Event listeners
        closeModal.addEventListener('click', closeTrailerModal);
        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeTrailerModal();
            }
        });
        
        contactForm.addEventListener('submit', handleFormSubmit);
        
        window.addEventListener('scroll', handleNavbarScroll);
        
        // Add click events to play buttons in featured section
        document.querySelectorAll('.featured-item .btn-play').forEach(button => {
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                const movieTitle = this.closest('.movie-card').querySelector('h3').textContent;
                openTrailerModal(movieTitle);
            });
        });
        
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Initialize the application
    init();
});
