from flask import jsonify, render_template
from app import app
from app.connection.db import get_db_connection

# For Dashboard
@app.route('/get_latest_data', methods=['GET'])
def get_latest_data():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM sensors ORDER BY timestamp DESC LIMIT 1')
    row = cursor.fetchone()
    cursor.close()
    conn.close()

    if row:
        data = {
            'temperature': row[1],
            'humidity': row[4],
            'ph': row[3],
            'flow_rate': row[2],
            'timestamp': row[5]
        }
        return jsonify(data)
    else:
        return jsonify([], 'No data found')
    
@app.route('/dashboard', methods=['GET'])
def dashboard():
    return render_template('index.html')

# END: For Dashboard

# For historical data
@app.route('/get_historical_data', methods=['GET'])
def historical_data():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT DISTINCT temperature, humidity, ph, flow_rate, timestamp FROM sensors ORDER BY timestamp DESC')
    row = cursor.fetchall()
    cursor.close()
    conn.close()

    return jsonify(row)
# END: For historical data