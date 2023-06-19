# -*- coding: utf-8 -*-
### 모듈 임포트 ###
import re
import mojito
import json
from flask import Flask, jsonify, request,session, Response
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
broker = mojito.KoreaInvestment(api_key=key, api_secret=secret, acc_no=acc_no,)
socketio = SocketIO(app, cors_allowed_origins="*")
logger = logging.getLogger('socketio')  # SocketIO 로거 생성
logger.setLevel(logging.DEBUG)  # 로그 레벨을 DEBUG로 설정
stream_handler = logging.StreamHandler()  # 콘솔 핸들러 생성
stream_handler.setLevel(logging.DEBUG)  # 핸들러의 로그 레벨을 DEBUG로 설정
logger.addHandler(stream_handler)  # 핸들러를 로거에 추가

# hogaData = ['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44'] 
hogaData=[]
priceData=[]
@app.route('/api/hoga', methods=['GET'])
def returnHoga():
    # loop = asyncio.get_event_loop().run_until_complete(connect())
    # asyncio.set_event_loop(loop)
    # print(loop)
    return jsonify('a')

    


def get_hoga_data():    
   
    def get_approval(key, secret):
        # url = https://openapivts.koreainvestment.com:29443' # 모의투자계좌     
        url = 'https://openapi.koreainvestment.com:9443' # 실전투자계좌
        headers = {"content-type": "application/json"}
        body = {"grant_type": "client_credentials",
                "appkey": key,
                "secretkey": secret}
        PATH = "oauth2/Approval"
        URL = f"{url}/{PATH}"
        res = requests.post(URL, headers=headers, data=json.dumps(body))
        approval_key = res.json()["approval_key"]
        return approval_key

    async def connect():
        global priceData
        
        g_appkey = key
        g_appsceret = secret
        g_approval_key = get_approval(g_appkey, g_appsceret)
        stock_code = '005930'
        print("approval_key [%s]" % (g_approval_key))

        url = 'ws://ops.koreainvestment.com:31000' # 모의투자계좌
    #     # url = 'ws://ops.koreainvestment.com:21000' # 실전투자계좌

    #     # 원하는 호출을 [tr_type, tr_id, tr_key] 순서대로 리스트 만들기

        ### 1. 국내주식 호가, 체결가, 체결통보 ###
        code_list = [['1','H0STASP0',f"{stock_code}"]]

        senddata_list=[]

        for i,j,k in code_list:
            temp = '{"header":{"approval_key": "%s","custtype":"P","tr_type":"%s","content-type":"utf-8"},"body":{"input":{"tr_id":"%s","tr_key":"%s"}}}'%(g_approval_key,i,j,k)
            senddata_list.append(temp)

    #     #async with 구문은 비동기적인 컨텍스트 매니저를 정의합니다. 이를 통해 웹소켓 연결을 관리할 수 있습니다.
    #     #websockets.connect() 함수를 호출하여 url에 지정된 주소로 웹소켓 연결을 수립합니다. ping_interval은 30초마다 핑(ping) 메시지를 보내는 간격을 나타내는 매개변수입니다.
    #     # as websocket 구문은 웹소켓 연결 객체를 websocket 변수에 할당합니다. 이를 통해 웹소켓 연결을 조작하고 데이터를 송수신할 수 있습니다.
    #     # async with 블록 내부의 코드는 웹소켓 연결이 활성화된 상태에서 실행됩니다. 이 블록 안에서 비동기 작업을 수행할 수 있습니다.     
        async with websockets.connect(url, ping_interval=30) as websocket:

            for senddata in senddata_list:
                await websocket.send(senddata) # 소켓에 헤더 정보를 담아 데이터를 보냄
                time.sleep(0.5)
                print(f"Input Command is :{senddata}")

            while True:
                try:
                    data = await websocket.recv()

                    time.sleep(0.5)
                    '''print(data) = 0|H0STASP0|001|005930^120755^0^71500^71600^71700^71800^71900^72000^72100^72200^72300^72400^71400^71300^71200^71100^71000^70900^70800^70700^70600^70500^224894^232186^146088^104734^149529^164939^70009^113786^95478^118801^255687^363921^204942^342566^471139^207546^245925^295307^144386^423045^1420444^2954464^0^0^0^0^326405^-72000^5^-100.00^7504606^1^1^0^0^0'''
                    if data[0] == '0':
                        recvstr = data.split('|')  # 수신데이터가 실데이터 이전은 '|'로 나뉘어져있어 split
                        '''print(recvstr)= ['0', 'H0STASP0', '001', '005930^120923^0^71500^71600^71700^71800^71900^72000^72100^72200^72300^72400^71400^71300^71200^71100^71000^70900^70800^70700^70600^70500^316971^141594^146084^103902^149534^165163^69998^113809^95480^118806^225349^364223^205646^342696^471272^207113^245930^295257^144344^423147^1421341^2924977^0^0^0^0^326405^-72000^5^-100.00^7510219^0^0^0^0^0']'''
                        trid0 = recvstr[1]

                        if trid0 == "H0STASP0":  # 주식호가tr 일경우의 처리 단계
                            print("#### 주식호가 ####")
                            global hogaData
                            # stockhoka_domestic(recvstr[3])
                            recvvalue = recvstr[3].split('^') 
                            hogaData= recvvalue
                            print(hogaData)
                            time.sleep(0.2)

                        else: 
                            print('호가 데이터가 아닌 다른 데이터 유입')
    # ------
                    #    
                    else:
                        jsonObject = json.loads(data)
                        trid = jsonObject["header"]["tr_id"]

                        if trid != "PINGPONG":
                            rt_cd = jsonObject["body"]["rt_cd"]

                            if rt_cd == '1':  # 에러일 경우 처리

                                if jsonObject["body"]["msg1"] != 'ALREADY IN SUBSCRIBE':
                                    print("### ERROR RETURN CODE [ %s ][ %s ] MSG [ %s ]" % (jsonObject["header"]["tr_key"], rt_cd, jsonObject["body"]["msg1"]))
                                break

                            elif rt_cd == '0':  # 정상일 경우 처리
                                print("### RETURN CODE [ %s ][ %s ] MSG [ %s ]" % (jsonObject["header"]["tr_key"], rt_cd, jsonObject["body"]["msg1"]))

                                # 체결통보 처리를 위한 AES256 KEY, IV 처리 단계
                                if trid == "H0STCNI0" or trid == "H0STCNI9": # 국내주식
                                    aes_key = jsonObject["body"]["output"]["key"]
                                    aes_iv = jsonObject["body"]["output"]["iv"]
                                    print("### TRID [%s] KEY[%s] IV[%s]" % (trid, aes_key, aes_iv))


                        elif trid == "PINGPONG":
                            print("### RECV [PINGPONG] [%s]" % (data))
                            print("### SEND [PINGPONG] [%s]" % (data))

                except websockets.ConnectionClosed:
                    continue
            return "hello"

    # 비동기로 서버에 접속한다.
    # result = asyncio.get_event_loop().run_until_complete(connect())
    # print(result)
    asyncio.get_event_loop().run_until_complete(connect())
    asyncio.get_event_loop().close()

get_hoga_data()
if (__name__) == '__main__':        
    socketio.run(app, host='0.0.0.0', port=5000) 

