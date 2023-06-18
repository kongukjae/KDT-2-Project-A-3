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
    # name: 함수 파라미터로 받아오는 회사명
    # company: kospi 종목 목록을 추출하고 그 안에서 파라미터로 받은 회사명과 일치하는 종목의 정보를 가져옴
    company = symbols[symbols['한글명'] == name]
    print('company 값 ', company)
    if company.empty:
        # company의 값이 없을 경우, '검색 결과 없음' 이라는 string을 반환
        print('검색 결과 없음')
        return '검색 결과 없음'
    else:
        # company 값이 존재 할 경우 단축코드 정보만 company_code 라는 변수에 저장
        company_code = company['단축코드']
        print('company_code 값: ', company_code)
    # company_code에 저장된 단축코드를 이용해 해당 기업 정보를 result 변수에 담음
    result = broker.fetch_price(company_code)
    print('result 값: ', result)

    key = name
    resultObject = companyData()
    resultObject.data[key] = result['output']['stck_shrn_iscd'] # {기업명 : 단축코드} 형태로 객체에 데이터를 입력
    # result에서 한번 더 요청을 보내는 이유는 company_code 값이 list 형식으로 단축코드만 나오지 않고 index가 함께 나오기 때문, index값을 제외하고 code값만 사용 할 수 있다면, 요청 횟수를 줄일 수 있을 것
    print('반환 할 객체: ', resultObject)

    return resultObject