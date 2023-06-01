from flask import Flask, jsonify, request
from pymongo import MongoClient
import re

app = Flask(__name__)

# @app.route('/api/data', methods=['GET'])
# def get_data():
#     data = {
        
#     }
#     return jsonify(data)

@app.route('/login', methods=['POST'])
def post_data():
    request_data = request.get_json() #request.get_json()오로 리액트로부터 데이터 받아옴
    pattern = r'^[a-zA-Z0-9]+$' #영문자와 숫자로만 입력된 값만 입력.
    returnValue={} 
    client=MongoClient("mongodb://localhost:27017")
    db=client['test-db']

    if not re.match(pattern,request_data['id']):
        returnValue['state']=False;
        returnValue['message']="아이디는 영문자와 숫자만 입력 가능합니다" 
        return jsonify(returnValue)
    elif request_data['id']=="" or request_data['pw']=="":
        returnValue['state']=False;
        returnValue['message']="아이디와 비밀번호 모두 입력해주세요." 
        return jsonify(returnValue)

    elif db.post.find_one({'author':request_data["id"]})==None:
        returnValue['state']=False;
        returnValue['message']="등록된 회원이 아닙니다." 
        return jsonify(returnValue)

    else: 
        if not db.post.find_one({'author':request_data["id"]})['text']==request_data['pw']:
            returnValue['state']=False;
            returnValue['message']="비밀번호 오류" 
            return jsonify(returnValue)
        else :
            returnValue['state']=True;
            returnValue['message']="정상" 
            return jsonify(returnValue)


        

        

    

    # print(request_data)
    # return jsonify() #클라언트에게 데이터를 반환.

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=5000,debug=True)