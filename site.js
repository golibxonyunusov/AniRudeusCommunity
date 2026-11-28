/* ============================================================
   IT-Community — umumiy skript: qorong'i/yorug' rejim + til (UZ/EN)
   Har bir sahifaning <head> qismiga, theme.css'dan KEYIN ulang:
     <script src="site.js"></script>
   Keyin:
   - matnlarga  data-i18n="kalit"  (placeholder uchun data-i18n-placeholder)
   - JS ichida  IC.t('kalit')
   - sahifaga xos matnlar:  IC.extend({ uz:{...}, en:{...} })
   .nav-right bor sahifalarda til va rejim tugmalari o'zi qo'shiladi.
   ============================================================ */
(function () {
  var LS_THEME = 'ic_theme', LS_LANG = 'ic_lang';
  var root = document.documentElement;

  function get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  var theme = 'dark'; // yorug' rejim olib tashlandi — sayt faqat qorong'i
  var lang = get(LS_LANG) === 'en' ? 'en' : 'uz';
  // Sahifa chizilishidan oldin qo'yamiz — "yaltirash" bo'lmasligi uchun
  root.setAttribute('data-theme', theme);
  root.lang = lang;

  var DICT = {
    uz: {
      'doc.title': "Chat — IT-Community",
      'nav.home': "Home", 'nav.chat': "Chat", 'nav.web': "Web", 'nav.game': "Game", 'nav.help': "Help",
      'nav.orders': "Buyurtmalar", 'nav.works': "Ishlarim",
      'nav.login': "Kirish", 'nav.logout': "Chiqish", 'nav.profileTip': "Profilni ko'rish",
      'tool.themeToLight': "Yorug' rejimga o'tish", 'tool.themeToDark': "Qorong'i rejimga o'tish",
      'tool.lang': "Tilni o'zgartirish (UZ / EN)",
      'side.groups': "Guruhlar", 'side.people': "Odamlar", 'side.tools': "Vositalar",
      'side.search': "Nickname qidirish...", 'side.ai': "🤖 AI yordamchi",
      'group.prefix': "Guruh: ", 'group.main': "Asosiy", 'group.mainBtn': "💬 Asosiy guruh",
      'field.web': "Web dasturchilar", 'field.designer': "Dizaynerlar", 'field.app': "App dasturchilar",
      'field.gamer': "Gamerlar", 'field.streamer': "Streamerlar", 'field.other': "Boshqa dasturchilar",
      'mode.chat': "💬 Matnli chat", 'mode.video': "🎥 Video chat",
      'chat.placeholder': "Xabar yozing...", 'chat.send': "Yuborish", 'chat.loading': "Yuklanmoqda...",
      'chat.empty': "💬 Bu yerda hali xabar yo'q — birinchi bo'lib salom bering.",
      'chat.loadError': "Xabarlarni yuklab bo'lmadi", 'chat.rulesHint': "Firestore qoidalarini tekshiring.",
      'chat.user': "Foydalanuvchi", 'chat.delete': "O'chirish",
      'chat.sendFail': "Xabar yuborilmadi: ", 'chat.delFail': "O'chirib bo'lmadi: ",
      'chat.dmFail': "Suhbatni ochib bo'lmadi: ",
      'video.note': "🎥 Guruh video-chati — shu havolani biladigan har kim qo'shilishi mumkin. Kamera/mikrofon uchun brauzer ruxsat so'raydi.",
      'people.write': "Yozish", 'people.none': "Hech kim topilmadi.", 'people.err': "Qidirishda xato: ",
      'ai.title': "🤖 AI Yordamchi",
      'ai.empty': "👋 Salom! Savolingizni yozing — dasturlash, sayt, yoki umuman nimadir bo'yicha yordam bera olaman.",
      'ai.placeholder': "Savolingizni yozing...", 'ai.typing': "Yozyapti...",
      'ai.err': "Kechirasiz, AI hozircha javob bera olmadi. Birozdan keyin qayta urinib ko'ring.",
      'ai.rate': "Hozir so'rovlar ko'p, bir daqiqadan keyin qayta urinib ko'ring.",
      'ai.notSet': "AI hali sozlanmagan: index.html ichidagi AI_PROXY_URL ga Worker manzilini yozing."
    },
    en: {
      'doc.title': "Chat — IT-Community",
      'nav.home': "Home", 'nav.chat': "Chat", 'nav.web': "Web", 'nav.game': "Game", 'nav.help': "Help",
      'nav.orders': "Orders", 'nav.works': "My works",
      'nav.login': "Log in", 'nav.logout': "Log out", 'nav.profileTip': "View profile",
      'tool.themeToLight': "Switch to light mode", 'tool.themeToDark': "Switch to dark mode",
      'tool.lang': "Change language (UZ / EN)",
      'side.groups': "Groups", 'side.people': "People", 'side.tools': "Tools",
      'side.search': "Search nickname...", 'side.ai': "🤖 AI assistant",
      'group.prefix': "Group: ", 'group.main': "Main", 'group.mainBtn': "💬 Main group",
      'field.web': "Web developers", 'field.designer': "Designers", 'field.app': "App developers",
      'field.gamer': "Gamers", 'field.streamer': "Streamers", 'field.other': "Other developers",
      'mode.chat': "💬 Text chat", 'mode.video': "🎥 Video chat",
      'chat.placeholder': "Type a message...", 'chat.send': "Send", 'chat.loading': "Loading...",
      'chat.empty': "💬 No messages yet — be the first to say hello.",
      'chat.loadError': "Could not load messages", 'chat.rulesHint': "Check the Firestore rules.",
      'chat.user': "User", 'chat.delete': "Delete",
      'chat.sendFail': "Message not sent: ", 'chat.delFail': "Could not delete: ",
      'chat.dmFail': "Could not open the conversation: ",
      'video.note': "🎥 Group video chat — anyone who knows this link can join. Your browser will ask for camera/microphone permission.",
      'people.write': "Message", 'people.none': "No one found.", 'people.err': "Search error: ",
      'ai.title': "🤖 AI Assistant",
      'ai.empty': "👋 Hi! Ask me anything — programming, websites, or just about anything else.",
      'ai.placeholder': "Type your question...", 'ai.typing': "Typing...",
      'ai.err': "Sorry, the AI couldn't answer right now. Please try again in a moment.",
      'ai.rate': "Too many requests right now, please try again in a minute.",
      'ai.notSet': "AI is not configured yet: set AI_PROXY_URL in index.html to your Worker address."
    }
  };

  function t(key) {
    var d = DICT[lang] || {};
    if (d[key] != null) return d[key];
    if (DICT.uz[key] != null) return DICT.uz[key];
    return key;
  }

  function extend(extra) {
    ['uz', 'en'].forEach(function (l) {
      if (extra && extra[l]) for (var k in extra[l]) DICT[l][k] = extra[l][k];
    });
    applyI18n();
  }

  function applyI18n() {
    root.lang = lang;
    var i, els;
    els = document.querySelectorAll('[data-i18n]');
    for (i = 0; i < els.length; i++) els[i].textContent = t(els[i].getAttribute('data-i18n'));
    els = document.querySelectorAll('[data-i18n-placeholder]');
    for (i = 0; i < els.length; i++) els[i].setAttribute('placeholder', t(els[i].getAttribute('data-i18n-placeholder')));
    els = document.querySelectorAll('[data-i18n-title]');
    for (i = 0; i < els.length; i++) els[i].setAttribute('title', t(els[i].getAttribute('data-i18n-title')));
    refreshToolButtons();
  }

  function setTheme(next) {
    theme = next === 'light' ? 'light' : 'dark';
    set(LS_THEME, theme);
    root.setAttribute('data-theme', theme);
    refreshToolButtons();
  }

  function setLang(next) {
    lang = next === 'en' ? 'en' : 'uz';
    set(LS_LANG, lang);
    applyI18n();
    window.dispatchEvent(new CustomEvent('ic:lang', { detail: { lang: lang } }));
  }

  var themeBtn = null, langBtn = null;

  function refreshToolButtons() {
    if (themeBtn) {
      themeBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
      var tip = t(theme === 'dark' ? 'tool.themeToLight' : 'tool.themeToDark');
      themeBtn.title = tip; themeBtn.setAttribute('aria-label', tip);
    }
    if (langBtn) {
      langBtn.textContent = '🌐 ' + lang.toUpperCase();
      langBtn.title = t('tool.lang'); langBtn.setAttribute('aria-label', t('tool.lang'));
    }
  }

  function injectTools() {
    var host = document.querySelector('.nav-right');
    if (!host || document.getElementById('icTools')) return;
    var box = document.createElement('span');
    box.id = 'icTools'; box.className = 'nav-tools';
    langBtn = document.createElement('button');
    langBtn.type = 'button'; langBtn.className = 'icon-btn';
    langBtn.addEventListener('click', function () { setLang(lang === 'uz' ? 'en' : 'uz'); });
    box.appendChild(langBtn);
    host.insertBefore(box, host.firstChild);
    refreshToolButtons();
  }

  function injectNavToggle() {
    var nav = document.querySelector('.site-nav');
    var links = nav && nav.querySelector('.nav-links');
    if (!nav || !links || nav.querySelector('.nav-toggle')) return;
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'nav-toggle'; b.textContent = '☰'; b.setAttribute('aria-label', 'Menu');
    function close() { links.classList.remove('open'); b.textContent = '☰'; }
    b.addEventListener('click', function (e) { e.stopPropagation(); var o = links.classList.toggle('open'); b.textContent = o ? '✕' : '☰'; });
    document.addEventListener('click', function (e) { if (!nav.contains(e.target)) close(); });
    nav.appendChild(b);
  }

  function init() { injectTools(); injectNavToggle(); applyI18n(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  window.IC = {
    t: t, extend: extend, setLang: setLang, setTheme: setTheme,
    getLang: function () { return lang; }, getTheme: function () { return theme; }
  };
})();