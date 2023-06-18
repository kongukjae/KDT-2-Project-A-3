# -*- coding: utf-8 -*-
### 모듈 임포트 ###
import websockets
import json
import requests
import os
import asyncio
import time
from flask import Flask, jsonify, request,session

from Crypto.Cipher import AES
from Crypto.Util.Padding import unpad
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

# 웹소켓 접속키 발급
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

### 1. 국내주식 ###

# 주식호가 출력라이브러리
def stockhoka_domestic(data):
    
    recvvalue = data.split('^')  # 수신데이터를 split '^'

    print("유가증권 단축 종목코드 [" + recvvalue[0] + "]")
    print("영업시간 [" + recvvalue[1] + "]" + "시간구분코드 [" + recvvalue[2] + "]")
    print("======================================")
    print("매도호가10 [%s]    잔량10 [%s]" % (recvvalue[12], recvvalue[32]))
    print("매도호가09 [%s]    잔량09 [%s]" % (recvvalue[11], recvvalue[31]))
    print("매도호가08 [%s]    잔량08 [%s]" % (recvvalue[10], recvvalue[30]))
    print("매도호가07 [%s]    잔량07 [%s]" % (recvvalue[9], recvvalue[29]))
    print("매도호가06 [%s]    잔량06 [%s]" % (recvvalue[8], recvvalue[28]))
    print("매도호가05 [%s]    잔량05 [%s]" % (recvvalue[7], recvvalue[27]))
    print("매도호가04 [%s]    잔량04 [%s]" % (recvvalue[6], recvvalue[26]))
    print("매도호가03 [%s]    잔량03 [%s]" % (recvvalue[5], recvvalue[25]))
    print("매도호가02 [%s]    잔량02 [%s]" % (recvvalue[4], recvvalue[24]))
    print("매도호가01 [%s]    잔량01 [%s]" % (recvvalue[3], recvvalue[23]))
    print("--------------------------------------")
    print("매수호가01 [%s]    잔량01 [%s]" % (recvvalue[13], recvvalue[33]))
    print("매수호가02 [%s]    잔량02 [%s]" % (recvvalue[14], recvvalue[34]))
    print("매수호가03 [%s]    잔량03 [%s]" % (recvvalue[15], recvvalue[35]))
    print("매수호가04 [%s]    잔량04 [%s]" % (recvvalue[16], recvvalue[36]))
    print("매수호가05 [%s]    잔량05 [%s]" % (recvvalue[17], recvvalue[37]))
    print("매수호가06 [%s]    잔량06 [%s]" % (recvvalue[18], recvvalue[38]))
    print("매수호가07 [%s]    잔량07 [%s]" % (recvvalue[19], recvvalue[39]))
    print("매수호가08 [%s]    잔량08 [%s]" % (recvvalue[20], recvvalue[40]))
    print("매수호가09 [%s]    잔량09 [%s]" % (recvvalue[21], recvvalue[41]))
    print("매수호가10 [%s]    잔량10 [%s]" % (recvvalue[22], recvvalue[42]))
    print("======================================")
    print("총매도호가 잔량        [%s]" % (recvvalue[43]))
    print("총매도호가 잔량 증감   [%s]" % (recvvalue[54]))
    print("총매수호가 잔량        [%s]" % (recvvalue[44]))
    print("총매수호가 잔량 증감   [%s]" % (recvvalue[55]))
    print("시간외 총매도호가 잔량 [%s]" % (recvvalue[45]))
    print("시간외 총매수호가 증감 [%s]" % (recvvalue[46]))
    print("시간외 총매도호가 잔량 [%s]" % (recvvalue[56]))
    print("시간외 총매수호가 증감 [%s]" % (recvvalue[57]))
    print("예상 체결가            [%s]" % (recvvalue[47]))
    print("예상 체결량            [%s]" % (recvvalue[48]))
    print("예상 거래량            [%s]" % (recvvalue[49]))
    print("예상체결 대비          [%s]" % (recvvalue[50]))
    print("부호                   [%s]" % (recvvalue[51]))
    print("예상체결 전일대비율    [%s]" % (recvvalue[52]))
    print("누적거래량             [%s]" % (recvvalue[53]))
    print("주식매매 구분코드      [%s]" % (recvvalue[58]))

    


async def connect():

    g_appkey = key
    g_appsceret = secret
    g_approval_key = get_approval(g_appkey, g_appsceret)
    stock_code = '005930'
    print("approval_key [%s]" % (g_approval_key))

    url = 'ws://ops.koreainvestment.com:31000' # 모의투자계좌
    # url = 'ws://ops.koreainvestment.com:21000' # 실전투자계좌
    
    # 원하는 호출을 [tr_type, tr_id, tr_key] 순서대로 리스트 만들기
    
    ### 1. 국내주식 호가, 체결가, 체결통보 ###
    code_list = [['1','H0STASP0',f"{stock_code}"]]
    
    senddata_list=[]
    
    for i,j,k in code_list:
        temp = '{"header":{"approval_key": "%s","custtype":"P","tr_type":"%s","content-type":"utf-8"},"body":{"input":{"tr_id":"%s","tr_key":"%s"}}}'%(g_approval_key,i,j,k)
        senddata_list.append(temp)

    #async with 구문은 비동기적인 컨텍스트 매니저를 정의합니다. 이를 통해 웹소켓 연결을 관리할 수 있습니다.
    #websockets.connect() 함수를 호출하여 url에 지정된 주소로 웹소켓 연결을 수립합니다. ping_interval은 30초마다 핑(ping) 메시지를 보내는 간격을 나타내는 매개변수입니다.
    # as websocket 구문은 웹소켓 연결 객체를 websocket 변수에 할당합니다. 이를 통해 웹소켓 연결을 조작하고 데이터를 송수신할 수 있습니다.
    # async with 블록 내부의 코드는 웹소켓 연결이 활성화된 상태에서 실행됩니다. 이 블록 안에서 비동기 작업을 수행할 수 있습니다.     
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
                        stockhoka_domestic(recvstr[3])
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
                    
                    
# 비동기로 서버에 접속한다.
asyncio.get_event_loop().run_until_complete(connect())
asyncio.get_event_loop().close()

if (__name__) == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)