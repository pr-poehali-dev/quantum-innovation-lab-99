import json
import os
import psycopg2
import psycopg2.extras

def handler(event: dict, context) -> dict:
    """Возвращает список всех заявок на 3D печать из базы данных."""
    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    conn = psycopg2.connect(os.environ['DATABASE_URL'], sslmode='disable')
    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    cur.execute("SELECT id, name, phone, email, description, created_at FROM orders ORDER BY created_at DESC")
    rows = cur.fetchall()
    cur.close()
    conn.close()

    orders = []
    for row in rows:
        orders.append({
            'id': row['id'],
            'name': row['name'],
            'phone': row['phone'],
            'email': row['email'],
            'description': row['description'],
            'created_at': row['created_at'].isoformat() if row['created_at'] else None
        })

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'orders': orders})
    }
