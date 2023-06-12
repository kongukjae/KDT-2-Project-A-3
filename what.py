import re
import mojito, json
from flask import Flask, jsonify, request
from pymongo import MongoClient
from pykrx import stock
import pandas as pd
import pprint
key = "PSVT5oQXN4N39r3jhoLtrCiVen4fcJ3p7zOh"
secret = "OeeQY05O9OEfjuOP2KEtVpbP77p8WKaClPqgOEdSAVdH/FazfG51bqSc97t16uYOsvjb5DzrbqB11cfuMfBXPtwDB2BQqg7otSZAHo61OkobqBGPWJHGOHE/lt+X4WPNhyDiDu06EMiC6t+lvcIrG50t4/alJf7qhfL/dkg8sfOJgC66SDA="
acc_no = "00000000-01"

broker = mojito.KoreaInvestment(api_key=key, api_secret=secret, acc_no=acc_no)

# 1. 실시간 등락률 및 실시간 가격 상태 찾는 로직
# data=broker._fetch_today_1m_ohlcv("005930",to="15:30:30")
# output1 = data["output1"]
# output2 = data["output2"]
# combined_output = {"prdy_ctrt": output1["prdy_ctrt"], "stck_prpr": output2[0]["stck_prpr"]}
# pprint.pprint(combined_output)

# 2. (일간차트 그릴때 필요한 자료)
# data=broker._fetch_today_1m_ohlcv("005930",to="10:30:30")
# pprint.pprint(data)

# 3.주간,월간 차트 그릴때 필요한 자료, 일,주,월,년 자료 조회

# data=broker.fetch_ohlcv_domestic("005930","D","20230608")
# pprint.pprint(data)
# data=broker.fetch_ohlcv_domestic("005930","M","20220608")
# dataa=broker.fetch_ohlcv_domestic("005930","Y","20000101")
# pprint.pprint(data)

# data=broker.fetch_kospi_symbols("005930")
# print(data)

symbols = broker.fetch_kospi_symbols()   
company_row = symbols[symbols['한글명'] == '삼성전자']
company_code = company_row['단축코드'].values[0]
company_price = broker.fetch_price(company_code)
print(company_price)

