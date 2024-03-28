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
                <div class="name">
                    <h2>${personnage.name}</h2>
                </div>
                <div class="stat">
                    <span>status : ${personnage.status}</span>
                    <span>gender : ${personnage.gender}</span>
                    <span>species :${personnage.species}</span>
                </div>
            `;

            const main = document.querySelector("main");
            main.appendChild(article);

            // Ajout de la logique pour le modal
            const modal = document.createElement('div');
            modal.classList.add('modal');
            modal.innerHTML = `
                <div class="wrapper">
                    <div class="modal-content">
                        <div class="image-container">  
                            <img src="${personnage.image}" alt="personnage">      
                        </div>
                        <h2>${personnage.name}</h2>
                        <div class="stat-modale">
                         <span>origin : ${personnage.origin.name}</span>
                         <span>location : ${personnage.location.name}</span>
                         <span>episodes : ${personnage.episode.length}</span>
                         <span class="close">&times;</span>
                        </div>
                    </div>
                </div>
            `;
            main.appendChild(modal); // Ajout du modal à la fin de main

            // Logique d'ouverture/fermeture du modal
            const openModalBtn = article;
            const closeModalBtn = modal.querySelector('.close');

            openModalBtn.addEventListener('click', () => {
                modal.style.display = 'flex';
                modal.style.justifyContent = 'center';
            });

            closeModalBtn.addEventListener('click', () => {
                modal.style.display = 'none';
            });

            // Fermer le modal en cliquant en dehors
            const modalbox = document.querySelectorAll('.modal'); // Assuming modal is a single element

            modalbox.forEach(modal => {
                modal.addEventListener('click', closeModal);
            });

            function closeModal(event) {
                // Access the modal that was clicked
                const clickedModal = event.currentTarget;

                // Hide the clicked modal
                clickedModal.style.display = 'none';
            }
        });
    });
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function getRandomCharacters(done) {
    const totalCharacters = 826; // Nombre total de personnages dans l'API
    const charactersPerPage = 20; // Nombre de personnages par page dans l'API
    const totalPages = 42; // Nombre total de pages

    // Liste pour stocker tous les personnages
    let allCharacters = [];

    // Parcourir toutes les pages
    for (let page = 1; page <= totalPages; page++) {
        try {
            const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`);
            const data = await response.json();
            allCharacters = allCharacters.concat(data.results); // Ajouter les personnages de la page à la liste
        } catch (error) {
            console.error("Une erreur s'est produite lors de la récupération des personnages de la page", page, ":", error);
        }
    }

    // Sélectionner aléatoirement 12 personnages parmi tous les personnages récupérés
    const selectedCharacters = [];
    while (selectedCharacters.length < 12 && allCharacters.length > 0) {
        const randomIndex = Math.floor(Math.random() * allCharacters.length);
        const randomCharacter = allCharacters.splice(randomIndex, 1)[0]; // Retirer le personnage sélectionné de la liste
        selectedCharacters.push(randomCharacter);
    }

    done(selectedCharacters);
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
                <div class="stat">
                    <span>status : ${personnage.status}</span>
                    <span>gender : ${personnage.gender}</span>
                    <span>species :${personnage.species}</span>
                </div>
            `);
            article.appendChild(articleContent);
            main.appendChild(article);

            // Créer le modal
            const modal = document.createElement('div');
            modal.classList.add('modal'); // Ajoutez la classe modal au modal
            modal.innerHTML = `
            <div class="wrapper">
            <div class="modal-content">
                <div class="image-container">  
                    <img src="${personnage.image}" alt="personnage">      
                        </div>
                         <h2>${personnage.name}</h2>
                         <div class="stat-modale">
                         <span>origin : ${personnage.origin.name}</span>
                         <span>location : ${personnage.location.name}</span>
                         <span>episodes : ${personnage.episode.length}</span>
                         <span class="close">&times;</span>
                        </div>
                </div>
          <div>
            `;
            main.appendChild(modal);

            // Logique d'ouverture/fermeture du modal
            const openModalBtn = article;
            const closeModalBtn = modal.querySelector('.close');

            openModalBtn.addEventListener('click', () => {
                modal.style.display = 'flex';
                modal.style.justifyContent = 'center';
            });

            closeModalBtn.addEventListener('click', () => {
                modal.style.display = 'none';
            });

            // Fermer le modal en cliquant en dehors
            const modalbox = document.querySelectorAll('.modal'); // Assuming modal is a single element

            modalbox.forEach(modal => {
                modal.addEventListener('click', closeModal);
            });

            function closeModal(event) {
                // Access the modal that was clicked
                const clickedModal = event.currentTarget;

                // Hide the clicked modal
                clickedModal.style.display = 'none';
            }
        });
    });
};
    


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
                <div class="stat">
                    <span>status : ${personnage.status}</span>
                    <span>gender : ${personnage.gender}</span>
                    <span>species :${personnage.species}</span>
                </div>
            `);
            article.appendChild(articleContent);
            main.appendChild(article);

            // Créer le modal
            const modal = document.createElement('div');
            modal.classList.add('modal'); // Ajoutez la classe modal au modal
            modal.innerHTML = `
            <div class="wrapper">
            <div class="modal-content">
                <div class="image-container">  
                    <img src="${personnage.image}" alt="personnage">      
                        </div>
                         <h2>${personnage.name}</h2>
                         <div class="stat-modale">
                         <span>origin : ${personnage.origin.name}</span>
                         <span>location : ${personnage.location.name}</span>
                         <span>episodes : ${personnage.episode.length}</span>
                         <span class="close">&times;</span>
                        </div>
                </div>
          <div>
            `;
            main.appendChild(modal);

            // Logique d'ouverture/fermeture du modal
            const openModalBtn = article;
            const closeModalBtn = modal.querySelector('.close');

            openModalBtn.addEventListener('click', () => {
                modal.style.display = 'flex';
                modal.style.justifyContent = 'center';
            });

            closeModalBtn.addEventListener('click', () => {
                modal.style.display = 'none';
            });

            // Fermer le modal en cliquant en dehors
            const modalbox = document.querySelectorAll('.modal'); // Assuming modal is a single element

            modalbox.forEach(modal => {
                modal.addEventListener('click', closeModal);
            });

            function closeModal(event) {
                // Access the modal that was clicked
                const clickedModal = event.currentTarget;

                // Hide the clicked modal
                clickedModal.style.display = 'none';
            }
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
                <div class="stat">
                 <span>status : ${personnage.status}</span>
                 <span>gender : ${personnage.gender}</span>
                 <span>species :${personnage.species}</span>
                </div>
            `);
            article.appendChild(articleContent);
            main.appendChild(article);

            // Créer le modal
            const modal = document.createElement('div');
            modal.classList.add('modal'); // Ajoutez la classe modal au modal
            modal.innerHTML = `
            <div class="wrapper">
            <div class="modal-content">
                <div class="image-container">  
                    <img src="${personnage.image}" alt="personnage">      
                        </div>
                         <h2>${personnage.name}</h2>
                         <div class="stat-modale">
                         <span>origin : ${personnage.origin.name}</span>
                         <span>location : ${personnage.location.name}</span>
                         <span>episodes : ${personnage.episode.length}</span>
                         <span class="close">&times;</span>
                        </div>
                </div>
          <div>
            `;
            main.appendChild(modal);

            // Logique d'ouverture/fermeture du modal
            const openModalBtn = article;
            const closeModalBtn = modal.querySelector('.close');

            openModalBtn.addEventListener('click', () => {
                modal.style.display = 'flex';
                modal.style.justifyContent = 'center';
            });

            closeModalBtn.addEventListener('click', () => {
                modal.style.display = 'none';
            });

            // Fermer le modal en cliquant en dehors
            const modalbox = document.querySelectorAll('.modal'); // Assuming modal is a single element

            modalbox.forEach(modal => {
                modal.addEventListener('click', closeModal);
            });

            function closeModal(event) {
                // Access the modal that was clicked
                const clickedModal = event.currentTarget;

                // Hide the clicked modal
                clickedModal.style.display = 'none';
            }
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
                <div class="stat">
                 <span>status : ${personnage.status}</span>
                 <span>gender : ${personnage.gender}</span>
                 <span>species :${personnage.species}</span>
                </div>
            `);
            article.appendChild(articleContent);
            main.appendChild(article);

            // Créer le modal
            const modal = document.createElement('div');
            modal.classList.add('modal'); // Ajoutez la classe modal au modal
            modal.innerHTML = `
            <div class="wrapper">
            <div class="modal-content">
                <div class="image-container">  
                    <img src="${personnage.image}" alt="personnage">      
                        </div>
                         <h2>${personnage.name}</h2>
                         <div class="stat-modale">
                         <span>origin : ${personnage.origin.name}</span>
                         <span>location :${personnage.location.name}</span>
                         <span>episodes : ${personnage.episode.length}</span>
                         <span class="close">&times;</span>
                        </div>
                </div>
          <div>
            `;
            main.appendChild(modal);

            // Logique d'ouverture/fermeture du modal
            const openModalBtn = article;
            const closeModalBtn = modal.querySelector('.close');

            openModalBtn.addEventListener('click', () => {
                modal.style.display = 'flex';
                modal.style.justifyContent = 'center';
            });

            closeModalBtn.addEventListener('click', () => {
                modal.style.display = 'none';
            });

            // Fermer le modal en cliquant en dehors
            const modalbox = document.querySelectorAll('.modal'); // Assuming modal is a single element

            modalbox.forEach(modal => {
                modal.addEventListener('click', closeModal);
            });

            function closeModal(event) {
                // Access the modal that was clicked
                const clickedModal = event.currentTarget;

                // Hide the clicked modal
                clickedModal.style.display = 'none';
            }
        });
    });
}

const randomUnknownCharactersButton = document.getElementById("randomUnknownCharactersButton");
randomUnknownCharactersButton.addEventListener("click", handleRandomUnknownCharactersButtonClick);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

