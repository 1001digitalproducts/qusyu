/**
 * @flow
 */
import type { NavigationScreenProp } from 'react-navigation';
import * as React from 'react';
import { connect } from 'react-redux';
import { StatusBar, View, ScrollView, Text } from 'react-native';
import { Constants } from 'expo';
import invariant from 'invariant';
import { human, humanDense } from 'react-native-typography';
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
    headerTintColor: colors.headerColor,
    headerTitleStyle: [human.title2, { color: colors.headerColor }],
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
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor={colors.headerBackground} barStyle="dark-content" />
        <ScrollView contentContainerStyle={{ backgroundColor: colors.white, padding: 18, flex: 1 }}>
          <Text style={[human.headline, { color: colors.contentText, textAlign: 'center' }]}>
            {doa.title}
          </Text>
          <Text style={[humanDense.largeTitle, { color: colors.contentText, marginVertical: 10 }]}>
            {doa.arabic}
          </Text>
          <Text style={[human.body, { color: colors.contentText }]}>
            “{doa.arti}
            .”
          </Text>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({ doa }) => {
  return { doa };
};

export default connect(mapStateToProps)(Detail);
