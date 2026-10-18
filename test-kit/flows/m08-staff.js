/* M-08 員工與權限: hints and guided tours for test mode. Format: test-kit/flows/README.md
   Tours speak the shop's voice: 寵物, not 毛孩. One action or one explanation per step. */
(function () {
  var Q = {role: 'admin', p: null, off: null, fail: null, seed: null};

  PP.register('m08-staff', {
    name: '員工與權限',
    minWidth: 720,   /* 手機上只能查看 */
    hints: [
      {sel: '[data-key="new"]', t: '邀請員工', d: '產生 LINE 邀請連結與 QR，由你傳給對方', tour: 'invite'},
      {sel: '[data-key^="slot-"]', t: '邀請到這一格', d: '分店和角色會先幫你選好', tour: 'invite'},
      {sel: '[data-key^="pc-"]', t: '打開員工資料', d: '角色、分店、慣用美容台、登入、停用', tour: 'stop'},
      {sel: '[data-key="go-caps"]', t: '四種角色能做什麼', d: '角色是固定的，不能一個人一個人自訂', tour: 'roles'},
      {sel: '.seat', t: '席次', d: '方案可以有幾位員工；邀請中也算一席', quiet: true},
      {sel: '[data-key="go-plan"]', t: '看方案', d: '席次滿了，可以升級方案', quiet: true}
    ],
    tours: [
      {id: 'roles', title: '看懂角色與權限', who: '陳老闆（店家管理者）', query: Q,
        scene: '你想先弄清楚：店裡每個人是什麼角色、在哪家分店，四種角色各能做什麼，尤其是誰看得到寵物的病史和攻擊性說明。這個引導只看不改。',
        outro: '員工表一列是一家分店、一欄是一種角色。角色只有四種，是固定的：櫃台看不到攻擊性說明、病史、過敏與內部備註（遮住），美容照護看得到但不能改，店長以上看得到也能改。方案有 10 席，現在用了 9 席。',
        steps: [
          {sel: '.head .seat', info: true, t: '席次 9／10', d: '基本方案可以有 10 位員工，現在 9 位。邀請還沒接受的也會占一席。'},
          {sel: '.brw.tenant', info: true, t: '最上面：全分店的店家管理者', d: '陳老闆（你）管兩家分店的所有設定。你的卡片有標記，不能停用自己。'},
          {sel: '.brw.chrow, [data-cell="zs-mgr"]', info: true, t: '三種分店角色：店長、櫃台、美容照護', d: '每一格是「哪家分店的哪個角色」，卡片就是那個人。中山店的店長是林店長。'},
          {sel: '[data-cell="zs-svc"]', info: true, t: '中山店美容照護：阿哲、小葵、阿楷', d: '美容照護的卡片寫著慣用美容台，和資源頁、今日看板一致。'},
          {sel: '[data-cell="xy-mgr"]', info: true, t: '信義店還沒有店長', d: '虛線的空格寫著「還沒有店長」，按了可以邀請。'},
          {sel: '[data-key="go-caps"]', t: '按「四種角色能做什麼」', d: '跳到下面的角色表。'},
          {sel: 'table.caps', info: true, t: '角色表：每個角色能做什麼', d: '一列一件事，一欄一個角色。打勾是能做，橫線是不能。角色是固定的，不能一個人一個人自訂。'},
          {sel: 'table.caps tr.senr', info: true, t: '敏感資料：櫃台遮住', d: '攻擊性說明、病史、過敏與內部備註：櫃台遮住、美容照護看得到、店長看得到也能改。安全與照護的標籤每個人都看得到。'}
        ]},
      {id: 'invite', title: '邀請一位櫃台到信義店', who: '陳老闆（店家管理者）', query: Q,
        scene: '信義店新來一位櫃台，店裡都叫她「安安」。你要產生一條 LINE 邀請連結給她。邀請不會從寵派的官方帳號發出，是你自己傳給她。',
        outro: '安安的邀請產生了：她的卡片出現在信義店櫃台，標著「待接受」，席次變成 10／10（已滿）。連結 7 天內有效，也寄了一份到她的 Email。她接受並綁定 LINE 後就能登入。',
        steps: [
          {sel: '[data-key="slot-xy-desk"]', t: '在信義店櫃台那一格按「＋」', d: '從格子邀請，分店和角色會先幫你選好。'},
          {sel: '.dp .lede', info: true, t: '邀請由你自己傳', d: '產生一條 LINE 邀請連結與 QR，由你傳給對方；不會從寵派的 LINE 官方帳號發出。'},
          {sel: '.dp .fs:has([data-key="nk-desk"])', info: true, t: '角色已經選好：櫃台', d: '每個角色後面寫著能做什麼。櫃台：看板、報到、現場預約與收款；病史等敏感說明會遮住。'},
          {sel: '#n-name', t: '輸入店內稱呼', d: '看板、操作紀錄和飼主收到的通知會顯示這個名字。', fill: {value: '安安', label: '安安'}, until: {value: ['#n-name', '\\S']}},
          {sel: '#n-mail', t: '輸入 Email（選填）', d: '對方沒有 LINE 或收不到時，再寄一份到這裡。', fill: {value: 'anan@example.com', label: 'anan@example.com'}, until: {value: ['#n-mail', '@']}},
          {sel: '.dp .prevw', info: true, t: '送出後占用 1 席（10／10）', d: '對方 7 天內沒接受，連結就失效，可以重發。'},
          {sel: '[data-key="n-save"]', t: '按「產生邀請」', d: '名字沒填或 Email 格式不對，會直接在欄位旁邊告訴你。'},
          {settle: 1000, sel: '.dp .invb', info: true, t: '把邀請傳給安安', d: '連結和 QR 都在這裡：用 LINE 傳給她，或請她當面掃。10/16 前有效，也寄到她的 Email。'},
          {sel: '[data-cell="xy-desk"]', info: true, t: '安安出現在信義店櫃台：待接受', d: '虛線的卡片代表還沒接受邀請。'},
          {sel: '.head .seat', info: true, t: '席次 10／10，已滿', d: '滿了之後「邀請員工」會停用，旁邊會出現「看方案」。'}
        ]},
      {id: 'grant', title: '讓林店長兼管信義店', who: '陳老闆（店家管理者）', query: Q,
        scene: '信義店還沒有店長。在找到人之前，你想讓中山店的林店長兼管信義店。',
        outro: '林店長現在管中山店和信義店：本店還是中山店，信義店的店長格多了一張虛線的「兼管・本店中山店」卡片，「還沒有店長」的提示不見了。這次變更寫進了操作紀錄。',
        steps: [
          {sel: '[data-cell="xy-mgr"]', info: true, t: '信義店還沒有店長', d: '空格寫著「還沒有店長」。'},
          {sel: '[data-key="pc-u2"]', t: '按林店長的卡片', d: '右邊會打開林店長的資料。'},
          {sel: '.dp .dsec:has([data-key="brt-xy"])', info: true, t: '分店：目前只管中山店', d: '本店是中山店，不能拿掉。'},
          {sel: '[data-key="brt-xy"]', t: '勾選「信義店」', d: '一個人可以管好幾家分店。'},
          {sel: '.tray', info: true, t: '還沒存：分店 中山店 → 中山店・信義店', d: '改了什麼會寫在下面，確認後再存。'},
          {sel: '[data-key="p-save"]', t: '按「儲存變更」', d: '會寫進操作紀錄。'},
          {settle: 1000, sel: '[data-key="ref-u2-xy"]', info: true, t: '信義店店長格：兼管・本店中山店', d: '虛線的卡片代表兼管，人還是中山店的。「還沒有店長」的提示不見了。'},
          {sel: '[data-key="pc-u2"]', info: true, t: '林店長的卡片：管 中山店・信義店', d: '信義店的店長可以之後再邀請；邀請到了，再把兼管拿掉。'}
        ]},
      {id: 'stop', title: '停用一位離職員工的帳號', who: '陳老闆（店家管理者）', query: Q,
        scene: '美容師阿楷今天是最後一天。你要停用他的帳號：他會立刻被登出，但預約不會被取消。他是美容台 C 的慣用美容師，要先決定交給誰。',
        outro: '阿楷的帳號停用了：所有裝置立刻登出，卡片移到「已停用」，空出一席（8／10）。美容台 C 的慣用美容師交給小葵，預約都掛在美容台上，一筆也沒取消。紀錄保留，之後可以重新啟用。',
        steps: [
          {sel: '[data-key="pc-u6"]', t: '按阿楷的卡片', d: '在中山店美容照護那一格。'},
          {sel: '.dp .dsec:has([data-key^="tb-"])', info: true, t: '阿楷是美容台 C 的慣用美容師', d: '慣用美容師只是美容台上的標籤；預約掛在美容台上，不掛在人身上。'},
          {sel: '[data-key="st-go"]', t: '按最下面的「停用帳號」', d: '先看要留意的事，還不會停用。'},
          {sel: '.dp .hand', info: true, t: '美容台 C 接下來 14 天有 7 筆預約', d: '今天 3 筆，其中 10:30 那筆正在服務。停用不會擋任何預約，也不會取消。'},
          {sel: '#st-hand', t: '慣用美容師交給「小葵」', d: '也可以先不指定，之後到「資源」再改。', fill: {value: 'u5', label: '小葵'}, until: {value: ['#st-hand', '^u5$']}},
          {sel: '.dp .dsec:has(+ .go)', info: true, t: '停用之後會怎樣', d: '立刻登出所有裝置，包括店內共用的平板；今天正在進行的服務請別人在今日看板接手；空出 1 席（8／10）。'},
          {sel: '[data-key="st-ok"]', t: '按「停用帳號」', d: '還會再確認一次。'},
          {sel: '.dialog', info: true, t: '確認視窗：停用後此員工將無法登入', d: '寫著慣用美容台的交接：美容台 C → 小葵。紅色的按鈕。'},
          {sel: '[data-key="dg-ok"]', t: '按「確認停用」', d: '阿楷會立刻被登出。'},
          {settle: 1000, sel: '.offs', info: true, t: '阿楷移到「已停用」', d: '員工表上看不到他了，下面的已停用清單留著，可以重新啟用。'},
          {sel: '[data-key="pc-u5"]', info: true, t: '小葵：慣用 美容台 B、美容台 C', d: '交接寫進了美容台 C。'},
          {sel: '.head .seat', info: true, t: '席次 8／10', d: '空出一席，可以再邀請新人。'}
        ]},
      /* 阿楷離職那天 (prototypes/last-day/): act 3, 10/9（五）11:18, played inside the director page with ?life=qt-stop; not listed on this page */
      {id: 'life-qt-stop', life: true, query: Q, seed: {life: 'qt-stop'}, title: '第 3 幕：停用帳號，美容台 C 交給小葵', who: '陳老闆（店家管理者）',
        scene: '10/9（五）11:18。阿楷剛做完最後一筆、也把自己從櫃台平板移除了，中午就離職。你要停用他的帳號：他在所有裝置上會立刻登出，但預約不會被取消。他是美容台 C 的慣用美容師，要先決定交給誰。',
        outro: '阿楷的帳號停用了：所有裝置立刻登出，卡片移到「已停用」，空出一席（8／10）。美容台 C 的慣用美容師交給小葵，她同時掛著美容台 B、C；預約都掛在美容台上，17 筆一筆也沒取消。紀錄保留，之後可以重新啟用。下一幕換林店長看行事曆。',
        steps: [
          {sel: '[data-key="pc-u6"]', t: '按阿楷的卡片', d: '在中山店美容照護那一格。'},
          {sel: '.dp .dsec:has([data-key^="tb-"])', info: true, t: '阿楷是美容台 C 的慣用美容師', d: '慣用美容師只是美容台上的標籤；預約掛在美容台上，不掛在人身上。'},
          {sel: '[data-key="st-go"]', t: '按最下面的「停用帳號」', d: '先看要留意的事，還不會停用。'},
          {sel: '.dp .hand', info: true, t: '美容台 C 今天到 10/15 有 17 筆預約', d: '今天 3 筆：10:30 湯圓阿楷剛做完，12:30 麻糬、15:00 皮皮還沒開始。停用不會擋任何預約，也不會取消。'},
          {sel: '#st-hand', t: '慣用美容師交給「小葵」', d: '小葵本來是美容台 B 的慣用美容師，交給她就同時掛兩台。也可以先不指定，之後到「資源」再改。', fill: {value: 'u5', label: '小葵'}, until: {value: ['#st-hand', '^u5$']}},
          {sel: '.dp .dsec:has(+ .go)', info: true, t: '停用之後會怎樣', d: '立刻登出所有裝置；今天下午的麻糬、皮皮留在美容台 C，由店長排人接手；空出 1 席（8／10）。'},
          {sel: '[data-key="st-ok"]', t: '按「停用帳號」', d: '還會再確認一次。'},
          {sel: '.dialog', info: true, t: '確認視窗：停用後此員工將無法登入', d: '寫著慣用美容台的交接：美容台 C → 小葵。紅色的按鈕。'},
          {sel: '[data-key="dg-ok"]', t: '按「確認停用」', d: '阿楷會立刻被登出。'},
          {settle: 1000, sel: '.offs', info: true, t: '阿楷移到「已停用」', d: '員工表上看不到他了，下面的已停用清單留著，可以重新啟用。'},
          {sel: '[data-key="pc-u5"]', info: true, t: '小葵：慣用 美容台 B、美容台 C', d: '交接寫進了美容台 C。'}
        ]}
    ]
  });
})();
