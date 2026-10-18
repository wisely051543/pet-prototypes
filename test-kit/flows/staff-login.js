/* 店員登入 (S-01): hints and guided tours for test mode. Format: test-kit/flows/README.md
   Tours speak the shop's voice: 寵物, not 毛孩. One action or one explanation per step: a PIN is four key presses, so it
   is four steps. Each scene is a URL parameter (?go=fresh / solo), so each one is its own tour. The board after a login is
   only a stand-in head ("原型到此為止"); the tours stop there. Demo: 阿凱 0912000102, password demo1234, every PIN 2580,
   SMS code 135790. */
(function () {
  var Q = function (go) { return {go: go, suspended: null, offline: null, theme: null, scale: null}; };
  var keys = function (pre, digits, what) {
    return digits.split('').map(function (n, i) {
      return {sel: '[data-key="' + pre + n + '"]', t: '按「' + n + '」（' + what + '第 ' + (i + 1) + ' 碼）', d: i === 3 ? '按滿 4 碼就會自動檢查。' : '上面的圓點會亮一顆。'};
    });
  };
  var BOARD = {settle: 800, sel: 'header.head', info: true, t: '進到今日看板', d: '右上角是現在登入的人。原型到此為止，看板內容在今日看板原型。'};

  /* a new counter tablet's first login: also 毛孩日和開張's act 5 (prototypes/open-day) */
  var FRESH = [
    {sel: '.fsheet', info: true, t: '這台平板還沒有人登入過', d: '第一次用手機和密碼登入，之後換人只要 PIN。'},
    {sel: '#lg-acct', t: '輸入手機號碼', d: '帳號就是被邀請時登記的手機。', fill: {value: '0912000102', label: '0912000102（阿凱）'}, until: {value: ['#lg-acct', '^0912000102$']}},
    {sel: '#lg-pw', t: '輸入密碼', d: '示範密碼 demo1234。', fill: {value: 'demo1234', label: 'demo1234（示範密碼）'}, until: {value: ['#lg-pw', '^demo1234$']}},
    {sel: '[data-key="lg-go"]', t: '按「登入」', d: '接著設定這台的 PIN。'},
    {sel: 'main', info: true, t: '第 1 步，共 2 步：設定 PIN', d: '不能四碼都一樣，也不能是 1234 這種連號。PIN 只在這台平板有效。'}
  ].concat(keys('sk-', '1234', '先試太好猜的 '), [
    {settle: 900, sel: '.pin-msg', info: true, t: '這組太好猜了，換一組', d: '別人看一眼就猜得到的 PIN 不能用。'}
  ], keys('sk-', '2580', '新 PIN '), [
    {settle: 600, sel: 'main', info: true, t: '再輸入一次確認', d: '兩次一樣才算設定好。'}
  ], keys('sk-', '2580', '確認 PIN '), [
    {settle: 800, sel: 'main', info: true, t: '第 2 步，共 2 步：要開啟通知嗎？', d: '飼主申請改期或取消、線上付款入帳、契約簽好了，App 會通知你。只通知店內的事，不傳廣告。'},
    {sel: '[data-key="push-yes"]', t: '按「開啟通知」', d: '平板會跳出系統的詢問視窗。'},
    {sel: '.os', info: true, t: '系統的詢問視窗（模擬）', d: '「寵派商家中心」想要傳送通知。這是平板系統問的，要按「允許」才收得到。'},
    {sel: '[data-key="os-yes"]', t: '按「允許」', d: '之後有需要你處理的事，平板會通知你。'},
    BOARD
  ]);

  PP.register('staff-login', {
    name: '店員登入',
    hints: [
      {sel: '[data-key^="p-"]', t: '點自己的名字', d: '輸入 4 碼 PIN 就能進來；PIN 只在這台有效', tour: 'pin'},
      {sel: '[data-key="add-person"]', t: '加入這台裝置', d: '第一次在這台用，先用手機和密碼登入，再設定 PIN'},
      {sel: '[data-key="lg-go"]', t: '手機和密碼登入', d: '第一次用這台平板，登入後設定 PIN', tour: 'fresh'},
      {sel: '[data-key="forgot-pin"]', t: '忘記 PIN', d: '用手機和密碼或簡訊驗證碼登入，再重新設定', tour: 'forgot-pin'},
      {sel: '[data-key="pin-remove"]', t: '從這台移除', d: '輸入 PIN 確認，這台就不再顯示你', tour: 'remove'},
      {sel: '[data-key="to-otp"]', t: '改用簡訊驗證碼登入', d: '忘了密碼也能登入', quiet: true}
    ],
    tours: [
      {id: 'pin', title: '阿凱在櫃台平板用 PIN 登入', who: '櫃台阿凱', query: Q(null),
        scene: '早上到店，你要用櫃台平板。這台平板已經有 4 個人登入過，點自己的名字、輸入 4 碼 PIN 就能進來。第一次先按錯，看看系統怎麼說。',
        outro: '你點自己的名字、輸入 PIN 2580 進到今日看板。按錯時系統說「PIN 不對」並告訴你還剩幾次，錯太多次 PIN 會鎖定，要改用手機和密碼。用完按「換人」回到員工牆；閒置 5 分鐘也會自動回到員工牆。',
        steps: [
          {sel: 'ul.people', info: true, t: '員工牆：誰要用平板？', d: '林店長、阿凱、小葵、阿楷都登入過這台。點自己的名字，輸入 4 碼 PIN。'},
          {sel: '[data-key="p-akai"]', t: '點「阿凱」', d: '你的名片會展開成 PIN 鍵盤。'},
          {sel: '.pin-card', info: true, t: 'PIN 只在這台有效', d: '別台平板要另外設定。下面可以「忘記 PIN」或「從這台移除」。'}
        ].concat(keys('k-', '1111', '故意按錯，'), [
          {settle: 900, sel: '.pin-msg', info: true, t: 'PIN 不對', d: '再錯幾次會鎖定，鎖定後要改用手機和密碼登入。這是為了不讓別人亂猜。'}
        ], keys('k-', '2580', 'PIN '), [
          BOARD,
          {sel: '.walk', info: true, t: '新增現場預約', d: '櫃台最常用的動作放在最上面。'},
          {sel: '[data-key="switch"]', t: '用完了，按「換人」', d: '回到員工牆，換下一個人用。'},
          {settle: 800, sel: '[data-key="p-akai"]', info: true, t: '回到員工牆：阿凱「剛剛用過」', d: '閒置 5 分鐘也會自動回到這裡。'}
        ])},
      {id: 'fresh', title: '新平板第一次登入：設定 PIN 和通知', who: '櫃台阿凱', query: Q('fresh'),
        scene: '店裡買了一台新的櫃台平板，還沒有人登入過。你是第一個：用手機和密碼登入，設定這台的 PIN，再決定要不要開通知。',
        outro: '你用手機和密碼登入新平板，設定 PIN 2580（1234 這種太好猜的不行），開啟了通知：改期取消待審、付款入帳、契約簽好時 App 會通知你，不會傳廣告。下次點自己的名字、輸入 PIN 就能進來。',
        steps: FRESH},
      {id: 'forgot-pin', title: '阿凱忘了 PIN：用簡訊驗證碼登入再重設', who: '櫃台阿凱', query: Q(null),
        scene: '放完長假回來，你想不起這台平板的 PIN，也忘了密碼。你要用簡訊驗證碼登入，再重新設定這台的 PIN。',
        outro: '你按「忘記 PIN」，改用簡訊驗證碼登入（驗證碼傳到登記的手機），重新設定了這台的 PIN 1357，進到今日看板。PIN 只在這台有效；忘了密碼也不用找店長。',
        steps: [
          {sel: '[data-key="p-akai"]', t: '點「阿凱」', d: '展開 PIN 鍵盤。'},
          {sel: '[data-key="forgot-pin"]', t: '按「忘記 PIN」', d: '在 PIN 鍵盤上方。'},
          {sel: '.fsheet', info: true, t: '阿凱，用手機和密碼登入', d: '手機已經幫你填好。登入後重新設定這台的 PIN。'},
          {sel: '[data-key="to-otp"]', t: '忘了密碼：按「改用簡訊驗證碼登入」', d: '不用密碼，用手機收驗證碼。'},
          {sel: '#otp-ph', t: '輸入手機號碼', d: '要是被邀請時登記的手機。', fill: {value: '0912000102', label: '0912000102（阿凱）'}, until: {value: ['#otp-ph', '^0912000102$']}},
          {sel: '[data-key="otp-send"]', t: '按「傳送驗證碼」', d: '簡訊會傳到這支手機。'},
          {sel: '#otp-code', t: '輸入簡訊驗證碼', d: '10 分鐘內有效；60 秒後可以重新傳送，也可以換一支手機。同一組輸錯 5 次就失效。', fill: {value: '135790', label: '135790（示範驗證碼）'}, until: {value: ['#otp-code', '^135790$']}},
          {sel: '[data-key="otp-go"]', t: '按「登入」', d: '驗證碼對了就會登入。'},
          {sel: 'main', info: true, t: '重新設定 PIN', d: '不能四碼都一樣，也不能是連號。'}
        ].concat(keys('sk-', '1357', '新 PIN '), [
          {settle: 600, sel: 'main', info: true, t: '再輸入一次確認', d: '兩次一樣才算設定好。'}
        ], keys('sk-', '1357', '確認 PIN '), [BOARD])},
      {id: 'remove', title: '阿楷把自己從櫃台平板移除', who: '美容師阿楷', query: Q(null),
        scene: '你是美容師阿楷，下個月調到信義店。你不想讓中山店的櫃台平板繼續顯示你、收到你的內部通知，要把自己從這台移除。',
        outro: '你輸入自己的 PIN 確認，阿楷從這台平板移除了：員工牆剩 3 個人，這台也不會收到你的內部通知。下次要用，得用手機和密碼重新加入。別人不能移除你，因為要你的 PIN。',
        steps: [
          {sel: '[data-key="p-kai"]', t: '點「阿楷」', d: '也可以在員工牆上按住自己的名字。'},
          {sel: '[data-key="pin-remove"]', t: '按「從這台移除」', d: '要輸入你的 PIN 確認，別人不能把你移除。'},
          {sel: '.pin-card', info: true, t: '輸入 PIN，把阿楷從這台移除', d: '移除後這台不再顯示你，也不會收到你的內部通知；下次要用手機和密碼重新加入。'}
        ].concat(keys('k-', '2580', '你的 PIN '), [
          {settle: 900, sel: 'ul.people', info: true, t: '員工牆剩 3 個人', d: '林店長、阿凱、小葵。阿楷不見了。'}
        ])},
      {id: 'solo', title: '小葵用自己的手機登入', who: '美容師小葵', query: Q('solo'),
        scene: '你是美容師小葵，店員 App 裝在自己的手機上。手機只有你一個人用，打開就直接是你的 PIN 鍵盤。',
        outro: '個人手機不用員工牆：打開就是你的名字，輸入 PIN 2580 就進到今日看板。手機借別人用時，對方可以按「不是小葵？」用自己的手機和密碼登入。',
        steps: [
          {sel: '.pin-card', info: true, t: '只有你：小葵', d: '個人手機不顯示員工牆，直接輸入 PIN。PIN 只在這支手機有效。'},
          {sel: '[data-key="not-me"]', info: true, t: '不是小葵的話', d: '別人借用時，按這裡用自己的手機和密碼登入。'}
        ].concat(keys('k-', '2580', 'PIN '), [BOARD])},
      /* 毛孩日和開張 (prototypes/open-day): act 5, played inside that page with ?life=open-tablet (10/14 09:30); not listed on this page */
      {id: 'life-open-tablet', life: true, seed: {life: 'open-tablet'}, title: '第 5 幕：新的櫃台平板第一次登入', who: '櫃台阿凱', query: Q('fresh'),
        scene: '10/14（三）公休日早上 9:30。毛孩日和明天開張，店裡買了一台新的櫃台平板，還沒有人登入過。陳老闆前幾天邀請你當中山店的櫃台，你也開通了帳號。等一下他要用這台平板試約簽名，你先當第一個登入的人：用手機和密碼登入，設定這台的 PIN，再決定要不要開通知。',
        outro: '新平板登入好了：你設定了 PIN 2580（1234 這種太好猜的不行），開啟了通知，改期取消待審、付款入帳、契約簽好時 App 會通知你。明天開始，點自己的名字、輸入 PIN 就能進來。下一幕換陳老闆，用這台平板試約。',
        steps: FRESH},
      /* 阿楷離職那天 (prototypes/last-day/): act 2, 10/9（五）11:14, played inside the director page with ?life=qt-leave; not listed on this page */
      {id: 'life-qt-leave', life: true, query: Q(null), seed: {life: 'qt-leave'}, title: '第 2 幕：把自己從櫃台平板移除', who: '美容師阿楷',
        scene: '10/9（五）11:14。湯圓做完了，你中午就離職。這台櫃台平板的員工牆上還有你，寫著「剛剛用過」。走之前把自己從這台移除：這台就不再顯示你，也不會再收到你的內部通知。',
        outro: '你輸入自己的 PIN 確認，阿楷從這台平板移除了，員工牆剩 3 個人。別人不能移除你，因為要你的 PIN。你在其他裝置上的登入，等陳老闆停用帳號時會一起登出。下一幕換陳老闆。',
        steps: [
          {sel: '[data-key="p-kai"]', t: '點「阿楷」', d: '寫著「剛剛用過」。也可以在員工牆上按住自己的名字。'},
          {sel: '[data-key="pin-remove"]', t: '按「從這台移除」', d: '要輸入你的 PIN 確認，別人不能把你移除。'},
          {sel: '.pin-card', info: true, t: '輸入 PIN，把阿楷從這台移除', d: '移除後這台不再顯示你，也不會收到你的內部通知。'}
        ].concat(keys('k-', '2580', '你的 PIN '), [
          {settle: 900, sel: 'ul.people', info: true, t: '員工牆剩 3 個人', d: '林店長、阿凱、小葵。阿楷不見了。'}
        ])}
    ]
  });
})();
