/* 用量監控（寵派後台）: hints and guided tours for test mode. Format: test-kit/flows/README.md
   冠宇・最高管理者 reads 寵派 OA's month and how fast each shop burns through its plan, opens one shop, reminds 汪汪俱樂部 to
   upgrade, and pauses its marketing pushes after the 10/8 spike. One action or one explanation per step. The prototype
   rewrites ?go= away, so tours ask for it to be absent. On a phone (under 720 px) the 燃燒扇 chart and every action are
   left out, so the reading tour skips the chart steps there and the other tours need a wide screen. The fan's lines are
   SVG groups, so tours open a shop from its 看用量 button instead. */
(function () {
  var S = {role: 'super', go: null};

  PP.register('usage-monitor', {
    name: '用量監控',
    minWidth: 720,   /* 手機只能看 */
    hints: [
      {sel: '[data-key="own"]', t: '寵派 OA 這個月', d: '所有店的通知都從寵派 OA 送出：用了多少、付給 LINE 多少', tour: 'read'},
      {sel: '[data-key="q-rem-ww-sms"]', t: '提醒升級', d: '寄給店家管理者，不會改任何方案', tour: 'remind'},
      {sel: '[data-key="q-pause-ww"]', t: '暫停行銷推播', d: '只停行銷推播；交易通知與契約照常', tour: 'pause'},
      {sel: '[data-key="met-sms"]', t: '換看簡訊或契約', d: '燃燒扇可以切換 LINE、簡訊、契約', quiet: true},
      {sel: '[data-key="q-look-mhr-sms"]', t: '看用量', d: '這家店的每項用量、每天的走勢與本月超量估計', quiet: true}
    ],
    tours: [
      {id: 'read', title: '看懂寵派 OA 用量與各店的燃燒速度', who: '冠宇（寵派最高管理者）', query: S, minWidth: 0,
        scene: '所有店家的 LINE 通知都從寵派自己的 OA 送出，LINE 的費用由寵派付；各店方案有含量，超過的部分月底向店家收。今天 10/9，你想知道寵派 OA 這個月會花多少、哪幾家店會超量。這個引導只看不改。',
        outro: '寵派 OA 這個月 LINE 到今天 4,959 則，月底約 14,070 則，付給 LINE 約 NT$3,013；各店超量約 NT$920，11/1 隨月費扣。照目前速度：毛孩日和 LINE 約 86%、簡訊約超 181 則；汪汪俱樂部 10/8 一次行銷推播 1,320 則，簡訊月底約超 739 則。交易通知與契約簽署永遠不會因為用量被擋，超過只會月底計費。',
        steps: [
          {sel: '[data-key="own-dl"]', info: true, t: 'LINE：到今天 4,959 則', d: '照這個速度月底約 14,070 則，寵派本月預算 30,000 的 47%。'},
          {sel: '[data-key="own-cost"]', info: true, t: '付給 LINE 約 NT$3,013', d: '月費 1,400＋超過含量的 8,070 則 × 0.2（未稅）。'},
          {sel: '[data-key="own-in"]', info: true, t: '向店家收約 NT$920', d: '各店本月的超量，11/1 隨月費一起扣。'},
          {minWidth: 720, sel: '[data-key="fan-chart"]', info: true, t: '燃燒扇：每條線是一家店', d: '以它自己方案的上限為 100%；實線到今天，虛線是照目前速度到 10/31。越過上限照常發送，月底計超量。'},
          {minWidth: 720, sel: '[data-key="spk-ww"]', info: true, t: '10/8 行銷推播 1,320 則', d: '汪汪俱樂部那天對全部飼主發了行銷推播，線突然往上跳。'},
          {minWidth: 720, sel: '[data-key="met-sms"]', t: '切到「簡訊」', d: '看看誰的簡訊會超量。', until: {checked: '[data-key="met-sms"]'}},
          {minWidth: 720, sel: '[data-key="fan-words"]', info: true, t: '簡訊：汪汪 149%、毛孩日和 136%', d: '汪汪月底約 2,240／1,500 則；毛孩日和約 680／500 則。多半是 LINE 被封鎖或沒綁後改傳簡訊。'},
          {sel: '[data-key="qg-over"]', info: true, t: '需要處理：月底會超量 2 家', d: '交易通知與契約照常送，月底計費。超量隨 11/1 03:00 月費一起扣。'},
          {sel: '[data-key="q-look-mhr-sms"]', t: '在毛孩日和那列按「看用量」', d: '看這家店的細節。'},
          {sel: '[data-key="dp-meters"]', info: true, t: '毛孩日和本月用量', d: 'LINE 月底約 4,320／5,000、簡訊約 680／500、契約約 270／300；員工 9／10 席、分店 2／2 家（新增會被擋）。'},
          {sel: '[data-key="dp-fee"]', info: true, t: '本月超量估計 NT$181', d: '簡訊約 181 則 × NT$1，11/1 隨月費扣（未稅）。'},
          {sel: '[data-key="dp-log"]', info: true, t: '10/5 已經提醒過陳老闆升級', d: '同一家店 7 天內不能再提醒，10/12 後才能再寄。'},
          {sel: '[data-key="dp-x"]', t: '按 ✕ 關閉', d: '回到用量監控。'},
          {sel: '[data-key="qg-wall"]', info: true, t: '已到上限・新增會被擋', d: '汪汪分店 3／3、毛孩日和分店 2／2：系統自動擋新增，只做告知，不需要處理。'}
        ]},
      {id: 'remind', title: '提醒汪汪俱樂部升級方案', who: '冠宇（寵派最高管理者）', query: S,
        scene: '汪汪俱樂部照這個速度，簡訊月底約 2,240 則，超過專業方案的 1,500 則約 739 則，要多付約 NT$739。你想寄一封提醒給張店長，讓他知道。提醒不會改任何方案，升級由店家自己決定。',
        outro: '提醒寄給了張店長（寵派商家中心通知＋Email，地址只顯示一部分），內容是月底簡訊約超 739 則、加收約 NT$739，而且通知照常送出不會被擋。這次寄送記在稽核中心；7 天內不能再提醒這家店，10/16 後才能再寄。',
        steps: [
          {sel: '[data-key="q-over-ww-sms"]', info: true, t: '汪汪：簡訊月底約 2,240／1,500 則', d: '照這個速度 10/21 用完含量，月底約超 739 則、加收約 NT$739。照常發送，不會被擋。'},
          {sel: '[data-key="q-rem-ww-sms"]', t: '按「提醒升級」', d: '先看會寄出什麼。'},
          {sel: '[data-key="dlg"] .cdl', info: true, t: '寄給張店長', d: '店家管理者；Email 只顯示 c•••@wangwang.tw。用寵派商家中心通知＋Email，7 天內不能再提醒。'},
          {sel: '[data-key="rem-prev"]', info: true, t: '店家看到的內容', d: '月底簡訊約超 739 則、加收約 NT$739；通知與簽署照常送出，不會被擋。用量一直這麼高可以談品牌總部方案。'},
          {sel: '[data-key="dlg"] .aud', info: true, t: '不會改任何方案', d: '寄出後記在稽核中心；升級由店家自己決定。'},
          {sel: '[data-key="dlg-ok"]', t: '按「寄出提醒」', d: '寄給張店長。'},
          {settle: 1500, timeout: 9000, sel: '[data-key="q-over-ww-sms"]', info: true, t: '10/9 已提醒・10/16 後可再提醒', d: '「提醒升級」按鈕停用到 10/16，避免一直打擾店家。'}
        ]},
      {id: 'pause', title: '汪汪亂發行銷推播：先暫停一週', who: '冠宇（寵派最高管理者）', query: S,
        scene: '汪汪俱樂部 10/8 15:00 對全部飼主發了行銷推播 1,320 則，LINE 用量暴增 10 倍，本週被飼主封鎖的比例從 1.2% 升到 4.1%。被封鎖的飼主之後連預約提醒都只能收簡訊。你決定先暫停它的行銷推播一週，再聯絡張店長。小心：只能停行銷，預約與契約通知一定要照常。',
        outro: '汪汪俱樂部的行銷推播暫停到 10/16，原因寫進通知寄給張店長，也記在稽核中心。暫停期間只停店家發的優惠、活動推播；預約確認與提醒、待簽署與契約正本、可接回、取消改期結果、付款提醒都照常送出。用量突增那列標著「行銷推播暫停中・到 10/16」。',
        steps: [
          {sel: '[data-key="q-spike-ww-line"]', info: true, t: '用量突增：10/8 LINE 1,444 則', d: '平日約 137 則（10.5 倍）。其中 1,320 則是 15:00 發給全部飼主的行銷推播；LINE／通知管理已經開了封鎖事故。'},
          {sel: '[data-key="q-pause-ww"]', t: '按「暫停行銷推播」', d: '先看會停什麼、不停什麼。'},
          {sel: '[data-key="pz-two"]', info: true, t: '只停行銷，交易通知照常', d: '會暫停：店家發給飼主的優惠、活動。照常：預約確認・提醒、待簽署・契約正本、可接回、取消・改期結果、付款提醒。'},
          {sel: '[data-key="pz-u-w"]', info: true, t: '暫停到 10/16（一週）', d: '已經幫你選好；也可以到月底，或直到手動解除。'},
          {sel: '[data-key="dlg-ok"]', t: '先直接按「暫停行銷推播」', d: '看看漏了什麼。'},
          {sel: '[data-key="dlg"] .field:has(#pz-why)', info: true, t: '要寫暫停原因', d: '至少 10 個字。張店長會收到通知與原因，也會記在稽核中心。'},
          {sel: '#pz-why', t: '寫下暫停原因', d: '讓張店長知道為什麼。', fill: {value: '10/8 對全部飼主發行銷推播後封鎖率升到 4.1%，先暫停並聯絡店家', label: '10/8 對全部飼主發行銷推播後封鎖率升到 4.1%，先暫停並聯絡店家'}, until: {value: ['#pz-why', '.{10,}']}},
          {sel: '[data-key="dlg-ok"]', t: '按「暫停行銷推播」', d: '立刻生效。'},
          {settle: 1500, timeout: 9000, sel: '[data-key="q-spike-ww-line"]', info: true, t: '行銷推播暫停中・到 10/16', d: '可以按「看暫停」看細節或提早解除。'},
          {sel: '[data-key="q-sp-line-ww"]', info: true, t: '封鎖事故在 LINE／通知管理', d: '被封鎖的通知已改傳簡訊；客服在那裡處理。'}
        ]},
      {id: 'life-sms-spot', life: true, seed: {life: 'sms-spot'}, title: '第 1 幕：毛孩日和的簡訊會超量', who: '冠宇（寵派最高管理者）', query: S,
        scene: '10/5（一）上午 10:30，這個月才第 5 天。你在用量監控看各店的燒法：毛孩日和用基本方案，簡訊含量 500 則，照這個速度會不夠。寄一封提醒給陳老闆，讓他知道。提醒不會改任何方案，要不要升級由店家決定。',
        outro: '提醒寄給了陳老闆（寵派商家中心通知＋Email）：照目前速度簡訊月底約 770 則，超過 500 則約 267 則，月底加收約 NT$267，契約也會超約 5 份；通知照常送出，不會被擋。這次寄送記在稽核中心，7 天內不能再提醒毛孩日和，10/12 後才能再寄。',
        steps: [
          {sel: '[data-key="q-over-mhr-sms"]', info: true, t: '毛孩日和：簡訊月底約 770／500 則', d: '到今天 110 則，照這個速度 10/21 用完，月底約超 267 則、加收約 NT$267。照常發送，不會被擋。'},
          {sel: '[data-key="q-look-mhr-sms"]', t: '按「看用量」', d: '先看這家店的細節。'},
          {sel: '[data-key="dp-meters"]', info: true, t: '毛孩日和本月用量', d: '簡訊月底約 770／500、契約約 310／300、LINE 約 4,870／5,000；分店 2／2 家，新增會被擋。'},
          {sel: '[data-key="dp-fee"]', info: true, t: '本月超量估計 NT$277', d: '簡訊約 267 則 NT$267、契約約 5 份 NT$10，11/1 隨月費扣（未稅）。'},
          {sel: '[data-key="dp-x"]', t: '按 ✕ 關閉', d: '回到需要處理的清單。'},
          {sel: '[data-key="q-rem-mhr-sms"]', t: '在毛孩日和簡訊那列按「提醒升級」', d: '先看會寄出什麼。'},
          {sel: '[data-key="dlg"] .cdl', info: true, t: '寄給陳老闆', d: '店家管理者；Email 只顯示一部分。用寵派商家中心通知＋Email，7 天內不能再提醒。'},
          {sel: '[data-key="rem-prev"]', info: true, t: '店家看到的內容', d: '簡訊月底約超 267 則、契約約超 5 份，LINE 接近上限；通知與簽署照常送出，不會被擋。在「方案與用量」就能升級。'},
          {sel: '[data-key="dlg-ok"]', t: '按「寄出提醒」', d: '寄給陳老闆。'},
          {settle: 1500, timeout: 9000, sel: '[data-key="q-over-mhr-sms"]', info: true, t: '10/5 已提醒・10/12 後可再提醒', d: '「提醒升級」停用到 10/12。接下來換陳老闆看到這封提醒。'}
        ]}
    ]
  });
})();
