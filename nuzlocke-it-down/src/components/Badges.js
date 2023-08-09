import React, { useState, useEffect } from 'react';

const Badges = () => {
    const [badges, setBadges] = useState([]);
    const [newBadge, setNewBadge] = useState("");

    useEffect(() => {
        fetch('/get_badges')
            .then(response => response.json())
            .then(data => setBadges(data));
    }, []);

    const addBadge = () => {
        fetch('/add_badge', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ badge: newBadge })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                setBadges(prevBadges => [...prevBadges, newBadge]);
            }
        });
    };

    const deleteBadge = (badgeName) => {
        fetch('/delete_badge', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ badge: badgeName })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                setBadges(prevBadges => prevBadges.filter(badge => badge !== badgeName));
            }
        });
    };

    const editBadge = (oldBadge, newBadge) => {
        fetch('/edit_badge', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ oldBadge, newBadge })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                setBadges(prevBadges => {
                    const index = prevBadges.indexOf(oldBadge);
                    if (index !== -1) {
                        prevBadges[index] = newBadge;
                    }
                    return [...prevBadges];
                });
            }
        });
    };

    return (
        <div>
            <h2>Badges:</h2>
            <ul>
                {/* List to display badges here */}
            </ul>
            <form onSubmit={e => {
                e.preventDefault();
                addBadge();
            }}>
                {/* Add the rest of your form fields here... */}
            </form>
        </div>
    );
};

export default Badges;
