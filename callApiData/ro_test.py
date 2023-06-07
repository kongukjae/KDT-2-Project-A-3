import mojito
import time
import pprint
import json
from flask import Flask, jsonify, request

app = Flask(__name__)

key = "PSVT5oQXN4N39r3jhoLtrCiVen4fcJ3p7zOh"
secret = "OeeQY05O9OEfjuOP2KEtVpbP77p8WKaClPqgOEdSAVdH/FazfG51bqSc97t16uYOsvjb5DzrbqB11cfuMfBXPtwDB2BQqg7otSZAHo61OkobqBGPWJHGOHE/lt+X4WPNhyDiDu06EMiC6t+lvcIrG50t4/alJf7qhfL/dkg8sfOJgC66SDA="
acc_no = "00000000-01"

broker = mojito.KoreaInvestment(api_key=key, api_secret=secret, acc_no=acc_no)
symbols = broker.fetch_kospi_symbols()        # 코스피

# samsung = symbols[symbols['한글명'] == '삼성전자']
# print(samsung)
# samsung_code = samsung['단축코드'].values[0]
# print(samsung_code)
# print(type(samsung_code))
# print(samsung_code is None)
# samsung_price = broker.fetch_price(samsung_code)['output']['bstp_kor_isnm']
# print(samsung_price)
# ap = samsung_price['output']['bstp_kor_isnm']
# print(ap)

# print(symbols['한글명'][1640], symbols['단축코드'][1640])
# print(broker.fetch_price('005930'))
# print(broker.fetch_price('005930')['output'])
# print(broker.fetch_price('005930')['output']['stck_prpr'])
# print(symbols['단축코드'][1640])
# print(dir(symbols))

# print(symbols.bstp_kor_isnm)
# print(symbols['한글명'])

# class myObject:
#     def __init__(self):
#         self.data = {}

#     def __str__(self):
#         return str(self.data)

#     def to_dict(self):
#         return self.data


# my_object = myObject()

# for i in range(len(symbols)):
#     if 'bstp_kor_isnm' in broker.fetch_price(symbols['단축코드'][i])['output']:
#         key = symbols['한글명'][i]
#         value = broker.fetch_price(symbols['단축코드'][i])['output']['bstp_kor_isnm']
#     else:
#         key = symbols['한글명'][i]
#         value = '미분류',
#     my_object.data[key] = value
#     time.sleep(0.2)

# class MyEncoder(json.JSONEncoder):
#     def default(self, obj):
#         if isinstance(obj, myObject):
#             return obj.to_dict()  # to_dict() 메서드를 사용하여 객체를 사전형으로 변환
#         return super().default(obj)

# for i in range(len(symbols)):
#     if 'bstp_kor_isnm' in broker.fetch_price(symbols['단축코드'][i])['output']:
#         key = symbols['한글명'][i]
#         value = {
#             '단축코드': symbols['단축코드'][i],
#             '시가총액': symbols['시가총액'][i],
#             '업종분류': broker.fetch_price(symbols['단축코드'][i])['output']['bstp_kor_isnm'],
#             '현재가': broker.fetch_price(symbols['단축코드'][i])['output']['stck_prpr'],
#         }
#     else:
#         key = symbols['한글명'][i]
#         value = {
#             '단축코드': symbols['단축코드'][i],
#             '시가총액': symbols['시가총액'][i],
#             '업종분류': '미분류',
#             '현재가': broker.fetch_price(symbols['단축코드'][i])['output']['stck_prpr'],
#         }
#     my_object.data[key] = value
#     time.sleep(0.2)

# print(my_object)

# with open('data.json', 'w') as json_file:
#     json.dump(my_object, json_file)

# print(my_object.data['헝셩그룹']['단축코드'])
# print(my_object.data['삼성전자']['단축코드'])
# print(list(my_object.data.keys())[0])
# print(broker.fetch_price('002200')['output']['bstp_kor_isnm'])

# company = my_object.data
# print(len(company))

# class myObject2:
#     def __init__(self):
#         self.data = []

#     def __str__(self):
#         return str(self.data)

# my_object2 = myObject2()

# for i in range(len(my_object.data)):
#     classArray = []
#     name = list(my_object.data.keys())[i]
#     company_code = my_object.data[name]['단축코드']
#     value = company_code
#     value = broker.fetch_price(company_code)['output']['bstp_kor_isnm']
#     classArray.append(value)
#     print(classArray)

# print(my_object2.data)

# class classification:
#     def __init__(self):
#         self.data = []

# for i in range(len(symbols)):
#     broker.fetch_price(my_object.data)

class myObject:
    def __init__(self):
        self.data = {}

    def __str__(self):
        return str(self.data)

    def to_dict(self):
        return self.data


my_object = myObject()

for i in range(len(symbols)):
    if 'bstp_kor_isnm' in broker.fetch_price(symbols['단축코드'][i])['output']:
        key = symbols['한글명'][i]
        value = broker.fetch_price(symbols['단축코드'][i])['output']['bstp_kor_isnm']
        print(key)
        print(value)
    else:
        key = symbols['한글명'][i]
        value = '미분류',
    if value == '철강.금속':
        my_object.data[key] = value
    time.sleep(1)

class MyEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, myObject):
            return obj.to_dict()  # to_dict() 메서드를 사용하여 객체를 사전형으로 변환
        return super().default(obj)

# JSON 파일로 저장할 때 한글 직접 표현
with open('steel_data.json', 'w', encoding='utf-8') as json_file:
    json.dump(my_object, json_file, cls=MyEncoder, ensure_ascii=False)


# # JSON 파일 읽기
# with open('data.json', 'r', encoding='utf-8') as json_file:
#     data = json.load(json_file)

# # key 값을 이용하여 value 값 읽어오기
# # key = '삼성전자'
# # value = data.get(key)

# # print(f"{key}: {value}")
# # print(value)

# # 중복 제거할 값을 추출하여 집합에 저장
# unique_values = set()
# for value in data.values():
#     if isinstance(value, list):
#         unique_values.update(value)
#     else:
#         unique_values.add(value)

# # 중복 제거된 값을 리스트로 변환
# unique_values_list = list(unique_values)

# # JSON 파일로 출력
# with open('category.json', 'w', encoding='utf-8') as json_file:
#     json.dump(unique_values_list, json_file, ensure_ascii=False)