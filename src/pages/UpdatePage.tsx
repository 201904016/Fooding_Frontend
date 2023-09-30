import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainPageStackParamList} from '../components/MainStack';
import Ionicons from 'react-native-vector-icons/Ionicons';

type MainPageScreenProps = NativeStackScreenProps<
  MainPageStackParamList,
  'ProfilePage'
>;

const UserProfileEdit = ({navigation}: MainPageScreenProps) => {
  const toProfilePage = () => {
    navigation.navigate('ProfilePage');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => toProfilePage()}>
          <Ionicons name="arrow-back-outline" size={25} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>회원 정보 수정</Text>
        <TouchableOpacity onPress={() => toProfilePage()}>
          <Ionicons name="checkmark-outline" size={30} color="green" />
        </TouchableOpacity>
      </View>
      <View style={styles.profileContainer}>
        <Image
          source={require('../assets/food1.png')} // 프로필 이미지 경로 설정
          style={styles.profileImage}
        />
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.editProfileButton}>사진 편집</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.inputRow}>
          <Text style={styles.inputLabel}>이름</Text>
          <TextInput placeholder="홍길동" style={styles.input} />
        </View>
        <View style={styles.inputRow}>
          <Text style={styles.inputLabel}>아이디</Text>
          <TextInput placeholder="qwerty@mail.com" style={styles.input} />
        </View>
        <View style={styles.inputRow}>
          <Text style={styles.inputLabel}>닉네임</Text>
          <TextInput placeholder="서천동칼잡이" style={styles.input} />
        </View>
        <View style={styles.inputRow}>
          <Text style={styles.inputLabel}>전화번호</Text>
          <TextInput placeholder="010-XXXX-XXXX" style={styles.input} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  headerText: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  closeButton: {
    fontSize: 24,
  },
  saveButton: {
    fontSize: 24,
    color: 'green',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 25,
    marginTop: 10,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  editProfileButton: {
    marginTop: 8,
    color: '#B6BE6A',
    fontWeight: 'bold',
  },
  inputContainer: {
    flex: 1,
    borderTopWidth: 1,
    borderColor: 'black',
    paddingTop: 30,
    // backgroundColor: 'red',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    // backgroundColor: 'red',
    width: 400,
  },
  inputLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginHorizontal: 10,
    textAlign: 'center',
    marginTop: 8,
    marginLeft: 25,
    // backgroundColor: 'blue',
  },
  input: {
    color: 'gray',
    flex: 3,
    borderBottomWidth: 1.5,
    borderColor: 'gray',
    fontSize: 18,
    marginRight: 50,
    // backgroundColor: 'red',
  },
});

export default UserProfileEdit;
