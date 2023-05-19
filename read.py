from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017")

db = client.mydatabase 

collection = db.mycollection  


data = {"name": "John", "age": 30}
result = collection.find_one({"name": "John"})
print("Document found:",result)


client.close()