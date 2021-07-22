from botocore.serialize import DEFAULT_TIMESTAMP_FORMAT
import requests
import os
import json
import boto3
import decimal
from datetime import datetime

response=''
# date=0
dynamo_client = boto3.Session(region_name='us-west-1').client('dynamodb')



def get_yesterday_data(table):
    # table=table

    nowString = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    nowStringEven = datetime.strptime(nowString.split()[0],'%Y-%m-%d')

    date=int(round(datetime.timestamp(nowStringEven),0))
    response = dynamo_client.query(
        TableName=table,
        KeyConditionExpression='entry_type = :entry_type AND unix_time BETWEEN :dateprev AND :datenow',
        ExpressionAttributeValues={
            ':entry_type':{'S': 'sample'},
            ':datenow': {'N': str(date-1)},
            ':dateprev': {'N': str(date - 86400)},
        }
    )
    return response, date

response, date = get_yesterday_data('aqi_hist_3')
print(json.dumps(response, indent=4))
print(date)

# aqi_url = "https://wthdz1g2p5.execute-api.us-west-1.amazonaws.com/dev/api/v1.0/aqi_last24hrs"
# weather_url = "https://wthdz1g2p5.execute-api.us-west-1.amazonaws.com/dev/api/v1.0/weather_last24hrs"

# aqi_json = requests.get(aqi_url).json()

# print(json.dumps(aqi_json, indent=4))

# nowString = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
# print(nowString)

# nowStringEven = datetime.strptime(nowString.split()[0],'%Y-%m-%d')
# print(nowStringEven)

# print('unix time')
# print(round(datetime.timestamp(nowStringEven),0))

