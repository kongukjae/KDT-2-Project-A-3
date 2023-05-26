from pymongo import MongoClient

# MongoDB에 연결합니다.
client = MongoClient('mongodb://localhost:27017')

# 데이터베이스를 선택합니다.
db = client.jongyoon

# user_info 컬렉션에 문서 추가
user_info_doc = {
    'id': 'John',
    'pw': 30,
    'name': 'New York',
    'bank': '하나은행',
    'account': '1234567',
    'invest': '공격적',
    'invetsac': '없음',
    'understand': '주린이',
    'interesting': '패션,조선업',
}
user_info_result = db.user_info.insert_one(user_info_doc)

# user_stock 컬렉션에 문서 추가, mylog 필드에 trade_log의 _id를 참조
user_stock_doc = {
    'mystar': 'real',
    'account': 'cute',
    'mystock': 'fallbank',
    'mylog': None,  # 이 필드는 나중에 trade_log의 _id로 업데이트 될 것입니다
}
user_stock_result = db.user_stock.insert_one(user_stock_doc)

# trade_log 컬렉션에 문서 추가
trade_log_doc = {
    'mylog': '2020-08-06',
}
trade_log_result = db.trade_log.insert_one(trade_log_doc)

# trade_log의 _id를 참조하여 user_stock 컬렉션의 문서 업데이트
db.user_stock.update_one(
    {'_id': user_stock_result.inserted_id},
    {'$set': {'mylog': trade_log_result.inserted_id}}
)

# owned_stock 컬렉션에 문서 추가
owned_stock_doc = {
    'mystock': 'fallbank'
}
db.owned_stock.insert_one(owned_stock_doc)

client.close()
