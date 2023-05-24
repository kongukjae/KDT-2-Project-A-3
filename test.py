# 패키지 모듈
from flask import Flask, jsonify
from pymongo import MongoClient

# 로컬 모듈
from Modules import test_module

# Flask 앱 인스턴스 생성
app = Flask(__name__)

#DB 접속
client = MongoClient('mongodb://localhost:27017/')

#DB 생성 / 접속
db = client["Dororo"]

#collection 생성 / 접속
collection = db["DororoCollection"]



# 루트 URL에 대한 라우트
@app.route('/')
def html_body():
    # string_name = ' '.join(name_list)
    name = test_module.team_name('<h1>Hello World!</h1>')
    return name 

@app.route('/name')
def test_func():
    print("함수진입")
    # string_name = ' '.join(name_list)
    # name = test.team_name('<h1>' + string_name + '</h1>')
    # test_string = 'test'
    return jsonify(message = 'test')

# 서버 실행
if __name__ == '__main__':
    app.run(port = 5555)



#Read
# team_name = collection.find({"team": "Dororo"})
# for document in team_name:
#     name_list.append(document['name'])
#     print(document)

# print(name_list)

# def team():
#   name_list = []
#   team_name = collection.find({"team": "Dororo"})
#   for document in team_name:
#     name_list.append(document['name'])

#   return name_list

# print(team())
# __all__ = ['team']
