/* 平板簽署: hints and guided tours for test mode. Format: test-kit/flows/README.md
   Most of these screens are the owner's, so the tours speak the owner's voice: 毛孩, not 寵物.
   The first and last steps happen on the stand-in staff page (it plays the part of 今日看板). */
(function () {
  var Q = {sc: null, at: null, shop: null, theme: null, big: null, off: null, net: null};
  var SIGN = [
    {sel: '#ho-canvas', group: true, t: '用手指在框內簽名', d: '電腦上用滑鼠按住拖曳。簽歪了可以按「清除簽名」。不能手寫的話，可以改用其他方式簽署。', until: {enabled: '[data-key="ho-next"]'}, demo: {draw: '#ho-canvas'}},
    {sel: '[data-key="ho-next"]', t: '按「下一步：簡訊驗證」', d: '簽名會和簡訊驗證一起存證，證明是你本人。'}
  ];
  var OTP = function (phone) { return [
    {sel: '#otp', t: '輸入簡訊驗證碼', d: '驗證碼傳到你的手機 ••••' + phone + '。輸入錯誤的話會告訴你還可以再試幾次。', fill: {value: '246810', label: '246810（示範驗證碼）'}, until: {enabled: '[data-key="ho-done"]'}},
    {sel: '[data-key="ho-done"]', t: '按「完成簽署」', d: '契約正本會傳到你的 LINE。'}
  ]; };
  var DONE = '.handover div:has(> [data-key="ho-back"])';

  PP.register('tablet-signing', {
    name: '平板簽署',
    hints: [
      {sel: '[data-key="sb-fast"]', t: '現場簽名（在家已讀完）', d: '飼主在 LINE 讀過契約，到店只要確認、簽名、驗證', tour: 'fast'},
      {sel: '[data-key="sb-live"]', t: '現場簽名（沒讀過）', d: '在平板上讀完全文，勾重點條款，再簽名', tour: 'live'},
      {sel: '[data-key="sb-record"]', t: '服務紀錄簽名', d: '接回時，請飼主確認今天的服務內容並簽名', tour: 'record'},
      {sel: '[data-key^="sb-"]', t: '現場簽名', d: '把平板交給飼主，從這裡開始是飼主操作的畫面', quiet: true},
      {sel: '[data-key="ho-pause"]', t: '暫停，交還店員', d: '飼主想停下來時用；這次的簽署進度會清除', quiet: true},
      {sel: '[data-key="ho-sheet"]', t: '關於審閱期', d: '飼主可以繼續讀、自願縮短，或帶回家再簽', quiet: true},
      {sel: '[data-key="ho-fix"]', t: '內容有誤', d: '請店員更正後再簽', quiet: true}
    ],
    tours: [
      {id: 'fast', title: '在家讀過契約，到店簽名', who: '飼主王太太', query: Q,
        scene: '你帶毛毛來洗澡＋剪毛。昨晚你已經在 LINE 讀完契約、勾好重點條款，所以到店只要確認、簽名和簡訊驗證，大約 1 分鐘。第一步由櫃台阿凱把平板交給你。',
        outro: '毛毛的美容契約簽好了：確認摘要、確認毛孩資料、手寫簽名、簡訊驗證，一共 4 步。契約正本會傳到你的 LINE。平板交還後，阿凱按「店員確認完成」，看板上就變成「已簽」。',
        steps: [
          {sel: '[data-key="sb-fast"]', t: '（櫃台阿凱）按毛毛的「現場簽名」', d: '這頁代替今日看板。毛毛的契約標著「已閱讀」：王太太在家讀過了。'},
          {sel: '.handover .ho-start', info: true, t: '平板交給王太太', d: '從這裡開始是飼主自己操作的畫面。店員要離開這個畫面，得按住下面的連結 2 秒，避免飼主誤按。'},
          {sel: '[data-key="ho-start"]', t: '按「開始」', d: '你是王太太，接過平板了。'},
          {sel: '.signbar', info: true, t: '上面寫著第 1 步，共 4 步', d: '契約摘要、毛孩資料確認、手寫簽名、簡訊驗證。旁邊有「暫停，交還店員」，想停下來隨時可以按。'},
          {sel: '.readmark', info: true, t: '你已經在家讀完這份契約', d: '因為讀過了，所以這次不用再讀全文，直接確認摘要就好。'},
          {sel: '.ho-card', info: true, t: '摘要：毛毛、服務、時間、費用', d: '10/10（六）10:00 洗澡＋剪毛・小型犬，NT$1,200。5 條重點條款你在家都勾過了。'},
          {sel: '[data-key="ho-agree"]', t: '按「我已閱讀並同意」', d: '想再看一次，可以按「再看一次全文」。'},
          {sel: '.ho-card', info: true, t: '確認毛毛的資料', d: '個性、攻擊性、疾病史、過敏、特殊注意、緊急聯絡人。都是你上次填的，有不對的地方可以直接修改。'},
          {sel: '[data-key="ho-next"]', t: '都對：按「全部正確，下一步：手寫簽名」', d: '毛毛這次沒有變化。按下這顆，就等於確認了你填的每一項。'}
        ].concat(SIGN, OTP('8821'), [
          {sel: DONE, info: true, t: '簽署完成', d: '契約正本會傳到你的 LINE。接下來把平板交還給店員。'},
          {sel: '[data-key="ho-back"]', t: '按「交還店員」', d: '平板回到阿凱手上。'},
          {sel: '[data-key="sb-fast"]', t: '（櫃台阿凱）按「店員確認完成」', d: '毛毛這列寫著「待店員確認」。店員確認後才算簽好。'},
          {sel: 'main.staff .srow:first-of-type', info: true, t: '毛毛：已簽', d: '今日看板上，毛毛的契約就變成已簽，可以開始服務。'}
        ])},
      {id: 'live', title: '沒讀過契約，在平板上讀完再簽', who: '飼主陳先生', query: Q,
        scene: '你第一次帶 Momo 來洗澡＋修腳底毛，還沒讀過契約。你要在平板上讀完全文（大約 3 分鐘）、逐條勾重點條款，確認 Momo 的資料，填身分證字號，再簽名。你有權利慢慢讀，店員不會替你決定。',
        outro: 'Momo 的契約簽好了：讀完全文、5 條重點條款都勾了、確認了店員代填的兩項資料（剪指甲時會咬、疾病史無），身分證字號只留末四碼可見，最後手寫簽名並簡訊驗證。一共 5 步。',
        steps: [
          {sel: '[data-key="sb-live"]', t: '（櫃台阿凱）按 Momo 的「現場簽名」', d: 'Momo 的契約還沒讀過，所以要在平板上讀全文。'},
          {sel: '[data-key="ho-start"]', t: '按「開始」', d: '你是陳先生，接過平板了。'},
          {sel: '.signbar', info: true, t: '這次有 5 步', d: '比在家讀過多了一步「契約全文」：契約摘要、契約全文、毛孩資料確認、手寫簽名、簡訊驗證。'},
          {sel: '.ho-card', info: true, t: '契約摘要', d: 'Momo、洗澡＋修腳底毛、10/10（六）10:30、NT$900。重點條款 5 條，等一下讀全文時每條都要勾。'},
          {sel: '[data-key="ho-next"]', t: '按「下一步：閱讀全文」', d: '大約 3 分鐘。'},
          {sel: '#ho-conds', info: true, t: '「同意」要等三件事', d: '閱讀時間夠了、讀到最後、5 條重點條款都勾了。按鈕上會倒數還剩多久。'},
          {sel: '[data-key="ho-sheet"]', t: '按「關於審閱期」', d: '看看你有哪些選擇。'},
          {sel: '.hosheet', info: true, t: '你可以自己決定', d: '繼續在這裡讀；自願縮短審閱期現在就簽；或帶回家用 LINE 慢慢看之後再簽。店員不會替你決定。'},
          {sel: '[data-key="sheet-1"]', t: '選「繼續閱讀」', d: '回到契約全文，慢慢讀。'},
          {sel: 'section.key:has([data-tick^="第三條"])', group: true, t: '第三條 取消與改期費用：勾「我已了解」', d: '24 小時前取消或改期不收費；24 小時內最多收服務費 20%；沒到也沒通知，收 30%。', until: {checked: '[data-tick^="第三條"]'}, demo: {click: '[data-tick^="第三條"]'}},
          {sel: 'section.key:has([data-tick^="第四條"])', group: true, t: '第四條 健康狀況告知：勾「我已了解」', d: '毛孩的病史、過敏、攻擊行為和近期用藥要如實告知。', until: {checked: '[data-tick^="第四條"]'}, demo: {click: '[data-tick^="第四條"]'}},
          {sel: 'section.key:has([data-tick^="第五條"])', group: true, t: '第五條 保定與攻擊行為：勾「我已了解」', d: '毛孩會咬人時，店家可以用頭套等工具保定，會寫在服務紀錄裡。', until: {checked: '[data-tick^="第五條"]'}, demo: {click: '[data-tick^="第五條"]'}},
          {sel: 'section.key:has([data-tick^="第六條"])', group: true, t: '第六條 服務中意外與緊急就醫授權：勾「我已了解」', d: '受傷或突發疾病會立刻通知你；聯絡不到又很緊急時，你同意送到附近動物醫院。', until: {checked: '[data-tick^="第六條"]'}, demo: {click: '[data-tick^="第六條"]'}},
          {sel: 'section.key:has([data-tick^="第七條"])', group: true, t: '第七條 接回與逾時：勾「我已了解」', d: '服務完成會用 LINE 通知你；超過約定接回時間 2 小時，可能收逾時照護費。', until: {checked: '[data-tick^="第七條"]'}, demo: {click: '[data-tick^="第七條"]'}},
          {sel: '#ho-end', info: true, t: '契約全文到此結束', d: '讀到最後了。上面的清單會打勾：讀到最後、重點條款 5/5。'},
          {sel: '[data-key="ho-agree"]', timeout: 40000, t: '按「我已閱讀並同意」', d: '閱讀時間夠了才會亮；還沒到的話，按鈕上會寫還剩幾秒。'},
          {sel: '.prow.staff', group: true, info: true, t: '店員代填的兩項要你逐項確認', d: '攻擊性「剪指甲時會咬」和疾病史「無」是阿凱 09:52 幫你填的。安全相關的資料一定要飼主本人確認。'},
          {sel: '[data-key="pok-1"]', t: '攻擊性「剪指甲時會咬」：按「正確」', d: 'Momo 剪指甲時真的會咬，店家會先戴頭套。'},
          {sel: '[data-key="pok-2"]', t: '疾病史「無」：按「正確」', d: '店員填的每一項都要你按過「正確」或「修改」，才能下一步。'},
          {sel: '#idin', t: '輸入身分證字號', d: '只會用在這份契約，店員看不到你的號碼。', fill: {value: 'A123456789', label: 'A123456789（示範用）'}, until: {enabled: '[data-key="id-go"]'}},
          {sel: '[data-key="id-go"]', t: '按「確認號碼」', d: '會先讓你核對一次。'},
          {sel: '[data-key="id-yes"]', t: '畫面寫著 A12****789，按「正確」', d: '打錯的話按「重新輸入」。確認後畫面只顯示遮住的號碼。'},
          {sel: '[data-key="ho-next"]', t: '按「全部正確，下一步：手寫簽名」', d: '你自己填的個性、過敏、特殊注意、緊急聯絡人都沒變；資料都確認好了，按鈕才會亮。'}
        ].concat(SIGN, OTP('2207'), [
          {sel: DONE, info: true, t: '簽署完成', d: '契約正本會傳到你的 LINE。把平板交還給店員。'}
        ])},
      {id: 'record', title: '接回時確認服務紀錄並簽名', who: '飼主王太太', query: Q,
        scene: '毛毛的洗澡＋剪毛做完了，你來接牠。接回前，櫃台會請你在平板上看今天做了什麼、服務前後的檢查，確認沒問題再簽名。',
        outro: '你確認了毛毛今天的服務紀錄：洗澡＋剪毛 NT$1,200 加購耳道清潔 NT$150，服務前檢查耳朵異常已告知，服務中無異狀。簽名和簡訊驗證完成後，紀錄正本傳到你的 LINE。',
        steps: [
          {sel: '[data-key="sb-record"]', t: '（櫃台阿凱）按毛毛的「服務紀錄簽名」', d: '這頁代替今日看板。服務做完、飼主來接時用。'},
          {sel: '[data-key="ho-start"]', t: '按「開始」', d: '你是王太太，接過平板了。'},
          {sel: '.ho-stage .ho-card:first-of-type', info: true, t: '今天做了什麼', d: '洗澡＋剪毛・小型犬 NT$1,200，加購耳道清潔 NT$150。誰做的、幾點記錄的都寫著。'},
          {sel: 'ul.reclist', group: true, info: true, t: '服務前檢查：耳朵異常，已告知', d: '皮膚、耳朵、眼睛、指甲、毛結、外傷或腫塊六項。耳朵有異常，阿哲 10:06 已經告訴你。'},
          {sel: '[data-key="ho-fix"]', info: true, t: '內容不對的話', d: '可以按「內容有誤，請店員更正」，平板會回到店員手上。這次內容都正確。'},
          {sel: '[data-key="ho-next"]', t: '按「內容正確，下一步：手寫簽名」', d: '簽名代表你確認了今天的服務內容。'}
        ].concat(SIGN, OTP('8821'), [
          {sel: DONE, info: true, t: '紀錄簽好了', d: '紀錄正本會傳到你的 LINE。把平板交還給店員，就可以帶毛毛回家。'}
        ])},
      /* 王太太收不到簽署連結 (prototypes/sign-link): act 4, the same walk as 'fast' with the day before's read */
      {id: 'life-link-sign', life: true, title: '第 4 幕：到店簽名', who: '飼主王太太', query: Q, seed: {life: 'link-sign'},
        scene: '10/10（六）早上 9:55，你帶毛毛來洗澡＋剪毛。昨天中午你用寵派補發的連結讀完了契約、勾好重點條款，所以到店只要確認、簽名和簡訊驗證，大約 1 分鐘。第一步由櫃台阿凱把平板交給你。',
        outro: '毛毛的契約簽好了。從打不開的連結，到寵派補發、你在家讀完，再到店裡 1 分鐘簽名：第 3 份連結走完了發出、交給 LINE、開啟、已閱讀、簽署五站。契約正本會傳到你的 LINE。',
        steps: [
          {sel: '[data-key="sb-fast"]', t: '（櫃台阿凱）按毛毛的「現場簽名」', d: '這頁代替今日看板。毛毛的契約標著「已閱讀」：王太太昨天中午讀過了。'},
          {sel: '.handover .ho-start', info: true, t: '平板交給王太太', d: '從這裡開始是飼主自己操作的畫面。店員要離開這個畫面，得按住下面的連結 2 秒，避免飼主誤按。'},
          {sel: '[data-key="ho-start"]', t: '按「開始」', d: '你是王太太，接過平板了。'},
          {sel: '.signbar', info: true, t: '上面寫著第 1 步，共 4 步', d: '契約摘要、毛孩資料確認、手寫簽名、簡訊驗證。旁邊有「暫停，交還店員」，想停下來隨時可以按。'},
          {sel: '.readmark', info: true, t: '你已經在家讀完這份契約', d: '因為讀過了，所以這次不用再讀全文，直接確認摘要就好。'},
          {sel: '.ho-card', info: true, t: '摘要：毛毛、服務、時間、費用', d: '10/10（六）10:00 洗澡＋剪毛・小型犬，NT$1,200。5 條重點條款你在家都勾過了。'},
          {sel: '[data-key="ho-agree"]', t: '按「我已閱讀並同意」', d: '想再看一次，可以按「再看一次全文」。'},
          {sel: '.ho-card', info: true, t: '確認毛毛的資料', d: '個性、攻擊性、疾病史、過敏、特殊注意、緊急聯絡人。都是你上次填的，有不對的地方可以直接修改。'},
          {sel: '[data-key="ho-next"]', t: '都對：按「全部正確，下一步：手寫簽名」', d: '毛毛這次沒有變化。按下這顆，就等於確認了你填的每一項。'}
        ].concat(SIGN, OTP('8821'), [
          {sel: DONE, info: true, t: '簽署完成', d: '契約正本會傳到你的 LINE。接下來把平板交還給店員。'},
          {sel: '[data-key="ho-back"]', t: '按「交還店員」', d: '平板回到阿凱手上。'},
          {sel: '[data-key="sb-fast"]', t: '（櫃台阿凱）按「店員確認完成」', d: '毛毛這列寫著「待店員確認」。店員確認後才算簽好。'},
          {sel: 'main.staff .srow:first-of-type', info: true, t: '毛毛：已簽', d: '今日看板上，毛毛的契約就變成已簽，可以開始服務。'}
        ])},
      /* 一份契約的一生 (prototypes/contract-life): act 5, the same walk as 'fast' with 第 4 版, read in LINE the evening before */
      {id: 'life-ct-sign', life: true, title: '第 5 幕：到店簽第 4 版', who: '飼主王太太', query: Q, seed: {life: 'ct-sign'},
        scene: '10/10（六）早上 9:55，你帶毛毛來洗澡＋剪毛。昨晚你在 LINE 把第 4 版讀完了、六條重點條款都勾了，所以到店只要確認、簽名和簡訊驗證，大約 1 分鐘。第一步由櫃台阿凱把平板交給你。',
        outro: '毛毛的第 4 版簽好了：你簽的就是昨晚讀的那一版，所以不用再讀全文。簽名、簡訊驗證、PDF 正本的雜湊和可信時間戳記一起存成這份契約的證據鏈，正本會傳到你的 LINE。',
        steps: [
          {sel: '[data-key="sb-fast"]', t: '（櫃台阿凱）按毛毛的「現場簽名」', d: '這頁代替今日看板。毛毛的契約標著「已閱讀」：王太太昨晚讀的就是現在的第 4 版。'},
          {sel: '.handover .ho-start', info: true, t: '平板交給王太太', d: '從這裡開始是飼主自己操作的畫面。店員要離開這個畫面，得按住下面的連結 2 秒，避免飼主誤按。'},
          {sel: '[data-key="ho-start"]', t: '按「開始」', d: '你是王太太，接過平板了。'},
          {sel: '.signbar', info: true, t: '上面寫著第 1 步，共 4 步', d: '契約摘要、毛孩資料確認、手寫簽名、簡訊驗證。旁邊有「暫停，交還店員」，想停下來隨時可以按。'},
          {sel: '.readmark', info: true, t: '你已經在家讀完這份契約', d: '昨晚讀的是 v4，和現在一樣。如果店家又改了版本，這裡會改成請你在平板上重讀。'},
          {sel: '.ho-card', info: true, t: '摘要：犬貓美容定型化契約・v4', d: '毛毛 10/10（六）10:00 洗澡＋剪毛・小型犬，NT$1,200。6 條重點條款你在家都勾過了。'},
          {sel: '[data-key="ho-agree"]', t: '按「我已閱讀並同意」', d: '想再看一次，可以按「再看一次全文」。'},
          {sel: '.ho-card', info: true, t: '確認毛毛的資料', d: '個性、攻擊性、疾病史、過敏、特殊注意、緊急聯絡人。有不對的地方可以直接修改。'},
          {sel: '[data-key="ho-next"]', t: '都對：按「全部正確，下一步：手寫簽名」', d: '毛毛這次沒有變化。按下這顆，就等於確認了你填的每一項。'}
        ].concat(SIGN, OTP('8821'), [
          {sel: DONE, info: true, t: '簽署完成', d: '契約正本會傳到你的 LINE。接下來把平板交還給店員。'},
          {sel: '[data-key="ho-back"]', t: '按「交還店員」', d: '平板回到阿凱手上。'},
          {sel: '[data-key="sb-fast"]', t: '（櫃台阿凱）按「店員確認完成」', d: '毛毛這列寫著「待店員確認」。店員確認後才算簽好。'},
          {sel: 'main.staff .srow:first-of-type', info: true, t: '毛毛：已簽', d: '今日看板上，毛毛的第 4 版就變成已簽，可以開始服務。'}
        ])},
      /* 毛毛住兩晚 (prototypes/stay): act 2, the 住宿同意書 read in full on the tablet (three 重點條款), then the 'live' walk without the ID */
      {id: 'life-stay-sign', life: true, title: '第 2 幕：入住前，在平板讀完住宿同意書', who: '飼主王太太', query: Q, seed: {life: 'stay-sign'},
        scene: '10/20（二）11:58，你帶毛毛和她的飼料到店入住。住宿同意書早就傳到你的 LINE，可是你一直沒空打開，所以要在櫃台平板上讀完全文、勾三條重點條款，再確認毛毛的資料、簽名和簡訊驗證。第一步由櫃台阿凱把平板交給你。',
        outro: '毛毛的住宿同意書簽好了：讀完全文，勾了費用與逾時、健康與疫苗、緊急醫療授權三條，確認了你在 LINE 填的餵食、用藥和指定動物醫院，再手寫簽名、簡訊驗證。阿凱按「店員確認完成」後，毛毛就可以入住。',
        steps: [
          {sel: '[data-key="sb-stay"]', t: '（櫃台阿凱）按毛毛的「現場簽名」', d: '這頁代替今日看板。毛毛這列寫著「住宿・含緊急醫療授權」，只有「待簽」，沒有「已閱讀」：王太太在家沒讀過。'},
          {sel: '.handover .ho-start', info: true, t: '平板交給王太太', d: '從這裡開始是飼主自己操作的畫面。店員要離開這個畫面，得按住下面的連結 2 秒，避免飼主誤按。'},
          {sel: '[data-key="ho-start"]', t: '按「開始」', d: '你是王太太，接過平板了。'},
          {sel: '.signbar', info: true, t: '這次有 5 步', d: '沒在家讀過，所以多了「契約全文」：契約摘要、契約全文、毛孩資料確認、手寫簽名、簡訊驗證。'},
          {sel: '.ho-card', info: true, t: '摘要：住宿同意書', d: '毛毛・住宿・小型犬，10/20（二）入住 → 10/22（四）退房・2 晚，NT$1,600。重點條款 3 條，讀全文時每條都要勾。'},
          {sel: '[data-key="ho-next"]', t: '按「下一步：閱讀全文」', d: '住宿同意書八條，大約 3 分鐘。'},
          {sel: '#ho-conds', info: true, t: '「同意」要等三件事', d: '閱讀時間夠了、讀到最後、3 條重點條款都勾了。按鈕上會倒數還剩多久。'},
          {sel: 'section.key:has([data-tick^="第二條"])', group: true, t: '第二條 費用與逾時：勾「我已了解」', d: '每滿 24 小時算 1 晚。超過約定退房時間 30 分鐘還沒接回，每小時加收 NT$100，收款前會先跟你說明。', until: {checked: '[data-tick^="第二條"]'}, demo: {click: '[data-tick^="第二條"]'}},
          {sel: 'section.key:has([data-tick^="第三條"])', group: true, t: '第三條 健康與疫苗：勾「我已了解」', d: '要提供一年內的疫苗紀錄。毛孩有傳染病跡象時，店家可以暫停住宿並通知你。', until: {checked: '[data-tick^="第三條"]'}, demo: {click: '[data-tick^="第三條"]'}},
          {sel: 'section.key:has([data-tick^="第五條"])', group: true, t: '第五條 緊急醫療授權：勾「我已了解」', d: '住宿期間受傷或突發疾病會立刻通知你；聯絡不到又很緊急時，你授權店家送到你指定的動物醫院。', until: {checked: '[data-tick^="第五條"]'}, demo: {click: '[data-tick^="第五條"]'}},
          {sel: '#ho-end', info: true, t: '住宿同意書到此結束', d: '讀到最後了。上面的清單會打勾：讀到最後、重點條款 3/3。'},
          {sel: '[data-key="ho-agree"]', timeout: 40000, t: '按「我已閱讀並同意」', d: '閱讀時間夠了才會亮；還沒到的話，按鈕上會寫還剩幾秒。'},
          {sel: '.ho-card', info: true, t: '確認毛毛的資料：多了住宿的三項', d: '餵食「早晚各半碗」、用藥「無」、指定動物醫院「安和動物醫院」，都是你 10/9 在 LINE 訂房時填的。'},
          {sel: '[data-key="ho-next"]', t: '都對：按「全部正確，下一步：手寫簽名」', d: '毛毛這次沒有變化。按下這顆，就等於確認了你填的每一項。'}
        ].concat(SIGN, OTP('8821'), [
          {sel: DONE, info: true, t: '簽署完成', d: '住宿同意書正本會傳到你的 LINE。接下來把平板交還給店員。'},
          {sel: '[data-key="ho-back"]', t: '按「交還店員」', d: '平板回到阿凱手上。'},
          {sel: '[data-key="sb-stay"]', t: '（櫃台阿凱）按「店員確認完成」', d: '毛毛這列寫著「待店員確認」。店員確認後才算簽好。'},
          {sel: 'main.staff .srow:has([data-key="sb-stay"])', info: true, t: '毛毛：已簽，可以入住', d: '按鈕變成「入住」。下一幕回到今日看板，幫毛毛入住狗房。'}
        ])}
    ]
  });
})();
