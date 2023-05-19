from flask import Flask, render_template
from bokeh.embed import components
from bokeh.plotting import figure
from pykrx import stock
import pandas as pd 
app = Flask(__name__)
@app.route('/')
def home():
    data0 = stock.get_market_ohlcv_by_date("20200101", "20211107", "005930")
    data1 = stock.get_market_fundamental_by_date("20200101", "20211107", "005930")

    # 인덱스를 datetime 형식으로 변환합니다
    data0.index = pd.to_datetime(data0.index)
    data1.index = pd.to_datetime(data1.index)

    p = figure(title="Stock and PER", x_axis_type="datetime")
    p.line(data0.index, data0['종가'], color='green', legend_label='삼전주가')
    p.line(data1.index, data1['PER'], color='brown', legend_label='삼전PER')

    script, div = components(p)

    return render_template("plot.html", script=script, div=div)

if __name__ == "__main__":
    app.run(debug=True)
  