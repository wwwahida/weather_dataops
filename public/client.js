async function loadWeather() {
    try {
        const res = await fetch('/api/weather')
        const weather = await res.json()

        document.getElementById('weather').innerHTML = `
            <h2>${weather.name}</h2>
            <p>Temperature: ${weather.main.temp} °C</p>
            <p>Condition: ${weather.weather[0].description}</p>
        `
    } catch (error) {
        document.getElementById('weather').innerHTML = '<p>error loading weather data.</p>'
        console.error(error)
    }
}

async function loadChart() {
    try {
        const res = await fetch('/api/weather-log')
        const { timestamps, temps } = await res.json()

        const trace = {
            x: timestamps,
            y: temps,
            type: 'scatter',
            mode: 'lines+markers',
            line: { color: 'purple' }
        }

        const layout = {
            title: 'Temperature Over Time',
            xaxis: { title: 'Date', type: 'date' },
            yaxis: { title: 'Temperature (°C)' },
            legend: { orientation: 'h', x: 0, y: 1.1 }
        }

        Plotly.newPlot('chart', [trace], layout)
    } catch (error) {
        console.error('error loading chart data:', error)
    }
}

loadWeather()
loadChart()