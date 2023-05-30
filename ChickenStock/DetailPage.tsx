import React from 'react';
import {Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

type RootStackParamList = {
  Detail: undefined;
  Another: undefined;
};
type DetailPageNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Detail'
>;

const DetailPage = () => {
  const navigation = useNavigation<DetailPageNavigationProp>();

  return (
    <Button
      title="메인 페이지 가기"
      onPress={() => navigation.navigate('Another')}
    />
  );
};

export default DetailPage;
