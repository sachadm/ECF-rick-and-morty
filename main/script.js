// fonction pour afficher les 12 premiers personnages de la liste au lancement de la page et créer les cartes dans mon html//
function getCharacters(done) {
    const results = fetch("https://rickandmortyapi.com/api/character");

    results
        .then(response => response.json())
        .then(data => {
            done(data)
        });
}

document.addEventListener('DOMContentLoaded', () => {
    getCharacters(data => {
        console.log(data);
        data.results.slice(0, 12).forEach(personnage => {
            const article = document.createElement('article');
            article.classList.add('carte');

            article.innerHTML = `
                <div class="image-container">  
                    <img src="${personnage.image}" alt="personnage">      
                </div>
                <h2>${personnage.name}</h2>
                <span>${personnage.status}</span>
                <span>${personnage.gender}</span>
                <span>${personnage.species}</span>
            `;

            const main = document.querySelector("main");
            main.appendChild(article);

            // Ajout de la logique pour le modal
            const modal = document.createElement('div');
            modal.classList.add('modal');
            modal.innerHTML = `
                <div class="modal-content">
                    <div class="image-container">  
                        <img src="${personnage.image}" alt="personnage">      
                    </div>
                    <h2>${personnage.name}</h2>
                    <span>${personnage.origin.name}</span>
                    <span>${personnage.location.name}</span>
                    <span>${personnage.episode.name}</span>
                    <span class="close">&times;</span>
                </div>
            `;
            article.appendChild(modal);
        });

        // Logique d'ouverture/fermeture du modal
        const openModalBtns = document.querySelectorAll('.carte');
        const closeBtns = document.querySelectorAll('.close');

        openModalBtns.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                const modals = document.querySelectorAll('.modal');
                modals[index].style.display = 'block';
            });
        });

        closeBtns.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                const modals = document.querySelectorAll('.modal');
                modals[index].style.display = 'none';
            });
        });

        window.addEventListener('click', (event) => {
            const modals = document.querySelectorAll('.modal');
            modals.forEach(modal => {
                if (event.target === modal) {
                    modal.style.display = 'none';
                }
            });
        });
    });
});


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// fonction pour afficher 12 personnages aléatoire //
async function getRandomCharacters(done) {
    const totalCharacters = 826; // Nombre total de personnages dans l'API
    const charactersPerPage = 12; // Nombre de personnages par page dans l'API
    const totalPages = 42; // Nombre total de pages

    const randomPage = Math.floor(Math.random() * totalPages) + 1; // Sélectionne une page aléatoire

    try {
        const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${randomPage}`);
        const data = await response.json();
        const allCharacters = data.results;

        // Sélectionne aléatoirement 12 personnages parmi ceux de la page sélectionnée
        const selectedCharacters = [];
        while (selectedCharacters.length < 12) {
            const randomIndex = Math.floor(Math.random() * allCharacters.length);
            const randomCharacter = allCharacters[randomIndex];
            if (!selectedCharacters.some(character => character.id === randomCharacter.id)) {
                selectedCharacters.push(randomCharacter);
            }
        }

        done(selectedCharacters);
    } catch (error) {
        console.error("Une erreur s'est produite lors de la récupération des personnages :", error);
    }
}

// fonction pour créer les cartes dans mon html//
function handleRandomCharactersButtonClick() {
    const main = document.querySelector("main");
    main.innerHTML = '';

    getRandomCharacters(data => {
        console.log(data);

        data.forEach(personnage => {
            const article = document.createElement('article');
            article.classList.add('carte'); // Ajoutez la classe carte à l'article

            const articleContent = document.createRange().createContextualFragment(/*html*/`
                <div class="image-container">  
                    <img src="${personnage.image}" alt="${personnage.name}">      
                </div>
                <h2>${personnage.name}</h2>
                <span>${personnage.status}</span>
            `);
            article.appendChild(articleContent);
            main.appendChild(article);

            // Créer le modal
            const modal = document.createElement('div');
            modal.classList.add('modal'); // Ajoutez la classe modal au modal
            modal.innerHTML = `
                <div class="modal-content">
                    <div class="image-container">  
                        <img src="${personnage.image}" alt="personnage">      
                    </div>
                    <h2>${personnage.name}</h2>
                    <span>${personnage.origin.name}</span>
                    <span>${personnage.location.name}</span>
                    <span>${personnage.episode.name}</span>
                    <span class="close">&times;</span>
                </div>
            `;
            main.appendChild(modal);

            // Logique d'ouverture/fermeture du modal
            article.addEventListener('click', () => {
                modal.style.display = 'block';
            });

            const closeBtn = modal.querySelector('.close'); // Sélecteur unique pour le bouton de fermeture
            closeBtn.addEventListener('click', () => {
                modal.style.display = 'none';
            });

            window.addEventListener('click', (event) => {
                if (event.target === modal) {
                    modal.style.display = 'none';
                }
            });
        });
    });
}

const randomCharactersButton = document.getElementById("randomCharactersButton");
randomCharactersButton.addEventListener("click", handleRandomCharactersButtonClick);


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// fonction pour afficher 12 personnages vivant aléatoire //

async function getRandomAliveCharacters(done) {
    const totalCharacters = 826; // Nombre total de personnages dans l'API
    const charactersPerPage = 12; // Nombre de personnages par page dans l'API
    const totalPages = 42; // Nombre total de pages

    const aliveCharacters = []; // Stocker les personnages avec le statut "Alive"

    // Parcourir toutes les pages de l'API
    for (let page = 1; page <= totalPages; page++) {
        try {
            const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`);
            const data = await response.json();

            // Filtrer les personnages avec le statut "Alive" de la page actuelle
            const aliveCharactersPage = data.results.filter(character => character.status === "Alive");
            aliveCharacters.push(...aliveCharactersPage);
        } catch (error) {
            console.error("Une erreur s'est produite lors de la récupération des personnages :", error);
        }
    }

    // Sélectionner aléatoirement 12 personnages avec le statut "Alive" parmi ceux récupérés
    const selectedAliveCharacters = [];
    while (selectedAliveCharacters.length < 12 && aliveCharacters.length > 0) {
        const randomIndex = Math.floor(Math.random() * aliveCharacters.length);
        const randomCharacter = aliveCharacters.splice(randomIndex, 1)[0]; // Retirer le personnage sélectionné de la liste pour éviter les doublons
        selectedAliveCharacters.push(randomCharacter);
    }

    done(selectedAliveCharacters);
}

// fonction pour créer les cartes dans mon html//
function handleRandomAliveCharactersButtonClick() {
    const main = document.querySelector("main");
    main.innerHTML = '';

    getRandomAliveCharacters(data => {
        console.log(data);

        data.forEach(personnage => {
            const article = document.createElement('article');
            article.classList.add('carte'); // Ajoutez la classe carte à l'article

            const articleContent = document.createRange().createContextualFragment(/*html*/`
                <div class="image-container">  
                    <img src="${personnage.image}" alt="${personnage.name}">      
                </div>
                <h2>${personnage.name}</h2>
                <span>${personnage.status}</span>
            `);
            article.appendChild(articleContent);
            main.appendChild(article);

            // Créer le modal
            const modal = document.createElement('div');
            modal.classList.add('modal'); // Ajoutez la classe modal au modal
            modal.innerHTML = `
                <div class="modal-content">
                    <div class="image-container">  
                        <img src="${personnage.image}" alt="personnage">      
                    </div>
                    <h2>${personnage.name}</h2>
                    <span>${personnage.origin.name}</span>
                    <span>${personnage.location.name}</span>
                    <span>${personnage.episode.name}</span>
                    <span class="close">&times;</span>
                </div>
            `;
            main.appendChild(modal);

            // Logique d'ouverture/fermeture du modal
            article.addEventListener('click', () => {
                modal.style.display = 'block';
            });

            const closeBtn = modal.querySelector('.close'); // Sélecteur unique pour le bouton de fermeture
            closeBtn.addEventListener('click', () => {
                modal.style.display = 'none';
            });

            window.addEventListener('click', (event) => {
                if (event.target === modal) {
                    modal.style.display = 'none';
                }
            });
        });
    });
}

const randomAliveCharactersButton = document.getElementById("randomAliveCharactersButton");
randomAliveCharactersButton.addEventListener("click", handleRandomAliveCharactersButtonClick);


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// fonction pour afficher 12 personnages mort aléatoire //

async function getRandomDeadCharacters(done) {
    const totalCharacters = 826; // Nombre total de personnages dans l'API
    const charactersPerPage = 12; // Nombre de personnages par page dans l'API
    const totalPages = 42; // Nombre total de pages

    const deadCharacters = []; // Stocker les personnages avec le statut "Dead"

    // Parcourir toutes les pages de l'API
    for (let page = 1; page <= totalPages; page++) {
        try {
            const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`);
            const data = await response.json();

            // Filtrer les personnages avec le statut "Dead" de la page actuelle
            const deadCharactersPage = data.results.filter(character => character.status === "Dead");
            deadCharacters.push(...deadCharactersPage);
        } catch (error) {
            console.error("Une erreur s'est produite lors de la récupération des personnages :", error);
        }
    }

    // Sélectionner aléatoirement 12 personnages avec le statut "Dead" parmi ceux récupérés
    const selectedDeadCharacters = [];
    while (selectedDeadCharacters.length < 12 && deadCharacters.length > 0) {
        const randomIndex = Math.floor(Math.random() * deadCharacters.length);
        const randomCharacter = deadCharacters.splice(randomIndex, 1)[0]; // Retirer le personnage sélectionné de la liste pour éviter les doublons
        selectedDeadCharacters.push(randomCharacter);
    }

    done(selectedDeadCharacters);
}

// fonction pour créer les cartes dans mon html//
function handleRandomDeadCharactersButtonClick() {
    const main = document.querySelector("main");
    main.innerHTML = '';

    getRandomDeadCharacters(data => {
        console.log(data);

        data.forEach(personnage => {
            const article = document.createElement('article');
            article.classList.add('carte'); // Ajoutez la classe carte à l'article

            const articleContent = document.createRange().createContextualFragment(/*html*/`
                <div class="image-container">  
                    <img src="${personnage.image}" alt="${personnage.name}">      
                </div>
                <h2>${personnage.name}</h2>
                <span>${personnage.status}</span>
            `);
            article.appendChild(articleContent);
            main.appendChild(article);

            // Créer le modal
            const modal = document.createElement('div');
            modal.classList.add('modal'); // Ajoutez la classe modal au modal
            modal.innerHTML = `
                <div class="modal-content">
                    <div class="image-container">  
                        <img src="${personnage.image}" alt="personnage">      
                    </div>
                    <h2>${personnage.name}</h2>
                    <span>${personnage.origin.name}</span>
                    <span>${personnage.location.name}</span>
                    <span>${personnage.episode.name}</span>
                    <span class="close">&times;</span>
                </div>
            `;
            main.appendChild(modal);

            // Logique d'ouverture/fermeture du modal
            article.addEventListener('click', () => {
                modal.style.display = 'block';
            });

            const closeBtn = modal.querySelector('.close'); // Sélecteur unique pour le bouton de fermeture
            closeBtn.addEventListener('click', () => {
                modal.style.display = 'none';
            });

            window.addEventListener('click', (event) => {
                if (event.target === modal) {
                    modal.style.display = 'none';
                }
            });
        });
    });
}

const randomDeadCharactersButton = document.getElementById("randomDeadCharactersButton");
randomDeadCharactersButton.addEventListener("click", handleRandomDeadCharactersButtonClick);


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// fonction pour faire apparaitre aléatoirement 12 personnages au statut unknown //

async function getRandomUnknownCharacters(done) {
    const totalCharacters = 826; // Nombre total de personnages dans l'API
    const charactersPerPage = 12; // Nombre de personnages par page dans l'API
    const totalPages = 42; // Nombre total de pages

    const unknownCharacters = []; // Stocker les personnages avec le statut "unknown"

    // Parcourir toutes les pages de l'API
    for (let page = 1; page <= totalPages; page++) {
        try {
            const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`);
            const data = await response.json();

            // Filtrer les personnages avec le statut "unknown" de la page actuelle
            const unknownCharactersPage = data.results.filter(character => character.status === "unknown");
            unknownCharacters.push(...unknownCharactersPage);
        } catch (error) {
            console.error("Une erreur s'est produite lors de la récupération des personnages :", error);
        }
    }

    // Sélectionner aléatoirement 12 personnages avec le statut "unknown" parmi ceux récupérés
    const selectedUnknownCharacters = [];
    while (selectedUnknownCharacters.length < 12 && unknownCharacters.length > 0) {
        const randomIndex = Math.floor(Math.random() * unknownCharacters.length);
        const randomCharacter = unknownCharacters.splice(randomIndex, 1)[0]; // Retirer le personnage sélectionné de la liste pour éviter les doublons
        selectedUnknownCharacters.push(randomCharacter);
    }

    done(selectedUnknownCharacters);
}

// fonction pour créer les cartes dans mon html//
function handleRandomUnknownCharactersButtonClick() {
    const main = document.querySelector("main");
    main.innerHTML = '';

    getRandomUnknownCharacters(data => {
        console.log(data);

        data.forEach(personnage => {
            const article = document.createElement('article');
            article.classList.add('carte'); // Ajoutez la classe carte à l'article

            const articleContent = document.createRange().createContextualFragment(/*html*/`
                <div class="image-container">  
                    <img src="${personnage.image}" alt="${personnage.name}">      
                </div>
                <h2>${personnage.name}</h2>
                <span>${personnage.status}</span>
            `);
            article.appendChild(articleContent);
            main.appendChild(article);

            // Créer le modal
            const modal = document.createElement('div');
            modal.classList.add('modal'); // Ajoutez la classe modal au modal
            modal.innerHTML = `
                <div class="modal-content">
                    <div class="image-container">  
                        <img src="${personnage.image}" alt="personnage">      
                    </div>
                    <h2>${personnage.name}</h2>
                    <span>${personnage.origin.name}</span>
                    <span>${personnage.location.name}</span>
                    <span>${personnage.episode.name}</span>
                    <span class="close">&times;</span>
                </div>
            `;
            main.appendChild(modal);

            // Logique d'ouverture/fermeture du modal
            article.addEventListener('click', () => {
                modal.style.display = 'block';
            });

            const closeBtn = modal.querySelector('.close'); // Sélecteur unique pour le bouton de fermeture
            closeBtn.addEventListener('click', () => {
                modal.style.display = 'none';
            });

            window.addEventListener('click', (event) => {
                if (event.target === modal) {
                    modal.style.display = 'none';
                }
            });
        });
    });
}

const randomUnknownCharactersButton = document.getElementById("randomUnknownCharactersButton");
randomUnknownCharactersButton.addEventListener("click", handleRandomUnknownCharactersButtonClick);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementsByClassName('modal')[0]; // Assuming there's only one modal
    const openModalBtns = document.getElementsByClassName('carte');
    const closeModalBtn = document.getElementsByClassName('close')[0];
  
    // Add event listeners to each open modal button
    for (let i = 0; i < openModalBtns.length; i++) {
      openModalBtns[i].addEventListener('click', () => {
        modal.style.display = 'block';
      });
    }
  
    if (closeModalBtn) { // Check if closeModalBtn is not undefined
      closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
      });
    }
  
    window.addEventListener('click', (event) => {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });
  });