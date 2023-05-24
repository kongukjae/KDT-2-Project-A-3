from flask import Flask, render_template
from pymongo import MongoClient



app= Flask(__name__)
client=MongoClient("mongodb://localhost:27017/")
db=client['test-db']

db1= db.post.find_one({'author':'jimin'})['tags']





@app.route('/')
def home():
  return render_template('html.html',name=db1) 




if __name__=='__main__':
  app.run(debug=True)

