import mojito

def Search_data(name):
    print('내부 함수 회사명', name)
    API_key = "PSVT5oQXN4N39r3jhoLtrCiVen4fcJ3p7zOh"
    API_secret = "OeeQY05O9OEfjuOP2KEtVpbP77p8WKaClPqgOEdSAVdH/FazfG51bqSc97t16uYOsvjb5DzrbqB11cfuMfBXPtwDB2BQqg7otSZAHo61OkobqBGPWJHGOHE/lt+X4WPNhyDiDu06EMiC6t+lvcIrG50t4/alJf7qhfL/dkg8sfOJgC66SDA="
    acc_no = "00000000-01"

    # 객체 생성
    class companyData:
        def __init__(self):
            self.data = {}
    
        def __str__(self):
            return str(self.data)
    
        def to_dict(self):
            return self.data

    broker = mojito.KoreaInvestment(api_key=API_key, api_secret=API_secret, acc_no=acc_no)
    symbols = broker.fetch_kospi_symbols()
    company = symbols[symbols['한글명'] == name]
    print('company 값 ', company)
    if company.empty:
        print('검색 결과 없음')
        return '검색 결과 없음'
    else:
        company_code = company['단축코드']
        print('company_code 값: ', company_code)
        print('company_code 값 인덱스 제거: ', company_code)
    
    result = broker.fetch_price(company_code)
    print('result 값: ', result)

    key = name
    resultObject = companyData()
    resultObject.data[key] = result['output']['stck_shrn_iscd']
    print('반환 할 객체: ', resultObject)

    return resultObject