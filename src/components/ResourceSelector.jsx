import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ResourceSelector() {
    const [searchType, setSearchType] = useState('people');
    const [searchId, setSearchId] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [searchResult, setSearchResult] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (isSearching && searchId) {
                try {
                    setError(null);
                    const response = await axios.get(`https://swapi.dev/api/${searchType}/${searchId}`);
                    setSearchResult(response.data);
                } catch (err) {
                    console.log(err);
                    setSearchResult(null);
                }
                setIsSearching(false);
            }
        };

        fetchData();
    }, [searchType, searchId, isSearching]);

    const handleSearch = () => {
        setIsSearching(true);
    };

    const renderResult = () => {
        if (!searchResult) return (null);

        if (searchType === 'people') {
            return (
                <div>
                    <h2>{searchResult.name}</h2>
                    <p>Height: {searchResult.height}</p>
                    <p>Hair Color: {searchResult.hair_color}</p>
                    <p>Eye Color: {searchResult.eye_color}</p>
                    <p>Skin Color: {searchResult.skin_color}</p>
                </div>
            );
        } else {
            return (
                <div>
                    <h2>{searchResult.name}</h2>
                    <p>Climate: {searchResult.climate}</p>
                    <p>Terrain: {searchResult.terrain}</p>
                    <p>Surface Water: {searchResult.surface_water}</p>
                    <p>Population: {searchResult.population}</p>
                </div>
            );
        }
    };

    return (
        <div>
            <label>Search for: </label>
            <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
                <option value="people">People</option>
                <option value="planets">Planets</option>
            </select>
            <label>ID: </label>
            <input
                type="text"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                placeholder="Enter ID"
            />
            <button onClick={handleSearch}>Search</button>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            {renderResult()}
        </div>
    );
}

export default ResourceSelector;