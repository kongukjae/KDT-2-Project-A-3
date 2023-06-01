from flask import Flask, jsonify, request
from pymongo import MongoClient


app = Flask(__name__)

# @app.route('/api/data', methods=['GET'])
# def get_data():
#     data = {
        
#     }
#     return jsonify(data)

@app.route('/login', methods=['POST'])
def post_data():
    request_data = request.get_json() #request.get_json()오로 리액트로부터 데이터 받아옴
    fromReactUserData=[] 
    client=MongoClient("mongodb://localhost:27017")
    db=client['test-db']
    print(request_data["id"])
    print(db.post.find_one({'author':request_data["id"]}))

    

    # print(request_data)
    return jsonify() #클라언트에게 데이터를 반환.

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=5000,debug=True)