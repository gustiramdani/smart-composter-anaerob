from firebase_admin import db
from app.connection.db import get_db_connection
from app import response
from datetime import datetime
from apscheduler.schedulers.background import BackgroundScheduler

def sync_data_from_fb_to_postgres():
    try:
        print("Syncing data from Firebase to PostgreSQL...")
        ref = db.reference('/sensors')
        sensors_data = ref.get()

        print(sensors_data.items())

        if sensors_data:
            conn = get_db_connection()
            cursor = conn.cursor()

            timestamp = datetime.now()
            
            flow_rate = float(sensors_data.get("flowRate", 0))
            ph = float(sensors_data.get("pH", 0))
            humidity = int(sensors_data.get("humidity", 0))
            temperature = float(sensors_data.get("temperatureDS18B20", 0))
            timestamp = int(sensors_data.get("timestamp", 0))

            cursor.execute('''
                INSERT INTO sensors (temperature, humidity, flow_rate, ph, timestamp)
                VALUES (%s, %s, %s, %s, %s)
                ''', (temperature, humidity, flow_rate, ph, timestamp))
            
            conn.commit()
            cursor.close()
            conn.close()

            print(f'Data successfully synced to database at {timestamp}')
                
        else:
            print('No data retrieved from Firebase')
    except Exception as e:
        print(str(e))
        return response.badRequest([], str(e))

scheduler = BackgroundScheduler()
scheduler.add_job(sync_data_from_fb_to_postgres, 'interval', minutes=10)
scheduler.start()