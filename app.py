import re
import mojito
import json
from flask import Flask, jsonify, request, session
from pymongo import MongoClient
# from pykrx import stock
import pandas as pd
from bs4 import BeautifulSoup
import requests
import pprint
from flask_socketio import SocketIO, emit
# 개인 제작 모듈
import callApiData.Mainpage_stock_data
import callApiData.Search_stock_data
import callDBData.category_name_changer
import time
from datetime import datetime

import json

from base64 import b64decode

import bardapi
import os

# Flask 애플리케이션을 생성하는 부분
app = Flask(__name__)
# 시크릿 키는 보안을 강화하기 위해 사용되는 값으로, 애플리케이션에서 사용되는 다양한 보안 기능에 필요
app.secret_key = "nb1+d(7+2y1q0m*kig4+zxld$v00^7dr=nxqcjn5(fp@ul)yc@"

os.environ['_BARD_API_KEY'] = "XQiP6_UOiNfmRxuQisZJYU3HJ8ou4gWiEtJHEK2YpJQhzjebXfozrSN1phM02G415pc2UQ."

f = open("./secret.key")
lines = f.readlines()
key = lines[0].strip()
secret = lines[1].strip()
acc_no = lines[2].strip()
f.close()
broker = mojito.KoreaInvestment(api_key=key, api_secret=secret, acc_no=acc_no)

client = MongoClient(
    'mongodb+srv://ChickenStock:1234@jiseop.g8czkiu.mongodb.net/')
db = client['chicken_stock']
# mojito1 = mojito()
# Flask-SocketIO  인스턴스 생성
socketio = SocketIO(app, cors_allowed_origins="*")

#! 마이페이지 계좌


@app.route('/account', methods=['GET'])
def account():
    login_id = session.get('user_id')  # 로그인한 아이디를 세션을 사용하여 저장
    print(login_id)
    # 연결된 db에서 id가 로그인 한 id와 같은 데이터를 db에서 찾음
    result = db.user_info.find_one({'id': login_id})
    print(result)
    if result:
        # ObjectId를 문자열로 변환
        result['_id'] = str(result['_id'])
        print(result)
        return jsonify(result)
    else:
        return jsonify({'error': 'Invalid login_id'})  # 유효하지 않은 로그인 아이디인 경우


@app.route('/api/data', methods=['GET'])
# 회원가입 기능 서버에서 처리하는 로직
@app.route('/signup', methods=['POST'])
def register():
    # 요청으로 부터 json 데이터 가져오기
    data = request.get_json()

    print(data)

    collection = db['user_info']
    collection.insert_one(data)
    print('회원가입 데이터 저장')

    return '데이터 저장 완료'

# id중복체크 하는 로직


@app.route('/checkId', methods=['POST'])
def checkId():
    # 요청으로 부터 json 데이터 가져오기
    request_data = request.get_json()
    returnValue = {}
    print('아이디 서버 연결')
    # id를 db에서 찾아보고 없으면 'available' 을 반환
    if db.user_info.find_one({'id': request_data["id"]}) == None:
        returnValue['state'] = 'available'
        return jsonify(returnValue)
    # id를 db에서 찾오보고 있으면 'available'을 반환
    elif db.user_info.find_one({'id': request_data["id"]})["id"] == request_data["id"]:
        returnValue['unavailable'] = 'no'
        return jsonify(returnValue)


@app.route('/api/user-info', methods=['POST'])
def user_info():
    data = request.get_json()

    print(data)

    collection = db['user_info']
    find_id = collection.find_one({}, sort=[('_id', -1)])
    find_id.update(data)
    collection.replace_one({'_id': find_id['_id']}, find_id)

    print('사용자 정보 데이터 저장')

    return '데이터 저장 완료'


@app.route('/api/login', methods=['POST'])
def login_Check():
    request_data = request.get_json()  # request.get_json()오로 리액트로부터 데이터 받아옴
    pattern = r'^[a-zA-Z0-9]+$'  # 영문자와 숫자로만 입력된 값만 입력.
    returnValue = {}  # 응답할 값을들 담을 객체
    client = MongoClient(
        "mongodb+srv://ChickenStock:1234@jiseop.g8czkiu.mongodb.net/")  # 데이터베이스 연결
    db = client['chicken_stock']

    if not re.match(pattern, request_data['id']):  # 아이디 유효성 검사
        returnValue['state'] = False
        returnValue['message'] = "아이디는 영문자와 숫자만 입력 가능합니다"
        return jsonify(returnValue)  # 클라언트에게 데이터를 반환.
    elif request_data['id'] == "" or request_data['pw'] == "":  # 아이디와 비밀번호 공백 시
        returnValue['state'] = False
        returnValue['message'] = "아이디와 비밀번호 모두 입력해주세요."
        return jsonify(returnValue)

    # user_info document에 일치하는 정보가 없을 경우
    elif db.user_info.find_one({'id': request_data["id"]}) == None:
        returnValue['state'] = False
        returnValue['message'] = "등록된 회원이 아닙니다."
        return jsonify(returnValue)
    # 입력한 id값과 데이터 베이스 id 값이 일치하는 경우
    elif db.user_info.find_one({'id': request_data["id"]})["id"] == request_data["id"]:
        # 입력한 id값의 해당되는 데이터 베이스에서 pw 검사.
        if not db.user_info.find_one({'id': request_data["id"]})["password"] == request_data["pw"]:
            returnValue['state'] = False
            returnValue['message'] = "비밀번호 불일치"
            return jsonify(returnValue)
        else:
            returnValue['state'] = True
            returnValue['message'] = "정상"
            print("정상")
            print(request_data['id'])
            session['user_id'] = request_data['id']
            return jsonify(returnValue)
    else:
        returnValue['state'] = False
        returnValue['message'] = "로그인 오류"
        return jsonify(returnValue)


# 컴포넌트 2-1 실시간 주가 차트 데이터(일단위)
# @app.route('/get_data', methods=['GET'])
@socketio.on('get_data')
def get_data(company_code):
    print(company_code)
    print("여기는 실시간 코드 여기는 실시간 코드 여기는 실시간 코드")
    code1 = company_code['company_code']
    # print(code1)
    data = broker._fetch_today_1m_ohlcv([(f'{code1}')], to="15:30:30")
    df = pd.DataFrame(data['output2'])
    df['stck_cntg_hour'] = pd.to_datetime(
        df['stck_cntg_hour'], format='%H%M%S').dt.strftime('%H:%M:%S')
    df[['stck_prpr', 'stck_oprc', 'stck_hgpr', 'stck_lwpr', 'cntg_vol', 'acml_tr_pbmn']] = df[[
        'stck_prpr', 'stck_oprc', 'stck_hgpr', 'stck_lwpr', 'cntg_vol', 'acml_tr_pbmn']].astype(float)

    emit('data_response', df.to_dict(orient='records'))
    # print(df.to_dict)

# 컴포넌트 2-2 주가데이터(한달단위)


@app.route('/get_Mdata/<string:company_code>', methods=['GET'])
def get_Mdata(company_code):
    # print(company_code)
    # print('여기는 무엇인가요?')
    code2 = company_code
    print(code2)
    print("여기는 월간데이터 월간데이터")
    data = broker.fetch_ohlcv_domestic([(f'{code2}')], "M", "20220608")
    print(data)
    df = pd.DataFrame(data['output2'])

    # 필요한 컬럼을 숫자로 변환
    df[['stck_clpr', 'stck_hgpr', 'stck_lwpr', 'stck_oprc', 'acml_vol', 'acml_tr_pbmn']] = df[[
        'stck_clpr', 'stck_hgpr', 'stck_lwpr', 'stck_oprc', 'acml_vol', 'acml_tr_pbmn']].astype(float)

    # 날짜 컬럼 형식 변경
    df['stck_bsop_date'] = pd.to_datetime(
        df['stck_bsop_date'], format='%Y%m%d')
    # df['stck_bsop_date'] = df['stck_bsop_date'].dt.strftime('%Y-%m-%d')
    # 필요한 정보만 포함된 json 데이터로 변환
    chart_data = df[['stck_bsop_date', 'stck_oprc', 'stck_hgpr',
                    'stck_lwpr', 'stck_clpr', 'acml_vol']].to_dict(orient='records')

    print(chart_data)
    print('여기는 월간 여기는 월간 여기는 월간')
    return jsonify(chart_data)


# 컴포넌트 1-1 기업 이름, 코드
@app.route('/companydetail/<string:company_name>', methods=['GET'])
def get_company_data(company_name):
    print("테스트입니다 테스트입니다", company_name)
    symbols = broker.fetch_kospi_symbols()
    company_row = symbols[symbols['한글명'] == company_name]

    company_info = company_row[['단축코드', '한글명']].to_dict(orient='records')[0]

    return jsonify(company_info)

# 컴포넌트3 기업 상세 정보


@app.route('/companyupdown/<string:company_name>', methods=['GET'])
def get_company_updown(company_name):

    symbols = broker.fetch_kospi_symbols()
    company_row = symbols[symbols['한글명'] == company_name]
    company_code = company_row['단축코드'].values[0]
    company_price = broker.fetch_price(company_code)
    company_infof = {
        '시가': company_price['output']['stck_oprc'],
        '오늘최고가': company_price['output']['stck_hgpr'],
        '오늘최저가': company_price['output']['stck_lwpr'],
        '현재가': company_price['output']['stck_prpr'],
        '시가총액': company_price['output']['cpfn_cnnm'],
    }
    print(company_infof)
    return jsonify(company_infof)
# 컴포넌트 1-2 기업 등락률, 가격
# 실시간 주식 등락률,현재가격 API에서 제공되는 것을 가져다 씀


@socketio.on('request_company_rate')    
def get_company_rate(company_code):
    code = company_code['company_code']
    print(code)
    print(type(code))
    print(type(f'{code}'))
    print(f'{code}')
    print([f'{code}'])

    print("여기는 여기는 여기는 여기는 여기는")
    data = broker._fetch_today_1m_ohlcv([(f'{code}')], to="15:30:00")

#     output1 = data["output1"]
#     output2 = data["output2"]

    output1 = data["output1"]
    output2 = data["output2"]

    combined_output = {
        "prdy_ctrt": output1["prdy_ctrt"], "stck_prpr": output2[0]["stck_prpr"]}

    emit('changerate', combined_output)
# @app.route('/changerate', methods=['GET'])
# def get_company_rate():
#     data=broker._fetch_today_1m_ohlcv("005930",to="15:30:30")

#     output1 = data["output1"]
#     output2 = data["output2"]

#     combined_output = {"prdy_ctrt": output1["prdy_ctrt"], "stck_prpr": output2[0]["stck_prpr"]}

#     return jsonify(combined_output)

#! 크롤링할 웹 페이지 URL


class news:
    def __init__(self, title, detail, link):
        self.title = title
        self.detail = detail
        self.link = link


@app.route('/news', methods=['GET'])
def get_news_data():
    # 로그인할 때 저장한 아이디를 세션으로 사용
    user_id = session.get('user_id')
    # 연결된 db에서 id가 로그인 한 id와 같은 데이터를 db에서 찾음
    find_id = db.user_info.find_one({"id": user_id})
    # 찾은 데이터 중에서 choiceTwo(관심종목)을 가져옴
    stocks_name = find_id['choiceTwo']
    # url의 파라미터로 관심종목을 받음
    url = f'https://search.naver.com/search.naver?where=news&sm=tab_opt&query={stocks_name}&nso_open=1'
    response = requests.get(url)
    html = response.text

    title_array = []
    detail_array = []
    link_array = []

    soup = BeautifulSoup(html, 'html.parser')

    # ? 기사 제목
    titles = soup.find_all('a', attrs={'class': 'news_tit'}, limit=3)
    for a_tag in titles:
        title_array.append(a_tag['title'])

    # ? 기사 간략내용
    details = soup.select(
        'div.news_wrap.api_ani_send > div > div.news_dsc > div > a', limit=3)
    for i in range(3):
        detail_array.append(details[i].get_text())

    # ? 기사 링크
    for a_tag in titles:
        link_array.append(a_tag['href'])

    news_object = news(title_array, detail_array, link_array)

    # * 비 ASCII 문자를 유니코드로 유지하도록 ensure_ascii값을 false로 설정
    # ? news_object 인스턴스의 속성들을 딕셔너리 형태로 반환
    json_news = json.dumps(news_object.__dict__, ensure_ascii=False)

    return jsonify(json_news)


# ? 메인 페이지 주식 목록 데이터
@app.route('/api/main_page', methods=['POST'])
def main_page_init():
    user_id = session.get('user_id')
    collection = db['user_info']
    document = collection.find_one({"id": user_id}, {"choiceTwo": 1, "_id": 0})
    user_category = document['choiceTwo']
    resData = callDBData.category_name_changer.name_change(user_category)
    init_data = callApiData.Mainpage_stock_data.Mainpage_stock_list(
        resData)  # 각 종목의 시가총액 순 상위 16개 목록 추출
    print('데이터 전달')
    # print(init_data)
    # print(init_data.to_dict())
    return jsonify(init_data.to_dict())  # 직렬 화 후 main_page로 데이터 전달

# 구매 페이지에 호가를 눌렀을때 호가 정보를 받아오는 요청


# 구매 페이지에 호가를 눌렀을때 호가 정보를 받아오는 요청
hogaData=['005930', '155110', '0', '71300', '71400', '71500', '71600', '71700', '71800', '71900', '72000', '72100', '72200', '71200', '71100', '71000', '70900', '70800', '70700', '70600', '70500', '70400', '70300', '71362', '82344', '137302', '131061', '75999', '89133', '115811', '208898', '43732', '89642', '18722', '78174', '251866', '319763', '261333', '93409', '72555', '125027', '31930', '27443', '1045284', '1280222', '3508', 
'0', '0', '0', '444653', '-71800', '5', '-100.00', '10986246', '0', '0', '1', '0', '0']

@app.route('/api/hoga', methods=['GET'])
def get_hoga_data():    
    return jsonify(hogaData)
   
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

#! 챗봇 API
@socketio.on('message')  # 수정된 부분
def handle_message(message):
    print("받음")
    print('Received message:', message)
    bard_question = f'주식이나 투자에서 {message} 짧게 한 문장으로 얘기해줘'
    bard_answer = bardapi.core.Bard().get_answer(bard_question)
    # 메시지 처리 로직을 추가할 수 있습니다.
    # 필요에 따라 클라이언트에 응답 메시지를 보낼 수도 있습니다.
    emit('response', bard_answer)

# ? 주식 검색
@app.route('/search_stock', methods=['POST'])
def search_stock_server():
    print('검색 진입')
    search_value = request.get_json()
    print('들어온 회사명 ', search_value)
    search_response = callApiData.Search_stock_data.Search_data(search_value)
    if type(search_response) == str:
        return jsonify(search_response)
    return jsonify(search_response.to_dict())

#! 구매로직 작성
@app.route('/buy', methods=['POST'])
def buy():
    data = request.get_json()
    user_id = session.get('user_id')
    # # 연결된 db에서 id가 로그인 한 id와 같은 데이터를 db에서 찾음
    find_id = db.user_info.find_one({"id": user_id})
    total_price = data.get('totalPrice')
    company_name = data.get('companyName')
    quantity = data.get('quantity')
    print(company_name, quantity)
    account = None  # 초기값으로 None 설정
    if find_id is not None:
        account = find_id.get('account')
        # account 값을 수정하는 로직을 추가
        new_account = account - total_price  # 새로운 account 값으로 대체할 값 설정
        # 데이터베이스에서 account 값을 수정
        print(total_price)
        db.user_info.update_one(
            {"id": user_id}, {"$set": {"account": new_account}})
        print('account 값이 수정되었습니다.')
        nowDatetime = datetime.now()

        db.user_info.update_one(
            {"id": user_id},
            {"$push": {
                "companyData": {
                    "companyName": company_name,
                    "quantity": quantity,
                    "totalPrice": total_price,
                    "timestamp": (str(nowDatetime.year)+'년'+str(nowDatetime.month)+'월'+str(nowDatetime.day)+'일'+str(nowDatetime.hour)+'시'+str(nowDatetime.minute)+'분')
                }
            }}
        )
        # db.user_info.insert_one()
        # 수정된 account 값을 다시 가져와서 확인
        updated_account = db.user_info.find_one({"id": user_id}).get('account')
        print('수정된 account 값:', str(updated_account))
    print('find_id'+str(find_id))
    print('total' + str(total_price))
    print('data' + str(data))
    print('account' + str(account))
    return jsonify(data)

#? 마이페이지 업종 선택 변경
@app.route('/categoryChange', methods=['POST'])
def change():
    data = request.get_json()
    print('전달 받은 data: ', data)
    user_id = session.get('user_id')
    print('user_id: ', user_id)
    collection = db['user_info']
    document = collection.update_one({"id": user_id}, {"$set":{"choiceTwo": data}})
    print(document)
    # user_category = document['choiceTwo']
    # print('category 확인용: ', user_category)
    return ''


if (__name__) == '__main__':

    socketio.run(app, host='0.0.0.0', port=5000)
