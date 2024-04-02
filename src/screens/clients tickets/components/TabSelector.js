import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';

const TabSelector = ({tabs, onSelect, active}) => {
  const handleTabSelect = tab => {
    onSelect(tab);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}>
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, active === tab && styles.selectedTab]}
            onPress={() => handleTabSelect(tab)}>
            <Text
              style={[
                styles.tabText,
                active === tab && styles.selectedTabText,
              ]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 5,
  },
  scrollContainer: {
    paddingHorizontal: 10,
  },
  tab: {
    padding: 10,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  selectedTab: {
    backgroundColor: '#5dbf06',
    borderRadius: 5,
    marginHorizontal: 10,
  },
  tabText: {
    color: '#000',
    fontFamily: 'DMSans-Medium',
    fontSize: 15,
  },
  selectedTabText: {
    color: '#fff',
    fontFamily: 'DMSans-Medium',
    fontSize: 15,
  },
});

export default TabSelector;
