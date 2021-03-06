var database = require('./database');
var Book = database.Book;

new Book({name: 'Genesis', cname: '創世記', shortName: 'Gen', amount: 50, order: 1}).save();
new Book({name: 'Exodus', cname: '出埃及記', shortName: 'Exo', amount: 40, order: 2}).save();
new Book({name: 'Leviticus', cname: '利未記', shortName: 'Lev', amount: 27, order: 3}).save();
new Book({name: 'Numbers', cname: '民數記', shortName: 'Num', amount: 36, order: 4}).save();
new Book({name: 'Deuteronomy', cname: '申命記', shortName: 'Deu', amount: 34, order: 5}).save();
new Book({name: 'Joshua', cname: '約書亞記', shortName: 'Jos', amount: 24, order: 6}).save();
new Book({name: 'Judges', cname: '士師記', shortName: 'Jug', amount: 21, order: 7}).save();
new Book({name: 'Ruth', cname: '路得記', shortName: 'Rut', amount: 4, order: 8}).save();
new Book({name: '1 Samuel', cname: '撒母耳記上', shortName: '1Sa', amount: 31, order: 9}).save();
new Book({name: '2 Samuel', cname: '撒母耳記下', shortName: '2Sa', amount: 24, order: 10}).save();
new Book({name: '1Kings', cname: '列王紀上', shortName: '1Ki', amount: 22, order: 11}).save();
new Book({name: '2Kings', cname: '列王紀下', shortName: '2Ki', amount: 25, order: 12}).save();
new Book({name: '1 Chronicles', cname: '歷代志上', shortName: '1Ch', amount: 29, order: 13}).save();
new Book({name: '2 Chronicles', cname: '歷代志下', shortName: '2Ch', amount: 36, order: 14}).save();
new Book({name: 'Ezra', cname: '以斯拉記', shortName: 'Ezr', amount: 10, order: 15}).save();
new Book({name: 'Nehemiah', cname: '尼希米記', shortName: 'Neh', amount: 13, order: 16}).save();
new Book({name: 'Esther', cname: '以斯帖記', shortName: 'Est', amount: 10, order: 17}).save();
new Book({name: 'Job', cname: '約伯記', shortName: 'Job', amount: 42, order: 18}).save();
new Book({name: 'Psalms', cname: '詩篇', shortName: 'Psm', amount: 150, order: 19}).save();
new Book({name: 'Proverbs', cname: '箴言', shortName: 'Pro', amount: 31, order: 20}).save();


new Book({name: 'Ecclesiastes', cname: '傳道書', shortName: 'Eccl', amount: 12, order: 21}).save();
new Book({name: 'Song of Solomon', cname: '雅歌', shortName: 'Song', amount: 8, order: 22}).save();
new Book({name: 'Isaiah', cname: '以賽亞書', shortName: 'Is', amount: 66, order: 23}).save();
new Book({name: 'Jeremiah', cname: '耶利米書', shortName: 'Jer', amount: 52, order: 24}).save();
new Book({name: 'Lamentations', cname: '耶利米哀歌', shortName: 'Lam', amount: 5, order: 25}).save();
new Book({name: 'Ezekiel', cname: '以西結書', shortName: 'Ezek', amount: 48, order: 26}).save();
new Book({name: 'Daniel', cname: '但以理書', shortName: 'Dan', amount: 12, order: 27}).save();
new Book({name: 'Hosea', cname: '何西阿書', shortName: 'Hos', amount: 14, order: 28}).save();
new Book({name: 'Joel', cname: '約珥書', shortName: 'Joe', amount: 3, order: 29}).save();
new Book({name: 'Amos', cname: '阿摩司書', shortName: 'Amos', amount: 9, order: 30}).save();
new Book({name: 'Obadiah', cname: '俄巴底亞書', shortName: 'Obad', amount: 1, order: 31}).save();
new Book({name: 'Jonah', cname: '約拿書', shortName: 'Jon', amount: 4, order: 32}).save();
new Book({name: 'Micah', cname: '彌迦書', shortName: 'Mic', amount: 7, order: 33}).save();
new Book({name: 'Nahum', cname: '那鴻書', shortName: 'Nah', amount: 3, order: 34}).save();
new Book({name: 'Habakkuk', cname: '哈巴谷書', shortName: 'Hab', amount: 3, order: 35}).save();
new Book({name: 'Zephaniah', cname: '西番雅書', shortName: 'Zeph', amount: 3, order: 36}).save();
new Book({name: 'Haggai', cname: '哈該書', shortName: 'Hag', amount: 2, order: 37}).save();
new Book({name: 'Zechariah', cname: '撒迦利亞書', shortName: 'Zech', amount: 14, order: 38}).save();
new Book({name: 'Malachi', cname: '瑪拉基書', shortName: 'Mal', amount: 4, order: 39}).save();
new Book({name: 'Matthew', cname: '馬太福音', shortName: 'Matt', amount: 28, order: 40}).save();


new Book({name: 'Mark', cname: '馬可福音', shortName: 'Mak', amount: 16, order: 41}).save();
new Book({name: 'Luke', cname: '路加福音', shortName: 'Luk', amount: 24, order: 42}).save();
new Book({name: 'John', cname: '約翰福音', shortName: 'Jhn', amount: 21, order: 43}).save();
new Book({name: 'Acts', cname: '使徒行傳', shortName: 'Act', amount: 28, order: 44}).save();
new Book({name: 'Romans', cname: '羅馬書', shortName: 'Rom', amount: 16, order: 45}).save();
new Book({name: '1 Corinthians', cname: '哥林多前書', shortName: '1Co', amount: 16, order: 46}).save();
new Book({name: '2 Corinthians', cname: '哥林多後書', shortName: '2Co', amount: 13, order: 47}).save();
new Book({name: 'Galatians', cname: '加拉太書', shortName: 'Gal', amount: 6, order: 48}).save();
new Book({name: 'Ephesians', cname: '以弗所書', shortName: 'Eph', amount: 6, order: 49}).save();
new Book({name: 'Philippians', cname: '腓利比書', shortName: 'Phl', amount: 4, order: 50}).save();
new Book({name: 'Colossians', cname: '歌羅西書', shortName: 'Col', amount: 4, order: 51}).save();
new Book({name: '1 Thessalonians', cname: '帖撒羅尼迦前書', shortName: '1Ts', amount: 5, order: 52}).save();
new Book({name: '2 Thessalonians', cname: '帖撒羅尼迦後書', shortName: '2Ts', amount: 3, order: 53}).save();
new Book({name: '1 Timothy', cname: '提摩太前書', shortName: '1Ti', amount: 6, order: 54}).save();
new Book({name: '2 Timothy', cname: '提摩太後書', shortName: '2Ti', amount: 4, order: 55}).save();
new Book({name: 'Titus', cname: '提多書', shortName: 'Tit', amount: 3, order: 56}).save();
new Book({name: 'Philemon', cname: '腓利門書', shortName: 'Phm', amount: 1, order: 57}).save();
new Book({name: 'Hebrews', cname: '希伯來書', shortName: 'Heb', amount: 13, order: 58}).save();
new Book({name: 'James', cname: '雅各書', shortName: 'Jas', amount: 5, order: 59}).save();
new Book({name: '1 Peter', cname: '彼得前書', shortName: '1Pe', amount: 5, order: 60}).save();
new Book({name: '2 Peter', cname: '彼得後書', shortName: '2Pe', amount: 3, order: 61}).save();
new Book({name: '1 John', cname: '約翰壹書', shortName: '1Jn', amount: 5, order: 62}).save();

new Book({name: '2 John', cname: '約翰貳書', shortName: '2Jn', amount: 1, order: 63}).save();
new Book({name: '3 John', cname: '約翰參書', shortName: '3Jn', amount: 1, order: 64}).save();
new Book({name: 'Jude', cname: '猶大書', shortName: 'Jud', amount: 1, order: 65}).save();
new Book({name: 'Revelation', cname: '啟示錄', shortName: 'Rev', amount: 22, order: 66}).save();
