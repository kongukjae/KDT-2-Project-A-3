# 패키지 모듈
from flask import Flask
from pymongo import MongoClient

# 로컬 모듈
from Modules import test

# Flask 앱 인스턴스 생성
app = Flask(__name__)

#DB 접속
client = MongoClient('mongodb://localhost:27017/')

#DB 생성 / 접속
db = client["Dororo"]

#collection 생성 / 접속
collection = db["DororoCollection"]

name_list = []

#Read
team_name = collection.find({"team": "Dororo"})
for document in team_name:
    name_list.append(document['name'])
    print(document)
    print(name_list)

# 루트 URL에 대한 라우트
@app.route('/')
def html_body():
    string_name = ' '.join(name_list)
    # name = test.team_name('<h1>' + string_name + '</h1>')
    return render_tamplate()

# 서버 실행
if __name__ == '__main__':
    app.run(port = 5555)