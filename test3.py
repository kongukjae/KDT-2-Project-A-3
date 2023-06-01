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
# 이 코드는 해당 종목의 종목을 들어가는
symbols = broker.fetch_kospi_symbols()


samsung = symbols[symbols['한글명'] == '삼성전자']

samsung_code = samsung['단축코드'].values[0]


samsung_price = broker.fetch_price(samsung_code)

samsung_specifics = {
    'opening_price': samsung_price['output']['stck_oprc'],
    'high_price': samsung_price['output']['stck_hgpr'],
    'low_price': samsung_price['output']['stck_lwpr'],
    'current_price': samsung_price['output']['stck_prpr'],
    'market_cap': samsung_price['output']['cpfn_cnnm'],
}

# cute =broker.fetch_kospi_symbols()
# print(samsung_price)
# pprint.pprint(broker.fetch_price("05320"))

print(samsung_specifics)

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
