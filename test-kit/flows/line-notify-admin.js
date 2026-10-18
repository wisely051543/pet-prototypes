/* LINE／通知管理（寵派後台）: hints and guided tours for test mode. Format: test-kit/flows/README.md
   小雯・客服 handles a LINE timeout incident (read it, resend a group, mark one settled, open a support case); 冠宇・最高管理者
   edits a notification template and rotates the OA's access token. One action or one explanation per step. The prototype
   keeps ?role= and ?tab= in the address, so every tour names both. Every screen works on a phone. */
(function () {
  var Q = {role: 'support', tab: 'q', go: null};

  PP.register('line-notify-admin', {
    name: 'LINE／通知管理',
    hints: [
      {sel: '[data-key="ix-A"]', t: '待處理的事故', d: '依原因與時間分組：失敗的通知還能怎麼處理', tour: 'read'},
      {sel: '[data-key="resend-A"]', t: '整群重送', d: '只送 LINE、沒有簽署連結、時段還沒到的通知可以整群再交給 LINE 一次', tour: 'resend'},
      {sel: '[data-key="case-A-link"]', t: '開案處理', d: '帶簽署連結的不能原樣重送：到客服支援開案發新連結', tour: 'case'},
      {sel: '[data-key="tab-tpl"]', t: '通知範本', d: '每一種通知的 LINE 與簡訊內文、版本與發布', tour: 'template'},
      {sel: '[data-key="rot-btn"]', t: '輪替憑證', d: '產生新的 access token，新舊並行 10 分鐘', tour: 'rotate'},
      {sel: '[data-key="tab-oa"]', t: 'OA 狀態與用量', d: '寵派 OA 的健康檢查、本月則數與各店用量', quiet: true},
      {sel: '[data-key="mark-A-sms"]', t: '標已處理', d: '不必再送的通知：選理由後移出待處理', quiet: true}
    ],
    tours: [
      {id: 'read', title: '看懂一起 LINE 逾時事故', who: '小雯（寵派客服）', query: Q,
        scene: '你是寵派的客服。今天 10:58 到 11:06 LINE 端回應逾時，這段時間寵派 OA 發給飼主的 19 則通知沒有交給 LINE。系統已經把它們依「還能怎麼處理」分好段。你想先看懂這起事故。這個引導只看不改。',
        outro: 'LINE 逾時事故 19 則、4 家店：必要通知 11 則已自動改傳簡訊；4 則可以整群重送；1 則提醒的預約已經開始，不重送，請商家打電話；2 則帶簽署連結，要到客服支援開案發新連結；1 則 LINE、簡訊、Email 都送不到。這裡只看得到店家、通知種類和數量，看不到飼主是誰；要查個別預約一定要開案。',
        steps: [
          {sel: '[data-key="oas"]', info: true, t: '寵派 OA 正常', d: '10:58–11:06 LINE 逾時，已恢復。本月 4,959／30,000 則；封鎖率最高的是汪汪俱樂部 4.1%。'},
          {sel: '[data-key="ix-A"]', info: true, t: '待處理 3 起：這起最急', d: 'LINE 回應逾時・已恢復・19 則・4 家店。'},
          {sel: '[data-key="inc-A"] .why', info: true, t: '發生了什麼', d: '逾時期間送出的通知沒有交給 LINE。必要通知已自動改傳簡訊；商家設定只送 LINE 的提醒與可接回停在原地。'},
          {sel: '[data-key="row-A-sms"]', info: true, t: '已改傳簡訊 11 則', d: '電信回報已收到，內容和 LINE 那則一樣，不必再送。標已處理就好。'},
          {sel: '[data-key="row-A-retry"]', info: true, t: '可重送 4 則', d: '商家設定只送 LINE、沒有簽署連結、時段還沒到的通知，可以整群再交給 LINE 一次。'},
          {sel: '[data-key="row-A-late"]', info: true, t: '已過時效 1 則：請商家打電話', d: '毛孩日和一則提醒的預約 11:00 已經開始，現在重送飼主也來不及讀。請商家直接打電話問飼主會不會來。'},
          {sel: '[data-key="row-A-link"]', info: true, t: '需改發新連結 2 則', d: '帶簽署連結的通知不能原樣重送，要開案發新連結，舊連結會同時失效。'},
          {sel: '[data-key="row-A-dead"]', info: true, t: '送不到 1 則', d: 'LINE、簡訊、Email 都送不到。要開案請毛孩日和向飼主確認聯絡方式。'},
          {sel: '[data-key="shops-A"]', info: true, t: '各店分布', d: '毛孩日和 12 則最多；汪汪俱樂部 5、悠悠寵物旅館 1、小森寵物美容 1。'},
          {sel: '[data-key="inc-A"] .blk > .privacy', info: true, t: '小森已停權，照樣補送', d: '停權只擋新交易；既有預約的必要通知照常補送，飼主不該因為店被停權而漏收。'},
          {sel: '[data-key="inc-A"] .rcol > .privacy', info: true, t: '這裡看不到飼主是誰', d: '只看得到店家、通知種類與數量。要看是哪位飼主、哪一筆預約，請開案到客服支援查，查詢會記在案上。'},
          {sel: '[data-key="trail-A"]', info: true, t: '事故經過', d: '11:06 系統偵測到 LINE 恢復，開立事故；11:07 必要通知 11 則自動改傳簡訊。之後誰做了什麼都會接著記。'},
          {sel: '[data-key="ix-B"]', info: true, t: '另一起：飼主封鎖寵派 OA', d: '汪汪俱樂部本週 37 則，封鎖率 4.1%（上週 1.2%）。34 則已改傳簡訊、3 則送不到。'}
        ]},
      {id: 'resend', title: '整群重送，再把不必送的標已處理', who: '小雯（寵派客服）', query: Q,
        scene: 'LINE 已經恢復。逾時事故裡有 4 則只送 LINE 的提醒與可接回，可以整群再交給 LINE 一次；另一則提醒的預約已經開始，不重送；11 則已經改傳簡訊送到了。你要重送那 4 則，再把不必送的標為已處理。',
        outro: '4 則重送後：2 則 LINE 已收下（LINE 不回報飼主有沒有看到，所以不寫「已送達」）。汪汪俱樂部的兩位飼主封鎖了寵派 OA：可接回跟逾時照護費有關，一律改傳簡訊；提醒依商家設定只送 LINE、不改傳簡訊。已改傳簡訊的 12 則標為已處理，理由「簡訊已送到，不必再送」，記在事故經過上；10 秒內可以復原。',
        steps: [
          {sel: '[data-key="row-A-retry"]', info: true, t: '可重送：毛孩日和 2・汪汪俱樂部 2', d: '都是只送 LINE、沒有簽署連結、時段還沒到的通知。'},
          {sel: '[data-key="row-A-late"]', info: true, t: '這則不重送：預約 11:00 已經開始', d: '重送飼主也來不及讀。請商家直接打電話。'},
          {sel: '[data-key="resend-A"]', t: '按「重送 4 則」', d: '還要再確認一次。'},
          {sel: '[data-key="dlg-resend"] .cdl', info: true, t: '重送什麼、送給誰', d: '預約提醒・可接回；提醒的時段是毛孩日和 13:00、13:30・汪汪俱樂部 14:00。送到原本的 LINE 好友，內容和原本一樣，記在這起事故。'},
          {sel: '[data-key="dlg-late"]', info: true, t: '1 則時段已開始，不會重送', d: '毛孩日和 11:00 那筆。請商家直接打電話確認。'},
          {sel: '[data-key="dlg-fee"]', info: true, t: '還是交不出去的：提醒不改傳，可接回一律改傳簡訊', d: '例如飼主已封鎖。提醒依商家設定只送 LINE；可接回跟逾時照護費有關，一定改傳簡訊。'},
          {sel: '[data-key="dlg-ok"]', t: '按「重送 4 則」', d: '一則一則交給 LINE。'},
          {settle: 1000, timeout: 9000, sel: '[data-key="row-A-gave"]', info: true, t: '已交給 LINE：2 則', d: '毛孩日和 2。LINE 不回報飼主有沒有看到，所以只寫「已交給 LINE」，不寫「已送達」。'},
          {sel: '[data-key="row-A-sms"]', info: true, t: '可接回改傳簡訊', d: '汪汪俱樂部那則可接回，飼主已封鎖寵派 OA。跟逾時照護費有關，即使商家設定只送 LINE 也改傳簡訊，算進「已改傳簡訊」。'},
          {sel: '[data-key="row-A-nofb"]', info: true, t: '只送 LINE・不補發：1 則', d: '汪汪俱樂部那則提醒重送仍沒交出去（飼主已封鎖寵派 OA）。依商家設定不改傳簡訊。'},
          {sel: '[data-key="bar-A"]', info: true, t: '上方的分段跟著變了', d: '可重送清空了，已交給 LINE 的不用再處理。'},
          {sel: '[data-key="mark-A-sms"]', t: '在「已改傳簡訊」按「標已處理」', d: '這 12 則簡訊都送到了。'},
          {sel: '[data-key="dlg-mark"] .lede', info: true, t: '標了就不會再送', d: '這 12 則不再出現在待處理，不會再送任何東西給飼主。'},
          {sel: '[data-key="why-sent"]', info: true, t: '理由：簡訊已送到，不必再送', d: '已經幫你選好；其他理由要自己寫。'},
          {sel: '[data-key="dlg-mark"] .aud', info: true, t: '會記下你、時間、則數與理由', d: '之後誰來看都知道為什麼沒再送。'},
          {sel: '[data-key="dlg-ok"]', t: '按「標已處理」', d: '移出待處理。'},
          {settle: 800, sel: '[data-key="row-A-sms"]', info: true, t: '已標處理：小雯', d: '理由「簡訊已送到」寫在旁邊。標錯了，10 秒內在下方提示按「復原」。'},
          {sel: '[data-key="trail-A"]', info: true, t: '事故經過多了你的紀錄', d: '小雯把「已改傳簡訊」12 則標為已處理・簡訊已送到，不必再送。'}
        ]},
      {id: 'case', title: '簽署連結送不到：開案改發新連結', who: '小雯（寵派客服）', query: Q,
        scene: '逾時事故裡，毛孩日和有 2 則契約送達通知帶著簽署連結，不能原樣重送。你要到客服支援開案，讓專人逐筆發新連結；舊連結會同時失效。陳老闆剛好打電話來，工單號是 CS-1050。',
        outro: '你為毛孩日和「需改發新連結」的 2 則開了案 CS-1050，目的「收不到簽署連結」，這 2 則預約直接帶進客服支援，不必再用手機末四碼查。這一段標成「已轉客服」，事故經過記下來；之後在案裡的每一筆查詢也都會留紀錄。',
        steps: [
          {sel: '[data-key="row-A-link"]', info: true, t: '需改發新連結：毛孩日和 2 則', d: '帶簽署連結的通知不能原樣重送，舊連結也要失效，免得飼主簽到舊版。'},
          {sel: '[data-key="case-A-link"]', t: '按「開案處理」', d: '到客服支援逐筆處理。'},
          {sel: '[data-key="dlg-case"] .cdl', info: true, t: '目的已經幫你填好', d: '店家毛孩日和、目的「收不到簽署連結」，這 2 則預約直接帶入。'},
          {sel: '#tkt', t: '填工單號 1050', d: '選填。陳老闆來電的工單。', fill: {value: '1050', label: '1050（CS-1050）'}, until: {value: ['#tkt', '^1050$']}},
          {sel: '[data-key="dlg-case"] .aud', info: true, t: '開案會留紀錄', d: '你（小雯）、時間、店家與目的；之後的每一筆查詢都記在這個案。'},
          {sel: '[data-key="dlg-ok"]', t: '按「開案」', d: '轉到客服支援。'},
          {settle: 800, sel: '[data-key="row-A-link"]', info: true, t: '已轉客服 CS-1050', d: '這一段標成已轉客服，不會再出現待處理的按鈕。'},
          {sel: '[data-key="trail-A"]', info: true, t: '事故經過：開案 CS-1050', d: '小雯為「需改發新連結」2 則開案 CS-1050・毛孩日和。'}
        ]},
      {id: 'template', title: '修改預約提醒的範本並發布', who: '冠宇（寵派最高管理者）', query: {role: 'super', tab: 'tpl', go: null},
        scene: '好幾家店反映飼主常忘了帶牽繩。你要在「預約提醒」的 LINE 內文加一句「記得帶牽繩」，發布成新版本。範本是全部商家共用的，改之前先看清楚會影響哪些通知。',
        outro: '「預約提醒」發布成 v4：LINE 內文加上「記得帶牽繩」，版本紀錄寫著「提醒飼主記得帶牽繩」。只影響發布後新產生的通知；已排程的 46 則照 v3 發送，已送出的不會改；店家附註各店照舊。不能帶入的變數（例如取消理由）系統會擋下；簡訊超過 70 字會拆成兩則、用量加倍。',
        steps: [
          {sel: '[data-key="tk-remind"]', t: '點「預約提醒」', d: '商家可以關的通知，目前 v3。'},
          {sel: '[data-key="vlist"]', info: true, t: '版本紀錄', d: 'v3 9/1 改成「在 某時 要來」，避免前一天 18:00 送出時寫錯「明天」。每一版都寫了改什麼。'},
          {sel: '#t-line', t: '先試試加一個「取消理由」變數', d: '看看系統怎麼說。', fill: {value: '提醒你，{寵物名}在 {日期時間} 要來{服務}。請說明{取消理由}。', label: '…請說明{取消理由}。'}, until: {value: ['#t-line', '取消理由']}},
          {sel: '[data-key="t-line-e"]', info: true, t: '沒有「取消理由」可以帶入', d: '變數只帶系統裡有資料的欄位；取消或拒絕的理由不會帶進通知，免得洩露店家內部的話。'},
          {sel: '#t-line', t: '改成加一句「記得帶牽繩」', d: '只用下面列出的變數。', fill: {value: '提醒你，{寵物名}在 {日期時間} 要來{服務}。記得帶牽繩。\n需要改期，請在「我的預約」操作。', label: '…要來{服務}。記得帶牽繩。'}, until: {value: ['#t-line', '牽繩']}},
          {sel: '[data-key="t-drafttag"]', info: true, t: '草稿・飼主還看不到', d: '發布前怎麼改都不會送出去。'},
          {sel: '[data-key="tpv"]', info: true, t: '飼主會看到', d: '開頭固定【毛孩日和 中山店】，接著「提醒你，毛毛在 10/12（一）14:00 要來洗澡＋剪毛・小型犬。記得帶牽繩。」，最後是店家附註。'},
          {sel: '#t-sms', t: '簡訊也想加：故意寫長一點', d: '看看簡訊的字數限制。', fill: {value: '提醒：{寵物名} {日期時間} {服務}，記得帶牽繩和飼料，查看預約內容與店家地圖 {連結}', label: '…記得帶牽繩和飼料，查看預約內容與店家地圖 {連結}'}, until: {value: ['#t-sms', '店家地圖']}},
          {sel: '[data-key="t-smslen"]', info: true, t: '81 字・2 則', d: '超過 70 字會拆成兩則，每家店的簡訊用量加倍。'},
          {sel: '#t-sms', t: '簡訊改回原本的長度', d: '簡訊只在 LINE 交不出去時才用，保持一則。', fill: {value: '提醒：{寵物名} {日期時間} {服務}。查看 {連結}', label: '提醒：{寵物名} {日期時間} {服務}。查看 {連結}'}, until: {value: ['#t-sms', '^提醒：\\{寵物名\\} \\{日期時間\\} \\{服務\\}。查看 \\{連結\\}$']}},
          {sel: '[data-key="t-smslen"]', info: true, t: '63 字・1 則', d: '回到一則。'},
          {sel: '[data-key="t-pub"]', t: '按「發布 v4」', d: '還要再確認一次。'},
          {sel: '[data-key="dlg-tpub"] .cdl', info: true, t: '發布會影響什麼', d: '全部 7 家商家、發布後新產生的通知。已排程的 46 則照 v3 發送；店家附註不受影響；已送出的不會改。'},
          {sel: '#tnote', t: '寫一句這版改了什麼', d: '之後查版本才看得懂。', fill: {value: '提醒飼主記得帶牽繩', label: '提醒飼主記得帶牽繩'}, until: {value: ['#tnote', '.{4,}']}},
          {sel: '[data-key="dlg-ok"]', t: '按「發布」', d: '新版本立刻生效。'},
          {settle: 800, sel: '[data-key="vlist"]', info: true, t: 'v4：10/9 冠宇・目前', d: '版本紀錄最上面是你剛發布的「提醒飼主記得帶牽繩」。'},
          {sel: '[data-key="tk-remind"]', info: true, t: '預約提醒 v4', d: '左邊清單的版本也更新了。'}
        ]},
      {id: 'rotate', title: '有人離職：輪替 OA 的存取憑證', who: '冠宇（寵派最高管理者）', query: {role: 'super', tab: 'set', go: null},
        scene: '一位工程同事離職了。為了安全，你要輪替寵派 OA 的 Channel access token。輪替後新憑證立刻開始用，舊憑證再撐 10 分鐘讓還在路上的請求完成。完成後再驗證 Webhook 確認一切正常。',
        outro: '你以「人員異動」輪替了 Channel access token：新憑證 10/9 11:20 建立、有效到 2027/4/9，舊憑證 10 分鐘後自動停用（也可以提前停用）。憑證本身不會顯示在任何畫面。Webhook 驗證 LINE 回應 200；兩件事都寫進設定紀錄。',
        steps: [
          {sel: '[data-key="cred"]', info: true, t: '憑證一律不顯示', d: 'Channel secret 只存在伺服器；Access token 只寫建立日期與有效期限（7/14 建立，到 2027/1/14）。'},
          {sel: '[data-key="rot-btn"]', t: '按「輪替憑證」', d: '打開確認視窗。'},
          {sel: '[data-key="dlg-rot"] .lede', info: true, t: '新舊並行 10 分鐘', d: '新憑證立刻開始使用；舊憑證再撐 10 分鐘，之後自動停用。'},
          {sel: '[data-key="rwhy-staff"]', t: '理由選「人員異動」', d: '有人離職。疑似外洩時要選「疑似外洩」。', until: {checked: '[data-key="rwhy-staff"]'}},
          {sel: '[data-key="dlg-ok"]', t: '先直接按「輪替」', d: '看看漏了什麼。'},
          {sel: '[data-key="dlg-rot"] .field:has(#rtype)', info: true, t: '要輸入「輪替」兩個字', d: '打一次確認，避免手滑。輪替會讓所有正在用的連線換憑證。'},
          {sel: '#rtype', t: '輸入「輪替」', d: '兩個字。', fill: {value: '輪替', label: '輪替'}, until: {value: ['#rtype', '^輪替$']}},
          {sel: '[data-key="dlg-ok"]', t: '按「輪替」', d: '會記錄你、時間與理由。'},
          {settle: 800, sel: '[data-key="rot"]', info: true, t: '新舊憑證並行中：剩 9 分多', d: '還在路上的請求用舊憑證也會成功。時間到舊憑證自動停用；確定沒問題也可以提前停用。'},
          {sel: '[data-key="tok"]', info: true, t: '新憑證：10/9 11:20 冠宇建立', d: '有效到 2027/4/9。並行結束前不能再輪替。'},
          {sel: '[data-key="hook-btn"]', t: '按 Webhook 的「驗證」', d: '確認 LINE 打得到寵派。'},
          {settle: 1000, sel: '[data-key="hook-res"]', info: true, t: 'LINE 回應 200', d: '大約 118ms，一切正常。'},
          {sel: '[data-key="slog"]', info: true, t: '設定紀錄多了兩行', d: '冠宇輪替 Channel access token・人員異動；冠宇驗證 Webhook・LINE 回應 200。'}
        ]},
      /* LINE 當機的那一小時 (prototypes/line-down): acts 1 and 4, played inside the director page with ?life=down-*; not listed on this page.
         Act 1 is 11:01 with incident A still going (7 notices so far); act 4 is 11:10, after LINE recovered, with 冠宇's notice on the trail */
      {id: 'life-down-open', life: true, query: {role: 'super', tab: 'q', go: null}, seed: {life: 'down-open'}, title: '第 1 幕：LINE 斷了，先通知商家', who: '冠宇（寵派最高管理者）',
        scene: '10/9（五）11:01。從 10:58 開始，寵派 OA 送給 LINE 的通知一直回應逾時，系統已經開了一起事故。必要通知會自動改傳簡訊；只送 LINE 的先停著。現在什麼都不能重送，但店家很快會接到飼主的電話：先讓所有商家知道發生了什麼。',
        outro: '公告發出去了：所有商家在商家中心的儀表板最上面都會看到「LINE 暫時傳不出去，必要通知已自動改傳簡訊」，也知道只送 LINE 的由寵派重送、時段快到或已開始的預約要自己打電話確認。這件事記在事故經過上。等 LINE 恢復，再來重送並發恢復公告。',
        steps: [
          {sel: '[data-key="oas"]', info: true, t: '最上面：LINE 回應逾時中', d: '10:58 起，必要通知自動改傳簡訊。'},
          {sel: '[data-key="livebar"]', info: true, t: '事故還在進行：已 3 分鐘', d: '現在不能重送，也不用一則一則處理。'},
          {sel: '[data-key="row-A-sms"]', info: true, t: '已改傳簡訊 5 則', d: '預約確認、契約送達這類必要通知，系統已經自動改用簡訊送到飼主手機。'},
          {sel: '[data-key="row-A-retry"]', info: true, t: '只送 LINE 的先停著', d: '商家設定只送 LINE 的預約提醒，等 LINE 恢復後再整群重送；那時預約已經開始的不重送，請商家打電話。'},
          {sel: '[data-key="trail-A"]', info: true, t: '事故經過', d: '10:59 系統偵測到逾時、開立事故；11:00 必要通知改傳簡訊。'},
          {sel: '[data-key="notify-shops"]', t: '按「通知所有商家」', d: '會先讓你看公告內容。'},
          {sel: '[data-key="dlg-notify"] .cdl', info: true, t: '公告給誰', d: '全部商家都收得到，顯示在商家中心的儀表板最上面；飼主看不到。'},
          {sel: '[data-key="nbody"]', info: true, t: '內容可以先改再發', d: '預設寫好了：必要通知已改傳簡訊，只送 LINE 的恢復後由寵派重送，時段快到或已開始的預約請直接打電話確認。'},
          {sel: '[data-key="dlg-ok"]', t: '按「發布公告」', d: '發布後記在這起事故。'},
          {settle: 900, sel: '[data-key="livebar"] .sent', info: true, t: '11:01 已發布商家公告', d: '事故經過也多了一行。下一幕換你當飼主王太太。'}
        ]},
      {id: 'life-down-resend', life: true, query: Q, seed: {life: 'down-resend'}, title: '第 4 幕：恢復後重送', who: '小雯（寵派客服）',
        scene: '10/9（五）11:10。LINE 11:06 恢復了，事故結算出 19 則、4 家店。只送 LINE 的 4 則可以整群重送；一則提醒的預約已經開始，不重送；已經改傳簡訊送到的不必再送，標為已處理。最後發恢復公告，讓商家知道。',
        outro: '4 則重送：2 則 LINE 已收下；汪汪俱樂部的飼主封鎖了寵派 OA，可接回跟費用有關改傳簡訊，提醒依商家設定不改傳。已改傳簡訊的 12 則標為已處理，恢復公告也發了。時段已開始的 1 則、帶簽署連結的 2 則和送不到的 1 則還留著，要請商家打電話、開案或補發。下一幕回到店裡。',
        steps: [
          {sel: '[data-key="trail-A"]', info: true, t: '事故經過：從逾時到恢復', d: '10:59 開立事故、11:01 冠宇發商家公告、11:06 LINE 恢復、11:07 必要通知 11 則已改傳簡訊。'},
          {sel: '[data-key="row-A-retry"]', info: true, t: '可重送：毛孩日和 2・汪汪俱樂部 2', d: '都是只送 LINE、沒有簽署連結、時段還沒到的通知。'},
          {sel: '[data-key="row-A-late"]', info: true, t: '這則不重送：預約 11:00 已經開始', d: '請商家直接打電話。'},
          {sel: '[data-key="resend-A"]', t: '按「重送 4 則」', d: '還要再確認一次。'},
          {sel: '[data-key="dlg-ok"]', t: '按「重送 4 則」', d: '一則一則交給 LINE。'},
          {settle: 1000, timeout: 9000, sel: '[data-key="row-A-gave"]', info: true, t: '已交給 LINE：2 則', d: 'LINE 不回報飼主有沒有看到，所以只寫「已交給 LINE」。汪汪俱樂部的可接回飼主已封鎖，跟費用有關，改傳簡訊。'},
          {sel: '[data-key="mark-A-sms"]', t: '在「已改傳簡訊」按「標已處理」', d: '這 12 則簡訊都送到了。'},
          {sel: '[data-key="dlg-ok"]', t: '按「標已處理」', d: '理由已經選好：簡訊已送到，不必再送。'},
          {settle: 800, sel: '[data-key="row-A-sms"]', info: true, t: '已標處理', d: '理由寫在旁邊，事故經過也記下來了。'},
          {sel: '[data-key="notify-up"]', t: '按「發恢復公告」', d: '11:01 的停機公告還掛在商家儀表板上，換成恢復公告。'},
          {sel: '[data-key="dlg-ok"]', t: '按「發布恢復公告」', d: '內容寫好了：只送 LINE 的由寵派重送，時段快到或已開始的請直接打電話。'},
          {settle: 900, sel: '[data-key="up-sent"]', info: true, t: '恢復公告已發布', d: '事故經過也多了一行。'},
          {sel: '[data-key="row-A-dead"]', info: true, t: '還剩：送不到 1 則', d: '毛孩日和那則 LINE、簡訊、Email 都送不到。下一幕，店裡的櫃台會處理它。'}
        ]}
    ]
  });
})();
