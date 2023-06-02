import mojito
from pymongo import MongoClient

key = "PSVT5oQXN4N39r3jhoLtrCiVen4fcJ3p7zOh"
secret = "OeeQY05O9OEfjuOP2KEtVpbP77p8WKaClPqgOEdSAVdH/FazfG51bqSc97t16uYOsvjb5DzrbqB11cfuMfBXPtwDB2BQqg7otSZAHo61OkobqBGPWJHGOHE/lt+X4WPNhyDiDu06EMiC6t+lvcIrG50t4/alJf7qhfL/dkg8sfOJgC66SDA="
acc_no = "00000000-01"

broker = mojito.KoreaInvestment(api_key=key, api_secret=secret, acc_no=acc_no)
symbols = broker.fetch_kosdaq_symbols()

client = MongoClient(
    'mongodb+srv://ChickenStock:1234@jiseop.g8czkiu.mongodb.net/')
db = client['chicken_stock']

collection = db['business_name_list']

def find_category(key):
    document = collection.find_one({key: {"$exists": True}})
    if document:
        value = document["삼성전자"]
    else:
        value = '미분류'
    return value

class myObject:
    def __init__(self):
        self.data = {}

    def __str__(self):
        return str(self.data)

    def to_dict(self):
        return self.data


my_object = myObject()

for i in range(len(symbols)):
    key = symbols['한글명'][i]
    value = {
        '단축코드': symbols['단축코드'][i],
        '시가총액': symbols['시가총액'][i],
        '업종분류': find_category(symbols['한글명'][i]),
    }
    my_object.data[key] = value

print(my_object.data)