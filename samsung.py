
from pykrx import stock
data0=stock.get_market_ohlcv_by_date("20200101","20211107","005930")
data1=stock.get_market_fundamental_by_date("20200101","20211107","005930")

import matplotlib.pyplot as plt

plt.subplot(211)
plt.plot(data0.index,data0['종가'],color='green',label='삼전주가')
plt.ylabel("Close Value")
plt.legend()


plt.subplot(212)
plt.plot(data1.index,data1['PER'],color='brown',label='삼전PER')
plt.ylabel("PER")
plt.legend()

plt.show()
