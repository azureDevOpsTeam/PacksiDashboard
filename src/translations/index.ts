import { en } from './en';
import { fa } from './fa';

export const translations = {
  en,
  fa
};

export type TranslationKey = keyof typeof en;