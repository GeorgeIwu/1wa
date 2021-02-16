import React, {createContext, useContext, useState} from 'react'
import EN from "../../i18n/en.json";
import ES from "../../i18n/es.json";

const TRANSLATIONS = {
  english: EN,
  french: ES,
};
export type LanguageType = keyof typeof TRANSLATIONS

const languageNames = Object.keys(TRANSLATIONS)

const defaultStore = {
  langCode: languageNames[0] as LanguageType,
  languages: languageNames.map((key: string) => key as LanguageType)
};
const defaultDispatch = {
  translate: (key: string) => "",
  changeLangCode: (langCode: string) => {},
};

const StoreContext = createContext(defaultStore);
const DispatchContext = createContext(defaultDispatch);

const getTranslate = (langCode: LanguageType) => {
  return (key: string) => {
    const langKey = key as keyof typeof EN
    return TRANSLATIONS[langCode][langKey] || key;
  }
}

const getChangeCode = (setLangCode: (l: LanguageType) => any) => {
  return (key: string) => {
    const langCode = key as LanguageType
    return setLangCode(langCode);
  }
}

type Props = {
  children: React.ReactNode;
  initialState?: typeof defaultStore;
};

export const LanguageProvider = ({ children }: Props) => {
  const [langCode, setLangCode] = useState(defaultStore.langCode);

  const store = { langCode, languages: defaultStore.languages };
  const dispatch = {
    changeLangCode: getChangeCode(setLangCode),
    translate: getTranslate(langCode)
  };

  return (
    <DispatchContext.Provider value={dispatch}>
      <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    </DispatchContext.Provider>
  );
};

export const useLanguageStore = () => useContext(StoreContext);

export const useLanguageDispatch = () => useContext(DispatchContext);

