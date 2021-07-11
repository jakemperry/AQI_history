from flask.wrappers import Response
from flask_cors import CORS
import json
from flask import Flask, jsonify
import boto3
from datetime import datetime
response=''
dynamo_client = boto3.Session(region_name='us-west-1').client('dynamodb')

def get_last24hrs_data(table):
    # table=table
    date=int(round(datetime.timestamp(datetime.now()),0))
    response = dynamo_client.query(
        TableName=table,
        KeyConditionExpression='entry_type = :entry_type AND unix_time BETWEEN :dateprev AND :datenow',
        ExpressionAttributeValues={
            ':entry_type':{'S': 'sample'},
            ':datenow': {'N': str(date)},
            ':dateprev': {'N': str(date - 86400)},
        }
    )
    print(response['Items'])
    return response



app = Flask(__name__)
CORS(app)

@app.route("/")
def homepage():
  return(
    f"Available Routes: <br/>"
    f"/api/v1.0/aqi_last24hrs <br/>"
    f"/api/v1.0/weather_last24hrs <br/>"
  )
@app.route("/api/v1.0/aqi_last24hrs")
def aqi_last24hrs():
    # get_last24hrs_data('aqi_hist_3')
    # aqi_last24hrs = json.dumps(response,indent=4)
    return get_last24hrs_data('aqi_hist_3')

@app.route("/api/v1.0/weather_last24hrs")
def weather_last24hrs():
    # get_last24hrs_data('aqi_weather_3')
    # weather_last24hrs = json.dumps(response,indent=4)
    return get_last24hrs_data('aqi_weather_3')

if __name__ == '__main__':
    app.run(debug=True)