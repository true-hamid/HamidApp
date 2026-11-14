import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';

import {yearsOfExperience} from '../../shared/utils/calculateExperience';

type SkillCategory = {title: string; skills: string[]};
console.log('SkillsScreen evaluated');

function SkillsScreen(): React.JSX.Element {
  const {t, i18n} = useTranslation('skills');
  const isRTL = i18n.language === 'ar';

  const categories = t('categories', {
    returnObjects: true,
  }) as SkillCategory[];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{t('title')}</Text>
        <Text style={[styles.subtitle, isRTL && styles.textRTL]}>
          {t('subtitle', {years: yearsOfExperience})}
        </Text>

        {categories.map(category => (
          <View style={styles.categoryBlock} key={category.title}>
            <Text style={[styles.categoryTitle, isRTL && styles.textRTL]}>
              {category.title}
            </Text>
            <View style={styles.tagsWrap}>
              {category.skills.map(skill => (
                <View style={styles.tag} key={skill}>
                  <Text style={styles.tagText}>{skill}</Text>
                </View>
              ))}
            </View>
          </View>
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
  categoryBlock: {
    marginBottom: 24,
  },
  categoryTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#007aff',
    marginBottom: 10,
  },
  tagsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: '#f5f6f8',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  tagText: {
    fontSize: 13,
    color: '#333',
  },
});

export default SkillsScreen;
