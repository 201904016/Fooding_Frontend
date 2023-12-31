import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Image,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainPageStackParamList} from '../components/MainStack';

const ReviewData = [
  {
    myImg: require('../assets/defaultProfile.png'),
    userName: '김영훈',
    rating: 4.5,
    userReview: 'wow',
    restName: '땀땀',
    foodImg: require('../assets/RestImage.png'),
  },
  {
    myImg: require('../assets/defaultProfile.png'),
    userName: '김민기',
    rating: 5.0,
    userReview: 'Good',
    restName: '낙원식당',
    foodImg: require('../assets/RestImage.png'),
  },
];

const ReviewImageData = [
  {
    reviewImg: require('../assets/RestImage.png'),
  },
  {
    reviewImg: require('../assets/food10.png'),
  },
  {
    reviewImg: require('../assets/food2.png'),
  },
  {
    reviewImg: require('../assets/food2.png'),
  },
  {
    reviewImg: require('../assets/food2.png'),
  },
  {
    reviewImg: require('../assets/food2.png'),
  },
];

type MainPageScreenProps = NativeStackScreenProps<
  MainPageStackParamList,
  'WriteReviewSearchPage'
>;

function WriteReviewPage({navigation}: MainPageScreenProps) {
  const toWriteReviewSearchPage = () => {
    navigation.navigate('WriteReviewSearchPage');
  };

  return (
    <>
      {/* 상단바 */}
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>후기 작성</Text>
        </View>
        <TouchableOpacity style={styles.emptyButton}></TouchableOpacity>
      </View>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.searchContainer}>
            <TouchableOpacity onPress={toWriteReviewSearchPage}>
              <Text style={styles.searchInput}>
                어떤 식당에 후기를 작성할건가요?
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.searchButton}>
              <Ionicons name="search-outline" size={30} color="#B6BE6A" />
            </TouchableOpacity>
          </View>
          <View style={styles.headerFixInfo}>
            <Text style={styles.headerFixText}>최근 내가 남긴 후기</Text>
            <Ionicons name="chatbox-outline" size={50} color={'black'} />
          </View>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}>
          {ReviewData.map((Review, index) => (
            <Pressable key={index}>
              <ReviewItem
                key={index}
                myImg={Review.myImg}
                userName={Review.userName}
                rating={Review.rating}
                userReview={Review.userReview}
                restName={Review.restName}
                foodImg={Review.foodImg}
              />
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </>
  );
}

const ReviewItem = ({
  myImg,
  userName,
  rating,
  userReview,
  restName,
  foodImg,
}: {
  myImg: any;
  userName: string;
  rating: number;
  userReview: string;
  restName: string;
  foodImg: any;
}) => {
  return (
    <View style={styles.contentContainer}>
      <View style={{flexDirection: 'column'}}>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 20,
            marginBottom: 5,
          }}>
          <View style={styles.imageFrame}>
            <Image source={myImg} style={styles.image} />
          </View>
          <View
            style={{
              marginLeft: 20,
              paddingVertical: 12,
              alignItems: 'flex-start',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text style={{fontSize: 20, color: 'black', fontWeight: 'bold'}}>
                {userName} ({restName})
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={{color: 'black'}}>평점 : {rating.toFixed(1)}</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 30,
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}>
          <Ionicons
            name="return-down-forward-outline"
            size={30}
            color="black"
          />
          <Text
            style={{
              color: 'black',
              fontWeight: 'bold',
              fontSize: 20,
              marginLeft: 10,
            }}>
            {userReview}
          </Text>
        </View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{marginLeft: 20}}>
          {ReviewImageData.map((ReviewImage, index) => (
            <ReviewImages key={index} reviewImg={ReviewImage.reviewImg} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const ReviewImages = ({reviewImg}: {reviewImg: any}) => {
  return (
    <View
      style={{
        marginRight: 10,
        marginTop: 15,
      }}>
      <Image source={reviewImg} style={styles.reviewImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  topBar: {
    backgroundColor: 'white',
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: 'lightgray',
  },
  headerTitleContainer: {
    flex: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 'auto', // 중앙 정렬을 위해 marginLeft을 auto로 지정
    color: 'black',
  },
  backButton: {
    flex: 1,
  },
  emptyButton: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 16,
  },
  headerContainer: {
    height: 120,
  },
  headerFixInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 35,
  },
  headerFixText: {fontSize: 20, fontWeight: 'bold', color: 'black'},
  searchContainer: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    marginBottom: 16,
    marginHorizontal: 20,
    borderWidth: 2,
    borderRadius: 50,
    borderColor: '#B6BE6A',
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: 'bold',
    paddingVertical: 8,
    color: '#B6BE6A',
    marginLeft: 5,
  },
  searchButton: {
    backgroundColor: 'white',
    padding: 0,
    borderRadius: 5,
  },
  scrollView: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  imageFrame: {
    width: 70,
    height: 70,
    padding: 5,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 55,
    height: 55,
    borderRadius: 30,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginHorizontal: 10,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: 'lightgray',
  },
  reviewImage: {
    width: 80,
    height: 70,
    borderRadius: 10,
  },
});

export default WriteReviewPage;
