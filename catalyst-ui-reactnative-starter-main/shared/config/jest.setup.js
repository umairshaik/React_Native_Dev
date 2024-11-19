import mockStorage from '@catalyst/storage/MockStorage';
import 'jest-styled-components/native';

jest.mock('@catalyst/storage', () => mockStorage);
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: str => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
  initReactI18next: '',
}));
jest.mock('i18next', () => ({
  use: () => {
    return {
      init: jest.fn(),
    };
  },
  addResourceBundle: jest.fn(),
  changeLanguage: jest.fn(),
  language: 'en',
}));
