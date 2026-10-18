/* 產業數據（寵派後台）: hints and guided tours for test mode. Format: test-kit/flows/README.md
   思妤・資料 reads the report preview and why cells are hidden (fewer than 5 shops, or hidden along with them), sees why a
   period cannot be exported, reads 招商資料 at the demo scale (?scale=big, 35 shops, all numbers fictional), and exports it
   with a purpose. One action or one explanation per step. The prototype rewrites ?go= away, so tours ask for it to be
   absent. On a phone (under 720 px) there is no export button, so the export tour needs a wide screen. */
(function () {
  var D = {role: 'data', go: null, scale: null};
  var BIG = {role: 'data', go: null, scale: 'big'};

  PP.register('industry-data', {
    name: '產業數據',
    hints: [
      {sel: '[data-key="legend"]', t: '顯示與隱藏的格子', d: '不足 5 家店的格子一律隱藏；點被隱藏的格子看原因', tour: 'read'},
      {sel: '[data-key="per"]', t: '期間', d: '單月、10 月到今天、第三季；有些期間整份不能匯出', tour: 'period'},
      {sel: '[data-key="tpl-biz"]', t: '招商資料', d: '地區需求、服務供給、熱門服務，給招商洽談用', tour: 'biz'},
      {sel: '[data-key="x-open"]', t: '匯出這份報表', d: '要選用途、寫說明；檔案不含店名與任何個資，會記在稽核中心', tour: 'export'},
      {sel: '[data-key="tpl-custom"]', t: '自訂報表', d: '自己挑要放哪幾張表', quiet: true},
      {sel: '[data-key="log-audit"]', t: '到稽核中心看完整紀錄', d: '每一次匯出都記在稽核中心', quiet: true}
    ],
    tours: [
      {id: 'read', title: '看懂投資人摘要：為什麼很多格子被隱藏', who: '思妤（寵派資料）', query: D,
        scene: '你是寵派的資料分析。投資人摘要只統計同意分享資料的店，而且每一格至少要來自 5 家店才顯示，免得看的人猜出是哪幾家店。寵派現在只有 7 家店在營業，所以很多格子都被隱藏。你想看懂 9 月的報表預覽。這個引導只看不改。',
        outro: '9 月投資人摘要涵蓋 7 家店，只顯示 3 格：9 月預約 1,963、美容 1,158、住宿 594。其他格子不足 5 家店，一律隱藏；被隱藏的格子不排名，以免名次透露大小；一張表若每格都會被總計減出來，就整張隱藏。匯出檔和預覽一模一樣，不含店名、統編、地址與任何飼主、寵物資料。',
        steps: [
          {sel: '[data-key="cov"]', info: true, t: '涵蓋 7 家店', d: '寵派共 12 家店，5 家還沒開始營業。每一格至少要來自 5 家店才會顯示。'},
          {sel: '[data-key="legend"]', info: true, t: '顯示 3 格、不足 5 家 12 格', d: '斜線的是不足 5 家，虛線的是「連帶隱藏」。'},
          {sel: '[data-key="row-trend-3"]', info: true, t: '9 月：1,963 筆預約・7 家', d: '數字旁邊寫它來自幾家店。'},
          {sel: '[data-key="row-trend-0"]', info: true, t: '6 到 8 月：不足 5 家', d: '那時候營業的店還不到 5 家，數字不顯示。'},
          {sel: '[data-key="row-hot-0"]', info: true, t: '熱門服務第 1 名：美容 1,158', d: '第 2 名住宿 594，剛好 5 家店。'},
          {sel: '[data-key="row-hot-2"]', t: '點「安親・不足 5 家」', d: '看看為什麼隱藏。'},
          {sel: '[data-key="why-hot-2"]', info: true, t: '為什麼不輸出', d: '數字背後的店這麼少，看的人可能猜得出是哪幾家。匯出檔裡這格只寫「已隱藏」，不留數字，也不留店數。'},
          {sel: '[data-key="sec-hot"] .secn', info: true, t: '被隱藏的格子不排名', d: '照固定順序排在後面，用「–」代替名次，以免名次透露大小。'},
          {sel: '[data-key="allhid-act"]', info: true, t: '商家活躍度：整張隱藏', d: '每格都不足 5 家，或一顯示就能被總計減出來。匯出檔照樣列出每一格，只寫「已隱藏」。'},
          {sel: '[data-key="doc"] .dfoot', info: true, t: '匯出檔不含任何個資', d: '不含店名、統編、地址與任何飼主、寵物資料；每一格都和這裡的預覽一樣。'}
        ]},
      {id: 'period', title: '換期間：為什麼有些期間整份不能匯出', who: '思妤（寵派資料）', query: D,
        scene: '董事會想看第三季（7–9 月）的數字。你把期間換成第三季，卻發現整份報表不能匯出。你想弄懂為什麼，以及該改匯出哪一段。',
        outro: '第三季整份不能匯出：7、8 月都不到 5 家店，整季的總數一旦輸出，拿 9 月的報表相減就算得出 7、8 月。6 月營業的店不到 5 家，也整份不能匯出。10 月可以匯出，但只算到 10/9 11:00。請改匯出單月。',
        steps: [
          {sel: '#per', t: '期間選「第三季（7–9 月）」', d: '7、8、9 三個月合在一起。', fill: {value: 'q3', label: '第三季（7–9 月）'}, until: {value: ['#per', '^q3$']}},
          {sel: '[data-key="blocked"]', info: true, t: '這份報表不能匯出', d: '7、8 月都不到 5 家店。整季的總數一輸出，拿 9 月的報表相減，就算得出 7 月、8 月。'},
          {sel: '[data-key="doc"]', info: true, t: '三張表都「不輸出」', d: '連預覽也不給看，免得截圖流出去。'},
          {minWidth: 720, sel: '[data-key="xcard"], [data-key="xstrip"]', info: true, t: '匯出按鈕也停用了', d: '「這段期間不能匯出，原因寫在報表上」。'},
          {sel: '#per', t: '期間改成「6 月」', d: '寵派第一家店開始營業的月份。', fill: {value: 'm6', label: '6 月'}, until: {value: ['#per', '^m6$']}},
          {sel: '[data-key="blocked"]', info: true, t: '6 月也不能匯出', d: '同意分享、有營業的店不到 5 家，整份報表不能匯出。'},
          {sel: '#per', t: '期間改成「10 月（到 10/9）」', d: '這個月到今天為止。', fill: {value: 'm10', label: '10 月（到 10/9）'}, until: {value: ['#per', '^m10$']}},
          {sel: '[data-key="partial"]', info: true, t: '10 月可以匯出，但資料未滿', d: '月中・只算到 10/9 11:00。給別人看時要說清楚。'},
          {sel: '[data-key="row-trend-4"]', info: true, t: '10 月到 10/9：611 筆・7 家', d: '多了一列，標著「到 10/9」。'}
        ]},
      {id: 'biz', title: '招商資料：看各區需求（示範規模）', who: '思妤（寵派資料）', query: BIG,
        scene: '業務要去寵物展談招商，想知道北中南東各區的需求。這個引導用「示範規模」：假設寵派已經有 40 家店、35 家同意分享，數字全為虛構，方便看出隱藏規則怎麼運作。這個引導只看不改。',
        outro: '招商資料 9 月：北區 3,718、南區 2,218；東區、離島不足 5 家隱藏；中區自己有 5 家以上，但總計會一起輸出，一顯示就能把東區、離島減出來，所以連帶隱藏。換成縣市更細，大部分縣市都不足 5 家。分區看的是店家登記的地址，不是飼主住哪裡。',
        steps: [
          {sel: '[data-key="tpl-biz"]', t: '報表選「招商資料」', d: '給招商洽談用的報表。', until: {checked: '[data-key="tpl-biz"]'}},
          {sel: '[data-key="cov"]', info: true, t: '示範規模：35 家店', d: '寵派共 40 家，5 家還沒營業。數字全為虛構。'},
          {sel: '[data-key="legend"]', info: true, t: '顯示 11 格、不足 5 家 6 格、連帶隱藏 2 格', d: '店多了，顯示的格子也多了。'},
          {sel: '[data-key="row-region-0"]', info: true, t: '北區：3,718 筆・17 家', d: '依店家登記的地址分區，不看飼主住哪裡。'},
          {sel: '[data-key="row-region-3"]', t: '點「東區・不足 5 家」', d: '看看為什麼隱藏。'},
          {sel: '[data-key="why-region-3"]', info: true, t: '東區不到 5 家店', d: '看的人可能猜得出是哪幾家，所以不輸出。'},
          {sel: '[data-key="row-region-1"]', t: '點「中區・連帶隱藏」', d: '中區明明有 5 家以上，為什麼也隱藏？'},
          {sel: '[data-key="why-region-1"]', info: true, t: '連帶隱藏：防止被總計減出來', d: '總計會一起輸出。如果中區照常顯示，拿總計減掉其他格，就算得出東區、離島的數字。'},
          {sel: '[data-key="gran-city"]', t: '按「縣市」', d: '分得更細看看。', until: {checked: '[data-key="gran-city"]'}},
          {sel: '[data-key="sec-region"]', info: true, t: '縣市：只剩台北、新北顯示', d: '台北 1,065、新北 927 各 5 家；其他縣市不足 5 家，台中連帶隱藏。'},
          {sel: '[data-key="row-sup-0"]', info: true, t: '服務供給：美容 35 家・100%', d: '一家店可以提供好幾種服務，所以加起來會超過店數。'},
          {sel: '[data-key="row-hot-5"]', info: true, t: '熱門服務：「其他」連帶隱藏', d: '被隱藏的格子不排名，排在最後。'}
        ]},
      {id: 'export', title: '匯出招商資料給業務', who: '思妤（寵派資料）', query: BIG, minWidth: 720,
        scene: '業務要帶招商資料去高雄寵物展洽談攤位。你要把 9 月的招商資料匯出成 PDF 摘要。匯出一定要選用途、寫說明；誰在什麼時候匯出哪份報表、為什麼，都會記在稽核中心。',
        outro: '你匯出了招商資料・2026 年 9 月（PDF 摘要），用途「招商洽談」、說明「高雄寵物展攤位洽談，說明北區與南區需求」。檔案裡只有報表名稱、期間、每一格的數字與店數（5 家以上）；被隱藏的格子只寫「已隱藏」。這筆匯出出現在匯出紀錄最上面，也記在稽核中心。',
        steps: [
          {sel: '[data-key="tpl-biz"]', t: '報表選「招商資料」', d: '要匯出的報表。', until: {checked: '[data-key="tpl-biz"]'}},
          {sel: '[data-key="xcard"], [data-key="xstrip"]', info: true, t: '要匯出的內容', d: '招商資料・9 月・3 張表；隱藏 8 格（6 格不足 5 家、2 格連帶）。'},
          {sel: '[data-key="x-open"]', t: '按「匯出這份報表…」', d: '打開匯出視窗。'},
          {sel: '[data-key="has"]', info: true, t: '檔案裡有什麼、不會有什麼', d: '有：報表名稱、每一格的數字、來自幾家店（只寫 5 家以上）。不會有：店名、統編、地址、飼主姓名電話、寵物名字照片、被隱藏格子的數字。'},
          {sel: '[data-key="dlg"] .aud', info: true, t: '匯出會記在稽核中心', d: '思妤、10/9 11:20、這份報表、用途與說明。'},
          {sel: '[data-key="dlg-ok"]', t: '先直接按「匯出」', d: '看看漏了什麼。'},
          {sel: '[data-key="use"]', info: true, t: '要選用途、寫說明', d: '「請選一個用途」「請寫下這份報表要給誰、做什麼用」。'},
          {sel: '[data-key="use-biz"]', t: '用途選「招商洽談」', d: '這次是給業務去談攤位。', until: {checked: '[data-key="use-biz"]'}},
          {sel: '#x-why-t', t: '寫下說明', d: '至少 10 個字，寫清楚給誰、做什麼用。', fill: {value: '高雄寵物展攤位洽談，說明北區與南區需求', label: '高雄寵物展攤位洽談，說明北區與南區需求'}, until: {value: ['#x-why-t', '.{10,}']}},
          {sel: '[data-key="fmt-PDF"]', t: '格式選「PDF 摘要」', d: '含長條圖，可以直接附在簡報。', until: {checked: '[data-key="fmt-PDF"]'}},
          {sel: '[data-key="dlg-ok"]', t: '按「匯出」', d: '檔案會下載到這台電腦。'},
          {settle: 900, sel: '[data-key="log-0"]', info: true, t: '匯出紀錄最上面：你這次的匯出', d: '思妤匯出招商資料・2026 年 9 月，10/9 11:20・PDF 摘要・招商洽談，說明原文跟著。'},
          {sel: '[data-key="xlog"]', info: true, t: '合規在稽核中心查得到每一筆', d: '匯出紀錄最近 3 筆；完整紀錄在稽核中心。'}
        ]}
    ]
  });
})();
