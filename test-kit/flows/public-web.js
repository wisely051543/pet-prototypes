/* 店家公開網頁 W-01: hints and guided tours for test mode. Format: test-kit/flows/README.md
   The reader is an owner (or a passer-by) on the shop's own page, so tours say 毛孩. The phone is the main screen: below
   1024 px the page is one column with a booking bar docked at the bottom; from 1024 px a booking slip sits on the right,
   so steps that differ carry maxWidth 1023 / minWidth 1024. Tours stop at 「下一步：選擇毛孩」, the link into liff-booking. */
(function () {
  /* the scenario switches the page reads from its address; a tour that does not want one says so with null */
  var plain = {at: null, today: null, shop: null, svcs: null, sus: null, q: null};
  var with_ = function (o) { var q = {}, k; for (k in plain) q[k] = plain[k]; for (k in o) q[k] = o[k]; return q; };
  var NARROW = 1023, WIDE = 1024;
  var stepsLeft = {sel: '.ho .steps3', info: true, t: '還差三步：選毛孩、服務前資料、確認送出',
    d: '接下來在 LINE 裡做：從你的毛孩裡選一隻（或新增）、填這次的服務前資料、最後確認送出。'};
  var notYet = {sel: '.ho .steps3 li:nth-child(3)', info: true, t: '注意：現在還沒約好',
    d: '時段要在最後一步「確認送出」時才算約好；在那之前別人也可能先約走。'};
  /* liff-booking always signs in as its demo owner 王太太, whoever logged in here */
  var asWang = '（那個原型登入的是示範帳號王太太，看到的毛孩是毛毛和年糕）';
  var toLiff = function (d) { return {sel: '[data-key="go"]', info: true, t: '「下一步：選擇毛孩」會打開 LINE 裡的預約', d: d}; };
  PP.register('public-web', {
    name: '店家公開網頁',
    hints: [
      {sel: '[data-key="tel"]', t: '打電話給店家', d: '用手機看時，按了會直接撥號'},
      {sel: '[data-key="map"]', t: '地圖', d: '另開 Google 地圖，看店家在哪裡'},
      {sel: '[data-key^="qm-"], [data-key^="qs-"]', t: '最近空檔', d: '最近三個還有空的日子，點一下就選好日期', tour: 'quick'},
      {sel: '[data-key^="svc-"]', t: '服務與價格', d: '價格、大約多久、適用哪種毛孩、要不要簽約', tour: 'book'},
      {sel: '[data-key^="d-"]', t: '選日期', d: '選了服務後，每天會寫還有幾個放得下的時段', quiet: true, tour: 'change'},
      {sel: '[data-key="need"]', t: '立即預約', d: '還沒選齊時，會帶你到還缺的那一步', tour: 'quick'},
      {sel: '[data-key="login"]', t: '以 LINE 登入並送出', d: '選齊了才出現；登入後還有三步', tour: 'book'},
      {sel: '[data-key="go"]', t: '下一步：選擇毛孩', d: '打開 LINE 裡的預約，服務和時間會一起帶過去'},
      {sel: '[data-key="back"]', t: '回到店家頁修改', d: '選好的服務和時間都還在', tour: 'quick'}
    ],
    tours: [
      {id: 'book', title: '幫毛毛預約洗澡＋剪毛', who: '飼主王太太', query: plain,
        scene: '你是王怡君（王太太）。你從「毛孩日和」中山店給的連結打開店家網頁，想幫貴賓犬毛毛約一次洗澡＋剪毛，時間是 10/15（四）早上 10 點。這個網頁不用先登入：先選服務、日期和時段，最後才用 LINE 登入。現在是 10/9（五）下午 3 點 10 分。',
        outro: '毛毛的洗澡＋剪毛選好了：10/15（四）10:00–12:00，NT$1,200，接回時在櫃台付。你已經用 LINE 登入，接著在 LINE 裡選毛毛、填服務前資料（記得寫毛毛怕剪刀），最後確認送出，送出才算約好。這項服務要簽約：契約會傳到你的 LINE，到店後在櫃台平板簽名。',
        steps: [
          {sel: '.hdr', info: true, t: '最上面是店家：毛孩日和 中山店', d: '旁邊寫著現在「營業中」、營業到 19:00；也可以直接打電話或開地圖。'},
          {sel: '[data-key="svc-g1"]', info: true, t: '「服務與價格」有 6 項，先看第一項怎麼讀', d: '基礎洗澡・小型犬 NT$600：約 1 小時、適用小型犬、「需簽約」，最下面一行是做哪些事。這裡的價格是示範。'},
          {sel: '[data-key="svc-g2"]', t: '選「洗澡＋剪毛・小型犬」', d: '毛毛是 4.2 公斤的貴賓犬，選小型犬。這項約 2 小時、NT$1,200。'},
          {sel: '[data-key="svc-g2"] .ct', info: true, t: '注意：這項服務要簽約', d: '選了之後卡片下面多一行：契約會傳到你的 LINE，到店前先看，到店後在櫃台平板簽名即可。'},
          {sel: '#dock .sum', maxWidth: NARROW, info: true, t: '最下面的預約列寫著「洗澡＋剪毛・小型犬」', d: '這一列會一直跟著你，寫著選好了什麼、還缺什麼；現在寫著「還沒選日期」。'},
          {sel: '#sec-svc', minWidth: WIDE, info: true, t: '右邊預約單的「服務」打勾了', d: '寫著洗澡＋剪毛・小型犬，約 2 小時・NT$1,200；下面的按鈕改成「請選擇日期」。'},
          {sel: '#dstrip', info: true, t: '日期下面改成「還有幾個時段」', d: '選了服務後，每天寫著放得下 2 小時的時段還有幾個。週三公休、10/11（日）已滿，灰色的不能選；只開放 14 天內的預約。'},
          {sel: '[data-key="d-2026-10-15"]', t: '選 10/15（四）', d: '這天還有 14 個時段。'},
          {sel: '#sec-time .times', info: true, t: '列出 10/15 的時段', d: '15:30 到 17:00 已經約滿；17:30 以後開始的話，2 小時會超過 19:00 打烊，所以寫著「超過打烊」。'},
          {sel: '[data-key="t-10:00"]', t: '選 10:00', d: '毛毛習慣上午來。10:00 開始，大約 12:00 好。'},
          {sel: '#dock', maxWidth: NARROW, info: true, t: '預約列選齊了：10/15（四）10:00、NT$1,200', d: '按鈕變成綠色的「以 LINE 登入並送出」。'},
          {sel: '.sl-foot', minWidth: WIDE, info: true, t: '費用 NT$1,200，接回時在櫃台付款', d: '按鈕變成綠色的「以 LINE 登入並送出」，下面寫著登入後還有三步。'},
          {sel: '[data-key="login"]', t: '按「以 LINE 登入並送出」', d: '原型會模擬 LINE 登入，一下子就回來。真的使用時會打開 LINE，請你同意登入。'},
          {sel: '.ho .card', info: true, t: '登入好了，選好的都帶過來了', d: '洗澡＋剪毛・小型犬、10/15（四）、10:00–12:00（約 2 小時）、NT$1,200。'},
          stepsLeft,
          {sel: '.ho .steps3 li:nth-child(2)', info: true, t: '注意：毛毛怕剪刀，要寫在服務前資料', d: '剪刀靠近臉，毛毛會掙扎。下一步的「服務前資料」可以寫個性和要注意的事，店員服務前會先看。'},
          notYet,
          toLiff('會打開另一個原型「飼主 LINE 預約」，從選毛孩開始，服務和時間一起帶過去。這個引導到這裡結束，不用按。')
        ]},
      {id: 'quick', title: '用「最近空檔」幫糖糖約今天洗澡', who: '飼主郭太太', query: plain,
        scene: '你是郭太太。下午想到馬爾濟斯糖糖該洗澡了，打開「毛孩日和」中山店的網頁，想看看今天還能不能約。現在是 10/9（五）15:10。',
        outro: '糖糖今天 17:00–18:00 的基礎洗澡選好了，NT$600 接回時付。你已經用 LINE 登入，回到店家頁時選擇都還在，按「下一步：選擇毛孩」就能接著在 LINE 裡選糖糖、填服務前資料、確認送出。這項服務要簽約，到店在平板簽名。',
        steps: [
          {sel: '.a-quick, .slip .quick', info: true, t: '「最近空檔」：今天 16:30 起', d: '列出最近三個還有空的日子，和那天最早的時段。今天最早只能約一小時後。'},
          {sel: '[data-key="qm-2026-10-09"], [data-key="qs-2026-10-09"]', t: '點「今天・五 16:30 起」', d: '點一下就選好日期。'},
          {sel: '#sec-date', info: true, t: '日期選好了：10/9（五）', d: '還沒選服務，所以還排不出時段：每項服務要的時間不一樣。'},
          {sel: '#h-svcs', maxWidth: NARROW, info: true, t: '畫面跳到「服務與價格」', d: '手機上會自動帶你到還缺的那一步。'},
          {sel: '[data-key="svc-g1"]', t: '選「基礎洗澡・小型犬」', d: '糖糖是 3.2 公斤的馬爾濟斯。這項約 1 小時、NT$600：洗澡、吹整、清耳朵、剪指甲。'},
          {sel: '[data-key="svc-g1"] .ct', info: true, t: '注意：這項服務要簽約', d: '契約會傳到你的 LINE，到店前先看，到店後在櫃台平板簽名即可。'},
          {sel: '[data-key="need"]', maxWidth: NARROW, t: '按最下面的「立即預約」', d: '還沒選齊時，這個按鈕會帶你到還缺的那一步：現在缺時段。'},
          {sel: '#sec-time .times', info: true, t: '今天的時段：16:30 到 18:00', d: '洗澡要 1 小時，18:30 開始會超過 19:00 打烊。'},
          {sel: '[data-key="t-17:00"]', t: '選 17:00', d: '17:00 開始，大約 18:00 好。'},
          {sel: '#dock .sum', maxWidth: NARROW, info: true, t: '預約列選齊了：今天 17:00、NT$600', d: '按鈕變成綠色的「以 LINE 登入並送出」。'},
          {sel: '.sl-foot', minWidth: WIDE, info: true, t: '費用 NT$600，接回時在櫃台付款', d: '按鈕變成綠色的「以 LINE 登入並送出」。'},
          {sel: '[data-key="login"]', t: '按「以 LINE 登入並送出」', d: '原型會模擬 LINE 登入，一下子就回來。'},
          {sel: '.ho .card', info: true, t: '登入好了：基礎洗澡、今天 17:00–18:00', d: '服務、日期、時段和費用都帶過來了。'},
          {sel: '[data-key="back"]', t: '按「回到店家頁修改」', d: '想再看看別的時間，可以先回店家頁。'},
          {sel: '#sec-time', info: true, t: '選好的都還在', d: '服務、日期和 17:00 的時段都留著，想改哪一項就重選。'},
          toLiff('已經登入過，所以按鈕直接是「下一步：選擇毛孩」，不用再登入一次。按下去會打開另一個原型「飼主 LINE 預約」' + asWang + '；這個引導到這裡結束，不用按。')
        ]},
      {id: 'change', title: '幫拿鐵改成洗澡＋剪毛', who: '飼主施小姐', query: plain,
        scene: '你是施小姐。下班後想帶貴賓犬拿鐵去洗澡，先選了 10/16（五）18:00 的基礎洗澡。選好後想到拿鐵的毛也該剪了，要改成洗澡＋剪毛。現在是 10/9（五）15:10。',
        outro: '拿鐵改成洗澡＋剪毛：10/16（五）17:00–19:00，NT$1,200。換成比較長的服務時，原本放不下的時段會被清掉、寫出原因，日期還留著；重選時段後就能用 LINE 登入送出。',
        steps: [
          {sel: '[data-key="svc-g1"]', t: '先選「基礎洗澡・小型犬」', d: '拿鐵是 3.8 公斤的貴賓犬。這項約 1 小時、NT$600。'},
          {sel: '[data-key="d-2026-10-16"]', t: '選 10/16（五）', d: '日期在服務下面。'},
          {sel: '[data-key="t-18:00"]', t: '選 18:00', d: '洗澡 1 小時，19:00 打烊前剛好好。'},
          {sel: '#dock .sum', maxWidth: NARROW, info: true, t: '預約列：基礎洗澡・10/16（五）18:00、NT$600', d: '已經選齊，可以送出了。但你想改服務。'},
          {sel: '#sec-time', minWidth: WIDE, info: true, t: '預約單：時段 18:00–19:00', d: '已經選齊，可以送出了。但你想改服務。'},
          {sel: '[data-key="svc-g2"]', t: '改選「洗澡＋剪毛・小型犬」', d: '這項約 2 小時、NT$1,200。'},
          {sel: '#sec-time .why', info: true, t: '注意：原本的 18:00 放不下，時段被清掉了', d: '洗澡＋剪毛要 2 小時，18:00 開始會超過 19:00 打烊。日期 10/16 還留著，只要重選時段。'},
          {sel: '#sec-time .times', info: true, t: '時段重新排過了', d: '換成 2 小時的服務後，17:30 以後寫著「超過打烊」；17:00 開始剛好 19:00 好。'},
          {sel: '[data-key="t-17:00"]', t: '選 17:00', d: '提早半小時，剪完 19:00。'},
          {sel: '#dock .sum', maxWidth: NARROW, info: true, t: '預約列：洗澡＋剪毛・10/16（五）17:00、NT$1,200', d: '價格跟著服務一起改了。'},
          {sel: '.sl-foot', minWidth: WIDE, info: true, t: '費用改成 NT$1,200', d: '價格跟著服務一起改了，接回時在櫃台付款。'},
          {sel: '[data-key="login"]', info: true, t: '選齊了，可以用 LINE 登入送出', d: '按下去之後的流程，在「幫毛毛預約洗澡＋剪毛」那個引導裡有。這個引導到這裡結束，不用按。'}
        ]},
      {id: 'conflict', title: '時段被約走了，幫樂樂重選', who: '飼主謝小姐', query: with_({at: 'conflict'}),
        scene: '你是謝小姐，想幫迷你雪納瑞樂樂約今天的洗澡＋剪毛。你已經選好 10/9（五）16:30，按了「以 LINE 登入並送出」；登入回來時，這個時段剛好被別人約走了。現在是 10/9（五）15:10。',
        outro: '樂樂改約今天 17:00–19:00 的洗澡＋剪毛。登入時被約走的時段會寫「剛被約走」，服務、日期和你的登入都還在，只要重選時段；因為已經登入，按「下一步：選擇毛孩」就能接著在 LINE 裡完成。送出才算約好。',
        steps: [
          {sel: '#ntc', info: true, t: '回來了：「已用 LINE 登入，服務和日期都還在。」', d: '洗澡＋剪毛・小型犬、10/9（五）都留著，只有時段要重選。'},
          {sel: '.tm.lost', info: true, t: '16:30 寫著「剛被約走」', d: '你在登入的時候，有人先約走了 16:30。'},
          {sel: '#sec-time .why', info: true, t: '注意：時段要送出才算約好', d: '紅字寫著「您選擇的時段剛被預約，請重新選擇。」登入前選的時段，店家還沒幫你保留。'},
          {sel: '[data-key="t-17:00"]', t: '選 17:00', d: '今天只剩 17:00 放得下 2 小時：17:00 到 19:00。'},
          {sel: '#dock .sum', maxWidth: NARROW, info: true, t: '預約列：洗澡＋剪毛・今天 17:00、NT$1,200', d: '選齊了。'},
          {sel: '#sec-time', minWidth: WIDE, info: true, t: '預約單：時段 17:00–19:00', d: '選齊了，費用 NT$1,200 接回時付。'},
          toLiff('已經登入過，所以按鈕直接是「下一步：選擇毛孩」，不用再登入一次。按下去會打開另一個原型「飼主 LINE 預約」' + asWang + '；這個引導到這裡結束，不用按。')
        ]},
      {id: 'closed', title: '晚上打烊後，幫豆花約明天剪指甲', who: '飼主鄭先生', query: with_({today: 'closed'}),
        scene: '你是鄭先生。晚上想到英國短毛貓豆花的指甲該剪了，打開「毛孩日和」中山店的網頁。現在是 10/9（五）20:30，店已經打烊；網頁還是可以預約。',
        outro: '豆花的修指甲選好了：10/10（六）14:00–14:30，NT$300，接回時付，不用簽約。店打烊了網頁照樣能約，只是今天不能選。你已經用 LINE 登入，接著在 LINE 裡選豆花、在服務前資料寫上「剪指甲會抓人」，最後確認送出才算約好。',
        steps: [
          {sel: '.hdr .state', info: true, t: '店家狀態：「已打烊，明天 08:30 營業」', d: '店關了，但網頁上還是可以預約明天以後的時段。'},
          {sel: '[data-key="d-2026-10-09"]', info: true, t: '今天寫著「已打烊」', d: '灰色的不能選。最快可以約明天。'},
          {sel: '.a-info .hours', info: true, t: '營業時間：每天 08:30–19:00，週三公休', d: '在頁面最下面的「店家資訊」，還有地址和電話。'},
          {sel: '[data-key="qm-2026-10-10"], [data-key="qs-2026-10-10"]', t: '在「最近空檔」點「明天・六 12:30 起」', d: '明天上午都約滿了，最早 12:30。'},
          {sel: '[data-key="svc-q1"]', t: '選「修指甲」', d: '狗和貓都可以，約 30 分鐘、NT$300，不用簽約。'},
          {sel: '#sec-time .times', info: true, t: '明天的時段：12:30 起都還有空', d: '上午已經約滿了。'},
          {sel: '[data-key="t-14:00"]', t: '選 14:00', d: '14:00 開始，大約 14:30 好。'},
          {sel: '#dock .sum', maxWidth: NARROW, info: true, t: '預約列：修指甲・10/10（六）14:00、NT$300', d: '按鈕變成綠色的「以 LINE 登入並送出」。'},
          {sel: '.sl-foot', minWidth: WIDE, info: true, t: '費用 NT$300，接回時在櫃台付款', d: '按鈕變成綠色的「以 LINE 登入並送出」。'},
          {sel: '[data-key="login"]', t: '按「以 LINE 登入並送出」', d: '原型會模擬 LINE 登入，一下子就回來。'},
          {sel: '.ho .card', info: true, t: '登入好了：修指甲、10/10（六）14:00–14:30', d: '服務、日期、時段和 NT$300 都帶過來了。'},
          {sel: '.ho .steps3 li:nth-child(2)', info: true, t: '注意：豆花剪指甲會抓人，要寫在服務前資料', d: '豆花剪指甲時會抓，要用毛巾包著。下一步的「服務前資料」寫上，店員服務前會先看。'},
          notYet,
          toLiff('會打開另一個原型「飼主 LINE 預約」，從選毛孩開始' + asWang + '。這個引導到這裡結束，不用按。')
        ]},
      /* 毛孩日和開張 (prototypes/open-day): act 7, played inside that page with ?life=open-book (10/14（三）15:10, the closed day the
         shop went live; nobody has booked yet); not listed on this page */
      {id: 'life-open-book', life: true, seed: {life: 'open-book'}, title: '第 7 幕：第一位飼主上門預約', who: '飼主王太太', query: plain,
        scene: '10/14（三）下午 3 點 10 分。毛孩日和早上剛正式開放預約，陳老闆在 LINE 和臉書貼出開張消息和預約連結。你是王怡君（王太太），住在中山店附近，點開連結，想幫貴賓犬毛毛約明天開張第一天早上 10 點的洗澡＋剪毛。這個網頁不用先登入：先選服務、日期和時段，最後才用 LINE 登入。',
        outro: '毛毛的洗澡＋剪毛選好了：10/15（四）10:00–12:00，NT$1,200，接回時在櫃台付。你已經用 LINE 登入；下一幕在 LINE 裡接著做：第一次來，先新增毛毛、填服務前資料（記得寫毛毛怕剪刀），確認送出，就是毛孩日和的第一筆預約。',
        steps: [
          {sel: '.hdr', info: true, t: '最上面是店家：毛孩日和 中山店', d: '寫著「今天公休，明天 08:30 營業」。公休日網頁照樣可以預約明天以後的時段。'},
          {sel: '[data-key="svc-g1"]', info: true, t: '「服務與價格」有 6 項，先看第一項怎麼讀', d: '基礎洗澡・小型犬 NT$600：約 1 小時、適用小型犬、「需簽約」，最下面一行是做哪些事。'},
          {sel: '[data-key="svc-g2"]', t: '選「洗澡＋剪毛・小型犬」', d: '毛毛是 4.2 公斤的貴賓犬，選小型犬。這項約 2 小時、NT$1,200：陳老闆昨晚才補上這 2 小時。'},
          {sel: '[data-key="svc-g2"] .ct', info: true, t: '注意：這項服務要簽約', d: '選了之後卡片下面多一行：契約會傳到你的 LINE，到店前先看，到店後在櫃台平板簽名即可。'},
          {sel: '#dock .sum', maxWidth: NARROW, info: true, t: '最下面的預約列寫著「洗澡＋剪毛・小型犬」', d: '這一列會一直跟著你，寫著選好了什麼、還缺什麼；現在寫著「還沒選日期」。'},
          {sel: '#sec-svc', minWidth: WIDE, info: true, t: '右邊預約單的「服務」打勾了', d: '寫著洗澡＋剪毛・小型犬，約 2 小時・NT$1,200；下面的按鈕改成「請選擇日期」。'},
          {sel: '#dstrip', info: true, t: '每一天的時段都還空著', d: '店今天才開放預約，還沒有人約過。今天和下週三公休，灰色的不能選；只開放 14 天內的預約。'},
          {sel: '[data-key="d-2026-10-15"]', t: '選 10/15（四）', d: '明天，毛孩日和開張的第一天。'},
          {sel: '#sec-time .times', info: true, t: '列出 10/15 的時段', d: '從 08:30 起都還有空；17:30 以後開始的話，2 小時會超過 19:00 打烊，所以寫著「超過打烊」。'},
          {sel: '[data-key="t-10:00"]', t: '選 10:00', d: '毛毛習慣上午來。10:00 開始，大約 12:00 好。'},
          {sel: '#dock', maxWidth: NARROW, info: true, t: '預約列選齊了：10/15（四）10:00、NT$1,200', d: '按鈕變成綠色的「以 LINE 登入並送出」。'},
          {sel: '.sl-foot', minWidth: WIDE, info: true, t: '費用 NT$1,200，接回時在櫃台付款', d: '按鈕變成綠色的「以 LINE 登入並送出」，下面寫著登入後還有三步。'},
          {sel: '[data-key="login"]', t: '按「以 LINE 登入並送出」', d: '原型會模擬 LINE 登入，一下子就回來。真的使用時會打開 LINE，請你同意登入。'},
          {sel: '.ho .card', info: true, t: '登入好了，選好的都帶過來了', d: '洗澡＋剪毛・小型犬、10/15（四）、10:00–12:00（約 2 小時）、NT$1,200。'},
          stepsLeft,
          {sel: '.ho .steps3 li:nth-child(2)', info: true, t: '注意：毛毛怕剪刀，要寫在服務前資料', d: '剪刀靠近臉，毛毛會掙扎。下一步的「服務前資料」可以寫個性和要注意的事，店員服務前會先看。'},
          notYet,
          toLiff('會打開 LINE 裡的預約，服務和時間一起帶過去。那是下一幕：在那裡新增毛毛、確認送出，才是毛孩日和的第一筆預約。這個引導到這裡結束，不用按。')
        ]}
    ]
  });
})();
