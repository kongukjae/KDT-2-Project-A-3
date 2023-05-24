import mojito
import pprint

key = "PSVT5oQXN4N39r3jhoLtrCiVen4fcJ3p7zOh"
secret = "OeeQY05O9OEfjuOP2KEtVpbP77p8WKaClPqgOEdSAVdH/FazfG51bqSc97t16uYOsvjb5DzrbqB11cfuMfBXPtwDB2BQqg7otSZAHo61OkobqBGPWJHGOHE/lt+X4WPNhyDiDu06EMiC6t+lvcIrG50t4/alJf7qhfL/dkg8sfOJgC66SDA="
acc_no = "00000000-01"

broker = mojito.KoreaInvestment(api_key=key, api_secret=secret, acc_no=acc_no) #! 접속하는 것을 변수로 담음
# print(dir(broker))
# resp = broker.fetch_price("005930") #? 종목코드를 이용해서 데이터를 불러오기
# pprint.pprint(resp)
# print("시가   :  ", resp['output']['stck_oprc'])    # 시가
# print("현재가 :  ", resp['output']['stck_prpr'])    # 시가
# print("최고가 : ", resp['output']['stck_hgpr'])     # 고가
# print("최저가 : ", resp['output']['stck_lwpr'])     # 저가
# print("종가   : ", resp['output']['stck_prpr'])     # 종가

# print("현재가: " , resp['output']['dmsp_val'])

symbols = broker.fetch_kospi_symbols()        # 코스닥
pprint.pprint(symbols)

class myObject:
    def __init__(self):
        self.data = {}

    def __str__(self):
        return str(self.data)

my_object = myObject()

for i in range(len(symbols)):
    key = symbols['한글명'][i]
    value = {
        '단축코드': symbols['단축코드'][i],
        '시가총액': symbols['시가총액'][i],
    }
    my_object.data[key] = value

# print(my_object)
# print(my_object.data['헝셩그룹']['단축코드'])