import re
import mojito
import json
from flask import Flask, jsonify, request,session
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




data = broker._fetch_today_1m_ohlcv('005930',to="15:30:30")
# dir(broker)
# pprint.pprint(dir(broker))

df = pd.DataFrame(data['output2'])
# 15:30:00
df['stck_cntg_hour'] = pd.to_datetime(df['stck_cntg_hour'], format='%H%M%S').dt.strftime('%H:%M:%S')

df[['stck_prpr', 'stck_oprc', 'stck_hgpr', 'stck_lwpr', 'cntg_vol', 'acml_tr_pbmn']] = df[['stck_prpr', 'stck_oprc', 'stck_hgpr', 'stck_lwpr', 'cntg_vol', 'acml_tr_pbmn']].astype(float)

df.to_dict(orient='records')
pprint.pprint(df.to_dict(orient='records'))
