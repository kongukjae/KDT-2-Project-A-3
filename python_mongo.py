from pymongo import MongoClient


#client =MongoClient('localhost',27017)
client=MongoClient("mongodb://localhost:27017/")

db=client['test-db']

print(client.list_database_names())


data= {
    'author':'jimin',
    'text':'mongoDB is what?',
    'tags':['mongoDB','python','pymongo']
}


filter = {"author": "jimin"}
update = {"$set": {"text":"a" }}

dpInsert=db.post.update_one(filter,update)

for d in db['post'].find():
    print(d['author'], d['text'], d['tags'])

# 'author':'hun'인 데이터 조회
print(db.post.find_one({'author':'jimin'})['text'])


