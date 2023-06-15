import mojito
import pprint
import json
from pymongo import MongoClient
from flask import Flask, jsonify, request

def Mainpage_stock_list(collection_name):
    #API 접근 정보
    API_key = "PSVT5oQXN4N39r3jhoLtrCiVen4fcJ3p7zOh"
    API_secret = "OeeQY05O9OEfjuOP2KEtVpbP77p8WKaClPqgOEdSAVdH/FazfG51bqSc97t16uYOsvjb5DzrbqB11cfuMfBXPtwDB2BQqg7otSZAHo61OkobqBGPWJHGOHE/lt+X4WPNhyDiDu06EMiC6t+lvcIrG50t4/alJf7qhfL/dkg8sfOJgC66SDA="
    acc_no = "00000000-01"

    # 객체 생성
    class companyObject:
        def __init__(self):
            self.data = {}
    
        def __str__(self):
            return str(self.data)
    
        def to_dict(self):
            return self.data

    # 빈 배열 생성
    code_array = []
    name_array = []
    trade_array = []
    marketcap_array = []
    
    # 카운터 변수 생성
    counter = 0

    # DB 안에 특정 회사 이름이 있는지 확인하는 함수
    def find_company(company_name):
        document = collection.find_one({company_name: {"$exists": True}})
        if document:
            return company_name

    client = MongoClient('mongodb+srv://ChickenStock:1234@jiseop.g8czkiu.mongodb.net/')
    db = client['chicken_stock']
    # collection_name = 'elec_company_list'
    collection = db[collection_name]

    broker = mojito.KoreaInvestment(api_key=API_key, api_secret=API_secret, acc_no=acc_no)
    symbols = broker.fetch_kospi_symbols()        # 코스피
    newSymbols = symbols.sort_values(by='시가총액', ascending=False) # # sort_values() 메서드를 이용해서 API로 받아온 데이터를 특정 기준(지금은 시가총액, 내림차순)으로 정렬

    # 반복문을 통해 회사 이름이 DB에 있는 값일 경우 my_array 배열에 회사 이름을 추가
    # 카운터 변수를 이용하여 시가총액 순으로 내림차순 정렬된 리스트에서 상위 10개만 추출
    for i in range(len(newSymbols)):
        if counter < 10:
            if newSymbols['한글명'].iloc[i] == find_company(newSymbols['한글명'].iloc[i]):
                counter = counter + 1
                name_array.append(newSymbols['한글명'].iloc[i])
                code_array.append(newSymbols['단축코드'].iloc[i])
                trade_array.append(newSymbols['전일거래량'].iloc[i])
                marketcap_array.append(newSymbols['시가총액'].iloc[i])
        else:
            break
    company_Object = companyObject()
    # print(name_array)

    for i in range(len(code_array)):
        temp = broker.fetch_price(code_array[i])
        key = name_array[i]
        value = {
            '종목코드': int(code_array[i]),
            '현재가': temp['output']['stck_prpr'],
            '전일종가' : temp['output']['stck_sdpr'],
            '등락' : (int(temp['output']['stck_prpr']) - int(temp['output']['stck_sdpr'])),
            '시가총액' : int(marketcap_array[i]),
            '거래량' : int(trade_array[i]),
        }
        company_Object.data[key] = value
    return company_Object
# print(Mainpage_stock_list('financial_company_list'))