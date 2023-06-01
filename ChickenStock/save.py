from flask import Flask, jsonify, request
from pymongo import MongoClient
import json

client = MongoClient('mongodb+srv://ChickenStock:1234@jiseop.g8czkiu.mongodb.net/')
db = client['chicken_stock']

app = Flask(__name__)

@app.route('/signup', methods=['POST'])
def register():
    data = request.get_json()
  
    print(data)
  
    collection = db['user_info']
    collection.insert_one(data)
    print('데이터 저장')
  
    # # JSON 파일에 데이터를 추가하여 저장
    # json_file = 'data.json'  # JSON 파일 경로
    # existing_data = []
    # try:
    #     with open(json_file, 'r') as file:
    #         existing_data = json.load(file)
    # except FileNotFoundError:
    #     pass

    # existing_data.append(data)

    # with open(json_file, 'w') as file:
    #     json.dump(existing_data, file)
    
    return '데이터 저장 완료'

if(__name__) == '__main__':
  app.run(host='0.0.0.0', port=5000)