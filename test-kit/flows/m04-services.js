/* M-04 服務與價格: hints and guided tours for test mode. Format: test-kit/flows/README.md
   Tours speak the shop's voice: 寵物, not 毛孩. One action or one explanation per step. */
(function () {
  var Q = {role: 'admin', tab: null, s: null, off: null, fail: null, susp: null};

  PP.register('m04-services', {
    name: '服務與價格',
    minWidth: 720,   /* 手機上只能查看 */
    hints: [
      {sel: '[data-key="new"]', t: '新增服務', d: '名稱、分類、各體型的價格與時間'},
      {sel: '.cell[data-key^="c-"]', t: '改價', d: '點格子直接改；可以選立即或某一天生效', tour: 'price'},
      {sel: '[data-key^="n-"]', t: '打開服務設定', d: '分店、契約、預約設定、價格紀錄、停用', tour: 'stop'},
      {sel: '[data-key="scope"]', t: '分店範圍', d: '只看某家分店提供的服務', quiet: true},
      {sel: '[data-key="p-on"]', t: '啟用服務', d: '價格和時間都齊了，飼主才看得到', tour: 'finish'},
      {sel: '[data-key="stop"]', t: '停用服務', d: '新預約看不到；已建立的預約照常進行', tour: 'stop'}
    ],
    tours: [
      {id: 'price', title: '幫精緻美容漲價，11/1 起生效', who: '陳老闆（店家管理者）', query: Q,
        scene: '小型犬的精緻美容要從 NT$1,500 漲到 NT$2,000，從 11/1 開始。你想知道已經約好的客人會不會被多收錢，再把改價排好。',
        outro: '精緻美容・小型犬排好 11/1 起改成 NT$2,000。現在還是 NT$1,500，表格裡多了一顆虛線的「11/1 起」標籤。11/1 00:00 前建立的預約都用原價：花生、嘟嘟、麻糬三筆排在 11/1 之後，也維持 NT$1,500。',
        steps: [
          {sel: 'table.mx thead', info: true, t: '一列是一項服務，一欄是一種體型', d: '小型犬、中型犬、大型犬、貓。格子裡上面是價格、下面是時間；寫「不提供」的就是那個體型不做。'},
          {sel: '[data-row="bath"] .sch', group: true, info: true, t: '虛線的標籤：排好但還沒生效的價格', d: '基礎洗澡已經排了 10/15 起改價。虛線代表還沒生效。'},
          {sel: '[data-key="c-spa-s"]', t: '按「精緻美容・小型犬」那一格', d: '現在 NT$1,500、2 小時。這一列會直接變成可以輸入的格子。'},
          {sel: '#e-s-p', t: '價格改成 2000', d: '直接在格子裡改。', fill: {value: '2000', label: '2000'}, until: {value: ['#e-s-p', '^2000$']}},
          {sel: '.tr-ch', info: true, t: '這次改了：小型犬 1,500 → 2,000', d: '原本的價格劃掉，旁邊寫新的價格。'},
          {sel: '.tr-im', info: true, t: '如果立即生效：4 筆預約維持原價', d: '已經建立的預約維持建立時的價格，不會因為漲價被多收：球球、花生、嘟嘟、麻糬都還是 NT$1,500。'},
          {sel: '[data-key="eff-nov1"]', t: '什麼時候生效：選「11/1」', d: '也可以選立即、明天或其他日期。'},
          {sel: '.tr-im', info: true, t: '看建立的時間，不是看預約的日期', d: '11/1 00:00 前建立的預約都用原價，包括排在 11/1 之後的：花生 11/2、嘟嘟 11/6、麻糬 11/14 都維持 NT$1,500。'},
          {sel: '[data-key="e-save"]', t: '按「儲存，11/1 起生效」', d: '按鈕上直接寫著生效日。'},
          {sel: '[data-key="c-spa-s"]', info: true, settle: 1000, t: '格子裡多了「11/1 起 NT$2,000」', d: '現在還是 NT$1,500；虛線標籤寫著排程中、還沒生效。'},
          {sel: '.head .sub', info: true, t: '排程改價從 1 項變 2 項', d: '每次改價都寫入價格紀錄和稽核紀錄；已建立的預約明細不會被改。'}
        ]},
      {id: 'finish', title: '補完「貓咪剃毛」並啟用', who: '陳老闆（店家管理者）', query: Q,
        scene: '中山店要開始做貓咪剃毛，價格 NT$1,800 已經填了，但還沒填要多久。缺時間的服務排不出時段，飼主也看不到。你要補上時間，再把服務啟用。',
        outro: '貓咪剃毛補上 2 小時，資料齊全後按「啟用服務」：「未完成」標籤不見了，提供中的服務從 7 項變 8 項。飼主在 LIFF 與公開網頁就看得到，也能預約。',
        steps: [
          {sel: '[data-row="catshave"]', info: true, t: '「貓咪剃毛」標著未完成', d: '貓的格子寫著 NT$1,800，但下面是「缺時間」。其他體型不提供。'},
          {sel: '[data-key="n-catshave"]', t: '按服務名稱「貓咪剃毛」', d: '右邊會打開這項服務的設定。'},
          {sel: '.dp .dsec:first-of-type', info: true, t: '啟用前還要補：貓缺時間', d: '「啟用服務」是灰的，旁邊寫著還差什麼。'},
          {sel: '[data-key="p-edit"]', t: '按「在表格裡補齊價格與時間」', d: '價格與時間都在表格裡改。'},
          {sel: '.tr-eff', info: true, t: '還沒啟用：存檔後直接套用', d: '這項服務還沒開放，所以不用選生效日，也沒有預約用到它。'},
          {sel: '#e-c-t', t: '貓的時間選「2 小時」', d: '時間決定一個時段要佔多久。', fill: {value: '120', label: '2 小時'}, until: {value: ['#e-c-t', '^120$']}},
          {sel: '.tr-ch', info: true, t: '這次改了：貓的時間 缺 → 2 小時', d: '價格 NT$1,800 不變，只補上時間。'},
          {sel: '[data-key="e-save"]', t: '按「儲存」', d: '表格收起來。'},
          {settle: 1100, sel: '[data-key="n-catshave"]', t: '再按一次「貓咪剃毛」', d: '回到服務設定看看。'},
          {sel: '.dp .dsec:first-of-type', info: true, t: '資料齊全，可以啟用', d: '「啟用服務」亮了。'},
          {sel: '[data-key="p-on"]', t: '按「啟用服務」', d: '飼主在 LIFF 與公開網頁就看得到這項服務。'},
          {sel: '.head .sub', info: true, settle: 1000, t: '提供中從 7 項變 8 項', d: '「未完成」不見了。貓咪剃毛只在中山店提供，需要簽犬貓美容定型化契約。'}
        ]},
      {id: 'stop', title: '停用一項服務', who: '陳老闆（店家管理者）', query: Q,
        scene: '精緻美容的美容師要離職，你打算先停用這項服務一段時間。停用前要先知道：已經約好的客人怎麼辦？用到的契約模板會不會變成沒人用？',
        outro: '精緻美容停用了：新預約看不到，已經建立的 7 筆預約（歐告、球球、布丁……）照常進行、價格不變。「高齡犬美容告知」這份契約現在沒有服務使用。隨時可以按「重新啟用」。',
        steps: [
          {sel: '[data-key="n-spa"]', t: '按服務名稱「精緻美容」', d: '右邊會打開這項服務的設定。'},
          {sel: '.dp .dsec:has([data-key="p-need-lock"])', info: true, t: '契約：一律需要簽約', d: '美容服務依農業部的犬貓美容定型化契約，這個開關不能關。精緻美容另外用「高齡犬美容告知」。'},
          {sel: '[data-key="stop"]', t: '按最下面的「停用服務」', d: '新預約看不到；已建立的預約照常進行。按了會先問你。'},
          {sel: '.dialog .cdl', info: true, t: '停用前先看後果', d: '7 筆預約照常進行、價格不變；LIFF 與公開網頁立即不顯示；「高齡犬美容告知」停用後沒有服務使用它。'},
          {sel: '.dialog .kp', info: true, t: '照常進行的 7 筆預約', d: '歐告今天 15:00、球球今天 16:00、布丁 10/11……一筆一筆列出來，方便你通知美容師排班。'},
          {sel: '[data-key="dg-ok"]', t: '按「確認停用」', d: '紅色的按鈕：這是會影響飼主的操作。'},
          {sel: '[data-row="spa"] th', info: true, settle: 1000, t: '精緻美容寫著「已停用・10/9」', d: '格子不能再點來改價。'},
          {sel: '[data-key="re-on"]', info: true, t: '隨時可以重新啟用', d: '右邊的設定裡多了「重新啟用」，飼主與店員又能選到這個服務。'}
        ]},
      {id: 'life-sv-finish', life: true, query: Q, seed: {life: 'sv-finish'}, title: '第 1 幕：補完時間，啟用貓咪剃毛', who: '陳老闆（店家管理者）',
        scene: '10/9（五）11:20。中山店要開始做貓咪剃毛，昨天你先建了這項服務，貓的價格 NT$1,800 填好了，但還沒填要做多久。缺時間的服務排不出時段，飼主也看不到。補上時間，再把服務啟用。',
        outro: '貓咪剃毛補上 2 小時並啟用了：「未完成」不見了，提供中從 7 項變 8 項。飼主在 LINE 和公開網頁就看得到，只有中山店提供、只適用貓，要簽犬貓美容定型化契約。下一幕看它會用到哪些美容台。',
        steps: [
          {sel: '[data-row="catshave"]', info: true, t: '「貓咪剃毛」標著未完成', d: '貓的格子寫著 NT$1,800，但下面是「缺時間」。狗的體型都不提供。'},
          {sel: '[data-key="n-catshave"]', t: '按服務名稱「貓咪剃毛」', d: '右邊會打開這項服務的設定。'},
          {sel: '.dp .dsec:first-of-type', info: true, t: '啟用前還要補：貓缺時間', d: '「啟用服務」是灰的，旁邊寫著還差什麼。'},
          {sel: '[data-key="p-edit"]', t: '按「在表格裡補齊價格與時間」', d: '價格與時間都在表格裡改。'},
          {sel: '.tr-eff', info: true, t: '還沒啟用：存檔後直接套用', d: '這項服務還沒開放，所以不用選生效日，也沒有預約用到它。'},
          {sel: '#e-c-t', t: '貓的時間選「2 小時」', d: '時間決定一個時段要佔美容台多久。', fill: {value: '120', label: '2 小時'}, until: {value: ['#e-c-t', '^120$']}},
          {sel: '.tr-ch', info: true, t: '這次改了：貓的時間 缺 → 2 小時', d: '價格 NT$1,800 不變，只補上時間。'},
          {sel: '[data-key="e-save"]', t: '按「儲存」', d: '表格收起來。'},
          {settle: 1100, sel: '[data-key="n-catshave"]', t: '再按一次「貓咪剃毛」', d: '回到服務設定看看。'},
          {sel: '.dp .dsec:first-of-type', info: true, t: '資料齊全，可以啟用', d: '「啟用服務」亮了。'},
          {sel: '[data-key="p-on"]', t: '按「啟用服務」', d: '飼主在 LINE 與公開網頁就看得到這項服務。'},
          {sel: '.head .sub', info: true, settle: 1000, t: '提供中從 7 項變 8 項', d: '「未完成」不見了。貓咪剃毛只在中山店提供，需要簽犬貓美容定型化契約。'}
        ]}
    ]
  });
})();
