import React, {useState} from 'react';
import {
  Alert,
  Image,
  Modal,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import Images from '../../constants/Images';
import styles from './styles';

const Home = () => {
  const [gender, setGender] = useState(0);
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState(0);
  const [bmiCalculated, setBmiCalculated] = useState(false);
  const [showInstruction, setShowInstruction] = useState(false);

  const calculateBMI = () => {
    if (!height || !weight) {
      Alert.alert('BMI Calculator', 'All fields are mandatory.', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
      return;
    }

    const heightMeter = height / 100;
    const data = weight / (heightMeter * heightMeter);
    setBmi(data.toFixed(1));
    setBmiCalculated(true);
  };

  const convertAgain = () => {
    setHeight('');
    setWeight('');
    setBmi(0);
    setBmiCalculated(false);
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
      {/** Header View */}
      <View style={styles.headingView}>
        <View style={{flex: 1}}>
          <Text style={styles.bmiHeading}>BMI Calculator</Text>
        </View>
        <View>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{paddingVertical: 5}}
            onPress={() => setShowInstruction(true)}>
            <Image source={Images.infoIcon} style={styles.infoIcon} />
          </TouchableOpacity>
        </View>
      </View>
      {/** Gender View */}
      <View style={styles.genderView}>
        <View style={[styles.genderItemView, gender === 1 && {opacity: 0.3}]}>
          <TouchableOpacity
            activeOpacity={1}
            disabled={bmiCalculated}
            onPress={() => setGender(0)}>
            <Image source={Images.manIcon} style={styles.genderIcon} />
            <Text style={styles.genderText}>Male</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.genderItemView, gender === 0 && {opacity: 0.3}]}>
          <TouchableOpacity
            activeOpacity={1}
            disabled={bmiCalculated}
            onPress={() => setGender(1)}>
            <Image source={Images.womanIcon} style={[styles.genderIcon]} />
            <Text style={styles.genderText}>Female</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/** Weight and height View */}
      <View style={styles.genderView}>
        <View style={styles.genderItemView}>
          <Text style={styles.genderText}>
            Your weight <Text style={{fontFamily: Fonts.semiBold}}>(kg)</Text>
          </Text>
          <TextInput
            numberOfLines={1}
            keyboardType="number-pad"
            editable={!bmiCalculated}
            style={styles.input}
            defaultValue={weight}
            placeholder="80"
            onChangeText={text => setWeight(text)}
          />
        </View>
        <View style={styles.genderItemView}>
          <Text style={styles.genderText}>
            Your height <Text style={{fontFamily: Fonts.semiBold}}>(cm)</Text>
          </Text>
          <TextInput
            placeholder="175"
            keyboardType="number-pad"
            numberOfLines={1}
            defaultValue={height}
            editable={!bmiCalculated}
            style={styles.input}
            onChangeText={text => setHeight(text)}
          />
        </View>
      </View>
      {/** Submit Button */}
      {!bmiCalculated && (
        <View style={styles.submitView}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => calculateBMI()}
            style={styles.submitBtn}>
            <Text style={styles.submitBtnText}>Calculate your BMI</Text>
          </TouchableOpacity>
        </View>
      )}
      {/** Calculate BMI again */}
      {bmiCalculated && (
        <View style={styles.submitView}>
          <View style={{alignItems: 'center'}}>
            <Text style={{fontFamily: Fonts.regular, fontSize: 16}}>
              Your BMI
            </Text>
            <Text style={{fontFamily: Fonts.semiBold, fontSize: 28}}>
              {bmi}
            </Text>
            <Text style={{fontFamily: Fonts.semiBold, fontSize: 18}}>
              {bmi < 18.5 && 'Underweight'}
              {bmi >= 18.5 && bmi <= 24.9 && 'Normal'}
              {bmi >= 25 && bmi <= 29.9 && 'Overweight'}
              {bmi >= 30 && 'Obesity'}
            </Text>
          </View>
          <View style={{alignItems: 'center', marginTop: 20}}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => convertAgain()}>
              <Text style={styles.calculateAgain}>Calculate BMI again</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {/** BMI Categories Modal */}
      <Modal visible={showInstruction} animationType="slide">
        <View style={styles.modalMainView}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setShowInstruction(false)}
            style={styles.closeIcon}>
            <Image
              source={Images.close}
              style={{
                width: 20,
                height: 20,
              }}
            />
          </TouchableOpacity>
          <View>
            <Text style={styles.bmiHeading}>BMI categories</Text>
          </View>
          <View>
            <View style={styles.categoryView}>
              <Text style={styles.categoryHeading}>Less than 18.5</Text>
              <Text style={styles.categoryDesc}>you're underweight</Text>
            </View>
            <View style={styles.categoryView}>
              <Text style={styles.categoryHeading}>18.5 to 24.9</Text>
              <Text style={styles.categoryDesc}>you're normal</Text>
            </View>
            <View style={styles.categoryView}>
              <Text style={styles.categoryHeading}>25 to 29.9</Text>
              <Text style={styles.categoryDesc}>you're overweight</Text>
            </View>
            <View style={styles.categoryView}>
              <Text style={styles.categoryHeading}>30 or more</Text>
              <Text style={styles.categoryDesc}>obesity</Text>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Home;
