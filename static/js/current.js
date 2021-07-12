var aqi_url = "https://wthdz1g2p5.execute-api.us-west-1.amazonaws.com/dev/api/v1.0/aqi_last24hrs"
var weather_url = "https://wthdz1g2p5.execute-api.us-west-1.amazonaws.com/dev/api/v1.0/weather_last24hrs"

function currentAQI(){
    d3.json(aqi_url).then(function(data){
        console.log(data)
        
        var currentAQI = d3.select("#currentAQI")
        currentAQI.html("")
        var aqi_len = data.Count
        console.log(aqi_len)
        // Get most recent AQI value
        var AQI_value = data.Items[aqi_len-1].aqi_value.N
        console.log(AQI_value)
        currentAQI.text(AQI_value)
        // Get time series data
        var Items = data.Items
        var timestamps = Items.map(Item => Item.utc)
        timestamps = timestamps.map(utc => utc.S)
        var AQImapped = Items.map(Item => Item.aqi_value)
        AQImapped = AQImapped.map(aqi_value => aqi_value.N)
        console.log(timestamps)
        console.log(AQImapped)

        // Plot AQI over time
        // var xvals = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]
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
        Plotly.newPlot('AQIPlot',plotData, layout);
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
        Plotly.newPlot('TempPlot',plotData, layout);

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
        Plotly.newPlot('FeelsPlot',plotData, layout);

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
        Plotly.newPlot('HumidityPlot',plotData, layout);

        var currentConditions = d3.select("#currentConditions")
        currentConditions.html("")
        var Conditions_value = data.Items[weather_len-1].description.S
        console.log(Conditions_value)
        currentConditions.text(Conditions_value)

        var currentWindSpeed = d3.select("#currentWindSpeed")
        currentWindSpeed.html("")
        var WindSpeed_value = data.Items[weather_len-1].wind_speed.N
        console.log(WindSpeed_value)
        currentWindSpeed.text(`${WindSpeed_value} mph`)

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