// When scrolling nav bar sticks to top
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 0);
});

// elements we wish to add the event listener to.
const registerElements = document.getElementsByClassName('reg-button');
Object.values(registerElements).forEach((registerElements) => {
    // in this case we're using the 'click' event
    element.addEventListener('click', async () => {
        // The API route
        const url = '/api/auth/register';

        // The data we want to send
        // Credentials taken from SQL setup file
        // making variables to ge† the values in the email and password input boxes
        let reg_email = document.body.getElementById('reg-email').value;
        let reg_password = document.body.getElementById('reg-password').value;
        const data = {
            email: reg_email,
            password: reg_password,
        };

        const reg_response = await fetch(url, {
            method: 'POST', // Send a POST request
            headers: { 'Content-Type': 'application/json' }, // Tell the server we are sending JSON
            body: JSON.stringify(data), // Data type must match "Content-Type" header
        });
        // Get the JSON data from the response
        const returned = await reg_response.json();

        // Check if it worked
        if (returned.success === true) {
            // redirect to homepage.html
            window.location.href = 'homepage.html';
            console.log("You're registered");
        } else {
            console.log('Failed to register');
        }
    });
});
