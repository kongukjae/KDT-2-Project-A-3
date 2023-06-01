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

@app.route('/login', methods=['POST'])
def post_data():
    request_data = request.get_json() #request.get_json()오로 리액트로부터 데이터 받아옴
    response_data = {
        'message': 'Data received successfully!',
        'data': request_data
    }
    print(request_data)
    return jsonify(response_data) #클라언트에게 데이터를 반환.

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=5000)