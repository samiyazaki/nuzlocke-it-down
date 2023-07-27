// Refresh the team display
async function refreshTeam() {
    let response = await fetch('/get_team');
    let team = await response.json();
    
    let table = document.getElementById('team');
    // Clear the table
    table.innerHTML = '';
    // Add each Pokemon to the table
    for (let pokemon of team) {
        let row = table.insertRow(-1);
        let cell;
        // Add each property of the Pokemon as a cell
        for (let prop of ['nickname', 'type', 'level', 'status']) {
            cell = row.insertCell(-1);
            cell.textContent = pokemon[prop];
        }
        // If the pokemon has fainted, add a goodbye message
        if (pokemon.status === "Fainted") {
            cell = row.insertCell(-1);
            cell.textContent = `Goodbye, ${pokemon.nickname}...`;
        }
    }
}

// Refresh the badges display
async function refreshBadges() {
    let response = await fetch('/get_badges');
    let badges = await response.json();
    
    let ul = document.getElementById('badges');
    // Clear the ul
    ul.innerHTML = '';
    // Add each badge to the ul
    for (let badge of badges) {
        let li = document.createElement('li');
        li.textContent = badge;
        ul.appendChild(li);
    }
}

// Add a new Pokemon
async function addPokemon() {
    let nickname = document.getElementById('nickname').value;
    let type = document.getElementById('type').value;
    let level = document.getElementById('level').value;
    let status = document.getElementById('status').value;
    
    let newPokemon = { nickname, type, level, status };
    
    let response = await fetch('/add_pokemon', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPokemon),
    });
    
    if (response.status === 200 && response.headers.get('content-type').includes('application/json')) {
        let result = await response.json();
    
        if (result.success) {
            // If the Pokemon was successfully added, refresh the team display
            refreshTeam();
        } else {
            // If there was an error, display an error message (this could be improved)
            alert('There was an error adding the Pokemon.');
        }
    }
}