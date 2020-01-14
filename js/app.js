    'use strict'

    // VARIABLES

    const listaTweets = document.getElementById('lista-tweets');

    // EVENT LISTENERS

    /*
    para que no queden de forma global se introduce dentro de una funcion
    */

    eventListeners();
    
    function eventListeners() {
       // Cuando se envia el formulario 
        document.querySelector('#formulario').addEventListener('submit', agregarTweet);
        // Borrar Tweets
        listaTweets.addEventListener('click', borrarTweet);
        // Contenido cargado
        document.addEventListener('DOMContentLoaded', localStorageListo);
    }


    // FUNCIONES

    //Añadir tweet del formulario
    function agregarTweet(m){
        m.preventDefault();
        // Leer el valor de textarea 
        const tweet = document.getElementById('tweet').value;
        // Crear boton de eliminar
        const botonBorrar = document.createElement('a');
        botonBorrar.classList = 'borrar-tweet';
        botonBorrar.innerText = 'X';

        // Crear elemento y añadirle el contenido a la lista
        const li = document.createElement('li');
        li.innerText = tweet;
        // Añade el boton de borrar al tweet
        li.appendChild(botonBorrar);
        // Añade el tweet a la lista
        listaTweets.appendChild(li);

        // Añadir a local storage
        agregarTweetLocalStorage(tweet);
        
    }

    // Elimina el tweet del DOM
    function borrarTweet(j) {
       j.preventDefault();
        if(j.target.className === 'borrar-tweet'){
            j.target.parentElement.remove();
            borrarTweetLocalStorage(j.target.parentElement.innerText);
        }
    }
     // Mostrar datos de local storage en la lista
     function localStorageListo() {
    
        let tweets;

        tweets = obtenerTweetsLocalStorage();

        tweets.forEach((tweet) => {
        const botonBorrar = document.createElement('a');
        botonBorrar.classList = 'borrar-tweet';
        botonBorrar.innerText = 'X';

        // Crear elemento y añadirle el contenido a la lista
        const li = document.createElement('li');
        li.innerText = tweet;
        // Añade el boton de borrar al tweet
        li.appendChild(botonBorrar);
        // Añade el tweet a la lista
        listaTweets.appendChild(li);

        });
    }

    // Agregar tweet a local storage
    function agregarTweetLocalStorage(tweet){

        let tweets;
        tweets = obtenerTweetsLocalStorage();

        // Añadir el nuevo tweet
        tweets.push(tweet);

        // Convertir de string a arreglo para local storage
        localStorage.setItem('tweets', JSON.stringify(tweets));

        // Agregar a local storage
        //localStorage.setItem('tweets', tweet);

        

    }

    // Comprobar que haya elementos en localstorage, retorna a un arreglo
    function obtenerTweetsLocalStorage(){
        let tweets;
        // Revisamos los valores de local storage
        if(localStorage.getItem('tweets') === null){
            tweets = [];
        }else{
            tweets = JSON.parse(localStorage.getItem('tweets'));
        }
        return tweets;
    }

    // Eliminar Tweet de local storage
    function borrarTweetLocalStorage(tweet){
        
        let tweets, tweetBorrar;
        // Elimina la x del tweet
        tweetBorrar = tweet.substring(0, tweet.length -1);

        tweets = obtenerTweetsLocalStorage();

        tweets.forEach(function(tweet, index) {
            if(tweetBorrar === tweet){
                tweets.splice(index, 1);
            }
        });

        localStorage.setItem('tweets', JSON.stringify(tweets));
    }
