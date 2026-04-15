import psycopg2
import os
from dotenv import load_dotenv

def migrate():
    # Load from backend/.env
    load_dotenv(dotenv_path='../backend/.env')
    db_url = os.getenv('DATABASE_URL')
    
    if not db_url:
        print("Error: DATABASE_URL not found in backend/.env")
        return

    try:
        print(f"Connecting to remote database...")
        conn = psycopg2.connect(db_url)
        cur = conn.cursor()
        
        print("Reading schema.sql...")
        with open('../schema.sql', 'r') as f:
            sql = f.read()
        
        print("Executing schema...")
        cur.execute(sql)
        conn.commit()
        
        print("✅ Database migration successful!")
        cur.close()
        conn.close()
    except Exception as e:
        print(f"❌ Migration failed: {e}")

if __name__ == "__main__":
    migrate()
