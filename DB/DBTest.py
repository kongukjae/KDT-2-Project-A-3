from pymongo import MongoClient

#DB 접속
client = MongoClient('mongodb://localhost:27017/')

#DB 생성 / 접속
db = client["Dororo"]

#collection 생성 / 접속
collection = db["DororoCollection"]

#Create
# data = {"name": "sumin", "team": "Dororo"}
# result = collection.insert_one(data)
# print("Inserted data:", result.inserted_id)
# data = [
#   {"name": "sumin", "team": "Dororo"},
#   {"name": "jiseop", "team": "Dororo"},
#   {"name": "jimin", "team": "Dororo"},
#   {"name": "gyungtaek", "team": "Dororo"},
#   {"name": "jongyun", "team": "Dororo"}
#   ]
# result = collection.insert_many(data)
# print("Inserted data:", result.inserted_ids) # inserted_id's'

#Read
# name = collection.find({"team": "Dororo"})
# for document in name:
#   print(document)

#Update
update_name = {"team": "Dorororo"}
update_name_data = {"$set": {"team": "Dororo"}}
result = collection.update_many(update_name, update_name_data)
print("Modified count:", result.modified_count)

#Delete
# delete_field = {"team": "Dororo"}
# result = collection.delete_one(delete_field)
# result = collection.delete_many(delete_field)