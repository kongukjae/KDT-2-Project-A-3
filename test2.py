# -*- coding: utf-8 -*-
### 모듈 임포트 ###
import re
import mojito
import json
from flask import Flask, jsonify, request,session
from pymongo import MongoClient
import pandas as pd
from bs4 import BeautifulSoup
import requests
import pprint
from flask_socketio import SocketIO, emit
import asyncio
import websockets
import time
import logging
import json
from base64 import b64decode
app = Flask(__name__)

app.secret_key = "nb1+d(7+2y1q0m*kig4+zxld$v00^7dr=nxqcjn5(fp@ul)yc@"

f = open("./secret.key")
lines = f.readlines()
key = lines[0].strip()
secret = lines[1].strip()
acc_no = lines[2].strip()
f.close()

### 함수 정의 ###
a=1
# 웹소켓 접속키 발급
def myfuntion():
    global a
    a=2
    print(a)    
myfuntion()
if (__name__) == '__main__':        
    
    app.run(host='0.0.0.0', port=5000) 

