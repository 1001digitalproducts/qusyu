/**
 * @flow
 */
import type { NavigationScreenProp } from 'react-navigation';
import * as React from 'react';
import { connect } from 'react-redux';
import { StatusBar, View, ScrollView, Text, Image } from 'react-native';
import { Constants } from 'expo';
import invariant from 'invariant';
import { human, humanDense } from 'react-native-typography';
import { DIVIDER } from '@constants/assets';
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
    title: params ? params.title : '',
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
    setParams({ title: doa.title });
  }
  render() {
    const { navigation, doa } = this.props;
    const { pop } = navigation;
    invariant(pop, 'missing `pop` action creator for StackNavigator');

    return (
      <ScrollView contentContainerStyle={{ backgroundColor: colors.white, padding: 18 }}>
        <StatusBar backgroundColor={colors.headerBackground} barStyle="dark-content" />
        <View style={{ marginBottom: 50, flex: 1 }}>
          <Text style={[human.title1, { color: colors.primary, textAlign: 'center' }]}>
            {doa.judul_doa}
          </Text>
          <Image
            style={{
              marginTop: 20,
              height: 20,
              width: '100%',
              resizeMode: 'contain',
              justifyContent: 'center',
            }}
            source={DIVIDER}
          />
          <Text style={[humanDense.largeTitle, { color: colors.primary, marginVertical: 10 }]}>
            {doa.arab}
          </Text>
          <Image
            style={{
              marginBottom: 10,
              height: 20,
              width: '100%',
              resizeMode: 'contain',
              justifyContent: 'center',
            }}
            source={DIVIDER}
          />
          <Text style={[human.body, { color: colors.primary }]}>
            “{doa.arti}
            .” ({doa.surat + ' ' + doa.nomor_surat}:{doa.ayat_awal}-{doa.ayat_akhir})
          </Text>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = ({ doa }) => {
  return { doa };
};

export default connect(mapStateToProps)(Detail);
