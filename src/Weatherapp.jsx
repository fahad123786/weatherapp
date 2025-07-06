import React, { useState } from 'react';
import axios from 'axios';

const Weatherapp = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState('');

    const API_KEY = 'b390f7f1b88d458d8a592034250607';

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!city) return;

        try {
            const res = await axios.get(
                `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
            );
            setWeather(res.data);
            setError('');
        } catch (err) {
            setWeather(null);
            setError('City not found. Try again!');
        }
    };

    return (
        <div className="container mt-5 text-center">
            <h2 className="mb-4">🌦️ Weather App</h2>

            <form onSubmit={handleSearch} className="mb-4">
                <input
                    type="text"
                    placeholder="Enter city name"
                    className="form-control mb-2"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <button className="btn btn-primary">Get Weather</button>
            </form>

            {error && <p className="text-danger">{error}</p>}

            {weather && (
                <div className="card p-4 mx-auto" style={{ maxWidth: '400px' }}>
                    <h3>{weather.location.name}, {weather.location.country}</h3>
                    <img src={weather.current.condition.icon} alt="weather icon" />
                    <p>{weather.current.condition.text}</p>
                    <p>🌡️ Temp: {weather.current.temp_c}°C</p>
                    <p>💨 Wind: {weather.current.wind_kph} km/h</p>
                    <p>💧 Humidity: {weather.current.humidity}%</p>
                    <p>🕒 Local Time in {weather.location.name}: {weather.location.localtime}</p>
                    <p>🌍 Timezone: {weather.location.tz_id}</p>
                </div>
            )}

            <footer className="mt-5">
                <p className="text-muted">Made with ❤️ by Fahad</p>
            </footer>
        </div>
    );
};

export default Weatherapp;
