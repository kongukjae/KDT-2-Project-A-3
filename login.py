from flask import Flask, jsonify, request
# from pymongo import MongoClient


app = Flask(__name__)

@app.route('/api/data', methods=['GET'])
def get_data():
    data = {
        'message': 'Hello from Flask!',
        'data': [1, 2, 3, 4, 5]
    }
    return jsonify(data)

@app.route('/api/data', methods=['POST'])
def post_data():
    request_data = request.get_json() #리액트로부터 데이터 받아옴
    # 여기서 request_data를 사용하여 필요한 작업을 수행합니다.``
    response_data = {
        'message': 'Data received successfully!',
        'data': request_data
    }
    print(request_data)
    return jsonify(response_data)

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=5000)