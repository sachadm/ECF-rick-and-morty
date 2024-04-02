// fThis JavaScript function getCharacters fetches data from the Rick and Morty API //
// and then calls the done callback function with the retrieved data. //
function getCharacters(done) {
    const results = fetch("https://rickandmortyapi.com/api/character");

    results
        .then(response => response.json())
        .then(data => {
            done(data)
        });
}


document.addEventListener('DOMContentLoaded', () => {
    animateImages(); // Call animateImages() before retrieving the characters //
    getCharacters(data => {
        console.log(data); // show the data of the getCharacters function //
        // forEach on the first 12 characters //
        data.results.slice(0, 12).forEach(personnage => {
            const article = document.createElement('article'); // article created using document.createElement('article') //
            article.classList.add('carte'); // add the class "carte" to the created element //

            article.innerHTML = `
                <div class="image-container">  
                    <img src="${personnage.image}" alt="personnage" class="chara-img">      
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

            // Added logic for modal //
            const modal = document.createElement('div');
            modal.classList.add('modal');
            modal.innerHTML = `
                <div class="wrapper">
                    <div class="modal-content">
                        <div class="image-container">  
                            <img src="${personnage.image}" alt="personnage" class="chara-img">      
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
            main.appendChild(modal); // adding the modal in the main section //

            // opening and closing logic for the modal //
            const openModalBtn = article;
            const closeModalBtn = modal.querySelector('.close');

            // open the modal when you click on her //
            openModalBtn.addEventListener('click', () => {
                modal.style.display = 'flex';
                modal.style.justifyContent = 'center';
            });
            // close the modal when clickinf the close button //
            closeModalBtn.addEventListener('click', () => {
                modal.style.display = 'none';
            });


            const modalbox = document.querySelectorAll('.modal'); // Assuming modal is a single element //
            // add an event listener to each modal //
            modalbox.forEach(modal => {
                modal.addEventListener('click', closeModal);
            });

            function closeModal(event) {
                // Access the modal that was clicked //
                const clickedModal = event.currentTarget;

                // Hide the clicked modal //
                clickedModal.style.display = 'none';
            }
        });
        function animateImages() {
            var animationContainer = document.getElementById('animationContainer');
            var images = animationContainer.getElementsByTagName('img');
            var currentIndex = 0;

            // set the container display to block when the function is executed //
            animationContainer.style.display = 'block';
            // this function hide all the frames of the animation //
            function hideAllImages() {
                for (var i = 0; i < images.length; i++) {
                    images[i].style.display = 'none';
                }
            }

            // this function show a specific image in the index hide the others //
            function showNextImage() {
                if (currentIndex < images.length) {
                    hideAllImages(); // this function hide all the frames of the animation //
                    images[currentIndex].style.display = 'block'; //set the display of the current image to block to make her visible //
                    currentIndex++;
                    setTimeout(showNextImage, 100); // set the timer between the images (in millisecond) //

                } else {
                    // reset the index and hide all the images when the loop is done //

                    currentIndex = 0;
                    hideAllImages();
                    animationContainer.style.display = 'none'; // set the display of the container to none when finished //
                }
            }

            showNextImage();
        }
    });
});



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Function to display 12 random characters //

async function getRandomCharacters(done) {
    const totalCharacters = 826; // Total number of characters in the API // 
    const charactersPerPage = 20; // Total number of characters per page in the API //
    const totalPages = 42; // Total number of pages //

    // variable to keep all characters //
    let allCharacters = [];

    // browse all pages of the API //
    for (let page = 1; page <= totalPages; page++) {
        try {
            const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`);
            const data = await response.json();
            allCharacters = allCharacters.concat(data.results); // add the characters at the end of the variable //
        } catch (error) {
            console.error("Une erreur s'est produite lors de la récupération des personnages de la page", page, ":", error);
        }
    }

    // randomly select 12 characters in all of those added to the var //
    const selectedCharacters = [];
    while (selectedCharacters.length < 12 && allCharacters.length > 0) {
        const randomIndex = Math.floor(Math.random() * allCharacters.length);
        const randomCharacter = allCharacters.splice(randomIndex, 1)[0]; // Remove the selected character from the list //
        selectedCharacters.push(randomCharacter);
    }

    done(selectedCharacters);
}

// function to create my cards in html //
function handleRandomCharactersButtonClick() {
    const main = document.querySelector("main");
    main.innerHTML = '';

    getRandomCharacters(data => {
        console.log(data);

        data.forEach(personnage => {
            const article = document.createElement('article');
            article.classList.add('carte'); // add the class "carte" to the article //

            // create an html element //
            const articleContent = document.createRange().createContextualFragment(/*html*/`
                <div class="image-container">  
                    <img src="${personnage.image}" alt="${personnage.name}" class="chara-img">      
                </div>
                <h2>${personnage.name}</h2>
                <div class="stat">
                    <span>status : ${personnage.status}</span>
                    <span>gender : ${personnage.gender}</span>
                    <span>species :${personnage.species}</span>
                </div>
            `);
            article.appendChild(articleContent); // add it to the article we created before // 
            main.appendChild(article);

            // create the modal in html using js //
            const modal = document.createElement('div');
            modal.classList.add('modal'); // add the class "modal" to the modal //
            modal.innerHTML = `
            <div class="wrapper"> 
            <div class="modal-content">
                <div class="image-container">  
                    <img src="${personnage.image}" alt="personnage" class="chara-img">      
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

            // opening and closing logic for the modal //
            const openModalBtn = article;
            const closeModalBtn = modal.querySelector('.close');

            openModalBtn.addEventListener('click', () => {
                modal.style.display = 'flex';
                modal.style.justifyContent = 'center';
            });

            closeModalBtn.addEventListener('click', () => {
                modal.style.display = 'none';
            });

            // closing the modal when clicking outside of her //
            const modalbox = document.querySelectorAll('.modal'); // Assuming modal is a single element
            // add an event listener with the function closeModal on each modal //
            modalbox.forEach(modal => {
                modal.addEventListener('click', closeModal);
            });
            // function to close the modal when clicking outside 
            function closeModal(event) {
                // Access the modal that was clicked
                const clickedModal = event.currentTarget;

                // Hide the clicked modal
                clickedModal.style.display = 'none';
            }
        });
    });
};

function animateImages() {
    var animationContainer = document.getElementById('animationContainer');
    var images = animationContainer.getElementsByTagName('img');
    var currentIndex = 0;

    // set the container display to block when the function is executed //
    animationContainer.style.display = 'block';
    // this function hide all the frames of the animation //
    function hideAllImages() {
        for (var i = 0; i < images.length; i++) {
            images[i].style.display = 'none';
        }
    }

    // this function show a specific image in the index hide the others //
    function showNextImage() {
        if (currentIndex < images.length) {
            hideAllImages(); // this function hide all the frames of the animation //
            images[currentIndex].style.display = 'block'; //set the display of the current image to block to make her visible //
            currentIndex++;
            setTimeout(showNextImage, 100); // set the timer between the images (in millisecond) //

        } else {
            // reset the index and hide all the images when the loop is done //

            currentIndex = 0;
            hideAllImages();
            animationContainer.style.display = 'none'; // set the display of the container to none when finished //
        }
    }

    showNextImage();
}

const randomCharactersButton = document.getElementById("randomCharactersButton");
randomCharactersButton.addEventListener("click", () => {
    handleRandomCharactersButtonClick();
    animateImages(); // Vous appelez simplement la fonction ici
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Function to randomly display 12 "alive" characters //

async function getRandomAliveCharacters(done) {
    const totalCharacters = 826; // Total number of characters in the API // 
    const charactersPerPage = 20; // Total number of characters per page in the API //
    const totalPages = 42; // Total number of pages //

    const aliveCharacters = []; // keep the characters with the status "alive" //

    // browse all pages of the API //
    for (let page = 1; page <= totalPages; page++) {
        try {
            const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`);
            const data = await response.json();

            // Filter the characters with the status 'Alive' from the current page //
            const aliveCharactersPage = data.results.filter(character => character.status === "Alive");
            aliveCharacters.push(...aliveCharactersPage);
        } catch (error) {
            console.error("Une erreur s'est produite lors de la récupération des personnages :", error);
        }
    }

    // Randomly select 12 characters with the "Alive" status from those retrieved //
    const selectedAliveCharacters = [];
    while (selectedAliveCharacters.length < 12 && aliveCharacters.length > 0) {
        const randomIndex = Math.floor(Math.random() * aliveCharacters.length);
        const randomCharacter = aliveCharacters.splice(randomIndex, 1)[0]; // Retirer le personnage sélectionné de la liste pour éviter les doublons
        selectedAliveCharacters.push(randomCharacter);
    }

    done(selectedAliveCharacters);
}

// function to create the card in html //
function handleRandomAliveCharactersButtonClick() {
    const main = document.querySelector("main");
    main.innerHTML = '';

    getRandomAliveCharacters(data => {
        console.log(data);

        data.forEach(personnage => {
            const article = document.createElement('article');
            article.classList.add('carte'); // add the class "carte" to the article //


            const articleContent = document.createRange().createContextualFragment(/*html*/`
                <div class="image-container">  
                    <img src="${personnage.image}" alt="${personnage.name}" class="chara-img">      
                </div>
                <h2>${personnage.name}</h2>
                <div class="stat">
                    <span>status : ${personnage.status}</span>
                    <span>gender : ${personnage.gender}</span>
                    <span>species :${personnage.species}</span>
                </div>
            `);
            article.appendChild(articleContent); // add the article content to the article //
            main.appendChild(article); // add our card in the main section //

            // create the modal //
            const modal = document.createElement('div');
            modal.classList.add('modal'); // add the class "modal" the the modal //
            modal.innerHTML = `
            <div class="wrapper">
            <div class="modal-content">
                <div class="image-container">  
                    <img src="${personnage.image}" alt="personnage" class="chara-img">      
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

            // opening and closing modal logic // 
            const openModalBtn = article;
            const closeModalBtn = modal.querySelector('.close');
            // opening the modal when clicking on it and add some css //
            openModalBtn.addEventListener('click', () => {
                modal.style.display = 'flex';
                modal.style.justifyContent = 'center';
            });
            // closing the modal when clicking on the close button //
            closeModalBtn.addEventListener('click', () => {
                modal.style.display = 'none';
            });


            const modalbox = document.querySelectorAll('.modal'); // Assuming modal is a single element
            // add an event listener with the function closeModal on each modal //
            modalbox.forEach(modal => {
                modal.addEventListener('click', closeModal);
            });
            // function to close the modal when clicking outside 
            function closeModal(event) {
                // Access the modal that was clicked
                const clickedModal = event.currentTarget;

                // Hide the clicked modal
                clickedModal.style.display = 'none';
            }
        });
    });
}

function animateImages() {
    var animationContainer = document.getElementById('animationContainer');
    var images = animationContainer.getElementsByTagName('img');
    var currentIndex = 0;

    // set the container display to block when the function is executed //
    animationContainer.style.display = 'block';
    // this function hide all the frames of the animation //
    function hideAllImages() {
        for (var i = 0; i < images.length; i++) {
            images[i].style.display = 'none';
        }
    }

    // this function show a specific image in the index hide the others //
    function showNextImage() {
        if (currentIndex < images.length) {
            hideAllImages(); // this function hide all the frames of the animation //
            images[currentIndex].style.display = 'block'; //set the display of the current image to block to make her visible //
            currentIndex++;
            setTimeout(showNextImage, 100); // set the timer between the images (in millisecond) //

        } else {
            // reset the index and hide all the images when the loop is done //

            currentIndex = 0;
            hideAllImages();
            animationContainer.style.display = 'none'; // set the display of the container to none when finished //
        }
    }

    showNextImage();
}

const randomAliveCharactersButton = document.getElementById("randomAliveCharactersButton");
randomAliveCharactersButton.addEventListener("click", () => {
    handleRandomAliveCharactersButtonClick();
    animateImages(); // Vous appelez simplement la fonction ici
});


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Function to randomly display 12 "dead" characters //

async function getRandomDeadCharacters(done) {
    const totalCharacters = 826; // Total number of characters in the API // 
    const charactersPerPage = 20; // Total number of characters per page in the API //
    const totalPages = 42; // Total number of pages //

    const deadCharacters = []; // keep the characters with the status "dead" //

    // browse all pages of the API //
    for (let page = 1; page <= totalPages; page++) {
        try {
            const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`);
            const data = await response.json();

            // Filter the characters with the status 'dead' from the current page //
            const deadCharactersPage = data.results.filter(character => character.status === "Dead");
            deadCharacters.push(...deadCharactersPage);
        } catch (error) {
            console.error("Une erreur s'est produite lors de la récupération des personnages :", error);
        }
    }

    // Randomly select 12 characters with the "dead" status from those retrieved //
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
                    <img src="${personnage.image}" alt="${personnage.name}" class="chara-img">      
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
                    <img src="${personnage.image}" alt="personnage" class="chara-img">      
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

function animateImages() {
    var animationContainer = document.getElementById('animationContainer');
    var images = animationContainer.getElementsByTagName('img');
    var currentIndex = 0;

    // set the container display to block when the function is executed //
    animationContainer.style.display = 'block';
    // this function hide all the frames of the animation //
    function hideAllImages() {
        for (var i = 0; i < images.length; i++) {
            images[i].style.display = 'none';
        }
    }

    // this function show a specific image in the index hide the others //
    function showNextImage() {
        if (currentIndex < images.length) {
            hideAllImages(); // this function hide all the frames of the animation //
            images[currentIndex].style.display = 'block'; //set the display of the current image to block to make her visible //
            currentIndex++;
            setTimeout(showNextImage, 100); // set the timer between the images (in millisecond) //

        } else {
            // reset the index and hide all the images when the loop is done //

            currentIndex = 0;
            hideAllImages();
            animationContainer.style.display = 'none'; // set the display of the container to none when finished //
        }
    }

    showNextImage();
}

const randomDeadCharactersButton = document.getElementById("randomDeadCharactersButton");
randomDeadCharactersButton.addEventListener("click", () => {
    handleRandomDeadCharactersButtonClick();
    animateImages(); // Vous appelez simplement la fonction ici
});


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Function to randomly display 12 characters with the status unkwnown //

async function getRandomUnknownCharacters(done) {
    const totalCharacters = 826; // Total number of characters in the API // 
    const charactersPerPage = 20; // Total number of characters per page in the API //
    const totalPages = 42; // Total number of pages //

    const unknownCharacters = []; // keep the characters with the status "unknown" //

    // browse all pages of the API //
    for (let page = 1; page <= totalPages; page++) {
        try {
            const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`);
            const data = await response.json();

            // Filter the characters with the status 'unknown' from the current page //
            const unknownCharactersPage = data.results.filter(character => character.status === "unknown");
            unknownCharacters.push(...unknownCharactersPage);
        } catch (error) {
            console.error("Une erreur s'est produite lors de la récupération des personnages :", error);
        }
    }

    // Randomly select 12 characters with the "unknown" status from those retrieved //
    const selectedUnknownCharacters = [];
    while (selectedUnknownCharacters.length < 12 && unknownCharacters.length > 0) {
        const randomIndex = Math.floor(Math.random() * unknownCharacters.length);
        const randomCharacter = unknownCharacters.splice(randomIndex, 1)[0]; // Retirer le personnage sélectionné de la liste pour éviter les doublons
        selectedUnknownCharacters.push(randomCharacter);
    }

    done(selectedUnknownCharacters);
}

// function to create the cards in html //
function handleRandomUnknownCharactersButtonClick() {
    const main = document.querySelector("main");
    main.innerHTML = '';

    getRandomUnknownCharacters(data => {
        console.log(data);

        data.forEach(personnage => {
            const article = document.createElement('article');
            article.classList.add('carte'); // add the class "carte" to the article // 

            const articleContent = document.createRange().createContextualFragment(/*html*/`
                <div class="image-container">  
                    <img src="${personnage.image}" alt="${personnage.name}" class="chara-img">      
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

            // Create the modal //
            const modal = document.createElement('div');
            modal.classList.add('modal'); // add the class "modal" to the modal //
            modal.innerHTML = `
            <div class="wrapper">
            <div class="modal-content">
                <div class="image-container">  
                    <img src="${personnage.image}" alt="personnage" class="chara-img">      
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

            // opening and closing logic for the modal //
            const openModalBtn = article;
            const closeModalBtn = modal.querySelector('.close');

            openModalBtn.addEventListener('click', () => {
                modal.style.display = 'flex';
                modal.style.justifyContent = 'center';
            });

            closeModalBtn.addEventListener('click', () => {
                modal.style.display = 'none';
            });


            const modalbox = document.querySelectorAll('.modal'); // Assuming modal is a single element
            // add an event listener with the function closeModal on each modal //
            modalbox.forEach(modal => {
                modal.addEventListener('click', closeModal);
            });
            // function to close the modal when clicking outside 
            function closeModal(event) {
                // Access the modal that was clicked
                const clickedModal = event.currentTarget;

                // Hide the clicked modal
                clickedModal.style.display = 'none';
            }
        });
    });
}

function animateImages() {
    var animationContainer = document.getElementById('animationContainer');
    var images = animationContainer.getElementsByTagName('img');
    var currentIndex = 0;

    // set the container display to block when the function is executed //
    animationContainer.style.display = 'block';

    // function to set the display of all images to none //
    function hideAllImages() {
        for (var i = 0; i < images.length; i++) {
            images[i].style.display = 'none';
        }
    }


    // this function show a specific image in the index hide the others //
    function showNextImage() {
        if (currentIndex < images.length) {
            hideAllImages(); // this function hide all the frames of the animation //
            images[currentIndex].style.display = 'block'; //set the display of the current image to block to make her visible //
            currentIndex++;
            setTimeout(showNextImage, 100); // set the timer between the images (in millisecond) //

        } else {
            // reset the index and hide all the images when the loop is done //

            currentIndex = 0;
            hideAllImages();
            animationContainer.style.display = 'none'; // set the display of the container to none when finished //
        }
    }

    showNextImage();
}

const randomUnknownCharactersButton = document.getElementById("randomUnknownCharactersButton");
randomUnknownCharactersButton.addEventListener("click", () => {
    handleRandomUnknownCharactersButtonClick();
    animateImages();
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


