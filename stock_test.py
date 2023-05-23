import mojito
import pprint

key = "PSVT5oQXN4N39r3jhoLtrCiVen4fcJ3p7zOh"
secret = "OeeQY05O9OEfjuOP2KEtVpbP77p8WKaClPqgOEdSAVdH/FazfG51bqSc97t16uYOsvjb5DzrbqB11cfuMfBXPtwDB2BQqg7otSZAHo61OkobqBGPWJHGOHE/lt+X4WPNhyDiDu06EMiC6t+lvcIrG50t4/alJf7qhfL/dkg8sfOJgC66SDA="
acc_no = "00000000-01"

broker = mojito.KoreaInvestment(api_key=key, api_secret=secret, acc_no=acc_no)
# print(dir(broker))
resp = broker.fetch_price("005930")
# pprint.pprint(resp)
print("시가   :  ", resp['output']['stck_oprc'])    # 시가
print("현재가 :  ", resp['output']['stck_prpr'])    # 시가
print("최고가 : ", resp['output']['stck_hgpr'])     # 고가
print("최저가 : ", resp['output']['stck_lwpr'])     # 저가
print("종가   : ", resp['output']['stck_prpr'])     # 종가

symbols = broker.fetch_kosdaq_symbols()        # 코스닥
# print(dir(symbols))
myArr = []
# 객체나 배열을 이용해 단축코드와 한글명만 뽑아서 하나의 데이터 객체를 구성할 수 있을 것으로 예상 됨
# for num in symbols:
  # num
print(symbols['단축코드'])
print(symbols['한글명'])
# symbols.head()