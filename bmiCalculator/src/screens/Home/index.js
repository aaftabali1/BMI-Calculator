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
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import Images from '../../constants/Images';
import styles from './styles';

const parsePositiveNumber = (text, label) => {
  const n = parseFloat(String(text).replace(',', '.').trim());
  if (!Number.isFinite(n) || n <= 0) {
    return {ok: false, message: `Please enter a valid ${label}.`};
  }
  return {ok: true, value: n};
};

const Home = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [gender, setGender] = useState(0);
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState('');
  const [bmiCalculated, setBmiCalculated] = useState(false);
  const [showInstruction, setShowInstruction] = useState(false);

  const calculateBMI = () => {
    if (!String(height).trim() || !String(weight).trim()) {
      Alert.alert('BMI Calculator', 'All fields are mandatory.');
      return;
    }

    const h = parsePositiveNumber(height, 'height in cm');
    const w = parsePositiveNumber(weight, 'weight in kg');
    if (!h.ok) {
      Alert.alert('BMI Calculator', h.message);
      return;
    }
    if (!w.ok) {
      Alert.alert('BMI Calculator', w.message);
      return;
    }

    if (h.value < 50 || h.value > 300) {
      Alert.alert('BMI Calculator', 'Height should be between 50 and 300 cm.');
      return;
    }
    if (w.value < 10 || w.value > 500) {
      Alert.alert('BMI Calculator', 'Weight should be between 10 and 500 kg.');
      return;
    }

    const heightMeters = h.value / 100;
    const bmiValue = w.value / (heightMeters * heightMeters);
    if (!Number.isFinite(bmiValue)) {
      Alert.alert('BMI Calculator', 'Could not calculate BMI. Check your numbers.');
      return;
    }

    setBmi(bmiValue.toFixed(1));
    setBmiCalculated(true);
  };

  const convertAgain = () => {
    setHeight('');
    setWeight('');
    setBmi('');
    setBmiCalculated(false);
  };

  const bmiNum = bmi === '' ? NaN : Number(bmi);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        flexGrow: 1,
        paddingTop: insets.top,
        paddingBottom: Math.max(insets.bottom, 8),
      }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}>
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
            keyboardType="decimal-pad"
            editable={!bmiCalculated}
            style={styles.input}
            value={weight}
            placeholder="80"
            onChangeText={setWeight}
          />
        </View>
        <View style={styles.genderItemView}>
          <Text style={styles.genderText}>
            Your height <Text style={{fontFamily: Fonts.semiBold}}>(cm)</Text>
          </Text>
          <TextInput
            placeholder="175"
            keyboardType="decimal-pad"
            numberOfLines={1}
            value={height}
            editable={!bmiCalculated}
            style={styles.input}
            onChangeText={setHeight}
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
              {bmiNum < 18.5 && 'Underweight'}
              {bmiNum >= 18.5 && bmiNum <= 24.9 && 'Normal'}
              {bmiNum >= 25 && bmiNum <= 29.9 && 'Overweight'}
              {bmiNum >= 30 && 'Obesity'}
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
      {/** About */}
      <View style={styles.footerRow}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('About')}
          accessibilityRole="button"
          accessibilityLabel="About us">
          <Text style={styles.footerLink}>About us</Text>
        </TouchableOpacity>
      </View>
      {/** BMI Categories Modal */}
      <Modal visible={showInstruction} animationType="slide">
        <SafeAreaView
          style={styles.modalSafeArea}
          edges={['top', 'right', 'bottom', 'left']}>
          <View style={styles.modalMainView}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setShowInstruction(false)}
              style={styles.closeIcon}
              accessibilityRole="button"
              accessibilityLabel="Close">
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
        </SafeAreaView>
      </Modal>
    </ScrollView>
  );
};

export default Home;
