/* 契約模板庫（寵派後台）: hints and guided tours for test mode. Format: test-kit/flows/README.md
   This is the platform's own back office: the people are 寵派 staff (宜蓁・合規, 冠宇・最高管理者) and the shops are customers.
   One action or one explanation per step. The prototype rewrites ?go= away, so tours ask for it to be absent.
   A clause being edited ends its edit when focus leaves it: the 下一步 of the info step after the fill does that. */
(function () {
  var C = {role: 'compliance', go: null};
  var SUP = {role: 'super', go: null};

  PP.register('contract-library', {
    name: '契約模板庫',
    minWidth: 720,   /* 手機上只能查看 */
    hints: [
      {sel: '[data-key="q-rt-sick"]', t: '被退回的草稿', d: '照退回意見修改，再重新送審', tour: 'resubmit'},
      {sel: '[data-key="q-ap-groom"]', t: '等核准的草稿', d: '送審的人以外的合規或最高管理者核准發布', tour: 'publish'},
      {sel: '[data-key="q-ov-yy-med"]', t: '過了最晚更新日的店', d: '提醒店家管理者自己更新，24 小時內只能提醒一次', tour: 'remind'},
      {sel: '.legend', t: '圖例', d: '每個圓代表一家店：實心、空心、虛線、斜線、鈴鐺各有意思', tour: 'read'},
      {sel: '[data-key^="tk-"]', t: '一家店', d: '點開看這家店每份模板更新到哪一版、通知紀錄', quiet: true},
      {sel: '[data-key="new"]', t: '新增範本', d: '從空白或現有範本開始寫，送法務審查前都是草稿'},
      {sel: '[data-key="log"]', t: '異動紀錄', d: '送審、退回、核准發布、停用與提醒都留下紀錄', quiet: true}
    ],
    tours: [
      {id: 'read', title: '看懂採用分布：每家店用到哪一版', who: '宜蓁（寵派合規）', query: C, minWidth: 0,
        scene: '你是寵派的合規人員。每份平台契約範本都有好幾版，每家店採用後要自己發布。你想一眼看出：哪些店用的是現行版、哪些還沒發布、哪些過了最晚更新日。這個引導只看不改。',
        outro: '採用分布把每份範本畫成一條時間軸，每家店是一個圓：實心是已發布在用、空心是採用了還沒發布、虛線是停權中、斜線是過了最晚更新日，鈴鐺是已通知新版。點一家店可以看它每份模板的狀態；寵派只能提醒，不能替店家修改或發布。',
        steps: [
          {sel: '[data-key="strip"]', info: true, t: '最上面：6 種範本、9 家商家、待合規處理 3 件', d: '三件待處理直接列成按鈕：美容契約等別人核准、疾病照護被退回、悠悠就醫授權過期。'},
          {sel: '.legend', info: true, t: '圖例', d: '版本的線：舊版、現行版、草稿。店的圓：已發布在用、還沒發布、過期、停權中、已通知新版。只列畫面上有的。'},
          {sel: '[data-key="seg-groom-2025-06"]', info: true, t: '美容契約：2025-06 是現行版，8 家', d: '依農業部 114.6.9 範本，2025/6/20 發布。'},
          {sel: '[data-key="seg-groom-draft"]', info: true, t: '虛線：2026-10 草稿待核准', d: '宜蓁 10/7 送審。發布後店家才能採用。'},
          {sel: '[data-key="tk-mhr-groom"]', info: true, t: '實心圓：毛孩日和已發布在用', d: '這家店的美容契約依 2025-06 做，已經發布，飼主簽的是這一版。'},
          {sel: '[data-key="tk-wx-groom"]', info: true, t: '空心圓：汪星人採用了還沒發布', d: '店家選了範本，但還沒發布自己的版本。'},
          {sel: '[data-key="tk-xs-groom"]', info: true, t: '虛線圓：小森停權中', d: '停權的店不會收到新版通知，恢復營業後再通知。'},
          {sel: '[data-key="seg-med-2026-01"]', info: true, t: '就醫授權：舊版過了最晚更新日 9 天', d: '2026-08 在 8/25 發布，最晚 9/30 更新。悠悠、小森還在用 2026-01。'},
          {sel: '[data-key="tk-yy-med"]', info: true, t: '斜線＋鈴鐺：悠悠過期，已通知', d: '過期不會擋飼主簽署；寵派可以再提醒。'},
          {sel: '[data-key="od-med"]', info: true, t: '還有 6 筆新預約用舊版', d: '9/30 之後悠悠成立的預約都照舊版。可以一次提醒全部過期店，或交給客服打電話。'},
          {sel: '[data-key="tk-wx-groom"]', t: '點汪星人的圓', d: '右邊會打開這家店的狀態。'},
          {sel: '[data-key="sk"]', info: true, t: '汪星人：兩份模板都還沒發布', d: '開店設定停在「契約模板」（9/30 起）。美容契約、住宿授權都採用了，還沒發布。'},
          {sel: '.dp .ph-note', info: true, t: '寵派不能替店家修改或發布', d: '模板是店家自己的契約，提醒只會請店家管理者自己到「契約模板」更新。'},
          {sel: '[data-key="dp-x"]', t: '按 ✕ 關閉', d: '回到採用分布。'},
          {sel: '[data-key="notyet"]', info: true, t: '還沒採用任何範本的店', d: '喵喵、好狗運還在邀請中；柴柴美容室開店設定還沒走到契約模板。'},
          {sel: '[data-key="log"]', info: true, t: '異動紀錄', d: '送審、退回、核准發布、停用與提醒，誰在什麼時候做的都在這裡。'}
        ]},
      {id: 'resubmit', title: '照退回意見修改，重新送審', who: '宜蓁（寵派合規）', query: C,
        scene: '你起草的「特殊疾病照護同意書」被冠宇退回了：第三條讓店家自行停藥，牴觸通知飼主的義務。你要照退回意見改第三條，附上律師意見書重新送審。',
        outro: '第三條改成「會先通知你，由你決定是否停藥」，畫面標出刪掉與新增的字。你附上示範法律事務所 10/9 的意見書重新送審，條文鎖定，待合規處理變成「疾病照護 2026-10・等別人核准」。你是送審的人，不能核准自己送的草稿，要等冠宇或另一位合規。',
        steps: [
          {sel: '[data-key="q-rt-sick"]', t: '按「疾病照護・已退回・待你修改」', d: '待合規處理的第二件。'},
          {sel: '[data-key="lock"]', info: true, t: '冠宇 10/8 退回的原因', d: '第三條讓店家自行停藥，牴觸「健康狀況告知」與通知飼主的義務；請改成先通知飼主、由飼主決定。'},
          {sel: '[data-key="checks"]', info: true, t: '退回後還沒有修改，不能重送', d: '「重新送審」現在按不下去：退回後一定要有修改。'},
          {sel: '[data-key="e-k3"]', t: '點第三條「停止用藥」', d: '條文會變成可以輸入的框。'},
          {sel: '#cb-k3', t: '改成先通知飼主', d: '用飼主看得懂的話寫。草稿會自動存檔。', fill: {value: '店家判斷毛孩狀況不適合用藥時，會先通知你，由你決定是否停藥。', label: '店家判斷毛孩狀況不適合用藥時，會先通知你，由你決定是否停藥。'}, until: {value: ['#cb-k3', '由你決定是否停藥。$']}},
          {sel: '[data-key="lock"]', info: true, t: '對照退回意見', d: '「先通知飼主、由飼主決定」，改好了。按「下一步」結束這條的編輯。'},
          {settle: 900, sel: '[data-key="e-k3"]', info: true, t: '第三條標出改了哪裡', d: '刪掉「得自行」，加上「會先通知你，由你決定是否停」。核准的人一眼就看得到。'},
          {sel: '.dsum', info: true, t: '和退回時的內容相比：修改 1 條', d: '草稿已自動存檔，時間更新成 10/9 11:20。'},
          {sel: '[data-key="checks"]', info: true, t: '檢查清單：退回後已修改', d: '「重新送審」可以按了。'},
          {sel: '[data-key="submit"]', t: '按「重新送審…」', d: '右邊會打開送審表單。'},
          {sel: '.dp p.lede', info: true, t: '送審後條文會鎖定', d: '和退回時相比修改 1 條；送審後等冠宇或另一位合規核准。'},
          {sel: '[data-key="sf-who"]', info: true, t: '律師意見書已經帶入', d: '意見書_疾病照護_2026-10.pdf、示範法律事務所。原型不會真的上傳檔案。'},
          {sel: '#sf-date', t: '審查日：輸入意見書上的日期', d: '沒填的話不能送審。', fill: {value: '10/9', label: '10/9'}, until: {value: ['#sf-date', '\\d']}},
          {sel: '#sf-note', t: '給核准人的說明（選填）', d: '寫一句改了什麼，核准的人比較好看。', fill: {value: '第三條改成先通知飼主、由飼主決定', label: '第三條改成先通知飼主、由飼主決定'}, until: {value: ['#sf-note', '\\S']}},
          {sel: '[data-key="sf-ok"]', t: '按「重新送審」', d: '會記錄在異動紀錄。'},
          {settle: 900, sel: '[data-key="lock"]', info: true, t: '送審中，條文鎖定', d: '要再修改得先「撤回送審」。'},
          {sel: '[data-key="review"] .go:has(.reason)', info: true, t: '你不能核准自己送的草稿', d: '「核准發布」是灰的：送審的人不能核准，要等冠宇或另一位合規。這是為了每份範本至少兩個人看過。'},
          {sel: '[data-key="q-ap-sick"]', info: true, t: '待合規處理：疾病照護 2026-10・等別人核准', d: '從「已退回・待你修改」變成等別人核准。'}
        ]},
      {id: 'publish', title: '核准並發布美容契約 2026-10', who: '冠宇（寵派最高管理者）', query: SUP,
        scene: '宜蓁依農業部 114.6.9 範本改好了犬貓美容定型化契約 2026-10，附律師意見書送審。你是冠宇，要讀過改了什麼、設定店家的最晚更新日、看清楚會通知哪些店，再發布。發布後條文就不能改了。',
        outro: '美容契約平台 2026-10 版發布了：依據法規修正，最晚 11/8 更新，用 LINE＋Email 通知 7 家店的管理者，停權的小森先不通知。採用分布上，2025-06 變成舊版、7 家店的圓旁多了鈴鐺；店家要自己以新範本建新版並發布。店家發布後新預約才用新版，已成立的預約都照原本的版本和費用。',
        steps: [
          {sel: '[data-key="q-ap-groom"]', t: '按「美容契約 2026-10・待你核准」', d: '宜蓁送審的草稿，你不是起草的人，可以核准。'},
          {sel: '.dsum', info: true, t: '和 2025-06 相比：修改 2 條、新增 1 條', d: '改過的條文在全文裡直接標出刪除和新增的字。'},
          {sel: 'ol.clauses > li:nth-child(4)', info: true, t: '第四條：補上近期用藥與疫苗紀錄', d: '健康狀況告知是重點條款，飼主簽約前要逐條勾選。'},
          {sel: 'ol.clauses > li:nth-child(10)', info: true, t: '第十條：新增審閱期間', d: '飼主簽約前至少有 1 日審閱期；當日預約可以當場審閱或明確同意縮短，店家會記錄。'},
          {sel: '[data-key="review"]', info: true, t: '審查紀錄與意見書', d: '示範法律事務所 10/6 審查，宜蓁 10/7 送審。'},
          {sel: '[data-key="approve"]', t: '按「核准並設定發布…」', d: '右邊會打開發布設定。'},
          {sel: '.dp .dsec:has([data-key="due-d30"])', info: true, t: '依據是法規修正：最晚 30 天（11/8 前）', d: '法規修正一定要有期限，可選 14 天、30 天或自訂日期。過了也不會擋飼主簽署；商家首頁會出現紅條直到發布。'},
          {sel: '[data-key="pb-tell"]', info: true, t: '會通知 7 家', d: '在用 2025-06 的店會收到 LINE＋Email。停權中的小森寵物美容先不通知，恢復營業後再通知。'},
          {sel: '[data-key="pb-drafts"]', info: true, t: '正在依舊版做草稿的店', d: '毛孩日和有第 4 版草稿、汪星人還沒發布；他們的草稿會標示「平台範本已更新」。'},
          {sel: '[data-key="pb-bubble"]', info: true, t: '店家管理者收到的 LINE', d: '說清楚為什麼（法規修正）、最晚哪一天（11/8）。店家發布新版後，新預約才用新版；已成立的預約都照原本的版本和費用。'},
          {sel: '[data-key="pb-ok"]', t: '按「核准並發布…」', d: '還要再確認一次。'},
          {sel: '.dialog', info: true, t: '發布後條文不能再改', d: '只能以這一版建新草稿。起草宜蓁、你是核准人、最晚 11/8 更新、通知 7 家。'},
          {sel: '#dl-typed', t: '輸入範本名稱確認', d: '打一次名稱，避免按錯。', fill: {value: '犬貓美容定型化契約', label: '犬貓美容定型化契約'}, until: {value: ['#dl-typed', '^犬貓美容定型化契約$']}},
          {sel: '[data-key="dlg-ok"]', t: '按「確認發布」', d: '會記錄在異動紀錄。'},
          {settle: 1500, sel: '[data-key="doc"] .sh-h', info: true, t: '2026-10 版・現行', d: '10/9 發布，宜蓁起草、冠宇核准。'},
          {sel: '[data-key="back"]', t: '按「採用分布」回到總覽', d: '看看各家店的狀態怎麼變。'},
          {settle: 1500, sel: '[data-key="seg-groom-2025-06"]', info: true, t: '2025-06 變成舊版：最晚 11/8 更新・8 家', d: '店家還沒換之前，新預約照舊版成立；過了 11/8 這裡會算出還有幾筆新預約用舊版。'},
          {sel: '[data-key="tk-mhr-groom"]', info: true, t: '圓旁多了鈴鐺：已通知新版', d: '7 家店都收到了；停權中的小森沒有鈴鐺。'},
          {sel: '[data-key="seg-groom-2026-10"]', info: true, t: '2026-10 現行，目前 0 家', d: '店家以新範本建新版並發布後，圓會移到這一段。'},
          {sel: '[data-key="log"]', info: true, t: '異動紀錄：冠宇核准發布', d: '10/9 11:20 冠宇核准發布「犬貓美容定型化契約」2026-10・最晚 11/8 更新・通知 7 家。'}
        ]},
      {id: 'remind', title: '提醒悠悠更新就醫授權', who: '宜蓁（寵派合規）', query: C,
        scene: '緊急就醫授權 2026-08 在 8/25 發布，要店家 9/30 前更新。悠悠寵物旅館已經過期 9 天，9/24 也提醒過一次。你要再提醒一次。',
        outro: '你用 LINE＋Email 再提醒悠悠的店家管理者吳先生更新就醫授權，通知紀錄多了一筆 10/9 11:20。24 小時內不能再提醒，避免一直轟炸店家。寵派不能替店家修改或發布模板，只能提醒。',
        steps: [
          {sel: '[data-key="q-ov-yy-med"]', t: '按「悠悠寵物旅館・就醫授權過期」', d: '待合規處理的第三件。'},
          {sel: '[data-key="sk"]', info: true, t: '就醫授權：已過期 9 天', d: '悠悠還在用依平台 2026-01 做的第 1 版。平台 2026-08 在 8/25 通知，最晚 9/30。住宿授權是最新的。'},
          {sel: '.dp .dsec:has(> ol)', info: true, t: '通知紀錄', d: '8/25 發布通知，9/24 宜蓁再提醒過一次。'},
          {sel: '.dp .ph-note', info: true, t: '寵派不能替店家更新', d: '提醒只會請店家管理者自己到「契約模板」以新範本建新版並發布。'},
          {sel: '[data-key="remind"]', t: '按「再提醒一次」', d: 'LINE＋Email 給店家管理者吳先生。'},
          {settle: 900, sel: '.dp .go', info: true, t: '24 小時內不能再發', d: '「今天 11:20 已提醒過」。避免同一件事一直轟炸店家。'},
          {sel: '.dp .dsec:has(> ol)', info: true, t: '通知紀錄多了一筆', d: '10/9 11:20 宜蓁再提醒更新「就醫授權」。'}
        ]},
      /* 一份契約的一生 (prototypes/contract-life): act 1, played inside that page with ?life=ct-platform (10/9 09:10, before 毛孩日和
         started a 第 4 版); not listed on this page */
      {id: 'life-ct-platform', life: true, seed: {life: 'ct-platform'}, title: '第 1 幕：發布美容契約 2026-10', who: '冠宇（寵派最高管理者）', query: SUP,
        scene: '10/9（五）早上 9:10。宜蓁依農業部 114.6.9 範本改好了犬貓美容定型化契約 2026-10，附律師意見書送審。你是冠宇，要讀過改了什麼、設定店家的最晚更新日、看清楚會通知哪些店，再發布。毛孩日和的陳老闆也會收到通知：這份契約接下來的一生，從這裡開始。',
        outro: '美容契約 2026-10 發布了：最晚 11/8 更新，LINE＋Email 通知 7 家店的管理者，毛孩日和的陳老闆也收到了。平台的部分（應記載條款與重點條款）從此由 2026-10 帶入；店家要自己以新範本建新版並發布。下一幕換你當陳老闆。',
        steps: [
          {sel: '[data-key="q-ap-groom"]', t: '按「美容契約 2026-10・待你核准」', d: '宜蓁送審的草稿，你不是起草的人，可以核准。'},
          {sel: '.dsum', info: true, t: '和 2025-06 相比：修改 2 條、新增 1 條', d: '改過的條文在全文裡直接標出刪除和新增的字。'},
          {sel: 'ol.clauses > li:nth-child(4)', info: true, t: '第四條：補上疫苗施打紀錄', d: '健康狀況告知是重點條款，飼主簽約前要逐條勾選。'},
          {sel: 'ol.clauses > li:nth-child(10)', info: true, t: '第十條：新增審閱期間，也是重點條款', d: '飼主簽約前至少有 1 日審閱期；來不及的話當場審閱或明確同意縮短，店家會記錄。重點條款從 5 條變 6 條。'},
          {sel: '[data-key="approve"]', t: '按「核准並設定發布…」', d: '右邊會打開發布設定。'},
          {sel: '.dp .dsec:has([data-key="due-d30"])', info: true, t: '依據是法規修正：最晚 30 天（11/8 前）', d: '過了最晚更新日也不會擋飼主簽署；商家首頁會出現紅條直到發布。'},
          {sel: '[data-key="pb-tell"]', info: true, t: '會通知 7 家，毛孩日和也在裡面', d: '在用 2025-06 的店會收到 LINE＋Email。停權中的小森先不通知。'},
          {sel: '[data-key="pb-bubble"]', info: true, t: '陳老闆會收到的 LINE', d: '因為法規修正，請他在 11/8 前到「契約模板」以新範本建立新版並發布。已成立的預約照原本的版本和費用。'},
          {sel: '[data-key="pb-ok"]', t: '按「核准並發布…」', d: '還要再確認一次。'},
          {sel: '.dialog', info: true, t: '發布後條文不能再改', d: '只能以這一版建新草稿。起草宜蓁、你是核准人、最晚 11/8 更新、通知 7 家。'},
          {sel: '#dl-typed', t: '輸入範本名稱確認', d: '打一次名稱，避免按錯。', fill: {value: '犬貓美容定型化契約', label: '犬貓美容定型化契約'}, until: {value: ['#dl-typed', '^犬貓美容定型化契約$']}},
          {sel: '[data-key="dlg-ok"]', t: '按「確認發布」', d: '會記錄在異動紀錄。'},
          {settle: 1500, sel: '[data-key="doc"] .sh-h', info: true, t: '2026-10 版・現行', d: '10/9 發布，宜蓁起草、冠宇核准。'},
          {sel: '[data-key="back"]', t: '按「採用分布」回到總覽', d: '看看毛孩日和在哪裡。'},
          {settle: 1500, sel: '[data-key="seg-groom-2025-06"]', info: true, t: '2025-06 變成舊版：最晚 11/8 更新', d: '店家還沒換之前，新預約照舊版成立；已成立的預約不會改版本。'},
          {sel: '[data-key="tk-mhr-groom"]', info: true, t: '毛孩日和的圓旁多了鈴鐺', d: '陳老闆收到通知了。他的美容契約現在是第 3 版，依 2025-06。'},
          {sel: '[data-key="seg-groom-2026-10"]', info: true, t: '2026-10 現行，目前 0 家', d: '陳老闆以新範本發布第 4 版後，毛孩日和的圓就會移到這一段。'}
        ]}
    ]
  });
})();
