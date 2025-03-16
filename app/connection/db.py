import psycopg2
from dotenv import load_dotenv
import os

load_dotenv()

def get_db_connection():
    host = os.getenv("DB_HOST")
    database = os.getenv("DB_NAME")
    user = os.getenv("DB_USER")
    password = os.getenv("DB_PASSWORD")

    conn = psycopg2.connect(
        host=host,
        database=database,
        user=user,
        password=password
    )

    return conn
