# AQI History
Tracking Air Quality Index (AQI) numbers  and factors over time

!!! If you're reading this, please know that this project is still in development, additional documentation and visualization are coming soon.  Thanks!

## Overview
Growing up in southern California, I've been aware of and exposed to a good amount of smog and air pollution.  With seasonal wildfires also in the mix, I thought it might be interesting to track the AQI around me over time, to see if there are any trends and maybe if I notice the effects of changes in air quality.  

However, I don't just stay in one place in SoCal, so I wanted to build a tool that would track the air quality that I'm exposed to as I move around SoCal over time.  This application uses my location data from my Apple Watch to query for AQI data and then plots that data over time (to be implemented soon).

## Elements
Based on the scope described in the overview, I needed the following elements:
- Location data
- AQI data
- A way to store the data I collect
- A way to run my python script on a regular basis

The subsections below describe the process to implement each of these elements.

### Location: pyicloud
pyicloud allows you to connect to an iCloud account using Python.  I wrote a ```config.py``` file to handle the login info for pyicloud, you can see an example of this file here: [config_example.py](examples/config_example.py).  If you have 2FA set up on your iCloud account (not a bad idea), you'll need some extra python to handle the 2FA login process and submit a 6-digit auth number from one of your other iCloud devices.  The code is available in the pyicloud documentation, and I've copied it into the ```config_example.py``` file.

Once your devices are loaded, you can set a variable to a specific iCloud device and use that for location data (I've used my Apple Watch for this project).

### Weather/AQI data: OpenWeatherMap
OpenWeatherMap provides APIs for weather data, including AQI data.  Using the lat and lon coordinates from my Apple Watch, I'm running API requests for AQI data.  My OpenWeatherMap API key is saved in my ```config.py``` file, but you can see how I have things structured in the ```config_example.py``` file.

The actual API request is handled in [main.py](main.py).  Once I have the response, I'm storing the response data in...

### Data storage: DynamoDB
In [main.py](main.py), the data returned from OpenWeatherMap are saved as variables and uploaded to an AWS DynamoDB table.  Note that I am not storing the lat/lon data to the database: I have no interest in tracking my location over time, just the air quality of wherever I am over time.  

The storage method may change in the future, depending on how I am vizualizing data.  I may shift to storing a 24-hour period of data on DynamoDB, and uploading that data to the table on a daily basis from a local file that collects the AQI data during the course of the day.  Not sure how best to handle this.

### Automation: launchd and plist file
I'd really rather not push a button or carry my computer with me all the time to get data, so I set up a daemon on my Mac using launchd and a .plist file.  This file is set to automatically run the ```main.py``` script every 30 minutes (every 1800 seconds for those playing at home).  You can see an example of how I've set up the .plist file in [com.example.daemon.plist](examples/com.example.daemon.plist).

### References
[pyicloud](https://pypi.org/project/pyicloud/) - The Python library I used to connect to iCloud for location and device status data from my iCloud devices.

[OpenWeatherMap API](https://openweathermap.org/api) - An amazing API for pulling weather data based on locations (either with lat/lon coordinates or city names).

[A Simple Launchd Tutorial - Chet Corcos](https://medium.com/@chetcorcos/a-simple-launchd-tutorial-9fecfcf2dbb3) - A great tutorial on how to get set up using launched on macOS, including a helpful template for how to set up a .plist file.  Thanks Chet!
