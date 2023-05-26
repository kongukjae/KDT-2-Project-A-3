from pymongo import MongoClient

# MongoDB에 연결합니다.
client = MongoClient('mongodb://localhost:27017')

# 데이터베이스를 선택합니다.
db = client.jongyoon

# user_info 컬렉션에서 모든 문서 조회
cursor = db.user_info.find()

# 조회된 문서를 출력
for document in cursor:
    print(document)

client.close()
