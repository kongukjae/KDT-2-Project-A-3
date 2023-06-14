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

clearConsole = lambda: os.system('cls' if os.name in ('nt', 'dos') else 'clear')
app = Flask(__name__)

key_bytes = 32
app.secret_key = "nb1+d(7+2y1q0m*kig4+zxld$v00^7dr=nxqcjn5(fp@ul)yc@"

f = open("./secret.key")
lines = f.readlines()
key = lines[0].strip()
secret = lines[1].strip()
acc_no = lines[2].strip()
f.close()

### 함수 정의 ###

# AES256 DECODE
def aes_cbc_base64_dec(key, iv, cipher_text):
    """
    :param key:  str type AES256 secret key value
    :param iv: str type AES256 Initialize Vector
    :param cipher_text: Base64 encoded AES256 str
    :return: Base64-AES256 decodec str
    """
    ##AES 암호화 알고리즘을 사용하여 암호화된 데이터를 복호화
    cipher = AES.new(key.encode('utf-8'), AES.MODE_CBC, iv.encode('utf-8'))  ##AES 객체 생성 (CBC mode 사용)
    return bytes.decode(unpad(cipher.decrypt(b64decode(cipher_text)), AES.block_size)) ## cipher_test -> 64byte decoding -> 복호화(decrypt) -> unpad(패딩제거) 


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
    """ 넘겨받는데이터가 정상인지 확인
    print("stockhoka[%s]"%(data))
    """
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

    g_appkey = "앱키를 입력하세요"
    g_appsceret = 
    g_approval_key = get_approval(g_appkey, g_appsceret)
    print("approval_key [%s]" % (g_approval_key))

    url = 'ws://ops.koreainvestment.com:31000' # 모의투자계좌
    # url = 'ws://ops.koreainvestment.com:21000' # 실전투자계좌
    
    # 원하는 호출을 [tr_type, tr_id, tr_key] 순서대로 리스트 만들기
    
    ### 1. 국내주식 호가, 체결가, 체결통보 ###
    # code_list = [['1','H0STASP0','005930'],['1','H0STCNT0','005930'],['1','H0STCNI0','HTS ID를 입력하세요']]
    
    ### 2-1. 해외주식(미국) 호가, 체결가, 체결통보 ###
    # code_list = [['1','HDFSASP0','DNASAAPL'],['1','HDFSCNT0','DNASAAPL'],['1','H0GSCNI0','HTS ID를 입력하세요']]
    
    ### 2-2.해외주식(아시아) 호가, 체결가, 체결통보 ###
    # code_list = [['1','HDFSASP1','DHKS00003'],['1','HDFSCNT0','DHKS00003'],['1','H0GSCNI0','HTS ID를 입력하세요']]
    
    ### 3. 국내선물옵션 호가, 체결가, 체결통보 ###
    # code_list = [['1','H0IFASP0','101S12'],['1','H0IFCNT0','101S12'], # 선물호가, 체결가
    #              ['1','H0IOASP0','201S12315'],['1','H0IOCNT0','201S12322'], # 옵션호가, 체결가
    #              ['1','H0IFCNI0','HTS ID를 입력하세요']] # 선물옵션체결통보
    
    ### 4. 해외선물옵션 호가, 체결가, 체결통보 ###
    # code_list = [['1','HDFFF020','FCAZ22'],['1','HDFFF010','FCAZ22'], # 해외선물 체결가, 호가
    #              ['1','HDFFF020','OESH23 C3900'],['1','HDFFF010','OESH23 C3900'], # 해외옵션 체결가, 호가
    #              ['1','HDFFF2C0','HTS ID를 입력하세요']] # 해외선물옵션 체결통보
    
    ### 1+2+3+4. 국내주식, 해외주식(미국), 해외주식(아시아), 국내선물옵션, 해외선물옵션 호가, 체결가, 체결통보 ###
    code_list = [['1','H0STASP0','005930'],['1','H0STCNT0','005930'],['1','H0STCNI0','HTS ID를 입력하세요'],
                 ['1','HDFSASP0','DNASAAPL'],['1','HDFSCNT0','DNASAAPL'],['1','H0GSCNI0','HTS ID를 입력하세요'],
                 ['1','HDFSASP1','DHKS00003'],['1','HDFSCNT0','DHKS00003'],['1','H0GSCNI0','HTS ID를 입력하세요'],
                 ['1','H0IFASP0','101S12'],['1','H0IFCNT0','101S12'],['1','H0IOASP0','201S12315'],['1','H0IOCNT0','201S12322'], ['1','H0IFCNI0','HTS ID를 입력하세요'],
                 ['1','HDFFF020','FCAZ22'],['1','HDFFF010','FCAZ22'],['1','HDFFF020','OESH23 C3900'],['1','HDFFF010','OESH23 C3900'],['1','HDFFF2C0','HTS ID를 입력하세요']]
    
    senddata_list=[]
    
    for i,j,k in code_list:
        temp = '{"header":{"approval_key": "%s","custtype":"P","tr_type":"%s","content-type":"utf-8"},"body":{"input":{"tr_id":"%s","tr_key":"%s"}}}'%(g_approval_key,i,j,k)
        senddata_list.append(temp)
        
    async with websockets.connect(url, ping_interval=30) as websocket:

        for senddata in senddata_list:
            await websocket.send(senddata)
            time.sleep(0.5)
            print(f"Input Command is :{senddata}")

        while True:

            try:

                data = await websocket.recv()
                time.sleep(0.5)
                # print(f"Recev Command is :{data}")  # 정제되지 않은 Request / Response 출력

                if data[0] == '0':
                    recvstr = data.split('|')  # 수신데이터가 실데이터 이전은 '|'로 나뉘어져있어 split
                    trid0 = recvstr[1]

                    if trid0 == "H0STASP0":  # 주식호가tr 일경우의 처리 단계
                        print("#### 주식호가 ####")
                        stockhoka_domestic(recvstr[3])
                        time.sleep(0.2)
# ------
                #     elif trid0 == "H0STCNT0":  # 주식체결 데이터 처리
                #         print("#### 주식체결 ####")
                #         stockspurchase_domestic(data_cnt, recvstr[3])
                #         time.sleep(0.2)

                #     elif trid0 == "HDFSASP0":  # 해외주식호가tr 일경우의 처리 단계
                #         print("#### 해외(미국)주식호가 ####")
                #         stockhoka_overseas(recvstr[3])
                #         time.sleep(0.2)

                #     elif trid0 == "HDFSASP1":  # 해외주식호가tr 일경우의 처리 단계
                #         print("#### 해외(아시아)주식호가 ####")
                #         stockhoka_overseas(recvstr[3])
                #         time.sleep(0.2)

                #     elif trid0 == "HDFSCNT0":  # 해외주식체결 데이터 처리
                #         print("#### 해외주식체결 ####")
                #         stockspurchase_overseas(data_cnt, recvstr[3])
                #         time.sleep(0.2)

                #     elif trid0 == "H0IFASP0":  # 지수선물호가 tr 일경우의 처리 단계
                #         print("#### 지수선물호가 ####")
                #         stockhoka_futs(recvstr[3])
                #         time.sleep(0.2)

                #     elif trid0 == "H0IFCNT0":  # 지수선물체결 데이터 처리
                #         print("#### 지수선물체결 ####")
                #         stockspurchase_futs(data_cnt, recvstr[3])
                #         time.sleep(0.2)

                #     elif trid0 == "H0IOASP0":  # 지수옵션호가 tr 일경우의 처리 단계
                #         print("#### 지수옵션호가 ####")
                #         stockhoka_optn(recvstr[3])
                #         time.sleep(0.2)

                #     elif trid0 == "H0IOCNT0":  # 지수옵션체결 데이터 처리
                #         print("#### 지수옵션체결 ####")
                #         stockspurchase_optn(data_cnt, recvstr[3])
                #         time.sleep(0.2)

                #     elif trid0 == "HDFFF010":  # 해외선물옵션호가 tr 일경우의 처리 단계
                #         print("#### 해외선물옵션호가 ####")
                #         stockhoka_overseafut(recvstr[3])
                #         time.sleep(0.2)

                #     elif trid0 == "HDFFF020":  # 해외선물옵션체결 데이터 처리
                #         print("#### 해외선물옵션체결 ####")
                #         data_cnt = int(recvstr[2])  # 체결데이터 개수
                #         stockspurchase_overseafut(data_cnt, recvstr[3])
                #         time.sleep(0.2)

                # elif data[0] == '1':

                #     recvstr = data.split('|')  # 수신데이터가 실데이터 이전은 '|'로 나뉘어져있어 split
                #     trid0 = recvstr[1]

                #     if trid0 == "H0STCNI0" or trid0 == "H0STCNI9":  # 주실체결 통보 처리
                #         stocksigningnotice_domestic(recvstr[3], aes_key, aes_iv)
                #         time.sleep(0.2)

                #     elif trid0 == "H0GSCNI0":  # 해외주실체결 통보 처리
                #         stocksigningnotice_overseas(recvstr[3], aes_key, aes_iv)
                #         time.sleep(0.2)

                #     elif trid0 == "H0IFCNI0":  # 지수선물옵션체결 통보 처리
                #         stocksigningnotice_futsoptn(recvstr[3], aes_key, aes_iv)
                #         time.sleep(0.2)

                #     elif trid0 == "HDFFF2C0":  # 해외선물옵션체결 통보 처리
                #         stocksigningnotice_overseafut(recvstr[3], aes_key, aes_iv)
                #         time.sleep(0.2)

                # else:

                #     jsonObject = json.loads(data)
                #     trid = jsonObject["header"]["tr_id"]

                #     if trid != "PINGPONG":
                #         rt_cd = jsonObject["body"]["rt_cd"]

                #         if rt_cd == '1':  # 에러일 경우 처리

                #             if jsonObject["body"]["msg1"] != 'ALREADY IN SUBSCRIBE':
                #                 print("### ERROR RETURN CODE [ %s ][ %s ] MSG [ %s ]" % (jsonObject["header"]["tr_key"], rt_cd, jsonObject["body"]["msg1"]))
                #             break

                #         elif rt_cd == '0':  # 정상일 경우 처리
                #             print("### RETURN CODE [ %s ][ %s ] MSG [ %s ]" % (jsonObject["header"]["tr_key"], rt_cd, jsonObject["body"]["msg1"]))

                #             # 체결통보 처리를 위한 AES256 KEY, IV 처리 단계
                #             if trid == "H0STCNI0" or trid == "H0STCNI9": # 국내주식
                #                 aes_key = jsonObject["body"]["output"]["key"]
                #                 aes_iv = jsonObject["body"]["output"]["iv"]
                #                 print("### TRID [%s] KEY[%s] IV[%s]" % (trid, aes_key, aes_iv))

                #             elif trid == "H0GSCNI0": # 해외주식
                #                 aes_key = jsonObject["body"]["output"]["key"]
                #                 aes_iv = jsonObject["body"]["output"]["iv"]
                #                 print("### TRID [%s] KEY[%s] IV[%s]" % (trid, aes_key, aes_iv))

                #             elif trid == "H0IFCNI0": # 국내선물옵션
                #                 aes_key = jsonObject["body"]["output"]["key"]
                #                 aes_iv = jsonObject["body"]["output"]["iv"]
                #                 print("### TRID [%s] KEY[%s] IV[%s]" % (trid, aes_key, aes_iv))

                #             elif trid == "HDFFF2C0": # 해외선물옵션
                #                 aes_key = jsonObject["body"]["output"]["key"]
                #                 aes_iv = jsonObject["body"]["output"]["iv"]
                #                 print("### TRID [%s] KEY[%s] IV[%s]" % (trid, aes_key, aes_iv))  

                #     elif trid == "PINGPONG":
                #         print("### RECV [PINGPONG] [%s]" % (data))
                #         print("### SEND [PINGPONG] [%s]" % (data))

            except websockets.ConnectionClosed:
                continue
                    
                    
# 비동기로 서버에 접속한다.
asyncio.get_event_loop().run_until_complete(connect())
asyncio.get_event_loop().close()