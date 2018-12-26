/**
 * @flow
 */
import type { NavigationScreenProp } from 'react-navigation';
import * as React from 'react';
import { connect } from 'react-redux';
import { StatusBar, View, ScrollView, Text, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { Constants } from 'expo';
import invariant from 'invariant';
import { human, humanDense } from 'react-native-typography';
import { QURAN } from '@constants/assets';
import colors from '@constants/colors';

type Props = {
  navigation: NavigationScreenProp<*>,
  doa: {
    title: string,
    ayat: string,
  },
};

class Detail extends React.Component<Props> {
  static navigationOptions = ({
    navigation: {
      state: { params },
    },
  }) => ({
    title: params ? params.title : 'Loading...',
    headerStyle: {
      backgroundColor: colors.headerBackground,
      marginTop: -Constants.statusBarHeight,
    },
    headerTintColor: colors.primary,
    headerTitleStyle: [human.title2, { color: colors.primary }],
  });

  componentDidMount() {
    const {
      navigation: { setParams },
      doa,
    } = this.props;
    setParams({ title: doa.judul_doa });
  }

  render() {
    const { navigation, doa } = this.props;
    const { pop } = navigation;
    invariant(pop, 'missing `pop` action creator for StackNavigator');

    return (
      <ScrollView contentContainerStyle={{ backgroundColor: colors.white, padding: 18 }}>
        <StatusBar backgroundColor={colors.headerBackground} barStyle="dark-content" />
        <View style={{ marginBottom: 50, flex: 1 }}>
          <Text
            style={[
              humanDense.title2,
              { color: colors.primary, marginVertical: 10, textAlign: 'right' },
            ]}>
            {doa.arab}
          </Text>
          <View
            style={{
              backgroundColor: colors.borderWhite,
              padding: 10,
              borderRadius: 4,
              marginVertical: 25,
            }}>
            <Icon
              iconStyle={{
                fontSize: 30,
                transform: [{ rotate: '180deg' }],
                alignSelf: 'flex-start',
              }}
              name="md-quote"
              type="ionicon"
              color={colors.labelText}
            />
            <Image
              style={{
                marginTop: -65,
                marginBottom: 20,
                height: 50,
                width: '100%',
                resizeMode: 'contain',
                justifyContent: 'center',
              }}
              source={QURAN}
            />
            <Text style={[human.body, { color: colors.primary }]}>{doa.arti}</Text>
            <Text
              style={[
                human.headline,
                { color: colors.labelText, textAlign: 'right', marginTop: 10 },
              ]}>
              {doa.surat + ' ' + doa.nomor_surat}:{doa.ayat_awal}-{doa.ayat_akhir}
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = ({ doa }) => {
  return { doa };
};

export default connect(mapStateToProps)(Detail);
