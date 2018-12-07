/**
 * @flow
 */
import type { NavigationScreenProp } from 'react-navigation';
import React from 'react';
import { connect } from 'react-redux';
import { LinearGradient } from 'expo';
import { FlatList, Text, View, StatusBar, TouchableOpacity, Linking } from 'react-native';
import { Header, Icon, SearchBar } from 'react-native-elements';
import randomColor from 'randomcolor';
import { human, humanDense } from 'react-native-typography';
import { responsiveWidth as wx } from 'react-native-responsive-dimensions';
import { createFilter } from 'react-native-search-filter';
import Menu, { MenuProvider, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import colors from '@constants/colors';
import { selectDoa } from '@actions/doa';
import TouchableItem from '@components/TouchableItem';
import listDoa from '../doa.json';

const KEYS_TO_FILTERS = ['title', 'arti'];

type Props = {
  navigation: NavigationScreenProp<*>,
  dispatch: () => {},
};

class Home extends React.Component<Props> {
  state = {
    menu: false,
    search: false,
    searchTerm: '',
  };
  static navigationOptions = { header: null };
  searchUpdated(term) {
    this.setState({ searchTerm: term });
  }
  renderLogo = () => (
    <Text style={[human.title2, { color: colors.primary, paddingVertical: 5 }]}>Qusyu</Text>
  );
  keyExtractor = (item, index) => index.toString();
  renderItem = ({ item }) => {
    const { navigation, dispatch } = this.props;
    return (
      <TouchableOpacity
        onPress={() => {
          dispatch(selectDoa(item));
          navigation.navigate('Detail');
        }}>
        <LinearGradient
          start={{ x: 1, y: 0 }}
          end={{ x: 0.2, y: 0 }}
          colors={[
            randomColor({
              luminosity: 'light',
            }),
            randomColor({
              luminosity: 'light',
            }),
          ]}
          style={{
            backgroundColor: colors.white,
            borderRadius: 10,
            paddingHorizontal: 10,
            paddingVertical: 5,
            marginBottom: 18,
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <View style={{ justifyContent: 'center', maxWidth: wx(80) }}>
            <Text style={[human.title3, { color: colors.primary }]}>{item.judul_doa}</Text>
            <Text style={[humanDense.footnote, { color: colors.primary }]}>{item.arab}</Text>
          </View>
          <Icon
            iconStyle={{ fontSize: 30 }}
            name="ios-arrow-forward"
            type="ionicon"
            color={colors.primary}
          />
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  render() {
    const { navigation } = this.props;
    const doa = listDoa.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));
    return (
      <MenuProvider style={{ flex: 1 }}>
        <StatusBar backgroundColor={colors.headerBackground} barStyle="dark-content" />
        <Header outerContainerStyles={{ backgroundColor: colors.headerBackground }}>
          {this.renderLogo()}
          <View style={{ flexDirection: 'row', width: 70, justifyContent: 'space-between' }}>
            <TouchableItem
              accessibilityComponentType="button"
              accessibilityTraits="button"
              testID="header-back"
              delayPressIn={500}
              style={{ alignItems: 'center', flexDirection: 'row', backgroundColor: 'transparent' }}
              borderless
              onPress={() =>
                this.setState({ search: !this.state.search }, () => this.searchUpdated(''))
              }>
              <Icon
                name="md-search"
                type="ionicon"
                color={colors.primary}
                iconStyle={{ paddingHorizontal: 0 }}
              />
            </TouchableItem>
            <Menu
              opened={this.state.menu}
              onBackdropPress={() =>
                this.setState({
                  menu: false,
                })
              }>
              <MenuTrigger style={{ borderRadius: 30, borderWidth: 0 }}>
                <TouchableItem
                  accessibilityComponentType="button"
                  accessibilityTraits="button"
                  testID="header-back"
                  delayPressIn={0}
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    backgroundColor: 'transparent',
                  }}
                  borderless
                  onPress={() => this.setState({ menu: true })}>
                  <Icon
                    name="md-more"
                    type="ionicon"
                    color={colors.primary}
                    iconStyle={{ paddingHorizontal: 15, paddingVertical: 5 }}
                  />
                </TouchableItem>
              </MenuTrigger>
              <MenuOptions style={{ padding: 10 }}>
                <MenuOption
                  onSelect={() => {
                    this.setState({ menu: false });
                    navigation.navigate('About');
                  }}>
                  <Text style={[human.body, { color: colors.primary }]}>About</Text>
                </MenuOption>
                <MenuOption
                  onSelect={() => {
                    this.setState({ menu: false });
                    Linking.openURL('http://1001digitalproducts.awancoder.com/report/');
                  }}>
                  <Text style={[human.body, { color: colors.primary }]}>Report</Text>
                </MenuOption>
              </MenuOptions>
            </Menu>
          </View>
        </Header>
        {this.state.search && (
          <SearchBar
            noIcon
            onChangeText={term => this.searchUpdated(term)}
            onClearText={() => this.searchUpdated('')}
            placeholder="Tulis nama doa disini..."
          />
        )}
        <View style={{ flex: 1 }}>
          <FlatList
            keyExtractor={this.keyExtractor}
            data={doa}
            renderItem={this.renderItem}
            contentContainerStyle={{ marginHorizontal: 20, marginTop: 18, paddingBottom: 18 }}
          />
        </View>
      </MenuProvider>
    );
  }
}

const mapStateToProps = () => ({});
export default connect(mapStateToProps)(Home);
