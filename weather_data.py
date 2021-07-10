# This is a copy of the main.py file, available to test out new code while main.py is run by the daemon.
from pyicloud import PyiCloudService
import requests
import config
from config import watch, owm_key
import os
import requests
import json
import boto3
import decimal


# print(watch.location())
lat = watch.location()['latitude']
lon = watch.location()['longitude']

weatherurl = f"http://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={owm_key}&units=imperial"
weather_json = requests.get(weatherurl).json()
json_formatted_str = json.dumps(weather_json, indent=4)
print(json_formatted_str)

dynamo_client= boto3.resource('dynamodb', region_name='us-west-1') 
table = dynamo_client.Table('aqi_weather_hist') #assign YOUR tablename here
datetime = str(weather_json['dt'])
main = weather_json['weather'][0]['main']
description = weather_json['weather'][0]['description']
temp = round(decimal.Decimal(weather_json['main']['temp']),2)
feels_like = round(decimal.Decimal(weather_json['main']['feels_like']),2)
temp_min = round(decimal.Decimal(weather_json['main']['temp_min']),2)
temp_max = round(decimal.Decimal(weather_json['main']['temp_max']),2)
pressure = round(decimal.Decimal(weather_json['main']['pressure']),2)
humidity = round(decimal.Decimal(weather_json['main']['humidity']),2)
visibility = round(decimal.Decimal(weather_json['visibility']),2)
wind_speed = round(decimal.Decimal(weather_json['wind']['speed']),2)
wind_deg = round(decimal.Decimal(weather_json['wind']['deg']),2)
clouds = round(decimal.Decimal(weather_json['clouds']['all']),2)
sunrise = round(decimal.Decimal(weather_json['sys']['sunrise']),2)
sunset = round(decimal.Decimal(weather_json['sys']['sunset']),2)

table.put_item(
           Item={
               'datetime': datetime,
               'main': main,
               'description': description,
               'temp': temp,
               'feels_like': feels_like,
               'temp_min': temp_min,
               'temp_max': temp_max,
               'pressure': pressure,
               'humidity': humidity,
               'visibility': visibility,
               'wind_speed': wind_speed,
               'wind_deg': wind_deg,
               'clouds': clouds,
               'sunrise': sunrise,
               'sunset': sunset,
            }
        )
print(f'successfully uploaded weather record: {datetime}')