/* 金流設定（寵派後台）: hints and guided tours for test mode. Format: test-kit/flows/README.md
   冠宇・最高管理者 reads how 綠界's payment callbacks travel through five stops, opens one callback and its masked raw text,
   marks the forged callbacks reviewed, and switches the environment to 測試 and back to 正式. One action or one explanation
   per step. The prototype rewrites ?go= away, so tours ask for it to be absent. On a phone (under 720 px) marking and
   switching say "請用電腦", so those tours need a wide screen; reading the pipe and a callback work everywhere. */
(function () {
  var S = {role: 'super', go: null};
  var TO_TEST = [
    {sel: '[data-key="tab-env"]', t: '按「環境與金鑰」', d: '切換環境在這裡。'},
    {sel: '[data-key="sw-open"]', t: '按「切換到測試環境」', d: '先切到測試環境，工程才能在那裡驗證。'},
    {sel: '#sw-why', t: '寫下切換原因', d: '至少 10 個字。', fill: {value: '工程要在測試環境重現汪汪的發票逾時', label: '工程要在測試環境重現汪汪的發票逾時'}, until: {value: ['#sw-why', '.{10,}']}},
    {sel: '#sw-type', t: '輸入「測試環境」確認', d: '打一次名稱，避免手滑切錯。', fill: {value: '測試環境', label: '測試環境'}, until: {value: ['#sw-type', '^測試環境$']}},
    {sel: '[data-key="dlg-ok"]', t: '按「切到測試環境」', d: '會寫進操作紀錄，稽核中心會列出。'}
  ];

  PP.register('gateway-settings', {
    name: '金流設定',
    minWidth: 720,   /* 手機只能看；標記已查看、切換環境要用電腦 */
    hints: [
      {sel: '[data-key="pipe"]', t: '收款通知走到哪一站', d: '綠界送來的每一則通知，停在它最後到的那一站', tour: 'read'},
      {sel: '[data-key="bd-c02"]', t: '一則收款通知', d: '點一顆看它走過的站、通知內容與遮罩過的原文', tour: 'callback'},
      {sel: '[data-key="op-rej-go"]', t: '假冒的收款通知', d: '驗簽擋下了 3 則；查看後寫結論標記', tour: 'forged'},
      {sel: '[data-key="sw-open"]', t: '切換環境', d: '切到測試要寫原因、輸入名稱；切回正式還要五項檢核', tour: 'totest'},
      {sel: '[data-key="tband-go"]', t: '切回正式環境', d: '五項檢核、工程確認人、工單、原因', tour: 'toprod'},
      {sel: '[data-key="st-go"]', t: '起點：送出的扣款', d: '寵派送出幾家；綠界還沒回的，停在這裡等', quiet: true},
      {sel: '[data-key="tab-log"]', t: '回呼紀錄', d: '7/28 上線以來的所有收款通知，可以依環境、期間、結果、商家篩選', quiet: true},
      {sel: '[data-key="op-inv-go"]', t: '到付款管理重開發票', d: '發票要在付款管理重開', quiet: true},
      {sel: '[data-key="win-7"]', t: '時間範圍', d: '近 24 小時、近 7 天、本月', quiet: true}
    ],
    tours: [
      {id: 'read', title: '看懂通道健康：收款通知走到哪一站', who: '冠宇（寵派最高管理者）', query: S, minWidth: 0,
        scene: '寵派每月 1 日 03:00 透過綠界向店家扣月費。綠界扣完會送「收款通知」回來，寵派要驗簽、去重、入帳、開發票。你想看懂本月 12 則通知各停在哪一站，哪些還要處理。這個引導只看不改。',
        outro: '本月 12 則收款通知：驗簽擋下 3 則假冒的；1 則重複通知已忽略、沒有重複入帳；1 則當時寫不進帳務、請綠界重送後補上；汪汪俱樂部入帳了但發票待重開。「還沒處理完的」不受時間範圍影響，切到近 24 小時也一直在。',
        steps: [
          {sel: '[data-key="strip"]', info: true, t: '最近一次扣款 10/8 03:00', d: '已扣款 1 家、收到 1 則，都回來了。最後收到 10/8 03:05（綠界重送）；下次自動扣款 11/1 03:00，4 家；還沒處理完 2 件。'},
          {sel: '[data-key="st-go"]', info: true, t: '起點：已送出扣款 5 家', d: '本月寵派送出 8 筆扣款（含重試 3）。每一筆綠界都要回一則通知；送出了還沒回的，會用虛線圈停在這裡。'},
          {sel: '[data-key="st-0"]', info: true, t: '第 1 站：收到 12 則', d: '每一顆是一則通知，停在它最後到的那一站。顆粒上的字是店名的第一個字。'},
          {sel: '[data-key="tray-rej"]', info: true, t: '驗簽：拒收 3', d: '簽章不符，只記錄、沒有入帳。3 則都自稱悠悠寵物旅館已付款——是假冒的。'},
          {sel: '[data-key="tray-dup"]', info: true, t: '去重：重複 1・已忽略', d: '綠界把汪汪俱樂部同一筆交易又通知一次；寵派回覆收到，但不會重複入帳。'},
          {sel: '[data-key="tray-503"]', info: true, t: '處理：回 503・已補上', d: '10/8 03:00 帳務暫時寫不進去，回 503 請綠界重送；03:05 重送後處理好了。'},
          {sel: '[data-key="st-3"]', info: true, t: '處理：入帳 2、扣款失敗 6', d: '扣款失敗的（悠、肉、小）會交給付款管理去重試、寄補款連結。'},
          {sel: '[data-key="tray-wait"]', info: true, t: '開發票：待重開 1', d: '汪汪俱樂部款項已入帳，但電子發票平台沒有回應（逾時）。'},
          {sel: '[data-key="open-sheet"]', info: true, t: '還沒處理完的 2 件', d: '汪汪的發票要到付款管理重開；10/7 的假冒通知要有人查看、寫結論。'},
          {sel: '[data-key="win-24"]', t: '按「近 24 小時」', d: '換個時間範圍看看。', until: {checked: '[data-key="win-24"]'}},
          {sel: '[data-key="pipe-empty"]', info: true, t: '近 24 小時沒有收到通知', d: '這很正常：扣款集中在每月 1 日，下次是 11/1 03:00。'},
          {sel: '[data-key="open-sheet"]', info: true, t: '還沒處理完的照樣在', d: '這一區不受上面的時間範圍影響，不會因為換了範圍就漏看。'}
        ]},
      {id: 'callback', title: '看一則收款通知的細節與原文', who: '冠宇（寵派最高管理者）', query: S, minWidth: 0,
        scene: '付款管理說汪汪俱樂部 10 月的發票沒開出來。你想看綠界那一則收款通知走過哪幾站、內容是什麼；必要時看原文。小心：看原文會留下紀錄，卡號和簽章一律遮罩。',
        outro: '汪汪俱樂部 10/1 03:01 的扣款成功通知：驗簽相符、第一次收到、入帳 NT$4,578，開發票時逾時，要到付款管理重開。原文的簽章與卡號遮罩，你的這次查看記在稽核中心的查詢紀錄。03:07 那則重複通知停在去重，沒有重複入帳。',
        steps: [
          {sel: '[data-key="bd-c02"]', t: '點「開發票」那站的「汪」', d: '汪汪俱樂部的扣款成功通知。'},
          {sel: '[data-key="trc"]', info: true, t: '走過的站', d: '10/1 03:01 收到 → 驗簽相符 → 第一次收到 → 入帳 NT$4,578 → 開發票失敗（03:04 逾時）。'},
          {sel: '[data-key="cb-kv"]', info: true, t: '通知內容', d: '交易編號 T2610010301022、訂單 PAY-2610-ww、結果碼 00 成功、回給綠界「收到（200）」。來源位址只顯示 210.200.*.*。'},
          {sel: '[data-key="raw-btn"]', t: '按「看原文（已遮罩）」', d: '綠界送來的原始資料。會留下紀錄。'},
          {sel: '[data-key="raw"]', info: true, t: '原文：簽章與卡號都遮住', d: '寵派不經手卡號，這裡也看不到完整簽章；只有查問題時才需要看。'},
          {sel: '.dp .aud', info: true, t: '這次查看已記在稽核中心', d: '誰在什麼時候看過原文，合規都查得到。'},
          {sel: '[data-key="cb-bill"]', info: true, t: '發票要到付款管理重開', d: '這裡只看通知；帳單與發票的處理在付款管理。'},
          {sel: '[data-key="dp-x"]', t: '按 ✕ 關閉', d: '回到通道健康。'},
          {sel: '[data-key="bd-c06"]', t: '點「去重」那站的「汪」', d: '同一筆交易的第二次通知。'},
          {sel: '[data-key="trc"]', info: true, t: '去重：已處理過', d: '10/1 03:07 又通知一次；03:01 已經處理，回覆收到，沒有重複入帳。後面兩站沒有走到。'},
          {sel: '[data-key="dp-x"]', t: '按 ✕ 關閉', d: '回到通道健康。'}
        ]},
      {id: 'forged', title: '假冒的收款通知：查看後標記', who: '冠宇（寵派最高管理者）', query: S,
        scene: '10/7 晚上有 3 則「收款通知」自稱悠悠寵物旅館已付月費，驗簽擋下了。你請工程的建宏查過，來源是境外掃描。你要看一下這 3 則，寫下結論標記已查看。',
        outro: '3 則假冒通知簽章不符、來源不在綠界公布的位址，驗簽擋下、沒有入帳，悠悠的 10 月帳單仍是逾期。結論「建宏確認來源是境外掃描，驗簽有擋下，不需處理」寫進操作紀錄，移到「已查看」，待處理少一件。封鎖位址是工程的防火牆設定，不在這裡。',
        steps: [
          {sel: '[data-key="op-rej"]', info: true, t: '10/7 有 3 則假冒的收款通知', d: '自稱悠悠寵物旅館已付 NT$2,079；簽章不符、來源不在綠界公布的位址。'},
          {sel: '[data-key="op-rej-go"]', t: '按「標記已查看」', d: '先看清楚這 3 則。'},
          {sel: '.dp .lede', info: true, t: '沒有入帳，帳單也沒改', d: '來源 198.51.100.* 不在綠界公布的位址。驗簽擋下了，悠悠的 10 月帳單仍是逾期。'},
          {sel: '[data-key="rej-list"]', info: true, t: '這 3 則', d: '10/7 22:41–22:42，同一個自稱的交易編號，都回 400 拒收。'},
          {sel: '.dp .dsec .hint', info: true, t: '這裡不能封鎖位址', d: '連續出現時通知工程查來源；擋人是工程的防火牆設定。'},
          {sel: '#rj-c', t: '先只寫「看過了」', d: '看看結論太短時系統怎麼說。', fill: {value: '看過了', label: '看過了（太短了）'}, until: {value: ['#rj-c', '^看過了$']}},
          {sel: '[data-key="rj-ok"]', t: '按「標記已查看」', d: '系統會先檢查結論。'},
          {sel: '.dp .field:has(#rj-c)', info: true, t: '結論至少 10 個字', d: '「再多寫一點，至少 10 個字（目前 3 個字）」。結論會寫進操作紀錄。'},
          {sel: '#rj-c', t: '寫下完整的結論', d: '寫清楚誰查過、怎麼判斷。', fill: {value: '建宏確認來源是境外掃描，驗簽有擋下，不需處理', label: '建宏確認來源是境外掃描，驗簽有擋下，不需處理'}, until: {value: ['#rj-c', '.{10,}']}},
          {sel: '[data-key="rj-ok"]', t: '按「標記已查看」', d: '會寫進操作紀錄。'},
          {settle: 900, sel: '[data-key="seenbox"]', info: true, t: '移到「已查看」', d: '冠宇 10/9 11:20 已查看，結論原文留著；按「再看一次」可以重看。'},
          {sel: '[data-key="tray-rej"]', info: true, t: '拒收 3・已查看', d: '通道上的那一區也標著已查看。'},
          {sel: '[data-key="strip"]', info: true, t: '還沒處理完：2 → 1', d: '剩下汪汪俱樂部的發票要到付款管理重開。'}
        ]},
      {id: 'totest', title: '切到測試環境', who: '冠宇（寵派最高管理者）', query: S,
        scene: '工程要在測試環境重現汪汪俱樂部的發票逾時，請你把金流切到測試環境。小心：切過去之後，新的自動扣款與新寄出的付款連結都不會真的收錢。',
        outro: '金流切到測試環境（10/9 11:20 起），原因寫進切換紀錄、稽核中心也會列出。之後新的扣款與付款連結不會真的收錢；已寄出的肉球、毛孩日和連結照正式環境走完。畫面上方一直掛著「現在是測試環境」，11/1 03:00 自動扣款前要切回正式。',
        steps: [
          {sel: '[data-key="envp"]', info: true, t: '現在：正式環境', d: '10/6 14:02 起。真的向店家扣款、開立電子發票。'},
          TO_TEST[0],
          {sel: '[data-key="envc-prod"]', info: true, t: '正式環境的金鑰只顯示末四碼', d: '金鑰放在密鑰保管服務，由工程更換；這裡不能顯示或複製完整金鑰。'},
          {sel: '[data-key="ck-sheet"]', info: true, t: '切到正式前要過五項檢核', d: '最近一次 10/6 建宏（工程）・ENG-212。切到測試不用檢核，切回正式才要。'},
          TO_TEST[1],
          {sel: '[data-key="dlg"] .cdl', info: true, t: '切過去之後不會真的收錢', d: '新的自動扣款與新寄出的付款連結都不收錢；已寄出的肉球、毛孩日和連結照正式環境走完；11/1 03:00 切回正式前不會真的扣款。'},
          {sel: '[data-key="dlg-ok"]', t: '先直接按「切到測試環境」', d: '看看漏了什麼。'},
          {sel: '[data-key="dlg"] .field:has(#sw-why)', info: true, t: '原因與名稱都要填', d: '「請寫下為什麼要切換」「請輸入「測試環境」」。'},
          TO_TEST[2], TO_TEST[3], TO_TEST[4],
          {settle: 900, sel: '[data-key="tband"]', info: true, t: '畫面上方：現在是測試環境', d: '這條提醒會一直掛著：11/1 03:00 自動扣款前要切回正式。'},
          {sel: '[data-key="envc-test"]', info: true, t: '測試環境：使用中', d: '發票開在綠界的測試平台。'},
          {sel: '[data-key="sh-0"]', info: true, t: '切換紀錄多一行', d: '10/9 11:20 正式 → 測試，原因「工程要在測試環境重現汪汪的發票逾時」，冠宇。'}
        ]},
      {id: 'toprod', title: '切回正式環境：五項檢核', who: '冠宇（寵派最高管理者）', query: S,
        scene: '工程在測試環境驗完了。11/1 自動扣款前一定要切回正式，否則店家的月費收不到。切回正式比較嚴格：每次都要五項重測；這次沒重測的，要逐項確認沿用舊結果，還要記下工程確認人、工單編號和原因。這個引導先幫你切到測試環境，再馬上切回來，所以五項都還沒有新結果。',
        outro: '金流切回正式環境：五項都逐項確認沿用 10/6 的結果、工程確認人建宏、工單 ENG-231，原因與沿用的項目都寫進切換紀錄，稽核中心也會列出。上方的測試環境提醒消失，新的扣款與付款連結會真的收錢；在測試環境建立的連結不會搬過去，需要時重寄。',
        steps: TO_TEST.concat([
          {settle: 900, sel: '[data-key="tband"]', info: true, t: '現在是測試環境', d: '上一個引導做過的事。接下來切回正式。'},
          {sel: '[data-key="tband-go"]', t: '按「切回正式環境」', d: '打開切回正式的確認視窗。'},
          {sel: '[data-key="dlg"] .cdl', info: true, t: '切回之後會真的收錢', d: '在測試環境建立的連結不會搬過去，需要時重寄；11/1 03:00 會向 4 家扣款。'},
          {sel: '[data-key="sw-kept"]', info: true, t: '這次沒有重測 5 項', d: '剛切過去，五項都還沒有新結果。要沿用 10/6 的結果，就逐項確認；會記進切換紀錄。工程重測過的項目會另列在上面。'},
          {sel: '[data-key="swc-rec"]', t: '確認沿用：定期定額扣款', d: '10/6 13:15 測試交易 T2610061314001 扣款成功、入帳。', until: {checked: '[data-key="swc-rec"]'}},
          {sel: '[data-key="swc-retry"]', t: '確認沿用：扣款失敗重試', d: '10/6 13:24 失敗後重試成功。', until: {checked: '[data-key="swc-retry"]'}},
          {sel: '[data-key="swc-idem"]', t: '確認沿用：收款通知不重複入帳', d: '10/6 13:31 同一筆第二次通知，沒有重複入帳。', until: {checked: '[data-key="swc-idem"]'}},
          {sel: '[data-key="swc-inv"]', t: '確認沿用：電子發票開立與作廢', d: '10/6 13:48 ZZ-00000002 開立後作廢。', until: {checked: '[data-key="swc-inv"]'}},
          {sel: '[data-key="swc-fee"]', t: '確認沿用：手續費', d: '10/6 13:51 9 月對帳單逐筆核對，與合約報價一致。', until: {checked: '[data-key="swc-fee"]'}},
          {sel: '[data-key="sw-checks"]', info: true, t: '五項都確認了', d: '少一項就不能切回正式。'},
          {sel: '#sw-eng', t: '工程確認人：建宏', d: '記下名字，不是另一個帳號。', fill: {value: '建宏（工程）', label: '建宏（工程）'}, until: {value: ['#sw-eng', '建宏']}},
          {sel: '#sw-tk', t: '工單編號', d: 'ENG- 加數字。', fill: {value: 'ENG-231', label: 'ENG-231'}, until: {value: ['#sw-tk', '^ENG-\\d+$']}},
          {sel: '#sw-why', t: '寫下切換原因', d: '至少 10 個字。', fill: {value: '工程確認汪汪的發票逾時已重現完畢', label: '工程確認汪汪的發票逾時已重現完畢'}, until: {value: ['#sw-why', '.{10,}']}},
          {sel: '#sw-type', t: '輸入「正式環境」確認', d: '打一次名稱，避免手滑。', fill: {value: '正式環境', label: '正式環境'}, until: {value: ['#sw-type', '^正式環境$']}},
          {sel: '[data-key="dlg-ok"]', t: '按「切到正式環境」', d: '會寫進操作紀錄，稽核中心會列出。'},
          {settle: 900, sel: '[data-key="envp"]', info: true, t: '回到正式環境', d: '上方的測試環境提醒消失了。新的扣款與付款連結會真的收錢。'},
          {sel: '[data-key="sh-0"]', info: true, t: '切換紀錄：測試 → 正式', d: '工程確認人建宏、工單 ENG-231、原因，還有沿用舊結果的 5 項，都記下來。'}
        ])},
      /* 毛孩日和的月費 (prototypes/monthly-fee): act 3, played inside that page with ?life=fee-cb (10/9 16:50, after the 補差額 link was
         paid at 16:45); not listed on this page */
      {id: 'life-fee-cb', life: true, seed: {life: 'fee-cb'}, title: '第 3 幕：綠界說錢收到了', who: '美玲（寵派財務）', query: {role: 'finance', go: null}, minWidth: 0,
        scene: '10/9（五）下午 4:50。毛孩日和的會計 4:45 付了你早上寄的補差額連結。收工前你要對帳，先到金流設定看綠界送來的收款通知：毛孩日和今天有兩則，一則是陳老闆早上刷卡沒過，一則是剛剛付成功。',
        outro: '毛孩日和今天兩則收款通知：10:40 陳老闆自己升級，扣款失敗（額度不足），不重試；16:45 補差額連結付款成功：驗簽相符、第一次收到、入帳 NT$1,558、開立發票 YQ-48231140。交易編號 T2610091645052、訂單 PAY-2610-mhr-up；原文的簽章與卡號遮罩，你的查看記在稽核中心。下一幕換你當陳老闆。',
        steps: [
          {sel: '[data-key="strip"]', info: true, t: '最後收到 10/9 16:45：毛孩日和', d: '寄出未付的連結從 2 個變 1 個：毛孩日和的已經付了。'},
          {sel: '[data-key="bd-u1"]', t: '點「處理」那站的「和」', d: '早上 10:40 那一則。'},
          {sel: '[data-key="trc"]', info: true, t: '扣款失敗（額度不足）', d: '陳老闆自己升級，刷卡沒過；方案維持基本方案，自己升級的付款不重試。'},
          {sel: '[data-key="dp-x"]', t: '按 ✕ 關閉', d: '回到通道健康。'},
          {sel: '[data-key="bd-u2"]', t: '點「開發票」那站最前面的「和」', d: '16:45 那一則，補差額連結。'},
          {sel: '[data-key="trc"]', info: true, t: '走完五站', d: '16:45 收到 → 驗簽相符 → 第一次收到 → 入帳 NT$1,558，立即改為專業方案 → 開立發票 YQ-48231140。'},
          {sel: '[data-key="cb-kv"]', info: true, t: '通知內容', d: '交易編號 T2610091645052、訂單 PAY-2610-mhr-up（不是 10 月月費的 PAY-2610-mhr）、結果碼 00 成功、回給綠界「收到（200）」。'},
          {sel: '[data-key="raw-btn"]', t: '按「看原文（已遮罩）」', d: '綠界送來的原始資料。會留下紀錄。'},
          {sel: '[data-key="raw"]', info: true, t: '原文：簽章與卡號都遮住', d: '寵派不經手卡號；對帳只需要交易編號、訂單與金額。'},
          {sel: '[data-key="cb-bill"]', info: true, t: '帳單在付款管理', d: '這裡只看通知；這筆補差額的帳單、發票與對帳在付款管理。'}
        ]}
    ]
  });
})();
