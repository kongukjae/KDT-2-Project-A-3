import mojito
import pprint
import matplotlib.pyplot as plt
import matplotlib.dates as mdates
import pandas as pd
from pymongo import MongoClient

key = "PSVT5oQXN4N39r3jhoLtrCiVen4fcJ3p7zOh"
secret = "OeeQY05O9OEfjuOP2KEtVpbP77p8WKaClPqgOEdSAVdH/FazfG51bqSc97t16uYOsvjb5DzrbqB11cfuMfBXPtwDB2BQqg7otSZAHo61OkobqBGPWJHGOHE/lt+X4WPNhyDiDu06EMiC6t+lvcIrG50t4/alJf7qhfL/dkg8sfOJgC66SDA="
acc_no = "00000000-01"

broker = mojito.KoreaInvestment(api_key=key, api_secret=secret, acc_no=acc_no)

# 데이터를 받는다.
# data = broker.fetch_ohlcv("005930","D")
data = broker._fetch_today_1m_ohlcv("000270",to="15:30:30")

# pprint.pprint(data)
# MongoDB 클라이언트를 생성 (여기서는 localhost와 포트 27017을 사용)
client = MongoClient('localhost', 27017)

# mydb라는 데이터베이스 선택 (없으면 자동 생성)
db = client.mydb

# mystock라는 컬렉션 선택 (없으면 자동 생성)
collection = db.mysumsungG

# data를 MongoDB에 저장
collection.insert_one(data)
