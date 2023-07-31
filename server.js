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
    let newPokemon = req.body;
    team.push(newPokemon);
    res.json({ success: true });
});

app.post('/add_badge', (req, res) => {
    let newBadge = req.body.badge;
    badges.push(newBadge);
    res.json({ success: true });
});


// Delete a Pokemon
app.delete('/delete_pokemon', (req, res) => {
    let { nickname } = req.body;
    let index = team.findIndex(pokemon => pokemon.nickname === nickname);

    if (index !== -1) {
        team.splice(index, 1);
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

// Edit a Pokemon
app.put('/edit_pokemon', (req, res) => {
    let { oldNickname, newNickname } = req.body;
    let pokemon = team.find(pokemon => pokemon.nickname === oldNickname);

    if (pokemon) {
        pokemon.nickname = newNickname;
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

// Delete a Badge
app.delete('/delete_badge', (req, res) => {
    let { badge } = req.body;
    let index = badges.indexOf(badge);

    if (index !== -1) {
        badges.splice(index, 1);
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

// Edit a Badge
app.put('/edit_badge', (req, res) => {
    let { oldBadge, newBadge } = req.body;
    let index = badges.indexOf(oldBadge);

    if (index !== -1) {
        badges[index] = newBadge;
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

