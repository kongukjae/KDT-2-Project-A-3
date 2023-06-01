from pykrx import stock
import matplotlib.pyplot as plt

df = stock.get_market_ohlcv_by_date("20200101", "20200202", "005930")
print(df)


# 그래프 그리기
plt.figure(figsize=(14,7)) # 그래프의 크기 설정
plt.plot(df.index, df['시가'], label='시가')
plt.plot(df.index, df['고가'], label='고가')
plt.plot(df.index, df['저가'], label='저가')
plt.plot(df.index, df['종가'], label='종가')

plt.title('삼성전자 가격 추이') # 그래프의 제목 설정
plt.xlabel('날짜') # x축 레이블 설정
plt.ylabel('가격') # y축 레이블 설정
plt.legend() # 범례 표시
plt.show() # 그래프 출력


