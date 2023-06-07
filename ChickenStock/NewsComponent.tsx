import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const colors = ['red', 'blue', 'green']; // 페이지 색상 배열

const SlideComponent = () => {
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPage((prevPage) => (prevPage + 1) % colors.length); // 현재 페이지를 다음 페이지로 업데이트
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (currentPage === colors.length - 1) {
      const resetTimer = setTimeout(() => {
        setCurrentPage(0);
      }, 3000);

      return () => clearTimeout(resetTimer);
    }
  }, [currentPage]);

  return (
    <View style={styles.container}>
      <View style={[styles.page, { backgroundColor: colors[currentPage] }]} />
      <Text style={styles.currentPageText}>Current Page: {currentPage}</Text>
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
