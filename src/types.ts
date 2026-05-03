/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Verse {
  number: number;
  arabic: string;
  english: string;
  transliteration: string;
}

export interface Surah {
  id: string;
  name: string;
  englishName: string;
  surahNumber: number;
  verses: Verse[];
  isPartial?: boolean;
}
