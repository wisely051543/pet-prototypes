/* 取消與改期政策: hints and guided tours for test mode. Format: test-kit/flows/README.md
   Tours speak the shop's voice: 寵物, not 毛孩. One action or one explanation per step.
   The 試算 slider is an invisible range input over the ruler: a tour fills it (value = hours from 4 days before; 96 is the
   appointment, above 96 means the owner never came). Editing is wide-screen only; reading works on a phone. */
(function () {
  var A = {role: 'admin', br: null, off: null, fail: null, edit: null};
  var M = {role: 'mgr', br: null, off: null, fail: null, edit: null};

  PP.register('cancel-policy', {
    name: '取消與改期政策',
    hints: [
      {sel: '[data-key="ed-groom"]', t: '修改美容・安親的政策', d: '免費期限、取消費、未到費、接回寬限，再選從哪天生效', tour: 'schedule'},
      {sel: '[data-key="x-groom"]', t: '拖曳小米試算', d: '看飼主在不同時間取消，要收多少、退多少', tour: 'read'},
      {sel: '[data-key="sx-board-1101"]', t: '取消住宿的排程', d: '11/1 起要改的住宿政策還沒生效，可以取消', tour: 'unschedule'},
      {sel: '[data-key="rvt-groom"]', t: '要不要店家審核', d: '哪些取消、改期自動通過，哪些要店家核准', tour: 'review'},
      {sel: '[data-key="pv-liff"]', t: '飼主的取消畫面', d: '飼主在 LINE 取消時看到的規則和費用', tour: 'read'},
      {sel: '[data-key="ed-board"]', t: '修改住宿的政策', d: '住宿用「入住前幾天」計算', quiet: true},
      {sel: '[data-key="vers"]', t: '版本', d: '每筆預約記住成立當時的版本', quiet: true},
      {sel: '[data-key="br"]', t: '分店', d: '每家分店有自己的取消與改期政策', quiet: true},
      {sel: '[data-key="to-m07"]', t: '契約模板', d: '契約裡的取消與接回數字取自這裡', quiet: true}
    ],
    tours: [
      {id: 'read', title: '看懂中山店的取消規則並試算', who: '陳老闆（店家管理者）', query: A,
        scene: '有飼主問你：「我明天的預約如果今晚取消，要付多少？」你打開取消與改期政策，先看懂規則，再拖曳小米試算幾種情況，最後看看飼主在 LINE 上看到什麼。這個引導只看不改，手機上也能做。',
        outro: '中山店美容・安親：24 小時前取消或改期不收費，24 小時內收服務費 20%，沒到也沒取消收 30%。小米的試算：前 18 小時取消收 NT$160、56 小時前不收費、沒到收 NT$240。費用由系統照政策算，店員不能手動輸入；飼主在 LINE 看到的是同一份規則。',
        steps: [
          {sel: '.head .sub', info: true, t: '最上面：現在用的是哪一版', d: '美容・安親第 2 版（10/1 起）、住宿第 1 版。已成立的預約照當時的版本計算。'},
          {sel: '.rule', info: true, t: '費用由系統算，不能手動輸入', d: '店家原因的取消與改期一律不收費。契約模板裡的取消與接回數字也取自這裡。'},
          {sel: '[data-key="said-groom"]', info: true, t: '美容・安親的規則，一句話寫完', d: '24 小時前取消或改期不收費；24 小時內收服務費 20%；沒到也沒取消收 30%。接回寬限 2 小時。'},
          {sel: '[data-key="st-groom"]', info: true, t: '時間尺：越接近預約，收得越多', d: '左邊是 4 天前，右邊是預約時間。粗線是 24 小時的分界，台階高度就是收費比例。'},
          {sel: '[data-key="calc-groom"]', info: true, t: '試算：小米前 18 小時取消', d: '小米基礎洗澡 NT$800，10/8 20:00 取消：取消費 NT$160（20%），從訂金 NT$300 扣，退 NT$140，要送店家審核。'},
          {sel: '[data-key="st-groom"]', t: '把小米拖到 56 小時前', d: '在時間尺上拖曳小米的頭像往左。', fill: {into: '#x-groom', value: '40', label: '56 小時前（10/7 06:00）'}, until: {value: ['#x-groom', '^40$']}},
          {sel: '[data-key="calc-groom"]', info: true, t: '56 小時前取消：不收費', d: '訂金 NT$300 全額退回或轉抵，自動通過，時段馬上釋放給別人。'},
          {sel: '[data-key="st-groom"]', t: '把小米拖到最右邊：沒到', d: '超過預約時間，表示飼主沒來也沒取消。', fill: {into: '#x-groom', value: '104', label: '超過預約時間（沒到）'}, until: {value: ['#x-groom', '^104$']}},
          {sel: '[data-key="calc-groom"]', info: true, t: '沒到：未到費 NT$240', d: '服務費 30%，從訂金扣，退 NT$60。店員標記未到就好，不需要審核。'},
          {sel: '[data-key="pv-liff"]', t: '在「飼主會看到什麼」按「取消畫面」', d: '飼主在 LINE 按取消時看到的畫面。'},
          {sel: '[data-key="pv"]', info: true, t: '飼主的取消畫面', d: '上面是同一份規則；下面依你剛剛試算的時間算費用。現在是「沒到」的情形，所以寫著 NT$240，並提醒這個畫面只在取消時出現。'},
          {sel: '[data-key="vers-groom"]', info: true, t: '版本：每次修改都留下來', d: '第 2 版 10/1 起，把免費期限 48 → 24 小時、取消費 30% → 20%。每筆預約記住成立當時的版本，取消、改期、未到都照那一版算。'}
        ]},
      {id: 'schedule', title: '改美容政策，11/1 起生效', who: '陳老闆（店家管理者）', query: A, minWidth: 720,
        scene: '最近臨時取消的客人變多，你想把美容・安親的免費取消期限從 24 小時拉長到 48 小時，之後取消收 30%。為了不嚇到已經約好的客人，從 11/1 開始生效。',
        outro: '美容・安親第 3 版排定 11/1（日）生效：48 小時前取消免費，之後收 30%。時間尺上多了虛線的新台階；已簽的 11 筆不變，已成立還沒簽的 7 筆簽第 2 版、照舊費用，11/1 起成立的才簽新版。飼主在新預約的確認訊息看到新規則。想反悔，可以按「取消這個排程」。',
        steps: [
          {sel: '[data-key="ed-groom"]', t: '在「美容・安親」按「修改」', d: '直接在這一塊展開修改，不另開頁面。'},
          {sel: '[data-key="sec-groom"] .pick', info: true, t: '四個可以改的數字', d: '免費取消期限、之後取消或改期收多少、未到費、接回寬限。每個都是選項，不能自己打數字。'},
          {sel: '[data-key="pk-free-48"]', t: '免費取消期限選「48 小時前」', d: '原本是 24 小時前。', until: {checked: '[data-key="pk-free-48"]'}},
          {sel: '[data-key="said-groom"]', info: true, t: '上面的句子跟著改：48 小時前免費', d: '飼主看到的就是這句話，改了什麼一眼就看得出來。'},
          {sel: '[data-key="st-groom"]', info: true, t: '時間尺：粗線移到 48 小時前', d: '原本的分界留著「目前 24 小時前」的標示，讓你比較改前改後。'},
          {sel: '[data-key="pk-fee-30"]', t: '之後取消或改期選「30%」', d: '原本是 20%。', until: {checked: '[data-key="pk-fee-30"]'}},
          {sel: '[data-key="calc-groom"]', info: true, t: '小米的試算：改前 NT$160 → 改後 NT$240', d: '前 18 小時取消，服務費 30%，從訂金 NT$300 扣，只退 NT$60。時間尺上虛線的「目前 20%」是原本的高度。'},
          {sel: '[data-key="tray"]', info: true, t: '下面寫著這次修改會影響哪些預約', d: '已簽的 11 筆不變；已成立還沒簽的 7 筆簽成立時的第 2 版、照舊費用；11/1 起成立的才簽新版。按「哪幾筆」看是哪些預約。'},
          {sel: '[data-key="ef-1101"]', t: '生效日選「11/1（日）起」', d: '也可以立即生效或下週一起。11/1 之前成立的預約照現在的規則。'},
          {sel: '[data-key="t-ok"]', t: '按「排定 11/1（日）生效」', d: '按鈕上直接寫著生效日。還會再確認一次。'},
          {sel: '.dialog', info: true, t: '確認視窗：變更和三組預約', d: '免費期限 24 → 48 小時、取消費 20% → 30%；已簽 11 筆不變、已成立未簽 7 筆照第 2 版、11/1 起成立的簽新版；飼主不另外通知。'},
          {sel: '[data-key="dg-ok"]', t: '按「排定變更」', d: '會記錄在操作紀錄裡。'},
          {settle: 1000, sel: '[data-key="sch-groom"]', info: true, t: '排程中：11/1 起 48 小時前免費', d: '寫著誰、哪天排定的。現在還是 24 小時；到 11/1 才換。'},
          {sel: '[data-key="st-groom"]', info: true, t: '時間尺上的虛線就是 11/1 之後的樣子', d: '實線是現在的規則，虛線是排定的新規則。'},
          {sel: '[data-key="vers-groom"]', info: true, t: '版本：第 3 版，11/1 起・排定', d: '第 2 版仍然是「目前」。'}
        ]},
      {id: 'unschedule', title: '取消住宿政策的排程', who: '陳老闆（店家管理者）', query: A, minWidth: 720,
        scene: '10/7 你排定 11/1 起把住宿的免費取消期限從入住前 1 天改成 3 天。後來想想，年底住宿很搶手，暫時不改了。你要把這個排程取消。',
        outro: '住宿政策 11/1 的排程取消了，維持第 1 版：入住前 1 天取消不收費，1 天內收住宿費 20%，沒到收 30%。時間尺上的虛線消失，版本只剩第 1 版。要改的話可以重新排定。',
        steps: [
          {sel: '[data-key="said-board"]', info: true, t: '住宿現在的規則', d: '入住前 1 天取消或改期不收費；1 天內收住宿費 20%；沒到也沒取消收 30%。'},
          {sel: '[data-key="sch-board"]', info: true, t: '排程中：11/1 起入住 3 天前免費', d: '陳老闆 10/7 排定。之前成立的預約照目前規則。'},
          {sel: '[data-key="st-board"]', info: true, t: '虛線台階是排定後的樣子', d: '分界從 1 天前移到 3 天前，免費的範圍變短。'},
          {sel: '[data-key="calc-board"]', info: true, t: '試算：布丁住宿 3 晚', d: '入住前 12 小時取消，取消費 NT$720（住宿費 20%），從訂金 NT$1,000 扣，退 NT$280。'},
          {sel: '[data-key="sx-board-1101"]', t: '按「取消這個排程」', d: '還沒生效的排程才能取消；有好幾個排程時，一個一個取消。'},
          {sel: '.dialog', info: true, t: '確認：取消 11/1（日）起的排程？', d: '住宿政策維持目前的規則；之後要改可以重新排定。'},
          {sel: '[data-key="dg-ok"]', t: '按「取消排程」', d: '會記錄在操作紀錄裡。'},
          {settle: 1000, sel: '[data-key="st-board"]', info: true, t: '虛線不見了', d: '住宿只剩現在的規則：入住前 1 天免費。'},
          {sel: '[data-key="vers-board"]', info: true, t: '版本：只剩第 1 版', d: '排定的第 2 版拿掉了，第 1 版 2025/7/1 起仍是目前。'}
        ]},
      {id: 'review', title: '林店長調整收費與審核規則，立即生效', who: '林店長（中山店店長）', query: M, minWidth: 720,
        scene: '你是中山店的林店長。臨時取消太多，你想把 24 小時內取消的費用提高到 50%，同時讓收費期內的取消自動通過、不用店員一筆一筆審。改的時候要注意：未到費不能比取消費低。',
        outro: '中山店美容・安親第 3 版今天起生效：24 小時內取消收 50%、沒到收 50%、收費期內的取消自動通過。你一度把取消費調得比未到費高，畫面立刻提醒「直接不來反而比較便宜」，於是把未到費也調到 50%。版本記著是林店長改的；飼主在 LINE 看到的規則已經是新的。',
        steps: [
          {sel: '.head', info: true, t: '你是林店長，只管中山店', d: '分店選單只有中山店。店長可以修改這家店的政策。'},
          {sel: '[data-key="ed-groom"]', t: '在「美容・安親」按「修改」', d: '四個數字和審核規則都可以在這裡改。'},
          {sel: '[data-key="pk-fee-50"]', t: '之後取消或改期選「50%」', d: '原本是 20%。', until: {checked: '[data-key="pk-fee-50"]'}},
          {sel: '[data-key="sec-groom"] p.soft', info: true, t: '注意：未到費比取消費低', d: '現在取消收 50%、沒到只收 30%，飼主不取消、直接不來反而比較便宜，店家更難安排時段。'},
          {sel: '[data-key="pk-ns-50"]', t: '未到費也選「50%」', d: '和取消費一樣，飼主就沒有理由不通知。', until: {checked: '[data-key="pk-ns-50"]'}},
          {sel: '[data-key="said-groom"]', info: true, t: '警告消失了：24 小時內收 50%，沒到收 50%', d: '上面的句子跟著改好了。兩個費用一樣，下面留一行提醒：事先取消和直接不來付的一樣多。'},
          {sel: '[data-key="rvt-groom"]', info: true, t: '要不要店家審核', d: '取消和改期，免費期內、收費期內各自決定：自動通過或送審。未到由店員標記，不需審核。'},
          {sel: '[data-key="rv-groom-cp-auto"]', t: '「取消・收費期內」選「自動通過」', d: '原本要送審。收費已經照政策算好，就不用店員再看一次。', until: {checked: '[data-key="rv-groom-cp-auto"]'}},
          {sel: '[data-key="ef-now"]', t: '生效日選「立即生效」', d: '今天 11:20 之後成立的預約就用新規則。', until: {checked: '[data-key="ef-now"]'}},
          {sel: '[data-key="tray"]', info: true, t: '已成立的 18 筆預約照成立時的版本', d: '已簽 11 筆不變；還沒簽的 7 筆簽第 2 版、照舊費用。今天 11:20 之後成立的才簽新版。'},
          {sel: '[data-key="t-ok"]', t: '按「儲存並立即生效」', d: '還會再確認一次。'},
          {sel: '.dialog', info: true, t: '確認視窗：三項變更', d: '取消費 20% → 50%、未到費 30% → 50%、收費期內取消改為自動通過；今天 11:20 之後成立的預約適用。'},
          {sel: '[data-key="dg-ok"]', t: '按「立即生效」', d: '會記錄在操作紀錄裡。'},
          {settle: 1000, sel: '.head .sub', info: true, t: '美容・安親第 3 版（10/9 起）', d: '最上面的版本換了。'},
          {sel: '[data-key="vers-groom"]', info: true, t: '版本寫著林店長 10/9 11:20', d: '誰改的、改了什麼都留下來；第 2 版到 10/9 為止。'},
          {sel: '[data-key="pv"]', info: true, t: '飼主看到的也是新規則', d: 'LINE 預約確認寫著：24 小時內收 50%、沒到也沒事先取消收 50%。'}
        ]},
      {id: 'life-lc-policy', life: true, query: A, seed: {life: 'lc-policy'}, title: '第 4 幕：免費期限拉長到 48 小時', who: '陳老闆（店家管理者）', minWidth: 720,
        scene: '10/9（五）11:40。林店長回報：今天早上毛毛前一天才取消、湯圓直接沒來，兩個時段都空著。你想把美容・安親的免費取消期限從 24 小時拉長到 48 小時，之後取消收 30%，從下週一 10/12 起生效，已經約好的客人照舊。',
        outro: '美容・安親第 3 版排定 10/12（一）起生效：48 小時前取消免費，之後收 30%，沒到收 30%。已成立的 18 筆預約照第 2 版算，還沒簽的也簽第 2 版；10/12 起成立的新預約才簽新版、看到新規則。下一幕回到王太太的手機。',
        steps: [
          {sel: '[data-key="said-groom"]', info: true, t: '現在的規則', d: '24 小時前取消或改期不收費；24 小時內收服務費 20%；沒到也沒取消收 30%。毛毛的 NT$240、湯圓的 NT$180 都是照這一版算的。'},
          {sel: '[data-key="ed-groom"]', t: '在「美容・安親」按「修改」', d: '直接在這一塊展開修改，不另開頁面。'},
          {sel: '[data-key="pk-free-48"]', t: '免費取消期限選「48 小時前」', d: '原本是 24 小時前。', until: {checked: '[data-key="pk-free-48"]'}},
          {sel: '[data-key="st-groom"]', info: true, t: '時間尺：粗線移到 48 小時前', d: '原本的分界留著「目前 24 小時前」的標示，讓你比較改前改後。'},
          {sel: '[data-key="pk-fee-30"]', t: '之後取消或改期選「30%」', d: '原本是 20%。和未到費一樣，飼主就沒有理由不通知直接不來。', until: {checked: '[data-key="pk-fee-30"]'}},
          {sel: '[data-key="said-groom"]', info: true, t: '上面的句子跟著改了', d: '48 小時前免費；48 小時內收 30%；沒到收 30%。飼主看到的就是這句話。'},
          {sel: '[data-key="ef-1012"]', t: '生效日選「10/12（一）起」', d: '下週一。10/12 之前成立的預約照現在的規則。', until: {checked: '[data-key="ef-1012"]'}},
          {sel: '[data-key="tray"]', info: true, t: '這次修改會影響哪些預約', d: '已簽的 11 筆不變；已成立還沒簽的 7 筆簽第 2 版、照舊費用；10/12 起成立的才簽新版。'},
          {sel: '[data-key="t-ok"]', t: '按「排定 10/12（一）生效」', d: '按鈕上直接寫著生效日。還會再確認一次。'},
          {sel: '.dialog', info: true, t: '確認視窗', d: '免費期限 24 → 48 小時、取消費 20% → 30%；已成立的照第 2 版，10/12 起成立的簽新版。'},
          {sel: '[data-key="dg-ok"]', t: '按「排定變更」', d: '會記錄在操作紀錄裡。'},
          {settle: 1000, sel: '[data-key="sch-groom"]', info: true, t: '排程中：10/12 起 48 小時前免費', d: '現在還是 24 小時；到 10/12 才換。'}
        ]}
    ]
  });
})();
