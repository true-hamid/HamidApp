import React from 'react';
import {Linking, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useTranslation} from 'react-i18next';

import {useAuth} from '@navigation/AuthContext';

type SocialLink = {label: string; href: string};
console.log('ContactScreen evaluated');

function ContactScreen(): React.JSX.Element {
  const {logout} = useAuth();
  const {t, i18n} = useTranslation('contact');
  const isRTL = i18n.language === 'ar';

  const socialLinks = t('socialLinks', {
    returnObjects: true,
  }) as SocialLink[];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{t('heading')}</Text>
        <Text style={[styles.subtitle, isRTL && styles.textRTL]}>
          {t('subheading')}
        </Text>

        <Text style={styles.sectionLabel}>
          {t('infoHeading')}
        </Text>
        <View style={styles.infoCard}>
          <Text style={[styles.infoLabel, isRTL && styles.textRTL]}>
            {t('email')}
          </Text>
          <Text style={[styles.infoValue, isRTL && styles.textRTL]}>
            {t('emailPrimary')}
          </Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={[styles.infoLabel, isRTL && styles.textRTL]}>
            {t('personal.title')}
          </Text>
          <Text style={[styles.infoValue, isRTL && styles.textRTL]}>
            {t('personal.location')}
          </Text>
        </View>

        <Text style={styles.sectionLabel}>
          {t('followHeading')}
        </Text>
        {socialLinks.map(link => (
          <TouchableOpacity
            key={link.label}
            style={styles.linkCard}
            onPress={() => Linking.openURL(link.href)}>
            <Text style={[styles.linkText, isRTL && styles.textRTL]}>
              {link.label}
            </Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutButtonText}>{t('logOut')}</Text>
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
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
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
  sectionLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
  },
  infoCard: {
    backgroundColor: '#f5f6f8',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    color: '#111',
  },
  linkCard: {
    backgroundColor: '#f5f6f8',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
  linkText: {
    fontSize: 15,
    color: '#007aff',
    fontWeight: '600',
  },
  logoutButton: {
    backgroundColor: '#d00',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 16,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ContactScreen;
