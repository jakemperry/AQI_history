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

# print(watch.location())
lat = watch.location()['latitude']
lon = watch.location()['longitude']

queryurl = f'http://api.openweathermap.org/data/2.5/air_pollution?lat={lat}&lon={lon}&appid={owm_key}'

aqi_json = requests.get(queryurl).json()
print(aqi_json)

# Load to dynamoDB
dynamo_client= boto3.resource('dynamodb', region_name='us-west-1') 
table = dynamo_client.Table('flask_test') #assign YOUR tablename here
# Get data from response
datetime = aqi_json['list'][0]['dt']
print(datetime)
aqi_value = aqi_json['list'][0]['main']['aqi']
print(aqi_value)
aqi_value = aqi_json['list'][0]['main']['aqi']
print(aqi_value)
