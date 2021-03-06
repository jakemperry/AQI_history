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
        var currentPM2_5 = d3.select("#pm2_5_current")
        currentPM2_5.html("")
        var currentPM10 = d3.select("#pm10_current")
        currentPM10.html("")
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
        // Get most recent PM2.5 value
        var PM2_5_value = data.Items[aqi_len-1].pm2_5.N
        currentPM2_5.text(PM2_5_value)
        // Get most recent PM10 value
        var PM10_value = data.Items[aqi_len-1].pm10.N
        currentPM10.text(PM10_value)

        // Get time series data
        var Items = data.Items
        var timestamps = Items.map(Item => Item.utc.S)
        var AQImapped = Items.map(Item => Item.aqi_value.N)
        var coMapped = Items.map(Item => Item.co.N)
        var nh3mapped = Items.map(Item => Item.nh3.N)
        var nomapped = Items.map(Item => Item.no.N)
        var no2mapped = Items.map(Item => Item.no2.N)
        var o3mapped = Items.map(Item => Item.o3.N)
        var so2mapped = Items.map(Item => Item.so2.N)
        var pm2_5mapped = Items.map(Item => Item.pm2_5.N)
        var pm10mapped = Items.map(Item => Item.pm10.N)
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
                t:30,
                b:30
            }
          };
        Plotly.newPlot('AQIPlot',plotData, layout, {
            responsive: true,
            displayModeBar: false});

        // Plot AQI over time
        var trace1 = {
            name: "AQI",
            x: timestamps,
            y: AQImapped,
            type: 'scatter',
            line: {
                dash: 'solid',
                width: 4
              }
        }

        var trace2 = {
            name: "CO",
            x: timestamps,
            y: coMapped,
            type: 'scatter',
            yaxis: 'y2',
            line: {
                dash: 'dash',
                width: 2
              }
        }

        var trace3 = {
            name: "NH3",
            x: timestamps,
            y: nh3mapped,
            type: 'scatter',
            yaxis: 'y2',
            line: {
                dash: 'dash',
                width: 2
              }
        }

        var trace4 = {
            name: "NO",
            x: timestamps,
            y: nomapped,
            type: 'scatter',
            yaxis: 'y2',
            line: {
                dash: 'dash',
                width: 2
              }
        }
        var trace5 = {
            name: "NO2",
            x: timestamps,
            y: no2mapped,
            type: 'scatter',
            yaxis: 'y2',
            line: {
                dash: 'dash',
                width: 2
              }
        }
        var trace6 = {
            name: "O3",
            x: timestamps,
            y: o3mapped,
            type: 'scatter',
            yaxis: 'y2',
            line: {
                dash: 'dash',
                width: 2
              }
        }
        var trace7 = {
            name: "SO2",
            x: timestamps,
            y: so2mapped,
            type: 'scatter',
            yaxis: 'y2',
            line: {
                dash: 'dash',
                width: 2
              }
        }
        var trace8 = {
            name: "PM2.5",
            x: timestamps,
            y: pm2_5mapped,
            type: 'scatter',
            yaxis: 'y3',
            line: {
                dash: 'dashdot',
                width: 2
              }
        }
        var trace9 = {
            name: "PM10",
            x: timestamps,
            y: coMapped,
            type: 'scatter',
            yaxis: 'y3',
            line: {
                dash: 'dashdot',
                width: 2
              }
        }

        var plotData = [trace1, trace2, trace3,trace4,trace5, trace6,trace7,trace8,trace9];
        var layout = {
            title:'AQI Components over past 24 hours',
            xaxis: {domain: [0.02, 0.9]},
            yaxis: {title: 'AQI'},
            yaxis2: {
                title: 'Gases, ug/m3',
                overlaying: 'y',
                side: 'right',
                type: 'log',
                autorange: true,
                position: 1,
            },
            yaxis3: {
                title: 'Particulates, ug/m3',
                overlaying: 'y',
                side: 'right',
                type: 'log',
                autorange: true,
                position: 0.91
            },
            margin: {
                l:20,
                r:50,
                t:30,
                b:30
            },
            legend: {
                orientation:"h",
                x: 0.5,
                xanchor: 'center',
                y: -0.15,
            }
          };
        Plotly.newPlot('AQIPlotFull',plotData, layout, {
            responsive: true, 
            displayModeBar: false});
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
        currentTemp.text(`${Temp_value}??F`)

        // Current Feel
        var currentFeel = d3.select("#currentFeel")
        currentFeel.html("")
        var Feel_value = data.Items[weather_len-1].feels_like.N
        console.log(Feel_value)
        currentFeel.text(`${Feel_value}??F`)

        // 24hr temperature plot
        var temp_24hr = Items.map(Item => Item.temp.N)
        var trace1 = {
            name: 'Temperature (??F)',
            x: timestamps,
            y: temp_24hr,
            type: 'scatter'
        }

        var feel_24hr = Items.map(Item => Item.feels_like.N)
        var trace2 = {
            name: 'Feels like (??F)',
            x: timestamps,
            y: feel_24hr,
            type: 'scatter'
        }
        var plotData = [trace1,trace2];
        var layout = {
            title:'Temperature (??F) over past 24 hours',
            margin: {
                l:20,
                r:10,
                t:30,
                b:30
            },
            legend: {
                orientation:"h",
                x: 0.5,
                xanchor: 'center',
                y: -0.15,
            }
          };
        Plotly.newPlot('TempPlot',plotData, layout, {
            responsive: true,
            displayModeBar: false});

        // Current humidity
        var currentHumidity = d3.select("#currentHumidity")
        currentHumidity.html("")
        var Humidity_value = data.Items[weather_len-1].humidity.N
        console.log(Humidity_value)
        currentHumidity.text(`${Humidity_value}%`)

        // 24hr humidity plot
        var humidity_24hr = Items.map(Item => Item.humidity.N)
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
                t:30,
                b:30
            }
            };
        Plotly.newPlot('HumidityPlot',plotData, layout, {
            responsive: true,
            displayModeBar: false});

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
        var speed_24hr = Items.map(Item => Item.wind_speed.N)
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
                t:30,
                b:30
            }
            };
        Plotly.newPlot('SpeedPlot',plotData, layout, {
            responsive: true,
            displayModeBar: false});

        // Wind Direction
        var currentWindDeg = d3.select("#currentWindDeg")
        currentWindDeg.html("")
        var WindDeg_value = data.Items[weather_len-1].wind_deg.N
        console.log(WindDeg_value)
        currentWindDeg.text(`${WindDeg_value}??`)
        var wind_deg_24hr = Items.map(Item => Item.wind_deg.N)
        var directions = []
        wind_deg_24hr.forEach(element => {
            if (parseInt(element)>348.75){
                directions.push("N")
            } else if (parseInt(element)>326.25){
                directions.push("NNW")
            } else if (parseInt(element)>292.5){
                directions.push("NW")
            } else if (parseInt(element)>303.75){
                directions.push("WNW")
            } else if (parseInt(element)>281.25){
                directions.push("W")
            } else if (parseInt(element)>258.75){
                directions.push("WSW")
            } else if (parseInt(element)>236.25){
                directions.push("SW")
            } else if (parseInt(element)>213.75){
                directions.push("SSW")
            } else if (parseInt(element)>191.25){
                directions.push("S")
            } else if (parseInt(element)>168.75){
                directions.push("SSE")
            } else if (parseInt(element)>146.25){
                directions.push("SE")
            } else if (parseInt(element)>123.75){
                directions.push("ESE")
            } else if (parseInt(element)>101.25){
                directions.push("E")
            } else if (parseInt(element)>78.75){
                directions.push("ENE")
            } else if (parseInt(element)>56.25){
                directions.push("NE")
            } else if (parseInt(element)>33.75){
                directions.push("NNE")
            } else {
                directions.push("N")
            }
        });

        var e_count = 0
        var ene_count = 0
        var ne_count = 0
        var nne_count = 0
        var n_count = 0
        var nnw_count = 0
        var nw_count = 0
        var wnw_count = 0
        var w_count = 0
        var wsw_count = 0
        var sw_count=0
        var ssw_count = 0
        var s_count = 0
        var sse_count = 0
        var se_count = 0
        var ese_count = 0
        var direction_labels = ["E","ENE","NE","NNE","N", "NNW","NW","WNW","W","WSW","SW","SSW","S","SSE","SE","ESE","E"]
        // var direction_count=[]
        directions.forEach(element => {
            if (element=="E"){
                e_count++
            } else if (element=="ENE"){
                ene_count++
            } else if (element=="NE"){
                ne_count++
            } else if (element=="NNE"){
                nne_count++
            } else if (element=="N"){
                n_count++
            } else if (element=="NNW"){
                nnw_count++
            } else if (element=="NW"){
                nw_count++
            } else if (element=="WNW"){
                wnw_count++
            } else if (element=="W"){
                w_count++
            } else if (element=="WSW"){
                wsw_count++
            } else if (element=="SW"){
                sw_count++
            } else if (element=="SSW"){
                ssw_count++
            } else if (element=="S"){
                s_count++
            } else if(element=="SSE"){
                sse_count++
            } else if (element=="SE"){
                se_count++
            } else {
                ese_count++
            }

        });
        var direction_count=[e_count,ene_count,ne_count,nne_count,n_count,nnw_count,nw_count,wnw_count,w_count,wsw_count,sw_count,ssw_count,s_count,sse_count,se_count,ese_count,e_count]
        console.log(direction_count)

        var max = direction_count.reduce(function(a, b) {
            return Math.max(a, b);
        });

        radar_data = [{
            name:"Wind Direction",
            type: 'scatterpolar',
            r: direction_count,
            theta: direction_labels,
            fill: 'toself'
          }]
          
          layout = {
            title: "Wind Direction over past 24 hours",
            polar: {
              radialaxis: {
                visible: true,
                range: [0, max]
              }
            },
            showlegend: false
          }
          
          Plotly.newPlot("windDirectionRadar", radar_data, layout, {
                responsive: true,
                displayModeBar: false})

        var updated = d3.select("#updated")
        updated.html("")
        var update_time = data.Items[weather_len-1].utc.S
        console.log(update_time)
        updated.text(`Last updated @ ${update_time} UTC`)

    })
}

currentAQI()
currentWeather()