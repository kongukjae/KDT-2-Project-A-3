from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017")

db = client.mydatabase 

collection = db.mycollection  


data = {"name": "John", "age": 30}
result = collection.insert_one(data)
print("Inserted document ID:", result.inserted_id)

client.close()