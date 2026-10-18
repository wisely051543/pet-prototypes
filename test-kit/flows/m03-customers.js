/* M-03 客戶與寵物: hints and guided tours for test mode. Format: test-kit/flows/README.md
   Tours speak the shop's voice: 寵物, not 毛孩. One action or one explanation per step. */
(function () {
  var LIST = function (role) { return {role: role, q: null, f: null, br: null, off: null, fail: null}; };
  var AFU = 'li.pet#pet-afu';
  var findAfu = [
    {sel: '#q', t: '在搜尋框輸入「1180」', d: '可以用飼主姓名、寵物名或手機末 4 碼找。蔡先生的手機末四碼是 1180。', fill: {value: '1180', label: '1180（蔡先生的手機末四碼）'}, until: {value: ['#q', '^1180$']}},
    {sel: '[data-key="r-c-caim"]', info: true, t: '找到 1 位：蔡先生', d: '列表上就看得到阿福的「會咬人」標記、今天 11:00 的精緻美容和上次來店。手機只顯示末四碼。'},
    {sel: '[data-key="r-c-caim"]', t: '按蔡先生這一列', d: '右邊會打開客戶資料，列表往左讓開。'}
  ];

  PP.register('m03-customers', {
    name: '客戶與寵物',
    minWidth: 720,   /* 手機上只能查看 */
    hints: [
      {sel: '#q', t: '搜尋客戶', d: '飼主姓名、寵物名或手機末 4 碼都可以', tour: 'find'},
      {sel: '[data-key="new"]', t: '新增客戶', d: '先輸入手機，系統會檢查是不是已經有這位客戶', tour: 'new'},
      {sel: '[data-key^="b-c-"]', t: '比對可能重複的客戶', d: '同一支手機有兩筆資料：合併，或綁定為家人', tour: 'merge'},
      {sel: '[data-key^="r-c-"]', t: '打開客戶資料', d: '寵物的注意事項、病史、過敏、來店紀錄與契約', tour: 'find'},
      {sel: '[data-key="dp-contact"]', t: '修改聯絡資料', d: '姓名、手機、地址、備註；換手機要等飼主念出簡訊驗證碼才生效', quiet: true},
      {sel: '[data-key^="ed-"]', t: '修改注意事項', d: '會咬人、過敏等；要寫原因，所有店員都會看到', tour: 'edit'},
      {sel: '[data-key="f-dup"]', t: '可能重複', d: '只看同一支手機有兩筆資料的客戶', quiet: true},
      {sel: '[data-key="f-del"]', t: '刪除請求', d: '飼主要求刪除個資的客戶', quiet: true},
      {sel: '[data-key="f-noline"]', t: '沒有 LINE', d: '這些客戶的通知用簡訊傳', quiet: true},
      {sel: '[data-key="scope"]', t: '常去分店', d: '看全部分店或只看一家的客戶', quiet: true},
      {sel: '[data-key^="pdf-"]', stub: true}
    ],
    tours: [
      {id: 'find', title: '找到蔡先生，看阿福的注意事項', who: '陳老闆（店家管理者）', query: LIST('admin'), minWidth: 0,
        scene: '蔡先生打電話來問阿福上次的服務。你只記得他的手機末四碼 1180。你要找到他的資料，先看阿福的安全提醒，再看病史、過敏和來店紀錄。',
        outro: '用手機末四碼就找到蔡先生。阿福的「會咬人：剪指甲與吹耳朵時會咬，需兩人保定」放在寵物資料最上面；病史、過敏、內部備註和最後修改的人都寫著。來店紀錄附上當時簽的契約版本、雜湊和時戳。',
        steps: findAfu.concat([
          {sel: '.dp .nextv', info: true, t: '下次來店：今天 11:00・阿福', d: '精緻美容，中山店美容台 A・阿哲。按「在預約行事曆查看」會打開 M-02 的那一天。'},
          {sel: AFU + ' .tags, ' + AFU + ' .notes:not(.care)', group: true, info: true, t: '安全提醒：阿福會咬人', d: '「剪指甲與吹耳朵時會咬，需兩人保定」。安全標記放在寵物資料最上面，看板、行事曆和美容台都看得到。'},
          {sel: AFU + ' .notes.care', info: true, t: '照護：怕吹風機', d: '「改用低風量分段吹」。照護說明櫃台也看得到。'},
          {sel: AFU + ' .pkv', info: true, t: '晶片、疾病史、過敏、內部備註', d: '異位性皮膚炎（服藥中）、對雞肉過敏。這些是敏感資料，店長和店家管理者才看得到全文。'},
          {sel: AFU + ' .lastedit', info: true, t: '誰、什麼時候、為什麼改過', d: '9/30 林店長改的，原因：飼主告知新的過敏原。每次修改都會留下紀錄。'},
          {sel: '[data-key="h-afu"]', t: '按「服務紀錄 2 筆・已簽契約 2 份」', d: '展開阿福的來店紀錄。'},
          {sel: AFU + ' .hist ol', info: true, t: '每次來店都附上當時簽的契約', d: '9/28 洗澡＋剪毛 NT$2,000、9/3 精緻美容 NT$2,200。契約寫著版本、簽署方式、文件雜湊和時戳。'}
        ])},
      {id: 'edit', title: '更新阿福的過敏資料', who: '陳老闆（店家管理者）', query: LIST('admin'),
        scene: '蔡先生說阿福最近吃牛肉也會癢。你要把過敏從「雞肉」改成「雞肉、牛肉」，寫下修改原因。所有店員之後都會看到新的資料。',
        outro: '阿福的過敏改成「雞肉、牛肉」，最後修改寫著「今天 11:20・陳老闆・原因：飼主今天告知」。確認視窗先讓你看清楚改前與改後，所有店員之後都會看到。',
        steps: findAfu.concat([
          {sel: AFU + ' .pkv', info: true, t: '現在的過敏：雞肉', d: '等一下要改的就是這一格。'},
          {sel: '[data-key="ed-afu"]', t: '按「修改注意事項」', d: '右邊換成修改表單。修改後所有店員都會看到，並寫入修改紀錄。'},
          {sel: '#e-allergy', t: '過敏改成「雞肉、牛肉」', d: '直接改寫這一格。', fill: {value: '雞肉、牛肉', label: '雞肉、牛肉'}, until: {value: ['#e-allergy', '牛肉']}},
          {sel: '#e-why', t: '寫下修改原因', d: '原因是必填的，會跟著這次修改留下來。', fill: {value: '飼主今天告知', label: '飼主今天告知'}, until: {value: ['#e-why', '\\S']}},
          {sel: '[data-key="ed-go"]', t: '按「檢查修改」', d: '先看一次改了什麼，還沒存。'},
          {sel: '.dialog .cdl', info: true, t: '確認視窗：雞肉 → 雞肉、牛肉', d: '只列出有改的欄位，原本的灰字、改成的粗字。上面寫著原因：飼主今天告知。'},
          {sel: '[data-key="dg-ok"]', t: '按「儲存修改」', d: '存好後回到客戶資料。'},
          {sel: AFU + ' .pkv', info: true, t: '過敏變成「雞肉、牛肉」', d: '下一次阿福來店，美容師看到的就是新的過敏資料。'},
          {sel: AFU + ' .lastedit', info: true, t: '修改紀錄更新了', d: '「最後修改 今天 11:20・陳老闆（店家管理者）・原因：飼主今天告知」。'}
        ])},
      {id: 'new', title: '新增一位客戶和她的貓', who: '陳老闆（店家管理者）', query: LIST('admin'),
        scene: '溫小姐第一次來，帶著橘白貓奶昔。她還沒有 LINE，奶昔也沒有植入晶片。你要幫她建檔：先輸入手機，系統會檢查是不是已經有這位客戶。',
        outro: '溫小姐和奶昔建好了：客戶從 113 位變 114 位。奶昔沒有晶片，改記「橘白、尾巴有結」當辨識資訊。溫小姐還沒有 LINE，確認、提醒與契約連結都用簡訊傳；她之後在 LINE 登入就會自動綁定。',
        steps: [
          {sel: '[data-key="new"]', t: '按「新增客戶」', d: '在畫面右上角。'},
          {sel: '#n-ph', t: '先輸入手機', d: '同一支手機已經有客戶的話，系統會先問你怎麼處理，避免建出重複的資料。', fill: {value: '0912000111', label: '0912000111（溫小姐）'}, until: {value: ['#n-ph', '^09\\d{8}$']}},
          {sel: '#n-name', t: '輸入飼主姓名', d: '這支手機沒有找到客戶，是新客人。', fill: {value: '溫小姐', label: '溫小姐'}, until: {value: ['#n-name', '\\S']}},
          {sel: '[data-key="o-br-中山店"]', t: '常去分店選「中山店」', d: '之後列表依分店看時，她會出現在中山店。'},
          {sel: '.dp .frm .notice', info: true, t: '沒有 LINE：通知改用簡訊', d: '新客還沒有 LINE，確認、提醒與契約連結會用簡訊傳。飼主之後在 LINE 登入就會自動綁定。'},
          {sel: '#n-pet', t: '輸入寵物名字', d: '品種、年齡、體重可以之後補。', fill: {value: '奶昔', label: '奶昔'}, until: {value: ['#n-pet', '\\S']}},
          {sel: '[data-key="o-sp-貓"]', t: '種類選「貓」', d: '選了種類，品種和體型的選項才會對。'},
          {sel: '#n-nochip', t: '勾「未植入晶片」', d: '很多貓沒有辦寵物登記。勾了之後，要改寫別的辨識資訊。', until: {checked: '#n-nochip'}},
          {sel: '#n-alt', t: '寫下其他辨識資訊', d: '毛色、花紋或特徵，讓店員認得出是哪一隻。', fill: {value: '橘白、尾巴有結', label: '橘白、尾巴有結'}, until: {value: ['#n-alt', '\\S']}},
          {sel: '[data-key="nw-go"]', t: '按「建立客戶」', d: '還會再確認一次。'},
          {sel: '.dialog .cdl', info: true, t: '確認視窗：手機只顯示末四碼', d: '手機 ••••0111、奶昔・貓、辨識「未植入・橘白、尾巴有結」，通知用簡訊。'},
          {sel: '[data-key="dg-ok"]', t: '按「建立客戶」', d: '溫小姐的資料會出現在列表上，右邊直接打開。'},
          {sel: '.head .sub', info: true, settle: 1000, t: '客戶從 113 位變 114 位', d: '右邊打開溫小姐的資料，列表上也選好了她那一列。安全與照護注意事項可以現在補上。'}
        ]},
      {id: 'merge', title: '合併重複的客戶資料', who: '陳老闆（店家管理者）', query: LIST('admin'),
        scene: '何志明用 LINE 預約過，後來到店時櫃台又幫他建了一筆「何先生」，兩筆是同一支手機。你要一欄一欄比對，決定保留哪個名字和地址，再把兩筆合成一筆。',
        outro: '「何先生」併進「何志明」：芋頭、花生都歸到何志明，花生今天 14:00 的預約改掛過來，4 份已簽契約維持原文。何先生那筆停用並寫入稽核紀錄，列表少了一位，「可能重複」從 2 變 1。',
        steps: [
          {sel: 'li.dupg:has([data-key="b-c-hezm"])', info: true, t: '虛線框起來的是「可能重複」', d: '同一支手機 ••••3047 有兩筆客戶：何志明和何先生，系統判斷可能是同一人。'},
          {sel: '[data-key="b-c-hezm"]', t: '按「比對・合併」', d: '打開比對畫面，兩筆資料左右並排。'},
          {sel: '.cmp-r.top', info: true, t: '左邊何志明，右邊何先生', d: '何志明是 2025/11/23 用 LINE 預約建的；何先生是 2026/8/2 現場預約建的。'},
          {sel: '.cmp-r:has([data-key="bp-name-a"])', info: true, t: '姓名：預設保留「何志明」', d: '有 LINE 那筆的名字。如果想用另一個名字，點右邊就會換。'},
          {sel: '.cmp .auto', group: true, info: true, t: 'LINE、寵物、預約、契約自動處理', d: 'LINE 保留何志明的；寵物全部併入；預約與紀錄全部改掛；已簽契約原文不改寫。'},
          {sel: '.result', info: true, t: '右邊即時顯示合併後的樣子', d: '合併後：何志明，寵物芋頭（原何志明）和花生（原何先生），地址留長安東路那筆。'},
          {sel: '.cqbox', info: true, t: '合併之後會發生什麼', d: '花生今天 14:00 的預約改掛；4 份已簽契約維持原文；之後通知都用 LINE 傳給何志明；何先生那筆停用、寫入稽核紀錄。合併後不能在這裡拆回。'},
          {sel: '[data-key="bn-go"]', t: '按「合併成「何志明」」', d: '如果其實不是同一人，可以按旁邊的「綁定為家人」。'},
          {sel: '.dialog', info: true, t: '確認視窗：把「何先生」併入「何志明」', d: '寵物芋頭、花生；花生今天 14:00 改掛過來；稽核寫入合併前後與原因（手機只記末四碼）。'},
          {sel: '#dg-why', t: '寫下合併原因', d: '店長直接合併也要寫原因，會跟著合併寫入稽核紀錄。', fill: {value: '何先生說之前用 LINE 預約過', label: '何先生說之前用 LINE 預約過'}, until: {value: ['#dg-why', '\\S']}},
          {sel: '[data-key="dg-ok"]', t: '按「確認合併」', d: '合併後不能在這裡拆回。'},
          {sel: '.dp', info: true, t: '何志明：寵物 2 隻', d: '芋頭和花生都在這裡，店內備註兩段都保留。下面的變更紀錄寫著把「何先生」合併進來。'},
          {sel: '[data-key="f-dup"]', info: true, t: '「可能重複」從 2 變 1', d: '列表上何先生那筆不見了，客戶從 113 位變 112 位。'}
        ]},
      {id: 'clerk', title: '櫃台看得到哪些寵物資料', who: '櫃台阿凱', query: LIST('desk'),
        scene: '你是中山店櫃台阿凱。美容師說阿福吹耳朵前最好先戴頭套，請你記到阿福的照護注意事項。櫃台看不到病史和過敏這些敏感資料，但安全標記和照護說明都看得到，也可以補。',
        outro: '櫃台看得到「會咬人」標記和照護說明，攻擊性細節、病史、過敏與內部備註都遮起來。你幫阿福加了「需戴頭套：吹耳朵前先戴」，確認視窗只列出櫃台能改的欄位。',
        steps: [
          {sel: '.head .sub', info: true, t: '櫃台只看自己的分店：中山店 72 位客戶', d: '另一家分店的客戶不會出現在你的列表。'}
        ].concat(findAfu, [
          {sel: AFU + ' .tags', info: true, t: '安全標記照常顯示：會咬人', d: '櫃台一樣看得到「會咬人」，交接時可以提醒同事。'},
          {sel: AFU + ' .pkv', info: true, t: '敏感資料遮起來了', d: '攻擊性說明、疾病史、過敏、內部備註都寫著「需敏感資料權限」。'},
          {sel: AFU + ' .mask-note', info: true, t: '為什麼看不到', d: '櫃台看得到標籤和照護說明；攻擊性說明、病史、過敏、內部備註，以及每次來店的現況說明與服務備註會遮住。需要細節請找店長或美容照護人員。'},
          {sel: '[data-key="ed-afu"]', t: '按「修改注意事項」', d: '櫃台可以新增安全標籤、改照護標籤，敏感欄位是鎖住的。'},
          {sel: '[data-key="tg-safety-會咬人"]', info: true, t: '「會咬人」不能由櫃台移除', d: '櫃台看不到牠為什麼會咬，所以可以新增安全標籤；移除要店長以上確認。'},
          {sel: '[data-key="tg-care-需戴頭套"]', t: '照護標籤選「需戴頭套」', d: '選了之後會多一格說明。'},
          {sel: '#n-care-1', t: '寫下說明', d: '什麼時候戴、怎麼戴。', fill: {value: '吹耳朵前先戴', label: '吹耳朵前先戴'}, until: {value: ['#n-care-1', '\\S']}},
          {sel: '#e-why', t: '寫下修改原因', d: '原因是必填的，會跟著這次修改留下來。', fill: {value: '美容師建議', label: '美容師建議'}, until: {value: ['#e-why', '\\S']}},
          {sel: '[data-key="ed-go"]', t: '按「檢查修改」', d: '先看一次改了什麼，還沒存。'},
          {sel: '.dialog .cdl', info: true, t: '確認視窗：只有照護標籤', d: '櫃台能改的只有標籤和照護說明，所以這裡不會出現過敏或病史。'},
          {sel: '[data-key="dg-ok"]', t: '按「儲存修改」', d: '存好後回到客戶資料。'},
          {sel: AFU + ' .notes.care', info: true, t: '阿福多了「需戴頭套」', d: '「吹耳朵前先戴」，所有店員之後都會看到。'}
        ])},
      /* 阿福的過敏 (prototypes/allergy/): act 1 on 10/9（五）09:40, played inside the director page with ?life=afu-edit; not listed on this page */
      {id: 'life-afu-edit', life: true, query: LIST('admin'), seed: {life: 'afu-edit'}, title: '第 1 幕：更新阿福的過敏', who: '陳老闆（店家管理者）',
        scene: '10/9（五）09:40。蔡先生打電話來：阿福這週吃了牛肉乾，背上又紅又癢，醫生說牠對牛肉也過敏。阿福今天 11:00 要來做精緻美容。你要把阿福的過敏從「雞肉」改成「雞肉、牛肉」，寫下修改原因。',
        outro: '阿福的過敏改成「雞肉、牛肉」，最後修改寫著「今天 09:40・陳老闆（店家管理者）・原因：飼主今天告知」。過敏是敏感資料：店長和美容師看得到全文，櫃台只看到「需敏感資料權限」。接下來看這筆修改到了誰的手上。',
        steps: findAfu.concat([
          {sel: '.dp .nextv', info: true, t: '下次來店：今天 11:00・阿福', d: '精緻美容，中山店美容台 A・阿哲。再過一個多小時阿福就到店了。'},
          {sel: AFU + ' .pkv', info: true, t: '現在的過敏：雞肉', d: '9/30 林店長加的。等一下要改的就是這一格。'},
          {sel: '[data-key="ed-afu"]', t: '按「修改注意事項」', d: '右邊換成修改表單。過敏只有店長和店家管理者能改。'},
          {sel: '#e-allergy', t: '過敏改成「雞肉、牛肉」', d: '直接改寫這一格。', fill: {value: '雞肉、牛肉', label: '雞肉、牛肉'}, until: {value: ['#e-allergy', '牛肉']}},
          {sel: '#e-why', t: '寫下修改原因', d: '原因是必填的，會跟著這次修改留下來。', fill: {value: '飼主今天告知', label: '飼主今天告知'}, until: {value: ['#e-why', '\\S']}},
          {sel: '[data-key="ed-go"]', t: '按「檢查修改」', d: '先看一次改了什麼，還沒存。'},
          {sel: '.dialog .cdl', info: true, t: '確認視窗：雞肉 → 雞肉、牛肉', d: '只列出有改的欄位，原本的灰字、改成的粗字。上面寫著原因：飼主今天告知。'},
          {sel: '[data-key="dg-ok"]', t: '按「儲存修改」', d: '存好後回到客戶資料。'},
          {sel: AFU + ' .pkv', info: true, t: '過敏變成「雞肉、牛肉」', d: '阿福今天 11:00 來店，美容師看到的就是這一格。'},
          {sel: AFU + ' .lastedit', info: true, t: '修改紀錄更新了', d: '「最後修改 今天 09:40・陳老闆（店家管理者）・原因：飼主今天告知」。'}
        ])},
      /* 郭太太的刪除申請 (prototypes/erase): act 2, the page as it is on 10/9（五）11:20 */
      {id: 'life-del-review', life: true, query: LIST('mgr'), seed: {life: 'del-review'}, title: '第 2 幕：客戶資料裡的刪除請求', who: '林店長',
        scene: '10/9（五）11:20，你是中山店的林店長。陳老闆說儀表板上有「待審刪除 2」。先在客戶資料找到要求刪除的客戶，看郭太太的這一筆還剩幾天、該去哪裡處理。',
        outro: '郭太太 10/3 在 LINE 申請刪除，剩 24 天（11/2 前要有結果）。客戶資料只告訴你有這件事、還剩幾天；核准或不刪除，要在審核台決定。下一幕到審核台。',
        steps: [
          {sel: '[data-key="f-del"]', t: '按「刪除請求」', d: '列表只留下要求刪除個資的客戶。中山店有兩位：許小姐和郭太太。'},
          {sel: '[data-key="r-c-zhou"]', info: true, t: '郭太太：刪除請求・剩 24 天', d: '列表上就標著還剩幾天。許小姐只剩 3 天，但球球今天還有預約，要先處理那筆。'},
          {sel: '[data-key="r-c-zhou"]', t: '按郭太太這一列', d: '右邊會打開客戶資料。'},
          {sel: '.relbox.del', info: true, t: '個資刪除請求・剩 24 天', d: '10/3 飼主在 LINE「我的資料」申請。核准後一般個資去識別化；已簽契約與證據鏈依法保留。'},
          {sel: '[data-key="dp-del"]', info: true, t: '「在審核台審核」', d: '刪除要店長以上在審核台決定，櫃台和美容師看不到這個按鈕。下一幕就從審核台開始，這裡先不用按。'}
        ]}
    ]
  });
})();
