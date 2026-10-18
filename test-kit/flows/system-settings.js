/* 系統設定（寵派後台）: hints and guided tours for test mode. Format: test-kit/flows/README.md
   冠宇・最高管理者 reads the parameter timeline, schedules a change to 現場簽署有效時間, adds 佩君 as a 後台管理員 (the same 佩君
   who sets up her account in 寵派後台登入), and schedules a maintenance window. Every change needs a reason and an MFA code
   (any 6 digits in the prototype; the tours use 246810, the same demo code as 寵派後台登入). One action or one explanation
   per step. The prototype rewrites ?go= away, so tours ask for it to be absent. On a phone (under 720 px) the page is
   read-only, so only the reading tour works there. */
(function () {
  var S = {role: 'super', go: null};
  var WHY_MFA = function (why) {
    return [
      {sel: '#d-why', t: '寫下原因', d: '至少 10 個字，寫給之後查稽核的人看。', fill: {value: why, label: why}, until: {value: ['#d-why', '.{10,}']}},
      {sel: '#d-mfa', t: '輸入 MFA 驗證碼', d: '打開驗證 App，輸入冠宇帳號現在的 6 位數（示範 246810）。', fill: {value: '246810', label: '246810（示範驗證碼）'}, until: {value: ['#d-mfa', '^\\d{6}$']}},
      {sel: '[data-key="dlg"] .aud', info: true, t: '會記在稽核中心', d: '冠宇、10/9 11:20、改了什麼、原因、MFA 已驗證。'}
    ];
  };

  PP.register('system-settings', {
    name: '系統設定',
    minWidth: 720,   /* 手機只能看 */
    hints: [
      {sel: '[data-key="lanes"]', t: '全域參數的時間軸', d: '每個參數過去、現在、排程中的值；點一列看紀錄或修改', tour: 'read'},
      {sel: '[data-key="lane-sign"]', t: '現場簽署有效時間', d: '寫草稿、看影響、排定生效時間，送出要 MFA', tour: 'param'},
      {sel: '[data-key="tab-adm"]', t: '後台管理員', d: '新增、改角色、停用寵派員工的後台帳號', tour: 'admin'},
      {sel: '[data-key="tab-maint"]', t: '維護模式', d: '排定維護時段；商家的管理 Web 會看到公告', tour: 'maint'},
      {sel: '[data-key="lane-retain"]', t: '契約保存年限', d: '待法務決定，不能在這裡改', quiet: true}
    ],
    tours: [
      {id: 'read', title: '看懂全域參數的時間軸', who: '冠宇（寵派最高管理者）', query: S, minWidth: 0,
        scene: '你是寵派的最高管理者。全域參數是每家店都一樣、店家不能自己調的設定，例如現場簽署多久內要報到。你想看懂每個參數現在是多少、什麼時候改過、有沒有排程要改。這個引導只看不改。',
        outro: '四個全域參數：現場簽署有效時間 30 分（產品決議）；即時審閱速度 200 字／分，10/15 起排定改 180（暫定・待法務）；重點條款 5 條；契約保存年限「不清除」不能在這裡改。每份已簽的契約都存著簽約當時的參數，之後怎麼改都不會回溯。',
        steps: [
          {sel: '[data-key="lanes"]', info: true, t: '每一列是一個參數', d: '左到右是 8 月到 11 月：已過、現在、排程、草稿各有不同的樣子。'},
          {sel: '[data-key="lane-sign"]', info: true, t: '現場簽署有效時間：30 分', d: '產品決議（10/8）。自 6/1 起一直是 30 分。'},
          {sel: '[data-key="lane-review"]', info: true, t: '即時審閱速度：200 字／分', d: '暫定・待法務。原本 250，現在 200，10/15 起排定改成 180。'},
          {sel: '[data-key="sg-review-pend"]', info: true, t: '排程中：10/15 起 180 字／分', d: '一個參數同時只能有一筆排程；生效時間只能排在現在之後。'},
          {sel: '[data-key="lane-clauses"]', info: true, t: '重點條款：5 條', d: '6/1 起從 3 條變 5 條。暫定・待法務。'},
          {sel: '[data-key="lane-retain"]', info: true, t: '契約保存年限：不清除', d: '待法務給定；在那之前不能在這裡改，每一類契約都不清除。'},
          {sel: '[data-key="lane-sign"]', t: '點「現場簽署有效時間」', d: '看它的說明與紀錄。'},
          {sel: '.dp', info: true, t: '平板簽完要在 30 分內報到', d: '超過，或寵物、服務、資源有變，就作廢重簽。紀錄：6/1 起冠宇設為 30 分（上線預設）。'},
          {sel: '[data-key="dp-x"]', t: '按 ✕ 關閉', d: '回到全域參數。'},
          {sel: '.board-f', info: true, t: '已簽的契約不會回溯', d: '每份已簽契約都存著簽約當時的參數，之後怎麼改都不影響它。'}
        ]},
      {id: 'param', title: '現場簽署有效時間改成 20 分', who: '冠宇（寵派最高管理者）', query: S,
        scene: '10 月的試點店反映：飼主在平板簽完到報到之間，常被拿去等美容師，30 分太長。你決定改成 20 分，明天 00:00 起生效。全平台每家店都會受影響，所以要先寫草稿、看清楚影響，再用 MFA 確認。',
        outro: '現場簽署有效時間排定 10/10（六）00:00 起從 30 分改成 20 分，原因與「已過 MFA」記在紀錄與稽核中心。現在進行中的 3 筆現場簽署照開始時的 30 分算；已簽的契約不受影響。同一個參數同時只能有一筆排程，要改別的值得先取消這一筆。',
        steps: [
          {sel: '[data-key="lane-sign"]', t: '點「現場簽署有效時間」', d: '打開這個參數。'},
          {sel: '[data-key="draft-start"]', t: '按「寫一份草稿」', d: '草稿不會影響任何店。'},
          {sel: '[data-key="d-v"]', info: true, t: '可以改成 10–60 分，每 5 分一格', d: '現在 30 分。'},
          {sel: '[data-key="step-dn"]', t: '按「－」：30 → 25', d: '一次減 5 分。'},
          {sel: '[data-key="step-dn"]', t: '再按一次「－」：25 → 20', d: '改成 20 分。', until: {value: ['#d-v', '^20$']}},
          {sel: '[data-key="lane-sign"]', info: true, t: '時間軸上多了一段草稿', d: '「草稿・10/10 起 20 分」，還沒送出。'},
          {sel: '[data-key="eff-tmr"]', info: true, t: '生效：明天 00:00', d: '已經幫你選好。新開始的簽署才用新的值。'},
          {sel: '[data-key="impact"]', info: true, t: '改了會怎樣', d: '現在有 3 筆現場簽署進行中（毛孩日和 2、汪汪俱樂部 1），照開始時的 30 分算；10/10 之後才開始的用 20 分；已簽的契約不受影響。'},
          {sel: '[data-key="d-go"]', t: '按「排定生效…」', d: '打開確認視窗。'},
          {sel: '[data-key="dlg-diff"]', info: true, t: '30 分 → 20 分', d: '10/10（六）00:00 起；全平台每家店，已簽的契約與進行中的簽署照舊。'},
          {sel: '[data-key="dlg-ok"]', t: '先直接按「確認排定」', d: '看看漏了什麼。'},
          {sel: '[data-key="dlg"] .field:has(#d-why)', info: true, t: '原因與 MFA 都要填', d: '每一次修改都要重新輸入 MFA 驗證碼並寫原因。'}
        ].concat(WHY_MFA('10 月試點店反映簽完到報到的空檔被拿去等美容師，30 分太長'), [
          {sel: '[data-key="dlg-ok"]', t: '按「確認排定」', d: '排進時間軸。'},
          {settle: 1200, timeout: 9000, sel: '[data-key="sg-sign-pend"]', info: true, t: '時間軸：10/10 起 20 分', d: '草稿變成排程；上方「全域參數」的排程從 1 變 2。'},
          {sel: '[data-key="pend-note"]', info: true, t: '一個參數同時只能有一筆排程', d: '要改成別的值，先按「取消這筆排程…」。'},
          {sel: '[data-key="h-sign-pend"]', info: true, t: '紀錄：冠宇排定 30 分 → 20 分', d: '10/9 11:20 排定・已過 MFA，原因原文跟著。'}
        ])},
      {id: 'admin', title: '新增後台管理員：佩君', who: '冠宇（寵派最高管理者）', query: S,
        scene: '新客服佩君下週一到職。你要幫她建一個寵派後台帳號，角色是客服。小心：最高管理者的權限最大，不要選錯。建立後系統會寄設定連結給她，她自己設定密碼與 MFA 後才能登入。',
        outro: '佩君（peijun@chongpai.example）建好了，角色客服，狀態「待設定 MFA・還不能登入」；設定連結寄到她的公司信箱。這次異動寫了原因、輸入了你的 MFA，記在稽核中心。她打開連結設定密碼、綁定驗證 App、存好備用碼後就能登入（可以在「寵派後台登入」練習她的那一段）。',
        steps: [
          {sel: '[data-key="tab-adm"]', t: '按「後台管理員」', d: '6 個帳號啟用中。'},
          {sel: '[data-key="a-az"]', info: true, t: '冠宇（你）：不能改自己', d: '不能改自己的角色或停用自己；你也是唯一的最高管理者。'},
          {sel: '[data-key="a-zm"]', info: true, t: '志明：已停用', d: '9/15 停用。停用的帳號不能登入，紀錄保留。'},
          {sel: '[data-key="a-new"]', t: '按「新增管理員…」', d: '打開新增視窗。'},
          {sel: '#n-name', t: '輸入名字', d: '後台裡大家看到的名字。', fill: {value: '佩君', label: '佩君'}, until: {value: ['#n-name', '^佩君$']}},
          {sel: '#n-mail', t: '輸入公司 Email', d: '設定連結寄到這裡；設定好密碼與 MFA 才能登入。', fill: {value: 'peijun@chongpai.example', label: 'peijun@chongpai.example'}, until: {value: ['#n-mail', '^peijun@chongpai\\.example$']}},
          {sel: '[data-key="role-super"]', t: '先點「最高管理者」看看', d: '權限最大的角色。', until: {checked: '[data-key="role-super"]'}},
          {sel: '.fs:has([data-key="role"])', info: true, t: '請確認真的需要', d: '最高管理者可以建商家、停權、切換金流環境、改系統設定與異動管理員。客服不需要這些。'},
          {sel: '[data-key="role-support"]', t: '改選「客服」', d: '佩君是客服。', until: {checked: '[data-key="role-support"]'}},
          {sel: '.fs:has([data-key="role"])', info: true, t: '客服能做什麼', d: '客服查詢、通知與簽署連結補發、導入支援；不能代簽、代同意，也不能改金流或商家核心設定。'}
        ].concat(WHY_MFA('新客服 10/13 到職，協助汪汪俱樂部導入'), [
          {sel: '[data-key="dlg-ok"]', t: '按「建立並寄出設定連結」', d: '建立帳號。'},
          {settle: 1200, timeout: 9000, sel: '[data-key="a-n7"]', info: true, t: '佩君：待設定 MFA・還不能登入', d: '設定連結已寄出。她設定好密碼與 MFA 之前不能登入；沒收到可以按「重寄設定連結」。'},
          {sel: '[data-key="tab-adm"]', info: true, t: '後台管理員：6 → 7', d: '多了一個帳號。'}
        ])},
      {id: 'maint', title: '排定週日凌晨的維護', who: '冠宇（寵派最高管理者）', query: S,
        scene: '工程要升級資料庫主機，需要停止寫入 2 小時。你要排一個維護時段：挑一個影響最小的時間，看清楚會擋下什麼、照常什麼，排定後每家店的管理 Web 會立刻看到公告。',
        outro: '維護排定在 10/11（日）02:00–04:00（2 小時），原因「資料庫主機升級，需要停寫入」、已過 MFA。這段時間不能新增預約、升級方案或改店家設定；已建立預約的報到、服務、收款、離店、住宿退房與簽署照常。公告已顯示在每家店的管理 Web 上方，後台上方也掛著「已排定維護」。',
        steps: [
          {sel: '[data-key="tab-maint"]', t: '按「維護模式」', d: '目前沒有排定的維護。'},
          {sel: '[data-key="mp-tonight"]', t: '開始時間先選「今晚 23:00」', d: '看看影響多大。', until: {checked: '[data-key="mp-tonight"]'}},
          {sel: '[data-key="m-impact"]', info: true, t: '今晚：飼主平均會送出 3 筆新預約', d: '這些人會看到「寵派系統維護中」，只能晚點再預約。'},
          {sel: '[data-key="mp-sun"]', t: '改選「週日 02:00」', d: '半夜比較沒人預約。', until: {checked: '[data-key="mp-sun"]'}},
          {sel: '[data-key="m-impact"]', info: true, t: '週日凌晨：0 筆新預約', d: '0 筆預約落在這段時間；11 隻住宿中的寵物退房與逾時費照常。'},
          {sel: '[data-key="mh-2"]', info: true, t: '預計 2 小時', d: '最多 4 小時；提早做完可以提前結束。'},
          {sel: '[data-key="split"]', info: true, t: '擋下什麼、照常什麼', d: '擋下：新預約、方案升級與加購、商家設定與價格修改。照常：已建立預約的報到、服務、收款、離店、住宿退房、簽署、查詢與必要通知。'},
          {sel: '[data-key="m-preview"]', info: true, t: '商家會看到這則公告', d: '排定後就顯示在每家店的管理 Web 上方，直到維護結束。'},
          {sel: '[data-key="m-go"]', t: '按「排定維護…」', d: '打開確認視窗。'},
          {sel: '[data-key="dlg"] .cdl', info: true, t: '10/11（日）02:00–04:00', d: '排定後立刻顯示在每家店的管理 Web。'}
        ].concat(WHY_MFA('資料庫主機升級，需要停寫入兩小時'), [
          {sel: '[data-key="dlg-ok"]', t: '按「確認排定」', d: '公告會立刻出現。'},
          {settle: 1200, timeout: 9000, sel: '[data-key="m-state"]', info: true, t: '已排定維護', d: '冠宇 10/9 11:20 排定・已過 MFA；原因原文跟著。要取消可以按「取消這次維護…」。'},
          {sel: '[data-key="maintbar"]', info: true, t: '後台上方也掛著提醒', d: '已排定維護 10/11（日）02:00–04:00・商家已看到公告。'}
        ])}
    ]
  });
})();
