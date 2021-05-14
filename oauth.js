/* Import dependencies */
const Express = require('express'); // Import express
const { URLSearchParams } = require('url'); // import URLSearchParams from url. You can also use form-data (const FormData = require('form-data');).
const axios = require('axios'); // Import Axios
const path = require('path') // Import path
const bodyParser = require('body-parser') // Import body-parser
const fetch = require('node-fetch') // Import node-fetch

/* Client Variables */
const client_id = ''; // Paste your bot's ID here
const client_secret = ''; // Paste your bot's secret here

/* Define app variables */
const app = Express(); // Create a web app
const port = 7100; // Port to host on

/* Make a function to give us configuration for the Discord API */
function make_config(authorization_token) { // Define the function
    data = { // Define "data"
        headers: { // Define "headers" of "data"
            "authorization": `Bearer ${authorization_token}` // Define the authorization
        }
    };
    return data; // Return the created object
}

/* Configure the app */
app.use(Express.urlencoded({ extended: false })); // configure the app to parse requests with urlencoded payloads
app.use(Express.json()); // configure the app to parse requests with JSON payloads
app.use(bodyParser.text()); // configure the app to be able to read text

/* Handle GET Requests */
app.get('/', (req, res) => { // Handle incoming GET requests to http://localhost:(port)/
    res.sendFile(path.join(__dirname + '/index.html')); // Send the index.html file
});

/* Handle POST Requests */
app.post('/user', (req, res) => { // Will run when there are any incoming POST requests to http://localhost:(port)/user. Note that a POST request is different from a GET request, so this won't exactly work when you actually visit http://localhost:(port)/user
    /* Create our Form Data */
    const data_1 = new URLSearchParams(); // Create a new formData object with the constructor

    data_1.append('client_id', client_id); // Append the client_id variable to the data
    data_1.append('client_secret', client_secret); // Append the client_secret variable to the data
    data_1.append('grant_type', 'authorization_code'); // This field will tell the Discord API what you are wanting in your initial request.
    data_1.append('redirect_uri', `http://localhost:${port}/`); // This is the redirect URL where the user will be redirected when they finish the Discord login
    data_1.append('scope', 'identify'); // This tells the Discord API what info you would like to retrieve. You can change this to include guilds, connections, email, etc.
    data_1.append('code', req.body) // This is a key parameter in our upcoming request. It is the code the user got from logging in. This will help us retrieve a token which we can use to get the user's info.

    fetch('https://discord.com/api/oauth2/token', { method: "POST", body: data_1 }).then(response => response.json()).then(data => { // Make a request to the Discord API with the form data, convert the response to JSON, then take it and run the following code.
        axios.get("https://discord.com/api/users/@me", make_config(data.access_token)).then(response => { // Make a request yet again to the Discord API with the token from previously.
            res.status(200).send(response.data.username); // Send the username with a status code 200.
        }).catch(err => { // Handle any errors in the request (such as 401 errors).
            console.log(err); // Log the error in the console
            res.sendStatus(500); // Send a 500 error.
        });
    });
});
app.listen(port, function() { // Configure the app to "listen" on the specified port.
    console.log(`App listening! Link: http://localhost:${port}/`); // Log the fact our app is ready to the console.
});
