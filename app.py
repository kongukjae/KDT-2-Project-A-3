from flask import Flask, render_template
from pymongo import MongoClient

app = Flask(__name__)
client = MongoClient('mongodb://localhost:27017')
db = client['mydatabase']
collection = db['mycollection']
result = collection.find_one()
print(result)
# 루트 URL에 대한 핸들러
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
  <h1>MongoDB Data:</h1>
  <p>'''+f"{result}"+'''</p>
  
</body>
</html>
'''

if __name__ == '__main__':
    app.run()
