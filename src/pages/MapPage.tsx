import Geolocation from '@react-native-community/geolocation';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  StyleSheet,
} from 'react-native';
import NaverMapView, {
  Circle,
  Marker,
  Path,
  Polyline,
  Polygon,
} from 'react-native-nmap';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {retrieveToken} from '../store/storage';
import axios from 'axios';
import {MainPageStackParamList} from '../components/MainStack';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type MainPageScreenProps = NativeStackScreenProps<
  MainPageStackParamList,
  'RestPage'
>;

function MapPage({navigation}: MainPageScreenProps) {
  const [searchStoreList, setSearchStoreList] = useState<
    Array<SearchStoreData>
  >([]);
  const [selectedMarker, setSelectedMarker] = useState(0);
  const toRestPage = (storeid: number) => {
    navigation.navigate('RestPage', {storeid: storeid});
  };

  interface SearchStoreData {
    name: string;
    rating: number;
    address: string;
    closeHour: string;
    latitude: number;
    longitude: number;
    storeid: number;
    imgUrl: string;
    storeRate: number;
    reviewCount: number;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await retrieveToken();
        const response = await axios.get(
          'http://kymokim.iptime.org:11080/api/store/get',
          {
            headers: {
              'x-auth-token': token,
            },
          },
        );
        const data = response.data.data;
        if (data && Array.isArray(data)) {
          setSearchStoreList(
            data.map(storeItem => ({
              name: storeItem.storeName,
              rating: storeItem.totalRate,
              address: storeItem.address,
              closeHour: storeItem.closeHour,
              latitude: parseFloat(storeItem.latitude),
              longitude: parseFloat(storeItem.longitude),
              storeid: storeItem.storeId,
              imgUrl: storeItem.imgUrl,
              storeRate: storeItem.storeRate,
              reviewCount: storeItem.reviewCount,
            })),
          );
          console.log(data);
        } else {
          console.error('식당에 대한 데이터가 올바르게 반환되지 않았습니다.');
        }
      } catch (error) {
        console.error('식당 조회 실패', error);
      }
    };
    fetchData();
  }, []);

  const mark = searchStoreList.map(store => ({
    storeid: store.storeid,
    latitude: store.latitude,
    longitude: store.longitude,
  }));

  const markInfo = searchStoreList.map(store => ({
    storeid: store.storeid,
    name: store.name,
    storeRate: store.storeRate,
    reviewCount: store.reviewCount,
    address: store.address,
    closingTime: store.closeHour,
    imgUrl: store.imgUrl,
  }));

  const [currentLocation, setCurrentLocation] = useState({
    latitude: 37.27566,
    longitude: 127.13245,
  }); // 초기 값으로 P0를 설정합니다.

  // 사용자의 현재 위치를 가져오는 함수
  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setCurrentLocation({latitude, longitude});
        console.log('업데이트');
      },
      error => {
        console.error('Error getting current location: ', error);
      },
    );
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={{flex: 1}}>
      <NaverMapView
        style={{flex: 1}}
        showsMyLocationButton={false}
        center={{
          zoom: 13,
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
        }} // 중심 위치를 현재 위치로 설정합니다.
      >
        {/* 현재 위치 마커 추가 */}

        {mark.map((point, index) => {
          return (
            <Marker
              key={point.storeid}
              coordinate={{
                latitude: point.latitude,
                longitude: point.longitude,
              }}
              pinColor="blue"
              onClick={() => {
                // 클릭한 마커의 정보를 선택된 마커로 설정
                setSelectedMarker(point.storeid);
                console.log(point.storeid);
              }}
            />
          );
        })}

        <Marker
          pinColor="green"
          coordinate={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
          }}
        />
      </NaverMapView>

      {markInfo.map((restaurant, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => toRestPage(restaurant.storeid)}
          style={{
            position: 'absolute',
            bottom: 10,
            left: screenWidth * 0.02,
            width: screenWidth * 0.96,
            height: 'auto',
            backgroundColor: 'white',
            borderWidth: 2,
            borderColor: '#B6BE6A',
            borderRadius: 10,
            display: selectedMarker === restaurant.storeid ? 'flex' : 'none', // 선택된 마커에만 표시
          }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',

              borderBottomWidth: 1,
              borderColor: 'lightgray',
              height: 150,
            }}>
            <View style={{marginHorizontal: 10}}>
              <Image source={{uri: restaurant.imgUrl}} style={styles.image} />
            </View>
            <View style={{flex: 1, flexDirection: 'column'}}>
              <View>
                <Text
                  style={{fontSize: 20, color: 'black', fontWeight: 'bold'}}>
                  {restaurant.name}
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Ionicons name="star" size={15} color="yellow" />
                <Text>
                  {' '}
                  {restaurant.storeRate.toFixed(1)} ({restaurant.reviewCount}){' '}
                </Text>
              </View>
              <View>
                <Text
                  style={{color: 'black', fontWeight: 'bold', fontSize: 12}}>
                  {restaurant.address}
                </Text>
              </View>
              <View
                style={{
                  alignItems: 'flex-end',
                  marginTop: 10,
                  marginRight: 10,
                }}>
                <Text
                  style={{
                    color: 'black',
                    fontWeight: 'bold',
                    fontSize: 12,
                  }}>
                  영업 종료 : {restaurant.closingTime}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    alignItems: 'center',
    width: 120,
    height: 120,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'black',
  },
  Scrollstar: {
    color: 'gray',
  },
});

export default MapPage;
