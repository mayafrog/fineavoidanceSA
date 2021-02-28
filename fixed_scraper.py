from datetime import date
import requests
from bs4 import BeautifulSoup
import json

URL = 'https://www.police.sa.gov.au/your-safety/road-safety/traffic-camera-locations'
page = requests.get(URL)

soup = BeautifulSoup(page.content, 'html.parser')

rows = soup.find("table", id = "table35505").find("tbody").find_all("tr")

for row in rows:
    data = row.find_all("td")
    rn = data[0].get_text()
    print (data[1].get_text())
    d = data[2].get_text()

# clean = list()

# with open("locations.txt", "w") as output:
#     for location in clean:
#         output.write(str(location.contents[0]+"\n"))

# xml_out_DD = open("locations.xml", 'wb')
# xml_out_DD.write(bytes('<mobile>', 'utf-8'))
# for i in range(0, len(clean)):
#     xml_out_DD.write(bytes('<location>'  + clean[i].contents[0] + '</location>', 'utf-8'))
# xml_out_DD.write(bytes('</mobile>', 'utf-8'))
# xml_out_DD.close()

# with open('locations.json', 'w') as output:
#     for location in clean:
#         json.dump(location.contents[0], output, separators=(", ", ": "))