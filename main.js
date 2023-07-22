function refreshTeam() {
    fetch('/get_team')  // replace with your actual API endpoint
    .then(response => response.json())
    .then(data => {
        let table = document.getElementById('team');
        table.innerHTML = '';  // clear the table
        // add a new row for each Pokemon
        data.forEach(pokemon => {
            let row = table.insertRow();
            row.insertCell().textContent = pokemon.nickname;
            row.insertCell().textContent = pokemon.type;
            row.insertCell().textContent = pokemon.level;
            row.insertCell().textContent = pokemon.status;
        });
    })
    .catch(error => console.error('Error:', error));
}

function refreshBadges() {
    fetch('/get_badges')  // replace with your actual API endpoint
    .then(response => response.json())
    .then(data => {
        let list = document.getElementById('badges');
        list.innerHTML = '';  // clear the list
        // add a new list item for each badge
        data.forEach(badge => {
            let item = document.createElement('li');
            item.textContent = badge.name;
            list.appendChild(item);
        });
    })
    .catch(error => console.error('Error:', error));
}

function addPokemon() {
    let nickname = document.getElementById('nickname').value;
    let type = document.getElementById('type').value;
    let level = document.getElementById('level').value;
    let status = document.getElementById('status').value;

    let formData = new FormData();
    formData.append('nickname', nickname);
    formData.append('type', type);
    formData.append('level', level);
    formData.append('status', status);

    fetch('/add_pokemon', {  // replace with your actual API endpoint
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        refreshTeam();  // refresh the team display
    })
    .catch(error => console.error('Error:', error));
}
