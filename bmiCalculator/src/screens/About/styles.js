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
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 24,
    paddingTop: 8,
  },
  paragraph: {
    color: Colors.black,
    fontFamily: Fonts.regular,
    fontSize: wp('4.2%'),
    lineHeight: hp('3.2%'),
    marginBottom: 16,
  },
  linkInline: {
    color: Colors.themeBlue,
    fontFamily: Fonts.semiBold,
    textDecorationLine: 'underline',
  },
});
