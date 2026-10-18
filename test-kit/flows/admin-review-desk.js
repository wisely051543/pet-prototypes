/* 審核台: hints and guided tours for test mode. Format: test-kit/flows/README.md
   Tours speak the shop's voice: 寵物, not 毛孩. One action or one explanation per step. */
(function () {
  var LEAD = '.conseq .col.lead .cq', ALT = '.conseq .col:not(.lead) .cq';
  PP.register('admin-review-desk', {
    name: '審核台',
    hints: [
      {sel: '[data-key^="q-"]', t: '打開這筆申請', d: '看核准或拒絕之後各會發生什麼', tour: 'approve-rs'},
      {sel: '[data-key="v-a"]', t: '核准', d: '先看清楚左欄的後果，按下後還會再確認一次'},
      {sel: '[data-key="v-r"]', t: '拒絕或另一種結果', d: '拒絕要寫原因，原因會傳給申請的人', tour: 'reject-cx'},
      {sel: '[data-key^="kf-"]', t: '依類別篩選', d: '只看改期、取消、合併、未收或刪除', quiet: true},
      {sel: '[data-key="reqToggle"]', t: '申請內容', d: '展開完整的申請：時段、原因、送出的人', tour: 'merge'},
      {sel: '[data-key="petdata"]', t: '寵物資料', d: '注意事項、病史與最近來店', quiet: true},
      {sel: '[data-key="nav-money"]', t: '收款對帳', d: '收款流水、還沒收齊的錢、匯出 CSV'},
      {sel: '[data-key="nav-audit"]', t: '稽核紀錄', d: '契約證據鏈、驗證雜湊、操作紀錄', tour: 'verify'},
      {sel: '[data-key="nav-cal"]', t: '預約行事曆', d: '前往 M-02，看每張美容台的排程'},
      {sel: '[data-key="nav-cust"]', t: '客戶與寵物', d: '前往 M-03，查客戶、比對重複資料'}
    ],
    tours: [
      {id: 'approve-rs', title: '核准一筆改期申請', who: '林店長', query: {role: 'mgr'},
        scene: '你是毛孩日和中山店的林店長。王太太在 LINE 申請，把毛毛明天（10/10）10:00 的洗澡＋剪毛改到 10/12（一）14:00。你要先看清楚核准和拒絕各會發生什麼，再核准。',
        outro: '毛毛改到 10/12（一）14:00：原時段釋放、新時段鎖住、改期費 NT$240 加到帳單、契約改用新日期的版本，王太太收到 LINE。待處理少了一筆，下一筆自動打開。',
        steps: [
          {sel: '[data-key="q-rs-maomao"]', t: '在待處理清單打開毛毛的改期申請', d: '左邊是所有等你決定的申請，最急的在上面。這筆是王太太 10:05 從 LINE 送出的。'},
          {sel: 'section.det .reqline', info: true, t: '申請內容：10/10 10:00 → 10/12 14:00', d: '同一張美容台 A・阿哲，飼主自己要求的。要看完整的申請，可以按旁邊的「申請內容」。'},
          {sel: '.conseq .checks', info: true, t: '系統先幫你檢查過了', d: '新時段現在有空、阿哲當天有班；契約已讀但還沒簽。'},
          {sel: LEAD, info: true, t: '如果核准：這五件事會真的發生', d: '釋放原時段、鎖住新時段、加收改期費 NT$240（24 小時內改期，服務費 20%）、契約改用新日期的版本要重讀、用 LINE 通知王太太。'},
          {sel: ALT, info: true, t: '如果拒絕：預約保留', d: '不收改期費，契約不變；王太太會收到你寫的原因。'},
          {sel: '[data-key="v-a"]', t: '看完了，按「核准改期」', d: '按鈕旁寫著：核准後不能復原，要再改得請飼主重新申請。'},
          {sel: '.dialog .cdl', info: true, t: '確認視窗：原本、改成、改期費、契約', d: '原本 10/10 10:00–12:00，改成 10/12 14:00–16:00・美容台 A；改期費 NT$240；契約改用新日期的版本。'},
          {sel: '[data-key="dg-ok"]', t: '按「確認核准」', d: '核准後不能復原，所以才再問一次。'},
          {sel: '.pills', info: true, t: '待處理少了一筆：改期 3 → 2', d: '畫面上方跳出「已核准改期・已通知王太太」，右邊自動打開下一筆。'}
        ]},
      {id: 'reject-cx', title: '拒絕一筆取消申請', who: '林店長', query: {role: 'mgr'},
        scene: '櫃台阿凱幫鄭小姐送出柯基小米 10/9 14:00 的有費取消。你剛和鄭小姐通過電話，她其實想改期，所以這筆取消要拒絕，並把原因告訴她。',
        outro: '小米的預約保留在 10/9 14:00，不收取消費，訂金照舊。鄭小姐收到你的原因，阿凱在看板上也看得到。待處理的「取消」從 1 變 0。',
        steps: [
          {sel: '[data-key="q-cx-xiaomi"]', t: '打開小米的取消申請', d: '阿凱 10:40 在櫃台幫鄭小姐送出的，標著「有費取消」。'},
          {sel: LEAD, info: true, t: '如果核准取消：收 NT$160、退 NT$140', d: '24 小時內取消，收服務費 20%；訂金 NT$300 扣掉取消費要退。這次不走這邊。'},
          {sel: ALT, info: true, t: '如果拒絕：預約保留', d: '不收取消費，訂金照舊；鄭小姐和阿凱都會看到你寫的原因。'},
          {sel: '[data-key="v-r"]', t: '按「拒絕取消」', d: '拒絕一定要寫原因。'},
          {sel: '[data-key="pr-0"]', t: '選常用原因「已和飼主確認，改成改期」', d: '點了會填進下面的原因欄，也可以自己改寫。'},
          {sel: '#dg-why', info: true, t: '原因已經填好', d: '這句話會傳給鄭小姐，阿凱在看板上也看得到。原因是必填的，沒寫就不能確認。'},
          {sel: '[data-key="dg-ok"]', t: '按「確認拒絕」', d: '預約保留，不收取消費。'},
          {sel: '.pills', info: true, t: '「取消」從 1 變 0', d: '畫面上方跳出「已拒絕取消・已通知鄭小姐」。'}
        ]},
      {id: 'merge', title: '合併重複的客戶', who: '林店長', query: {role: 'mgr'},
        scene: '何先生和何志明用同一支手機，店裡卻有兩筆客戶資料。阿凱申請把「何先生」併進「何志明」。你要看清楚哪一筆保留、寵物和預約怎麼搬，再核准。',
        outro: '「何先生」停用並寫入稽核紀錄；芋頭、花生和花生今天 14:00 的預約都歸到「何志明」，4 份已簽契約維持原文。這是店內整理，不會傳訊息給飼主。',
        steps: [
          {sel: '[data-key="q-mg-he"]', t: '打開何先生的合併申請', d: '同一支手機 ••••3047 有兩筆客戶資料，阿凱 11:20 送出。'},
          {sel: '.conseq .checks', info: true, t: '系統比對過：可以合併', d: '同一支手機、同一家店，而且只有「何志明」綁 LINE。'},
          {sel: '[data-key="reqToggle"]', t: '按「申請內容」展開', d: '看清楚哪一筆停用、哪一筆保留。'},
          {sel: '.req .swap', info: true, t: '停用「何先生」，保留「何志明」', d: '何先生是現場建檔、沒有 LINE；何志明是 LINE 預約建的，有 LINE。'},
          {sel: '.req .minis', info: true, t: '合併後的寵物：芋頭、花生', d: '寵物資料、注意事項和照片原封不動搬過去。點寵物的臉可以看資料。'},
          {sel: '.req .facts', info: true, t: '未來預約、已簽契約、原因', d: '花生今天 14:00 的預約會改掛；兩人各 2 份已簽契約都保留。阿凱寫的原因：何先生說之前用 LINE 預約過。'},
          {sel: LEAD, info: true, t: '核准後：寵物、預約、契約、通知各怎麼處理', d: '契約的簽署人、PDF、雜湊和時戳都不改寫；之後的通知都傳給「何志明」的 LINE。'},
          {sel: '[data-key="v-a"]', t: '按「核准合併」', d: '合併後不能在這裡拆回。'},
          {sel: '.dialog .cdl', info: true, t: '確認視窗：保留、停用、寵物、預約、契約', d: '再看一次：保留何志明，停用何先生；芋頭、花生；花生 14:00 改掛；4 份契約維持原文。'},
          {sel: '[data-key="dg-ok"]', t: '按「確認合併」', d: '這是店內資料整理，不會傳訊息給飼主。'},
          {sel: '.pills', info: true, t: '「合併・綁定」從 2 變 1', d: '畫面上方跳出「已合併成 何志明」。'}
        ]},
      {id: 'collect', title: '記錄緊急離店的補收', who: '林店長', query: {role: 'mgr'},
        scene: '黃先生 10/6 帶臘腸犬豆豆緊急離店，當時還欠 NT$900。今天他把錢用現金補來了，你要把這筆補收記下來。',
        outro: '豆豆的 NT$900 補收記進收款流水，已經結清，收據用 LINE 傳給黃先生。待處理的「未收」從 1 變 0，「收款對帳」的未結清也會拿掉這筆。',
        steps: [
          {sel: '[data-key="q-ec-doudou"]', t: '打開豆豆的未收款', d: '標著「未收 3 天」。'},
          {sel: 'section.det .reqline', info: true, t: '合計 NT$1,500，已收 600，未收 900', d: '10/6 緊急離店時，只先收了一部分。'},
          {sel: LEAD, info: true, t: '收到錢了：記下方式與金額', d: '全額或部分都可以；收齊就結清，寫進收款流水，並傳收據給黃先生。'},
          {sel: ALT, info: true, t: '還沒收到：記下聯絡', d: '記這次怎麼聯絡、結果如何，天數繼續算。這次黃先生把錢補來了，所以走左邊。'},
          {sel: '[data-key="v-a"]', t: '按「記錄補收 NT$900」', d: '會打開補收視窗。'},
          {sel: '[data-key="pm-現金"]', t: '收款方式選「現金」', d: '轉帳要填末五碼，其他方式要寫說明。金額預設是全額 NT$900。'},
          {sel: '.dialog .reason', info: true, t: '將記錄：補收・現金・NT$900・經手 林店長', d: '寫入後不能刪除，要更正得用退款。'},
          {sel: '[data-key="dg-ok"]', t: '按「收款」', d: '寫進收款流水。'},
          {sel: '.pills', info: true, t: '「未收」從 1 變 0', d: '畫面上方跳出「已收 NT$900・豆豆已結清・收據已傳給黃先生」。'}
        ]},
      {id: 'verify', title: '驗證一份已簽契約', who: '林店長', query: {role: 'mgr'},
        scene: '蔡先生問：他 10/9 簽的契約，之後有沒有被改過？你要打開阿福那份契約的證據鏈，一段一段看，最後重新驗證 PDF 的雜湊。',
        outro: '阿福的契約證據鏈六段都完整，重新計算的雜湊和簽署當時一致：PDF 一個字都沒改過。這次驗證本身也寫進了操作紀錄。',
        steps: [
          {sel: '[data-key="nav-audit"]', t: '左邊選單按「稽核紀錄」', d: '每份已簽契約的證據鏈都在這裡。'},
          {sel: '.clist', info: true, t: '已簽契約清單', d: '一份契約一行：寵物、飼主、簽署時間、版本；右邊寫「完整」或缺了幾段。'},
          {sel: '[data-key="c-C-1009-0412"]', t: '打開阿福的契約', d: '蔡先生 10/9 10:52 簽的 v3。'},
          {sel: '.chain-h', info: true, t: '最上面：證據鏈完整', d: '契約編號、簽約人手機末四碼、分店和簽署時間。'},
          {sel: 'ol.chain > li:nth-child(1)', info: true, t: '第 1 段：契約版本快照', d: '簽的是 v3（10/1 生效），12 條、重點條款 3 條。條文以當時的版本為準。'},
          {sel: 'ol.chain > li:nth-child(2)', info: true, t: '第 2 段：傳送與審閱', d: '10/7 傳到 LINE；蔡先生讀了 7 分 48 秒、讀到最後，三條重點條款都勾了。'},
          {sel: 'ol.chain > li:nth-child(3)', info: true, t: '第 3 段：簽名', d: '飼主本人手寫，在中山店櫃台平板 2 簽的。'},
          {sel: 'ol.chain > li:nth-child(4)', info: true, t: '第 4 段：簡訊驗證', d: '驗證碼傳到 ••••1180，10:53 通過。'},
          {sel: 'ol.chain > li:nth-child(5)', info: true, t: '第 5 段：PDF 正本和雜湊', d: 'SHA-256 雜湊是這份 PDF 的指紋：內容改一個字，指紋就完全不同。'},
          {sel: 'ol.chain > li:nth-child(6)', info: true, t: '第 6 段：可信時間戳記', d: '第三方時戳服務記下簽署完成的時間，證明這份 PDF 當時就存在。'},
          {sel: '[data-key="verify"]', t: '按「驗證雜湊」', d: '重新計算 PDF 的雜湊，和簽署當時比對。'},
          {sel: '#vr', info: true, t: '雜湊一致', d: '這份 PDF 和簽署當時一模一樣。誰、幾點驗證的，也寫進了操作紀錄。'}
        ]},
      /* 一份契約的一生 (prototypes/contract-life): act 6, played inside that page with ?life=ct-verify (10/10 19:30) */
      {id: 'life-ct-verify', life: true, seed: {life: 'ct-verify'}, title: '第 6 幕：驗證毛毛簽的第 4 版', who: '陳老闆（店家管理者）', query: {role: 'admin', page: 'audit'},
        scene: '10/10（六）晚上 7:30，打烊了。今天早上王太太替毛毛簽了第 4 版，是毛孩日和依平台 2026-10 簽出的第一份。你想打開它的證據鏈，一段一段看，最後重新驗證 PDF 的雜湊，確定存下來的正本和簽的時候一樣。',
        outro: '毛毛的第 4 版證據鏈六段都完整：版本快照 v4（依平台 2026-10，重點條款 6 條）、昨晚在 LINE 的即時審閱、平板手寫簽名、簡訊驗證、PDF 正本、可信時間戳記。重新計算的雜湊 1ff3…d2e3 和簽署當時一致，這次驗證也寫進了操作紀錄。',
        steps: [
          {sel: '.clist', info: true, t: '已簽契約清單', d: '一份契約一行：寵物、飼主、簽署時間、版本。最上面是毛毛今天早上簽的 v4。'},
          {sel: '[data-key="c-C-2610-0431"]', t: '打開毛毛的契約', d: '王太太 10/10 09:56 簽的 v4。'},
          {sel: '.chain-h', info: true, t: '最上面：證據鏈完整', d: '契約編號 C-2610-0431、簽約人手機末四碼 8821、中山店、簽署時間。'},
          {sel: 'ol.chain > li:nth-child(1)', info: true, t: '第 1 段：契約版本快照', d: '簽的是 v4，10/9 生效、依平台 2026-10：13 條，重點條款 6 條。條文以當時的版本為準。'},
          {sel: 'ol.chain > li:nth-child(2)', info: true, t: '第 2 段：傳送與審閱', d: '10/9 11:20 第 4 版傳到 LINE，離預約不到 1 天，所以昨晚是計時的即時審閱：讀到最後，六條重點條款都勾了。'},
          {sel: 'ol.chain > li:nth-child(3)', info: true, t: '第 3 段：簽名', d: '飼主本人手寫，在中山店櫃台平板簽的。'},
          {sel: 'ol.chain > li:nth-child(4)', info: true, t: '第 4 段：簡訊驗證', d: '驗證碼傳到 ••••8821，09:56 通過。'},
          {sel: 'ol.chain > li:nth-child(5)', info: true, t: '第 5 段：PDF 正本和雜湊', d: 'SHA-256 雜湊是這份 PDF 的指紋：內容改一個字，指紋就完全不同。'},
          {sel: 'ol.chain > li:nth-child(6)', info: true, t: '第 6 段：可信時間戳記', d: '第三方時戳服務記下 09:56:38，證明這份 PDF 當時就存在。'},
          {sel: '[data-key="verify"]', t: '按「驗證雜湊」', d: '重新計算 PDF 的雜湊，和簽署當時比對。'},
          {sel: '#vr', info: true, t: '雜湊一致', d: '這份 PDF 和簽署當時一模一樣。19:32 由你驗證，也寫進了操作紀錄。'}
        ]},
      /* 郭太太的刪除申請 (prototypes/erase): act 3; the page writes role, page and item back to the address, so the seed carries them */
      {id: 'life-del-approve', life: true, query: {role: 'mgr', page: 'queue', item: 'del-zhou'}, seed: {life: 'del-approve'}, title: '第 3 幕：核准刪除，去識別化', who: '林店長',
        scene: '10/9（五）11:22，審核台打開了郭太太的個資刪除請求。糖糖 10/5 洗完了，沒有之後的預約，也沒有欠款。先看清楚核准和不刪除各會發生什麼，再核准。',
        outro: '郭太太的個資去識別化了：姓名、手機、LINE 綁定和糖糖的資料找不回來；2 筆預約只留日期和金額；2 份已簽契約依法保留。郭太太收到 LINE「刪除已完成」，之後綁定解除。操作寫進稽核紀錄。',
        steps: [
          {sel: '.conseq .checks', info: true, t: '系統先幫你檢查過了', d: '是郭太太本人用 LINE 綁定送出的；糖糖之後沒有預約；沒有未結清的錢。三項都過了，才能核准。'},
          {sel: LEAD, info: true, t: '如果核准：這五件事會發生', d: '姓名、手機、LINE 綁定去識別化；糖糖的資料也去識別化；2 筆預約只留日期和金額；2 份契約依法保留；LINE 通知郭太太「刪除已完成」。'},
          {sel: ALT, info: true, t: '如果不刪除：一定要寫法定理由', d: '例如有未結清款項、無法確認是本人。郭太太會收到理由，可以再申請。拒絕也算在期限內給了結果。'},
          {sel: '[data-key="v-a"]', t: '按「核准刪除」', d: '按鈕旁寫著：去識別化後找不回來，這一步不能復原。'},
          {sel: '.dialog .cdl', info: true, t: '確認視窗：郭太太・糖糖', d: '保留 2 筆預約的金額和 2 份契約，其他去識別化。'},
          {sel: '[data-key="dg-ok"]', t: '按「確認刪除」', d: '不能復原，所以才再問一次。'},
          {sel: '.pills', info: true, t: '待處理少了一筆刪除', d: '畫面上方跳出「已去識別化・已通知飼主・2 份契約依法保留」。下一幕換回郭太太的手機。'}
        ]},
      {id: 'life-lc-approve', life: true, query: {role: 'mgr', page: 'queue', item: 'cx-maomao'}, seed: {life: 'lc-approve'}, title: '第 2 幕：核准有費取消', who: '林店長',
        scene: '10/9（五）11:10。王太太 10:50 在 LINE 取消了毛毛明天 10:00 的洗澡＋剪毛，離預約不到 24 小時。審核台打開了這筆。先看清楚核准和拒絕各會發生什麼，再核准。',
        outro: '毛毛 10/10 10:00 的預約取消了：美容台 A 那兩小時空出來，取消費 NT$240 照政策記到帳單。王太太沒有先付錢，所以這筆記在「待收」，由店裡聯絡她收取；她收到 LINE「預約已取消」，到店前提醒也停了。下一幕還是你，處理今天早上沒來的湯圓。',
        steps: [
          {sel: 'section.det .reqline', info: true, t: '王太太 10:50 從 LINE 取消', d: '毛毛 10/10（六）10:00–12:00，美容台 A・阿哲。原因：臨時有事。'},
          {sel: LEAD, info: true, t: '如果核准：時段釋放、收 NT$240', d: '24 小時內取消，收服務費 20%；王太太沒有付訂金，所以這 NT$240 要另外收。'},
          {sel: ALT, info: true, t: '如果拒絕：預約保留', d: '不收取消費；王太太會收到你寫的原因，之後可以再申請。'},
          {sel: '[data-key="v-a"]', t: '按「核准取消」', d: '按鈕旁寫著：核准後不能復原，要再來請重新預約。'},
          {sel: '.dialog .cdl', info: true, t: '確認視窗：取消費 NT$240', d: '已收訂金 NT$0，要收 NT$240。'},
          {sel: '[data-key="dg-ok"]', t: '按「確認核准」', d: '核准後不能復原，所以才再問一次。'},
          {sel: '.pills', info: true, t: '待處理少了一筆取消', d: '畫面上方跳出「已取消・取消費 NT$240 記到待收」。'}
        ]}
    ]
  });
})();
