async function fetchWeather() {  
    try {
        const city = document.getElementById("cityInput").value;
        if (!city) {
            alert("Please enter a city name.");
            return;
        }

        const apiKey = "3ec8faaea289e8806e410505ae78f3d8"; // Replace with your API key
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`City not found. Status: ${response.status}`);
        }

        const data = await response.json();
        const temperature = data.main.temp;

        document.getElementById("cityName").innerText = `${data.name}, ${data.sys.country}`;
        document.getElementById("temperature").innerText = `🌡️ Temperature: ${temperature}°C`;
        document.getElementById("humidity").innerText = `💧 Humidity: ${data.main.humidity}%`;
        document.getElementById("weatherCondition").innerText = `🌤️ Condition: ${data.weather[0].description}`;

        // Change background image based on temperature
        changeBackground(temperature);

    } catch (error) {
        console.error("Error fetching weather:", error);
        document.getElementById("weatherInfo").innerHTML = "<p style='color: red;'>City not found or network issue. Try again.</p>";
    }
}

// Function to change background based on temperature
function changeBackground(temp) {
    let bgImage = "";

    if (temp <= 0) {
        bgImage = "url('snowimage.jpg')"; // Snowy background
    } else if (temp > 0 && temp <= 15) {
        bgImage = "url('cool.jpg')"; // Cool weather background
    } else if (temp > 15 && temp <= 30) {
        bgImage = "url('th(1).jpg')"; // Mild temperature background
    } else {
        bgImage = "url('hot image.jpg')"; // Hot temperature background
    }

    document.body.style.backgroundImage = bgImage;
}

// Attach event listener correctly
document.getElementById("getWeather").addEventListener("click", fetchWeather);
