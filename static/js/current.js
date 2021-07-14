var aqi_url = "https://wthdz1g2p5.execute-api.us-west-1.amazonaws.com/dev/api/v1.0/aqi_last24hrs"
var weather_url = "https://wthdz1g2p5.execute-api.us-west-1.amazonaws.com/dev/api/v1.0/weather_last24hrs"

function currentAQI(){
    d3.json(aqi_url).then(function(data){
        console.log(data)
        
        var currentAQI = d3.select("#currentAQI")
        currentAQI.html("")
        var currentCO = d3.select("#co_current")
        currentCO.html("")
        var currentNH3 = d3.select("#nh3_current")
        currentNH3.html("")
        var currentNO = d3.select("#no_current")
        currentNO.html("")
        var currentNO2 = d3.select("#no2_current")
        currentNO2.html("")
        var currentO3 = d3.select("#o3_current")
        currentO3.html("")
        var currentSO2 = d3.select("#so2_current")
        currentSO2.html("")
        var aqi_len = data.Count
        console.log(aqi_len)

        // Get most recent AQI value
        var AQI_value = data.Items[aqi_len-1].aqi_value.N
        console.log(AQI_value)
        currentAQI.text(AQI_value)
        // Get most recent CO value
        var CO_value = data.Items[aqi_len-1].co.N
        currentCO.text(CO_value)
        // Get most recent NH3 value
        var NH3_value = data.Items[aqi_len-1].nh3.N
        currentNH3.text(NH3_value)
        // Get most recent NO value
        var NO_value = data.Items[aqi_len-1].no.N
        currentNO.text(NO_value)
        // Get most recent NO2 value
        var NO2_value = data.Items[aqi_len-1].no2.N
        currentNO2.text(NO2_value)
        // Get most recent O3 value
        var O3_value = data.Items[aqi_len-1].o3.N
        currentO3.text(O3_value)
        // Get most recent SO2 value
        var SO2_value = data.Items[aqi_len-1].so2.N
        currentSO2.text(SO2_value)

        // Get time series data
        var Items = data.Items
        var timestamps = Items.map(Item => Item.utc)
        timestamps = timestamps.map(utc => utc.S)
        var AQImapped = Items.map(Item => Item.aqi_value)
        AQImapped = AQImapped.map(aqi_value => aqi_value.N)
        console.log(timestamps)
        console.log(AQImapped)

        // Plot AQI over time
        var trace1 = {
            x: timestamps,
            y: AQImapped,
            type: 'scatter'
        }
        var plotData = [trace1];
        var layout = {
            title:'AQI over past 24 hours',
            margin: {
                l:20,
                r:10,
                // t:0,
                // b:0
            }
          };
        Plotly.newPlot('AQIPlot',plotData, layout, {responsive: true});
    })
}

function currentWeather(){
    d3.json(weather_url).then(function(data){
        console.log(data)
        var weather_len = data.Count

        // Get time series data
        var Items = data.Items
        var timestamps = Items.map(Item => Item.utc)
        timestamps = timestamps.map(utc => utc.S)

        // Current Temperature
        var currentTemp = d3.select("#currentTemp")
        currentTemp.html("")
        var Temp_value = data.Items[weather_len-1].temp.N
        console.log(Temp_value)
        currentTemp.text(`${Temp_value}°F`)

        // 24hr temperature plot
        var temp_24hr = Items.map(Item => Item.temp)
        temp_24hr = temp_24hr.map(temp => temp.N)
        var trace1 = {
            x: timestamps,
            y: temp_24hr,
            type: 'scatter'
        }
        var plotData = [trace1];
        var layout = {
            title:'Temperature (°F) over past 24 hours',
            margin: {
                l:20,
                r:10,
                // t:0,
                // b:0
            }
          };
        Plotly.newPlot('TempPlot',plotData, layout, {responsive: true});

        // Current Feel
        var currentFeel = d3.select("#currentFeel")
        currentFeel.html("")
        var Feel_value = data.Items[weather_len-1].feels_like.N
        console.log(Feel_value)
        currentFeel.text(`${Feel_value}°F`)
        // 24hr feel plot
        var feel_24hr = Items.map(Item => Item.feels_like)
        feel_24hr = feel_24hr.map(feels_like => feels_like.N)
        var trace1 = {
            x: timestamps,
            y: feel_24hr,
            type: 'scatter'
        }
        var plotData = [trace1];
        var layout = {
            title:'Feels like (°F) over past 24 hours',
            margin: {
                l:20,
                r:10,
                // t:0,
                // b:0
            }
            };
        Plotly.newPlot('FeelsPlot',plotData, layout, {responsive: true});

        // Current humidity
        var currentHumidity = d3.select("#currentHumidity")
        currentHumidity.html("")
        var Humidity_value = data.Items[weather_len-1].humidity.N
        console.log(Humidity_value)
        currentHumidity.text(`${Humidity_value}%`)

        // 24hr humidity plot
        var humidity_24hr = Items.map(Item => Item.humidity)
        humidity_24hr = humidity_24hr.map(humidity => humidity.N)
        var trace1 = {
            x: timestamps,
            y: humidity_24hr,
            type: 'scatter'
        }
        var plotData = [trace1];
        var layout = {
            title:'Humidity (%) over past 24 hours',
            margin: {
                l:20,
                r:10,
                // t:0,
                // b:0
            }
            };
        Plotly.newPlot('HumidityPlot',plotData, layout, {responsive: true});

        var currentConditions = d3.select("#currentConditions")
        currentConditions.html("")
        var Conditions_value = data.Items[weather_len-1].description.S
        console.log(Conditions_value)
        currentConditions.text(Conditions_value)

        // Current Wind Speed
        var currentWindSpeed = d3.select("#currentWindSpeed")
        currentWindSpeed.html("")
        var WindSpeed_value = data.Items[weather_len-1].wind_speed.N
        console.log(WindSpeed_value)
        currentWindSpeed.text(`${WindSpeed_value} mph`)

        // 24hr wind speed plot
        var speed_24hr = Items.map(Item => Item.wind_speed)
        speed_24hr = speed_24hr.map(wind_speed => wind_speed.N)
        var trace1 = {
            x: timestamps,
            y: speed_24hr,
            type: 'scatter'
        }
        var plotData = [trace1];
        var layout = {
            title:'Wind speed (mph) over past 24 hours',
            margin: {
                l:20,
                r:10,
                // t:0,
                // b:0
            }
            };
        Plotly.newPlot('SpeedPlot',plotData, layout, {responsive: true});

        var currentWindDeg = d3.select("#currentWindDeg")
        currentWindDeg.html("")
        var WindDeg_value = data.Items[weather_len-1].wind_deg.N
        console.log(WindDeg_value)
        currentWindDeg.text(`${WindDeg_value}°`)

        var updated = d3.select("#updated")
        updated.html("")
        var update_time = data.Items[weather_len-1].utc.S
        console.log(update_time)
        updated.text(`Last updated @ ${update_time} UTC`)

    })
}

currentAQI()
currentWeather()