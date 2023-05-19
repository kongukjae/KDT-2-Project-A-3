from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017")

db = client.chicken_stock

collection = db.user_id 


data = {"name": "John", "age": 30}
result = collection.insert_one(data)
print("Inserted document ID:", result.inserted_id)

client.close()