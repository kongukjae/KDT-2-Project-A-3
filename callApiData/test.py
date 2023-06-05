import requests
import mojito

def get_current_price(symbol):
    url = "https://openapivts.koreainvestment.com:29443/uapi/domestic-stock/v1/quotations/inquire-price"  # 실제 API 호출 URL로 대체해야 합니다.
    params = {
        "symbol": symbol,
        "type": "current_price"
    }
    response = requests.get(url, params=params)
    data = response.json()
    current_price = data["current_price"]
    return current_price

# 종목 코드를 가져온다고 가정합니다.
symbol = "종목 코드"

# 종목과 해당 종목의 현재가를 동시에 조회합니다.
current_price = get_current_price(symbol)
print("종목:", symbol)
print("현재가:", current_price)
