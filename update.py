from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017")

db = client.mydatabase 

collection = db.mycollection  


data = {"name": "John", "age": 30}
# 하나의 데이터만 업데이트 할 경우
filter = {"name": "John"}
update = {"$set": {"age": 35}}
result = collection.update_one(filter, update)
print("Modified document count:", result.modified_count)



client.close()