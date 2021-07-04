# An attempt to set up cron job using python.
# Potentially useful on Raspberry Pi?  jakemperry to investigate...
from crontab import CronTab

cron = CronTab(user='jakemperry')
job = cron.new(command='python /Users/jakemperry/DataClass/AQI_history/main.py')
job.minutes.every(5)
# job.every_reboot()

cron.write()

for item in cron:
    print(item)