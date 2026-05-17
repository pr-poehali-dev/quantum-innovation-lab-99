import json
import os
import psycopg2

def handler(event: dict, context) -> dict:
    """Принимает заявку на 3D печать и сохраняет в базу данных."""
    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    body = json.loads(event.get('body') or '{}')
    name = body.get('name', '').strip()
    phone = body.get('phone', '').strip()
    email = body.get('email', '').strip()
    description = body.get('description', '').strip()

    if not name or not phone or not email:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Заполните все обязательные поля'})
        }

    conn = psycopg2.connect(os.environ['DATABASE_URL'], sslmode='disable')
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO orders (name, phone, email, description) VALUES (%s, %s, %s, %s) RETURNING id",
        (name, phone, email, description)
    )
    order_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'success': True, 'id': order_id})
    }
