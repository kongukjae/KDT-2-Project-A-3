import mojito 
import pprint


key ="PSVT5oQXN4N39r3jhoLtrCiVen4fcJ3p7zOh"
secret = "OeeQY05O9OEfjuOP2KEtVpbP77p8WKaClPqgOEdSAVdH/FazfG51bqSc97t16uYOsvjb5DzrbqB11cfuMfBXPtwDB2BQqg7otSZAHo61OkobqBGPWJHGOHE/lt+X4WPNhyDiDu06EMiC6t+lvcIrG50t4/alJf7qhfL/dkg8sfOJgC66SDA="
acc_no ="12345678-01"

broker = mojito.KoreaInvestment(api_key=key, api_secret=secret, acc_no=acc_no)
# resp = broker.fetch_price("005930")
resp = broker.fetch_symbols()

pprint.pprint(resp['단축코드'])
# print(resp)
dir(broker)
print(resp)



# if 1639 in resp['output']:
#     korean_na`me=resp[]`