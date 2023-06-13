import re
import mojito
import json
from flask import Flask, jsonify, request
from pymongo import MongoClient
# from pykrx import stock
import pandas as pd
from bs4 import BeautifulSoup
import requests
import callApiData.Mainpage_stock_data
import pprint
from flask_socketio import SocketIO, emit

app = Flask(__name__)

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


# Flask-SocketIO  인스턴스 생성
socketio = SocketIO(app, cors_allowed_origins="*")

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
    client = MongoClient(
        "mongodb+srv://ChickenStock:1234@jiseop.g8czkiu.mongodb.net/")
    db = client['chicken_stock']
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
        return jsonify(returnValue)  # 클라이언트에게 데이터를 반환.
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
            return jsonify(returnValue)
    else:
        returnValue['state'] = False
        returnValue['message'] = "로그인 오류"
        return jsonify(returnValue)


# 컴포넌트 2-1 실시간 주가 차트 데이터(일단위)
@app.route('/get_data', methods=['GET'])
def get_data():

    data = broker._fetch_today_1m_ohlcv("005930", to="15:30:30")
    df = pd.DataFrame(data['output2'])
    df['stck_cntg_hour'] = pd.to_datetime(df['stck_cntg_hour'], format='%H%M%S').dt.strftime('%H:%M:%S')
    df[['stck_prpr', 'stck_oprc', 'stck_hgpr', 'stck_lwpr', 'cntg_vol', 'acml_tr_pbmn']] = df[['stck_prpr', 'stck_oprc', 'stck_hgpr', 'stck_lwpr', 'cntg_vol', 'acml_tr_pbmn']].astype(float)

    return df.to_json(orient='records')


# 컴포넌트 2-2 주가데이터(한달단위)
@app.route('/get_Mdata', methods=['GET'])
def get_Mdata():
    data = broker.fetch_ohlcv_domestic("005930","M","20220608")
    df = pd.DataFrame(data['output2'])

    # 필요한 컬럼을 숫자로 변환
    df[['stck_clpr', 'stck_hgpr', 'stck_lwpr', 'stck_oprc', 'acml_vol', 'acml_tr_pbmn']] = df[['stck_clpr', 'stck_hgpr', 'stck_lwpr', 'stck_oprc', 'acml_vol', 'acml_tr_pbmn']].astype(float)
    
    # 날짜 컬럼 형식 변경
    df['stck_bsop_date'] = pd.to_datetime(df['stck_bsop_date'], format='%Y%m%d')

    # 필요한 정보만 포함된 json 데이터로 변환
    chart_data = df[['stck_bsop_date', 'stck_oprc', 'stck_hgpr', 'stck_lwpr', 'stck_clpr', 'acml_vol']].to_dict(orient='records')

    return jsonify(chart_data)

# 컴포넌트 2-3 주가데이터(연단위)
@app.route('/get_Ydata', methods=['GET'])
def get_Ydata():
    data = broker.fetch_ohlcv("005930","Y")
    df = pd.DataFrame(data['output2'])
     # 필요한 컬럼을 숫자로 변환
    df[['stck_clpr', 'stck_hgpr', 'stck_lwpr', 'stck_oprc', 'acml_vol', 'acml_tr_pbmn']] = df[['stck_clpr', 'stck_hgpr', 'stck_lwpr', 'stck_oprc', 'acml_vol', 'acml_tr_pbmn']].astype(float)
    
    # 날짜 컬럼 형식 변경
    df['stck_bsop_date'] = pd.to_datetime(df['stck_bsop_date'], format='%Y%m%d')

    # 필요한 정보만 포함된 json 데이터로 변환
    chart_data = df[['stck_bsop_date', 'stck_oprc', 'stck_hgpr', 'stck_lwpr', 'stck_clpr', 'acml_vol']].to_dict(orient='records')

    return jsonify(chart_data)
# # 컴포넌트 1-3


@app.route('/companydetail', methods=['GET'])
def get_company_data():

    symbols = broker.fetch_kospi_symbols()
    company_row = symbols[symbols['한글명'] == '삼성전자']

    company_info = company_row[['단축코드', '한글명']].to_dict(orient='records')[0]

    return jsonify(company_info)


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


# 실시간 주식 등락률,현재가격 API에서 제공되는 것을 가져다 씀
@socketio.on('request_company_rate')
def get_company_rate():
    data = broker._fetch_today_1m_ohlcv("005930",to="15:30:30")

    output1 = data["output1"]
    output2 = data["output2"]

    combined_output = {"prdy_ctrt": output1["prdy_ctrt"], "stck_prpr": output2[0]["stck_prpr"]}

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
    client = MongoClient(
        "mongodb+srv://ChickenStock:1234@jiseop.g8czkiu.mongodb.net/")  # 데이터베이스 연결
    db = client['chicken_stock']
    
    user_id = session.get('user_id')
    # find_id = db.user_info.find_one({id: user_id})
    print("session")
    print(user_id)
    stocks_name = ""
    
    # if find_id:
    #     stocks_name = find_id.get('ChoiceTwo')
    #     print(stocks_name)
    
    url = f'https://search.naver.com/search.naver?where=news&sm=tab_opt&query=금융&nso_open=1'
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

    #* 비 ASCII 문자를 유니코드로 유지하도록 ensure_ascii값을 false로 설정
    #? news_object 인스턴스의 속성들을 딕셔너리 형태로 반환
    json_news = json.dumps(news_object.__dict__, ensure_ascii=False)
    

    return jsonify(json_news)


# 메인 페이지에 주식 목록 데이터
@app.route('/api/main_page', methods=['POST'])
def main_page_init():
    request_data = request.get_json() #user_id를 받아와서 id를 통해 DB 데이터에 접근 할 예정
    print('받아온 데이터')
    print(request_data)
    collection = db['user_info']
    user_category = collection.find({ id: "aaa1234" }, { 'choiceTwo': 1, '_id': 0 })
    # print('user_category')
    # print(user_category)
    # testData = user_category[0]
    # print(testData)
    # pprint.pprint(testData)
    reqData = 'elec_company_list' # DB에서 접속한 user의 관심 종목 값을 받아옴 / 현재는 임시로 전기.전자 입력
    init_data = callApiData.Mainpage_stock_data.Mainpage_stock_list(reqData) # 전기.전자 종목의 시가총액 순 상위 16개 목록 추출
    return jsonify(init_data.to_dict()) # 직렬 화 후 main_page로 데이터 전달


if (__name__) == '__main__':
    app.run(host='0.0.0.0', port=5000)