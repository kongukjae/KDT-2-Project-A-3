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
import callDBData.category_name_changer
# bardapi
import bardapi
import os

# Flask 애플리케이션을 생성하는 부분
app = Flask(__name__)
# 시크릿 키는 보안을 강화하기 위해 사용되는 값으로, 애플리케이션에서 사용되는 다양한 보안 기능에 필요
app.secret_key = "nb1+d(7+2y1q0m*kig4+zxld$v00^7dr=nxqcjn5(fp@ul)yc@"

os.environ['_BARD_API_KEY']="XQiP6_UOiNfmRxuQisZJYU3HJ8ou4gWiEtJHEK2YpJQhzjebXfozrSN1phM02G415pc2UQ."

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
@app.route('/signup', methods=['POST'])
def register():
    data = request.get_json()

    print(data)

    collection = db['user_info']
    collection.insert_one(data)
    print('회원가입 데이터 저장')

    return '데이터 저장 완료'


@app.route('/checkId', methods=['POST'])
def checkId():
    request_data = request.get_json()
    returnValue = {}
    print('아이디 서버 연결')
    if db.user_info.find_one({'id': request_data["id"]}) == None:
        returnValue['state'] = 'available'
        return jsonify(returnValue)
    elif db.user_info.find_one({'id': request_data["id"]})["id"] == request_data["id"]:
        returnValue['state'] = 'taken'
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
def get_data():

    data = broker._fetch_today_1m_ohlcv("001470", to="15:30:30")
    df = pd.DataFrame(data['output2'])
    df['stck_cntg_hour'] = pd.to_datetime(
        df['stck_cntg_hour'], format='%H%M%S').dt.strftime('%H:%M:%S')
    df[['stck_prpr', 'stck_oprc', 'stck_hgpr', 'stck_lwpr', 'cntg_vol', 'acml_tr_pbmn']] = df[[
        'stck_prpr', 'stck_oprc', 'stck_hgpr', 'stck_lwpr', 'cntg_vol', 'acml_tr_pbmn']].astype(float)

    emit('data_response', df.to_dict(orient='records'))
    print(df.to_dict)

# 컴포넌트 2-2 주가데이터(한달단위)


@app.route('/get_Mdata', methods=['GET'])
def get_Mdata():
    data = broker.fetch_ohlcv_domestic("005930", "M", "20220608")
    df = pd.DataFrame(data['output2'])

    # 필요한 컬럼을 숫자로 변환
    df[['stck_clpr', 'stck_hgpr', 'stck_lwpr', 'stck_oprc', 'acml_vol', 'acml_tr_pbmn']] = df[[
        'stck_clpr', 'stck_hgpr', 'stck_lwpr', 'stck_oprc', 'acml_vol', 'acml_tr_pbmn']].astype(float)

    # 날짜 컬럼 형식 변경
    df['stck_bsop_date'] = pd.to_datetime(
        df['stck_bsop_date'], format='%Y%m%d')

    # 필요한 정보만 포함된 json 데이터로 변환
    chart_data = df[['stck_bsop_date', 'stck_oprc', 'stck_hgpr',
                     'stck_lwpr', 'stck_clpr', 'acml_vol']].to_dict(orient='records')

    return jsonify(chart_data)

# 컴포넌트 2-3 주가데이터(연단위)


@app.route('/get_Ydata', methods=['GET'])
def get_Ydata():
    data = broker.fetch_ohlcv("005930", "Y")
    df = pd.DataFrame(data['output2'])
    # 필요한 컬럼을 숫자로 변환
    df[['stck_clpr', 'stck_hgpr', 'stck_lwpr', 'stck_oprc', 'acml_vol', 'acml_tr_pbmn']] = df[[
        'stck_clpr', 'stck_hgpr', 'stck_lwpr', 'stck_oprc', 'acml_vol', 'acml_tr_pbmn']].astype(float)

    # 날짜 컬럼 형식 변경
    df['stck_bsop_date'] = pd.to_datetime(
        df['stck_bsop_date'], format='%Y%m%d')

    # 필요한 정보만 포함된 json 데이터로 변환
    chart_data = df[['stck_bsop_date', 'stck_oprc', 'stck_hgpr',
                     'stck_lwpr', 'stck_clpr', 'acml_vol']].to_dict(orient='records')

    return jsonify(chart_data)


# 컴포넌트 1-1 기업 이름, 코드
@app.route('/companydetail', methods=['GET'])
def get_company_data():

    symbols = broker.fetch_kospi_symbols()
    company_row = symbols[symbols['한글명'] == '삼성전자']

    company_info = company_row[['단축코드', '한글명']].to_dict(orient='records')[0]

    return jsonify(company_info)

# 컴포넌트3 기업 상세 정보


@app.route('/companyupdown', methods=['GET'])
def get_company_updown():

    symbols = broker.fetch_kospi_symbols()
    company_row = symbols[symbols['한글명'] == '삼성전자']
    company_code = company_row['단축코드'].values[0]
    company_price = broker.fetch_price(company_code)
    company_infof = {
        '시가': company_price['output']['stck_oprc'],
        '오늘최고가': company_price['output']['stck_hgpr'],
        '오늘최저가': company_price['output']['stck_lwpr'],
        '현재가': company_price['output']['stck_prpr'],
        '시가총액': company_price['output']['cpfn_cnnm'],
    }

    return jsonify(company_infof)

# 컴포넌트 1-2 기업 등락률, 가격
# 실시간 주식 등락률,현재가격 API에서 제공되는 것을 가져다 씀


@socketio.on('request_company_rate')
def get_company_rate():
    data = broker._fetch_today_1m_ohlcv("005930", to="15:30:30")

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


# 메인 페이지에 주식 목록 데이터
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


@app.route('/api/hoga', methods=['GET'])
def get_hoga_data():
    def get_approval(key, secret):
        url = 'https://openapi.koreainvestment.com:9443'  # 실전투자계좌
        headers = {"content-type": "application/json"}
        body = {"grant_type": "client_credentials",
                "appkey": key,
                "secretkey": secret}
        PATH = "oauth2/Approval"
        URL = f"{url}/{PATH}"
        res = requests.post(URL, headers=headers, data=json.dumps(body))
        approval_key = res.json()["approval_key"]
        return approval_key
    print(get_approval(key, secret))
    return jsonify()

#! 챗봇 API
@socketio.on('modalOpen')
def modal_open():
    # 클라이언트가 소켓에 연결되었을 때 실행되는 로직을 작성합니다.
    
    print('Client connected')
    emit('clientConnect');

@socketio.on('modalClose')
def handle_disconnect():
    # 클라이언트가 소켓 연결을 끊었을 때 실행되는 로직을 작성합니다.
    print('Client disconnected')
    emit('clientDisconnect');

if (__name__) == '__main__':
    app.run(host='0.0.0.0', port=5000)
    socketio.run(app, host='0.0.0.0', port=5000)