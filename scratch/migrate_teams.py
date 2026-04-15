import psycopg2
import os
from dotenv import load_dotenv

def migrate():
    load_dotenv('backend/.env')
    db_url = os.getenv('DATABASE_URL')
    
    commands = [
        "ALTER TABLE teams ADD COLUMN IF NOT EXISTS sector_other TEXT",
        "ALTER TABLE teams ADD COLUMN IF NOT EXISTS problem_statement TEXT",
        "ALTER TABLE teams ADD COLUMN IF NOT EXISTS problem_score INT DEFAULT 0",
        "ALTER TABLE teams ADD COLUMN IF NOT EXISTS solution_description TEXT",
        "ALTER TABLE teams ADD COLUMN IF NOT EXISTS solution_score INT DEFAULT 0",
        "ALTER TABLE teams ADD COLUMN IF NOT EXISTS product_type TEXT",
        "ALTER TABLE teams ADD COLUMN IF NOT EXISTS product_type_other TEXT",
        "ALTER TABLE teams ADD COLUMN IF NOT EXISTS unique_value TEXT",
        "ALTER TABLE teams ADD COLUMN IF NOT EXISTS unique_value_score INT DEFAULT 0",
        "ALTER TABLE teams ADD COLUMN IF NOT EXISTS users_tested INT DEFAULT 0",
        "ALTER TABLE teams ADD COLUMN IF NOT EXISTS testing_details TEXT",
        "ALTER TABLE teams ADD COLUMN IF NOT EXISTS stakeholders_interacted INT DEFAULT 0",
        "ALTER TABLE teams ADD COLUMN IF NOT EXISTS stakeholder_types TEXT",
        "ALTER TABLE teams ADD COLUMN IF NOT EXISTS customer_interview_score INT DEFAULT 0",
        "ALTER TABLE teams ADD COLUMN IF NOT EXISTS customer_interview_details TEXT",
        "ALTER TABLE teams ADD COLUMN IF NOT EXISTS competitor_score INT DEFAULT 0",
        "ALTER TABLE teams ADD COLUMN IF NOT EXISTS competitor_details TEXT",
        "ALTER TABLE teams ADD COLUMN IF NOT EXISTS market_size_score INT DEFAULT 0",
        "ALTER TABLE teams ADD COLUMN IF NOT EXISTS market_size_details TEXT",
        "ALTER TABLE teams ADD COLUMN IF NOT EXISTS revenue_model_score INT DEFAULT 0",
        "ALTER TABLE teams ADD COLUMN IF NOT EXISTS revenue_model_details TEXT",
        "ALTER TABLE teams ADD COLUMN IF NOT EXISTS bmc_score INT DEFAULT 0",
        "ALTER TABLE teams ADD COLUMN IF NOT EXISTS bmc_details TEXT",
        "ALTER TABLE teams ADD COLUMN IF NOT EXISTS pitch_deck_score INT DEFAULT 0",
        "ALTER TABLE teams ADD COLUMN IF NOT EXISTS pitch_deck_details TEXT",
        "ALTER TABLE teams ADD COLUMN IF NOT EXISTS elevator_score INT DEFAULT 0",
        "ALTER TABLE teams ADD COLUMN IF NOT EXISTS elevator_details TEXT",
        "ALTER TABLE teams ADD COLUMN IF NOT EXISTS investor_ask_score INT DEFAULT 0",
        "ALTER TABLE teams ADD COLUMN IF NOT EXISTS investor_ask_details TEXT"
    ]
    
    try:
        conn = psycopg2.connect(db_url)
        cur = conn.cursor()
        print("Applying migrations...")
        for cmd in commands:
            try:
                cur.execute(cmd)
                print(f"Executed: {cmd[:40]}...")
            except Exception as e:
                print(f"Skipped/Failed: {cmd[:40]}... Error: {e}")
                conn.rollback()
                        
        conn.commit()
        print("OK: Migration complete!")
        cur.close()
        conn.close()
    except Exception as e:
        print(f"ERROR: Migration failed: {e}")

if __name__ == "__main__":
    migrate()
