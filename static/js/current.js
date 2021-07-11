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
    })
}

function currentWeather(){
    d3.json(weather_url).then(function(data){
        console.log(data)

        var currentTemp = d3.select("#currentTemp")
        currentTemp.html("")
        var weather_len = data.Count
        console.log(weather_len)
        var Temp_value = data.Items[weather_len-1].temp.N
        console.log(Temp_value)
        currentTemp.text(`${Temp_value} F`)
    })
}

currentAQI()
currentWeather()