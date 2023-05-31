import mojito
from flask import Flask, jsonify
import pprint
from pymongo import MongoClient
key = "PSVT5oQXN4N39r3jhoLtrCiVen4fcJ3p7zOh"
secret = "OeeQY05O9OEfjuOP2KEtVpbP77p8WKaClPqgOEdSAVdH/FazfG51bqSc97t16uYOsvjb5DzrbqB11cfuMfBXPtwDB2BQqg7otSZAHo61OkobqBGPWJHGOHE/lt+X4WPNhyDiDu06EMiC6t+lvcIrG50t4/alJf7qhfL/dkg8sfOJgC66SDA="
acc_no = "00000000-01"

broker = mojito.KoreaInvestment(
    api_key=key,
    api_secret=secret,
    acc_no=acc_no
)


# KOSPI 종목의 정보를 가져옵니다.
symbols = broker.fetch_kospi_symbols()

# "삼성전자"의 정보를 가져옵니다.
samsung = symbols[symbols['한글명'] == '삼성전자']

# "삼성전자"의 종목코드를 가져옵니다.
# '단축코드'는 실제 종목코드를 나타내는 열의 이름으로 대체해야 합니다.
samsung_code = samsung['단축코드'].values[0]

# "삼성전자"의 가격 정보를 가져옵니다.
samsung_price = broker.fetch_price(samsung_code)
cute =broker.fetch_kospi_symbols()
# print(samsung_price)
# pprint.pprint(broker.fetch_price("05320"))
pprint.pp(cute)

# symbols = broker.fetch_kospi_symbols()        #
# st_symbols = symbols[symbols['KRX100'] == 'Y']
# #  그룹 코드가 'ST'만 해당하는 것을 조회

# kia_group_code = symbols[symbols['한글명'] == '삼성전자']
# #  종목의 모든 컬럼 조회
# resp = broker.fetch_price("001070")  # 삼성전자 종목 코드

# kia_short_code = symbols[symbols['한글명'] == '대유플러스']['표준코드']


# print(st_symbols)
# print(kia_group_code)
# print(resp)


# noru_row = symbols[symbols['한글명'] == '노루홀딩스']
# mix = (noru_row[['그룹코드', '제조업', '한글명', '기준가']])

# pprint.pprint(mix)
