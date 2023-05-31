import mojito
from flask import Flask, jsonify, request

app = Flask(__name__)

key = "PSVT5oQXN4N39r3jhoLtrCiVen4fcJ3p7zOh"
secret = "OeeQY05O9OEfjuOP2KEtVpbP77p8WKaClPqgOEdSAVdH/FazfG51bqSc97t16uYOsvjb5DzrbqB11cfuMfBXPtwDB2BQqg7otSZAHo61OkobqBGPWJHGOHE/lt+X4WPNhyDiDu06EMiC6t+lvcIrG50t4/alJf7qhfL/dkg8sfOJgC66SDA="
acc_no = "00000000-01"

broker = mojito.KoreaInvestment(api_key=key, api_secret=secret, acc_no=acc_no)
symbols = broker.fetch_symbols()        # 코스피

samsung = symbols[symbols['한글명'] == '한화']
print(samsung)
samsung_code = samsung['단축코드'].values[0]
print(samsung_code)
samsung_price = broker.fetch_price('005930')
print(samsung_price)
ap = samsung_price['output']['bstp_kor_isnm']
print(ap)

# print(symbols)
# print(dir(symbols))

# print(symbols.bstp_kor_isnm)
# print(symbols['한글명'])

class myObject:
    def __init__(self):
        self.data = {}

    def __str__(self):
        return str(self.data)


# my_object = myObject()

# for i in range(len(symbols)):
#     key = symbols['한글명'][i]
#     value = {
#         '단축코드': symbols['단축코드'][i],
#         '시가총액': symbols['시가총액'][i],
#     }
#     my_object.data[key] = value

# print(my_object.data['헝셩그룹']['단축코드'])
# print(my_object)