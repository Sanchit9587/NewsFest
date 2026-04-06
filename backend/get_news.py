import os
import requests
from dotenv import load_dotenv
import json

load_dotenv()
NEWS_API_KEY=os.getenv("NEWS_API_KEY")
PATH="/home/sanchit/Desktop/Sanchit/NewsFest/backend/all_news"
def save_data_news(data,domain) -> str:

    filename=f"news_{domain}.json"
    file_path=os.path.join(PATH,filename)
    #os.makedirs(PATH,exist_ok=True)
    with open(file_path,'w') as f:
        json.dump(data,f)

    return file_path

def save_data_headline(data) -> str:
    filename="headlines.json"
    file_path=os.path.join(PATH,filename)
    #os.makedirs(f"{PATH}/headlines.json",exist_ok=True)
    with open(file_path,'w') as f:
        json.dump(data,f)

    return file_path

def get_news(domain: str):
    base_url="https://newsapi.org/v2/everything"
    headers= {"X-Api-Key": NEWS_API_KEY}
    params={"q": f"{domain}"}

    response = requests.get(base_url, params=params, headers=headers)
    if response.status_code !=200:
        print(f"Failed to retrive News data")
        return None
    
    data=response.json()
    file_path=save_data_news(data,domain)
    print("Completed")
    return file_path
    

def get_headlines():
    base_url="https://newsapi.org/v2/top-headlines"
    headers= {"X-Api-Key": NEWS_API_KEY}
    params={"q": "India"}

    response = requests.get(base_url, params=params, headers=headers)
    if response.status_code !=200:
        print(f"Failed to retrive News data")
        return None
    
    data=response.json()
    file_path=save_data_headline(data)
    return file_path
    print("Completed")


#get_news("Apple")
#get_headlines()