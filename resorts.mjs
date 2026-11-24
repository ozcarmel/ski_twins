// Sources reviewed 2026-11-23. Popularity metrics and editorial suitability are separate.
// France: published skier-day ranking; Austria: municipal winter nights; Italy: editorial shortlist.
const r=(key,country,name,he,apres,groups,terrain,terrainHe,evening,eveningHe,url,source,rate)=>({key,country,name,he,apres,groups,terrain:{en:terrain,he:terrainHe},evening:{en:evening,he:eveningHe},url,source,rate});
export const RESORTS=[
 r('livigno','italy','Livigno','ליביניו','social',['friends','couple','family'],'Two main ski areas in a high Alpine valley.','שני אזורי גלישה עיקריים בעמק אלפיני.','Stalet for afternoon music; bars and Bivio Club in town.','מוזיקה אחר הצהריים ב־Stalet, ברים ו־Bivio Club בעיירה.','https://www.livigno.eu/','https://www.livigno.eu/en/livigno-by-night',{stay:170,pass:65,rental:25,travel:300,food:45,extras:160}),
 r('val-gardena','italy','Val Gardena','ואל גרדנה','social',['couple','friends','family'],'Dolomite skiing with access to the Sellaronda circuit; choose your village carefully.','גלישה בדולומיטים וגישה למסלול הסלה רונדה; חשוב לבחור באיזה כפר ללון.','Mountain huts, South Tyrolean food, wine and village bars.','בקתות הרים, אוכל דרום־טירולי, יין וברים בכפרים.','https://www.valgardena.it/en/','https://www.valgardena.it/en/winter-holidays-dolomites/huts-apres-ski/',{stay:210,pass:80,rental:28,travel:300,food:50,extras:170}),
 r('campiglio','italy','Madonna di Campiglio','מדונה די קמפיליו','party',['couple','friends','family'],'A base in the linked Campiglio, Folgarida-Marilleva and Pinzolo ski area.','בסיס במרחב המקושר קמפיליו, פולגרידה־מרילבה ופינצולו.','Super G offers après-ski and evening events; check the programme for your dates.','Super G מציע אפרה־סקי ואירועי ערב; בדקו את התכנית לתאריכים שלכם.','https://www.campigliodolomiti.it/en','https://lovesuperg.com/campiglio/',{stay:230,pass:80,rental:30,travel:320,food:55,extras:180}),
 r('ischgl','austria','Ischgl','אישגל','party',['friends','couple'],'Silvretta Arena links Ischgl with Samnaun in Switzerland.','סילברטה ארנה מחברת את אישגל לסמנאון בשווייץ.','Après-ski is a core part of the trip: slope-side venues, village bars and clubs.','האפרה־סקי הוא חלק מרכזי בחופשה: מקומות ליד המסלולים, ברים ומועדונים בעיירה.','https://www.ischgl.com/en','https://www.ischgl.com/en/plan-your-trip/ischgl-a-z/fire-ice-bar_infra_100002911',{stay:240,pass:80,rental:30,travel:300,food:50,extras:180}),
 r('saalbach','austria','Saalbach-Hinterglemm','זאלבך־הינטרגלם','party',['friends','couple','family'],'A base in Skicircus with nursery areas and many options for progressing beginners and intermediates. Some valley runs are steeper.','בסיס במרחב סקיסירקוס עם אזורי לימוד ומבחר למתחילים מתקדמים ולבינוניים. חלק מהירידות לעמק תלולות יותר.','Goaßstall, Hinterhag Alm and Der Schwarzacher offer lively après-ski. Choose accommodation near your evening base.','Goaßstall, Hinterhag Alm ו־Der Schwarzacher מציעים אפרה־סקי תוסס. בחרו לינה ליד מוקד הבילוי שלכם.','https://www.saalbach.com/en','https://www.saalbach.com/en/winter/apres-ski',{stay:210,pass:80,rental:30,travel:300,food:50,extras:180}),
 r('soelden','austria','Sölden','זולדן','party',['friends','couple'],'An Ötztal ski destination with glacier sectors.','יעד גלישה בעמק אֶצְטאל, עם אזורי קרחון.','A full nightlife scene: après-ski bars, pubs and clubs in town.','סצנת בילויים שלמה: ברי אפרה־סקי, פאבים ומועדונים בעיירה.','https://www.soelden.com/en','https://www.soelden.com/en/region-villages/nightlife-apre-ski',{stay:200,pass:75,rental:28,travel:300,food:45,extras:170}),
 r('val-thorens','france','Val Thorens','ואל טורנס','party',['friends','couple'],'High-altitude base in Les 3 Vallées; local and wider-area passes differ.','בסיס גבוה במרחב שלושת העמקים; יש הבדל בין פס מקומי לפס למרחב המלא.','La Folie Douce brings mountain-terrace shows and après-ski to the ski day.','La Folie Douce משלבת הופעות ואפרה־סקי על מרפסת בהר.','https://www.valthorens.com/en/','https://www.valthorens.com/en/equipement/la-folie-douce-val-thorens/',{stay:210,pass:80,rental:28,travel:330,food:50,extras:180}),
 r('la-plagne','france','La Plagne','לה פלאן','quiet',['friends','couple','family'],'Several village bases in Paradiski, linked to Les Arcs. Choose the village and lift-pass coverage together.','מספר כפרי בסיס במרחב פאראדיסקי, המחובר ללה זארק. בחרו יחד את הכפר ואת היקף הסקי־פס.','Our quieter pick: village restaurants, terraces and activities. Evening atmosphere varies by village.','הבחירה שלנו לערב רגוע יותר: מסעדות, מרפסות ופעילויות בכפרים. האווירה משתנה לפי הכפר.','https://en.la-plagne.com/','https://en.la-plagne.com/belle-plagne',{stay:190,pass:75,rental:28,travel:330,food:45,extras:170}),
 r('les-arcs','france','Les Arcs–Peisey-Vallandry','לה זארק–פייזי־ואלנדרי','party',['friends','couple','family'],'Part of Paradiski, linked to La Plagne. Arc 1800 is a useful base when evening atmosphere matters.','חלק מפאראדיסקי, המחובר ללה פלאן. Arc 1800 הוא בסיס שכדאי לבדוק כשאווירת הערב חשובה.','La Folie Douce at Arc 1800 brings music and performances; other villages have different evening profiles.','La Folie Douce ב־Arc 1800 מציעה מוזיקה והופעות; בכפרים האחרים אופי הערב שונה.','https://www.lesarcs.com/en','https://www.lesarcs.com/en/stay/all-shops-and-restaurants/la-folie-douce-des-arcs',{stay:210,pass:80,rental:28,travel:330,food:50,extras:180}),
 r('bansko','bulgaria','Bansko','בנסקו','social',['family','friends','couple'],'A mountain base beside an established town. Compare total transfer and lift costs.','בסיס הררי לצד עיירה ותיקה. השוו גם העברות ועלויות מעליות.','Town restaurants and bars; compare the specific area around your accommodation.','מסעדות וברים בעיירה; בדקו את האזור הספציפי סביב מקום הלינה.','https://www.banskoski.com/en','https://www.banskoski.com/en',{stay:100,pass:45,rental:18,travel:240,food:25,extras:130}),
 r('poiana','romania','Poiana Brașov','פואיאנה בראשוב','quiet',['family','couple'],'A more compact ski holiday, with Brașov as an option for time off the mountain.','חופשת גלישה במרחב קומפקטי יותר, עם בראשוב כאפשרות ליום מחוץ להר.','Our planning focus here is dinners and quieter evenings; check transport if going into Brașov.','הדגש שלנו כאן הוא ארוחות וערבים רגועים; בדקו תחבורה אם יוצאים לבראשוב.','https://www.discoverpoiana.ro/','https://agerpres.ro/english/2026/01/03/poiana-brasov-ski-season-kicks-off--1516292',{stay:90,pass:40,rental:18,travel:240,food:23,extras:120}),
 r('gudauri','georgia','Gudauri','גודאורי','social',['friends','couple','family'],'Caucasus skiing: weigh transfer conditions and accommodation location alongside price.','גלישה בקווקז: שקלו גם את תנאי ההעברה ומיקום הלינה לצד המחיר.','Après-ski venues exist here too; a value-focused trip does not have to mean quiet evenings.','יש גם כאן מקומות אפרה־סקי; חופשה חסכונית אינה בהכרח חופשה שקטה.','https://mta.ski/en/resorts/gudauri-kobi','https://mta.ski/en/resorts/gudauri-kobi',{stay:100,pass:30,rental:18,travel:300,food:23,extras:130}),
 r('pila','italy','Pila','פילה','quiet',['family','couple'],'A smaller Alpine alternative, linked to Aosta by gondola. Check current operating times.','חלופה אלפינית קטנה יותר, המקושרת לאאוסטה בגונדולה. בדקו שעות פעילות עדכניות.','Our pick for a ski-first, quieter trip; plan the return journey if dining in Aosta.','הבחירה שלנו לחופשה רגועה עם דגש על גלישה; תכננו חזרה אם יוצאים לאכול באאוסטה.','https://pila.it/en/','https://pila.it/en/ski-area/timetable/',{stay:120,pass:55,rental:22,travel:300,food:35,extras:140})
, r("cervinia","italy","Cervinia–Zermatt","צ׳רביניה–צרמט","social",["couple", "friends", "family"],"Base in Cervinia for the cross-border Matterhorn area. An international pass is needed; check wind and connection times.","לינה בצ׳רביניה וגישה למרחב מטרהורן החוצה לשווייץ. נדרש פס בינלאומי; בדקו רוח ושעות קישור.","Plan village dinners and bars; confirm venues for your dates.","תכננו ארוחות וברים בכפר ובדקו מקומות לתאריכים שלכם.","https://cervinia.it/en","https://cervinia.it/en",{"stay": 185, "pass": 90, "rental": 28, "travel": 310, "food": 45, "extras": 170}),
 r("sestriere","italy","Sestriere · Vialattea","ססטרייר · ויה לאטאה","social",["couple", "friends", "family"],"Sestriere is a base in the linked Vialattea area spanning Italy and France. Check pass coverage and cross-border connections.","ססטרייר היא בסיס במרחב ויה לאטאה המקושר בין איטליה לצרפת. בדקו כיסוי פס וקישורים בין המדינות.","Plan village restaurants and bars around your accommodation.","תכננו מסעדות וברים סביב מקום הלינה שלכם.","https://www.vialattea.it/en/","https://www.vialattea.it/en/",{"stay": 165, "pass": 65, "rental": 25, "travel": 300, "food": 40, "extras": 160}),
 r("st-anton","austria","St. Anton · Ski Arlberg","סנט אנטון · סקי ארלברג","party",["couple", "friends"],"A base in linked Ski Arlberg. First-timers should select a suitable learning area with their ski school.","בסיס במרחב סקי ארלברג המקושר. מתחילים ממש צריכים לבחור אזור לימוד מתאים עם בית הספר.","Lively après-ski around venues such as MooserWirt and Krazy Kanguruh. Plan a safe return to your accommodation.","אפרה־סקי תוסס במקומות כמו MooserWirt ו־Krazy Kanguruh. תכננו חזרה בטוחה ללינה.","https://www.skiarlberg.at/en","https://www.stantonamarlberg.com/de/events/winter/schlagerliebe-open-air",{"stay": 235, "pass": 85, "rental": 30, "travel": 310, "food": 50, "extras": 180}),
 r("les-contamines","france","Les Contamines–Hauteluce","לה קונטמין–אוטלוס","quiet",["family", "couple", "friends"],"The local linked area only: do not add the separate resorts on the Evasion Mont-Blanc pass.","המרחב המקומי המקושר בלבד; אין לצרף אתרים נפרדים הכלולים בפס Evasion Mont-Blanc.","Our quieter planning option: village meals and a relaxed evening. Check venue opening times.","אפשרות התכנון שלנו לערב רגוע: ארוחה בכפר ומנוחה. בדקו שעות פתיחה.","https://www.lescontamines.com/winter/ski/alpine-ski-domain","https://www.lescontamines.com/winter/ski/alpine-ski-domain",{"stay": 125, "pass": 55, "rental": 23, "travel": 300, "food": 35, "extras": 140}),
 r("brandnertal","austria","Brandnertal","ברנדנרטל","quiet",["family", "couple"],"The linked Brand and Bürserberg ski area; no summing of other resorts covered by regional passes.","המרחב המקושר של בראנד ובירסרברג; ללא צירוף אתרים אחרים מפסים אזוריים.","A quieter village base; check night sledding and restaurant schedules.","בסיס כפרי רגוע יותר; בדקו שעות מסעדות ופעילויות מזחלות ערב.","https://www.brandnertal.at/brandnertal/en/our-cable-cars/bergbahnen-brandnertal","https://www.brandnertal.at/brandnertal/en/our-cable-cars/bergbahnen-brandnertal",{"stay": 130, "pass": 60, "rental": 24, "travel": 300, "food": 35, "extras": 140}),
 r("grimentz-zinal","switzerland","Grimentz–Zinal","גרימנץ–זינאל","quiet",["family", "couple", "friends"],"The two villages are connected by cable car. Size qualifies for this track; Swiss trip costs still need comparing.","שני הכפרים מחוברים ברכבל. הגודל מתאים למסלול הזה; עדיין יש להשוות את עלות החופשה בשווייץ.","Our quieter planning option: village restaurants rather than a party-led itinerary.","אפשרות התכנון שלנו לערבים רגועים במסעדות הכפר.","https://www.valais.ch/en/explore/activities/ski-snowboard/ski-areas/zinal","https://www.valais.ch/en/explore/activities/ski-snowboard/ski-areas/zinal",{"stay": 155, "pass": 75, "rental": 30, "travel": 320, "food": 50, "extras": 160})
];
export const countries={he:{all:'כל המדינות',italy:'איטליה',austria:'אוסטריה',france:'צרפת',bulgaria:'בולגריה',romania:'רומניה',georgia:'גאורגיה',switzerland:'שווייץ'},en:{all:'All countries',italy:'Italy',austria:'Austria',france:'France',bulgaria:'Bulgaria',romania:'Romania',georgia:'Georgia',switzerland:'Switzerland'}};
export const SIZE_LIMIT_KM=200;
export const engineForKm=km=>Number.isFinite(km)&&km>0?(km>SIZE_LIMIT_KM?'alpine':'value'):null;
export const catalog=engine=>RESORTS.filter(r=>engineForKm(r.pisteKm)===engine);
export const resortName=(r,lang)=>lang==='he'?r.he:r.name;

export const REVIEW_DATE='2026-11-24';
const evidence={
 livigno:{metric:'firstEntries',value:1315000,season:'2024/25',scope:{he:'ליביניו; יותר מהמספר המוצג',en:'Livigno; more than the displayed figure'},url:'https://www.skipasslivigno.com/it/news/livigno-skipassion-chiude-una-stagione-da-record-oltre-1315-milioni-di-primi-ingressi-e-192-milioni-di-passaggi-e-la-localita-n-1-in-lombardia-per-affluenza/'},
 'val-gardena':{metric:'editorial',scope:{he:'לא אומת דירוג ארצי לפי נפח גלישה',en:'No national skier-volume rank verified'},url:'https://www.valgardena.it/en/winter-holidays-dolomites/ski-resort-val-gardena/'},
 campiglio:{metric:'firstEntries',value:1457666,season:'2024/25',scope:{he:'קמפיליו בלבד; לא כל המרחב המקושר',en:'Campiglio only; not the whole linked ski area'},url:'https://www.ski.it/ski/documenti-file/pagine-di-dettaglio/pagine-istituzionali/pinzolo/trasparenza/bilanci/Bilancio%20al%2030%20aprile%202025.pdf'},
 soelden:{metric:'winterNights',value:2124067,season:'2025/26'},ischgl:{metric:'winterNights',value:1396444,season:'2025/26'},
 saalbach:{metric:'winterNights',value:1444514,season:'2025/26',url:'https://www.salzburg.gv.at/fileadmin/Dateien/Statistik/Tourismus/statistik-Tourismus-SaisonWinter2026.pdf'},
 'la-plagne':{metric:'skierDays',value:2700000,season:'2025/26',rank:1,scope:{he:'לה פלאן; נתון מעוגל שמסר היעד',en:'La Plagne; rounded figure supplied by the resort'}},
 'les-arcs':{metric:'skierDays',value:2613694,season:'2025/26',rank:2,scope:{he:'לה זארק ופייזי־ואלנדרי יחד',en:'Les Arcs and Peisey-Vallandry combined'}},
 'val-thorens':{metric:'skierDays',value:2056244,season:'2025/26',rank:3,scope:{he:'ואל טורנס ואורל יחד',en:'Val Thorens and Orelle combined'}}
};
const fit={livigno:[3,3,3],'val-gardena':[2,3,3],campiglio:[2,3,3],ischgl:[1,3,2],saalbach:[3,3,3],soelden:[2,3,2],'val-thorens':[2,3,2],'la-plagne':[3,3,3],'les-arcs':[2,3,3],bansko:[2,3,2],poiana:[3,2,3],gudauri:[2,3,2],pila:[3,3,3]};
const areas={
 "livigno": [
  115,
  "Livigno (two sides; ski bus)",
  "ליביניו (שני צדדים; מעבר בסקי־בס)",
  "https://www.livigno.eu/en/slopes"
 ],
 "val-gardena": [
  500,
  "Sellaronda linked area from Val Gardena",
  "מרחב הסלה רונדה המקושר מוואל גרדנה",
  "https://www.valgardena.it/en/winter-holidays-dolomites/ski-resort-val-gardena/"
 ],
 "campiglio": [
  155,
  "Campiglio–Folgarida–Marilleva–Pinzolo",
  "קמפיליו–פולגרידה–מרילבה–פינצולו",
  "https://www.ski.it/en"
 ],
 "ischgl": [
  239,
  "Silvretta Arena Ischgl–Samnaun",
  "סילברטה ארנה אישגל–סמנאון",
  "https://www.ischgl.com/en/winter/silvretta-arena"
 ],
 "saalbach": [
  270,
  "Skicircus",
  "סקיסירקוס",
  "https://www.saalbach.com/en/winter/ski-resort"
 ],
 "soelden": [
  144,
  "Sölden including glaciers",
  "זולדן כולל הקרחונים",
  "https://bergbahnen.soelden.com/en/about-us/business-areas/mountain-railways-ski-area"
 ],
 "val-thorens": [
  600,
  "Les 3 Vallées (full-area pass)",
  "שלושת העמקים (פס למרחב המלא)",
  "https://www.les3vallees.com/en/guide/the-world-s-largest-ski-area"
 ],
 "la-plagne": [
  425,
  "Paradiski (full-area pass)",
  "פאראדיסקי (פס למרחב המלא)",
  "https://paradiski.com/en/"
 ],
 "les-arcs": [
  425,
  "Paradiski (full-area pass)",
  "פאראדיסקי (פס למרחב המלא)",
  "https://paradiski.com/en/"
 ],
 "bansko": [
  75,
  "Bansko",
  "בנסקו",
  "https://www.banskoski.com/storage/files/1/pdf/Map-info.pdf"
 ],
 "poiana": [
  24.5,
  "Poiana Brașov",
  "פואיאנה בראשוב",
  "https://www.brasovcity.ro/file-zone/regulamente/ski/Regulament%20privind%20conduita%20schiorilor-snowboarderilor%20pe%20domeniul%20schiabil.pdf"
 ],
 "gudauri": [
  86,
  "Gudauri–Kobi (2026/27 published area)",
  "גודאורי–קובי (היקף מפורסם לעונת 2026/27)",
  "https://mta.ski/en/resorts/gudauri-kobi"
 ],
 "pila": [
  70,
  "Pila",
  "פילה",
  "https://pila.it/en/ski-area/"
 ],
 "cervinia": [
  350,
  "Cervinia–Valtournenche–Zermatt (international pass)",
  "צ׳רביניה–ולטורננש–צרמט (פס בינלאומי)",
  "https://cervinia.it/en/promo/winter-promo-2026-2027"
 ],
 "sestriere": [
  400,
  "Vialattea (international area)",
  "ויה לאטאה (המרחב הבינלאומי)",
  "https://www.vialattea.it/en/news/the-ski-slopes-in-sestriere/"
 ],
 "st-anton": [
  301,
  "Ski Arlberg",
  "סקי ארלברג",
  "https://www.skiarlberg.at/en"
 ],
 "les-contamines": [
  120,
  "Les Contamines–Hauteluce",
  "לה קונטמין–אוטלוס",
  "https://www.lescontamines.com/winter/ski/alpine-ski-domain"
 ],
 "brandnertal": [
  64.4,
  "Brand–Bürserberg",
  "בראנד–בירסרברג",
  "https://www.brandnertal.at/brandnertal/en/our-cable-cars/bergbahnen-brandnertal"
 ],
 "grimentz-zinal": [
  115,
  "Grimentz–Zinal",
  "גרימנץ–זינאל",
  "https://www.valais.ch/en/explore/activities/ski-snowboard/ski-areas/zinal"
 ]
};
for(const resort of RESORTS){
 const [pisteKm,en,he,areaSource]=areas[resort.key];
 Object.assign(resort,{pisteKm,area:{en,he},areaSource,areaReviewed:REVIEW_DATE,engine:engineForKm(pisteKm)});
 const [beginner,intermediate,mixed]=fit[resort.key]||[resort.key==='st-anton'?1:2,3,2];resort.suitability={beginner,intermediate,mixed,advanced:2};
 resort.popularity=evidence[resort.key]||null;
 if(resort.country==='austria'&&resort.popularity)Object.assign(resort.popularity,{scope:{he:'לינות ברשות המקומית, כולל מי שאינם גולשים',en:'Municipal overnight stays, including non-skiers'},url:resort.popularity.url||'https://statistik.tirol.gv.at/tourismus_winter_2026_tabellen/index.html'});
 if(resort.country==='france'&&resort.popularity)resort.popularity.url='https://www.alti-mag.com/alti-guide/top-30-des-stations-de-ski-en-france';
 resort.linkedArea=['la-plagne','les-arcs'].includes(resort.key)?'paradiski':resort.key;
}
export const metricLabels={he:{skierDays:'ימי גלישה',winterNights:'לינות חורף',firstEntries:'כניסות ראשונות יומיות',editorial:'בחירה מערכתית'},en:{skierDays:'Skier days',winterNights:'Winter overnight stays',firstEntries:'Daily first entries',editorial:'Editorial selection'}};
export const levelLabels={he:{beginner:'מתחילים',intermediate:'בינוניים',advanced:'מתקדמים',mixed:'קבוצה ברמות שונות'},en:{beginner:'Beginners',intermediate:'Intermediates',advanced:'Advanced',mixed:'Mixed ability'}};
export const fitLabels={he:{1:'דורש תכנון זהיר של אזור הלימוד',2:'אפשרות טובה עם בחירת אזור מתאים',3:'אחת הבחירות המועדפות שלנו'},en:{1:'Plan the learning area carefully',2:'A good option with the right area',3:'One of our preferred options'}};
