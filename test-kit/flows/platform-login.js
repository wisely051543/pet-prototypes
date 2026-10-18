/* 寵派後台登入: hints and guided tours for test mode. Format: test-kit/flows/README.md
   One action or one explanation per step. Each scenario is a URL parameter (?go=setup…), so each one is its own tour.
   A finished login normally opens the role's own module in another prototype; every tour asks for ?stay=1, which keeps
   the page here and lights only the modules that role can use instead, so the tour can reach its summary. The sidebar
   shows from 1024 px; narrower screens only get a short toast, so the last explanation differs by width.
   Demo accounts: <name>@chongpai.example, password chongpai2026, authenticator code 246810, backup code K7Q2-M9DF. */
(function () {
  var base = function (go) { return {stay: 1, go: go, off: null, theme: null, scale: null}; };
  var MAIL = function (who) { return {sel: '#lg-mail', t: '輸入公司 Email', d: '寵派員工用公司 Email 登入。', fill: {value: who + '@chongpai.example', label: who + '@chongpai.example'}, until: {value: ['#lg-mail', '^' + who + '@chongpai\\.example$']}}; };
  var PW = {sel: '#lg-pw', t: '輸入密碼', d: '示範密碼 chongpai2026。', fill: {value: 'chongpai2026', label: 'chongpai2026（示範密碼）'}, until: {value: ['#lg-pw', '^chongpai2026$']}};
  var LANDED = [
    {minWidth: 1024, settle: 900, sel: '.side', info: true, t: '只亮起客服能用的模組', d: '方案管理、客服支援、LINE／通知管理、契約模板庫、用量監控。正式版會直接打開客服支援；原型停在這裡。'},
    {maxWidth: 1023, settle: 600, sel: '[data-key="who-line"], .fsheet', info: true, t: '登入後會開啟客服支援', d: '客服登入後先到自己的主要模組。正式版會直接打開；原型停在這裡。'}
  ];

  PP.register('platform-login', {
    name: '寵派後台登入',
    hints: [
      {sel: '[data-key="lg-go"]', t: '登入', d: '公司 Email 和密碼，接著每次都要輸入驗證 App 上的 6 位數', tour: 'login'},
      {sel: '[data-key="to-backup"]', t: '用備用碼登入', d: '手機不在身邊時，用設定時存下的備用碼', tour: 'backup'},
      {sel: '[data-key="su-start"]', t: '開始設定', d: '新帳號：確認身分、設定密碼、綁定驗證 App、存好備用碼', tour: 'setup'},
      {sel: '[data-key="dead-login"]', t: '設定連結不能用了', d: '過期的連結要請最高管理者重寄', tour: 'expired'},
      {sel: '[data-key="to-forgot"]', t: '忘記密碼', d: '重設密碼後仍要輸入驗證碼', quiet: true},
      {sel: '[data-key="to-merchant"]', t: '寵派商家中心', d: '店家管理者、店長從商家中心登入，不是這裡', quiet: true}
    ],
    tours: [
      {id: 'login', title: '小雯登入寵派後台', who: '小雯（寵派客服）', query: base(null),
        scene: '你是寵派的客服小雯，早上上班要登入寵派管理後台。先故意打錯密碼，看系統怎麼說；再用正確的密碼，接著輸入手機驗證 App 上的 6 位數。寵派後台每次登入都要驗證碼，不會記住這台電腦。',
        outro: '你用 xiaowen@chongpai.example 和密碼登入，打錯一次時系統只說「Email 或密碼不正確」，不透露是哪個錯。接著輸入驗證 App 上的 6 位數，登入成功；後台只亮起客服能用的模組，先開啟客服支援。每一次登入都記在稽核中心。',
        steps: [
          {sel: '.fsheet', info: true, t: '登入寵派管理後台', d: '只給寵派員工使用。店家管理者、店長要從寵派商家中心登入。'},
          MAIL('xiaowen'),
          {sel: '#lg-pw', t: '先故意打錯密碼', d: '看看打錯時系統怎麼說。', fill: {value: 'chongpai2025', label: 'chongpai2025（打錯了）'}, until: {value: ['#lg-pw', '^chongpai2025$']}},
          {sel: '[data-key="lg-go"]', t: '按「下一步」', d: '用剛剛輸入的 Email 和密碼。'},
          {sel: '[data-key="f-top"]', info: true, t: 'Email 或密碼不正確', d: '不說是哪一個錯，別人就猜不出帳號。密碼欄清空了；連續錯太多次會暫時鎖住。'},
          PW,
          {sel: '[data-key="lg-eye"]', t: '按眼睛圖示，看一下有沒有打對', d: '密碼會顯示出來，再按一次就遮住。'},
          {sel: '[data-key="lg-go"]', t: '按「下一步」', d: '這次密碼對了。'},
          {sel: '[data-key="who-line"]', info: true, t: '小雯・客服', d: '確認登入的是你自己的帳號；不是的話按「換一個帳號」。'},
          {sel: '.fsheet', info: true, t: '每次都要驗證碼', d: '打開手機上的驗證 App，找「寵派管理後台」這一組。數字每 30 秒換一組；快換的時候，等下一組再輸入。'},
          {sel: '#mf-code', t: '輸入驗證 App 上的 6 位數', d: '示範驗證碼 246810。', fill: {value: '246810', label: '246810（示範驗證碼）'}, until: {value: ['#mf-code', '^246810$']}},
          {sel: '[data-key="mf-go"]', t: '按「確認並登入」', d: '登入會記在稽核中心。'}
        ].concat(LANDED)},
      {id: 'backup', title: '手機忘在家：用備用碼登入', who: '小雯（寵派客服）', query: base(null),
        scene: '你出門忘了帶手機，沒辦法看驗證 App。還好設定帳號時存了 10 組備用碼。你要用其中一組登入。每組只能用一次。',
        outro: '你用備用碼 K7Q2-M9DF 登入了，那一組立刻作廢，這次登入記在稽核中心。你只剩 2 組備用碼：找不到手機或換了新手機，要請最高管理者冠宇在系統設定重設你的 MFA，重新綁定後會給新的 10 組。',
        steps: [
          MAIL('xiaowen'), PW,
          {sel: '[data-key="lg-go"]', t: '按「下一步」', d: '密碼對了才會問驗證碼。'},
          {sel: '[data-key="to-backup"]', t: '按「手機不在身邊？用備用碼」', d: '改用備用碼。'},
          {sel: '.fsheet', info: true, t: '10 組備用碼，每組只能用一次', d: '設定 MFA 時存下的那 10 組。'},
          {sel: '[data-key="bk-help"]', info: true, t: '備用碼也沒了？', d: '請最高管理者冠宇在系統設定重設你的 MFA；你會收到新的設定連結。'},
          {sel: '#bk-code', t: '輸入一組備用碼', d: '示範備用碼 K7Q2-M9DF。', fill: {value: 'K7Q2M9DF', label: 'K7Q2-M9DF（示範備用碼）'}, until: {value: ['#bk-code', '^K7Q2-?M9DF$']}},
          {sel: '[data-key="bk-go"]', t: '按「用備用碼登入」', d: '這一組用掉就作廢。'},
          {settle: 600, sel: '.fsheet', info: true, t: '已用備用碼登入', d: '剛才那組已經作廢，這次登入記在稽核中心。'},
          {sel: '[data-key="bk-ledger"]', info: true, t: '10 組裡用掉 8 組', d: '斜線的是用過的，虛線那組是剛剛用掉的；只剩 2 組。'},
          {sel: '[data-key="bk-left"]', info: true, t: '快用完了', d: '找不到手機或換了新手機，請最高管理者重設你的 MFA，重新綁定後會給你新的 10 組。'},
          {sel: '[data-key="bk-enter"]', t: '按「繼續進入寵派管理後台」', d: '進入客服支援。'}
        ].concat(LANDED)},
      {id: 'setup', title: '佩君第一次設定帳號', who: '佩君（新到職的客服）', query: base('setup'),
        scene: '你是剛到職的客服佩君。冠宇幫你建了寵派後台帳號，你在 Email 收到設定連結。你要確認身分、設定密碼、用自己的手機綁定驗證 App，再把 10 組備用碼存好，四件事做完才能登入。',
        outro: '佩君的帳號設定好了：密碼至少 12 碼且不含 Email 的名字；驗證 App 10/12 綁定；10 組備用碼只顯示這一次，已經存在安全的地方。稽核中心記下了這次設定。之後登入要 Email、密碼和驗證 App 上的 6 位數。',
        steps: [
          {sel: '[data-key="steps"]', info: true, t: '設定帳號四步', d: '確認帳號、設定密碼、綁定驗證 App、存好備用碼。'},
          {sel: '[data-key="su-facts"]', info: true, t: '確認是你', d: '佩君・客服：可以客服查詢、補發通知與簽署連結；不能代簽、代同意，也不能改金流或商家核心設定。冠宇 10/9 建立，連結 10/16 前有效。'},
          {sel: '[data-key="su-notme"]', info: true, t: '不是你的話', d: '按「這不是我」，帳號就不會被別人開通。'},
          {sel: '[data-key="su-start"]', t: '按「是我，開始設定」', d: '接著設定密碼。'},
          {sel: '#su-npw', t: '設定登入密碼', d: '寵派後台的密碼要比店家帳號長。', fill: {value: 'Pj-chongpai-2026', label: 'Pj-chongpai-2026'}, until: {value: ['#su-npw', '^Pj-chongpai-2026$']}},
          {sel: '.rules', info: true, t: '四個條件都打勾了', d: '至少 12 碼、有英文字母、有數字、不含 Email 的名字（peijun）。'},
          {sel: '[data-key="su-pw-go"]', t: '按「下一步」', d: '接著綁定驗證 App。'},
          {sel: '.fsheet', info: true, t: '用你自己的手機', d: '不要用共用裝置。Google Authenticator、Microsoft Authenticator 都可以。'},
          {minWidth: 1024, sel: '[data-key="su-qr"]', info: true, t: '在 App 按「＋」，掃這個 QR 碼', d: 'App 裡會多一組「ChongPai（寵派管理後台）」。掃不了可以改用手動輸入金鑰。'},
          {maxWidth: 1023, sel: '[data-key="su-secret"]', info: true, t: '在 App 按「＋」，輸入這組金鑰', d: '在手機上掃不了自己螢幕的 QR 碼，所以改填帳號和金鑰；App 裡會多一組「ChongPai（寵派管理後台）」。驗證 App 在另一支手機的話可以顯示 QR 碼。'},
          {sel: '#su-code', t: '輸入 App 顯示的 6 位數', d: '示範驗證碼 246810。', fill: {value: '246810', label: '246810（示範驗證碼）'}, until: {value: ['#su-code', '^246810$']}},
          {sel: '[data-key="su-bind"]', t: '按「綁定」', d: '數字對了就綁好了。'},
          {sel: '[data-key="su-once"]', info: true, t: '備用碼只會顯示這一次', d: '存在密碼管理工具，或印出來放在安全的地方；不要存在這台電腦的桌面，也不要傳給任何人。'},
          {sel: '[data-key="su-codes"]', info: true, t: '10 組備用碼', d: '手機不在身邊時，用一組代替驗證碼。每組只能用一次。可以下載文字檔或複製全部。'},
          {sel: '[data-key="su-done"]', t: '先直接按「完成設定」', d: '看看漏了什麼。'},
          {sel: '[data-key="su-ok-l"]', info: true, t: '要先確認存好了', d: '「請先存好備用碼，再勾選這一項」。'},
          {sel: '#su-ok', t: '勾選「我已經把 10 組備用碼存在安全的地方」', d: '真的存好了再勾。', until: {checked: '#su-ok'}},
          {sel: '[data-key="su-done"]', t: '按「完成設定」', d: '帳號就設定好了。'},
          {settle: 700, sel: '[data-key="su-done-facts"]', info: true, t: '帳號設定好了', d: '登入帳號 peijun@chongpai.example、驗證 App 10/12 綁定、備用碼 10 組；稽核中心已記下這次設定。'}
        ]},
      {id: 'reset', title: '家豪掉了手機：重新綁定驗證 App', who: '家豪（寵派客服）', query: base('reset'),
        scene: '你是客服家豪，手機掉了，備用碼又存在舊手機的備忘錄裡。冠宇在系統設定重設了你的 MFA，寄給你一封重新綁定的連結。你要先輸入現在的密碼證明是你，再綁定新手機、存好新的備用碼。',
        outro: '家豪重新綁定了驗證 App：舊手機上的驗證碼和剩下的備用碼都已作廢；你用現在的密碼證明是本人，綁定新手機，拿到新的 10 組備用碼。這次備用碼記得存在密碼管理工具，不要放在手機備忘錄裡。',
        steps: [
          {sel: '.fsheet', info: true, t: '冠宇重設了你的 MFA', d: '10/12 09:20。舊手機上的驗證碼和剩下的備用碼都已作廢。'},
          {sel: '[data-key="su-facts"]', info: true, t: '原因：手機遺失', d: '「手機遺失，備用碼放在舊手機的備忘錄裡」。連結 10/19 前有效。'},
          {sel: '[data-key="su-start"]', t: '先直接按「是我，開始綁定」', d: '看看漏了什麼。'},
          {sel: '.fsheet .field:has(#su-cur)', info: true, t: '要輸入現在的密碼', d: '只有知道密碼的本人才能綁定新手機；就算連結被別人拿到也沒用。'},
          {sel: '#su-cur', t: '輸入現在的密碼', d: '示範密碼 chongpai2026。', fill: {value: 'chongpai2026', label: 'chongpai2026（示範密碼）'}, until: {value: ['#su-cur', '^chongpai2026$']}},
          {sel: '[data-key="su-start"]', t: '按「是我，開始綁定」', d: '接著綁定新手機。'},
          {minWidth: 1024, sel: '[data-key="su-qr"]', info: true, t: '用新手機掃 QR 碼', d: '在驗證 App 按「＋」，掃這個 QR 碼。'},
          {maxWidth: 1023, sel: '[data-key="su-secret"]', info: true, t: '在新手機的驗證 App 輸入這組金鑰', d: '按「＋」，填入帳號和金鑰；驗證 App 在另一支手機的話可以顯示 QR 碼。'},
          {sel: '#su-code', t: '輸入 App 顯示的 6 位數', d: '示範驗證碼 246810。', fill: {value: '246810', label: '246810（示範驗證碼）'}, until: {value: ['#su-code', '^246810$']}},
          {sel: '[data-key="su-bind"]', t: '按「綁定」', d: '數字對了就綁好了。'},
          {sel: '[data-key="su-once"]', info: true, t: '新的備用碼只會顯示這一次', d: '這次存在密碼管理工具，不要放在手機的備忘錄裡。'},
          {sel: '#su-ok', t: '勾選「我已經把 10 組備用碼存在安全的地方」', d: '真的存好了再勾。', until: {checked: '#su-ok'}},
          {sel: '[data-key="su-done"]', t: '按「完成設定」', d: '重新綁定完成。'},
          {settle: 700, sel: '[data-key="su-done-facts"]', info: true, t: '重新綁定好了', d: '之後登入用新手機上的驗證 App；稽核中心已記下。'}
        ]},
      {id: 'expired', title: '設定連結已經過期', who: '佩君（新到職的客服）', query: base('link-expired'),
        scene: '你是新到職的客服佩君。冠宇上週寄了帳號設定連結，你今天才打開。',
        outro: '設定連結 7 天內有效，這封在 10/8（四）23:59 過期了，帳號還沒設定。請最高管理者冠宇在系統設定按「重寄設定連結」；新的連結寄出後，舊的就不能用。已經設定好的人可以直接登入。',
        steps: [
          {sel: '.fsheet', info: true, t: '這個設定連結已經過期', d: '連結 7 天內有效，這封在 10/8（四）23:59 過期了，帳號還沒設定。'},
          {sel: '.fsheet dl.facts', info: true, t: '可以幫你重寄的人：冠宇', d: '請他在系統設定按「重寄設定連結」；新的寄出後，舊的就不能用。'},
          {sel: '[data-key="dead-login"]', t: '已經設定好了？按「直接登入」', d: '回到登入頁。'},
          {sel: '[data-key="lg-mail"]', info: true, t: '回到登入頁', d: '設定好的人用公司 Email、密碼和驗證碼登入；還沒設定的人等新的連結。'}
        ]}
    ]
  });
})();
