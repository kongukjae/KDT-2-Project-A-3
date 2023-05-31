# import mojito
# from flask import Flask, jsonify
# import pprint
# from pymongo import MongoClient
# key = "PSVT5oQXN4N39r3jhoLtrCiVen4fcJ3p7zOh"
# secret = "OeeQY05O9OEfjuOP2KEtVpbP77p8WKaClPqgOEdSAVdH/FazfG51bqSc97t16uYOsvjb5DzrbqB11cfuMfBXPtwDB2BQqg7otSZAHo61OkobqBGPWJHGOHE/lt+X4WPNhyDiDu06EMiC6t+lvcIrG50t4/alJf7qhfL/dkg8sfOJgC66SDA="
# acc_no = "00000000-01"

# broker = mojito.KoreaInvestment(
#     api_key=key,
#     api_secret=secret,
#     acc_no=acc_no
# )
# symbols = broker.fetch_kospi_symbols()        #
# st_symbols = symbols[symbols['그룹코드'] == 'ST']
#  그룹 코드가 'ST'만 해당하는 것을 조회

# kia_group_code = symbols[symbols['한글명'] == '기아차']
#  종목의 모든 컬럼 조회
# resp = broker.fetch_price("005930")  # 삼성전자 종목 코드

# kia_short_code = symbols[symbols['한글명'] == '대유플러스']['표준코드']


# print(kia_short_code)


# noru_row = symbols[symbols['한글명'] == '노루홀딩스']
# mix = (noru_row[['그룹코드', '제조업', '한글명', '기준가']])

# pprint.pprint(mix)
from flask import Flask, jsonify, Response
import mojito
import json

app = Flask(__name__)

key = "PSVT5oQXN4N39r3jhoLtrCiVen4fcJ3p7zOh"
secret = "OeeQY05O9OEfjuOP2KEtVpbP77p8WKaClPqgOEdSAVdH/FazfG51bqSc97t16uYOsvjb5DzrbqB11cfuMfBXPtwDB2BQqg7otSZAHo61OkobqBGPWJHGOHE/lt+X4WPNhyDiDu06EMiC6t+lvcIrG50t4/alJf7qhfL/dkg8sfOJgC66SDA="
acc_no = "00000000-01"

broker = mojito.KoreaInvestment(
    api_key=key,
    api_secret=secret,
    acc_no=acc_no
)

#  메인-컴포넌트1의 요청시 처리함수.


@app.route('/companydetail', methods=['GET'])
def company_detail():
    symbols = broker.fetch_kospi_symbols()
    noru_row = symbols[symbols['한글명'] == '노루홀딩스']
    mix = noru_row[['그룹코드', '제조업', '한글명', '기준가']]
    data = mix.to_dict(orient='records')[0]

    # mix를 dictionary 형태로 변환하고 이를 jsonify하여 응답으로 반환합니다.
    return Response(json.dumps(data,       ensure_ascii=False), mimetype='application/json')


@app.route('companyInfo', methods=['GET'])
def company_info():
    symbols = broker.fetch_kospi_symbols()


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
