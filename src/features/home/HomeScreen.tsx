import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NavigationProp, ParamListBase} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

import {yearsOfExperience} from '@shared/utils/calculateExperience';

console.log('HomeScreen evaluated');

function HomeScreen(): React.JSX.Element {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const {t, i18n} = useTranslation('home');
  const isRTL = i18n.language === 'ar';

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

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('Showcase')}>
          <Text style={styles.secondaryButtonText}>
            {t('hero.ctaSecondary')}
          </Text>
        </TouchableOpacity>
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
    marginBottom: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: '#007aff',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#007aff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HomeScreen;
