import React, {useState, useEffect, useContext} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  Linking,
} from 'react-native';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import TopMenuPage from './TopMenuPage';
import {AuthContext} from './AllContext';
const MyPage = () => {
  // const { userCategoryCurrent } = useContext(AuthContext);
  const [data, setData] = useState<any>({}); // data useState를 사용하여 상태 설정
  const [userCategory, setUserCategory] = useState<string | null>(null);
  const [selectedButtonIndex, setSelectedButtonIndex] = useState<string | null>(
    userCategory,
  );
  const [myStock,setMyStock] = useState<any>([])
  const [stockSum,setStockSum] = useState<any>([])
  const [nowPrice,setNowPrice] = useState<number>()
  // let stockData = myStock[0]
  // console.log('stock',stockData)
  // let stockData1 = myStock[0]["companyName"]
  // console.log('stock1',stockData1)
  // console.log('myStock',myStock)
  let result
  stockSumLojic()
  console.log('result',result)
  // console.log({stockSum})

  function stockSumLojic() {
    const groupedData = myStock.reduce((acc, stock) => {
      const { companyName, quantity, totalPrice } = stock;
      if (!acc[companyName]) {
        acc[companyName] = { companyName, quantity, totalPrice };
      } else {
        acc[companyName].quantity += quantity;
        acc[companyName].totalPrice += totalPrice;
      }
      return acc;
    }, {});
    
    result = Object.values(groupedData);
    // setStockSum(result)
  }
  let stockName=[] //서버로 보낼 주식 목록 (현재가 받아오기 위)
  let nowprice=[] // 주식 샀을 때 전체가격 / 양
  let nowprice2=[]
  function processArray(dataArray) {
    const processedArray = [];
    const getNowprice= async ()=>{
      for (let i = 0; i < dataArray.length; i++) {
        const companyOnlyName = dataArray[i].companyName;
        stockName.push(companyOnlyName)
      }
      // console.log('stockName',stockName)
      try{
        const response = await fetch('http://10.0.2.2:5000/api/nowprice',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(stockName), // 플라스크로 데이터를 담아 요청을 보냄
        })
        if(response.ok){
          const jsonData= await response.json();
          // await nowprice2.push(jsonData)
           setNowPrice(jsonData)
          await console.log('nowPrice',nowPrice)
        }
        else {
          throw new Error('현재가 받아오는 과정에서 오류')
        }
      } catch (error){
        console.error(error);
      }
    };
    getNowprice()

    // console.log('getnowprice',nowprice2)
  
    for (let i = 0; i < dataArray.length; i++) {
      const companyName = dataArray[i].companyName;
      const quantity = dataArray[i].quantity.toString();
      const totalPrice = dataArray[i].totalPrice.toString();
      let getnowprice = dataArray[i].totalPrice/dataArray[i].quantity
      nowprice.push(getnowprice)
      let a = ""
      // if (nowprice[i]>nowprice2[0][i]["현재가"]){
      //     console.log('b')
      // }
      

      processedArray.push([companyName,'현재가','등락',quantity, totalPrice]);
    }

  
    return processedArray;
  }

  function name_change(name:string) {
    if(name === '건설') {
      return '건설업'
    } else if(name === '금융') {
      return '금융업'
    } else if(name === '기계') {
      return '기계'
    } else if(name === '서비스업') {
      return '서비스업'
    } else if(name === '섬유/의복') {
      return '섬유·의복'
    } else if(name === '음식료품') {
      return '음식료품'
    } else if(name === '의약품') {
      return '의약품'
    } else if(name === '전기/전자') {
      return '전기·전자'
    } else if(name === '철강/금속') {
      return '철강·금속'
    } else if(name === '통신업') {
      return '통신'
    } else if(name === '화학') {
      return '화학'
    } else {
      return '미분류';
    }
  }
  // 데이터 가져오는 함수
  // flask서버로 데이터 요청
  const fetchData = async () => {
    console.log('요청보냄');
    try {
      const response = await fetch('http://10.0.2.2:5000/account');
      if (response.ok) {
        const jsonData = await response.json();
        setData(jsonData);
        console.log('서버 연결 완료');
        console.log('응답 받은 data: ', jsonData);
        console.log('DB 카테고리: ', jsonData['choiceTwo']);
        setUserCategory(jsonData['choiceTwo']);
        setSelectedButtonIndex(jsonData['choiceTwo']);
      } else {
        throw new Error('서버 응답이 실패하였습니다.');
      }
    } catch (error) {
      console.error(error);
    }
  };
  console.log("setData" + data)
  const fetchCategory = async () => {
    console.log('업종 요청 보냄');
    try {
      const categoryReq = await fetch('http://10.0.2.2:5000/categoryChange', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedButtonIndex),
      });
      // const categoryData = await categoryReq.json();
      // console.log('카테고리 응답: ', categoryData)
      // await fetchData();
    } catch (error) {
      console.error(error);
    }
  };
  // 업종 변경 시 DB에서 choiceTwo 항목 변경
  useEffect(() => {
    setUserCategory(selectedButtonIndex);
    fetchCategory();
  }, [selectedButtonIndex]);
  // useEffect(() => {
  //   setSelectedButtonIndex(userCategory)
  // }, [userCategory])
  // 업종 버튼 선택 시 항상 최신 값으로 갱신
  // useEffect(() => {
  //   selectedButtonRef.current = selectedButtonIndex;
  //   console.log('category_ref 값: ', selectedButtonRef.current);
  // }, [selectedButtonIndex]);
  const getMyStock= async ()=>{
    try{
      const response = await fetch('http://10.0.2.2:5000/api/getmystock')
      if(response.ok){
        const jsonData= await response.json();
        setMyStock(jsonData)
      }
      else {
        throw new Error('주식 정보 받아오는 과정에서 오류')
      }
    } catch (error){
      console.error(error);
    }
  };


  // useEffect를 사용하여 페이지가 렌더링 될 때마다 fetchData()함수를 실행
  useEffect(() => {
    fetchData();
    getMyStock();
  }, []);
  // 배열 안에 함수를 집어 넣음으로써 의존성 추가. 페이지가 렌더링 될 때 마다 fetchData와 getMyStock 함수 실행

  const interest = ['건설업', '금융업', '기계', '서비스업', '섬유·의복', '음식료품', '의약품', '전기·전자', '철강·금속', '통신', '화학', '미분류'];
  const enter = ['기업 명', '현재가', '등락', '보유 수량', '평가 금액'];
  const transaction = ['구매', '판매', '미체결'];
  const enterValue = [1, 2, 3, 4, 5];
  const transactionValue = [6, 7, 8, 9, 10];
  const test = [6, 7, 8, 9, 10];

  console.log('processArray',processArray(result))
  processArray(result)

  // let value1 = result[0][]
  return (
    <View style={styles.root}>
      <View>
        <TopMenuPage></TopMenuPage>
      </View>
      {Object.keys(data).length !== 0 && (
        <View style={styles.myMoneyCss}>
          <Text style={styles.myMoneyText}>나의 은행 : {data.bank}</Text>
          <Text style={styles.myMoneyText}>계좌 잔액 : {parseInt(data.account).toLocaleString()}</Text>
        </View>
      )}
      <View style={styles.myInterestCss}>
        <Text style={styles.myCategoryText}>본인 관심사</Text>
      </View>
      <View style={styles.circleContainerCss}>
        {interest.map((item, index) => (
          <TouchableOpacity
            style={[
              styles.circleButtonCss,
              selectedButtonIndex === item ? styles.selectedButtonCss : null,
            ]}
            onPress={() => {
              if (selectedButtonIndex === item) {
                // 이미 선택된 버튼을 다시 누르면 선택 해제
                setSelectedButtonIndex('미분류');
              } else {
                // 선택되지 않은 버튼을 누르면 선택
                setSelectedButtonIndex(item);
              }
            }}
            key={index}>
            <Text style={[selectedButtonIndex === item ? styles.selectedButtonTextCss : null]}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.enterCss}>
        {enter.map((item, index) => (
          <View style={styles.enterNameCss}>
            <Text style={styles.enterNameText} key={index}>
              {item}
            </Text>
          </View>
        ))}
      </View>
      {processArray(result).map((arr, arrIndex) => (
      <View style={styles.enterValueCss} key={arrIndex}>
        {processArray(result)[arrIndex].map((item, index) => (
          <View style={styles.enterInsertCss} key={index}>
           <Text>{item}</Text>
          </View>
         ))}
       </View>
      ))}
      
    {/* 여기서 구터 구매 판매 뷰 */}
      <View style={styles.transactionContainerCss}>
        {transaction.map((item, index) => (
          <TouchableOpacity style={styles.transactionCss}>
            <Text style={styles.transactionText} key={index}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.transactionValueCss}>
        {test.map((item, index) => (
          <View style={styles.transactionInsertCss}>
            <Text key={index}>{item}</Text>
          </View>
        ))}
      </View>
      <View style={styles.transactionValueCss}>
        {test.map((item, index) => (
          <View style={styles.transactionInsertCss}>
            <Text key={index}>{item}</Text>
          </View>
        ))}
      </View>
      <View style={styles.transactionValueCss}>
        {test.map((item, index) => (
          <View style={styles.transactionInsertCss}>
            <Text key={index}>{item}</Text>
          </View>
        ))}
      </View>
      <View style={styles.transactionValueCss}>
        {test.map((item, index) => (
          <View style={styles.transactionInsertCss}>
            <Text key={index}>{item}</Text>
          </View>
        ))}
      </View>
      <View style={styles.transactionValueCss}>
        {test.map((item, index) => (
          <View style={styles.transactionInsertCss}>
            <Text key={index}>{item}</Text>
          </View>
        ))}
      </View>
    </View>
  )
};
const styles = StyleSheet.create({
  root: {
    backgroundColor: '#FFE194',
    flex: 1,
  },
  myMoneyText: {
    fontFamily: 'BagelFatOne-Regular',
    fontSize: 18,
    color: '#E8F6EF',
  },
  myCategoryText: {
    fontFamily: 'BagelFatOne-Regular',
    fontSize: 24,
    color: '#E8F6EF',
    paddingBottom: 5,
  },
  myMoneyCss: {
    width: '100%',
    height: 50,
    backgroundColor: '#1B9C85',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    gap: 20,
    borderRadius: 15,
  },
  myInterestCss: {
    width: '100%',
    height: 50,
    marginTop: 20,
    backgroundColor: '#1B9C85',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  circleContainerCss: {
    width: '100%',
    heigt: 200,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  circleButtonCss: {
    flexDirection: 'row',
    backgroundColor: '#E8F6EF',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexBasis: '16%',
    borderColor: '#1B9C85',
    borderWidth: 2,
    marginBottom: 5,
  },
  selectedButtonCss: {
    backgroundColor: '#4C4C6D',
  },
  selectedButtonTextCss: {
    color: 'white',
  },
  enterCss: {
    width: '100%',
    height: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4C4C6D',
  },
  enterNameCss: {
    width: '20%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  enterNameText: {
    color: '#E8F6EF',
    fontWeight: '700',
  },
  enterValueCss: {
    width: '100%',
    height: 50,
    backgroundColor: '#E8F6EF',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  enterInsertCss: {
    width: '20%',
    height: 50,
    borderColor: '#E8F6EF',
    borderWidth: 1,
  },
  transactionContainerCss: {
    display: 'flex',
    flexDirection: 'row',
  },
  transactionCss: {
    width: 50,
    height: 30,
    backgroundColor: '#1B9C85',
    borderRadius: 30,
    margin: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  transactionText: {
    color: '#E8F6EF',
    fontWeight: '700',
  },
  transactionValueCss: {
    width: '100%',
    height: 40,
    backgroundColor: '#E8F6EF',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  transactionInsertCss: {
    width: '20%',
    height: 40,
  },
});
export default MyPage;