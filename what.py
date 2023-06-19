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

app = Flask(__name__)
# 시크릿 키는 보안을 강화하기 위해 사용되는 값으로, 애플리케이션에서 사용되는 다양한 보안 기능에 필요
app.secret_key = "nb1+d(7+2y1q0m*kig4+zxld$v00^7dr=nxqcjn5(fp@ul)yc@"

f = open("./secret.key")
lines = f.readlines()
key = lines[0].strip()
secret = lines[1].strip()
acc_no = lines[2].strip()
f.close()
broker = mojito.KoreaInvestment(api_key=key, api_secret=secret, acc_no=acc_no)
symbols = broker.fetch_kospi_symbols()
company_row = symbols[symbols['한글명'] == "NAVER"]
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
