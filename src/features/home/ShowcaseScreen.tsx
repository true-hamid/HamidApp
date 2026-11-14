import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';

type Stat = {value: string; label: string};
type Reach = {figure: string; caption: string};

function ShowcaseScreen(): React.JSX.Element {
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
  textRTL: {
    textAlign: 'right',
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

export default ShowcaseScreen;
