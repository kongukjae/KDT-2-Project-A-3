from flask import Flask, jsonify, request
from pymongo import MongoClient
from loginModule import loginCheck
import re

app = Flask(__name__)

# @app.route('/api/data', methods=['GET'])
# def get_data():
#     data = {
        
#     }
#     return jsonify(data)

@app.route('/api/login', methods=['POST'])
loginCheck.login_Check()

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=5000,debug=True)