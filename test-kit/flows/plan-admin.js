/* 方案管理（寵派後台）: hints and guided tours for test mode. Format: test-kit/flows/README.md
   美玲・財務 works the 待寵派處理 queue (a downgrade request, a trial running out, an immediate upgrade with a top-up link) and drafts
   a new version of 基本方案 and sends it for review; 冠宇・最高管理者 approves 美玲's draft (only 最高管理者 publishes, never their own draft). One action or one explanation per step. The prototype
   rewrites ?go= away, so tours ask for it to be absent. On a phone (under 720 px) every action says "請用電腦", so only
   the reading tour works there. The side panel is `.dp` on every width. */
(function () {
  var F = {role: 'finance', go: null};

  PP.register('plan-admin', {
    name: '方案管理',
    minWidth: 720,   /* 手機只能看；指派、升降級、延長試用與改版請用電腦 */
    hints: [
      {sel: '[data-key="dist"]', t: '在用店分布', d: '這一版的每家店本月用到哪：哪一家快超過上限', tour: 'read'},
      {sel: '[data-key="q-r-ww"]', t: '降級申請', d: '店家想改小方案：先看照本月用量會怎樣，再確認或退回', tour: 'down'},
      {sel: '[data-key="q-t-af"]', t: '試用快到期', d: '延長試用：每次最多 14 天、總共 30 天', tour: 'trial'},
      {sel: '[data-key="sp-mhr"]', t: '一家店的方案', d: '看用量、改方案；立即升級要補差額', tour: 'upgrade'},
      {sel: '[data-key="draft-basic"]', t: '改版', d: '改上限、看在用的店會不會超量，再送審；最高管理者核准才發布', tour: 'draft'},
      {sel: '[data-key="q-r-mhr"]', t: '品牌總部洽詢', d: '個別合約只有最高管理者能建立', quiet: true},
      {sel: '[data-key="new"]', t: '新增方案', d: '新增一個公開方案', quiet: true},
      {sel: '[data-key="log"]', t: '方案異動紀錄', d: '誰在什麼時候改了哪家店的方案、發布了哪一版', quiet: true}
    ],
    tours: [
      {id: 'read', title: '看懂方案目錄與在用店分布', who: '美玲（寵派財務）', query: F, minWidth: 0,
        scene: '你是寵派的財務。寵派有基本、專業、品牌總部三種方案，每種方案改版後舊版的店不會自動搬家。你想看懂目錄，以及基本方案 v2 的 5 家店本月各用到哪、誰快超過上限。這個引導只看不改。',
        outro: '基本方案 v2 有 5 家店在用，v1 還有 1 家（小森，停權中）。LINE、簡訊、契約是「超過照常、超量計費」；員工席次與分店是硬上限，滿了就不能新增。毛孩日和簡訊照目前速度到月底約 681 則，會超量；分店 2/2 已滿。待寵派處理有 3 件。',
        steps: [
          {sel: '[data-key="queue"]', info: true, t: '待寵派處理 3 件', d: '汪汪俱樂部降級申請、毛孩日和品牌總部洽詢、阿福寵物美容試用快到期。'},
          {sel: '[data-key="cat"]', info: true, t: '方案目錄', d: '基本 NT$2,079、專業 NT$4,179（月費含稅；未稅 1,980、3,980）；品牌總部每家另訂。下面是每種方案的上限與超量單價（未稅）。'},
          {sel: '[data-key="vold-basic"]', info: true, t: '基本方案 v2，v1 還有 1 家在用', d: '改版只給新訂閱時，在用的店留在舊版。'},
          {sel: '[data-key="dist"]', info: true, t: '在用店分布：基本方案 v2・5 家', d: '每一顆是一家店，位置是照目前速度到月底的用量；席次、分店是現在的數。'},
          {sel: '[data-key="lab-line"]', info: true, t: '超過照常', d: 'LINE、簡訊、契約超過上限照常送，月底按超量單價計費。'},
          {sel: '[data-key="row-sms"]', info: true, t: '簡訊：毛孩日和約 681 則，會超量', d: '上限 500 則，超過的部分 1 則 NT$1（未稅）。'},
          {sel: '[data-key="lab-seat"]', info: true, t: '擋新增', d: '員工席次與分店是硬上限：滿了就不能再新增，不會多收錢。'},
          {sel: '[data-key="row-br"]', info: true, t: '分店：毛孩日和 2 / 2 已滿', d: '要開第 3 家店就得升級方案。'},
          {sel: '[data-key="dshops"]', info: true, t: '這一版的店', d: '阿福、毛孩森林還在試用；毛孩日和、悠悠、肉球付費中；另外 4 家還沒正式啟用。'},
          {sel: '[data-key="dv-1"]', t: '按「v1・1 家」', d: '看看舊版還有誰在用。', until: {checked: '[data-key="dv-1"]'}},
          {sel: '[data-key="dshops"]', info: true, t: 'v1：小森寵物美容（停權中）', d: '舊版的上限比較低（簡訊 300 則）；它停權了，用量很少。'},
          {sel: '[data-key="log"]', info: true, t: '方案異動紀錄', d: '7/1 冠宇發布基本 v2「只給新訂閱」；10/6 美玲延長毛孩森林試用；最新的是汪汪俱樂部的降級申請。'}
        ]},
      {id: 'down', title: '汪汪俱樂部想降級：看清楚影響再確認', who: '美玲（寵派財務）', query: F,
        scene: '汪汪俱樂部的張店長申請 11/1 起從專業方案降到基本方案，說「淡季想省一點月費」。降級前你要看清楚：照本月用量會不會反而多付、超出的席次和分店怎麼辦，再確認。',
        outro: '你確認了汪汪俱樂部 11/1 起改為基本方案 v2。照本月用量 11 月約省 NT$349（含稅）；但席次 14 超出 4，11/30 後還沒降，12 月起每月加收 NT$1,260（含稅），反而多付約 NT$911。11/1–11/30 寬限照常營業但不能新增；寵派不會自動停用員工，分店超出也不會關店、不加收。店家收到通知，11/1 前還能在方案與用量撤回。待寵派處理少一件。',
        steps: [
          {sel: '[data-key="q-r-ww"]', t: '按「汪汪俱樂部・降級申請」', d: '待寵派處理的第一件。'},
          {sel: '[data-key="req-note"]', info: true, t: '張店長：「淡季想省一點月費。」', d: '10/8 16:40 在方案與用量送出。專業方案 v1 → 基本方案 v2，11/1 起。'},
          {sel: '[data-key="limrows"]', info: true, t: '照本月用量，改成基本方案會怎樣', d: 'LINE、簡訊、契約都會超量，要加收超量費（簡訊約 NT$1,826，含稅）；員工席次 14 > 10、分店 3 > 2。'},
          {sel: '[data-key="net-nov"]', info: true, t: '11 月約省 NT$349（含稅）', d: '現在每月約 NT$4,955，改基本約 NT$4,606（含稅）。超量多了不少，省得沒有店家想的多。'},
          {sel: '[data-key="net-dec"]', info: true, t: '12 月起若席次沒降，反而多付約 NT$911', d: '超出的 4 席每月加收 NT$1,260（含稅・未稅 4 × 300）。11/30 前降到 10 席就不加收。'},
          {sel: '[data-key="grace"]', info: true, t: '超出的席次與分店：寬限到 11/30', d: '照常營業、不能新增。之後席次仍超出就照樣不能新增、每席每月加收；不會自動停用員工，撤回還沒接受的邀請也算。分店超出不會關店、不加收。'},
          {sel: '[data-key="d-toreject"]', info: true, t: '不合理也可以退回', d: '例如店家搞錯了，按「退回申請」並寫原因。這次張店長確定要降。'},
          {sel: '[data-key="d-ok"]', t: '按「確認降級・11/1 起」', d: '店家會收到通知。'},
          {settle: 800, sel: '[data-key="next"]', info: true, t: '11/1 起改為基本方案 v2', d: '汪汪俱樂部的方案卡寫著下期的變化。'},
          {sel: '[data-key="dp-x"]', t: '按 ✕ 關閉', d: '回到方案管理。'},
          {sel: '[data-key="queue"]', info: true, t: '待寵派處理：3 → 2 件', d: '剩毛孩日和的品牌總部洽詢、阿福的試用快到期。'},
          {sel: '[data-key="log"]', info: true, t: '方案異動紀錄最上面', d: '10/9 11:20 美玲確認汪汪俱樂部降級申請：11/1 起改為基本方案 v2・超出的分店與席次 30 天寬限。'}
        ]},
      {id: 'trial', title: '阿福的試用快到期：延長 7 天', who: '美玲（寵派財務）', query: F,
        scene: '阿福寵物美容的試用 10/11（日）就到期，只剩 2 天，周先生還沒綁定付款方式。他說這週會弄好。你決定幫他延長 7 天。每次最多延長 14 天，總共最多 30 天。',
        outro: '阿福寵物美容的試用從 10/11 延長到 10/18（日），已延長 7 / 30 天，原因「店家還在設定付款方式」。店家在商家管理與方案與用量都會看到「已延長」；待寵派處理少一件，方案異動紀錄記下來。',
        steps: [
          {sel: '[data-key="q-t-af"]', t: '按「阿福寵物美容・試用快到期」', d: '待寵派處理的第三件。'},
          {sel: '[data-key="use"]', info: true, t: '試用中的用量', d: 'LINE 234、簡訊 33、契約 29，都很少；付款方式還沒有綁定。'},
          {sel: '[data-key="go-trial"]', t: '按「延長試用」', d: '打開延長試用的表單。'},
          {sel: '.dp .lede', info: true, t: '目前到 10/11，已延長 0 / 30 天', d: '每次最多 14 天，總共最多 30 天。'},
          {sel: '[data-key="days-7"]', info: true, t: '延長：7 天（到 10/18）', d: '已經幫你選好；也可以選 3 天或 14 天。'},
          {sel: '[data-key="t-ok"]', t: '先直接按「延長 7 天到 10/18」', d: '看看漏了什麼。'},
          {sel: '[data-key="tw-err"]', info: true, t: '要選一個原因', d: '「請選一個原因」。原因會留在方案異動紀錄。'},
          {sel: '[data-key="tw-pay"]', t: '原因選「店家還在設定付款方式」', d: '周先生說這週會弄好。', until: {checked: '[data-key="tw-pay"]'}},
          {sel: '.dp .aud', info: true, t: '店家會看到「已延長」', d: '試用改到 10/18（日）；店家在商家管理與方案與用量都會看到。'},
          {sel: '[data-key="t-ok"]', t: '按「延長 7 天到 10/18」', d: '立即生效。'},
          {settle: 800, sel: '.dp', info: true, t: '試用到 10/18，剩 9 天', d: '已延長 7 / 30 天；方案紀錄多了一行：美玲延長 7 天：10/11 → 10/18・店家還在設定付款方式。'},
          {sel: '[data-key="dp-x"]', t: '按 ✕ 關閉', d: '回到方案管理。'},
          {sel: '[data-key="queue"]', info: true, t: '待寵派處理：3 → 2 件', d: '阿福的試用快到期處理好了。'}
        ]},
      {id: 'upgrade', title: '毛孩日和要立即升級：寄補差額連結', who: '美玲（寵派財務）', query: {role: 'finance'}, seed: {go: 'call'},
        scene: '10/9（五）早上 11:05，毛孩日和的陳老闆打電話來：他本週要開第 3 家店，但基本方案最多 2 家分店。他要立即升級到專業方案。寵派代改預設下期生效；要立即生效，就得寄補差額付款連結（或免收）。',
        outro: '你為毛孩日和寄出補差額付款連結 NT$1,558（月費差額 NT$2,000 × 23/31 天＝1,484，加營業稅 74），10/16 前有效。付款成功才立即改為專業方案 v1；沒付就維持基本方案。付款狀態與對帳在付款管理；寵派不經手卡號。',
        steps: [
          {sel: '[data-key="sp-mhr"]', t: '在「這一版的店」點毛孩日和', d: '打開這家店的方案。'},
          {sel: '[data-key="use"]', info: true, t: '分店 2 / 2 已滿、簡訊超量', d: '要開第 3 家店，得換到專業方案（3 家分店、20 席）。'},
          {sel: '[data-key="go-assign"]', t: '按「改方案」', d: '打開改方案的表單。'},
          {sel: '[data-key="to-pro"]', info: true, t: '改成：專業方案 v1', d: '已經幫你選好。NT$4,179／月（含稅）、3 家分店、20 席。'},
          {sel: '[data-key="limrows"]', info: true, t: '上限變化', d: '簡訊 500 → 1,500 則，改了就不再超量；分店 2 → 3 家。'},
          {sel: '[data-key="when-next"]', info: true, t: '預設：下期 11/1 起，不另外收費', d: '陳老闆等不到 11/1。'},
          {sel: '[data-key="when-now"]', t: '生效選「立即」', d: '要補差額或免收。', until: {checked: '[data-key="when-now"]'}},
          {sel: '[data-key="pay-link"]', t: '選「補差額」', d: '寄補差額付款連結給店家，付款成功才生效。', until: {checked: '[data-key="pay-link"]'}},
          {sel: '[data-key="topup"]', info: true, t: '付款連結金額 NT$1,558', d: '月費差額 NT$2,000 × 23/31 天＝1,484，營業稅 74。連結 7 天有效，由付款管理寄出與對帳。'},
          {sel: '#f-why', t: '寫下原因', d: '會留在方案異動紀錄；店家收到的通知不會顯示原因。', fill: {value: '店家要求立即升級，本週要開第 3 家店', label: '店家要求立即升級，本週要開第 3 家店'}, until: {value: ['#f-why', '.{4,}']}},
          {sel: '[data-key="f-ok"]', t: '按「寄出付款連結 NT$1,558」', d: '連結寄給陳老闆。'},
          {settle: 800, sel: '[data-key="paywait"]', info: true, t: '等店家付補差額', d: 'NT$1,558，10/16 前有效。付款成功才改為專業方案；沒付就維持原方案。'},
          {sel: '.dp', info: true, t: '方案紀錄多了一行', d: '10/9 11:05 美玲為毛孩日和寄出補差額付款連結 NT$1,558・付款成功後立即改為專業方案 v1・店家要求立即升級。付款管理的「補」帳單也是 11:05 寄出。'}
        ]},
      {id: 'draft', title: '基本方案改版：簡訊上限加到 800 則，送審', who: '美玲（寵派財務）', query: F,
        scene: '好幾家用基本方案的店簡訊常常超量。你想把基本方案的簡訊上限從 500 加到 800 則、月費不變，做成 v3，並讓在用 v2 的 5 家 11/1 起一起移過去。財務可以起草和送審；發布要由最高管理者核准。',
        outro: '基本方案 v3 草稿送審了：簡訊 500 → 800 則，月費不變，在用 v2 的 5 家 11/1 起移過去。數字先鎖住，等冠宇（最高管理者）核准才發布；要再改就先撤回送審。待寵派處理多了一件「改版待審」。',
        steps: [
          {sel: '[data-key="draft-basic"]', t: '在基本方案按「改版」', d: '開一份 v3 草稿。'},
          {sel: '[data-key="draft-pill"]', info: true, t: 'v3 草稿', d: '發布前怎麼改都不會影響任何店。'},
          {sel: '[data-key="in-sms"]', t: '簡訊上限改成 800', d: '也可以在下面的在用店分布拖動虛線。', fill: {value: '800', label: '800'}, until: {value: ['[data-key="in-sms"]', '^800$']}},
          {sel: '[data-key="row-sms"]', info: true, t: '簡訊：500 → 800 則', d: '虛線移到 800，毛孩日和約 681 則落在上限內了。'},
          {sel: '[data-key="impact"]', info: true, t: '移到新版：不會讓任何店新超量', d: '只算這次改動造成的；原本就超量的店會另外列出，不算在裡面。'},
          {sel: '[data-key="tray-chg"]', info: true, t: '改動：簡訊 500 → 800 則', d: '底下的草稿列列出這次改了什麼。'},
          {sel: '[data-key="scope-new"]', info: true, t: '預設：在用的店維持 v2，v3 只給新訂閱', d: '7/1 發布 v2 時就是這樣，所以 v1 還有 1 家。'},
          {sel: '[data-key="scope-move"]', t: '選「11/1 起移到 v3」', d: '只加量不漲價，下期生效。', until: {checked: '[data-key="scope-move"]'}},
          {sel: '[data-key="tray-flow"]', info: true, t: '送審後由最高管理者核准', d: '財務能起草、送審；只有最高管理者能發布，而且起草的人不能核准自己的草稿。'},
          {sel: '[data-key="submit"]', t: '按「送審 v3」', d: '交給冠宇核准。'},
          {settle: 800, sel: '[data-key="tray-status"]', info: true, t: '已送審，等最高管理者核准', d: '數字先鎖住；要再改就按「撤回送審」。'},
          {sel: '[data-key="queue"]', info: true, t: '待寵派處理多一件：改版待審', d: '冠宇打開方案管理就會看到。'}
        ]},
      {id: 'approve', title: '核准美玲送審的基本方案 v3', who: '冠宇（寵派最高管理者）', query: {role: 'super'}, seed: {go: 'review'},
        scene: '美玲 11:12 送審了基本方案 v3：簡訊 500 → 800 則、月費 1,980 → 2,080（未稅），在用 v2 的 5 家 12/1 起移過去。只有最高管理者能發布；你看清楚店家要多付多少、會收到什麼通知，再核准。',
        outro: '基本方案 v3 發布了。新訂閱從現在起用 v3；在用 v2 的 5 家 12/1 起移過去，月費 NT$2,184（含稅），付費中的 3 家每月各多付 NT$105，試用中的 2 家轉付費時才適用。今天寄通知（漲價提前 30 天）。紀錄寫著冠宇核准、美玲起草。',
        steps: [
          {sel: '[data-key="q-r-pub"]', t: '按「基本方案 v3・改版待審」', d: '待寵派處理的最後一件。'},
          {sel: '[data-key="rv-chg"]', info: true, t: '改了什麼', d: '月費 NT$2,079 → NT$2,184（含稅・未稅 1,980 → 2,080）；簡訊 500 → 800 則。'},
          {sel: '[data-key="rv-impact"]', info: true, t: '在用的 5 家會怎樣', d: '這次改動不會讓任何店新超量；付費中的 3 家每月各多付 NT$105（含稅），試用中的 2 家轉付費時才適用。'},
          {sel: '[data-key="rv-toreject"]', info: true, t: '不對可以退回', d: '退回要寫至少 10 個字，美玲會在草稿列看到原因。這次沒問題。'},
          {sel: '[data-key="rv-ok"]', t: '按「核准並發布 v3」', d: '還會再確認一次。'},
          {sel: '[data-key="pub-pay"]', info: true, t: '店家付多少', d: '12/1 起 NT$2,184（含稅）；付費中 3 家各多 NT$105。'},
          {sel: '[data-key="pub-note"]', info: true, t: '店家收到什麼通知', d: '今天寄給 5 家：改了哪些、新月費、12/1 起生效（提前 30 天）。'},
          {sel: '[data-key="dlg-ok"]', t: '按「確認發布 v3」', d: '發布。'},
          {settle: 900, sel: '[data-key="cat"]', info: true, t: '基本方案 v3・10/9 起', d: '舊版 2 個、6 家仍在用；12/1 起 v2 的 5 家才會移過來。'},
          {sel: '[data-key="log"]', info: true, t: '方案異動紀錄最上面', d: '冠宇核准發布基本方案 v3（美玲起草）・在用 5 家 12/1 起移過去。'}
        ]},
      /* 毛孩日和的月費 (prototypes/monthly-fee): act 2, played inside that page with ?life=fee-link (10/9 11:05, after 陳老闆's own
         upgrade was declined at 10:40); not listed on this page */
      {id: 'life-fee-link', life: true, seed: {life: 'fee-link'}, title: '第 2 幕：寄補差額付款連結', who: '美玲（寵派財務）', query: F,
        scene: '10/9（五）早上 11:05。毛孩日和的陳老闆打電話來：他 10:40 在方案與用量自己升級，刷卡沒過（卡片額度不足）。這週要開第 3 家店，他想今天就升級到專業方案，請寵派把付款連結寄到帳務信箱，讓會計用公司的另一張卡付。',
        outro: '你為毛孩日和寄出補差額付款連結 NT$1,558（月費差額 NT$2,000 × 23/31 天＝1,484，加營業稅 74），10/16 前有效。付款成功才立即改為專業方案 v1；沒付就維持基本方案。這張帳單接下來在付款管理的收款階梯上，停在「等店家付款」。',
        steps: [
          {sel: '[data-key="sp-mhr"]', t: '在「這一版的店」點毛孩日和', d: '打開這家店的方案。'},
          {sel: '[data-key="use"]', info: true, t: '分店 2 / 2 已滿、簡訊超量', d: '要開第 3 家店，得換到專業方案（3 家分店、20 席）。'},
          {sel: '[data-key="go-assign"]', t: '按「改方案」', d: '打開改方案的表單。'},
          {sel: '[data-key="to-pro"]', info: true, t: '改成：專業方案 v1', d: '已經幫你選好。NT$4,179／月（含稅）、3 家分店、20 席。'},
          {sel: '[data-key="when-next"]', info: true, t: '預設：下期 11/1 起，不另外收費', d: '陳老闆等不到 11/1。'},
          {sel: '[data-key="when-now"]', t: '生效選「立即」', d: '要補差額或免收。', until: {checked: '[data-key="when-now"]'}},
          {sel: '[data-key="pay-link"]', t: '選「補差額」', d: '寄補差額付款連結給店家，付款成功才生效。', until: {checked: '[data-key="pay-link"]'}},
          {sel: '[data-key="topup"]', info: true, t: '付款連結金額 NT$1,558', d: '和陳老闆早上在方案與用量看到的一樣：月費差額 NT$2,000 × 23/31 天＝1,484，營業稅 74。'},
          {sel: '#f-why', t: '寫下原因', d: '會留在方案異動紀錄；店家收到的通知不會顯示原因。', fill: {value: '店家自己升級刷卡沒過，要求立即升級並寄付款連結', label: '店家自己升級刷卡沒過，要求立即升級並寄付款連結'}, until: {value: ['#f-why', '.{4,}']}},
          {sel: '[data-key="f-ok"]', t: '按「寄出付款連結 NT$1,558」', d: '連結寄到毛孩日和的帳務信箱和 LINE。'},
          {settle: 800, sel: '[data-key="paywait"]', info: true, t: '等店家付補差額', d: 'NT$1,558，10/16 前有效。付款成功才改為專業方案；沒付就維持原方案。'},
          {sel: '.dp', info: true, t: '方案紀錄多了一行', d: '10/9 11:05 美玲為毛孩日和寄出補差額付款連結 NT$1,558・付款成功後立即改為專業方案 v1。'}
        ]}
    ]
  });
})();
