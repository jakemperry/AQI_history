var aqi_url = "https://wthdz1g2p5.execute-api.us-west-1.amazonaws.com/dev/api/v1.0/aqi_last24hrs"
var weather_url = "https://wthdz1g2p5.execute-api.us-west-1.amazonaws.com/dev/api/v1.0/weather_last24hrs"

function currentAQI(){
    d3.json(aqi_url).then(function(data){
        console.log(data)
        var currentAQI = d3.select("#currentAQI")
        currentAQI.html("")
        var aqi_len = data.Count
        console.log(aqi_len)
        var AQI_value = data.Items[aqi_len-1].aqi_value.N
        console.log(AQI_value)
        currentAQI.text(AQI_value)
        var Items = data.Items
        var AQImapped = Items.map(Item => Item.aqi_value)
        AQImapped = AQImapped.map(bob => bob.N)
        console.log(AQImapped)
    })
}

function currentWeather(){
    d3.json(weather_url).then(function(data){
        console.log(data)
        var weather_len = data.Count

        var currentTemp = d3.select("#currentTemp")
        currentTemp.html("")
        var Temp_value = data.Items[weather_len-1].temp.N
        console.log(Temp_value)
        currentTemp.text(`${Temp_value}°F`)

        var currentFeel = d3.select("#currentFeel")
        currentFeel.html("")
        var Feel_value = data.Items[weather_len-1].feels_like.N
        console.log(Feel_value)
        currentFeel.text(`${Feel_value}°F`)

        var currentHumidity = d3.select("#currentHumidity")
        currentHumidity.html("")
        var Humidity_value = data.Items[weather_len-1].humidity.N
        console.log(Humidity_value)
        currentHumidity.text(`${Humidity_value}%`)

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