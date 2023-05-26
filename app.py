from flask import Flask
from pymongo import MongoClient
from bson.json_util import dumps
app = Flask(__name__)

client = MongoClient('mongodb://localhost:27017')

# 데이터베이스를 선택합니다.
db = client.jongyoon


@app.route('/cute')
def hello_world():
    return 'Hello, World!'


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
