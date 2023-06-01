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
from pykrx import stock

app = Flask(__name__)

key = "PSVT5oQXN4N39r3jhoLtrCiVen4fcJ3p7zOh"
secret = "OeeQY05O9OEfjuOP2KEtVpbP77p8WKaClPqgOEdSAVdH/FazfG51bqSc97t16uYOsvjb5DzrbqB11cfuMfBXPtwDB2BQqg7otSZAHo61OkobqBGPWJHGOHE/lt+X4WPNhyDiDu06EMiC6t+lvcIrG50t4/alJf7qhfL/dkg8sfOJgC66SDA="
acc_no = "00000000-01"

broker = mojito.KoreaInvestment(
    api_key=key,
    api_secret=secret,
    acc_no=acc_no
)

@app.route('/companydata', methods=['GET'])
def get_company_data():
    return get_data_for_company('노루홀딩스')

@app.route('/companyupdown', methods=['GET'])
def get_company_updown():
    return get_data_for_company('삼성전자', up_down_info=True)

def get_data_for_company(company_name, up_down_info=False):
    symbols = broker.fetch_kospi_symbols()
    company_row = symbols[symbols['한글명'] == company_name]
    
    if up_down_info:
        company_code = company_row['단축코드'].values[0]
        company_price = broker.fetch_price(company_code)
        company_info = {
            '시가': company_price['output']['stck_oprc'],
            '오늘최고가': company_price['output']['stck_hgpr'],
            '오늘최저가': company_price['output']['stck_lwpr'],
            '현재가': company_price['output']['stck_prpr'],
            '시가총액': company_price['output']['cpfn_cnnm'],
        }
    else:
        company_info = company_row[['단축코드', '한글명', '기준가']].to_dict(orient='records')[0]

    return jsonify(company_info)


@app.route('/companydetailP')
def get_stock_data():
    df = stock.get_market_ohlcv_by_date("20200101", "20200121", "005910")
    # 데이터프레임 인덱스를 '날짜' 열로 설정합니다.
    df.index.name = '날짜'
    df.reset_index(inplace=True)
    data = df.to_dict('records')
    return jsonify(data)



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)






#  쿼리스트링 사용하는 로직
# @app.route('/companydetail', methods=['GET'])
# def company_detail():
#     symbols = broker.fetch_kospi_symbols()
#     company_name = request.args.get('company')  # 쿼리스트링에서 'company' 파라미터 값을 가져옴
    
#     # 회사명에 따른 필터링
#     company_row = symbols[symbols['한글명'] == company_name]
    
#     # 요청한 회사명이 존재하는 경우
#     if not company_row.empty:
#         data = company_row[['단축코드', '한글명', '기준가']].to_dict(orient='records')[0]
#         return jsonify(data)
#     else:
#         return jsonify({'message': '해당 회사명은 존재하지 않습니다.'})