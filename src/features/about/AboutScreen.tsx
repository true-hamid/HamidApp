import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';

import {yearsOfExperience} from '@shared/utils/calculateExperience';

type Degree = {degree: string; institution: string; period: string};
console.log('AboutScreen evaluated');

function AboutScreen(): React.JSX.Element {
  const {t, i18n} = useTranslation('about');
  const isRTL = i18n.language === 'ar';

  const journeyParagraphs = t('journeyParagraphs', {
    returnObjects: true,
  }) as string[];
  const degrees = t('education.degrees', {
    returnObjects: true,
  }) as Degree[];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{t('title')}</Text>
        <Text style={[styles.paragraph, isRTL && styles.textRTL]}>
          {t('subtitle', {years: yearsOfExperience})}
        </Text>

        <Text style={styles.sectionLabel}>{t('education.title')}</Text>
        {degrees.map(degree => (
          <View style={styles.educationCard} key={degree.degree}>
            <Text style={[styles.educationDegree, isRTL && styles.textRTL]}>
              {degree.degree}
            </Text>
            <Text style={[styles.educationMeta, isRTL && styles.textRTL]}>
              {degree.institution}
            </Text>
            <Text style={[styles.educationMeta, isRTL && styles.textRTL]}>
              {degree.period}
            </Text>
          </View>
        ))}

        <Text style={styles.title}>{t('journeyTitle')}</Text>
        {journeyParagraphs.map(paragraph => (
          <Text
            style={[styles.paragraph, isRTL && styles.textRTL]}
            key={paragraph.slice(0, 24)}>
            {paragraph}
          </Text>
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
    marginBottom: 12,
    marginTop: 8,
  },
  paragraph: {
    fontSize: 15,
    lineHeight: 22,
    color: '#333',
    marginBottom: 16,
  },
  textRTL: {
    textAlign: 'right',
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
  },
  educationCard: {
    backgroundColor: '#f5f6f8',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  educationDegree: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 2,
  },
  educationMeta: {
    fontSize: 13,
    color: '#666',
  },
});

export default AboutScreen;
