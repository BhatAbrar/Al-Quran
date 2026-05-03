/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Surah } from './types';

export const SURAHS: Surah[] = [
  {
    id: '109',
    name: 'سورة الكافرون',
    englishName: 'Al-Kaafiroon',
    surahNumber: 109,
    verses: [
      { number: 1, arabic: 'قُلْ يَا أَيُّهَا الْكَافرُونَ', english: 'Say, "O disbelievers,', transliteration: 'Qul yaa ayyuhal kaafiroon' },
      { number: 2, arabic: 'لَا أَعْبُدُ مَا تَعْبُدُونَ', english: 'I do not worship what you worship.', transliteration: "Laa a'budu maa ta'budoon" },
      { number: 3, arabic: 'وَلَا أَنتُمْ عَابِدُونَ مَا أَعْبُدُ', english: 'Nor are you worshippers of what I worship.', transliteration: "Wa laa antum 'aabidoona maa a'bud" },
      { number: 4, arabic: 'وَلَا أَنَا عَابِدٌ مَّا عَبَدتُّمْ', english: 'Nor will I be a worshipper of what you worship.', transliteration: "Wa laa ana 'aabidum maa 'abattum" },
      { number: 5, arabic: 'وَلَا أَنتُمْ عَابِدُونَ مَا أَعْبُدُ', english: 'Nor will you be worshippers of what I worship.', transliteration: "Wa laa antum 'aabidoona maa a'bud" },
      { number: 6, arabic: 'لَكُمْ دِينُكُمْ وَلِيَ دِينِ', english: 'For you is your religion, and for me is my religion."', transliteration: 'Lakum deenukum wa liya deen' }
    ]
  },
  {
    id: '112',
    name: 'سورة الإخلاص',
    englishName: 'Al-Ikhlaas',
    surahNumber: 112,
    verses: [
      { number: 1, arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ', english: 'Say, "He is Allah, [who is] One,', transliteration: 'Qul huwal laahu ahad' },
      { number: 2, arabic: 'اللَّهُ الصَّمَدُ', english: 'Allah, the Eternal Refuge.', transliteration: 'Allahus samad' },
      { number: 3, arabic: 'لَمْ يَلِدْ وَلَمْ يُولَدْ', english: 'He neither begets nor is born,', transliteration: 'Lam yalid wa lam yoolad' },
      { number: 4, arabic: 'وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ', english: 'Nor is there to Him any equivalent."', transliteration: 'Wa lam yakul lahoo kufuwan ahad' }
    ]
  },
  {
    id: '113',
    name: 'سورة الفلق',
    englishName: 'Al-Falaq',
    surahNumber: 113,
    verses: [
      { number: 1, arabic: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ', english: 'Say, "I seek refuge in the Lord of daybreak', transliteration: "Qul a'oodhu bi rabbil falaq" },
      { number: 2, arabic: 'مِن شَرِّ مَا خَلَقَ', english: 'From the evil of that which He created', transliteration: 'Min sharri maa khalaq' },
      { number: 3, arabic: 'وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ', english: 'And from the evil of darkness when it settles', transliteration: 'Wa min sharri ghasiqin idha waqab' },
      { number: 4, arabic: 'وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ', english: 'And from the evil of the blowers in knots', transliteration: "Wa min sharri naffathaati fil 'uqad" },
      { number: 5, arabic: 'وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ', english: 'And from the evil of an envier when he envies."', transliteration: 'Wa min sharri hasidin idha hasad' }
    ]
  },
  {
    id: '114',
    name: 'سورة الناس',
    englishName: 'An-Naas',
    surahNumber: 114,
    verses: [
      { number: 1, arabic: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ', english: 'Say, "I seek refuge in the Lord of mankind,', transliteration: "Qul a'oodhu bi rabbin naas" },
      { number: 2, arabic: 'مَلِكِ النَّاسِ', english: 'The Sovereign of mankind.', transliteration: 'Malikin naas' },
      { number: 3, arabic: 'إِلَهِ النَّاسِ', english: 'The God of mankind,', transliteration: 'Ilaahin naas' },
      { number: 4, arabic: 'مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ', english: 'From the evil of the retreating whisperer -', transliteration: 'Min sharril waswaasil khannaas' },
      { number: 5, arabic: 'الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ', english: 'Who whispers [evil] into the breasts of mankind -', transliteration: 'Alladhee yuwaswisu fee sudoorin naas' },
      { number: 6, arabic: 'مِنَ الْجِنَّةِ وَالنَّاسِ', english: 'From among the jinn and mankind."', transliteration: 'Minal jinnati wan naas' }
    ]
  },
  {
    id: '2-255',
    name: 'آية الكرسي',
    englishName: 'Ayatul Kursi',
    surahNumber: 2,
    isPartial: true,
    verses: [
      { 
        number: 255, 
        arabic: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۚ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ', 
        english: 'Allah - there is no deity except Him, the Ever-Living, the Sustainer of [all] existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth. Who is it that can intercede with Him except by His permission? He knows what is [presently] before them and what will be after them, and they encompass not a thing of His knowledge except for what He wills. His Kursi extends over the heavens and the earth, and their preservation tires Him not. And He is the Most High, the Most Magnificent.',
        transliteration: "Allahu laaa ilaaha illaa huwal hayyul qayyoom; laa ta'khudhuhoo sinatun wa laa nawm; lahoo maa fis samawaati wa maa fil ard; man dhal ladhee yashfa'u 'indahooo illaa bi idhnih; ya'lamu maa bayna aydeehim wa maa khalfahum wa laa yuheetoona bi shay'im min 'ilmihee illaa bimaa shaaa'; wasi'a kursiyyuhus samawaati wal arda wa laa ya'ooduhoo hifdhuhumaa; wa huwal 'aliyyul 'adheem."
      }
    ]
  },
  {
    id: '2-285-286',
    name: 'خواتيم سورة البقرة',
    englishName: 'Al-Baqara 2 verses',
    surahNumber: 2,
    isPartial: true,
    verses: [
      { 
        number: 285, 
        arabic: 'آمَنَ الرَّسُولُ بِمَا أُنزِلَ إِلَيْهِ مِن رَّبِّهِ وَالْمُؤْمِنُونَ ۚ كُلٌّ آمَنَ بِاللَّهِ وَمَلَائِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ لَا نُفَرِّقُ بَيْنَ أَحَدٍ مِّن رُّسُلِهِ ۚ وَقَالُوا سَمِعْنَا وَأَطَعْنَا ۖ غُفْرَانَكَ رَبَّنَا وَإِلَيْكَ الْمَصِيرُ', 
        english: 'The Messenger has believed in what was revealed to him from his Lord, and [so have] the believers. All of them have believed in Allah and His angels and His books and His messengers, [saying], "We make no distinction between any of His messengers." And they say, "We hear and we obey. [We seek] Your forgiveness, our Lord, and to You is the [final] destination."',
        transliteration: "Aamanar rasoolu bimaaa unzila ilayhi mir rabbihee wal mu'minoon; kullun aamana billaahi wa malaaa'ikatihee wa kutubihee wa rusulih; laa nufarriqu bayna ahadim mir rusulih; wa qaaloo sami'naa wa ata'naa ghufraanaka rabbanaa wa ilaykal maseer."
      },
      { 
        number: 286, 
        arabic: 'لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا ۚ لَهَا مَا كَسَبَتْ وَعَلَيْهَا مَا اكْتَسَبَتْ ۗ رَبَّنَا لَا تُؤَاخِذْنَا إِن نَّسِينَا أَوْ أَخْطَأْنَا ۚ رَبَّنَا وَلَا تَحْمِلْ عَلَيْنَا إِصْرًا كَمَا حَمَلْتَهُ عَلَى الَّذِينَ مِن قَبْلِنَا ۚ رَبَّنَا وَلَا تُحَمِّلْنَا مَا لَا طَاقَةَ لَنَا بِهِ ۖ وَاعْفُ عَنَّا وَاغْفِرْ لَنَا وَارْحَمْنَا ۚ أَنتَ مَوْلَانَا فَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ', 
        english: 'Allah does not charge a soul except [with that within] its capacity. It will have [the consequence of] what [good] it has gained, and it will bear [the consequence of] what [evil] it has earned. "Our Lord, do not impose blame upon us if we have forgotten or erred. Our Lord, and lay not upon us a burden like that which You laid upon those before us. Our Lord, and burden us not with that which we have no ability to bear. And pardon us; and forgive us; and have mercy upon us. You are our protector, so give us victory over the disbelieving people."',
        transliteration: "Laa yukallifullaahu nafsan illaa wus'ahaa; lahaa maa kasabat wa 'alayhaa maktasabat; rabbanaa laa tu'aakhidhnaaa in naseenaaa aw akhtaanaa; rabbanaa wa laa tahmil 'alaynaaa isran kamaa hamaltahoo 'alal ladheena min qablinaa; rabbanaa wa laa tuhammilnaa maa laa taaqata lanaa bih; wa'fu 'annaa waghfir lanaa warhamnaa; anta mawlaanaa fansurnaa 'alal qawmil kaafireen."
      }
    ]
  },
  {
    id: '67',
    name: 'سورة الملك',
    englishName: 'Surah Al-Mulk',
    surahNumber: 67,
    verses: [
      { number: 1, arabic: 'تَبَارَكَ الَّذِي بِيَدِهِ الْمُلْكُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ', english: 'Blessed is He in whose hand is dominion, and He is over all things competent -', transliteration: "Tabaarakal ladhee biyadihil mulku wa huwa 'alaa kulli shay'in qadeer" },
      { number: 2, arabic: 'الَّذِي خَلَقَ الْمَوْتَ وَالْحَيَاةَ لِيَبْلُوَكُمْ أَيُّكُمْ أَحْسَنُ عَمَلًا ۚ وَهُوَ الْعَزِيزُ الْغَفُورُ', english: '[He] who created death and life to test you [as to] which of you is best in deed - and He is the Exalted in Might, the Forgiving -', transliteration: "Alladhee khalaqal mawta wal hayaata liyabluwakum ayyukum ahsanu 'amalaa; wa huwal 'azeezul ghafoor" },
      { number: 3, arabic: 'الَّذِي خَلَقَ سَبْعَ سَمَاوَاتٍ طِبَاقًا ۖ مَّا تَرَىٰ فِي خَلْقِ الرَّحْمَٰنِ مِن تَفَاوُتٍ ۖ فَارْجِعِ الْبَصَرَ هَلْ تَرَىٰ مِن فُطُورٍ', english: '[And] who created seven heavens in layers. You do not see in the creation of the Most Merciful any inconsistency. So return [your] vision [to the sky]; do you see any breaks?', transliteration: "Alladhee khalaqa sab'a samawaatin tibaaqaa; maa taraa fee khalqi rahmaani min tafaawut; farji'il basara hal taraa min futoor" },
      { number: 4, arabic: 'ثُمَّ ارْجِعِ الْبَصَرَ كَرَّتَيْنِ يَنقَلِبْ إِلَيْكَ الْبَصَرُ خَاسِئًا وَهُوَ حَسِيرٌ', english: 'Then return [your] vision twice again. [Your] vision will return to you humbled while it is fatigued.', transliteration: 'Thummar ji\'il basara karratayni yanqalib ilaykal basaru khaasi\'an wa huwa haseer' },
      { number: 5, arabic: 'وَلَقَدْ زَيَّنَّا السَّمَاءَ الدُّنْيَا بِمَصَابِيحَ وَجَعَلْنَاهَا رُجُومًا لِّلشَّيَاطِينِ ۖ وَأَعْتَدْنَا لَهُمْ عَذَابَ السَّعِيرِ', english: 'And We have certainly beautified the nearest heaven with lamps and have made [from] them what is thrown at the devils and have prepared for them the punishment of the Blaze.', transliteration: "Wa laqad zayyannas samaaa'ad dunyaa bimaswaabeeha wa ja'alnaahaa rujoomal lishshayaateen; wa a'tadnaa lahum 'adhaabas sa'eer" },
      { number: 6, arabic: 'وَلِلَّذِينَ كَفَرُوا بِرَبِّهِمْ عَذَابُ جَهَنَّمَ ۖ وَبِئْسَ الْمَصِيرُ', english: 'And for those who have disbelieved in their Lord is the punishment of Hell, and wretched is the destination.', transliteration: "Wa lilladheena kafaroo birabbihim 'adhaabu jahannam; wa bi'sal maseer" },
      { number: 7, arabic: 'إِذَا أُلْقُوا فِيهَا سَمِعُوا لَهَا شَهِيقًا وَهِيَ تَفُورُ', english: 'When they are thrown into it, they hear from it a [dreadful] inhaling while it boils up.', transliteration: 'Idhaaa ulqoo feehaa sami\'oo lahaa shaheeqan wa hiya tafoor' },
      { number: 8, arabic: 'تَكَادُ تَمَيَّزُ مِنَ الْغَيْظِ ۖ كُلَّمَا أُلْقِيَ فِيهَا فَوْجٌ سَأَلَهُمْ خَزَنَتُهَا أَلَمْ يَأْتِكُمْ نَذِيرٌ', english: 'It almost bursts with rage. Every time a company is thrown into it, its keepers ask them, "Did there not come to you a warner?"', transliteration: "Takaadu tamayyazu minal ghaydh; kullamaaa ulqiya feehaa fawjun sa'alahum khazanatuhaaa alam ya'tikum nadheer" },
      { number: 9, arabic: 'قَالُوا بَلَىٰ قَدْ جَاءَنَا نَذِيرٌ فَكَذَّبْنَا وَقُلْنَا مَا نَزَّلَ اللَّهُ مِن شَيْءٍ إِنْ أَنتُمْ إِلَّا فِي ضَلَالٍ كَبِيرٍ', english: 'They will say," Yes, a warner had come to us, but we denied and said, \' Allah has not sent down anything. You are not but in great error.\'"', transliteration: "Qaaloo balaa qad jaaa'anaa nadheerun fakadhdhabnaa wa qulnaa maa nazzalal laahu min shay'in in antum illaa fee dalaalin kabeer" },
      { number: 10, arabic: 'وَقَالُوا لَوْ كُنَّا نَسْمَعُ أَوْ نَعْقِلُ مَا كُنَّا فِي أَصْحَابِ السَّعِيرِ', english: 'And they will say, "If only we had been listening or reasoning, we would not be among the companions of the Blaze."', transliteration: "Wa qaaloo law kunnaa nasma'u aw na'qilu maa kunnaa feee as-haabis sa'eer" },
      { number: 11, arabic: 'فَاعْتَرَفُوا بِذَنبِهِمْ فَسُحْقًا لِّأَصْحَابِ السَّعِيرِ', english: 'And they will admit their sin, so [it is] alienation for the companions of the Blaze.', transliteration: "Fa'tarafoo bidhanbihim fasuhqal li as-haabis sa'eer" },
      { number: 12, arabic: 'إِنَّ الَّذِينَ يَخْشَوْنَ رَبَّهُم بِالْغَيْبِ لَهُم مَّغْفِرَةٌ وَأَجْرٌ كَبِيرٌ', english: 'Indeed, those who fear their Lord unseen will have forgiveness and great reward.', transliteration: 'Innal ladheena yakhshawna rabbahum bilghaybi lahum maghfiratun wa ajrun kabeer' },
      { number: 13, arabic: 'وَأَسِرُّوا قَوْلَكُمْ أَوِ اجْهَرُوا بِهِ ۖ إِنَّهُ عَلِيمٌ بِذَاتِ الصُّدُورِ', english: 'And conceal your speech or proclaim it; indeed, He is Knowing of that within the breasts.', transliteration: "Wa asirroo qawlakum awijharoo bih; innahoo 'aleemum bidhaatis sudoor" },
      { number: 14, arabic: 'أَلَا يَعْلَمُ مَنْ خَلَقَ وَهُوَ اللَّطِيفُ الْخَبِيرُ', english: 'Does He not know those whom He created, while He is the Subtle, the Acquainted?', transliteration: "Alaa ya'lamu man khalaqa wa huwal lateeful khabeer" },
      { number: 15, arabic: 'هُوَ الَّذِي جَعَلَ لَكُمُ الْأَرْضَ ذَلُولًا فَامْشُوا فِي مَنَاكِبِهَا وَكُلُوا مِن رِّزْقِهِ ۖ وَإِلَيْهِ النُّشُورُ', english: 'It is He who made the earth tame for you - so walk among its slopes and eat of His provision - and to Him is the resurrection.', transliteration: "Huwal ladhee ja'ala lakumul arda dhaloolan famshoo fee manaakibihaa wa kuloo mir rizqih; wa ilayhin nushoor" },
      { number: 16, arabic: 'أَأَمِنتُم مَّن فِي السَّمَاءِ أَن يَخْسِفَ بِكُمُ الْأَرْضَ فَإِذَا هِيَ تَمُورُ', english: 'Do you feel secure that He who [holds authority] in the heaven would not cause the earth to swallow you and suddenly it would sway?', transliteration: 'A-amintum man fissamaaa\'i any yakhsifa bikumul arda faidha hiya tamoor' },
      { number: 17, arabic: 'أَمْ أَمِنتُم مَّن فِي السَّمَاءِ أَن يُرْسِلَ عَلَيْكُمْ حَاصِبًا ۖ فَسَتَعْلَمُونَ كَيْفَ نَذِيرِ', english: 'Or do you feel secure that He who [holds authority] in the heaven would not send against you a storm of stones? Then you would know how [terrible] was My warning.', transliteration: "Am amintum man fissamaaa'i any yursila 'alaykum haasibaa; fasata'lamoona kayfa nadheer" },
      { number: 18, arabic: 'وَلَقَدْ كَذَّبَ الَّذِينَ مِن قَبْلِهِمْ فَكَيْفَ كَانَ نَكِيرِ', english: 'And already had those before them denied, and how [terrible] was My reproach.', transliteration: 'Wa laqad kadhdhabal ladheena min qablihim fakayfa kaana nakeer' },
      { number: 19, arabic: 'أَوَلَمْ يَرَوْا إِلَى الطَّيْرِ فَوْقَهُمْ صَافَّاتٍ وَيَقْبِضْنَ ۚ مَا يُمْسِكُهُنَّ إِلَّا الرَّحْمَٰنُ ۚ إِنَّهُ بِكُلِّ شَيْءٍ بَصِيرٌ', english: 'Do they not see the birds above them with wings outspread and [sometimes] folded in? None holds them up except the Most Merciful. Indeed, He is of all things Seeing.', transliteration: "Awalam yaraw ilat tayri fawqahum saaffaatiw wa yaqbidhn; maa yumsikuhunna illar rahmaan; innahoo bikulli shay'im baseer" },
      { number: 20, arabic: 'أَمَّنْ هَٰذَا الَّذِي هُوَ جُندٌ لَّكُمْ يَنصُرُكُم مِّن دُونِ الرَّحْمَٰنِ ۚ إِنِ الْكَافِرُونَ إِلَّا فِي غُرُورٍ', english: 'Or who is it that could be an army for you to aid you other than the Most Merciful? The disbelievers are not but in delusion.', transliteration: "Amman haadhal ladhee huwa jundul lakum yansurukum min doonir rahmaan; inil kaafiroona illaa fee ghuroor" },
      { number: 21, arabic: 'أَمَّنْ هَٰذَا الَّذِي يَرْزُقُكُمْ إِنْ أَمْسَكَ رِزْقَهُ ۚ بَل لَّجُّوا فِي عُتُوٍّ وَنُفُورٍ', english: 'Or who is it that could provide for you if He withheld His provision? But they have persisted in insolence and aversion.', transliteration: "Amman haadhal ladhee yarzuqukum in amsaka rizqah; bal lajjoo fee 'utuwwiw wa nufoor" },
      { number: 22, arabic: 'أَفَمَن يَمْشِي مُكِبًّا عَلَىٰ وَجْهِهِ أَهْدَىٰ أَمَّن يَمْشِي سَوِيًّا عَلَىٰ صِرَاطٍ مُّسْتَقِيمٍ', english: 'Then is one who walks fallen on his face better guided or one who walks erect on a straight path?', transliteration: "Afamay yamshee mukibban 'alaa wajhiheee ahdaaa ammay yamshee sawiyyan 'alaa siraatim mustaqeem" },
      { number: 23, arabic: 'قُلْ هُوَ الَّذِي أَنشَأَكُمْ وَجَعَلَ لَكُمُ السَّمْعَ وَالْأَبْصَارَ وَالْأَفْئِدَةَ ۖ قَلِيلًا مَّا تَشْكُرُونَ', english: 'Say, "It is He who has produced you and made for you hearing and vision and hearts; little are you grateful."', transliteration: "Qul huwal ladheee ansha'akum wa ja'ala lakumus sam'a wal absaara wal af'idah; qaleelam maa tashkuroon" },
      { number: 24, arabic: 'قُلْ هُوَ الَّذِي ذَرَأَكُمْ فِي الْأَرْضِ وَإِلَيْهِ تُحْشَرُونَ', english: 'Say, "It is He who has multiplied you throughout the earth, and to Him you will be gathered."', transliteration: 'Qul huwal ladhee dhara-akum fil ardi wa ilayhi tuhsharoon' },
      { number: 25, arabic: 'وَيَقُولُونَ مَتَىٰ هَٰذَا الْوَعْدُ إِن كُنتُمْ صَادِقِينَ', english: 'And they say, "When is this promise, if you should be truthful?"', transliteration: 'Wa yaqooloona mataa haadhal wa\'du in kuntum saadi qeen' },
      { number: 26, arabic: 'قُلْ إِنَّمَا الْعِلْمُ عِندَ اللَّهِ وَإِنَّمَا أَنَا نَذِيرٌ مُّبِينٌ', english: 'Say, "The knowledge is only with Allah, and I am only a clear warner."', transliteration: "Qul innamal 'ilmu 'indallaahi wa innamaaa ana nadheerum mubeen" },
      { number: 27, arabic: 'فَلَمَّا رَأَوْهُ زُلْفَةً سِيئَتْ وُجُوهُ الَّذِينَ كَفَرُوا وَقِيلَ هَٰذَا الَّذِي كُنتُم بِهِ تَدَّعُونَ', english: 'But when they see it approaching, the faces of those who disbelieve will be distressed, and it will be said, "This is that which you used to call for."', transliteration: "Falammaa ra-awhu zulfatan seee'at wujoohul ladheena kafaroo wa qeela haadhal ladhee kuntum bihee tadda'oon" },
      { number: 28, arabic: 'قُلْ أَرَأَيْتُمْ إِنْ أَهْلَكَنِيَ اللَّهُ وَمَن مَّعِيَ أَوْ رَحِمَنَا فَمَن يُجِيرُ الْكَافِرِينَ مِنْ عَذَابٍ أَلِيمٍ', english: 'Say, "Have you considered: whether Allah should cause my death and those with me or have mercy upon us, who can protect the disbelievers from a painful punishment?"', transliteration: "Qul ara-aytum in ahlakaniyal laahu wa mam ma'iya aw rahimanaa famany yujeerul kaafireena min 'adhaabin aleem" },
      { number: 29, arabic: 'قُلْ هُوَ الرَّحْمَٰنُ آمَنَّا بِهِ وَعَلَيْهِ تَوَكَّلْنَا ۖ فَسَتَعْلَمُونَ مَنْ هُوَ فِي ضَلَالٍ مُّبِينٍ', english: 'Say, "He is the Most Merciful; we have believed in Him, and upon Him we have relied. And you will [come to] know who it is that is in clear error."', transliteration: "Qul huwar rahmaanu aamannaa bihee wa 'alayhi tawakkalnaa; fasata'lamoona man huwa fee dalaalim mubeen" },
      { number: 30, arabic: 'قُلْ أَرَأَيْتُمْ إِنْ أَصْبَحَ مَاؤُكُمْ غَوْرًا فَمَن يَأْتِيكُم بِمَاءٍ مَّعِينٍ', english: 'Say, "Have you considered: if your water was to become sunken [into the earth], who could then bring you flowing water?"', transliteration: "Qul ara-aytum in as-baha maaa'ukum ghawran famany ya'teekum bimaaa'im ma'een" }
    ]
  }
];
