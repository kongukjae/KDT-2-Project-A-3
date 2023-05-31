<<<<<<< HEAD
=======
import mojito
from flask import Flask, jsonify, request
from pymongo import MongoClient

key = "PSVT5oQXN4N39r3jhoLtrCiVen4fcJ3p7zOh"
secret = "OeeQY05O9OEfjuOP2KEtVpbP77p8WKaClPqgOEdSAVdH/FazfG51bqSc97t16uYOsvjb5DzrbqB11cfuMfBXPtwDB2BQqg7otSZAHo61OkobqBGPWJHGOHE/lt+X4WPNhyDiDu06EMiC6t+lvcIrG50t4/alJf7qhfL/dkg8sfOJgC66SDA="
acc_no = "00000000-01"

broker = mojito.KoreaInvestment(api_key=key, api_secret=secret, acc_no=acc_no)
# # print(dir(broker))
resp = broker.fetch_price("005930")
# # pprint.pprint(resp)
# # print("시가   :  ", resp['output']['stck_oprc'])    # 시가
# # print("현재가 :  ", resp['output']['stck_prpr'])    # 시가
# # print("최고가 : ", resp['output']['stck_hgpr'])     # 고가
# # print("최저가 : ", resp['output']['stck_lwpr'])     # 저가
# # print("종가   : ", resp['output']['stck_prpr'])     # 종가

# symbols = broker.fetch_kosdaq_symbols()        # 코스닥
# print(dir(symbols))


class myObject:
    def __init__(self):
        self.data = {}

    def __str__(self):
        return str(self.data)

client = MongoClient('mongodb://localhost:27017')
db = client['chicken_stock']

app = Flask(__name__)

@app.route('/api/data', methods=['GET'])
@app.route('/api/user-info', methods=['POST'])

def user_info():
  data = request.get_json()
  
  print(data)
  
  collection = db['user_info']
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
>>>>>>> 9c58872ff4706dd0b360fe756b7ad19edb563c99
