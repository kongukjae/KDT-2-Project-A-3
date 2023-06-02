import mojito
from flask import Flask, jsonify, request
from pymongo import MongoClient
import re
key = "PSVT5oQXN4N39r3jhoLtrCiVen4fcJ3p7zOh"
secret = "OeeQY05O9OEfjuOP2KEtVpbP77p8WKaClPqgOEdSAVdH/FazfG51bqSc97t16uYOsvjb5DzrbqB11cfuMfBXPtwDB2BQqg7otSZAHo61OkobqBGPWJHGOHE/lt+X4WPNhyDiDu06EMiC6t+lvcIrG50t4/alJf7qhfL/dkg8sfOJgC66SDA="
acc_no = "00000000-01"

broker = mojito.KoreaInvestment(api_key=key, api_secret=secret, acc_no=acc_no)
# # print(dir(broker))
resp = broker.fetch_price("005930")
# # pprint.pprint(resp)
# # print("시가   :  ", resp['output']['stck_oprc'])    # 시가
# # print("현재가 :  ", resp['output']['stck_prpr'])    # 시가
# # print("최고가 : ", resp['output']['stck_hgpr'])     # 고가
# # print("최저가 : ", resp['output']['stck_lwpr'])     # 저가
# # print("종가   : ", resp['output']['stck_prpr'])     # 종가

# symbols = broker.fetch_kosdaq_symbols()        # 코스닥
# print(dir(symbols))


class myObject:
    def __init__(self):
        self.data = {}

    def __str__(self):
        return str(self.data)


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
    find_id = collection.find_one({})
    update_data = {**find_id, **data}
    collection.replace_one({'_id':find_id['_id']}, update_data)

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