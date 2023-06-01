import mojito
from flask import Flask, jsonify
import pprint,json
from pymongo import MongoClient
key = "PSVT5oQXN4N39r3jhoLtrCiVen4fcJ3p7zOh"
secret = "OeeQY05O9OEfjuOP2KEtVpbP77p8WKaClPqgOEdSAVdH/FazfG51bqSc97t16uYOsvjb5DzrbqB11cfuMfBXPtwDB2BQqg7otSZAHo61OkobqBGPWJHGOHE/lt+X4WPNhyDiDu06EMiC6t+lvcIrG50t4/alJf7qhfL/dkg8sfOJgC66SDA="
acc_no = "00000000-01"

broker = mojito.KoreaInvestment(
    api_key=key,
    api_secret=secret,
    acc_no=acc_no
)
# symbols = broker.fetch_kospi_symbols()

# # "삼성전자"의 정보를 가져옵니다.
# samsung = symbols[symbols['한글명'] == '삼성전자']
symbols = broker.fetch_kospi_symbols()


samsung = symbols[symbols['한글명'] == '삼성전자']

samsung_code = samsung['단축코드'].values[0]


samsung_price = broker.fetch_price(samsung_code)

samsung_json = json.dumps(samsung_price)

# print(samsung)
client = MongoClient('mongodb://localhost:27017/')
db = client['my_database']
new_collection = db['new_collection']
samsung_json = json.loads(samsung_price.to_json(orient='records'))

# MongoDB에 데이터 삽입
insert_result = new_collection.insert_many(samsung_price)
