/* 通知補發 (S-09): hints and guided tours for test mode. Format: test-kit/flows/README.md
   Tours speak the shop's voice: 寵物, not 毛孩. One action or one explanation per step.
   This prototype runs on the 今日看板's own demo day, 10/5（一）09:55, and its clock ticks with real time, so the tours
   never quote the minutes since an appointment started. Under 1000 px the detail is a sheet over the list, so every tour
   opens its notice first (even the one already open on a wide screen) and closes the sheet (a narrow-only step) before it
   lights the list again. */
(function () {
  var Q = {role: 'desk', n: null, tab: null, q: null, sms: null, off: null};
  /* only a narrow screen (under 1000 px) shows the notice as a sheet over the list */
  var BACK = {sel: '[data-key="sheet-close"]', maxWidth: 999, t: '按「回到待處理」', d: '這個寬度的畫面，通知內容蓋在清單上面。'};

  PP.register('notify-resend', {
    name: '通知補發',
    hints: [
      {sel: '[data-key="n-doudou"]', t: '最急的一則', d: '依急迫程度排序：豆豆的預約已經開始，飼主還沒到', tour: 'doudou'},
      {sel: '[data-key="n-momo"]', t: '契約連結過期', d: '補發新連結，舊連結會立即失效', tour: 'momo'},
      {sel: '[data-key="n-lucky"]', t: '正本要交到飼主手上', d: '正本不能用「已電話告知」結案', tour: 'lucky'},
      {sel: '[data-key="n-heitang"]', t: '已經打電話告知了', d: '標記已處理，寫下原因', tour: 'heitang'},
      {sel: '[data-key="tab-search"]', t: '查詢', d: '飼主說沒收到？查他近 7 天的通知，要求重發', tour: 'ask'},
      {sel: '[data-key="fix"]', t: '客戶資料', d: '電話或 Email 換了，要到客戶資料修改；這裡不能手打', stub: true},
      {sel: '[data-key="foldPast"]', t: '已過時效', d: '時間過了，補發也沒有意義的通知收在這裡', quiet: true}
    ],
    tours: [
      {id: 'doudou', title: '豆豆的預約提醒：改用 Email 補發', who: '櫃台阿凱', query: Q,
        scene: '早上 09:55，豆豆 09:30 的洗澡已經開始了，黃先生還沒到。昨晚的預約提醒 LINE 和簡訊都沒送到。你要找一條送得到的路補發，順便看看重複補發時系統怎麼提醒你。',
        outro: '豆豆的預約已經開始，系統先建議打電話；電話回報空號，所以改用 Email 補發提醒，郵件伺服器已收下，記在操作紀錄（阿凱 09:56）。LINE 沒加好友、簡訊回報空號，所以只剩 Email；收件地址只能用客戶資料上的。你又想再補發一次，系統提醒剛補發過、飼主會收到兩則一樣的訊息，你選了「先不要」。',
        steps: [
          {sel: '[data-key="n-doudou"]', t: '點最上面的「豆豆・預約提醒」', d: '待處理依急迫程度排：豆豆的預約已經開始了。'},
          {sel: '.dhead', info: true, t: '豆豆的預約 09:30 已開始，飼主還沒到', d: '黃先生・基礎洗澡・小型犬・美容台 B・小葵。'},
          {sel: '.route', info: true, t: '送達路徑：LINE 失敗、簡訊失敗', d: 'LINE：飼主沒有加寵派好友。簡訊：電信回報空號，電話可能換了。'},
          {sel: '[data-key="call-done"]', info: true, t: '系統先建議打電話', d: '預約已經開始，提醒現在補發也來不及在到店前讀到。可是這支電話回報空號，打不通，所以這次還是補發。'},
          {sel: '[data-key="force-send"]', t: '按「仍要補發提醒」', d: '改看補發要走哪條路。'},
          {sel: '.picks', info: true, t: '補發到哪裡：只剩 Email', d: 'LINE、簡訊都不能選；Email 標著「建議」，已經幫你選好。'},
          {sel: '[data-key="fix"]', info: true, t: '收件地址不能在這裡手打', d: '只能用客戶資料上的。電話換了的話，要先到客戶資料修改。'},
          {sel: '[data-key="send"]', t: '按「用 Email 補發」', d: '會記在操作紀錄，記為阿凱。'},
          {settle: 1500, sel: '.route', info: true, t: '路徑多了一站：Email 郵件伺服器已收下', d: '寫著「阿凱補發」和時間。'},
          {sel: '.audit', info: true, t: '操作紀錄', d: '補發・Email（hu•••@gmail.com），記為阿凱（櫃台）。'},
          {sel: '[data-key="redo"]', t: '按「再補發一次」', d: '假設黃先生打電話說還是沒收到。'},
          {sel: '[data-key="send"]', t: '按「再用 Email 補發」', d: '會先問你一次。'},
          {sel: '.dialog', info: true, t: '剛補發過，確定再發一次嗎？', d: '短時間重複補發，飼主會收到兩則一樣的訊息。'},
          {sel: '[data-key="dlg-no"]', t: '按「先不要」', d: '請黃先生先看看信箱的垃圾郵件。'},
          {sel: '.audit', info: true, t: '操作紀錄還是只有一筆', d: '沒有重複補發。'},
          BACK,
          {sel: '[data-key="foldDone"]', info: true, t: '豆豆移到「今天已處理」', d: '待處理從 4 件變 3 件。'}
        ]},
      {id: 'momo', title: 'Momo 的契約連結過期：補發新連結', who: '櫃台阿凱', query: Q,
        scene: 'Momo 13:00 要洗澡＋修腳底毛，服務前要簽好契約。10/3 傳給陳先生的契約連結 24 小時內沒打開，已經過期了。你要補發新連結。',
        outro: 'Momo 的契約新連結用 LINE 補發了，已交給 LINE。10/3 的舊連結立即失效，陳先生要用新連結簽；Momo 到店後也可以在櫃台平板當場閱讀與簽名。操作紀錄記著「補發新連結・LINE」。',
        steps: [
          {sel: '[data-key="n-momo"]', t: '點「Momo・契約送達」', d: '13:00 服務前要簽好。'},
          {sel: '.route', info: true, t: 'LINE 送到了，但連結過期', d: '10/3 14:10 已交給 LINE；飼主 24 小時內沒打開，10/4 14:10 連結過期。'},
          {sel: '.picks', info: true, t: '建議用 LINE 傳新連結', d: 'LINE 還傳得出去，只是舊連結過期了。也可以改用簡訊或 Email。'},
          {sel: '[data-key="send"]', t: '按「用 LINE 補發新連結」', d: '會先問你一次。'},
          {sel: '.dialog', info: true, t: '舊連結會立即失效', d: '陳先生手上 10/3 收到的舊連結會打不開，要改用新連結簽署。'},
          {sel: '[data-key="dlg-ok"]', t: '按「補發新連結」', d: '新連結用 LINE 傳出。'},
          {settle: 1500, sel: '.route', info: true, t: '路徑多了一站：LINE 已交給 LINE', d: 'LINE 不會回報飼主有沒有讀。'},
          {sel: '.audit', info: true, t: '操作紀錄：補發新連結・LINE', d: '記為阿凱（櫃台）。'}
        ]},
      {id: 'lucky', title: 'Lucky 的正本：不能電話告知結案，改用簡訊補發', who: '櫃台阿凱', query: Q,
        scene: 'Lucky 的精緻美容 10:45 做完，接回前要把契約正本交給周先生。早上 08:50 用 LINE 傳正本失敗了。你想直接打電話跟周先生說一聲就好，看看系統怎麼說。',
        outro: '正本是法定要交到飼主手上的文件，「已電話告知」不能結案。你回去補發，用建議的簡訊傳給周先生，電信回報已收到，記在操作紀錄。',
        steps: [
          {sel: '[data-key="n-lucky"]', t: '點「Lucky・正本交付」', d: '10:45 接回前要送到。'},
          {sel: '.route', info: true, t: 'LINE 暫時無法傳送', d: '08:50 傳正本，系統重試 3 次仍失敗。下一步會改用簡訊。'},
          {sel: '[data-key="close"]', t: '按「標記已處理」', d: '你想打電話告知就好。'},
          {sel: '.closing fieldset', info: true, t: '「已電話告知」不能選', d: '正本要交到飼主手上，電話告知不算送達。只有「飼主已到店」或「不需要了」可以結案。'},
          {sel: '[data-key="close-no"]', t: '按「返回補發」', d: '還是把正本送到周先生手上。'},
          {sel: '[data-key="pk-sms"]', info: true, t: '建議簡訊', d: '手機 ••••0093，簡訊本期用了 186／500。周先生客戶資料沒有 Email。'},
          {sel: '[data-key="send"]', t: '按「用 簡訊 補發」', d: '正本連結用簡訊傳出。'},
          {settle: 1500, sel: '.route', info: true, t: '簡訊：電信回報已收到', d: '寫著「阿凱補發」和時間。'},
          {sel: '.audit', info: true, t: '操作紀錄：補發・簡訊', d: '手機 ••••0093，記為阿凱（櫃台）。'}
        ]},
      {id: 'heitang', title: '黑糖的預約提醒：已電話告知，標記已處理', who: '櫃台阿凱', query: Q,
        scene: '黑糖今天 14:00 要入住。昨晚的預約提醒 LINE 失敗：劉先生封鎖了寵派官方帳號。你剛剛打電話跟劉先生確認過了，不用再補發，要把這則標記已處理。',
        outro: '黑糖的預約提醒標記已處理，原因「已電話告知」，記在操作紀錄。它移到「今天已處理」，畫面自動換到下一件最急的豆豆。預約提醒可以用電話告知結案；正本、契約這類要送達的文件不行。',
        steps: [
          {sel: '[data-key="n-heitang"]', t: '點「黑糖・預約提醒」', d: '14:00 入住前。'},
          {sel: '.route', info: true, t: 'LINE 失敗：飼主封鎖了官方帳號', d: '10/4 18:00 傳不出去。系統下一步會改用簡訊。'},
          {sel: '[data-key="close"]', t: '按「標記已處理」', d: '你已經打電話告知了。'},
          {sel: '.closing fieldset', info: true, t: '為什麼不用補發？', d: '已電話告知、飼主已到店、不需要了，三選一。先選原因，才能確認。'},
          {sel: '[data-key="why-已電話告知"]', t: '選「已電話告知」', d: '預約提醒可以用電話告知結案。', until: {checked: '[data-key="why-已電話告知"]'}},
          {sel: '[data-key="close-ok"]', t: '按「確認已處理」', d: '會記在操作紀錄。'},
          {settle: 1000, sel: '.dhead', info: true, t: '畫面換到下一件最急的：豆豆', d: '處理完一件，直接接著處理下一件。'},
          BACK,
          {sel: '[data-key="foldDone"]', info: true, t: '黑糖移到「今天已處理」', d: '待處理剩 3 件。'},
          {sel: '[data-key="foldDone"]', t: '按「今天已處理」展開', d: '看看處理過的通知。'},
          {sel: '[data-key="n-heitang"]', info: true, t: '黑糖：已處理・已電話告知', d: '誰處理的、原因都留著。'}
        ]},
      {id: 'ask', title: '飼主說沒收到：查詢後要求重發', who: '櫃台阿凱', query: Q,
        scene: '李小姐打電話來說，沒收到奶茶今天 11:45 洗澡的預約提醒。你要查她近 7 天的通知，看看送到哪裡，再要求重發。',
        outro: '奶茶的預約提醒 10/4 18:00 已交給 LINE，但 LINE 不會回報飼主有沒有讀。你用手機末四碼找到李小姐，要求用 LINE 重發，已交給 LINE，記在操作紀錄。',
        steps: [
          {sel: '[data-key="tab-search"]', t: '按「查詢」', d: '查某位飼主近 7 天的通知。'},
          {sel: '#q', t: '輸入手機末四碼 4471', d: '也可以打寵物、飼主名字或預約號。', fill: {value: '4471', label: '4471'}, until: {value: ['#q', '^4471$']}},
          {sel: '[data-key="o-li"]', t: '點「奶茶・李小姐」', d: '只剩一位符合。手機只顯示末四碼。'},
          {sel: '[data-key="h-naicha-r"]', t: '點 10/4 18:00 的「奶茶・預約提醒」', d: '近 7 天有兩則：預約確認和預約提醒。'},
          {sel: '.route', info: true, t: '已交給 LINE', d: 'LINE 只確認已交給 LINE，不會回報飼主有沒有讀。'},
          {sel: '[data-key="ask"]', t: '按「要求重發」', d: '飼主說沒收到，就可以重發。'},
          {sel: '.picks', info: true, t: '建議 LINE：上次就是這條路送到的', d: '李小姐的客戶資料沒有 Email。'},
          {sel: '[data-key="send"]', t: '按「用 LINE 重發」', d: '會記在操作紀錄。'},
          {settle: 1500, sel: '.route', info: true, t: '路徑多了一站：LINE 已交給 LINE', d: '寫著「阿凱重發」。'},
          {sel: '.audit', info: true, t: '操作紀錄：要求重發・LINE', d: '記為阿凱（櫃台）。'}
        ]},
      /* LINE 當機的那一小時 (prototypes/line-down): act 5, 10/9（五）11:15 with only Coco's 預約確認 in the list */
      {id: 'life-down-email', life: true, query: Q, seed: {life: 'down-email'}, title: '第 5 幕：Coco 的預約確認改用 Email', who: '櫃台阿凱',
        scene: '10/9（五）11:15，LINE 11:06 恢復了。通知補發多了一件：柯小姐 11:02 幫 Coco 約了今天 15:00 的基礎洗澡，那則預約確認 LINE 逾時沒送出，系統改傳的簡訊又回報空號。15:00 前要讓她收到。',
        outro: 'Coco 的預約確認用 Email 補發了，郵件伺服器已收下，記在操作紀錄。簡訊回報空號，柯小姐可能換了電話：她 15:00 到店時，記得確認新號碼、更新客戶資料。',
        steps: [
          {sel: '[data-key="n-coco"]', t: '點「Coco・預約確認」', d: '待處理只有這一件。'},
          {sel: '.route', info: true, t: '送達路徑：LINE 逾時、簡訊空號', d: 'LINE 11:02 正好在寵派的逾時事故裡；系統自動改傳簡訊，電信回報空號。'},
          {sel: '.picks', info: true, t: '建議 Email', d: '兩條路都失敗過，Email 還沒試。LINE 已恢復，也可以改選 LINE；簡訊要先確認電話。'},
          {sel: '[data-key="send"]', t: '按「用 Email 補發」', d: '寄到客戶資料上的信箱，記為阿凱。'},
          {settle: 1500, sel: '.route', info: true, t: '路徑多了一站：Email 郵件伺服器已收下', d: '寫著「阿凱補發」和時間。'},
          {sel: '.audit', info: true, t: '操作紀錄', d: '補發・Email（ko•••@gmail.com），記為阿凱（櫃台）。'}
        ]}
    ]
  });
})();
