from flask import Flask
from Modules import test

# Flask 앱 인스턴스 생성
app = Flask(__name__)

# 루트 URL에 대한 라우트
@app.route('/')
def hello():
    name = test.team_name()
    return name

# 서버 실행
if __name__ == '__main__':
    app.run(port = 5555)
