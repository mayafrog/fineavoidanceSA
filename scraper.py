from datetime import date
import requests
from bs4 import BeautifulSoup
import json
from github import Github
g = Github("USER","PAT") # REPLACE WITH USER & PERSONAL ACCESS TOKEN

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

with open("locations.txt", "w") as output:
    for location in clean:
        output.write(str(location.contents[0]+"\n"))

xml_out_DD = open("locations.xml", 'wb')
xml_out_DD.write(bytes('<mobile>', 'utf-8'))
for i in range(0, len(clean)):
    xml_out_DD.write(bytes('<location>'  + clean[i].contents[0] + '</location>', 'utf-8'))
xml_out_DD.write(bytes('</mobile>', 'utf-8'))
xml_out_DD.close()

with open('locations.json', 'w') as output:
    for location in clean:
        json.dump(location.contents[0], output, separators=(", ", ": "))

#uploading file directly to github
#remember to include username / password

repo = g.get_user().get_repo("fineavoidanceSA")
all_files = []
contents = repo.get_contents("")
while contents:
    file_content = contents.pop(0)
    if file_content.type == "dir":
        contents.extend(repo.get_contents(file_content.path))
    else:
        file = file_content
        all_files.append(str(file).replace('ContentFile(path="','').replace('")',''))

with open('/mnt/c/Users/Nhan1/Dropbox/Projects/locations.txt') as file:
    content = file.read()

# Upload to github
git_file = 'locations.txt'
if git_file in all_files:
    contents = repo.get_contents(git_file)
    repo.update_file(contents.path, "automatic update", content, contents.sha, branch="main")
    print(git_file + ' UPDATED')
else:
    repo.create_file(git_file, "automatic update", content, branch="main")
    print(git_file + ' CREATED')