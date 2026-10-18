/* M-07 契約模板: hints and guided tours for test mode. Format: test-kit/flows/README.md
   Tours speak the shop's voice: 寵物, not 毛孩 (the owner preview quotes the contract as written). One action or one explanation per step. */
(function () {
  var Q = {role: 'admin', t: null, v: null, off: null, fail: null, susp: null};
  var open = {sel: '[data-key="t-groom"]', t: '打開「犬貓美容定型化契約」', d: '列表上寫著「使用中・第 3 版」，還有一份第 4 版草稿。'};

  PP.register('m07-contract-templates', {
    name: '契約模板',
    minWidth: 720,   /* 手機上只能查看 */
    hints: [
      {sel: '[data-key^="t-"]', t: '打開模板', d: '條文、確認欄位、適用服務、版本與發布', tour: 'review'},
      {sel: '[data-key="new"]', t: '新增模板', d: '從平台範本開始，應記載條款自動帶入'},
      {sel: '[data-key^="qr-"]', t: '契約公告 QR', d: '貼在櫃台，飼主掃了就能讀目前的契約', quiet: true},
      {sel: '[data-key="pv"]', t: '預覽飼主畫面', d: '看飼主在手機或平板上讀到的樣子', tour: 'preview'},
      {sel: '[data-key="pub"]', t: '發布新版', d: '先看哪些預約會換成新版、誰會收到通知', tour: 'publish'},
      {sel: '[data-key="diff"]', t: '標出差異', d: '和上一個版本比，新增、修改、刪除了什麼', quiet: true},
      {sel: '[data-key^="e-s-"]', t: '修改補充條款', d: '點條文就能直接改，會自動存檔', tour: 'edit'},
      {sel: '[data-key^="v-"]', t: '版本', d: '每個版本簽了幾份；已簽的人保留簽的那一版', quiet: true},
      {sel: '[data-key="void"]', t: '作廢模板', d: '停止新預約使用；已簽的契約保留', quiet: true},
      {sel: '[data-key="qr-print"]', stub: true}
    ],
    tours: [
      {id: 'review', title: '看懂第 4 版草稿改了什麼', who: '陳老闆（店家管理者）', query: Q,
        scene: '你上週開始改美容契約，第 4 版草稿還沒發布。發布前，你想從頭看一遍：哪些條文是平台規定不能改的、你自己加了什麼、改了什麼、刪了什麼。',
        outro: '第 4 版和第 3 版比：補充條款新增「長毛打結剃短」、修改「皮膚與跳蚤」、刪除「停車」，簽約前多問一個「毛髮狀況」。應記載條款和 5 條重點條款由平台範本帶入，店家不能改。',
        steps: [
          open,
          {sel: '.sheet .dsum', info: true, t: '和第 3 版相比：新增 1、修改 1、刪除 1、確認欄位 +1', d: '草稿的邊框是虛線，代表還沒發布。'},
          {sel: '.sheet .blk:first-of-type', info: true, t: '應記載條款：平台範本帶入，不能修改', d: '農業部 114.6.9 範本的 9 條。框起來的數字（24 小時、20%）取自「取消與改期政策」。'},
          {sel: '.sheet .blk:first-of-type .ktag', group: true, info: true, t: '5 條重點條款，飼主要逐條勾', d: '取消與改期費用、健康狀況告知、保定與攻擊行為、服務中意外與緊急就醫授權、接回與逾時。這是平台指定的。'},
          {sel: '.sheet .blk:first-of-type .sumln', info: true, t: '飼主簽名時會看到的一句話', d: '牽涉錢或授權的重點條款，寵派會依政策數字算出一句白話，飼主簽名時看到；這裡以 NT$1,200 的預約為例。店家不能改，它會一起存進版本快照。'},
          {sel: '.sup.chg', info: true, t: '補充二「皮膚與跳蚤」：修改', d: '加了「拍照告知你，經你同意後加做除蚤」、「未經同意不會加做」，費用改成加收 200 元。'},
          {sel: '.sup.add', info: true, t: '補充三「長毛打結剃短」：新增', d: '打結無法梳開時，先拍照用 LINE 告知，經同意後剃短。'},
          {sel: '.sup.gone', info: true, t: '刪除了第 3 版的「停車」', d: '劃掉的條文還看得到，按「復原」可以拿回來。'},
          {sel: '.flds', info: true, t: '簽約前要問飼主的欄位', d: '鎖頭的 7 個是規範要求，一定要問；這版新增了「毛髮狀況（打結程度）」。'},
          {sel: 'aside.rail-c ol.spine', info: true, t: '版本：已簽的人保留簽的那一版', d: '第 3 版 10/1 起使用中、已簽 86 份；第 2、1 版的簽署都還保留。'},
          {sel: '[data-key="v-3"]', t: '按「第 3 版」', d: '看看目前使用中的版本。'},
          {sel: '.sheet', info: true, t: '已發布的版本不能修改', d: '第 3 版沒有任何輸入框。要改，只能從某一版建草稿；現在已經有第 4 版草稿，所以不能再建。'}
        ]},
      {id: 'edit', title: '修改一條補充條款', who: '陳老闆（店家管理者）', query: Q,
        scene: '你覺得「長毛打結剃短」寫太長，想改短一點，也想把它列為重點條款，讓飼主簽約前一定要勾。草稿會自動存檔。',
        outro: '「長毛打結剃短」改成一句話，並列為重點條款：重點條款從 5 條變 6 條，飼主簽約前要逐條勾選。草稿自動存好了，還沒發布，飼主看到的仍是第 3 版。',
        steps: [
          open,
          {sel: '.sup.add', info: true, t: '補充三「長毛打結剃短」', d: '這版新增的條文。點條文就能直接修改。'},
          {sel: '[data-key="e-s-mat"]', t: '點這條條文', d: '條文會變成可以輸入的框。'},
          {sel: '#sb-s-mat', t: '把內容改短', d: '補充條款不得牴觸應記載條款，也不能加重飼主的責任。系統不會檢查內容，發布前請自己再讀一次。', fill: {value: '毛髮嚴重打結時，店家先拍照告知你，經你同意後剃短。', label: '毛髮嚴重打結時，店家先拍照告知你，經你同意後剃短。'}, until: {value: ['#sb-s-mat', '經你同意後剃短。$']}},
          {sel: '.sheet .meta', info: true, settle: 900, t: '草稿自動存檔', d: '上面寫著幾點自動存檔。不用按儲存。'},
          {sel: '[data-key="k-s-mat"]', t: '按「列為重點條款」', d: '重點條款飼主要逐條勾「我已讀完這一條」。'},
          {sel: '.panel.pub .checks', info: true, t: '重點條款變成 6 條', d: '發布前的檢查清單會跟著更新。'}
        ]},
      {id: 'publish', title: '發布第 4 版', who: '陳老闆（店家管理者）', query: Q,
        scene: '第 4 版草稿看過了，你要發布。發布前先看清楚：哪些還沒簽的預約會換成新版、誰會收到通知、今天到店的客人怎麼辦。已經簽了的不會被換掉。',
        outro: '第 4 版立即生效：7 筆未簽的預約改用第 4 版（連結不變），已讀待簽的楊小姐和王太太收到 LINE 請她們再讀一次，今天到店的 4 筆在平板上會看到第 4 版，已簽的 23 筆保留簽的那一版。發布紀錄和第 4 版快照寫入稽核。',
        steps: [
          open,
          {sel: '.panel.pub .checks', info: true, t: '發布前的檢查都過了，還有一個提醒', d: '應記載條款齊全、補充條款 3 條都有內容、重點條款 5 條、適用服務 4 項。補充二寫了「加收 200 元」，系統問你要不要列為重點條款；不列也能發布。'},
          {sel: '.panel.pub .eff', info: true, t: '生效時間：立即', d: '也可以選明天 00:00，讓今天到店的客人繼續用第 3 版。'},
          {sel: '.panel.pub ul.imp', info: true, t: '發布後會影響哪些預約', d: '7 筆未簽的換成新版；其中 2 筆已讀待簽要重讀；4 筆今天到店；23 筆已簽的保留簽的那一版。'},
          {sel: '[data-key="who"]', t: '按「看是哪 9 筆預約」', d: '一筆一筆列出來。'},
          {sel: '.appts', info: true, t: '受影響的 9 筆預約', d: '麻糬、花生、歐告、可樂今天到店；毛毛明天；布丁、葡萄、布朗、雪球之後。可樂和毛毛已經讀過，要重讀。'},
          {sel: '[data-key="pub"]', t: '按「發布第 4 版」', d: '發布後不能修改，要改只能再建草稿。'},
          {sel: '.dialog .cdl', info: true, t: '確認視窗：生效、修改、換新版、通知、稽核', d: '紅色的確認鈕：這會換掉飼主還沒簽的契約。'},
          {sel: '[data-key="dg-ok"]', t: '按「確認發布」', d: '發布紀錄和第 4 版快照會寫入稽核。'},
          {settle: 1000, sel: 'aside.rail-c > section.panel:nth-child(2)', info: true, t: '第 4 版已發布', d: '逐項打勾：未簽的 7 筆改用第 4 版、楊小姐和王太太收到 LINE、今天到店的 4 筆看到第 4 版、已簽的 23 筆保留、寫入稽核紀錄。'},
          {sel: 'aside.rail-c ol.spine', info: true, t: '第 4 版：使用中', d: '第 3 版的期間變成 10/1 – 10/9，已簽的 86 份照舊有效。'}
        ]},
      {id: 'preview', title: '預覽飼主看到的契約', who: '陳老闆（店家管理者）', query: Q,
        scene: '發布前，你想用飼主的角度讀一次第 4 版：在 LINE 手機上長什麼樣子、重點條款怎麼勾、在店內平板上又是什麼樣子。預覽裡的勾選不會被記錄。',
        outro: '飼主讀契約時，5 條重點條款都要勾「我已讀完這一條」，「我已閱讀並同意」才會亮。手機（LINE）和店內平板看到的是同一份內容；預覽裡的勾選不會被記錄。',
        steps: [
          open,
          {sel: '[data-key="pv"]', t: '按「預覽飼主畫面」', d: '會打開一個手機的框，裡面是飼主在 LINE 看到的樣子。'},
          {sel: '.pvw .o-note', info: true, t: '預覽的勾選不會記錄', d: '你可以照飼主的方式操作一次。'},
          {sel: '.pvw .o-go', info: true, t: '「我已閱讀並同意」還不能按', d: '下面寫著還有 5 條重點條款沒勾。'},
          {sel: '.pvw .o-key:has([data-key="pvk-c2"])', group: true, t: '第三條 取消與改期費用：勾「我已讀完這一條」', d: '24 小時前取消或改期不收費；24 小時內最多收服務費 20%。', until: {checked: '[data-key="pvk-c2"]'}, demo: {click: '[data-key="pvk-c2"]'}},
          {sel: '.pvw .o-key:has([data-key="pvk-c3"])', group: true, t: '第四條 健康狀況告知：勾「我已讀完這一條」', d: '飼主要如實告知病史、過敏、攻擊行為和近期用藥；店家發現身體不適會暫停服務，沒做的部分不收錢。', until: {checked: '[data-key="pvk-c3"]'}, demo: {click: '[data-key="pvk-c3"]'}},
          {sel: '.pvw .o-key:has([data-key="pvk-c4"])', group: true, t: '第五條 保定與攻擊行為：勾「我已讀完這一條」', d: '有攻擊行為時可以用頭套等工具保定，會寫在服務紀錄裡，以不造成傷害為原則。', until: {checked: '[data-key="pvk-c4"]'}, demo: {click: '[data-key="pvk-c4"]'}},
          {sel: '.pvw .o-key:has([data-key="pvk-c5"])', group: true, t: '第六條 服務中意外與緊急就醫授權：勾「我已讀完這一條」', d: '受傷或突發疾病會立刻通知飼主；聯絡不到又很緊急時，可以送到附近動物醫院。店家的過失由店家負擔。', until: {checked: '[data-key="pvk-c5"]'}, demo: {click: '[data-key="pvk-c5"]'}},
          {sel: '.pvw .o-key:has([data-key="pvk-c6"])', group: true, t: '第七條 接回與逾時：勾「我已讀完這一條」', d: '服務完成會用 LINE 通知；超過約定接回時間 2 小時，可能收逾時照護費。', until: {checked: '[data-key="pvk-c6"]'}, demo: {click: '[data-key="pvk-c6"]'}},
          {sel: '[data-key="pv-agree"]', info: true, t: '「我已閱讀並同意」亮了', d: '5 條都勾了，飼主才能同意。'},
          {sel: '[data-key="pv-tablet"]', t: '上面切到「店內平板」', d: '飼主到店時在櫃台平板簽名，看到的是同一份內容。'},
          {sel: '.pvw .dev', info: true, t: '店內平板的樣子', d: '畫面比較寬，內容一樣。看完按右上角的叉叉或 Esc 關掉預覽。'}
        ]},
      /* 一份契約的一生 (prototypes/contract-life): acts 2 and 3, played inside that page with ?life=ct-review / ct-publish (10/9 11:20; 寵派
         published 美容契約 2026-10 at 09:10 and 陳老闆 built 第 4 版 on it at 09:40); not listed on this page */
      {id: 'life-ct-review', life: true, seed: {life: 'ct-review'}, title: '第 2 幕：看第 4 版改了什麼', who: '陳老闆（店家管理者）', query: Q,
        scene: '10/9（五）11:15。早上 9:10 寵派通知你：美容契約的平台範本更新成 2026-10。你 9:40 以新範本建了第 4 版草稿，把自己的補充條款也改了。發布前，你想從頭看一遍：哪些是平台 2026-10 帶來、你不能改的，哪些是你自己改的。',
        outro: '第 4 版依平台範本 2026-10：應記載條款修改 2 條（疫苗紀錄、個資）、新增第十條審閱期間，重點條款變成 6 條，這些店家都不能改。你自己的補充條款新增「長毛打結剃短」、修改「皮膚與跳蚤」、刪除「停車」，簽約前多問「毛髮狀況」。第 3 版依 2025-06，已發布的版本不能修改。',
        steps: [
          open,
          {sel: '.sheet .sh-h', info: true, t: '第 4 版草稿：依平台範本 2026-10', d: '今天 09:40 你以新範本建的。草稿的邊框是虛線，代表還沒發布，飼主看不到。'},
          {sel: '.sheet .dsum', info: true, t: '和第 3 版相比', d: '平台範本修改 2 條、新增 1 條；你自己的補充條款新增 1、修改 1、刪除 1；確認欄位 +1。'},
          {sel: '.sheet .blk:first-of-type .seal.chg', group: true, info: true, t: '平台 2026-10 改的 3 條', d: '第四條補上疫苗施打紀錄、第九條個資在契約結束後也不能挪用、新增第十條審閱期間。條文旁寫著「店家不能改」。'},
          {sel: '.sheet .blk:first-of-type .ktag', group: true, info: true, t: '6 條重點條款，飼主要逐條勾', d: '原本 5 條，加上第十條審閱期間。這是平台指定的，你不能拿掉。'},
          {sel: '.sup.chg', info: true, t: '補充二「皮膚與跳蚤」：你改的', d: '加了「拍照告知你，經你同意後加做除蚤」、「未經同意不會加做」，費用改成加收 200 元。'},
          {sel: '.sup.add', info: true, t: '補充三「長毛打結剃短」：你加的', d: '打結無法梳開時，先拍照用 LINE 告知，經同意後剃短。'},
          {sel: '.sup.gone', info: true, t: '刪除了第 3 版的「停車」', d: '劃掉的條文還看得到，按「復原」可以拿回來。'},
          {sel: '.flds', info: true, t: '簽約前要問飼主的欄位', d: '鎖頭的 7 個是規範要求；這版新增了「毛髮狀況（打結程度）」。'},
          {sel: 'aside.rail-c ol.spine', info: true, t: '版本：已簽的人保留簽的那一版', d: '第 3 版 10/1 起使用中、已簽 86 份。王太太 10/8 晚上讀過第 3 版，還沒簽。'},
          {sel: '[data-key="v-3"]', t: '按「第 3 版」', d: '看看目前使用中的版本。'},
          {sel: '.sheet .sh-h', info: true, t: '第 3 版：依平台範本 2025-06', d: '已發布的版本不能修改，也沒有第十條審閱期間。下一幕，你要發布第 4 版。'}
        ]},
      {id: 'life-ct-publish', life: true, seed: {life: 'ct-publish'}, title: '第 3 幕：發布第 4 版', who: '陳老闆（店家管理者）', query: Q,
        scene: '10/9（五）11:20。第 4 版看過了，你要發布。發布前先看清楚：哪些還沒簽的預約會換成第 4 版、誰會收到通知。王太太幫毛毛約了明天 10:00 的洗澡＋剪毛，她讀過第 3 版還沒簽，換版後要再讀一次。',
        outro: '第 4 版立即生效：未簽的 7 筆改用第 4 版（連結不變），已讀待簽的楊小姐和王太太收到 LINE 請她們再讀一次，已簽的 23 筆保留簽的那一版。採用分布上，毛孩日和移到了 2026-10。下一幕換你當王太太。',
        steps: [
          open,
          {sel: '.panel.pub .checks', info: true, t: '發布前的檢查都過了，還有一個提醒', d: '應記載條款齊全（平台範本 10 條）、補充條款 3 條都有內容、重點條款 6 條、適用服務 4 項。補充二寫了「加收 200 元」，系統問你要不要列為重點條款；不列也能發布。'},
          {sel: '.panel.pub .eff', info: true, t: '生效時間：立即', d: '也可以選明天 00:00。毛毛是明天早上，兩種都會換成第 4 版。'},
          {sel: '.panel.pub ul.imp', info: true, t: '發布後會影響哪些預約', d: '7 筆未簽的換成新版；其中 2 筆已讀待簽要重讀；23 筆已簽的保留簽的那一版。'},
          {sel: '[data-key="who"]', t: '按「看是哪 9 筆預約」', d: '一筆一筆列出來。'},
          {sel: '.appts', info: true, t: '毛毛：明天 10:00・已讀待簽', d: '王太太 10/8 晚上讀過第 3 版。換成第 4 版後，她讀過的不算數，要再讀一次。'},
          {sel: '[data-key="pub"]', t: '按「發布第 4 版」', d: '發布後不能修改，要改只能再建草稿。'},
          {sel: '.dialog .cdl', info: true, t: '確認視窗：生效、修改、換新版、通知、稽核', d: '紅色的確認鈕：這會換掉飼主還沒簽的契約。'},
          {sel: '[data-key="dg-ok"]', t: '按「確認發布」', d: '發布紀錄和第 4 版快照會寫入稽核。'},
          {settle: 1000, sel: 'aside.rail-c > section.panel:nth-child(2)', info: true, t: '第 4 版已發布', d: '楊小姐和王太太收到 LINE：契約更新，到店前請再讀一次。'},
          {sel: 'aside.rail-c ol.spine', info: true, t: '第 4 版：使用中', d: '第 3 版的期間變成 10/1 – 10/9，已簽的 86 份照舊有效。'}
        ]}
    ]
  });
})();
