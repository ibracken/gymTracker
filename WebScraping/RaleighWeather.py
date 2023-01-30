import requests
from bs4 import BeautifulSoup
import pandas as pd

page = requests.get("https://forecast.weather.gov/MapClick.php?lat=35.91156500000005&lon=-79.04829999999998#.Y9SCGXbMLEY")
soup = BeautifulSoup(page.content, "html.parser")
# Finds the div with id seven-day-forecast
seven_day = soup.find(id="seven-day-forecast")
# Inside this div, break it up into individual items(On the website it is denoted as tombstone-container)
forecast_items = seven_day.find_all(class_="tombstone-container")
Right_now = forecast_items[0]
# print(Right_now.prettify())

period = Right_now.find(class_="period-name").get_text()
short_desc = Right_now.find(class_="short-desc").get_text()
temp = Right_now.find(class_="temp").get_text()
print(period)
print(short_desc)
print(temp)

# Find the img
img = Right_now.find("img")
desc = img['title']
print(desc)

# Selects all of the items with name "period-name" inside tombstone-container in seven_day
period_tags = seven_day.select(".tombstone-container .period-name")
# Turns it into readable text
periods = [pt.get_text() for pt in period_tags]
print(periods)

# Uses the same methods as above, just gets text for different information
short_descs = [sd.get_text() for sd in seven_day.select(".tombstone-container .short-desc")]
temps = [t.get_text() for t in seven_day.select(".tombstone-container .temp")]
descs = [d["title"] for d in seven_day.select(".tombstone-container img")]
print(short_descs)
print(temps)
print(descs)

weather = pd.DataFrame({
    "Period": periods,
    "Brief Description": short_descs,
    "Temperature": temps,
    "Description":descs
})
print(weather)