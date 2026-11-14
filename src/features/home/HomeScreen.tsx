import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {useTranslation} from 'react-i18next';

import type {PostLoginTabParamList} from '../../navigation/types';
import {yearsOfExperience} from '../../shared/utils/calculateExperience';

type Stat = {value: string; label: string};
type Reach = {figure: string; caption: string};

console.log('HomeScreen evaluated');

function HomeScreen(): React.JSX.Element {
  const navigation = useNavigation<BottomTabNavigationProp<PostLoginTabParamList>>();
  const {t, i18n} = useTranslation('home');
  const isRTL = i18n.language === 'ar';

  const reach = t('showcase.reach', {returnObjects: true}) as Reach;
  const stats = t('showcase.stats', {returnObjects: true}) as Stat[];
  const impactStats: Stat[] = [
    {value: reach.figure, label: reach.caption},
    ...stats,
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.eyebrow, isRTL && styles.textRTL]}>
          {t('hero.badge')}
        </Text>
        <Text style={[styles.name, isRTL && styles.textRTL]}>
          {t('hero.heading')}
        </Text>
        <Text style={[styles.headline, isRTL && styles.textRTL]}>
          {t('hero.subheading')}
        </Text>
        <Text style={[styles.bio, isRTL && styles.textRTL]}>
          {t('hero.description', {years: yearsOfExperience})}
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('About')}>
          <Text style={styles.buttonText}>{t('hero.ctaPrimary')}</Text>
        </TouchableOpacity>

        <View style={styles.statsGrid}>
          {impactStats.map(stat => (
            <View style={styles.statCard} key={stat.label}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={[styles.statLabel, isRTL && styles.textRTL]}>
                {stat.label}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 24,
  },
  eyebrow: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007aff',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  name: {
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 4,
  },
  headline: {
    fontSize: 18,
    fontWeight: '500',
    color: '#444',
    marginBottom: 16,
  },
  bio: {
    fontSize: 15,
    lineHeight: 22,
    color: '#333',
    marginBottom: 20,
  },
  textRTL: {
    textAlign: 'right',
  },
  button: {
    backgroundColor: '#007aff',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 32,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    flexBasis: '47%',
    backgroundColor: '#f5f6f8',
    borderRadius: 12,
    padding: 16,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '700',
    color: '#007aff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    color: '#555',
  },
});

export default HomeScreen;
