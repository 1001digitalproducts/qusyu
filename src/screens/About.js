import React from 'react';
import { View, Text, Image, StatusBar } from 'react-native';
import { human } from 'react-native-typography';
import { responsiveWidth as wx, responsiveHeight as hx } from 'react-native-responsive-dimensions';
import { QUSYU_LOGO } from '@constants/assets';
import colors from '@constants/colors';

class About extends React.PureComponent {
  static navigationOptions = {
    header: null,
  };
  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          backgroundColor: colors.splashScreen,
        }}>
        <StatusBar backgroundColor={colors.splashScreen} barStyle="light-content" />
        <View style={{ justifyContent: 'center', flex: 1 }}>
          <Image
            style={{ width: wx(30), height: hx(25), resizeMode: 'contain' }}
            source={QUSYU_LOGO}
          />
          <Text
            style={[
              human.caption1,
              { color: colors.white, paddingVertical: 10, textAlign: 'center' },
            ]}>
            Version 2
          </Text>
        </View>
        <Text style={[human.body, { color: colors.white, position: 'absolute', bottom: hx(5) }]}>
          1001 Digital Products
        </Text>
      </View>
    );
  }
}

export default About;
