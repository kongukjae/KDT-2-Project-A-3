import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const colors = ['red', 'blue', 'green']; // 페이지 색상 배열

const SlideComponent = () => {
  const [currentPage, setCurrentPage] = useState(0);

  // function newsData(data) {
  //   // 데이터 가공 및 활용 예시
  //   const processedData = data.map(item => {
  //     return {
  //       title: item.title,
  //       detail: item.detail,
  //       link: item.link
  //     };
  //   });

  //   console.log(processedData);
  // }

  const loadLocation = () => {
    fetch('http://10.0.2.2:5000/news')
    .then(response =>  {
      return response.json()
    })
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.log(error)
    })
  }

  useEffect(() => {
    loadLocation();
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPage((prevPage) => (prevPage + 1) % colors.length); //? 현재 페이지를 다음페이지로 업데이트 -> 0일 때 1, 1일 때 2, 2일 때 0 순
    }, 3000);

    return () => clearInterval(timer); //? 타이머 초기화
  }, []);

  useEffect(() => {
    if (currentPage === colors.length - 1) {
      const resetTimer = setTimeout(() => {
        setCurrentPage(0);
      }, 3000); //? 만약 현재 페이지가 2일 경우 현재 페이지를 0으로 하고 타이머 초기화

      return () => clearTimeout(resetTimer);
    }
  }, [currentPage]);

  return (
    <View style={styles.container}>
      <View style={[styles.page, { backgroundColor: colors[currentPage] }]}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  page: {
    width: '80%',
    height: '80%',
  },
  currentPageText: {
    marginTop: 20,
  },
});

export default SlideComponent;
