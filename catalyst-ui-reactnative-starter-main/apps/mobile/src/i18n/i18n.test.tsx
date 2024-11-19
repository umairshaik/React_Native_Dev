import i18next from 'i18next';
import {setAppLanguage, getLanguage} from '.';

describe('[i18n] - [Localisation]', () => {
  test('should return en when getLanguage is called', () => {
    getLanguage();

    expect(getLanguage()).toStrictEqual('en');
  });
  test('should return translation in Hindi when selected language is Hindi', () => {
    setAppLanguage('hi');

    expect(i18next.addResourceBundle).toBeCalledTimes(1);
    expect(i18next.changeLanguage).toBeCalledTimes(1);
  });
});

afterAll(() => {
  setAppLanguage('en');
});
