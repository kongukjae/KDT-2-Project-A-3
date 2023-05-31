from flask import Flask, request
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['POST'])
def save_data():
    try:
        data = request.get_json()
        # 받은 데이터를 저장하거나 원하는 작업을 수행합니다.
        # 예를 들어, 데이터베이스에 저장하는 등의 동작을 수행할 수 있습니다.
        
        # 예시로서 데이터를 콘솔에 출력합니다.
        print(data)
        
        return '데이터 저장 성공', 200
    except Exception as e:
        return '데이터 저장 실패', 500

if __name__ == '__main__':
    app.run()
