import mojito
import pprint
import json

# 값들을 세팅
key = "PSVT5oQXN4N39r3jhoLtrCiVen4fcJ3p7zOh"
secret = "OeeQY05O9OEfjuOP2KEtVpbP77p8WKaClPqgOEdSAVdH/FazfG51bqSc97t16uYOsvjb5DzrbqB11cfuMfBXPtwDB2BQqg7otSZAHo61OkobqBGPWJHGOHE/lt+X4WPNhyDiDu06EMiC6t+lvcIrG50t4/alJf7qhfL/dkg8sfOJgC66SDA="
acc_no = "12345678-01123123"

broker = mojito.KoreaInvestment(api_key=key, api_secret=secret, acc_no=acc_no)
resp = broker.fetch_price("005930")

# resp 값을 정렬시키기
sorted_data = json.dumps(resp, sort_keys=True, indent=2)

# 정렬된 데이터를 json 파일로 생성
with open("sorted_data.json", "w") as file:
    file.write(sorted_data)
    
pprint.pprint(sorted_data)
