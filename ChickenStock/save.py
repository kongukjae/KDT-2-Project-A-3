from flask import Flask, jsonify, request
from pymongo import MongoClient

class myObject:
    def __init__(self):
        self.data = {}

    def __str__(self):
        return str(self.data)
        
client = MongoClient('mongodb://localhost:27017')
db = client['chicken_stock']

app = Flask(__name__)

@app.route('/signup', methods=['POST'])

def register():
  data = request.get_json()
  
  print(data)
  
  collection = db['register']
  collection.insert_one(data)
  print('데이터 저장')
  
  return '데이터 저장 완료'

if(__name__) == '__main__':
  app.run(host='0.0.0.0', port=5000)