import React, { useState, useEffect } from 'react';

const Team = () => {
    const [team, setTeam] = useState([]);
    const [newPokemon, setNewPokemon] = useState({
        nickname: "",
        type: "",
        level: 0,
        status: "Alive"
    });

    useEffect(() => {
        fetch('/get_team')
            .then(response => response.json())
            .then(data => setTeam(data));
    }, []);

    const addPokemon = () => {
        fetch('/add_pokemon', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPokemon)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                setTeam(prevTeam => [...prevTeam, newPokemon]);
            }
        });
    };

    const deletePokemon = (nickname) => {
        fetch('/delete_pokemon', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nickname })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                setTeam(prevTeam => prevTeam.filter(pokemon => pokemon.nickname !== nickname));
            }
        });
    };

    const editPokemon = (oldNickname, newNickname) => {
        fetch('/edit_pokemon', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ oldNickname, newNickname })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                setTeam(prevTeam => {
                    const updatedTeam = [...prevTeam];
                    const targetPokemon = updatedTeam.find(pokemon => pokemon.nickname === oldNickname);
                    if (targetPokemon) {
                        targetPokemon.nickname = newNickname;
                    }
                    return updatedTeam;
                });
            }
        });
    };

    return (
        <div>
            <form onSubmit={e => {
                e.preventDefault();
                addPokemon();
            }}>
                {/* Add the rest of your form fields here... */}
            </form>
            <h2>Pokemon Team:</h2>
            <table>
                {/* Table to display team here */}
            </table>
        </div>
    );
};

export default Team;
