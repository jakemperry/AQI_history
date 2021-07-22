from botocore.serialize import DEFAULT_TIMESTAMP_FORMAT
import requests
import os
import json
import boto3
import decimal
from datetime import datetime
import numpy as np

dynamo_client = boto3.Session(region_name='us-west-1').client('dynamodb')

def get_yesterday_data(table):
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

aqi_value=[]
co=[]
nh3=[]
no=[]
no2=[]
o3=[]
pm2_5=[]
pm10=[]
so2=[]

for item in response["Items"]:
    aqi_value.append(float(item['aqi_value']["N"]))
    co.append(float(item['co']["N"]))
    nh3.append(float(item['nh3']["N"]))
    no.append(float(item['no']["N"]))
    no2.append(float(item['no2']["N"]))
    o3.append(float(item['o3']["N"]))
    pm2_5.append(float(item['pm2_5']["N"]))
    pm10.append(float(item['pm10']["N"]))
    so2.append(float(item["so2"]["N"]))

aqi_value_mean=round(decimal.Decimal(np.mean(aqi_value)),2)
aqi_value_median=round(decimal.Decimal(np.median(aqi_value)),2)
aqi_value_std = round(decimal.Decimal(np.std(aqi_value)),2)
aqi_value_min=round(decimal.Decimal(np.min(aqi_value)),2)
aqi_value_max=round(decimal.Decimal(np.max(aqi_value)),2)

co_mean=round(decimal.Decimal(np.mean(co)),2)
co_median=round(decimal.Decimal(np.median(co)),2)
co_std = round(decimal.Decimal(np.std(co)),2)
co_min=round(decimal.Decimal(np.min(co)),2)
co_max=round(decimal.Decimal(np.max(co)),2)

nh3_mean=round(decimal.Decimal(np.mean(nh3)),2)
nh3_median=round(decimal.Decimal(np.median(nh3)),2)
nh3_std = round(decimal.Decimal(np.std(nh3)),2)
nh3_min=round(decimal.Decimal(np.min(nh3)),2)
nh3_max=round(decimal.Decimal(np.max(nh3)),2)

no_mean=round(decimal.Decimal(np.mean(no)),2)
no_median=round(decimal.Decimal(np.median(no)),2)
no_std = round(decimal.Decimal(np.std(no)),2)
no_min=round(decimal.Decimal(np.min(no)),2)
no_max=round(decimal.Decimal(np.max(no)),2)

no2_mean=round(decimal.Decimal(np.mean(no2)),2)
no2_median=round(decimal.Decimal(np.median(no2)),2)
no2_std = round(decimal.Decimal(np.std(no2)),2)
no2_min=round(decimal.Decimal(np.min(no2)),2)
no2_max=round(decimal.Decimal(np.max(no2)),2)

o3_mean=round(decimal.Decimal(np.mean(o3)),2)
o3_median=round(decimal.Decimal(np.median(o3)),2)
o3_std = round(decimal.Decimal(np.std(o3)),2)
o3_min=round(decimal.Decimal(np.min(o3)),2)
o3_max=round(decimal.Decimal(np.max(o3)),2)

pm2_5_mean=round(decimal.Decimal(np.mean(pm2_5)),2)
pm2_5_median=round(decimal.Decimal(np.median(pm2_5)),2)
pm2_5_std = round(decimal.Decimal(np.std(pm2_5)),2)
pm2_5_min=round(decimal.Decimal(np.min(pm2_5)),2)
pm2_5_max=round(decimal.Decimal(np.max(pm2_5)),2)

pm10_mean=round(decimal.Decimal(np.mean(pm10)),2)
pm10_median=round(decimal.Decimal(np.median(pm10)),2)
pm10_std = round(decimal.Decimal(np.std(pm10)),2)
pm10_min=round(decimal.Decimal(np.min(pm10)),2)
pm10_max=round(decimal.Decimal(np.max(pm10)),2)

so2_mean=round(decimal.Decimal(np.mean(so2)),2)
so2_median=round(decimal.Decimal(np.median(so2)),2)
so2_std = round(decimal.Decimal(np.std(so2)),2)
so2_min=round(decimal.Decimal(np.min(so2)),2)
so2_max=round(decimal.Decimal(np.max(so2)),2)

dynamo_client= boto3.resource('dynamodb', region_name='us-west-1') 
aqi_table = dynamo_client.Table('aqi_hist_3')
utc = datetime.utcfromtimestamp(int(date)).strftime('%Y-%m-%d %H:%M:%S')
aqi_table.put_item(
    Item={
        'entry_type':'daily_sum',
        'unix_time': date,
        'utc': utc,
        'aqi_value': {
            "M":{
                'aqi_value_mean':{
                    "N":aqi_value_mean
                },
                'aqi_value_median':{
                    "N":aqi_value_median
                },
                'aqi_value_std':{
                    "N":aqi_value_std
                },
                'aqi_value_min':{
                    "N":aqi_value_min
                },
                'aqi_value_max':{
                    "N":aqi_value_max
                }
            }
        },
        'co': {
            "M":{
                'co_mean':{
                    "N":co_mean
                },
                'co_median':{
                    "N":co_median
                },
                'co_std':{
                    "N":co_std
                },
                'co_min':{
                    "N":co_min
                },
                'co_max':{
                    "N":co_max
                }
            }
        },
        'no': {
            "M":{
                'no_mean':{
                    "N":no_mean
                },
                'no_median':{
                    "N":no_median
                },
                'no_std':{
                    "N":no_std
                },
                'no_min':{
                    "N":no_min
                },
                'no_max':{
                    "N":no_max
                }
            }
        },
        'no2':{
            "M":{
                'no2_mean':{
                    "N":no2_mean
                },
                'no2_median':{
                    "N":no2_median
                },
                'no2_std':{
                    "N":no2_std
                },
                'no2_min':{
                    "N":no2_min
                },
                'no2_max':{
                    "N":no2_max
                }
            }
        },
        'o3':{
            "M":{
                'o3_mean':{
                    "N":o3_mean
                },
                'o3_median':{
                    "N":o3_median
                },
                'o3_std':{
                    "N":o3_std
                },
                'o3_min':{
                    "N":o3_min
                },
                'o3_max':{
                    "N":o3_max
                }
            }
        },
        'so2':{
            "M":{
                'so2_mean':{
                    "N":so2_mean
                },
                'so2_median':{
                    "N":so2_median
                },
                'so2_std':{
                    "N":so2_std
                },
                'so2_min':{
                    "N":so2_min
                },
                'so2_max':{
                    "N":so2_max
                }
            }
        },
        'pm2_5':{
            "M":{
                'pm2_5_mean':{
                    "N":pm2_5_mean
                },
                'pm2_5_median':{
                    "N":pm2_5_median
                },
                'pm2_5_std':{
                    "N":pm2_5_std
                },
                'pm2_5_min':{
                    "N":pm2_5_min
                },
                'pm2_5_max':{
                    "N":pm2_5_max
                }
            }
        },
        'pm10': {
            "M":{
                'pm10_mean':{
                    "N":pm10_mean
                },
                'pm10_median':{
                    "N":pm10_median
                },
                'pm10_std':{
                    "N":pm10_std
                },
                'pm10_min':{
                    "N":pm10_min
                },
                'pm10_max':{
                    "N":pm10_max
                }
            }
        },
        'nh3': {
            "M":{
                'nh3_mean':{
                    "N":nh3_mean
                },
                'nh3_median':{
                    "N":nh3_median
                },
                'nh3_std':{
                    "N":nh3_std
                },
                'nh3_min':{
                    "N":nh3_min
                },
                'nh3_max':{
                    "N":nh3_max
                }
            }
        },

    }
)
print(f'successfully uploaded record: {date} / {utc}')