from flask import Flask, jsonify, request
from pymongo import MongoClient

# class myObject:
#     def __init__(self):
#         self.data = {}

#     def __str__(self):
#         return str(self.data)

client = MongoClient('mongodb://localhost:27017')
db = client['chicken_stock']

app = Flask(__name__)

# @app.route('/api/data', methods=['GET'])
@app.route('/signup', methods=['POST'])

def a():
  data = request.get_json()
  
  print(data)
  
  collection = db['register']
  collection.insert_one(data)
  print('데이터 저장')
  
  return '데이터 저장 완료'

# def get_data():
#   my_object = myObject()

#   for i in range(len(symbols)):
#     key = symbols['한글명'][i]
#     value = {
#         '단축코드': symbols['단축코드'][i],
#         '시가총액': int(symbols['시가총액'][i])
#     }
#     my_object.data[key] = value
    
# # print(my_object)
#   data = my_object.data['에이스침대']
#   return jsonify(data)

if(__name__) == '__main__':
  app.run(host='0.0.0.0', port=5000)