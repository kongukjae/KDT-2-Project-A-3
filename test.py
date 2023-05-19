from pymongo import MongoClient

# MongoDB에 연결합니다.
client = MongoClient('mongodb://localhost:27017')

# 데이터베이스와 컬렉션을 선택합니다.
db = client.jongyoon
collection = db.user_id


document = {
    'name': 'John',
    'age': 30,
    'city': 'New York'
}

# 컬렉션에 문서 추가
result = collection.insert_one(document)
print("Inserted document ID:", result.inserted_id)

client.close()


# 컬렉션에서 모든 문서를 조회합니다.
# for doc in collection.find():
#     print(doc)

        # \       cute yoon       /
        #  \                         /
        #   \    yoon's cuets home     /
        #    ]     not exist.      [    ,'|
        #    ]                     [   /  |
        #    ]___               ___[ ,'   |
        #    ]  ]\             /[  [ |:   |
        #    ]  ] \           / [  [ |:   |
        #    ]  ]  ]         [  [  [ |:   |
        #    ]  ]  ]__     __[  [  [ |:   |
        #    ]  ]  ] ]\ _ /[ [  [  [ |:   |
        #    ]  ]  ] ] (#) [ [  [  [ :===='
        #    ]  ]  ]_].nHn.[_[  [  [
        #    ]  ]  ]  HHHHH. [  [  [
        #    ]  ] /   `HH("N  \ [  [
        #    ]__]/     HHH  "  \[__[
        #    ]         NNN         [
        #    ]         N/"         [
        #    ]         N H         [
        #   /          N            \
        #  /                         \
        # /                           \