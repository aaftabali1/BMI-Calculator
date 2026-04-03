import React, {useCallback} from 'react';
import {Alert, Linking, ScrollView, StatusBar, Text} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Colors from '../../constants/Colors';
import Links from '../../constants/Links';
import styles from './styles';

const About = () => {
  const insets = useSafeAreaInsets();

  const openWebsite = useCallback(() => {
    Linking.openURL(Links.website).catch(() => {
      Alert.alert('About', 'Something went wrong opening the link.');
    });
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[
        styles.scrollContent,
        {
          paddingBottom: Math.max(insets.bottom, 24),
        },
      ]}
      showsVerticalScrollIndicator={false}>
      <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
      <Text style={styles.paragraph}>
        BMI Calculator helps you estimate your Body Mass Index (BMI) from your
        height and weight. BMI is a simple screening measure often used for
        general wellness and health awareness.
      </Text>
      <Text style={styles.paragraph}>
        This app is for informational purposes only. It does not replace
        professional medical advice, diagnosis, or treatment. Always speak
        with a qualified health provider about your individual needs.
      </Text>
      <Text style={styles.paragraph}>
        For more from the creator, visit{' '}
        <Text
          style={styles.linkInline}
          onPress={openWebsite}
          accessibilityRole="link"
          accessibilityLabel={`Open ${Links.website}`}>
          {Links.websiteDisplay}
        </Text>
        .
      </Text>
    </ScrollView>
  );
};

export default About;
