from pymongo import MongoClient
from flask import Flask, render_template

app = Flask(__name__)

client = MongoClient("mongodb://localhost:27017")
db = client.chicken_stock  # DB이름 쓰기

# basic_data = {
#   "name": "Jiseop", 
#   "age": 30
#   }

@app.route("/")
def index():
  collection = db.user_id  # 'collection'은 다른 db의 하나의 테이블이라고 생각하면 편함
  data = collection.find()
  return render_template("index.html", data=data)

if __name__ == "__main__":
  app.run()

# result = collection.insert_one(basic_data)