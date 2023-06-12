import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

const SlideComponent = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [newsTitle, setNewsTitle] = useState('');
  const [newsDetail, setNewsDetail] = useState('');
  const [newsLink, setNewsLink] = useState('');


  const colors = ['red', 'blue', 'green'];

  const loadLocation = () => {
    fetch('http://10.0.2.2:5000/news')
    .then(response =>  {
      return response.json()
    })
    .then(data => {
      const jsonData = JSON.parse(data)
      setNewsTitle(jsonData['title']);
      setNewsDetail(jsonData['detail']);
      setNewsLink(jsonData['link']);
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

  const handleNewsLinkPress = () => {
    Linking.openURL(newsLink[currentPage]);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.page]}>
        <TouchableHighlight onPress={handleNewsLinkPress}>
          <View>
            <Text style={styles.newsTitle}>{newsTitle[currentPage]}</Text>
            <Text> </Text>
            <Text style={styles.newsDetail}>{newsDetail[currentPage]}</Text>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E8F6EF'
  },
  newsTitle: {
    color: 'black',
    fontSize: 20,
    fontWeight: '700',
  },
  newsDetail: {
    fontSize: 13,
    fontWeight: '500',
  },
  page: {
    width: '100%',
    height: '80%',
  },
  currentPageText: {
    marginTop: 20,
  },
});

export default SlideComponent;
