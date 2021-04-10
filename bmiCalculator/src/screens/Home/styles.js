import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
  },
  bmiHeading: {color: Colors.black, fontFamily: Fonts.bold, fontSize: wp('6%')},
  headingView: {
    paddingVertical: 10,
    flexDirection: 'row',
  },
  infoIcon: {
    height: 22,
    width: 22,
  },
  genderView: {
    flexDirection: 'row',
    marginTop: 30,
  },
  genderIcon: {
    width: wp('30%'),
    height: wp('30%'),
  },
  genderText: {
    fontFamily: Fonts.medium,
    textAlign: 'center',
    fontSize: wp('4.5%'),
    marginTop: 5,
  },
  genderItemView: {flex: 1, alignItems: 'center'},
  genderText: {
    fontSize: wp('4.2%'),
    fontFamily: Fonts.regular,
    textAlign: 'center',
    marginTop: 10,
  },
  input: {
    padding: 0,
    fontFamily: Fonts.regular,
    fontSize: wp('9%'),
    width: '100%',
    textAlign: 'center',
    marginTop: 5,
    paddingTop: 10,
    color: Colors.black,
  },
  submitView: {padding: 20, marginTop: 30},
  submitBtn: {
    backgroundColor: Colors.themeBlue,
    padding: 15,
    borderRadius: 10,
    elevation: 8,
  },
  submitBtnText: {
    color: Colors.white,
    textAlign: 'center',
    fontFamily: Fonts.medium,
    fontSize: wp('4.6'),
  },
  modalMainView: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  calculateAgain: {
    color: Colors.themeBlue,
    fontFamily: Fonts.bold,
    fontSize: 16,
  },
  closeIcon: {position: 'absolute', right: 20, top: 16, zIndex: 2},
  categoryHeading: {
    fontFamily: Fonts.bold,
    fontSize: wp('7.5%'),
    lineHeight: hp('5%'),
  },
  categoryDesc: {
    fontFamily: Fonts.regular,
    fontSize: wp('6%'),
    lineHeight: hp('4%'),
  },
  categoryView: {
    marginTop: 30,
  },
});
