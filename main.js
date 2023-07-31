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
        // Add delete button
        cell = row.insertCell(-1);
        cell.innerHTML = `<button onclick="deletePokemon('${pokemon.nickname}')">Delete</button>`;
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
        li.innerHTML = `${badge} <button onclick="deleteBadge('${badge}')">Delete</button>`;
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
    
    let result = await response.json();
    
    if (result.success) {
        // If the Pokemon was successfully added, refresh the team display
        refreshTeam();
    } else {
        // If there was an error, display an error message (this could be improved)
        alert('There was an error adding the Pokemon.');
    }
}

// Add a new Badge
async function addBadge() {
    let badge = document.getElementById('badge').value;
    
    let response = await fetch('/add_badge', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ badge }),
    });
    
    let result = await response.json();
    
    if (result.success) {
        // If the badge was successfully added, refresh the badges display
        refreshBadges();
    } else {
        // If there was an error, display an error message
        alert('There was an error adding the badge.');
    }
}

// Delete a Pokemon
async function deletePokemon(nickname) {
    let response = await fetch('/delete_pokemon', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nickname }),
    });
    
    let result = await response.json();
    
    if (result.success) {
        // If the Pokemon was successfully deleted, refresh the team display
        refreshTeam();
    } else {
        // If there was an error, display an error message
        alert('There was an error deleting the Pokemon.');
    }
}

// Delete a Badge
async function deleteBadge(badge) {
    let response = await fetch('/delete_badge', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ badge }),
    });
    
    let result = await response.json();
    
    if (result.success) {
        // If the badge was successfully deleted, refresh the badges display
        refreshBadges();
    } else {
        // If there was an error, display an error message
        alert('There was an error deleting the badge.');
    }
}
