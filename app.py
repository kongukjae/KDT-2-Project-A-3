from flask import Flask
from pymongo import MongoClient


app= Flask(__name__)
client=MongoClient("mongodb://localhost:27017/")
db=client['test-db']

db1= db.post.find_one({'author':'jimin'})['tags']





@app.route('/')
def home():
  return '''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <h1>'''+f"{db1}"+'''</h1>
</body>
</html>'''

@app.route('/user/<user_name>/<int:user_id>')
def user(user_name, user_id):
  return f'hello, {user_name}({user_id})!'


if __name__=='__main__':
  app.run(debug=True)

