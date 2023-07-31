const express = require('express');
const app = express();

app.use(express.json());

let team = [{
    nickname: "Bulby",
    type: "Grass",
    level: 10,
    status: "Alive"
}];
let badges = ["Boulder Badge", "Cascade Badge"];

app.get('/get_team', (req, res) => {
    res.json(team);
});

app.get('/get_badges', (req, res) => {
    res.json(badges);
});

app.post('/add_pokemon', (req, res) => {
    // Same as before...
});

app.post('/add_badge', (req, res) => {
    // Same as before...
});

app.post('/delete_pokemon', (req, res) => {
    let nickname = req.body.nickname;
    team = team.filter(pokemon => pokemon.nickname !== nickname);
    res.json({ success: true });
});

app.post('/delete_badge', (req, res) => {
    let badge = req.body.badge;
    badges = badges.filter(b => b !== badge);
    res.json({ success: true });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

