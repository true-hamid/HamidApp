import React, {useState} from 'react';
import {
  FlatList,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useTranslation} from 'react-i18next';

import {useAuth} from '@navigation/AuthContext';
import {SUPPORTED_LANGUAGES, changeLanguage} from '@i18n';

// TODO: replace with real authentication once a backend/auth provider is wired up.
const STATIC_PIN = '1234';

function LoginScreen(): React.JSX.Element {
  const {login} = useAuth();
  const {t, i18n} = useTranslation('login');
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [isLanguagePickerVisible, setIsLanguagePickerVisible] = useState(false);

  const handleSubmit = () => {
    if (pin === STATIC_PIN) {
      setError('');
      login();
    } else {
      setError(t('error'));
    }
  };

  const handleSelectLanguage = (code: string) => {
    setIsLanguagePickerVisible(false);
    changeLanguage(code);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.languageButton}
        onPress={() => setIsLanguagePickerVisible(true)}>
        <Text style={styles.languageButtonText}>
          {t('changeLanguage')}
        </Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>{t('title')}</Text>
        <TextInput
          style={styles.input}
          value={pin}
          onChangeText={setPin}
          placeholder={t('pinPlaceholder')}
          keyboardType="number-pad"
          secureTextEntry
          maxLength={4}
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>{t('loginButton')}</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={isLanguagePickerVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsLanguagePickerVisible(false)}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsLanguagePickerVisible(false)}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>{t('languageModal.title')}</Text>
            <FlatList
              data={SUPPORTED_LANGUAGES}
              keyExtractor={item => item.code}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={[
                    styles.languageOption,
                    i18n.language === item.code && styles.languageOptionActive,
                  ]}
                  onPress={() => handleSelectLanguage(item.code)}>
                  <Text style={styles.languageOptionText}>
                    {t(item.labelKey, {ns: 'common'})}
                  </Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.modalCancelButton}
              onPress={() => setIsLanguagePickerVisible(false)}>
              <Text style={styles.modalCancelButtonText}>
                {t('languageModal.cancel')}
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  languageButton: {
    alignSelf: 'flex-end',
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  languageButtonText: {
    color: '#007aff',
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 14,
    fontSize: 20,
    textAlign: 'center',
    letterSpacing: 8,
    marginBottom: 12,
  },
  error: {
    color: '#d00',
    textAlign: 'center',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#007aff',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
  },
  languageOption: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  languageOptionActive: {
    backgroundColor: '#f0f6ff',
  },
  languageOptionText: {
    fontSize: 16,
    textAlign: 'center',
  },
  modalCancelButton: {
    marginTop: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  modalCancelButtonText: {
    fontSize: 15,
    color: '#888',
  },
});

export default LoginScreen;
