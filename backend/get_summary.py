import os
from dotenv import load_dotenv
from google import genai

load_dotenv()
GEMINI_API_KEY=os.getenv("GEMINI_API_KEY")
client = genai.Client()

def summarize(text:str):
    prompt="Please summarize this text given below into 100 words or less"
    content=prompt+text
    response = client.models.generate_content(
        model="gemini-3-flash-preview",
        contents=content
    )
    return response.text
