/* 商家管理（寵派後台）: hints and guided tours for test mode. Format: test-kit/flows/README.md
   冠宇・最高管理者 reads the onboarding board, resends an expired invite, adds a new shop, schedules a suspension the shop
   asked for, and restores a suspended shop. One action or one explanation per step. The prototype keeps ?shop= in the
   address while a shop page is open and rewrites ?go= away, so every tour asks for both to be absent (it starts on the
   board). Every screen works on a phone. The new shop is a non-canon name (好日子寵物美容・簡小姐). */
(function () {
  var B = {role: 'super', shop: null, go: null};

  PP.register('tenant-admin', {
    name: '商家管理',
    hints: [
      {sel: '[data-key="board"]', t: '開店看板', d: '每家店從收到邀請到開始營業，停在哪一步、停了多久', tour: 'read'},
      {sel: '[data-key="card-mm"]', t: '邀請已過期', d: '首位管理者 7 天內沒接受：重發一次', tour: 'resend'},
      {sel: '[data-key="new"]', t: '新增商家', d: '填店名、統編、首位管理者，寄出邀請', tour: 'new'},
      {sel: '[data-key="card-yy"]', t: '一家營業中的店', d: '看開通進度、營業概況；停權或開案到客服支援', tour: 'suspend'},
      {sel: '[data-key="card-xs"]', t: '停權中的店', d: '補繳後恢復營業', tour: 'restore'},
      {sel: '[data-key="q"]', t: '找商家', d: '用店名、統編或城市找', quiet: true}
    ],
    tours: [
      {id: 'read', title: '看懂開店看板：每家店卡在哪', who: '冠宇（寵派最高管理者）', query: B,
        scene: '你是寵派的最高管理者，負責讓簽約的店家順利開張。看板把 12 家店依「邀請中、設定中、營業中、停權」排好，卡關的排最前面。你想一眼看出今天要先處理哪幾家。這個引導只看不改。',
        outro: '12 家店：邀請中 2（喵喵的邀請過期了）、設定中 3（汪星人停在契約模板 9 天）、營業中 6（阿福試用剩 2 天還沒付款方式）、停權 1（小森，收尾照常）。今天卡關 3 家：喵喵、汪星人、阿福。看板不顯示任何飼主資料。',
        steps: [
          {sel: '[data-key="sum"]', info: true, t: '12 家商家，今天卡關 3 家', d: '喵喵寵物沙龍、汪星人旅館、阿福寵物美容。點名字直接打開那家店。'},
          {sel: '[data-key="lane-inv"]', info: true, t: '邀請中 2：等首位管理者接受', d: '邀請 7 天有效。'},
          {sel: '[data-key="card-mm"]', info: true, t: '喵喵寵物沙龍：邀請已過期', d: '台南的鄭小姐 8 天沒有接受，標著卡關。'},
          {sel: '[data-key="lane-setup"]', info: true, t: '設定中 3：店家自己走完開店設定', d: '13 項設定由店家自己做，寵派只看進度。'},
          {sel: '[data-key="card-wx"]', info: true, t: '汪星人旅館：停在「契約模板」9 天', d: '卡關。可能需要開案到客服支援幫忙導入。'},
          {sel: '[data-key="lane-live"]', info: true, t: '營業中 6：已正式啟用，接受預約', d: '試用中的、付費中的都在這一欄。'},
          {sel: '[data-key="card-af"]', info: true, t: '阿福寵物美容：試用剩 2 天、沒有付款方式', d: '卡關。延長試用在方案管理。'},
          {sel: '[data-key="card-xs"]', info: true, t: '停權：小森寵物美容', d: '10/3 起停權・月費連續兩期未付。只擋新交易；住宿中 1 隻、既有預約 3 筆照常收尾。'}
        ]},
      {id: 'resend', title: '喵喵的邀請過期了：重發一次', who: '冠宇（寵派最高管理者）', query: B,
        scene: '喵喵寵物沙龍 10/1 簽約，你寄了開通邀請給鄭小姐，但她 10/8 前沒有接受，連結過期了。你剛打電話確認她還要用，現在要重發一次。',
        outro: '你重發了喵喵寵物沙龍的邀請：新連結寄到鄭小姐原本的 Email 與手機，10/16 前有效，舊連結同時失效。為了避免洗信，1 小時內只能重發一次。看板上的喵喵不再卡關，今天卡關從 3 家變 2 家。',
        steps: [
          {sel: '[data-key="card-mm"]', t: '點「喵喵寵物沙龍」', d: '邀請已過期・卡關。'},
          {sel: '[data-key="stops"]', info: true, t: '開通進度：停在「接受邀請」', d: '10/1 寄給鄭小姐，10/8 過期。後面還有開店設定、正式啟用、轉付費。'},
          {sel: '[data-key="facts"]', info: true, t: '鄭小姐的聯絡方式只顯示一部分', d: 'Email z•••@meowsalon.tw、電話 0921-•••-321。重發寄到原本的地址；地址打錯時，用「更正 Email 或手機再寄」，要寫原因。'},
          {sel: '[data-key="next"]', info: true, t: '重發會讓舊連結失效', d: '新連結寄到原本的 Email 與手機，7 天有效。'},
          {sel: '[data-key="resend"]', t: '按「重發邀請」', d: '立刻寄出。'},
          {settle: 1500, timeout: 9000, sel: '[data-key="sends"]', info: true, t: '10/9 11:20 重發，有效到 10/16', d: '10/1 那封標成「已失效・重發取代」。'},
          {sel: '[data-key="next"]', info: true, t: '1 小時內只能重發一次', d: '12:20 後才能再發，避免一直寄信給店家。'},
          {sel: '[data-key="trail"]', info: true, t: '本店留痕', d: '10/9 11:20 冠宇重發邀請給鄭小姐・新連結 7 天有效到 10/16，舊連結失效。'},
          {sel: '[data-key="back"]', t: '按「商家管理」回到看板', d: '看看喵喵現在的樣子。'},
          {settle: 600, sel: '[data-key="card-mm"]', info: true, t: '喵喵：今天寄出・10/16 前有效', d: '不再卡關；上方的今天卡關從 3 家變 2 家。'}
        ]},
      {id: 'new', title: '新增一家商家：好日子寵物美容', who: '冠宇（寵派最高管理者）', query: B,
        scene: '好日子寵物美容剛和寵派簽約，店長是簡小姐。你要建立這家店並寄邀請給她。統一編號有檢查碼，打錯一碼系統就會擋下。建立後由店家自己完成開店設定，正式啟用那天才開始試用 14 天。',
        outro: '好日子寵物美容建立了（統編 4567 8913），邀請寄到簡小姐的 Email 與手機，7 天內有效；卡片出現在「邀請中」，商家總數 12 → 13。統編打錯一碼時，系統用檢查碼擋下。同一個 Email 只能管理一家店。',
        steps: [
          {sel: '[data-key="new"]', t: '按「新增商家」', d: '打開新增視窗。'},
          {sel: '.dialog .lede', info: true, t: '試用從正式啟用那天開始算', d: '建立後寄邀請給首位管理者；開店設定由店家自己完成，正式啟用那天開始試用 14 天。'},
          {sel: '#n-name', t: '輸入店名', d: '店家登記的名稱。', fill: {value: '好日子寵物美容', label: '好日子寵物美容'}, until: {value: ['#n-name', '^好日子寵物美容$']}},
          {sel: '#n-tax', t: '輸入統一編號：先故意打錯最後一碼', d: '看看系統怎麼檢查。', fill: {value: '45678912', label: '45678912（最後一碼打錯）'}, until: {value: ['#n-tax', '^45678912$']}},
          {sel: '#n-who', t: '首位管理者姓名', d: '邀請寄給她，她會成為店家管理者。', fill: {value: '簡小姐', label: '簡小姐'}, until: {value: ['#n-who', '^簡小姐$']}},
          {sel: '#n-ph', t: '手機', d: '邀請簡訊寄到這裡。', fill: {value: '0935-112-468', label: '0935-112-468'}, until: {value: ['#n-ph', '0935']}},
          {sel: '#n-em', t: 'Email', d: '同一個 Email 只能管理一家店。', fill: {value: 'jian@haorizi.tw', label: 'jian@haorizi.tw'}, until: {value: ['#n-em', '^jian@haorizi\\.tw$']}},
          {sel: '[data-key="plan-basic"]', info: true, t: '預設方案：基本方案', d: 'NT$1,980／月・2 家分店・10 席。試用期間不收費；之後可在方案管理調整。'},
          {sel: '[data-key="dlg-ok"]', t: '按「建立並寄出邀請」', d: '系統會先檢查。'},
          {sel: '.dialog .field:has(#n-tax)', info: true, t: '統編檢查碼不對', d: '台灣統編有檢查碼，打錯一碼就擋下，免得邀請寄給錯的公司。'},
          {sel: '#n-tax', t: '改成正確的統編', d: '45678913。', fill: {value: '45678913', label: '45678913'}, until: {value: ['#n-tax', '^45678913$']}},
          {sel: '[data-key="dlg-ok"]', t: '按「建立並寄出邀請」', d: '邀請寄到簡小姐的 Email 與手機。'},
          {settle: 1500, timeout: 9000, sel: '[data-key="lane-inv"]', info: true, t: '邀請中：多了好日子寵物美容', d: '剛建立・管理者簡小姐・今天寄出・10/16 前有效。'},
          {sel: '[data-key="sum"]', info: true, t: '13 家商家', d: '從 12 家變 13 家。'}
        ]},
      {id: 'suspend', title: '悠悠要整修：排定暫停接新預約', who: '冠宇（寵派最高管理者）', query: B,
        scene: '悠悠寵物旅館的吳先生來電：10/12 起店面整修兩週，請寵派先暫停接新預約。停權只擋新交易，在店的寵物、住宿退房和既有預約照常。你要排定 10/12（一）00:00 起停權。小心：要輸入店名確認，免得停錯店。',
        outro: '悠悠寵物旅館排定 10/12（一）00:00 起停權，原因「商家要求暫停」，說明吳先生整修兩週。在那之前照常營業；生效後擋下新預約、改期與新增收費功能，公開預約入口顯示「店家目前暫停新增服務」；住宿中 11 隻照常退房，之後 25 筆預約保留。排定的停權可以取消。',
        steps: [
          {sel: '[data-key="card-yy"]', t: '點「悠悠寵物旅館」', d: '新竹・付費・基本方案。'},
          {sel: '[data-key="ops"]', info: true, t: '營業概況（不顯示飼主）', d: '今天 4 筆預約・在店 2 隻・住宿中 11 隻・之後 25 筆預約。'},
          {sel: '[data-key="suspend"]', t: '按「停權商家」', d: '先看停權會影響什麼。'},
          {sel: '[data-key="impact"]', info: true, t: '照常進行 vs. 會擋下', d: '照常：在店 2 隻、住宿中 11 隻退房、之後 25 筆預約、必要通知。擋下：新預約、改期、公開預約入口、新增收費功能。'},
          {sel: '[data-key="dlg-ok"]', t: '先直接按「確認停權」', d: '看看漏了什麼。'},
          {sel: '[data-key="why-err"]', info: true, t: '原因、生效時間與店名都要填', d: '「請選一個原因」「請選生效時間」「請輸入店名「悠悠寵物旅館」」。'},
          {sel: '[data-key="why-ask"]', t: '原因選「商家要求暫停」', d: '吳先生自己要求的。', until: {checked: '[data-key="why-ask"]'}},
          {sel: '#snote', t: '寫下說明', d: '選填，會記在本店留痕。', fill: {value: '吳先生 10/12 起整修兩週，請寵派先暫停接新預約', label: '吳先生 10/12 起整修兩週，請寵派先暫停接新預約'}, until: {value: ['#snote', '.{4,}']}},
          {sel: '[data-key="when-mon"]', t: '生效時間選「10/12（一）00:00」', d: '在那之前照常營業。', until: {checked: '[data-key="when-mon"]'}},
          {sel: '#tname', t: '輸入店名確認：先只打「悠悠」', d: '看看系統怎麼說。', fill: {value: '悠悠', label: '悠悠（不完整）'}, until: {value: ['#tname', '^悠悠$']}},
          {sel: '[data-key="dlg-ok"]', t: '按「確認停權」', d: '系統會比對店名。'},
          {sel: '.dialog .field:has(#tname)', info: true, t: '店名不相符', d: '要一字不差輸入「悠悠寵物旅館」，免得停錯店。'},
          {sel: '#tname', t: '輸入完整店名', d: '悠悠寵物旅館。', fill: {value: '悠悠寵物旅館', label: '悠悠寵物旅館'}, until: {value: ['#tname', '^悠悠寵物旅館$']}},
          {sel: '[data-key="dlg-ok"]', t: '按「確認停權」', d: '排定 10/12 00:00 生效。'},
          {settle: 1500, timeout: 9000, sel: '[data-key="sched"]', info: true, t: '排定 10/12（一）00:00 起停權', d: '在那之前照常營業。'},
          {sel: '[data-key="unsched"]', info: true, t: '排定的停權可以取消', d: '吳先生改變主意的話，按「取消排定停權」。'},
          {sel: '[data-key="trail"]', info: true, t: '本店留痕', d: '10/9 11:20 冠宇排定停權・10/12（一）00:00 起・商家要求暫停，說明原文跟著。'}
        ]},
      {id: 'restore', title: '小森補繳了：恢復營業', who: '冠宇（寵派最高管理者）', query: B, seed: {go: 'xspaid'},
        scene: '小森寵物美容 10/3 起因為月費連續兩期未付被停權。林小姐今天補繳了 9 月、10 月共 NT$4,158，付款管理確認入帳了。你要恢復它營業。',
        outro: '小森寵物美容恢復營業：原因「已補繳月費」，說明寫著補繳 NT$4,158。新預約、改期與公開預約入口立刻重新開放，方案照原本的扣款日計算。看板上的小森回到「營業中」，停權欄空了。',
        steps: [
          {sel: '[data-key="card-xs"]', t: '點「小森寵物美容」', d: '停權中。'},
          {sel: '[data-key="stop-5"]', info: true, t: '10/3 起停權：月費連續兩期未付', d: '開通進度最後多了一站「停權」。'},
          {sel: '[data-key="next"]', info: true, t: '停權中，收尾照常', d: '新預約與改期已擋下，公開預約入口顯示「店家目前暫停新增服務」；住宿中 1 隻、既有 3 筆預約照常收尾。'},
          {sel: '[data-key="paid"]', info: true, t: '付款管理：10/9 已補繳', d: '9 月、10 月月費 NT$4,158 在 11:05 入帳。還沒補繳時，「恢復營業」會變成次要按鈕，旁邊給「付款管理」的連結。'},
          {sel: '[data-key="restore"]', t: '按「恢復營業」', d: '打開確認視窗。'},
          {sel: '[data-key="dlg-res"] .cdl', info: true, t: '恢復後會怎樣', d: '新預約、改期與公開預約入口立刻重新開放；基本方案照原本的扣款日計算。'},
          {sel: '[data-key="rwhy-paid"]', t: '原因選「已補繳月費」', d: '付款管理確認入帳了。', until: {checked: '[data-key="rwhy-paid"]'}},
          {sel: '#rnote', t: '寫下說明', d: '選填，會記在本店留痕。', fill: {value: '10/9 已補繳 9 月、10 月月費 NT$4,158', label: '10/9 已補繳 9 月、10 月月費 NT$4,158'}, until: {value: ['#rnote', '.{4,}']}},
          {sel: '[data-key="dlg-ok"]', t: '按「確認恢復營業」', d: '立刻生效。'},
          {settle: 1500, timeout: 9000, sel: '[data-key="next"]', info: true, t: '營業中', d: '基本方案付費中，現在不需要處理。'},
          {sel: '[data-key="trail"]', info: true, t: '本店留痕', d: '10/9 11:20 冠宇恢復營業・已補繳月費・新預約、改期與公開預約入口重新開放。'},
          {sel: '[data-key="back"]', t: '按「商家管理」回到看板', d: '看看小森在哪一欄。'},
          {settle: 600, sel: '[data-key="lane-sus"]', info: true, t: '停權欄空了', d: '小森回到「營業中」，付費・基本方案。'}
        ]},
      /* 毛孩日和開張 (prototypes/open-day): act 1, played inside that page with ?life=open-new (the board without 毛孩日和); not listed
         on this page. 陳老闆's phone and 統編 are his shop's own record (0912-000-100, 24536806), as in every other prototype. */
      {id: 'life-open-new', life: true, seed: {life: 'open-new'}, title: '第 1 幕：建立毛孩日和，寄出邀請', who: '冠宇（寵派最高管理者）', query: B,
        scene: '10/9（五）11:20。台北的「毛孩日和」剛和寵派簽約：中山店和信義店，老闆是陳老闆。你是寵派的最高管理者冠宇，要在商家管理建立這家店，寄邀請給陳老闆。統一編號有檢查碼，打錯一碼系統就會擋下。建立後由陳老闆自己完成開店設定，正式啟用那天才開始試用 14 天。',
        outro: '毛孩日和建立了（統編 2453 6806），邀請寄到陳老闆的 Email 與手機，7 天內有效；卡片出現在「邀請中」，商家總數 11 → 12。統編打錯一碼時，系統用檢查碼擋下。下一幕換你當陳老闆，打開這封邀請。',
        steps: [
          {sel: '[data-key="lane-inv"]', info: true, t: '開店看板：邀請中、設定中、營業中', d: '每家店從收到邀請到開始營業，停在哪一欄、停了多久。毛孩日和還不在上面。'},
          {sel: '[data-key="new"]', t: '按「新增商家」', d: '打開新增視窗。'},
          {sel: '.dialog .lede', info: true, t: '試用從正式啟用那天開始算', d: '建立後寄邀請給首位管理者；開店設定由店家自己完成，正式啟用那天開始試用 14 天。'},
          {sel: '#n-name', t: '輸入店名', d: '店家登記的名稱。', fill: {value: '毛孩日和', label: '毛孩日和'}, until: {value: ['#n-name', '^毛孩日和$']}},
          {sel: '#n-tax', t: '輸入統一編號：先故意打錯最後一碼', d: '看看系統怎麼檢查。', fill: {value: '24536805', label: '24536805（最後一碼打錯）'}, until: {value: ['#n-tax', '^24536805$']}},
          {sel: '#n-who', t: '首位管理者姓名', d: '邀請寄給他，他會成為店家管理者。', fill: {value: '陳老闆', label: '陳老闆'}, until: {value: ['#n-who', '^陳老闆$']}},
          {sel: '#n-ph', t: '手機', d: '邀請簡訊寄到這裡，之後也用這支手機登入。', fill: {value: '0912-000-100', label: '0912-000-100'}, until: {value: ['#n-ph', '0912']}},
          {sel: '#n-em', t: 'Email', d: '同一個 Email 只能管理一家店。', fill: {value: 'chen@mohairi.tw', label: 'chen@mohairi.tw'}, until: {value: ['#n-em', '^chen@mohairi\\.tw$']}},
          {sel: '[data-key="plan-basic"]', info: true, t: '預設方案：基本方案', d: 'NT$1,980／月・2 家分店・10 席，剛好放得下中山店和信義店。試用期間不收費。'},
          {sel: '[data-key="dlg-ok"]', t: '按「建立並寄出邀請」', d: '系統會先檢查。'},
          {sel: '.dialog .field:has(#n-tax)', info: true, t: '統編檢查碼不對', d: '台灣統編有檢查碼，打錯一碼就擋下，免得邀請寄給錯的公司。'},
          {sel: '#n-tax', t: '改成正確的統編', d: '24536806。', fill: {value: '24536806', label: '24536806'}, until: {value: ['#n-tax', '^24536806$']}},
          {sel: '[data-key="dlg-ok"]', t: '按「建立並寄出邀請」', d: '邀請寄到陳老闆的 Email 與手機。'},
          {settle: 1500, timeout: 9000, sel: '[data-key="lane-inv"]', info: true, t: '邀請中：多了毛孩日和', d: '剛建立・管理者陳老闆・今天寄出・10/16 前有效。'},
          {sel: '[data-key="sum"]', info: true, t: '12 家商家', d: '從 11 家變 12 家。陳老闆接受邀請後，卡片會移到「設定中」。'}
        ]},
      /* 毛孩日和被停權到恢復 (prototypes/suspend): acts 2 and 6, on 毛孩日和's page; the page writes role and shop back to the address,
         so the query carries both */
      {id: 'life-sus-stop', life: true, seed: {life: 'sus-stop'}, title: '第 2 幕：看清楚影響，停權毛孩日和', who: '冠宇（寵派最高管理者）', query: {role: 'super', shop: 'mhr', go: null},
        scene: '11/16（一）10:12。美玲剛通知你：毛孩日和 11 月月費第 15 天還沒付，建議停權。毛孩日和的頁面已經打開了。停權只擋新增服務；先看清楚會擋什麼、什麼照常，再打店名確認。',
        outro: '毛孩日和從 11/16 10:12 起停權，原因「月費未付」。新預約（LINE、公開網頁、現場）、改期和新增收費功能都擋下了；在店的 4 隻寵物、住宿中 2 隻和之後的 38 筆預約照常收尾。本店留痕記下了美玲的通知和你的停權。下一幕換你當飼主王太太。',
        steps: [
          {sel: '[data-key="next"]', info: true, t: '付款管理建議停權', d: '11 月月費 NT$4,179 在 11/1 扣款失敗，重試和補款連結都沒有付，今天第 15 天。'},
          {sel: '[data-key="ops"]', info: true, t: '營業概況（不顯示飼主）', d: '今天 12 筆預約・在店 4 隻・住宿中 2 隻・之後 38 筆預約。停權不會動到這些。'},
          {sel: '[data-key="suspend"]', t: '按「停權商家」', d: '先看停權會影響什麼。'},
          {sel: '[data-key="impact"]', info: true, t: '照常進行 vs. 會擋下', d: '照常：在店的寵物、住宿退房、之後的預約、必要通知。擋下：新預約、改期（飼主仍可取消）、公開預約入口、新增收費功能。'},
          {sel: '[data-key="why-fee"]', t: '原因選「月費未付」', d: '美玲轉來的就是月費。', until: {checked: '[data-key="why-fee"]'}},
          {sel: '#snote', t: '寫下說明', d: '選填，會記在本店留痕。', fill: {value: '11 月月費扣款失敗，補款連結到期未付', label: '11 月月費扣款失敗，補款連結到期未付'}, until: {value: ['#snote', '.{4,}']}},
          {sel: '[data-key="when-now"]', t: '生效時間選「立即」', d: '已經第 15 天了，不再等。也可以排定今天 24:00 或下週一 00:00；生效時間沒有預設，一定要選。', until: {checked: '[data-key="when-now"]'}},
          {sel: '#tname', t: '輸入店名確認', d: '要一字不差輸入「毛孩日和」，免得停錯店。', fill: {value: '毛孩日和', label: '毛孩日和'}, until: {value: ['#tname', '^毛孩日和$']}},
          {sel: '[data-key="dlg-ok"]', t: '按「確認停權」', d: '立即生效。'},
          {settle: 1500, timeout: 9000, sel: '[data-key="next"]', info: true, t: '停權中', d: '11/16 起停權・月費未付。新預約與改期已擋下，公開預約入口顯示「店家目前暫停新增服務」。'},
          {sel: '[data-key="trail"]', info: true, t: '本店留痕', d: '09:30 美玲的通知、10:12 你的停權，都記下來了。下一幕換你當王太太。'}
        ]},
      {id: 'life-sus-restore', life: true, seed: {life: 'sus-restore'}, title: '第 6 幕：補繳入帳了，恢復營業', who: '冠宇（寵派最高管理者）', query: {role: 'super', shop: 'mhr', go: null},
        scene: '11/17（二）下午 2:05。付款管理通知你：毛孩日和 12:14 補繳了 11 月月費 NT$4,179，已經入帳。毛孩日和從昨天 10:12 停權到現在。補繳不會自動恢復營業：確認後，由你恢復。',
        outro: '毛孩日和恢復營業了，原因「已補繳月費」。新預約、改期與公開預約入口立刻重新開放，專業方案照原本的扣款日計算，下次扣款 12/1。從 11/1 扣款失敗、第 15 天停權到補繳後恢復，毛孩日和停了 27 小時 53 分。',
        steps: [
          {sel: '[data-key="stop-5"]', info: true, t: '11/16 起停權：月費未付', d: '開通進度最後多了一站「停權」。'},
          {sel: '[data-key="trail"]', info: true, t: '本店留痕：12:15 補繳入帳', d: '付款管理記下陳老闆用 MASTERCARD •••• 8810 補繳 NT$4,179。恢復營業要你在這裡按。'},
          {sel: '[data-key="restore"]', t: '按「恢復營業」', d: '打開確認視窗。'},
          {sel: '[data-key="dlg-res"] .cdl', info: true, t: '恢復後會怎樣', d: '新預約、改期與公開預約入口立刻重新開放；專業方案照原本的扣款日計算。'},
          {sel: '[data-key="rwhy-paid"]', t: '原因選「已補繳月費」', d: '付款管理確認入帳了。', until: {checked: '[data-key="rwhy-paid"]'}},
          {sel: '#rnote', t: '寫下說明', d: '選填，會記在本店留痕。', fill: {value: '11/17 12:14 補繳 11 月月費 NT$4,179', label: '11/17 12:14 補繳 11 月月費 NT$4,179'}, until: {value: ['#rnote', '.{4,}']}},
          {sel: '[data-key="dlg-ok"]', t: '按「確認恢復營業」', d: '立刻生效。'},
          {settle: 1500, timeout: 9000, sel: '[data-key="next"]', info: true, t: '營業中', d: '專業方案付費中，現在不需要處理。'},
          {sel: '[data-key="plan"]', info: true, t: '下次扣款 12/1', d: '專業方案 NT$3,980／月。毛孩日和從建議停權到恢復營業，到這裡走完了。'}
        ]}
    ]
  });
})();
