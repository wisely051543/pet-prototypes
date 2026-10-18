/* 客服支援（寵派後台）: hints and guided tours for test mode. Format: test-kit/flows/README.md
   小雯・客服 opens a case for a shop before looking at any booking, finds the booking by the owner's last four digits or the
   booking code, reads where the signing link went, reissues it, reveals a full phone number only with a reason, and closes
   the case. One action or one explanation per step. The prototype rewrites ?go= away, so tours ask for it to be absent.
   Every screen works on a phone; there the result list and the booking detail take turns, so a 「回到結果」 step is
   narrow-only. Searching takes about a second. */
(function () {
  var Q = {role: 'support', go: null};
  var OPEN = function (tkt, purpose, label) {
    return [
      {sel: '[data-key="open-mhr"]', t: '在毛孩日和按「開案查看」', d: '先開案，才能查看這家店的預約。'},
      {sel: '[data-key="dlg-open"] .lede', info: true, t: '寫下工單號或目的', d: '至少一項。目的會記在本案每一筆查詢上，結案前一直顯示在畫面上方。'},
      tkt ? {sel: '#tkt', t: '填工單號 ' + tkt, d: '陳老闆來電開的工單。', fill: {value: tkt, label: tkt + '（CS-' + tkt + '）'}, until: {value: ['#tkt', '^' + tkt + '$']}} : null,
      purpose ? {sel: '[data-key="pc-' + purpose + '"]', t: '目的選「' + label + '」', d: '這通電話要處理的事。', until: {checked: '[data-key="pc-' + purpose + '"]'}} : null,
      {sel: '[data-key="dlg-open"] .aud', info: true, t: '開案會留紀錄', d: '你（小雯）、時間、店家與目的。'},
      {sel: '[data-key="dlg-ok"]', t: '按「開案」', d: '開始查看毛孩日和。'},
      {settle: 600, sel: '[data-key="ctx"]', info: true, t: '正在查看：毛孩日和', d: '目的一直掛在畫面上方，結案前不會消失。'}
    ].filter(Boolean);
  };

  /* 王太太 cannot open 毛毛's signing link: open the case, find the booking, read the lanes, send a third link */
  var REISSUE = OPEN('1048', 'link', '收不到簽署連結').concat([
    {sel: '[data-key="qbar"]', info: true, t: '只查毛孩日和', d: '近 60 天到未來的預約，最多列 50 筆。可以用手機末四碼、預約碼或日期查。'},
    {sel: '#qv', t: '先只打 3 碼「882」', d: '看看打錯時系統怎麼說。', fill: {value: '882', label: '882（少一碼）'}, until: {value: ['#qv', '^882$']}},
    {sel: '[data-key="search"]', t: '按「查詢」', d: '系統會先檢查。'},
    {sel: '[data-key="qbar"]', info: true, t: '請輸入 4 位數字', d: '只認末四碼，不能用更短的數字亂查。'},
    {sel: '#qv', t: '輸入完整的末四碼 8821', d: '王太太手機的末四碼。', fill: {value: '8821', label: '8821'}, until: {value: ['#qv', '^8821$']}},
    {sel: '[data-key="search"]', t: '按「查詢」', d: '會記一筆查詢。'},
    {settle: 1200, sel: '[data-key="hits"]', info: true, t: '末四碼 8821：5 筆', d: '同一個末四碼可能是不同飼主（王○○、沈○○、韓○○…），名字只顯示一個字。要看日期和寵物確認。'},
    {sel: '[data-key="hit-w4m7"]', t: '點「毛毛・10/10（六）10:00」', d: '王○○・中山店・待簽署・連結已過期。'},
    {sel: '[data-key="lane-w4m7-0"]', info: true, t: '第 1 份：作廢', d: '10/8 21:05 發出，王太太 21:34 讀過；22:10 店家改了服務內容，改發第 2 份。'},
    {sel: '[data-key="lane-w4m7-1"]', info: true, t: '第 2 份：過期', d: '10/8 22:10 交給 LINE 後一直沒有開啟，10/9 10:10 過期了。LINE 不回報飼主有沒有看到。'},
    {sel: '[data-key="next"]', info: true, t: '下一步：補發一份新的', d: '只能送到檔案上的聯絡方式（王○○ 的 LINE）。補發後舊連結會立刻失效；契約內容與版本不變。'},
    {sel: '[data-key="nt-1"]', info: true, t: '含簽署連結的通知不能重送', d: '要用上面的「補發」，舊連結才會失效，避免飼主簽到舊的那份。'},
    {sel: '[data-key="reissue"]', t: '按「補發簽署連結」', d: '還要再確認一次。'},
    {sel: '[data-key="dlg-reissue"] .cdl', info: true, t: '補發到哪裡', d: '送到王○○ 的 LINE；舊連結立刻失效；犬貓美容契約 v3 內容不變；記在本案 #CS-1048。'},
    {sel: '[data-key="dlg-ok"]', t: '按「補發」', d: '新的連結交給 LINE。'},
    {settle: 1500, timeout: 9000, sel: '[data-key="lane-w4m7-2"]', info: true, t: '第 3 份連結：目前有效', d: '今天 11:23 交給 LINE，等王太太開啟。'},
    {sel: '[data-key="next"]', info: true, t: '已補發，送到 LINE', d: '請店家轉告王太太到 LINE 找最新一則訊息；開啟後這裡會長出下一步。'},
    {sel: '[data-key="trail"]', info: true, t: '本案留痕', d: '開案、查詢 8821、查看毛毛、補發簽署連結，每一步都有時間。'}
  ]);

  PP.register('support-console', {
    name: '客服支援',
    hints: [
      {sel: '[data-key="shops"]', t: '找商家', d: '先選店家、寫下目的，才能查看這家店的預約', tour: 'home'},
      {sel: '[data-key="open-mhr"]', t: '開案查看', d: '寫下工單號或目的，再查預約、補發連結', tour: 'reissue'},
      {sel: '[data-key="al1"]', t: '系統告警', d: 'LINE 通知失敗、封鎖率升高；可以直接開案查看', quiet: true},
      {sel: '[data-key="reveal"]', t: '顯示完整號碼', d: '要選理由；會記一筆個資查閱', tour: 'reveal'},
      {sel: '[data-key="close-case"]', t: '結案離開', d: '看本案的留痕，結案後要查得重新開案', tour: 'reveal'}
    ],
    tours: [
      {id: 'home', title: '看懂客服支援首頁', who: '小雯（寵派客服）', query: Q,
        scene: '你是寵派的客服小雯。客服支援是你每天的工作台：找商家、看系統告警、看今天結案的案。你可以查預約、補發通知與簽署連結，但不能代簽、代同意，也不能改付款或店家設定。這個引導只看不改。',
        outro: '客服支援首頁列出商家（帳務客服看不到）、系統告警和你今天結案的案。要查任何一家店的預約，都要先開案、寫下工單號或目的；每一筆查詢都記在案上。小森寵物美容停權中，仍然可以開案協助既有預約。',
        steps: [
          {sel: '[data-key="shops"]', info: true, t: '找商家', d: '先選店家、寫下目的，才能查看這家店的預約。'},
          {sel: '[data-key="fin-masked"]', info: true, t: '帳務・客服看不到', d: '每一家店的帳務客服都看不到，這裡說一次就好。'},
          {sel: '[data-key="shop-mhr"]', info: true, t: '毛孩日和・營業中', d: '中山店、信義店；聯絡人陳老闆。'},
          {sel: '[data-key="shop-xs"]', info: true, t: '小森寵物美容・已停權', d: '停權只擋新交易；既有預約有問題時，客服一樣可以開案協助。'},
          {sel: '[data-key="shop-sl"]', info: true, t: '毛孩森林・試用至 10/24', d: '試用中的店也可以開案做導入支援。'},
          {sel: '[data-key="al1"]', info: true, t: '告警：毛孩日和 LINE 通知失敗 12 筆', d: '10:58 起 LINE 逾時，多為預約確認與契約送達；必要通知已改傳簡訊。可以直接開案，或到 LINE／通知管理看失敗清單。'},
          {sel: '[data-key="al2"]', info: true, t: '告警：汪汪俱樂部封鎖率 4.1%', d: '上週 1.2%。封鎖後只收得到簡訊，簡訊用量會跟著升高。'},
          {sel: '[data-key="closed-CS-1046"]', info: true, t: '你今天結案的：2 件', d: '#CS-1046 汪汪俱樂部驗證碼鎖定、#CS-1047 悠悠導入支援；每件都寫著查詢與補發幾次。'}
        ]},
      {id: 'reissue', title: '王太太收不到簽署連結：開案、查詢、補發', who: '小雯（寵派客服）', query: Q,
        scene: '毛孩日和的陳老闆打電話來（工單 CS-1048）：王太太說毛毛 10/10 的美容契約連結打不開，手機末四碼 8821。你要開案、查出這筆預約，看連結卡在哪一步，再補發一份新的。',
        outro: '你開了案 #CS-1048，用末四碼 8821 查到毛毛 10/10（六）10:00 的美容。第 1 份連結因為店家改了服務內容作廢，第 2 份一直沒開啟、10/9 10:10 過期。你補發了第 3 份到王太太的 LINE，舊連結立刻失效，契約內容不變。開案、查詢、查看、補發，每一步都記在本案留痕。',
        steps: REISSUE},
      {id: 'reveal', title: '核對號碼後結案', who: '小雯（寵派客服）', query: Q,
        scene: '陳老闆想確認王太太留的電話是不是 0910-558-821。客服平常只看末四碼；要看完整號碼，一定要選理由，而且會記一筆個資查閱。核對完就結案。',
        outro: '你以「核對飼主身分」顯示了王○○ 的完整號碼 0910-558-821，這筆個資查閱連同理由寫進本案。結案時看過本案全部留痕（開案、查詢、查看、顯示完整號碼），案子移到「你今天結案的」。之後要再看毛孩日和，得重新開案。',
        steps: OPEN('1048', null).concat([
          {sel: '[data-key="mode-code"]', t: '改用「預約碼」查', d: '陳老闆給了預約碼。', until: {checked: '[data-key="mode-code"]'}},
          {sel: '#qv', t: '輸入預約碼 W4M7', d: '毛毛 10/10 的預約。', fill: {value: 'W4M7', label: 'W4M7'}, until: {value: ['#qv', '^W4M7$']}},
          {sel: '[data-key="search"]', t: '按「查詢」', d: '會記一筆查詢。'},
          {settle: 1200, sel: '[data-key="hit-w4m7"]', t: '點「毛毛・10/10（六）10:00」', d: '打開這筆預約。'},
          {sel: '[data-key="phone"]', info: true, t: '平常只看末四碼', d: '王○○・••••8821。名字也只顯示一個字。'},
          {sel: '[data-key="reveal"]', t: '按「顯示完整號碼」', d: '要先選理由。'},
          {sel: '[data-key="dlg-reveal"] .lede', info: true, t: '顯示完整號碼會記一筆個資查閱', d: '連同理由寫進本案，合規在稽核中心也查得到。'},
          {sel: '[data-key="dlg-ok"]', t: '先直接按「顯示並記錄」', d: '看看漏了什麼。'},
          {sel: '[data-key="dlg-reveal"] .ferr', info: true, t: '請選一個理由', d: '沒有理由就不能看完整號碼。'},
          {sel: '[data-key="why-id"]', t: '理由選「核對飼主身分」', d: '陳老闆請你核對。', until: {checked: '[data-key="why-id"]'}},
          {sel: '[data-key="dlg-ok"]', t: '按「顯示並記錄」', d: '顯示並寫進本案。'},
          {settle: 600, sel: '[data-key="phone"]', info: true, t: '0910-558-821', d: '和陳老闆說的一樣。'},
          {sel: '[data-key="trail-last"]', info: true, t: '留痕：顯示完整號碼・理由：核對飼主身分', d: '誰、什麼時候、看了誰的號碼、為什麼，都記下來。'},
          {sel: '[data-key="close-case"]', t: '按「結案離開」', d: '核對完了。'},
          {sel: '[data-key="sum"]', info: true, t: '本案全部留痕', d: '開案、查詢、查看毛毛、顯示完整號碼。結案後要再查看這家店，需要重新開案。'},
          {sel: '[data-key="dlg-ok"]', t: '按「結案」', d: '回到客服支援首頁。'},
          {settle: 600, sel: '[data-key="closed-CS-1048"]', info: true, t: '你今天結案的：#CS-1048', d: '毛孩日和 11:20 開案，結案時間與查詢次數都寫在這裡。'}
        ])},
      /* 王太太收不到簽署連結 (prototypes/sign-link): acts 1 and 2, played inside that page with ?life=<act>; not listed on this page */
      {id: 'life-reissue', life: true, seed: {life: 'link-reissue'}, title: '第 1 幕：開案、查出卡在哪、補發', who: '小雯（寵派客服）', query: Q,
        scene: '10/9（五）11:20。毛孩日和的陳老闆打電話來（工單 CS-1048）：王太太說毛毛明天 10/10 早上 10 點的美容契約連結打不開，手機末四碼 8821。你是寵派的客服小雯，要開案、查出這筆預約，看連結卡在哪一步，再補發一份新的。',
        outro: '連結卡在哪查清楚了：第 1 份因為店家改了服務內容作廢，第 2 份一直沒開啟、10/9 10:10 過期。你補發了第 3 份到王太太的 LINE，舊連結立刻失效。開案、查詢、查看、補發，每一步都記在本案。',
        steps: REISSUE},
      {id: 'life-close', life: true, seed: {life: 'link-close'}, title: '第 2 幕：核對號碼後結案', who: '小雯（寵派客服）', query: Q,
        scene: '10/9（五）11:24。第 3 份連結已經交給 LINE。陳老闆說王太太不常看 LINE，他想打電話提醒她，要你先核對她留的電話是不是 0910-558-821。客服平常只看末四碼；要看完整號碼得選理由，而且會記一筆個資查閱。核對完就結案。',
        outro: '你把該轉告王太太的話複製給陳老闆，以「核對飼主身分」看了完整號碼 0910-558-821，這筆查閱連同理由寫進本案。結案時看過全部留痕：開案、查詢、查看、補發、顯示完整號碼。下一幕換你當王太太，打開那份新連結。',
        steps: [
          {sel: '[data-key="lane-w4m7-2"]', info: true, t: '第 3 份連結：目前有效', d: '11:23 交給 LINE，等王太太開啟。第 1、2 份都已失效。'},
          {sel: '[data-key="copy-guide"]', t: '按「複製給商家的說明」', d: '陳老闆要轉告王太太：到 LINE 找最新一則訊息，簽名到店再做。'},
          {sel: '[data-key="phone"]', info: true, t: '平常只看末四碼', d: '王○○・••••8821。名字也只顯示一個字。'},
          {sel: '[data-key="reveal"]', t: '按「顯示完整號碼」', d: '要先選理由。'},
          {sel: '[data-key="dlg-reveal"] .lede', info: true, t: '顯示完整號碼會記一筆個資查閱', d: '連同理由寫進本案，合規在稽核中心也查得到。'},
          {sel: '[data-key="why-id"]', t: '理由選「核對飼主身分」', d: '陳老闆請你核對。', until: {checked: '[data-key="why-id"]'}},
          {sel: '[data-key="dlg-ok"]', t: '按「顯示並記錄」', d: '顯示並寫進本案。'},
          {settle: 600, sel: '[data-key="phone"]', info: true, t: '0910-558-821', d: '和陳老闆說的一樣，他可以打給王太太了。'},
          {sel: '[data-key="trail-last"]', info: true, t: '留痕：顯示完整號碼・理由：核對飼主身分', d: '誰、什麼時候、看了誰的號碼、為什麼，都記下來。'},
          {sel: '[data-key="close-case"]', t: '按「結案離開」', d: '連結補發了，號碼也核對了。'},
          {sel: '[data-key="sum"]', info: true, t: '本案全部留痕', d: '開案、查詢、查看毛毛、補發簽署連結、顯示完整號碼。結案後要再查看這家店，需要重新開案。'},
          {sel: '[data-key="dlg-ok"]', t: '按「結案」', d: '回到客服支援首頁。'},
          {settle: 600, sel: '[data-key="closed-CS-1048"]', info: true, t: '你今天結案的：#CS-1048', d: '毛孩日和 11:20 開案，查詢與補發次數都寫在這裡。'}
        ]},
      {id: 'otp', title: '芋圓的飼主驗證碼鎖住了：不用補發', who: '小雯（寵派客服）', query: Q,
        scene: '毛孩日和信義店打電話來：芋圓今天 14:00 要洗澡，沈先生簽契約時驗證碼一直打錯，被鎖住了。預約碼 U6E3。你要查出卡在哪，判斷要不要補發。',
        outro: '芋圓的契約連結沒有問題：沈先生 LINE 身分沒通過，改用簡訊驗證碼，兩組碼累計錯 10 次，被鎖到 11:23。鎖定期間補發的連結一樣要驗證，所以不用補發；請他 11:23 後重開原連結，會寄新碼，這一小時還能再寄 3 封。客服看不到驗證碼；驗證碼用完還簽不了時，預約退回店家，改期或稍後再簽。',
        steps: OPEN(null, 'otp', '驗證碼鎖定').concat([
          {sel: '[data-key="mode-code"]', t: '改用「預約碼」查', d: '信義店給了預約碼。', until: {checked: '[data-key="mode-code"]'}},
          {sel: '#qv', t: '輸入預約碼 U6E3', d: '芋圓今天的預約。', fill: {value: 'U6E3', label: 'U6E3'}, until: {value: ['#qv', '^U6E3$']}},
          {sel: '[data-key="search"]', t: '按「查詢」', d: '會記一筆查詢。'},
          {settle: 1200, sel: '[data-key="hit-u6e3"]', t: '點「芋圓・今天 14:00」', d: '沈○○・信義店・驗證碼鎖定中。'},
          {sel: '[data-key="end-u6e3-0"]', info: true, t: '11:08 驗證碼鎖定', d: 'LINE 身分沒通過，改用簡訊驗證碼；一組碼錯 5 次就作廢，兩組累計錯 10 次鎖 15 分鐘。'},
          {sel: '[data-key="otp"]', info: true, t: '客服看不到驗證碼', d: '鎖定到 11:23；這一小時已寄 2 / 5 封。驗證碼用完還簽不了時，預約退回店家，改期或稍後再簽。'},
          {sel: '[data-key="next"]', info: true, t: '等 11:23 鎖定解除：不用補發', d: '鎖定期間補發連結也一樣要驗證。請飼主 11:23 後重開原連結，會寄新碼。'},
          {sel: '[data-key="copy-guide"]', info: true, t: '可以複製說明給店家', d: '店家轉告沈先生該怎麼做，你不用自己聯絡飼主。'}
        ])}
    ]
  });
})();
