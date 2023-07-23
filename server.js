// Require the express module
const express = require('express');

// Create a new express application
const app = express();

// Include this line if you're going to receive JSON
app.use(express.json());

// The team data (replace with your actual data source)
let team = [{
    nickname: "Bulby",
    type: "Grass",
    level: 10,
    status: "Alive"
}];

// The badges data (replace with your actual data source)
let badges = ["Boulder Badge", "Cascade Badge"];

// Define a route to get the team data
app.get('/get_team', (req, res) => {
    res.json(team);
});

// Define a route to get the badges data
app.get('/get_badges', (req, res) => {
    res.json(badges);
});

// Define a route to add a new Pokemon
app.post('/add_pokemon', (req, res) => {
    // Get the new Pokemon data from the request body
    let newPokemon = req.body;
    // Add the new Pokemon to the team
    team.push(newPokemon);
    // Send a success response
    res.json({ success: true });
});

// Have the app listen on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
