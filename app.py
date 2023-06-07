import re
import mojito
from flask import Flask, jsonify, request
from pymongo import MongoClient
import callApiData.Mainpage_stock_data

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

@app.route('/api/main_page', methods=['POST'])
def main_page_init():
    reqData = 'elec_company_list'
    init_data = callApiData.Mainpage_stock_data.Mainpage_stock_list(reqData)
    print(init_data)
    return jsonify(init_data)

if (__name__) == '__main__':
    app.run(host='0.0.0.0', port=5000)