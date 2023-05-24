# import mojito
# import pprint

# key = "PSVT5oQXN4N39r3jhoLtrCiVen4fcJ3p7zOh"
# secret = "OeeQY05O9OEfjuOP2KEtVpbP77p8WKaClPqgOEdSAVdH/FazfG51bqSc97t16uYOsvjb5DzrbqB11cfuMfBXPtwDB2BQqg7otSZAHo61OkobqBGPWJHGOHE/lt+X4WPNhyDiDu06EMiC6t+lvcIrG50t4/alJf7qhfL/dkg8sfOJgC66SDA="
# acc_no = "12345678-01123123"

# broker = mojito.KoreaInvestment(api_key=key, api_secret=secret, acc_no=acc_no)
# resp = broker.fetch_price("005930")
# pprint.pprint(resp)

import mojito

key = "PSVT5oQXN4N39r3jhoLtrCiVen4fcJ3p7zOh"
secret = "OeeQY05O9OEfjuOP2KEtVpbP77p8WKaClPqgOEdSAVdH/FazfG51bqSc97t16uYOsvjb5DzrbqB11cfuMfBXPtwDB2BQqg7otSZAHo61OkobqBGPWJHGOHE/lt+X4WPNhyDiDu06EMiC6t+lvcIrG50t4/alJf7qhfL/dkg8sfOJgC66SDA="
ACC_NO = "12345678-01"    # 8자리-2자리

broker = mojito.KoreaInvestment(
    api_key = key,
    api_secret = secret,
    acc_no = ACC_NO
)

symbols = broker.fetch_symbols()
symbols
