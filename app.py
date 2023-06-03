import mojito, json
from flask import Flask, jsonify, request
from pymongo import MongoClient
from pykrx import stock
key = "PSVT5oQXN4N39r3jhoLtrCiVen4fcJ3p7zOh"
secret = "OeeQY05O9OEfjuOP2KEtVpbP77p8WKaClPqgOEdSAVdH/FazfG51bqSc97t16uYOsvjb5DzrbqB11cfuMfBXPtwDB2BQqg7otSZAHo61OkobqBGPWJHGOHE/lt+X4WPNhyDiDu06EMiC6t+lvcIrG50t4/alJf7qhfL/dkg8sfOJgC66SDA="
acc_no = "00000000-01"

broker = mojito.KoreaInvestment(api_key=key, api_secret=secret, acc_no=acc_no)
# # # print(dir(broker))
# resp = broker.fetch_price("005930")
# # pprint.pprint(resp)
# # print("시가   :  ", resp['output']['stck_oprc'])    # 시가
# # print("현재가 :  ", resp['output']['stck_prpr'])    # 시가
# # print("최고가 : ", resp['output']['stck_hgpr'])     # 고가
# # print("최저가 : ", resp['output']['stck_lwpr'])     # 저가
# # print("종가   : ", resp['output']['stck_prpr'])     # 종가

# symbols = broker.fetch_kosdaq_symbols()        # 코스닥
# print(dir(symbols))


# class myObject:
#     def __init__(self):
#         self.data = {}

#     def __str__(self):
#         return str(self.data)


client = MongoClient(
    'mongodb+srv://ChickenStock:1234@jiseop.g8czkiu.mongodb.net/')
db = client['chicken_stock']

app = Flask(__name__)


@app.route('/api/data', methods=['GET'])

@app.route('/signup', methods=['POST'])
def register():
    data = request.get_json()

    print(data)

    collection = db['user_info']
    collection.insert_one(data)
    print('회원가입 데이터 저장')

    return '데이터 저장 완료'

@app.route('/api/user-info', methods=['POST'])
def user_info():
    data = request.get_json()

    print(data)

    collection = db['user_info']
    find_id = collection.find_one({}, sort=[('_id', -1)])
    find_id.update(data)
    collection.replace_one({'_id': find_id['_id']}, find_id)

    print('사용자 정보 데이터 저장')

    return '데이터 저장 완료'




# 컴포넌트 2
@app.route('/companydetailP')
def get_stock_data():
    df = stock.get_market_ohlcv_by_date("20200101", "20200121", "005930")
    # 데이터프레임 인덱스를 '날짜' 열로 설정합니다.
    df.index.name = '날짜'
    df.reset_index(inplace=True)
    data = df.to_dict('records')
    return jsonify(data)

# 컴포넌트 1-3
@app.route('/companydetail', methods=['GET'])
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


if (__name__) == '__main__':
    app.run(host='0.0.0.0', port=5000)