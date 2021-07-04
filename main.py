from pyicloud import PyiCloudService
import requests
import config
from config import watch, owm_key
import os
import requests
import json
import pandas as pd
import numpy
from scipy import stats
import boto3
import decimal


# print(watch.location())
lat = watch.location()['latitude']
lon = watch.location()['longitude']

queryurl = f'http://api.openweathermap.org/data/2.5/air_pollution?lat={lat}&lon={lon}&appid={owm_key}'

aqi_json = requests.get(queryurl).json()
# print(aqi_json)
# test = json.
# aqi_json=json.dumps(response, parse_float = decimal.Decimal)
# Load to dynamoDB
dynamo_client= boto3.resource('dynamodb', region_name='us-west-1') 
table = dynamo_client.Table('aqi_history') #assign YOUR tablename here
# Get data from response
datetime = str(aqi_json['list'][0]['dt'])
aqi_value = aqi_json['list'][0]['main']['aqi']
co = round(decimal.Decimal(aqi_json['list'][0]['components']['co']),2)
no = round(decimal.Decimal(aqi_json['list'][0]['components']['no']),2)
no2 = round(decimal.Decimal(aqi_json['list'][0]['components']['no2']),2)
o3 = round(decimal.Decimal(aqi_json['list'][0]['components']['o3']),2)
so2 = round(decimal.Decimal(aqi_json['list'][0]['components']['so2']),2)
pm2_5 = round(decimal.Decimal(aqi_json['list'][0]['components']['pm2_5']),2)
pm10 = round(decimal.Decimal(aqi_json['list'][0]['components']['pm10']),2)
nh3 = round(decimal.Decimal(aqi_json['list'][0]['components']['nh3']),2)

table.put_item(
           Item={
               'datetime':datetime,
               'aqi_value': aqi_value,
               'co': co,
               'no': no,
               'no2':no2,
               'o3':o3,
               'so2':so2,
               'pm2_5':pm2_5,
               'pm10': pm10,
               'nh3': nh3,
            }
        )
print(f'successfully uploaded record: {datetime}')
