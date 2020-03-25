// When scrolling nav bar sticks to top
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 0);
});


// elements we wish to add the event listener to.
const elements = document.getElementsByClassName('login-button');

// for each element we attach the event listener.
Object.values(elements).forEach((element) => {
    // in this case we're using the 'click' event
    element.addEventListener('click', async () => {
        // The API route
        const url = '/api/auth/login';

        // The data we want to send
        // Credentials taken from SQL setup file
        // making variables to ge† the values in the email and password input boxes
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;
        const data = {
            email: email,
            password: password,
        };

        // Fetch returns a response object that tells us different things about the response
        const response = await fetch(url, {
            method: 'POST', // Send a POST request
            headers: { 'Content-Type': 'application/json' }, // Tell the server we are sending JSON
            body: JSON.stringify(data), // Data type must match "Content-Type" header
        });

        // Get the JSON data from the response
        const returned = await response.json();

        // Check if it worked
        if (returned.success === true) {
            // redirect to homepage.html
            window.location.href = 'homepage.html';
            console.log("You're logged in!");
        } else {
            console.log('Failed to log in!');
        }
    });
});