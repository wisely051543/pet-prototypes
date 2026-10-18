/* 管理 Web 登入: hints and guided tours for test mode. Format: test-kit/flows/README.md
   One action or one explanation per step. Each scenario is a URL parameter (?go=invite…), so each one is its own tour.
   A finished login normally opens 儀表板 in another prototype; every tour asks for ?stay=1, which keeps the page here and
   lights the menu instead, so the tour can reach its summary. The lit menu is a wide-screen thing (the sidebar shows from
   900 px), so that last explanation is a wide-only step. Demo phones: 0912000100 陳老闆, …101 林店長; password demo1234;
   SMS code 135790. */
(function () {
  var base = function (go) { return {stay: 1, go: go, known: null, live: null, suspended: null, off: null, theme: null, scale: null}; };
  var CODE = function (key, phone) { return {sel: '#' + key, t: '輸入簡訊驗證碼', d: '驗證碼傳到 ••••' + phone + '，10 分鐘內有效；同一組輸錯 5 次就失效。', fill: {value: '135790', label: '135790（示範驗證碼）'}, until: {value: ['#' + key, '^135790$']}}; };

  PP.register('merchant-login', {
    name: '管理 Web 登入',
    hints: [
      {sel: '[data-key="lg-go"]', t: '登入', d: '手機和密碼；第一次用這台電腦還要簡訊驗證碼', tour: 'login'},
      {sel: '[data-key="to-forgot"]', t: '忘記密碼', d: '用登記的手機收驗證碼，設定新密碼', tour: 'forgot'},
      {sel: '[data-key="iv-accept"]', t: '接受邀請', d: '確認是你，驗證手機，設定密碼', tour: 'invite-staff'},
      {sel: '[data-key="dead-ask"]', t: '請邀請你的人重新邀請', d: '只會通知對方；新的邀請用簡訊傳到你的手機', tour: 'expired'},
      {sel: '[data-key="dead-login"]', t: '邀請不能用了', d: '過期或用過的邀請，請邀請你的人重傳，或直接登入', quiet: true},
      {sel: '[data-key="to-staff"]', t: '店員 App', d: '在店裡報到、收款用櫃台平板上的店員 App', quiet: true},
      {sel: '[data-key="lg-eye"]', t: '顯示密碼', d: '看一下自己有沒有打錯', quiet: true}
    ],
    tours: [
      {id: 'login', title: '陳老闆在新電腦登入', who: '陳老闆（店家管理者）', query: base(null),
        scene: '你在家裡用新買的電腦登入寵派商家中心。第一次先打錯密碼，看系統怎麼說；再用正確的密碼登入。因為是新電腦，還要簡訊驗證碼確認是你本人。',
        outro: '你用手機 0912000100 和密碼登入，打錯一次時系統只說「手機號碼或密碼不正確」，不透露是哪個錯；連續錯太多次會暫停 15 分鐘。新電腦要輸入簡訊驗證碼，驗證後這台電腦就記住了，下次只要手機和密碼。登入後會開啟儀表板。',
        steps: [
          {sel: '.fsheet', info: true, t: '登入寵派商家中心', d: '店家管理者、店長用這裡。店員在店裡用櫃台平板上的店員 App。'},
          {sel: '#lg-ph', t: '輸入手機號碼', d: '帳號就是你的手機。', fill: {value: '0912000100', label: '0912000100（陳老闆）'}, until: {value: ['#lg-ph', '^0912000100$']}},
          {sel: '#lg-pw', t: '先故意打錯密碼', d: '看看打錯時系統怎麼說。', fill: {value: 'demo12345', label: 'demo12345（打錯了）'}, until: {value: ['#lg-pw', '^demo12345$']}},
          {sel: '[data-key="lg-go"]', t: '按「登入」', d: '用剛剛輸入的手機和密碼。'},
          {sel: '[data-key="f-top"]', info: true, t: '手機號碼或密碼不正確', d: '不說是哪一個錯，別人就猜不出帳號。密碼欄清空了；連續錯 5 次要等 15 分鐘，忘記密碼可以用手機重設。'},
          {sel: '#lg-pw', t: '輸入正確的密碼', d: '示範密碼 demo1234。', fill: {value: 'demo1234', label: 'demo1234（示範密碼）'}, until: {value: ['#lg-pw', '^demo1234$']}},
          {sel: '[data-key="lg-eye"]', t: '按眼睛圖示，看一下有沒有打對', d: '密碼會顯示出來，再按一次就遮住。'},
          {sel: '[data-key="lg-go"]', t: '按「登入」', d: '這次密碼對了。'},
          {sel: '.fsheet', info: true, t: '確認是你本人', d: '這台電腦第一次登入你的帳號，要輸入簡訊驗證碼。驗證後，下次在這台電腦只要手機和密碼。'},
          {sel: '.who-line', info: true, t: '陳老闆・店家管理者・兩家分店', d: '確認登入的是你自己的帳號；不是的話按「換一個帳號」。'},
          CODE('cd-code', '0100'),
          {sel: '[data-key="cd-go"]', t: '按「確認並登入」', d: '登入後會開啟儀表板。'},
          {minWidth: 900, settle: 600, sel: '.side', info: true, t: '選單亮起來：儀表板', d: '店家管理者看得到全部選單。正式版會直接打開儀表板；原型停在這裡。'}
        ]},
      {id: 'forgot', title: '忘記密碼：用手機重設', who: '陳老闆（店家管理者）', query: base(null),
        scene: '你忘了寵派商家中心的密碼。你要用登記的手機收驗證碼，確認是你本人，再設定新密碼。',
        outro: '畫面只說「如果這支手機有帳號，驗證碼已傳過去」，不透露這支手機有沒有帳號。你用手機 ••••0100 收驗證碼，確認是本人後設定新密碼（至少 8 碼、有英文字母、有數字），其他電腦上的登入一併登出。回到登入頁，手機已經幫你填好，接著用新密碼登入。（原型只認示範密碼 demo1234，新密碼不能真的登入。）',
        steps: [
          {sel: '[data-key="to-forgot"]', t: '按「忘記密碼」', d: '在登入按鈕下面。'},
          {sel: '#fp-ph', t: '輸入登記的手機', d: '驗證碼會傳到這支手機。', fill: {value: '0912000100', label: '0912000100'}, until: {value: ['#fp-ph', '^0912000100$']}},
          {sel: '[data-key="fp-send"]', t: '按「傳送驗證碼」', d: '簡訊會傳到這支手機。'},
          {sel: '.page .notice', info: true, t: '如果這支手機有帳號，驗證碼已傳過去', d: '每支手機都是這句話，別人猜不出誰有帳號。驗證碼 10 分鐘內有效；60 秒後可以重新傳送，一支手機一小時最多傳 5 次。'},
          CODE('fp-code', '0100'),
          {sel: '[data-key="fp-go"]', t: '按「下一步」', d: '驗證碼對了才能設定新密碼。'},
          {sel: '.fsheet', info: true, t: '設定新密碼：其他電腦會一併登出', d: '如果是別人動了你的帳號，重設密碼就能把他登出。'},
          {sel: '#fp-npw', t: '輸入新密碼', d: '至少 8 碼，有英文字母、有數字。', fill: {value: 'maohai2026', label: 'maohai2026'}, until: {value: ['#fp-npw', '^maohai2026$']}},
          {sel: 'ul.rules', info: true, t: '三個條件都打勾了', d: '至少 8 碼、有英文字母、有數字。少一個就不能更新。'},
          {sel: '[data-key="fp-save"]', t: '按「更新密碼」', d: '更新後要用新密碼登入。'},
          {settle: 600, sel: '#lg-ph', info: true, t: '回到登入：手機已經填好', d: '「密碼已更新，請用新密碼登入」。'}
        ]},
      {id: 'invite-staff', title: '林店長接受陳老闆的邀請', who: '林店長（中山店店長）', query: base('invite-staff'),
        scene: '陳老闆在員工與權限邀請你當店長，你的手機收到一封簡訊邀請。你點開連結，要確認是你、驗證手機、設定登入密碼，開通帳號。',
        outro: '你接受了陳老闆的邀請：確認身分、驗證手機 ••••0101、設定密碼並同意服務條款，帳號開通好了。你是毛孩日和的店長，可以管理中山店、兼管信義店；這台電腦已記住，下次登入不用驗證碼。',
        steps: [
          {sel: 'ol.isteps', info: true, t: '開通帳號三步', d: '確認邀請、驗證手機、設定密碼。'},
          {sel: '.shopname', info: true, t: '加入「毛孩日和」', d: '陳老闆（店家管理者）邀請你成為店長。'},
          {sel: 'dl.facts', info: true, t: '確認邀請的內容', d: '你的身分林店長・店長；可以管理中山店・兼管信義店；登入手機 ••••0101；邀請 10/15（四）23:59 前有效。'},
          {sel: '[data-key="iv-notme"]', info: true, t: '不是你的話', d: '按「這不是我」，邀請就不會被別人開通。'},
          {sel: '[data-key="iv-accept"]', t: '按「是我，接受邀請」', d: '接著驗證手機。'},
          {sel: '.page .notice', info: true, t: '第 2 步：驗證手機', d: '驗證碼已傳到 ••••0101。之後就用這支手機登入。'},
          CODE('iv-code', '0101'),
          {sel: '[data-key="iv-go"]', t: '按「下一步」', d: '驗證碼對了才會往下。'},
          {sel: '#iv-npw', t: '設定登入密碼', d: '至少 8 碼，有英文字母、有數字。', fill: {value: 'lin2026shop', label: 'lin2026shop'}, until: {value: ['#iv-npw', '^lin2026shop$']}},
          {sel: '[data-key="iv-save"]', t: '先按「開通帳號」', d: '看看漏了什麼。'},
          {sel: '[data-key="iv-agree-l"]', info: true, t: '要先勾選同意服務條款', d: '畫面提醒「請先勾選同意服務條款」。'},
          {sel: '#iv-agree', t: '勾選同意服務條款', d: '示範條文，正式條文待法務確認。', until: {checked: '#iv-agree'}},
          {sel: '[data-key="iv-save"]', t: '按「開通帳號」', d: '帳號開通後就可以登入。'},
          {settle: 600, sel: '.fsheet', info: true, t: '帳號開通好了', d: '你現在是毛孩日和的店長，可以管理中山店・兼管信義店。這台電腦已記住，下次不用驗證碼。'}
        ]},
      {id: 'invite', title: '陳老闆開通店家帳號（寵派邀請）', who: '陳老闆（店家管理者）', query: base('invite'),
        scene: '毛孩日和剛和寵派簽約。寵派的冠宇用簡訊傳了開通邀請給你。你要確認店家資料、驗證手機、設定密碼，開通店家管理者帳號。',
        outro: '你接受寵派的邀請，開通了毛孩日和的店家管理者帳號：可以管理兩家分店，基本方案，正式啟用那天起試用 14 天，登入手機 ••••0100。之後由你在「員工與權限」邀請店長和店員。',
        steps: [
          {sel: '.shopname', info: true, t: '開通「毛孩日和」：中山店・信義店', d: '寵派冠宇邀請你成為這家店的店家管理者。'},
          {sel: 'dl.facts', info: true, t: '確認邀請的內容', d: '陳老闆・店家管理者；管理兩家分店；基本方案，正式啟用那天起試用 14 天；登入手機 ••••0100；10/18（日）23:59 前有效（邀請 7 天內有效）。'},
          {sel: '[data-key="iv-accept"]', t: '按「是我，接受邀請」', d: '接著驗證手機 ••••0100。'},
          CODE('iv-code', '0100'),
          {sel: '[data-key="iv-go"]', t: '按「下一步」', d: '驗證碼對了才會往下。'},
          {sel: '#iv-npw', t: '設定登入密碼', d: '至少 8 碼，有英文字母、有數字。', fill: {value: 'maohai2026', label: 'maohai2026'}, until: {value: ['#iv-npw', '^maohai2026$']}},
          {sel: '#iv-agree', t: '勾選同意服務條款', d: '示範條文，正式條文待法務確認。', until: {checked: '#iv-agree'}},
          {sel: '[data-key="iv-save"]', t: '按「開通帳號」', d: '帳號開通後就可以登入。'},
          {settle: 600, sel: '.fsheet', info: true, t: '帳號開通好了', d: '你是毛孩日和的店家管理者。接下來可以在「員工與權限」邀請店長和店員。'}
        ]},
      {id: 'expired', title: '邀請已經過期', who: '新來的櫃台', query: base('invite-expired'),
        scene: '你是剛到中山店的櫃台。陳老闆上週傳了邀請簡訊，你今天才點開連結。',
        outro: '邀請在 10/8（四）23:59 過期，帳號還沒開通。你按「請陳老闆重新邀請」，系統只通知陳老闆；新的邀請會用簡訊傳到你的手機，7 天內有效，這個頁面不會出現連結。已經有帳號的人，可以直接登入。',
        steps: [
          {sel: '.fsheet', info: true, t: '這個邀請已經過期', d: '10/8（四）23:59 過期，帳號還沒開通。新的邀請 7 天內有效。'},
          {sel: 'dl.facts', info: true, t: '誰邀請你、要加入哪裡', d: '陳老闆（店家管理者）邀請你加入毛孩日和・中山店・櫃台。'},
          {sel: '[data-key="dead-ask"]', t: '按「請陳老闆重新邀請」', d: '只會通知陳老闆，不會在這裡給你新連結。'},
          {sel: '[data-key="dead-asked"]', info: true, t: '已通知陳老闆', d: '陳老闆會在「員工與權限」重新邀請你；新的邀請用簡訊傳到你的手機。'}
        ]},
      {id: 'expired-first', title: '寵派的開通邀請過期了', who: '陳老闆（店家管理者）', query: base('invite-expired-first'),
        scene: '寵派冠宇 10/2 傳了開通邀請，你忙著裝潢，今天才點開連結。',
        outro: '開通邀請在 10/9（五）23:59 過期，店家帳號還沒開通。你按「請寵派重新邀請」，寵派會重新傳一次開通邀請到 ••••0100，7 天內有效；14 天試用從正式啟用那天才開始算，不會因為晚開通變少。急的話可以直接找寵派客服。',
        steps: [
          {sel: '.fsheet', info: true, t: '這個開通邀請已經過期', d: '10/9（五）23:59 過期，店家帳號還沒開通。新的邀請 7 天內有效。'},
          {sel: 'dl.facts', info: true, t: '寵派客服', d: 'LINE 搜尋「寵派商家中心」，週一到週六 9:00–18:00。'},
          {sel: '[data-key="dead-ask"]', t: '按「請寵派重新邀請」', d: '只會通知寵派，不會在這裡給你新連結。'},
          {sel: '[data-key="dead-asked"]', info: true, t: '已通知寵派', d: '新的開通邀請會用簡訊傳到 ••••0100。'}
        ]},
      /* 毛孩日和開張 (prototypes/open-day): act 2, played inside that page with ?life=open-account (the invite 商家管理 sent at 11:20,
         valid to 10/16, the 14-day trial from go-live); not listed on this page */
      {id: 'life-open-account', life: true, seed: {life: 'open-account'}, title: '第 2 幕：陳老闆開通店家帳號', who: '陳老闆（店家管理者）', query: base('invite'),
        scene: '10/9（五）晚上 9 點，店打烊了。中午寵派的冠宇傳了開通邀請到你的手機和 Email。你在店裡的電腦打開它：確認店家資料、驗證手機、設定密碼，開通毛孩日和的店家管理者帳號。',
        outro: '你接受寵派的邀請，開通了毛孩日和的店家管理者帳號：管理中山店和信義店，基本方案，正式啟用那天起試用 14 天，登入手機 ••••0100。接下來是開店設定：營業時間、服務與價格、契約、邀請員工……13 項做完就能正式啟用。',
        steps: [
          {sel: '.shopname', info: true, t: '開通「毛孩日和」：中山店・信義店', d: '寵派冠宇邀請你成為這家店的店家管理者。'},
          {sel: 'dl.facts', info: true, t: '確認邀請的內容', d: '陳老闆・店家管理者；管理兩家分店；基本方案，正式啟用那天起試用 14 天；登入手機 ••••0100；10/16（五）23:59 前有效。'},
          {sel: '[data-key="iv-notme"]', info: true, t: '不是你的話', d: '按「這不是我」，邀請就不會被別人開通。'},
          {sel: '[data-key="iv-accept"]', t: '按「是我，接受邀請」', d: '接著驗證手機 ••••0100。'},
          CODE('iv-code', '0100'),
          {sel: '[data-key="iv-go"]', t: '按「下一步」', d: '驗證碼對了才會往下。'},
          {sel: '#iv-npw', t: '設定登入密碼', d: '至少 8 碼，有英文字母、有數字。', fill: {value: 'maohai2026', label: 'maohai2026'}, until: {value: ['#iv-npw', '^maohai2026$']}},
          {sel: 'ul.rules', info: true, t: '三個條件都打勾了', d: '至少 8 碼、有英文字母、有數字。'},
          {sel: '#iv-agree', t: '勾選同意服務條款', d: '示範條文，正式條文待法務確認。', until: {checked: '#iv-agree'}},
          {sel: '[data-key="iv-save"]', t: '按「開通帳號」', d: '帳號開通後就可以登入。'},
          {settle: 600, sel: '.fsheet', info: true, t: '帳號開通好了', d: '這台電腦已記住，下次登入不用驗證碼。下一步是開店設定，13 項做完才能開放預約。'}
        ]}
    ]
  });
})();
