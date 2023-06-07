import re
import mojito, json
from flask import Flask, jsonify, request
from pymongo import MongoClient
from pykrx import stock
import pandas as pd
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

@app.route('/checkId', methods=['POST'])
def checkId():
    request_data = request.get_json()
    client=MongoClient("mongodb+srv://ChickenStock:1234@jiseop.g8czkiu.mongodb.net/")
    db=client['chicken_stock']
    returnValue={} 
    print('아이디 서버 연결')
    if db.user_info.find_one({'id':request_data["id"]})==None:
        returnValue['state'] = 'available'
        return jsonify(returnValue)
    elif db.user_info.find_one({'id':request_data["id"]})["id"]==request_data["id"]:
        returnValue['state'] = 'taken'
        return jsonify(returnValue)
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

@app.route('/api/login', methods=['POST'])
def login_Check():
    request_data = request.get_json() #request.get_json()오로 리액트로부터 데이터 받아옴
    pattern = r'^[a-zA-Z0-9]+$' #영문자와 숫자로만 입력된 값만 입력. 
    returnValue={} # 응답할 값을들 담을 객체
    client=MongoClient("mongodb+srv://ChickenStock:1234@jiseop.g8czkiu.mongodb.net/") # 데이터베이스 연결
    db=client['chicken_stock']

    if not re.match(pattern,request_data['id']): # 아이디 유효성 검사
        returnValue['state']=False;
        returnValue['message']="아이디는 영문자와 숫자만 입력 가능합니다" 
        return jsonify(returnValue) #클라언트에게 데이터를 반환.
    elif request_data['id']=="" or request_data['pw']=="": #아이디와 비밀번호 공백 시 
        returnValue['state']=False;
        returnValue['message']="아이디와 비밀번호 모두 입력해주세요." 
        return jsonify(returnValue)

    elif db.user_info.find_one({'id':request_data["id"]})==None:  #user_info document에 일치하는 정보가 없을 경우
        returnValue['state']=False;
        returnValue['message']="등록된 회원이 아닙니다." 
        return jsonify(returnValue)
    elif db.user_info.find_one({'id':request_data["id"]})["id"]==request_data["id"]: # 입력한 id값과 데이터 베이스 id 값이 일치하는 경우
        if not db.user_info.find_one({'id':request_data["id"]})["password"]==request_data["pw"]: # 입력한 id값의 해당되는 데이터 베이스에서 pw 검사. 
            returnValue['state']=False
            returnValue['message']="비밀번호 불일치" 
            return jsonify(returnValue) 
        else: 
            returnValue['state']=True
            returnValue['message']="정상" 
            return jsonify(returnValue) 
    else:
        returnValue['state']=False
        returnValue['message']="로그인 오류" 
        return jsonify(returnValue)



# 컴포넌트 2-1 실시간 주가 차트 데이터(일단위)
@app.route('/get_data', methods=['GET'])
def get_data():
   
    data = broker._fetch_today_1m_ohlcv("005930",to="15:30:30")
    df = pd.DataFrame(data['output2'])
    df['stck_bsop_date'] = pd.to_datetime(df['stck_bsop_date'])
    df['stck_cntg_hour'] = pd.to_datetime(df['stck_cntg_hour'], format='%H%M%S').dt.time
    df[['stck_prpr', 'stck_oprc', 'stck_hgpr', 'stck_lwpr', 'cntg_vol', 'acml_tr_pbmn']] = df[['stck_prpr', 'stck_oprc', 'stck_hgpr', 'stck_lwpr', 'cntg_vol', 'acml_tr_pbmn']].astype(float)
    df.index = pd.to_datetime(df['stck_bsop_date'].astype(str) + ' ' + df['stck_cntg_hour'].astype(str))
    
    return df.to_json(orient='records')

# 컴포넌트 2-2 주가데이터(일주단위)
# @app.route('/get_Wdata', methods=['GET'])
# def get_Wdata():
#     data = broker.fetch_ohlcv("005930","W")
#     dfW = pd.DataFrame(data['output2'])
    
#     # Create a dictionary for chart data
#     chart_data = {
#         'dates': dfW['stck_bsop_date'].tolist(),
#         'closing_prices': dfW['stck_clpr'].tolist(),
#         'opening_prices': dfW['stck_oprc'].tolist(),
#         'highest_prices': dfW['stck_hgpr'].tolist(),
#         'lowest_prices': dfW['stck_lwpr'].tolist(),
#     }
#     return jsonify(chart_data)

# # 컴포넌트 2-3 주가데이터(한달단위)
# @app.route('/get_Mdata', methods=['GET'])
# def get_Mdata():
#     data = broker.fetch_ohlcv("005930","M")
#     dfM = pd.DataFrame(data['output2'])
#     chart_datas = {
#         'dates': dfM['stck_bsop_date'].tolist(),
#         'closing_prices': dfM['stck_clpr'].tolist(),
#         'opening_prices': dfM['stck_oprc'].tolist(),
#         'highest_prices': dfM['stck_hgpr'].tolist(),
#         'lowest_prices': dfM['stck_lwpr'].tolist(),
#     }
#     return jsonify(chart_datas)
# # 컴포넌트 1-3
@app.route('/companydetail', methods=['GET'])
def get_company_data():
   
    symbols = broker.fetch_kospi_symbols()
    company_row = symbols[symbols['한글명'] == '삼성전자']

    company_info = company_row[['단축코드', '한글명', '기준가']].to_dict(orient='records')[0]

    return jsonify(company_info)

@app.route('/companyupdown', methods=['GET'])
def get_company_updown():
   

    symbols = broker.fetch_kospi_symbols()
    company_row = symbols[symbols['한글명'] == '삼성전자']
    company_code = company_row['단축코드'].values[0]
    company_price = broker.fetch_price(company_code)
    company_infof = {
        '시가': company_price['output']['stck_oprc'],
        '오늘최고가': company_price['output']['stck_hgpr'],
        '오늘최저가': company_price['output']['stck_lwpr'],
        '현재가': company_price['output']['stck_prpr'],
        '시가총액': company_price['output']['cpfn_cnnm'],
    }
    
    return jsonify(company_infof)


# 실시간 주식 등락률, API에서 제공되는 것을 가져다 씀
@app.route('/changerate', methods=['GET'])
def get_company_rate():
    data=broker.fetch_today_1m_ohlcv("055930",to="15:30:30")

    return jsonify({"rate": data["output1"]["prdy_ctrt"]})



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