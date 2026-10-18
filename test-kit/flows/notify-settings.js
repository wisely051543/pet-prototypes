/* 通知設定: hints and guided tours for test mode. Format: test-kit/flows/README.md
   Tours speak the shop's voice: 寵物, not 毛孩 (the LINE previews are the owner's words and keep 毛孩).
   One action or one explanation per step. Under 1280 px the settings panel is an overlay over the timeline and the
   unsaved-changes tray, so every editing tour closes the panel (✕) before it lights the timeline card or the tray.
   Editing is wide-screen only; on a phone the list is read-only. */
(function () {
  var Q = {role: 'admin', sel: null, off: null, fail: null};
  var CLOSE = {sel: '[data-key="p-x"]', t: '按 ✕ 關閉設定', d: '回到時間軸，看看改了什麼。'};

  PP.register('notify-settings', {
    name: '通知設定',
    hints: [
      {sel: '[data-key="nc-remind"]', t: '預約提醒', d: '什麼時候提醒、LINE 沒送達要不要改傳簡訊、店家附註', tour: 'remind'},
      {sel: '[data-key="nc-pickup"]', t: '可接回', d: '服務完成時通知飼主來接，可以改成只送 LINE', tour: 'pickup'},
      {sel: '[data-key="nc-due"]', t: '付款提醒', d: '新增費用時通知飼主；關閉前先看後果', tour: 'due'},
      {sel: '[data-key="nc-confirm"]', t: '必要通知', d: '預約確認這類通知一定會發，不能關閉', tour: 'read'},
      {sel: '[data-key="life-board"]', t: '住宿的通知', d: '住宿多了退房完成，沒有可接回', tour: 'read'},
      {sel: '[data-key="use"]', t: '本月用量', d: 'LINE 與簡訊的額度；交易通知不會因為額度用完而停發', quiet: true},
      {sel: '[data-key="to-plan"]', t: '方案與用量', d: '看方案內含的額度與超量計費', quiet: true},
      {sel: '[data-key^="nc-"]', t: '一則通知', d: '點開看飼主收到的內容、修改設定與附註', quiet: true}
    ],
    tours: [
      {id: 'read', title: '看懂一筆預約會收到哪些通知', who: '陳老闆（店家管理者）', query: Q,
        scene: '你想知道飼主從預約到接回，會收到哪些 LINE 通知、哪些一定會發、哪些可以自己決定。這個引導只看不改，手機上也能做。',
        outro: '一筆美容預約從成立到離店，飼主會收到預約確認、契約送達、預約提醒、正本交付、可接回、付款提醒，另外取消改期結果和契約更新隨時會發。實心的必要通知不能關閉；預約提醒、可接回、付款提醒三種可以調整。住宿沒有可接回，改發退房完成。',
        steps: [
          {sel: '.head .sub', info: true, t: '兩家分店共用一份設定', d: '附註可以每家分店不同。上次修改：陳老闆 9/20 14:12。'},
          {sel: '.rule', info: true, t: '所有通知都由寵派 LINE 官方帳號發出', d: '開頭一定是【毛孩日和 ○○店】。交易通知不會因為額度用完而停發；簽署驗證碼一律用簡訊。'},
          {sel: '[data-key="use"]', info: true, t: '本月用量', d: 'LINE 1,180 / 5,000 則、簡訊 186 / 500 則，預估 10/23 用完；超過照常發送，每則 NT$1 月底加收。'},
          {sel: '[data-key="sheet"] .tlh', info: true, t: '示範預約：毛毛 10/10（六）10:00 洗澡＋剪毛', d: '下面的時間軸用這筆預約，算出每則通知幾點發。'},
          {sel: '[data-key="nc-confirm"]', info: true, t: '實心有鎖頭：必要通知', d: '預約確認 10/8 21:05 預約成立時發。LINE 沒送達一定改傳簡訊，簡訊也送不到改 Email。'},
          {sel: '[data-key="nc-remind"]', info: true, t: '「開啟」：可以調整的通知', d: '預約提醒 10/9 18:00（前一天 18:00）。可接回、付款提醒也一樣可以調整。'},
          {sel: '[data-key="nc-confirm"]', t: '點「預約確認」', d: '看飼主收到的內容。'},
          {sel: '.dp .lkl', info: true, t: '必要通知，不能關閉', d: '飼主要知道預約成立了。只有附註可以改。'},
          {sel: '[data-key="pv"]', info: true, t: '飼主收到的 LINE', d: '最後一行是中山店的附註：店門口不能停車，請停民權東路一段的付費停車場。'},
          CLOSE,
          {sel: '[data-key="life-board"]', t: '切到「住宿」', d: '住宿的通知不太一樣。'},
          {sel: '[data-key="nc-checkout"]', info: true, t: '住宿多了「退房完成」', d: '示範是布丁住 3 晚，10/29 11:00 退房。住宿沒有可接回通知。'},
          {sel: '[data-key="lane"]', info: true, t: '隨時：發生就發', d: '取消・改期結果、契約更新都是必要通知，不在固定時刻。'}
        ]},
      {id: 'remind', title: '預約提醒改成前 2 小時，加一句附註', who: '陳老闆（店家管理者）', query: Q, minWidth: 720,
        scene: '很多飼主說前一天傍晚收到提醒，隔天早上還是忘了。你想改成預約前 2 小時提醒，順便在中山店的提醒加一句「到店請先按門鈴」。',
        outro: '預約提醒改成前 2 小時：毛毛 10/10 10:00 的預約會在 08:00 收到，最早 08:30 的預約 06:30 送出。已排好、還沒送出的 48 則提醒照新時間送，已送出的不受影響。中山店的附註多了「到店請先按門鈴」，從下一則訊息開始帶上。儲存記錄在稽核紀錄。',
        steps: [
          {sel: '[data-key="nc-remind"]', t: '點「預約提醒」', d: '右邊會打開這則通知的設定。'},
          {sel: '.dp .dsec:has([data-key="at-d18"])', info: true, t: '現在：前一天 18:00', d: '前一天 18:00 一起送出。也可以選前 24 小時或前 2 小時。'},
          {sel: '[data-key="at-h2"]', t: '選「前 2 小時」', d: '最早 08:30 的預約，會在 06:30 送出。', until: {checked: '[data-key="at-h2"]'}},
          {sel: '.dp .dsec:has([data-key="at-h2"])', info: true, t: '毛毛會在 10/10（六）08:00 收到', d: '如果預約成立時已經過了提醒時間，就不另外提醒。'},
          {sel: '[data-key="pv"]', info: true, t: '預覽：「毛毛今天 10:00 要來」', d: '從「明天」變成「今天」。儲存前飼主看不到。'},
          {sel: '#nt-zs', t: '中山店附註：加一句「到店請先按門鈴」', d: '接在訊息最後一行，最多 60 字。簡訊不帶附註。', fill: {value: '洗澡前兩小時請先不要餵食；到店請先按門鈴。', label: '洗澡前兩小時請先不要餵食；到店請先按門鈴。'}, until: {value: ['#nt-zs', '按門鈴。$']}},
          {sel: '[data-key="ntc-zs"]', info: true, t: '字數：21 / 60', d: '超過 60 字不能儲存。信義店的附註沒變。'},
          {sel: '[data-key="pv"]', info: true, t: '預覽的最後一行跟著改', d: '這是中山店的飼主看到的；切「信義店」可以看另一家。'},
          CLOSE,
          {sel: '[data-key="nc-remind"]', info: true, t: '時間軸：預約提醒移到 10/10 08:00', d: '卡片寫著「前 2 小時」。'},
          {sel: '[data-key="tray"]', info: true, t: '還沒儲存的修改（2）', d: '48 則已排好的提醒改照新時間送出，其中 9 筆 10:00 前的預約會在 08:00 前送出。附註寫「兩小時」的那句也要再看一次。'},
          {sel: '[data-key="t-ok"]', t: '按「儲存」', d: '儲存後記錄在稽核紀錄。'},
          {settle: 1000, sel: '.head .sub', info: true, t: '上次修改：陳老闆 10/9 11:20', d: '兩家分店一起生效。'}
        ]},
      {id: 'pickup', title: '可接回改成只送 LINE', who: '陳老闆（店家管理者）', query: Q, minWidth: 720,
        scene: '簡訊額度預估 10/23 就會用完。你想讓「可接回」通知 LINE 沒送達時不要改傳簡訊，省一點額度。改之前先看清楚會有誰收不到。',
        outro: '可接回改成只送 LINE：以本月計最多少用約 13 則簡訊。代價是 LINE 沒送達時不改傳簡訊，飼主可能超過接回寬限才來。可接回跟逾時照護費有關，飼主封鎖寵派 OA 或沒綁 LINE 時仍一定改傳簡訊。儲存記錄在稽核紀錄。',
        steps: [
          {sel: '[data-key="nc-pickup"]', t: '點「可接回」', d: '服務完成時通知飼主來接。'},
          {sel: '.dp .dsec:has([data-key="fb-sms"])', info: true, t: '現在：LINE 沒送達改傳簡訊', d: '本月這類有 13 則改傳簡訊，另有 3 則傳給沒綁 LINE 的飼主。'},
          {sel: '[data-key="fb-line"]', t: '選「只送 LINE」', d: '不用簡訊額度。', until: {checked: '[data-key="fb-line"]'}},
          {sel: '[data-key="fee-note"]', info: true, t: '跟費用有關，封鎖或沒綁 LINE 仍改傳簡訊', d: '只送 LINE 只省掉「LINE 沒送達」改傳的那些。飼主封鎖寵派 OA 或沒綁 LINE 時，一定改傳簡訊，讓飼主知道 13:46 後開始計算逾時照護。'},
          {sel: '[data-key="pvc-sms"]', t: '在「飼主會看到什麼」按「簡訊」', d: '看看簡訊那邊變成什麼。'},
          {sel: '[data-key="pv"]', info: true, t: '簡訊：封鎖或沒綁 LINE 時照發', d: '「毛毛可以接回了，13:46 後開始計算逾時照護。」LINE 沒送達時不改傳。'},
          CLOSE,
          {sel: '[data-key="nc-pickup"]', info: true, t: '時間軸：可接回「只送 LINE」', d: '不寫「不補發」：封鎖或沒綁 LINE 的飼主仍會收到簡訊。其他通知照舊。'},
          {sel: '[data-key="tray"]', info: true, t: '修改的影響：最多少用約 13 則簡訊', d: '只省 LINE 沒送達改傳的那些。'},
          {sel: '[data-key="t-ok"]', t: '按「儲存」', d: '儲存後記錄在稽核紀錄。'},
          {settle: 1000, sel: '.head .sub', info: true, t: '上次修改：陳老闆 10/9 11:20', d: '從下一則可接回通知開始只送 LINE。'}
        ]},
      {id: 'due', title: '想關閉付款提醒，先看後果再放棄', who: '陳老闆（店家管理者）', query: Q, minWidth: 720,
        scene: '你覺得付款提醒有點多，想關掉試試看。關掉之前，先看系統告訴你會發生什麼；看完決定不關，放棄修改。',
        outro: '付款提醒關閉的話，新增的加購或逾時費不會先通知，飼主到店結帳時才知道。你看完後果選了「放棄修改」，付款提醒維持開啟，沒有任何東西被儲存。',
        steps: [
          {sel: '[data-key="nc-due"]', t: '點「付款提醒」', d: '新增費用、還有待付款時發。'},
          {sel: '[data-key="on-0"]', t: '選「關閉」', d: '不發這種通知。', until: {checked: '[data-key="on-0"]'}},
          {sel: '.dp .dsec:has([data-key="on-0"])', info: true, t: '注意：飼主結帳時才知道多了費用', d: '新增的加購或逾時費不會先通知，容易在櫃台起爭議。'},
          {sel: '.dp .dsec:has([data-key="pvc-line"])', info: true, t: '已關閉：飼主不會收到這則通知', d: 'LINE 和簡訊都不發。'},
          CLOSE,
          {sel: '[data-key="nc-due"]', info: true, t: '時間軸：付款提醒變成虛線「已關閉」', d: '還沒儲存，飼主那邊什麼都沒變。'},
          {sel: '[data-key="tray"]', info: true, t: '還沒儲存的修改（1）：付款提醒關閉', d: '下面再寫一次後果。'},
          {sel: '[data-key="t-no"]', t: '按「放棄修改」', d: '你決定不關了。'},
          {settle: 900, sel: '[data-key="nc-due"]', info: true, t: '付款提醒回到「開啟」', d: '沒有儲存任何修改，也不會留下稽核紀錄。'}
        ]},
      {id: 'life-sms-cut', life: true, seed: {life: 'sms-cut'}, title: '第 3 幕：可接回改成只送 LINE', who: '陳老闆（店家管理者）', query: Q, minWidth: 720,
        scene: '10/5（一）上午 11:05。你剛在方案與用量看到：簡訊有一塊是 LINE 沒送達才改傳的。你想先從「可接回」下手，讓它只送 LINE、不改傳簡訊。改之前先看清楚會省多少、誰還是會收到簡訊。',
        outro: '可接回改成只送 LINE，兩家分店一起生效：照本月算最多少用約 8 則簡訊。代價是 LINE 沒送達時不改傳簡訊，要靠櫃台自己打電話；飼主封鎖寵派 OA 或沒綁 LINE 時，可接回跟逾時照護費有關，仍會改傳簡訊。儲存記錄在稽核紀錄。',
        steps: [
          {sel: '[data-key="use"]', info: true, t: '簡訊 110 / 500 則，預估 10/21 用完', d: '驗證碼 58、LINE 沒送達改傳 36、沒綁 LINE 16。'},
          {sel: '[data-key="nc-pickup"]', t: '點「可接回」', d: '服務完成時通知飼主來接。'},
          {sel: '.dp .dsec:has([data-key="fb-sms"])', info: true, t: '現在：LINE 沒送達改傳簡訊', d: '本月這類有 8 則改傳簡訊，另有 2 則傳給沒綁 LINE 的飼主。'},
          {sel: '[data-key="fb-line"]', t: '選「只送 LINE」', d: '不用簡訊額度。', until: {checked: '[data-key="fb-line"]'}},
          {sel: '[data-key="fee-note"]', info: true, t: '封鎖或沒綁 LINE 仍改傳簡訊', d: '可接回跟逾時照護費有關，這種飼主一定收得到簡訊。只送 LINE 省的是 LINE 沒送達改傳的那些。'},
          CLOSE,
          {sel: '[data-key="tray"]', info: true, t: '修改的影響：最多少用約 8 則簡訊', d: 'LINE 沒送達時不改傳簡訊。'},
          {sel: '[data-key="t-ok"]', t: '按「儲存」', d: '儲存後記錄在稽核紀錄。'},
          {settle: 1000, sel: '.head .sub', info: true, t: '上次修改：陳老闆 10/5 11:05', d: '從下一則可接回通知開始只送 LINE。接下來看店裡發生什麼事。'}
        ]}
    ]
  });
})();
