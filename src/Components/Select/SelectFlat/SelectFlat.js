import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableHighlight, View, FlatList, Text } from 'react-native';

import { Menu, MenuItem, Icon } from '../../..';

import withTheme from '../../../Theme/withTheme';
import styles from './SelectFlat.styles';

class Select extends Component {
  static propTypes = {
    onSelect: PropTypes.func,
    buttonStyle: PropTypes.object,
    label: PropTypes.string,
    selectedItem: PropTypes.node,
    menuItems: PropTypes.array,
    visible: PropTypes.bool,
  };

  state = {
    visible: false,
  };

  onSelect = item => {
    this.props.onSelect(item);
    this.hideMenu();
  };

  showMenu() {
    this.setState({
      visible: true,
    });
  }

  hideMenu() {
    this.setState({
      visible: false,
    });
  }

  render() {
    const { buttonStyle, label, selectedItem, menuItems } = this.props;

    const { visible } = this.state;
    return (
      <Menu
        style={[styles.menu, { flex: 1 }]}
        sameWidth
        visible={visible}
        button={
          <TouchableHighlight
            onPress={() => this.showMenu()}
            style={[styles.button, buttonStyle]}
            underlayColor={'transparent'}>
            <View style={styles.innerView}>
              <Text
                style={[
                  styles.textSelected,
                  { opacity: selectedItem ? 1 : 0 },
                ]}>
                {label}
              </Text>

              <Text
                style={[
                  styles.buttonText,
                  { color: selectedItem ? 'black' : 'rgba(0,0,0,0.6)' },
                ]}>
                {selectedItem ? selectedItem : label}
              </Text>

              <Icon
                name="arrow-drop-down"
                size={24}
                color={'#757575'}
                style={styles.icon}
              />
            </View>
          </TouchableHighlight>
        }>
        <FlatList
          data={menuItems}
          style={{ flex: 1 }}
          renderItem={({ item }) => {
            return (
              <MenuItem
                key={item.id}
                text={item.name}
                onPress={() => this.onSelect(item)}
                style={{ flex: 1 }}
              />
            );
          }}
        />
      </Menu>
    );
  }
}

export default withTheme(Select);
