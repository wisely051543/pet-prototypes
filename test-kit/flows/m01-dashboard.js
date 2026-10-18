/* M-01 開店設定與儀表板: hints and guided tours for test mode. Format: test-kit/flows/README.md
   Tours speak the shop's voice: 寵物, not 毛孩. One action or one explanation per step. */
(function () {
  var SETUP = {role: 'admin', view: 'setup', live: null, all: null, fail: null, item: null, boarding: null};
  /* the price page: 洗澡＋剪毛 has no duration yet */
  var price = [
    {sel: '[data-key="go-next"]', t: '按「下一項：價格」', d: '右邊的完成度卡片會告訴你下一項該做什麼，按這顆就直接過去。'},
    {sel: '.svc:has(#m-groom)', info: true, t: '「洗澡＋剪毛」還缺服務時間', d: '價格 NT$1,200 有了，但服務時間是空的。缺時間的服務，飼主預約時看不到，也排不出時段。'},
    {sel: '.side-p .see', info: true, t: '右邊：飼主會看到什麼', d: '現在寫著飼主在店家頁和 LINE 都看不到這項服務。填好之後，這裡會換成飼主實際看到的樣子。'},
    {sel: '#m-groom', t: '服務時間選「2 小時」', d: '時間決定一個時段要佔多久。小型犬洗澡＋剪毛大約 2 小時。', fill: {value: '120', label: '2 小時'}, until: {value: ['#m-groom', '^120$']}},
    {sel: '.side-p .see .bubble', info: true, t: '飼主會看到：約 2 小時・NT$1,200', d: '這就是飼主在店家頁看到的樣子。改價只影響之後的新預約，已經建立的預約金額不變。'},
    {sel: '[data-key="finish"]', t: '按「完成此項」', d: '四項服務都有價格和時間了，按鈕才會亮。按了會回到開店設定。'},
    {sel: '[data-key="it-price"]', info: true, t: '「價格」變成已完成', d: '寫著「4 項服務都有價格與時間」。完成度從 10 / 13 變成 11 / 13。'}
  ];
  /* the policy page's example booking: 10/12（一）14:00 on its own, 10/17（六）14:00 under 毛孩日和開張 (?life=) */
  var policyOf = function (ex, free) { return [
    {sel: '[data-key="it-policy"]', t: '按「取消政策」', d: '「契約與規則」裡唯一還沒做的一項，寫著「尚未設定取消 / 改期政策」。'},
    {sel: '.side-p .calc', info: true, t: '右邊有一題例題', d: '洗澡＋剪毛 NT$1,200，預約 ' + ex + '。你每選一項，這裡就算給你看，飼主取消要付多少。'},
    {sel: '[data-key="free-24"]', t: '免費取消期限：選「24 小時前」', d: '預約前 24 小時以前取消，不收任何費用。'},
    {sel: '.side-p .calc', info: true, t: '例題：' + free + ' 前取消免費', d: '剛選的期限馬上算出來了：預約前一天的同一時間以前取消，不收錢。'},
    {sel: '[data-key="fee-20"]', t: '取消費：選「20%」', d: '超過免費期限才取消或改期，收服務金額的 20%。'},
    {sel: '[data-key="noshow-30"]', t: '未到費：選「30%」', d: '沒來也沒取消，收服務金額的 30%。'},
    {sel: '.side-p .calc', info: true, t: '例題：之後取消 NT$240，沒來 NT$360', d: 'NT$1,200 的 20% 和 30%。取消費和未到費由系統照這份政策算，不能手動輸入。'},
    {sel: '.side-p .see', info: true, t: '飼主會在預約確認訊息看到這段規則', d: '「' + free + ' 前取消或改期不收費・之後收 20%・沒來也沒取消，收 30%」，用 LINE 傳給飼主。'},
    {sel: '[data-key="finish"]', t: '按「完成此項」', d: '三項都選好，按鈕亮了。開店後還可以在「取消與改期政策」調整。'},
    {sel: '[data-key="it-policy"]', info: true, t: '「取消政策」變成已完成', d: '寫著「24 小時前免費取消・之後收 20%」。'}
  ]; };
  var policy = policyOf('10/12（一）14:00', '10/11（日）14:00');
  var trial = [
    {sel: '.panel.trial .legs', info: true, t: '試約分四段：預約、通知、閱讀、簽名', d: '用你自己的 LINE 走一次飼主會走的路。前兩段已經通過，閱讀和簽名還沒測。試約做完會自動作廢，不計用量。'},
    {sel: '[data-key="run"]', t: '按「試約測試」', d: '系統會一段一段檢查，大約幾秒鐘。'},
    {sel: '.leg.fail', info: true, timeout: 9000, t: '「閱讀」沒過：你還沒打開契約', d: '契約已經傳到你的 LINE，但還沒打開。實際上要在手機打開契約讀到最後，再回來按「重試」。這裡假裝你已經讀完了。'},
    {sel: '[data-key="retry"]', t: '按「重試」', d: '從沒過的那一段重新檢查。'},
    {sel: '.panel.trial .panel-h .chip.success', info: true, timeout: 9000, t: '四段都通過', d: '閱讀、簽名也過了：飼主從 LINE 預約、收到通知、讀契約、到店在平板簽名，整條路都通。'},
    {sel: '[data-key="it-trial"]', info: true, t: '「試約」變成已完成', d: '寫著「試約 #1 已作廢，不計用量」。'}
  ];

  PP.register('m01-dashboard', {
    name: '開店設定與儀表板',
    hints: [
      {sel: '[data-key="go-next"]', t: '下一項', d: '照順序做下一個還沒完成的設定', tour: 'price'},
      {sel: '[data-key="it-policy"]', t: '取消政策', d: '免費取消期限、取消費、未到費', tour: 'policy'},
      {sel: '[data-key="run"], [data-key="retry"]', t: '試約測試', d: '用自己的 LINE 走一次預約、通知、閱讀、簽名', tour: 'trial'},
      {sel: '[data-key="golive"], [data-key="golive-h"]', t: '正式啟用', d: '13 項都完成後，開放飼主預約', tour: 'golive'},
      {sel: '[data-key^="it-"]', t: '打開這一項設定', d: '每一項都可以點進去看或修改', quiet: true},
      {sel: '[data-key="kpi-0"]', t: '今天的數字', d: '預約、待報到、服務中、住宿、今日已收', tour: 'dash'},
      {sel: '[data-key="scope"]', t: '分店範圍', d: '看全部分店或只看一家', tour: 'dash'},
      {sel: '[data-key="r-go"]', t: '到待處理審核', d: '前往審核台，處理改期、取消等申請'},
      {sel: '[data-key="x-go"]', t: '到今日看板', d: '前往今日看板，處理需要注意的預約'},
      {sel: '[data-key^="rs-"]', t: '補發契約連結', d: '飼主還沒打開契約，再傳一次', quiet: true},
      {sel: '[data-key="nav-cal"]', t: '預約', d: '前往 M-02 預約行事曆', quiet: true},
      {sel: '[data-key="nav-cust"]', t: '客戶與寵物', d: '前往 M-03', quiet: true},
      {sel: '[data-key="qr-dl"]', t: '下載 QR', d: '下載預約入口 QR（PNG），可以印出來貼在櫃台', quiet: true},
      {sel: '[data-key="qr-copy"]', t: '複製連結', d: '複製預約入口連結，貼到店家的 LINE 或社群', quiet: true}
    ],
    tours: [
      {id: 'price', title: '補上缺的服務時間', who: '陳老闆（店家管理者）', query: SETUP,
        scene: '你是毛孩日和的陳老闆，正在做開店設定，已經完成 10 / 13 項。「價格」這一項卡住了：洗澡＋剪毛（小型犬）有價格，但還沒填服務時間。你要把它補上。',
        outro: '洗澡＋剪毛（小型犬）的服務時間設成 2 小時，飼主在店家頁會看到「約 2 小時・NT$1,200」，也排得出時段了。「價格」完成，開店設定走到 11 / 13，下一項是取消政策。',
        steps: [{sel: '.dcard', info: true, t: '右邊是完成度：10 / 13', d: '13 項設定都完成才能正式開放預約。下面寫著還差哪幾項：價格、取消政策、試約。'}].concat(price)},
      {id: 'policy', title: '設定取消與改期政策', who: '陳老闆（店家管理者）', query: SETUP,
        scene: '開店前要先定好規則：飼主多久以前取消不用錢、之後取消收多少、沒來又沒說收多少。你要設定「24 小時前免費、之後 20%、沒來 30%」。',
        outro: '取消政策設定好了：24 小時前取消或改期免費，之後收 20%，沒來也沒取消收 30%。系統會照這份政策算錢，飼主在預約確認訊息就會看到這段規則。',
        steps: policy},
      {id: 'trial', title: '用自己的 LINE 試約一次', who: '陳老闆（店家管理者）', query: SETUP,
        scene: '開放給飼主之前，先用你自己的 LINE 當一次飼主：預約、收到通知、讀契約、到店在平板簽名。這四段都通過，才算準備好。',
        outro: '試約四段都通過了：預約、通知、閱讀、簽名。第一次「閱讀」沒過，是因為你還沒打開契約；讀完再按「重試」就過了。這筆試約已作廢，不計用量。',
        steps: trial},
      {id: 'golive', title: '完成開店設定並正式啟用', who: '陳老闆（店家管理者）', query: SETUP,
        scene: '把剩下的三項一次做完：補上服務時間、設定取消政策、試約。13 項都完成後，按「正式啟用」，飼主就能用 LINE 和店家頁預約兩家分店。',
        outro: '13 項都完成，毛孩日和正式開放預約了。試約的紀錄作廢、不計用量；今天還沒有預約，儀表板先列出開張第一天要做的三件事，有預約之後才換成每天的營運。設定之後都還能改。',
        steps: price.concat(policy.slice(0, 1), [policy[2], policy[4], policy[5], policy[6], policy[8], policy[9]], trial.slice(1), [
          {sel: '.dcard', info: true, t: '13 項都完成了', d: '完成度的圓圈合起來，寫著「全部完成」。正式啟用的按鈕亮了。'},
          {sel: '[data-key="golive"]', t: '按「正式啟用」', d: '按了還會再確認一次。'},
          {sel: '.dialog .cdl', info: true, t: '確認視窗：啟用後會改變什麼', d: '預約入口開始接受預約、試約 #1 作廢不計用量、儀表板先列出開張第一天要做的三件事、設定之後仍可修改。'},
          {sel: '[data-key="dg-ok"]', t: '按「正式啟用」', d: '飼主從這一刻起就能預約。'},
          {sel: '.fday .fsteps', info: true, t: '開張第一天：先讓飼主知道去哪裡約', d: '今天還沒有預約，所以儀表板先列三件事：貼出預約入口 QR、複製店家頁連結、分享給老客人。合起來的開店環縮小留在左邊。'}
        ])},
      {id: 'dash', title: '看懂每天的儀表板', who: '陳老闆（店家管理者）', query: {role: 'admin', live: '1', view: 'dash', boarding: null},
        scene: '毛孩日和已經開店了。今天是 10/9（五）11:20，你想在開店時段看一眼兩家分店的狀況：有沒有要處理的事、今天的數字、誰還沒簽約、誰還沒付錢。',
        outro: '儀表板從上到下：先處理例外（提醒失敗、逾時未到），再看待審申請，然後是今天的五個數字、待簽署、待收款和本月用量。切到「信義店」就只看那家店，例如待收只剩信義店的帳。',
        steps: [
          {sel: '.xbar', info: true, t: '最上面：2 筆需要處理', d: '豆豆今天 18:00 退房，提醒簡訊發送失敗；湯圓 10:30 的預約逾時 50 分還沒到。按「到今日看板」去處理。'},
          {sel: '.rbar', info: true, t: '待審：取消 1、改期 3、合併 2、刪除 3', d: '飼主或櫃台送來、要你決定的申請。按「到待處理審核」會打開審核台。'},
          {sel: '.kpis', info: true, t: '今天的五個數字', d: '今日預約 15 筆、待報到 10 位、服務中 2 位、住宿中 3/7 間、今日已收 NT$3,800。'},
          {sel: '.panel:has([data-key="s-all"])', info: true, t: '待簽署：4 位飼主還沒簽約', d: '麻糬的飼主選擇到店再簽；花生、歐告的契約傳了還沒打開；可樂已經讀完，等到店簽名。'},
          {sel: '[data-key="rs-huasheng"]', t: '按花生的「補發契約連結」', d: '何先生 10:40 收到契約，還沒打開。再傳一次到他的 LINE。'},
          {sel: '.panel:has([data-key="o-all"])', info: true, t: '待收款：5 筆，合計 NT$8,500', d: '豆豆住宿 3 晚今天退房、阿福和嘟嘟服務中接回時收、小黑已收 NT$600 部分收款、妞妞 15:00 來接。'},
          {sel: '.panel.usage', info: true, t: '本月用量：簡訊快用完了', d: '簡訊 186 / 500 則，剩 314 則，預估 10/23 用完。簽署驗證碼也算在額度裡。'},
          {sel: '#scope', t: '分店範圍選「信義店」', d: '店家管理者可以看全部分店，也可以只看一家。', fill: {value: 'xy', label: '信義店'}, until: {value: ['#scope', '^xy$']}},
          {sel: '.panel:has([data-key="o-all"])', info: true, t: '只剩信義店的帳', d: '待收只剩嘟嘟和妞妞，合計 NT$1,800。信義店沒有住宿，所以「住宿中」也不見了。'}
        ]},
      /* 毛孩日和開張 (prototypes/open-day): acts 3, 4 and 6, played inside that page with ?life=<act>; not listed on this page */
      {id: 'qr', title: '下載預約入口 QR，貼在櫃台', who: '陳老闆（店家管理者）', query: SETUP,
        scene: '開店設定快做完了。你想把預約入口的 QR 印出來貼在櫃台，客人掃了就能在 LINE 預約；預約連結也要貼到店家的粉絲專頁。',
        outro: '預約入口 QR 下載成 PNG 了，用手機掃會打開毛孩日和的 LINE 預約；預約連結也複製好了，可以貼到粉絲專頁。正式啟用前，掃 QR 只能試約。',
        steps: [
          {sel: '[data-key="it-qr"]', t: '按「預約入口 QR」', d: '開店設定清單的最後幾項。'},
          {sel: '.fsec.qr svg', info: true, t: '這就是預約入口 QR', d: '手機掃了會打開 liff.line.me/demo-maohairihe。正式啟用前只能試約。'},
          {sel: '[data-key="qr-dl"]', t: '按「下載 QR」', d: '會下載一張 PNG，可以直接印。'},
          {sel: '[data-key="qr-copy"]', t: '按「複製連結」', d: '貼到粉絲專頁或 Google 商家。'}
        ]},
      {id: 'life-open-price', life: true, seed: {life: 'open-price'}, title: '第 3 幕：補上缺的服務時間', who: '陳老闆（店家管理者）', query: SETUP,
        scene: '10/13（二）晚上 8 點半，店打烊了。這幾天你自己做完了開店設定的 10 項（分店、營業時間、服務、資源、契約模板、邀請員工……），還差三項：價格、取消政策、試約。先處理「價格」：洗澡＋剪毛（小型犬）還沒填服務時間。',
        outro: '洗澡＋剪毛（小型犬）的服務時間設成 2 小時，飼主在店家頁會看到「約 2 小時・NT$1,200」，也排得出時段了。開店設定走到 11 / 13，下一幕接著定取消政策。',
        steps: [{sel: '.dcard', info: true, t: '右邊是完成度：10 / 13', d: '13 項都完成才能正式開放預約。下面寫著還差哪幾項：價格、取消政策、試約。'}].concat(price)},
      {id: 'life-open-policy', life: true, seed: {life: 'open-policy'}, title: '第 4 幕：定好取消與改期政策', who: '陳老闆（店家管理者）', query: SETUP,
        scene: '10/13（二）晚上 8 點 40 分，價格剛補好。開店前要先定好規則：飼主多久以前取消不用錢、之後取消收多少、沒來又沒說收多少。你要設定「24 小時前免費、之後 20%、沒來 30%」。',
        outro: '取消政策定好了：24 小時前取消或改期免費，之後收 20%，沒來也沒取消收 30%。系統照這份政策算錢，飼主在預約確認訊息就會看到。開店設定 12 / 13，只剩試約；試約要用店裡的平板簽名，明天阿凱先把新平板登入好。',
        steps: policyOf('10/17（六）14:00', '10/16（五）14:00')},
      {id: 'life-open-golive', life: true, seed: {life: 'open-golive'}, title: '第 6 幕：試約，然後正式啟用', who: '陳老闆（店家管理者）', query: SETUP,
        scene: '10/14（三）公休日早上 10 點。櫃台的新平板阿凱剛登入好。開店設定只剩最後一項「試約」：用你自己的 LINE 當一次飼主，預約、收到通知、讀契約、在平板簽名。昨晚已經預約、也收到通知了。四段都通過後，按「正式啟用」，飼主就能預約。',
        outro: '試約四段都通過，13 項都完成，毛孩日和 10/14 10:05 正式開放預約。試約作廢、不計用量；今天公休、還沒有人預約，儀表板先列出貼 QR、複製店家頁連結、分享給老客人這三件事。試用 14 天從今天算到 10/28。下一幕是第一位飼主。',
        steps: trial.concat([
          {sel: '.dcard', info: true, t: '13 項都完成了', d: '完成度的圓圈合起來，寫著「全部完成」。正式啟用的按鈕亮了。'},
          {sel: '[data-key="golive"]', t: '按「正式啟用」', d: '按了還會再確認一次。'},
          {sel: '.dialog .cdl', info: true, t: '確認視窗：啟用後會改變什麼', d: '預約入口開始接受預約、試約 #1 作廢不計用量、儀表板先列出開張第一天要做的三件事、設定之後仍可修改。'},
          {sel: '[data-key="dg-ok"]', t: '按「正式啟用」', d: '飼主從這一刻起就能預約。'},
          {sel: '.fday .fsteps', info: true, t: '開張第一天：先讓飼主知道去哪裡約', d: '今天 10/14（三）公休，還沒有人預約，所以儀表板先列三件事：貼出預約入口 QR、複製店家頁連結、分享給老客人。明天 08:30 開張，第一筆預約進來就會出現在下面。'}
        ])},
      /* LINE 當機的那一小時 (prototypes/line-down): act 3, the usual live dashboard at 11:04 with 寵派's 11:01 notice on top */
      {id: 'life-down-shop', life: true, seed: {life: 'down-shop'}, title: '第 3 幕：看寵派的公告', who: '陳老闆（店家管理者）', query: {role: 'admin', live: '1', view: 'dash', boarding: null},
        scene: '10/9（五）11:04。櫃台阿凱說剛剛有客人打來，問怎麼沒收到 LINE 的預約確認。你打開商家中心的儀表板，看看寵派有沒有說什麼。',
        outro: '寵派 11:01 發了公告：LINE 從 10:58 暫時傳不出去，必要通知已自動改傳簡訊，只送 LINE 的提醒恢復後由寵派重送，時段快到或已開始的請直接打電話確認。毛孩日和到目前 6 則改傳簡訊、3 則先停著，其中 11:00 那筆已開始，要打給飼主；還有 1 則 LINE 和簡訊都送不到，恢復後櫃台在「通知補發」改用 Email。',
        steps: [
          {sel: '[data-key="pbar"]', info: true, t: '最上面：寵派公告・11:01', d: 'LINE 暫時傳不出去，必要通知已自動改傳簡訊。飼主看不到這則公告。'},
          {sel: '[data-key="pb-more"]', t: '按「看詳情」', d: '看毛孩日和自己的通知怎麼了。'},
          {sel: '.pbar .pd ul', info: true, t: '毛孩日和到目前（11:04）', d: '改傳簡訊 6 則、先停著 3 則（11:00 那筆時段已開始，請直接打電話）；還要處理 3 則：2 則契約連結寵派客服會開案，1 則送不到，LINE 恢復後在「通知補發」改用 Email。'},
          {sel: '.pbar .pd > p', info: true, t: '有飼主問起', d: '可以請他看簡訊，或打開 LINE 的「我的預約」。下一幕回到寵派，LINE 恢復了。'}
        ]}
    ]
  });
})();
