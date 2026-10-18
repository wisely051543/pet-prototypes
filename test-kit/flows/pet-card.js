/* S-04 寵物卡: hints and guided tours for test mode. Format: test-kit/flows/README.md
   Tours speak the shop's voice: 寵物, not 毛孩. One action or one explanation per step. */
(function () {
  var Q = function (role) { return {role: role, pet: 'afu', off: null}; };
  var BAND = 'section.panel.band';
  var TODAY = 'ol.visits > li:first-child';

  PP.register('pet-card', {
    name: '寵物卡',
    hints: [
      {sel: '[data-key="edit"]', t: '修改注意事項', d: '加減標籤、寫照護說明；要寫原因，會留下紀錄', tour: 'edit'},
      {sel: '[data-key="add"]', t: '新增服務備註', d: '記下今天服務時發生的事，下次來的人看得到', tour: 'note'},
      {sel: '[data-key="log"]', t: '修改紀錄', d: '誰、什麼時候、為什麼改了注意事項', tour: 'read'},
      {sel: '[data-key="older"]', t: '顯示更早的來店', d: '每次來店的現況、備註與誰做的', quiet: true},
      {sel: '[data-key="nav-board"], [data-key="back"]', t: '今日看板', d: '回到今天所有寵物的流程', quiet: true},
      {sel: '[data-key="nav-search"]', t: '掃 QR／查詢預約', d: '掃飼主的 QR，或用手機末四碼找預約', quiet: true},
      {sel: '[data-key="nav-me"]', stub: true}
    ],
    tours: [
      {id: 'read', title: '櫃台看阿福的寵物卡', who: '櫃台阿凱', query: Q('desk'),
        scene: '阿福正在美容台 A 做精緻美容。蔡先生打電話來問狀況，你打開阿福的寵物卡：先看安全提醒，再看今天和以前每次來店的紀錄。',
        outro: '寵物卡最上面是阿福和今天的進度，接著是注意事項：「會咬人」的標籤櫃台看得到，細節和病史、過敏、內部備註要店長或美容照護才看得到。下面是每次來店的現況與備註，最新的在上面。',
        steps: [
          {sel: '.who', info: true, t: '阿福：服務中，臉環 2/6', d: '黃金獵犬，飼主蔡先生 ••••1180。今天 11:00–13:30 精緻美容，美容台 A・阿哲。'},
          {sel: BAND + ' .safe-rows', info: true, t: '安全提醒：阿福會咬人', d: '標籤一定看得到。細節（什麼時候會咬、怎麼保定）櫃台看不到，寫著「需敏感資料權限」。交接時記得提醒美容師。'},
          {sel: BAND + ' .care-rows', info: true, t: '照護：怕吹風機', d: '「改用低風量分段吹」。照護說明每個人都看得到。'},
          {sel: BAND + ' .mask-note', info: true, t: '為什麼有些看不到', d: '櫃台看不到攻擊性說明、病史、過敏與內部備註。需要細節時請店長或美容照護人員查看。'},
          {sel: TODAY, info: true, t: '今天：耳朵異常', d: '到店現況其餘 5 項正常。異常的說明和阿哲 11:15 寫的服務備註，櫃台都只看到鎖頭；細節請問美容師。'},
          {sel: 'ol.visits > li:nth-child(2)', info: true, t: '上一次 9/14：耳朵異常', d: '每次來店都記著誰做的、哪張美容台、體重，以及哪一項異常、有幾則備註。說明內容櫃台看不到。'},
          {sel: '[data-key="older"]', t: '按「顯示更早 7 筆」', d: '阿福來店 11 次，預設只顯示最近幾次。'},
          {sel: 'ol.visits', info: true, t: '全部 13 筆都展開了', d: '已取消、未到的也留著，寫著原因。'}
        ]},
      {id: 'note', title: '記下今天服務時的一件事', who: '櫃台阿凱', query: Q('desk'),
        scene: '阿哲說阿福今天吹風很配合。你要把這件事記在阿福今天的來店紀錄裡，下次來的人就知道。',
        outro: '備註記在阿福今天的來店紀錄下，寫著你的名字和時間，所有店員都看得到。沒網路時也能寫，會標「待同步」，連線後自動送出。',
        steps: [
          {sel: TODAY, info: true, t: '今天的來店紀錄', d: '現況和阿哲 11:15 寫的備註都在這裡。'},
          {sel: '[data-key="add"]', t: '按「新增服務備註」', d: '會在今天這筆下面打開一個輸入框。'},
          {sel: '#cp', t: '寫下備註', d: '寫事實就好，例如今天怎麼了、怎麼處理。', fill: {value: '今天吹風很配合', label: '今天吹風很配合'}, until: {value: ['#cp', '\\S']}},
          {sel: '[data-key="cp-save"]', t: '按「儲存備註」', d: '沒寫字的時候這顆是灰的。'},
          {sel: TODAY, info: true, t: '備註加在今天的紀錄下', d: '寫著你的名字阿凱和時間。'}
        ]},
      {id: 'edit', title: '幫阿福加一個照護標籤', who: '櫃台阿凱', query: Q('desk'),
        scene: '蔡先生說阿福最近很怕剪刀。你要在阿福的注意事項加上「怕剪刀」。櫃台可以改標籤和照護說明；攻擊性說明、病史與內部備註由店長改。',
        outro: '阿福多了「怕剪刀」的照護標籤，注意事項從 2 項變 3 項。這次修改以「阿凱（櫃台）」和原因「飼主今天告知」寫進修改紀錄，之後不能刪除。',
        steps: [
          {sel: BAND, info: true, t: '現在的注意事項：會咬人、怕吹風機', d: '每次修改都會留下紀錄，按「修改紀錄」可以看。'},
          {sel: '[data-key="edit"]', t: '按「修改注意事項」', d: '會打開修改視窗。'},
          {sel: '.dialog fieldset.fs:first-of-type', info: true, t: '櫃台改不了的地方是鎖住的', d: '會咬人的說明、疾病史、過敏、內部備註都寫著「需敏感資料權限」。安全標籤可以新增，但已經有的「會咬人」移除要店長以上。'},
          {sel: '[data-key="tg-care-怕剪刀"]', t: '照護標籤選「怕剪刀」', d: '選了之後可以寫一句說明，這次先不寫。'},
          {sel: '#f-why', t: '寫下修改原因', d: '原因是必填的。', fill: {value: '飼主今天告知', label: '飼主今天告知'}, until: {value: ['#f-why', '\\S']}},
          {sel: '[data-key="ed-next"]', t: '按「下一步：確認修改」', d: '先看一次改了什麼，還沒存。'},
          {sel: '.dialog ul.diff', info: true, t: '確認修改 1 項：新增照護「怕剪刀」', d: '儲存後無法刪除，會以「阿凱（櫃台）」寫入修改紀錄。'},
          {sel: '[data-key="ed-save"]', t: '按「儲存修改」', d: '所有店員之後都會看到。'},
          {sel: BAND + ' .care-rows', info: true, t: '照護多了「怕剪刀」', d: '注意事項從 2 項變 3 項。'},
          {sel: '#log-l > li:first-child', info: true, t: '修改紀錄自動打開：阿凱（櫃台）新增照護「怕剪刀」', d: '誰、什麼時候、改了什麼、原因都寫著。'},
          {sel: '#log-l > li:nth-child(2)', info: true, t: '櫃台看不到的內容，紀錄裡也遮住', d: '8/2 林店長新增「會咬人」時寫的說明，櫃台看到的是「內容已遮罩」。'}
        ]},
      {id: 'groomer', title: '美容師看到的寵物卡', who: '美容師小葵', query: Q('groomer'),
        scene: '你是美容師小葵，等一下要幫阿福剪指甲。美容照護看得到攻擊性說明、病史和過敏，動手前先看清楚。',
        outro: '美容師看得到阿福的完整注意事項：剪指甲與吹耳朵時會咬、需兩人保定；異位性皮膚炎（服藥中）、對雞肉過敏。注意事項由櫃台或店長修改，美容師可以新增服務備註。',
        steps: [
          {sel: BAND + ' .safe-rows', info: true, t: '會咬人：剪指甲與吹耳朵時會咬，需兩人保定', d: '美容照護看得到說明全文。剪指甲前先找第二個人幫忙保定。'},
          {sel: BAND + ' .health', info: true, t: '疾病史與過敏', d: '異位性皮膚炎，背部易起疹（服藥中）；對雞肉過敏。洗劑和零食要留意。'},
          {sel: BAND + ' .internal', info: true, t: '內部備註', d: '飼主上次覺得剪太短，修剪長度先跟飼主確認。'},
          {sel: BAND + ' .band-foot', info: true, t: '注意事項由櫃台或店長修改', d: '美容師不能改注意事項；有新發現，寫在服務備註裡。'}
        ]},
      /* 阿福的過敏 (prototypes/allergy/): acts 2, 4 and 5 on 10/9（五）, played inside the director page with ?life=<act>; not listed on this page */
      {id: 'life-afu-desk', life: true, query: Q('desk'), seed: {life: 'afu-desk'}, title: '第 2 幕：櫃台看阿福的寵物卡', who: '櫃台阿凱',
        scene: '10/9（五）10:50。阿福 11:00 要來做精緻美容。早上陳老闆在店裡的群組說：「阿福的資料我改了，大家看一下。」你是櫃台阿凱，在店裡的平板打開阿福的寵物卡，看改了什麼。',
        outro: '櫃台看得到「會咬人」「怕吹風機」這些標籤，看不到過敏的內容，只看到鎖頭。修改紀錄告訴你：過敏今天 09:40 被陳老闆改過，原因是飼主今天告知。報到時提醒美容師阿哲：動手前先看寵物卡。',
        steps: [
          {sel: '.who', info: true, t: '阿福：今天 11:00–13:30，還沒報到', d: '黃金獵犬，飼主蔡先生 ••••1180。精緻美容，美容台 A・阿哲。臉環 0/6。'},
          {sel: BAND + ' .safe-rows', info: true, t: '安全提醒：阿福會咬人', d: '標籤一定看得到。細節（什麼時候會咬、怎麼保定）櫃台看不到，寫著「需敏感資料權限」。'},
          {sel: BAND + ' .health', info: true, t: '過敏：需敏感資料權限', d: '疾病史和過敏，櫃台只看到鎖頭，看不到內容。'},
          {sel: BAND + ' .mask-note', info: true, t: '為什麼看不到', d: '櫃台看不到攻擊性說明、病史、過敏與內部備註。需要細節時請店長或美容照護人員查看。'},
          {sel: '[data-key="log"]', t: '按「修改紀錄」', d: '看看今天誰改了什麼。'},
          {sel: '#log-l > li:first-child', info: true, t: '今天 09:40，陳老闆改了過敏', d: '改成什麼櫃台看不到，寫著「內容已遮罩」；原因是「飼主今天告知」。你知道過敏今天改過，報到時要提醒阿哲。'}
        ]},
      {id: 'life-afu-groom', life: true, query: Q('groomer'), seed: {life: 'afu-groom'}, title: '第 4 幕：動手前看過敏', who: '美容師阿哲',
        scene: '11:05，阿凱幫阿福報到了，交接時提醒你：「阿福的過敏今天改過，先看寵物卡。」你是美容師阿哲，等一下要幫阿福洗澡、吹毛、剪指甲。動手前，在手機上打開阿福的寵物卡。',
        outro: '美容照護看得到阿福的過敏全文「雞肉、牛肉」，也看得到是誰、什麼時候、為什麼改的，還有阿凱報到時記下的背部紅疹。注意事項由櫃台或店長修改；你有新發現，寫在服務備註裡。',
        steps: [
          {sel: '.who', info: true, t: '阿福：服務中，臉環 2/6', d: '今天 11:00–13:30 精緻美容，美容台 A，就是你。'},
          {sel: BAND + ' .safe-rows', info: true, t: '會咬人：剪指甲與吹耳朵時會咬，需兩人保定', d: '美容照護看得到說明全文。剪指甲前先找第二個人幫忙保定。'},
          {sel: BAND + ' .health', info: true, t: '過敏：雞肉、牛肉', d: '牛肉是今天早上才加的。疾病史：異位性皮膚炎，背部易起疹（服藥中）。洗劑和零食都要留意。'},
          {sel: '[data-key="log"]', t: '按「修改紀錄」', d: '看看牛肉是誰、什麼時候加的。'},
          {sel: '#log-l > li:first-child', info: true, t: '今天 09:40，陳老闆：過敏 雞肉 → 雞肉、牛肉', d: '原因：飼主今天告知。美容照護看得到改前和改後。'},
          {sel: TODAY, info: true, t: '今天的現況：皮膚，背部兩處紅疹，會癢', d: '阿凱報到時記的，其餘 5 項正常。'}
        ]},
      {id: 'life-afu-note', life: true, query: Q('groomer'), seed: {life: 'afu-note'}, title: '第 5 幕：記下今天怎麼洗', who: '美容師阿哲',
        scene: '13:20，阿福洗好、剪好了。你用了低敏洗劑，也沒給店裡的零食；背上的紅疹沒有變多。把這件事記在阿福今天的來店紀錄裡，下次來的人就知道。',
        outro: '阿福今天的來店紀錄多了一則備註，寫著阿哲和 13:20。所有店員都看得到：下次阿福來，接手的人一打開寵物卡就知道上次怎麼洗。',
        steps: [
          {sel: TODAY, info: true, t: '今天的來店紀錄', d: '現況：皮膚，背部兩處紅疹，會癢。阿凱 10:56 記的。'},
          {sel: '[data-key="add"]', t: '按「新增服務備註」', d: '會在今天這筆下面打開一個輸入框。'},
          {sel: '#cp', t: '寫下備註', d: '寫今天做了什麼、結果怎樣。', fill: {value: '用低敏洗劑，沒給零食；背部紅疹沒有變多', label: '用低敏洗劑，沒給零食；背部紅疹沒有變多'}, until: {value: ['#cp', '\\S']}},
          {sel: '[data-key="cp-save"]', t: '按「儲存備註」', d: '沒寫字的時候這顆是灰的。'},
          {sel: TODAY, info: true, t: '備註加在今天的紀錄下', d: '寫著阿哲和 13:20。所有店員都看得到。'}
        ]}
    ]
  });
})();
