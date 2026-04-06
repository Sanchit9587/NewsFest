from fastapi import FastAPI, HTTPException, Query
from fastapi.responses import JSONResponse
from sqlmodel import SQLModel, Session, Field, create_engine, Relationship, select
from sqlalchemy import Column
from sqlalchemy.dialects.postgresql import JSONB
from pydantic import AnyUrl, AwareDatetime 
from typing import Annotated, Dict, Optional, Dict
import os
from dotenv import load_dotenv
import json
from datetime import datetime
from backend.get_news import get_news, get_headlines
from backend.get_summary import summarize
from fastapi.middleware.cors import CORSMiddleware
app=FastAPI()
load_dotenv()
DATABASE_URL=os.getenv("DATABASE_URL")

if DATABASE_URL is None:
    raise ValueError({'message':'Please insert your database url in the .env file'})

engine = create_engine(DATABASE_URL)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # later restrict this
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class News(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    domain: Optional[str] = None
    source: dict = Field(sa_column=Column(JSONB))
    author: Optional[str] = None
    title: str
    url: str
    url_to_image: Optional[str] = None
    published_at: Optional[datetime] = None
    content: Optional[str] = None

    bookmarks: list["Bookmarks"] = Relationship(back_populates="news")
    summaries: list["Summary"] = Relationship(back_populates="news")

class Credentials(SQLModel, table=True):
    user_name: str = Field(primary_key=True)
    user_password: Annotated[str, Field(..., description="Users password")]

    bookmarks: list["Bookmarks"] = Relationship(back_populates="user")
    summaries: list["Summary"] = Relationship(back_populates="user")

class Bookmarks(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_name: Annotated[str, Field(...,foreign_key="credentials.user_name", description="The the username of the user")]
    news_id: Annotated[int,Field(...,foreign_key="news.id", description="The id of the news which links it to the main news table")]

    user: Optional[Credentials] = Relationship(back_populates="bookmarks")
    news: Optional[News] = Relationship(back_populates="bookmarks")

class Summary(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_name: Annotated[str, Field(...,foreign_key="credentials.user_name", description="The the username of the user")]
    news_id: Annotated[int,Field(...,foreign_key="news.id", description="The id of the news which links it to the main news table")]
    summary: Optional[str]

    user: Optional[Credentials] = Relationship(back_populates="summaries")
    news: Optional[News] = Relationship(back_populates="summaries")


# #pydantic model for bookmarked articles
# class News(SQLModel, table=True):
#     user_id: Annotated[str, Field(...,description="The id of the user",examples=['P0001'])]
#     id: int | None = Field(default=None, primary_key=True)
#     source: Annotated[Dict[str,str],Field(..., description="Contains the id and name of the source")]
#     author: Annotated[str,Field(...,description="Name of the Author of the article")]
#     title : Annotated[str,Field(...,description="Title of the Article")]
#     url: Annotated[AnyUrl, Field(...,description="URL to the article")]
#     urlToImage: Annotated[AnyUrl, Field(..., description="URL to the image related to the article")]
#     PublishedAT: Annotated[AwareDatetime,Field(..., description="Date and time this article was published")]
#     content: Annotated[str, Field(...,description="Content of the article")]

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

def add_news(data: dict):
    with Session(engine) as session:
        existing = session.exec(
            select(News).where(News.url == data["url"])).first()
        if existing:
            return existing
        news = News(**data)
        session.add(news)
        session.commit()
        session.refresh(news)
        return news
    
def bookmark_news(user_name: str, news_id: int):
    with Session(engine) as session:
        bookmark = Bookmarks(user_name=user_name, news_id=news_id)
        session.add(bookmark)
        session.commit()
        return bookmark
    
def add_summary(user_name: str, news_id: int, text: str):
    with Session(engine) as session:
        summary = Summary(
            user_name=user_name,
            news_id=news_id,
            summary=text
        )
        session.add(summary)
        session.commit()
        return summary

def add_user(user_name: str, password: str):
    with Session(engine) as session:
        statement = select(Credentials).where(Credentials.user_name == user_name) #db already checks this but still i just added a check here
        existing_user = session.exec(statement).first()

        if existing_user:
            raise HTTPException(
                status_code=400,
                detail="Username already exists"
            )

        new_user = Credentials(
            user_name=user_name,
            user_password=password
        )

        session.add(new_user)
        session.commit()
        session.refresh(new_user)

        return new_user

def check_user(user_name:str):
    with Session(engine) as session:
        statement= select(Credentials).where(Credentials.user_name==user_name)
        existing_user=session.get(Credentials, user_name)

        return existing_user

def get_user_bookmarks(user_name: str):
    with Session(engine) as session:
        statement = (
            select(News)
            .join(Bookmarks)
            .where(Bookmarks.user_name == user_name)
        )
        return session.exec(statement).all()

def get_user_summaries(user_name: str):
    with Session(engine) as session:
        statement = (
            select(Summary, News)
            .join(News)
            .where(Summary.user_name == user_name)
        )
        return session.exec(statement).all()

def format_add_news(file_path,domain):

    if file_path is None:
        raise ValueError("Failed to get news for the given domain")
    with open(file_path,"r") as f:
        data=json.load(f)

    data=data["articles"]
    for article in data:
        article["domain"]=domain
        article["url_to_image"] = article.get("urlToImage")
        add_news(article)
    return data

def load_data_news(domain):
    file_path = get_news(domain)

    if file_path is None:
        raise ValueError("Failed to get news for the given domain")

    with open(file_path, "r") as f:
        data = json.load(f)

    data = format_add_news(file_path, domain)
    return data 
# def load_data_headline():
#     file_path=get_headlines()

#     if file_path is None: 
#         raise ValueError("Failed to get news for the given domain")
  

@app.on_event("startup")
def on_startup():
    create_db_and_tables()

@app.get("/")
def landing_page(user_name: str = Query(None)):
    news = []
    topics = ["India","World","Business","Technology","Sports","Entertainment","Health","Science"]

    for topic in topics:
        formatted_news = load_data_news(topic)
        news.append({
            "topic": topic,
            "articles": formatted_news
        })
    return news 

@app.get('/news')
def retrieve_news(domain: str = Query(...)):
    if not isinstance(domain, str):
        raise HTTPException(status_code=400, detail="Enter valid domain")

    data = load_data_news(domain)
    return data 

@app.get('/bookmarks')
def retrieve_user_bookmarks(user_name:str=Query(...,description="The user_name for which you want all the bookmarks")):
    bookmarks=get_user_bookmarks(user_name)
    return bookmarks

@app.get('/summaries')
def retrieve_user_summaries(user_name:str=Query(...,description="The user_name for which you want all the bookmarks")):
    summaries=get_user_summaries(user_name)
    return summaries

@app.post('/sign_up')
def create_user(credentials: Credentials):
    add_user(credentials.user_name, credentials.user_password)
    return JSONResponse(status_code=201, content={'message':'User created successfully'})


@app.post('/login')
def check_user_creds(credentials:Credentials):
    existing_user=check_user(credentials.user_name)

    if existing_user is None or existing_user.user_password != credentials.user_password:
        raise HTTPException(status_code=404, detail="Either the user doesn't exist or wrong password")
    
    return JSONResponse(status_code=200, content={'message':'User details are valid'})

@app.post('/bookmark')
def add_bookmark(credentials: Credentials, news: News):
    if news.id is None:
        raise HTTPException(status_code=400,detail="Invalid news")
    bookmark_news(credentials.user_name, news.id)
    return JSONResponse(status_code=200, content={'message':'Bookmarked this news article'})

@app.post('/summary')
def generate_summary(news: News):
    if news.content is None:
        raise HTTPException(status_code=400, detail="Invalid news")

    summary = summarize(news.content)
    return {"summary": summary}

