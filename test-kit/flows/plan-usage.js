/* 方案與用量（管理 Web）: hints and guided tours for test mode. Format: test-kit/flows/README.md
   This is the shop's own page: 陳老闆 (店家管理者) reads this period's usage and next charge, upgrades to 專業方案, asks to
   step back down, and edits the invoice details; 林店長 sees usage only, without prices. One action or one explanation per
   step. The prototype rewrites ?s= away once it has read it, so the downgrade tour starts from `seed: {s: 'big'}` (毛孩日和
   already on 專業方案, 12 seats). On a phone (under 720 px) the page is read-only, so only the reading tours work there. */
(function () {
  var A = {role: 'admin', s: null, up: null, off: null, fail: null};

  PP.register('plan-usage', {
    name: '方案與用量',
    minWidth: 720,   /* 手機只能看；升級、降級、改發票請用電腦 */
    hints: [
      {sel: '[data-key="bill"]', t: '下次扣款', d: '11/1 會刷多少（含稅）：下個月月費加這個月的超量，再加營業稅', tour: 'read'},
      {sel: '[data-key="up"]', t: '升級方案', d: '付款成功立刻生效，本期用量改用新方案的上限', tour: 'upgrade'},
      {sel: '[data-key="t-down"]', t: '申請降回基本方案', d: '寵派確認後下一期生效；超出的席次有 30 天寬限', tour: 'down'},
      {sel: '[data-key="e-inv"]', t: '發票資訊', d: '統一編號、抬頭、寄送信箱；從下一張發票開始用', tour: 'invoice'},
      {sel: '[data-key="m-sms"]', t: '簡訊用在哪裡', d: '點一下看本期簡訊的用途與各分店', quiet: true},
      {sel: '[data-key="e-card"]', t: '更換付款方式', d: '卡號在金流服務商的頁面輸入，寵派不保存卡號', quiet: true},
      {sel: '[data-key="t-hq"]', t: '品牌總部方案', d: '分店多的連鎖品牌：請寵派聯絡你', quiet: true}
    ],
    tours: [
      {id: 'read', title: '看懂本期用量與下次扣款', who: '陳老闆（毛孩日和店家管理者）', query: A, minWidth: 0,
        scene: '你是毛孩日和的陳老闆，用寵派的基本方案。今天 10/9，你想知道這個月 LINE、簡訊、契約用了多少，11/1 會扣多少錢，還有員工和分店是不是滿了。這個引導只看不改。',
        outro: '11/1 預估刷卡 NT$2,269（含稅）：11 月月費 NT$1,980，加 10 月簡訊預估超量約 181 則 NT$181，再加營業稅 NT$108。簡訊預估 10/23 用完，之後照常發送、月底加收；通知與契約是交易的一部分，用完也不會停。員工席次 9/10、分店 2/2 是硬上限，滿了就不能新增。10/1 扣的 NT$2,127 是 10 月月費加 9 月簡訊超量 46 則。',
        steps: [
          {sel: '[data-key="bill"]', info: true, t: '11/1 預估刷卡 NT$2,269（含稅）', d: '11 月月費 NT$1,980 ＋ 10 月簡訊超量約 181 則 NT$181，未稅小計 NT$2,161，再加 5% 營業稅 NT$108；從 VISA •••• 4242 自動扣款。'},
          {sel: '[data-key="m-line"]', info: true, t: 'LINE 通知 1,180 / 5,000 則', d: '照目前速度，月底約 4,320 則，上限的 86%。'},
          {sel: '[data-key="m-sms"]', info: true, t: '簡訊 186 / 500 則：預估 10/23 用完', d: '之後照常發送，月底約超 181 則，每則加收 NT$1。'},
          {sel: '[data-key="m-sms"]', t: '點「簡訊」那一列', d: '看看簡訊都用在哪裡。'},
          {sel: '.dp', info: true, t: '簡訊用在哪裡', d: '簽署驗證碼 98 則、LINE 沒送達改傳 61 則、飼主沒綁 LINE 27 則；中山店 118、信義店 68。驗證碼一定用簡訊、永遠不會因為額度被擋，也會計入用量；其中 88 則是 LINE 沒送達或飼主沒綁 LINE 才改傳的，請飼主綁定 LINE 可以省下。'},
          {sel: '[data-key="dp-x"]', t: '按 ✕ 關閉', d: '回到本期用量。'},
          {sel: '[data-key="m-ctr"]', info: true, t: '契約簽署 74 / 300 份', d: '照目前速度月底約 270 份，上限的 90%。超過也照常簽，月底每份加收 NT$2。'},
          {sel: '[data-key="m-seat"]', info: true, t: '員工席次 9 / 10：擋新增', d: '待接受的邀請也占席。滿了就不能再邀請員工；已經在用的人不受影響。'},
          {sel: '[data-key="m-br"]', info: true, t: '分店 2 / 2：已滿', d: '要開第 3 家分店，得升級到專業方案（3 家）。已有的分店照常營業。'},
          {sel: '[data-key="b-b2610"]', t: '點帳單紀錄的「10/1」', d: '上一次扣款的明細。'},
          {sel: '.dp', info: true, t: '10/1 帳單 NT$2,127', d: '10 月月費 NT$1,980、9 月簡訊超量 46 則 NT$46、營業稅 NT$101。發票 YQ-48213075 可以下載。'},
          {sel: '[data-key="dp-x"]', t: '按 ✕ 關閉', d: '回到方案與用量。'}
        ]},
      {id: 'upgrade', title: '要開第 3 家店：升級到專業方案', who: '陳老闆（毛孩日和店家管理者）', query: A,
        scene: '毛孩日和本週要開第 3 家分店，但基本方案最多 2 家。你決定今天就升級到專業方案。付款成功就立刻生效，這個月剩下的天數按日補差額。',
        outro: '你付了 NT$1,558（每月差額 NT$2,000 × 本期剩 23 天＝1,484，加營業稅 74），立刻升級到專業方案：分店 2 → 3、員工 10 → 20 席、簡訊 500 → 1,500 則，本期簡訊不再超量。11/1 起每月 NT$3,980（未稅，含稅刷 NT$4,179）；用不到的話可以申請降回基本方案，寵派確認後 11/1 起就降回。帳單紀錄多了一筆「升級補差額」，發票寄到 billing@maohai-demo.example。',
        steps: [
          {sel: '[data-key="m-br"]', info: true, t: '分店 2 / 2 已滿', d: '基本方案最多 2 家分店，第 3 家開不了。'},
          {sel: '[data-key="up"]', t: '按「升級方案」', d: '看看升級後的上限與今天要付多少。'},
          {sel: '.dp .lede', info: true, t: '付款成功就立刻生效', d: '本期用量改用專業方案的上限計算；11/1 起每月 NT$3,980（未稅）。'},
          {sel: '.dp .cmp', info: true, t: '上限變化', d: '分店 2 → 3（升級後可以新增 1 家）、員工 10 → 20 席、簡訊 500 → 1,500 則（不升級本期約超 181 則）。'},
          {sel: '[data-key="u-paths"]', info: true, t: '升級，還是付超量', d: '不升級：月底約加收 NT$190（含稅）；升級：今天付 NT$1,558，11/1 起每月多 NT$2,000。只超這個月的話，付超量比較省；但要開第 3 家分店，就只能升級。'},
          {sel: '.dp .sum', info: true, t: '今天付 NT$1,558', d: '每月差額 NT$2,000，本期剩 23 天按日計 NT$1,484，加營業稅 NT$74。'},
          {sel: '.dp .paywith', info: true, t: '從 VISA •••• 4242 扣款', d: '要換卡可以按「更換」；卡號在金流服務商的頁面輸入，寵派不保存卡號。'},
          {sel: '[data-key="u-pay"]', t: '按「付款 NT$1,558 並升級」', d: '扣款成功就生效。'},
          {settle: 1500, timeout: 9000, sel: '[data-key="bill"]', info: true, t: '11/1 預估刷卡 NT$4,179（含稅）', d: '專業方案月費 NT$3,980 加營業稅 NT$199；這個月簡訊不會超量了，所以 11/1 只扣月費。'},
          {sel: '[data-key="m-sms"]', info: true, t: '簡訊上限變成 1,500 則', d: '186 / 1,500，月底約 680 則，上限的 45%。'},
          {sel: '[data-key="m-br"]', info: true, t: '分店 2 / 3：還能新增 1 家', d: '可以到分店設定開第 3 家了。'},
          {sel: '[data-key="b-bu1"]', info: true, t: '帳單紀錄：10/9 升級補差額 NT$1,558', d: '基本 → 專業，已扣款，發票 YQ-57700131。'}
        ]},
      {id: 'down', title: '淡季想省月費：申請降回基本方案', who: '陳老闆（毛孩日和店家管理者）', query: {role: 'admin', up: null, off: null, fail: null}, seed: {s: 'big'},
        scene: '這個情境裡，毛孩日和 9/15 已經升級到專業方案，現在有 12 個員工席次（11 位在用、1 位待接受）。淡季到了，你想降回基本方案省月費。降級要寵派確認，下一期才生效。',
        outro: '你申請 11/1 起降回基本方案，等寵派確認；這個月照專業方案用，不退差額。在寵派確認前，11/1 的金額分兩種：確認了刷 NT$2,079、沒確認刷 NT$4,179（含稅）。席次 12 超過基本方案的 10 席：11/1–11/30 寬限期間照常使用、但不能邀請新員工，請在 11/30 前到員工與權限撤回邀請或停用 2 位；之後仍超過，新邀請照樣被擋，12 月起每超 1 席每月加收 NT$315（含稅・未稅 300，示範價），寵派不會自動停用任何員工。11/1 以前都可以撤回申請。',
        steps: [
          {sel: '[data-key="m-seat"]', info: true, t: '員工席次 12 / 20', d: '11 位在用、1 位待接受。基本方案只有 10 席。'},
          {sel: '[data-key="t-down"]', t: '按「申請降回基本方案」', d: '在方案比較的基本方案底下。'},
          {sel: '.dp .lede', info: true, t: '寵派確認後 11/1 起生效', d: '這個月照專業方案使用，不退差額。11/1 起每月 NT$1,980（未稅）。'},
          {sel: '.dp .cmp', info: true, t: '上限變化', d: '分店 3 → 2（現在 2，夠用）；員工 20 → 10 席（現在 12，超出 2）；簡訊 1,500 → 500（照這個月約超 181 則，照常發送、月底加收）。'},
          {sel: '.dp .notice', info: true, t: '超出 2 席：30 天寬限', d: '11/1–11/30 照常使用，但不能邀請新員工；請在 11/30 前撤回那 1 筆邀請或停用 2 位。之後仍超過，新邀請照樣被擋，12 月起每超 1 席每月加收 NT$315（含稅・未稅 300，示範價）；員工不會被自動停用。'},
          {sel: '[data-key="d-ok"]', t: '按「送出降級申請」', d: '送給寵派確認。'},
          {settle: 900, sel: '[data-key="req"]', info: true, t: '已申請 11/1 起改為基本方案', d: '等寵派確認。寬限的提醒會一直掛在這裡。'},
          {sel: '[data-key="bill"]', info: true, t: '11/1 的金額：若寵派確認', d: '若寵派確認：基本方案 NT$1,980 加營業稅，刷卡 NT$2,079（含稅）。沒確認就照專業方案，刷 NT$4,179。'},
          {sel: '[data-key="req-staff"]', info: true, t: '到員工與權限撤回邀請或停用 2 位', d: '可以現在先處理，也可以 11/30 前再做。'},
          {sel: '[data-key="req-x"]', info: true, t: '11/1 以前都可以撤回', d: '改變主意就按「撤回申請」。'}
        ]},
      {id: 'invoice', title: '換了統一編號：修改發票資訊', who: '陳老闆（毛孩日和店家管理者）', query: A,
        scene: '毛孩日和改組成新公司，統一編號換了，帳務也改由你自己的信箱收。你要修改寵派開給你的電子發票資訊。小心：已經開立的發票不會變更。',
        outro: '發票資訊改成統一編號 42681334、寄送信箱 chen@maohai-demo.example，從下一張（11/1）開始使用；已開立的發票不會變更。統一編號一定要 8 位數字，打錯會被擋下。',
        steps: [
          {sel: '[data-key="e-inv"]', t: '在「發票資訊」按「修改」', d: '打開發票資訊。'},
          {sel: '.dp .lede', info: true, t: '從下一張（11/1）開始使用', d: '寵派開給毛孩日和的電子發票；已開立的不會變更。'},
          {sel: '#i-tax', t: '先打錯：只打 7 位數', d: '看看系統怎麼說。', fill: {value: '2453680', label: '2453680（少一位）'}, until: {value: ['#i-tax', '^2453680$']}},
          {sel: '[data-key="i-save"]', t: '按「儲存發票資訊」', d: '系統會先檢查。'},
          {sel: '.dp .field:has(#i-tax)', info: true, t: '統一編號是 8 位數字', d: '少一位就存不了，免得發票開錯抬頭。'},
          {sel: '#i-tax', t: '輸入新的統一編號', d: '8 位數字。', fill: {value: '42681334', label: '42681334'}, until: {value: ['#i-tax', '^\\d{8}$']}},
          {sel: '#i-mail', t: '寄送信箱改成你的信箱', d: '電子發票與扣款通知都寄到這裡。', fill: {value: 'chen@maohai-demo.example', label: 'chen@maohai-demo.example'}, until: {value: ['#i-mail', '^chen@']}},
          {sel: '[data-key="i-save"]', t: '按「儲存發票資訊」', d: '下一張發票開始用。'},
          {settle: 900, sel: '[data-key="e-inv"]', info: true, t: '發票資訊更新了', d: '統一編號 42681334、寄送信箱 chen@maohai-demo.example。11/1 的發票就會用新的。'}
        ]},
      {id: 'mgr', title: '店長看得到什麼：只看用量', who: '林店長（中山店店長）', query: {role: 'mgr', s: null, up: null, off: null, fail: null}, minWidth: 0,
        scene: '你是毛孩日和中山店的林店長。陳老闆說簡訊快用完了，你想看看這個月的用量。方案、付款與發票由陳老闆管理，你看得到用量、看不到價錢。這個引導只看不改。',
        outro: '店長看得到本期用量：簡訊預估 10/23 用完，之後照常發送；員工席次 9/10、分店 2/2。方案、付款、發票與帳單只有店家管理者陳老闆能看能改，所以這裡沒有價錢。櫃台則完全看不到這一頁。',
        steps: [
          {sel: 'main .banner', info: true, t: '方案、付款與發票由陳老闆管理', d: '你可以查看本期用量，但看不到價錢、帳單和發票。'},
          {sel: '[data-key="m-sms"]', info: true, t: '簡訊 186 / 500：預估 10/23 用完', d: '超過照常運作，飼主照樣收得到；加收多少只有陳老闆看得到。'},
          {sel: '[data-key="m-sms"]', t: '點「簡訊」那一列', d: '看看簡訊都用在哪裡。'},
          {sel: '.dp', info: true, t: '中山店用了 118 則', d: '簽署驗證碼最多。飼主綁定 LINE 以後，通知改走 LINE，可以省簡訊。'},
          {sel: '[data-key="dp-x"]', t: '按 ✕ 關閉', d: '回到本期用量。'},
          {sel: '[data-key="m-seat"]', info: true, t: '員工席次 9 / 10', d: '只能再邀請 1 位。滿了要請陳老闆升級方案。'}
        ]},
      /* 毛孩日和的月費 (prototypes/monthly-fee): acts 1 and 4, played inside that page with ?life=fee-try (10/9 10:40, the card on file
         declines) and ?life=fee-plan (17:00, after the 補差額 link was paid at 16:45); not listed on this page */
      {id: 'life-fee-try', life: true, seed: {life: 'fee-try'}, title: '第 1 幕：自己升級，刷卡沒過', who: '陳老闆（毛孩日和店家管理者）', query: A,
        scene: '10/9（五）早上 10:40。毛孩日和這週要開第 3 家分店，但基本方案最多 2 家。你打開方案與用量，要今天就升級到專業方案：付款成功立刻生效，這個月剩下的天數按日補差額。',
        outro: '刷卡沒過：VISA •••• 4242 卡片額度不足。方案維持基本方案，這次沒有扣到錢，帳單紀錄多了一筆「付款失敗・沒有扣款」。公司的另一張卡在會計那裡，你打電話給寵派：請他們立即幫你升級，把補差額付款連結寄到帳務信箱，讓會計付。下一幕換你當寵派的財務美玲。',
        steps: [
          {sel: '[data-key="m-br"]', info: true, t: '分店 2 / 2 已滿', d: '基本方案最多 2 家分店，第 3 家開不了。'},
          {sel: '[data-key="up"]', t: '按「升級方案」', d: '看看升級後的上限與今天要付多少。'},
          {sel: '.dp .cmp', info: true, t: '上限變化', d: '分店 2 → 3、員工 10 → 20 席、簡訊 500 → 1,500 則。'},
          {sel: '.dp .sum', info: true, t: '今天付 NT$1,558', d: '每月差額 NT$2,000，本期剩 23 天按日計 NT$1,484，加營業稅 NT$74。'},
          {sel: '.dp .paywith', info: true, t: '從 VISA •••• 4242 扣款', d: '每月 1 日扣月費的就是這張卡。'},
          {sel: '[data-key="u-pay"]', t: '按「付款 NT$1,558 並升級」', d: '扣款成功就生效。'},
          {settle: 1500, timeout: 9000, sel: '#u-fail', info: true, t: '銀行沒有核准：卡片額度不足', d: '方案沒有變更，仍是基本方案；這次沒有扣到錢。'},
          {sel: '[data-key="u-card2"]', info: true, t: '可以換一張卡，或聯絡寵派', d: '公司的另一張卡在會計那裡。你決定打給寵派，請他們寄補差額付款連結到帳務信箱 billing@maohai-demo.example。'}
        ]},
      {id: 'life-fee-plan', life: true, seed: {life: 'fee-plan'}, title: '第 4 幕：升級好了，看帳單', who: '陳老闆（毛孩日和店家管理者）', query: A, minWidth: 0,
        scene: '10/9（五）傍晚 5:00。會計 4:45 用公司的 Mastercard 付了寵派寄來的補差額連結。你收到「已升級」的通知，打開方案與用量確認：第 3 家分店可以開了嗎？早上那筆失敗的付款會不會也扣錢？',
        outro: '毛孩日和現在是專業方案：分店 2 / 3，可以開第 3 家；簡訊上限 1,500 則，這個月不會超量。11/1 起每月 NT$3,980（未稅）。帳單紀錄裡，早上 VISA 那筆是「付款失敗・沒有扣款」，真正付的是 16:45 補差額連結那筆 NT$1,558，發票 YQ-48231140。',
        steps: [
          {sel: '[data-key="bill"]', info: true, t: '11/1 預估刷卡 NT$4,179（含稅）', d: '專業方案月費 NT$3,980 加營業稅 NT$199；這個月簡訊不會超量了，所以 11/1 只扣月費。'},
          {sel: '[data-key="m-br"]', info: true, t: '分店 2 / 3：還能新增 1 家', d: '可以到分店設定開第 3 家了。'},
          {sel: '[data-key="m-sms"]', info: true, t: '簡訊上限變成 1,500 則', d: '186 / 1,500，月底約 680 則，上限的 45%。'},
          {sel: '[data-key="b-bf1"]', info: true, t: '早上那筆：付款失敗・沒有扣款', d: '10:40 VISA •••• 4242 卡片額度不足，沒有扣到錢，也沒有開發票。'},
          {sel: '[data-key="b-bl1"]', t: '點「10/9 升級補差額」那一列', d: '真正付了的那一筆。'},
          {sel: '.dp .sum', info: true, t: '明細：NT$1,484 ＋ 營業稅 74', d: '專業與基本差額，本期剩 23 天按日計。'},
          {sel: '.dp .akv', info: true, t: '16:45 用補差額付款連結付款', d: '會計用公司的 Mastercard •••• 8810 付的；發票 YQ-48231140。每月 1 日的扣款還是用 VISA •••• 4242。'},
          {sel: '[data-key="dp-x"]', t: '按 ✕ 關閉', d: '回到方案與用量。'},
          {sel: '.ablk:has(.hist2)', info: true, t: '方案異動多了兩行', d: '10/9 你升級付款失敗、維持基本方案；同一天補差額連結付款成功，立即改為專業方案。'}
        ]},
      /* 毛孩日和被停權到恢復 (prototypes/suspend): act 5, 11/17（二）12:10 with ?life=sus-pay */
      {id: 'life-sus-pay', life: true, seed: {life: 'sus-pay'}, title: '第 5 幕：換一張卡，補繳 11 月月費', who: '陳老闆（毛孩日和店家管理者）', query: A,
        scene: '11/17（二）中午 12:10。早上阿凱打電話說現場預約按不下去，飼主也在 LINE 問怎麼約不了。你打開方案與用量看看怎麼回事。公司的 Mastercard 在你身上。',
        outro: '你用公司的 MASTERCARD •••• 8810 補繳了 11 月月費 NT$4,179，發票 YQ-58361027 寄到帳務信箱；之後每月 1 日也用這張卡扣款。補繳不會自動恢復營業：寵派確認入帳後，由冠宇恢復。下一幕換你當冠宇。',
        steps: [
          {sel: '[data-key="sus-ban"]', info: true, t: '寵派在 11/16 暫停了新增服務', d: '11 月月費 NT$4,179 在 11/1 扣款沒成功：VISA •••• 4242 卡片額度不足。新預約、改期和新增收費功能暫停；在店的寵物和收款照常。'},
          {sel: '[data-key="sus-pay"]', t: '按「補繳 11 月月費 NT$4,179」', d: '打開補繳。'},
          {sel: '[data-key="d-sum"]', info: true, t: '明細', d: '11 月月費・專業方案 NT$3,980，加營業稅 NT$199。'},
          {sel: '[data-key="d-why"]', info: true, t: '原本那張卡扣不過', d: 'VISA •••• 4242 在 11/1 扣款沒過，之後 3 次重試也沒過。'},
          {sel: '[data-key="d-card2"]', t: '按「換一張卡」', d: '卡號在金流服務商的頁面輸入，寵派不保存卡號。'},
          {sel: '[data-key="c-go"]', t: '按「前往更換」', d: '原型會模擬換成公司的 MASTERCARD •••• 8810。'},
          {settle: 1500, timeout: 9000, sel: '[data-key="d-card"]', info: true, t: '從 MASTERCARD •••• 8810 扣款', d: '換好了，回到補繳。之後每月 1 日也用這張卡。'},
          {sel: '[data-key="d-pay"]', t: '按「付款 NT$4,179」', d: '付款成功就入帳、開發票。'},
          {settle: 1500, timeout: 9000, sel: '[data-key="sus-paid"]', info: true, t: '已補繳，等寵派恢復營業', d: '12:14 付款成功，發票 YQ-58361027。寵派恢復營業之前，新增服務仍暫停。'}
        ]},
      {id: 'life-sms-read', life: true, seed: {life: 'sms-read'}, title: '第 2 幕：簡訊都用到哪裡去了', who: '陳老闆（毛孩日和店家管理者）', query: A, minWidth: 0,
        scene: '10/5（一）上午 10:50。你剛收到寵派的提醒：照這個速度，簡訊月底會超過基本方案的 500 則。打開方案與用量，看月底要多付多少，再點開簡訊，看是哪幾種在用。',
        outro: '簡訊到今天 110 / 500 則，照這個速度 10/21 用完、月底約超 267 則，11/1 跟月費一起多扣約 NT$267（未稅）。其中簽署驗證碼一定用簡訊、永遠不會被擋；能省的是「LINE 沒送達，改傳簡訊」和「飼主沒綁 LINE」那兩塊，要到通知設定把一些通知改成只送 LINE。',
        steps: [
          {sel: '[data-key="rem-note"]', info: true, t: '寵派 10:30 的提醒', d: '照目前速度，簡訊月底約 770 則，超過方案的 500 則。通知照常送出，不會被擋。'},
          {sel: '[data-key="bill"]', info: true, t: '11/1 預估刷卡 NT$2,370（含稅）', d: '11 月月費 NT$1,980，加 10 月預估超量：簡訊約 267 則、契約約 5 份，共 NT$277；未稅小計 NT$2,257，再加營業稅 NT$113。'},
          {sel: '[data-key="m-sms"]', info: true, t: '簡訊 110 / 500 則：預估 10/21 用完', d: '之後照常發送，月底約超 267 則，每則加收 NT$1。'},
          {sel: '[data-key="m-sms"]', t: '點「簡訊」那一列', d: '看看簡訊都用在哪裡。'},
          {sel: '.dp .dsec:has(.bars)', info: true, t: '簡訊用在哪裡', d: '簽署驗證碼 58 則、LINE 沒送達改傳 36 則、飼主沒綁 LINE 16 則。'},
          {sel: '[data-key="dp-save"]', info: true, t: '能省的是哪一塊', d: '驗證碼一定用簡訊。另外兩塊可以在通知設定把預約提醒、付款提醒改成只送 LINE，代價是那些飼主收不到；可接回跟費用有關，沒綁 LINE 的飼主仍收到簡訊。'}
        ]}
    ]
  });
})();
