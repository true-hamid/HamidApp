import React from 'react';
import {Linking, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useTranslation} from 'react-i18next';

type Position = {
  title: string;
  company: string;
  period: string;
  description: string[];
};

type Award = {
  title: string;
  organization: string;
  year?: string;
  link?: string;
};
console.log('ExperienceScreen evaluated');

function ExperienceScreen(): React.JSX.Element {
  const {t, i18n} = useTranslation('experience');
  const isRTL = i18n.language === 'ar';

  const positions = t('positions', {
    returnObjects: true,
  }) as Position[];
  const awards = t('awards.items', {returnObjects: true}) as Award[];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{t('title')}</Text>
        <Text style={[styles.subtitle, isRTL && styles.textRTL]}>
          {t('subtitle')}
        </Text>

        {positions.map(job => (
          <View style={styles.jobCard} key={`${job.title}-${job.period}`}>
            <Text style={[styles.jobTitle, isRTL && styles.textRTL]}>
              {job.title}
            </Text>
            <Text style={[styles.jobCompany, isRTL && styles.textRTL]}>
              {job.company}
            </Text>
            <Text style={[styles.jobDates, isRTL && styles.textRTL]}>
              {job.period}
            </Text>
            {job.description.map(point => (
              <View
                style={[styles.bulletRow, isRTL && styles.bulletRowRTL]}
                key={point.slice(0, 32)}>
                <Text style={styles.bullet}>•</Text>
                <Text style={[styles.bulletText, isRTL && styles.textRTL]}>
                  {point}
                </Text>
              </View>
            ))}
          </View>
        ))}

        <Text style={styles.title}>{t('awards.title')}</Text>
        {awards.map(award => (
          <TouchableOpacity
            key={award.title}
            style={styles.awardCard}
            disabled={!award.link}
            onPress={() => award.link && Linking.openURL(award.link)}>
            <Text style={[styles.awardTitle, isRTL && styles.textRTL]}>
              {award.title}
            </Text>
            <Text style={[styles.awardMeta, isRTL && styles.textRTL]}>
              {award.organization}
              {award.year ? ` · ${award.year}` : ''}
            </Text>
          </TouchableOpacity>
        ))}
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
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
    marginTop: 8,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
    color: '#666',
    marginBottom: 24,
  },
  textRTL: {
    textAlign: 'right',
  },
  jobCard: {
    backgroundColor: '#f5f6f8',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  jobTitle: {
    fontSize: 17,
    fontWeight: '700',
  },
  jobCompany: {
    fontSize: 14,
    color: '#007aff',
    fontWeight: '600',
    marginTop: 2,
  },
  jobDates: {
    fontSize: 13,
    color: '#888',
    marginTop: 2,
    marginBottom: 10,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  bulletRowRTL: {
    flexDirection: 'row-reverse',
  },
  bullet: {
    fontSize: 14,
    color: '#333',
    marginRight: 6,
  },
  bulletText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
  },
  awardCard: {
    backgroundColor: '#f5f6f8',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  awardTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 2,
  },
  awardMeta: {
    fontSize: 13,
    color: '#666',
  },
});

export default ExperienceScreen;
