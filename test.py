import mojito
from flask import Flask, jsonify
import pprint
from pymongo import MongoClient
from pykrx import stock
key = "PSVT5oQXN4N39r3jhoLtrCiVen4fcJ3p7zOh"
secret = "OeeQY05O9OEfjuOP2KEtVpbP77p8WKaClPqgOEdSAVdH/FazfG51bqSc97t16uYOsvjb5DzrbqB11cfuMfBXPtwDB2BQqg7otSZAHo61OkobqBGPWJHGOHE/lt+X4WPNhyDiDu06EMiC6t+lvcIrG50t4/alJf7qhfL/dkg8sfOJgC66SDA="
acc_no = "00000000-01"

broker = mojito.KoreaInvestment(
    api_key=key,
    api_secret=secret,
    acc_no=acc_no
)
symbols =broker.fetch_ohlcv("005930")      # 코스피
# DataFrame을 dictionary list로 변환합니다.

client = MongoClient('mongodb://localhost:27017/')
db = client['my_database']
collection = db['my_collection']

# 여러 개의 데이터를 삽입할 때는 insert_many를 사용합니다.
insert_result = collection.insert_many(symbols)
# 삽입된 모든 문서의 _id를 출력합니다.
