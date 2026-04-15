import psycopg2
import os
from dotenv import load_dotenv

def verify():
    load_dotenv(dotenv_path='../backend/.env')
    db_url = os.getenv('DATABASE_URL')
    
    try:
        conn = psycopg2.connect(db_url)
        cur = conn.cursor()
        cur.execute("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';")
        tables = cur.fetchall()
        print("Tables in database:")
        for table in tables:
            print(f"- {table[0]}")
        cur.close()
        conn.close()
    except Exception as e:
        print(f"Verification failed: {e}")

if __name__ == "__main__":
    verify()
