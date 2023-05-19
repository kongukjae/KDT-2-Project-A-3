from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017")

db = client.mydatabase 

collection = db.mycollection  


data = {"name": "John", "age": 30}

# 하나의 데이터를 삭제 할 경우
filter = {"name": "John"}
result = collection.delete_one(filter)
print("Deleted document count:", result.deleted_count)



client.close()