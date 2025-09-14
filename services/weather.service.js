const API_KEY = process.env.WEATHER_API_KEY;

async function getWeather(city) {
    if (!API_KEY) {
        throw new Error('Missing WEATHER_API_KEY environment variable');
    }

    const { default: got } = await import('got');
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

    try {
        const response = await got(url).json();
        return response;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch weather data');
    }
}

module.exports = { getWeather };
