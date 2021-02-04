from datetime import date
import requests
from bs4 import BeautifulSoup
import os

today = date.today()
today = (today.strftime("%d/%m/%Y"))

URL = 'https://www.police.sa.gov.au/your-safety/road-safety/traffic-camera-locations'
page = requests.get(URL)

soup = BeautifulSoup(page.content, 'html.parser')
locations = soup.findAll("li", {"data-value": today})

clean = list()

# removing duplicates
for location in locations:
    if location not in clean:
        clean.append(location)

# outputting as a plaintext file
# with open("locations.txt", "w") as output:
#     for location in clean:
#         output.write(str(location.contents[0]+"\n"))

xml_out_DD = open("test.xml", 'wb')
xml_out_DD.write(bytes('<mobile>', 'utf-8'))
for i in range(0, len(clean)):
    xml_out_DD.write(bytes('<location>'  + clean[i].contents[0] + '</location>', 'utf-8'))
xml_out_DD.write(bytes('</mobile>', 'utf-8'))
xml_out_DD.close()