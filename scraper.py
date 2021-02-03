from datetime import date
import requests
from bs4 import BeautifulSoup

today = date.today()
today = (today.strftime("%d/%m/%Y"))

URL = 'https://www.police.sa.gov.au/your-safety/road-safety/traffic-camera-locations'
page = requests.get(URL)

soup = BeautifulSoup(page.content, 'html.parser')
locations = soup.findAll("li", {"data-value": today})

clean = list()

for location in locations:
    if location not in clean:
        clean.append(location)

with open("locations.txt", "w") as output:
    for location in clean:
        output.write(str(location.contents[0]+"\n"))