const CN_SOURCE = "https://thewoksoflife.com/category/recipes/chinese-take-out/";
const CN_HOME = "https://thewoksoflife.com/";
const WEST_SOURCE = "https://www.bbcgoodfood.com/recipes/category/cuisine-collections?page=2";
const WEST_ESSENTIAL = "https://www.bbcgoodfood.com/howto/guide/21-essential-recipes-to-learn-for-life";

const c = (name, en, region, ingredients, steps, img = "", source = CN_SOURCE, media = null, timing = null, servings = null, extra = {}) => ({ name, en, region, ingredients, steps, img, source, ...(media ? { media } : {}), ...(timing ? { timing } : {}), ...(servings != null ? { servings } : {}), ...extra });
const w = (name, en, region, ingredients, steps, img = "", source = WEST_SOURCE, media = null, timing = null, servings = null, extra = {}) => ({ name, en, region, ingredients, steps, img, source, ...(media ? { media } : {}), ...(timing ? { timing } : {}), ...(servings != null ? { servings } : {}), ...extra });

export const chinese = [
  c("番茄炒蛋", "Tomato and Egg Stir-fry", "家常菜", "鸡蛋3个；中等大小番茄2个；盐1克；糖2克；食用油适量", "1）准备鸡蛋3个、中等大小番茄2个、盐1克、糖2克和适量食用油。2）鸡蛋去壳后充分打散，番茄切成小块备用。3）锅中倒入适量食用油，油热后倒入蛋液。4）待鸡蛋稍稍凝固，将鸡蛋推到锅的一边，放入番茄块，翻炒均匀。5）加入2克糖，翻炒均匀后以大火收汁。6）关火，加入1克盐翻炒均匀，装盘。", "01-fanqie-chaodan.png", "https://www.douguo.com/cookbook/1192179.html", {
    sourceName: "豆果美食",
    recipePageUrl: "https://www.douguo.com/cookbook/1192179.html",
    mediaPageUrl: "https://m.douguo.com/recipe/imgs/1192179",
    author: "乐悠厨房",
    rightsNotice: "©本菜谱的做法由 乐悠厨房 编写，未经授权不得转载",
    reuseLicense: null,
    repositoryCopyAuthorization: "user_confirmed_2026-09-16",
    hero: {
      path: "assets/dishes/sources/cn-001-tomato-egg/hero.jpg",
      originalUrl: "https://cp1.douguo.com/upload/caiku/4/c/1/600_4c8a34f6246664ad31d9be666c411551.jpg",
      sha256: "3029a1cd4894c37c99a9768b3f33455d04185a10921b30625de476ce226a8c06",
      httpStatus: 200,
      contentType: "image/jpeg"
    },
    steps: [
      { stepOrder: 1, path: "assets/dishes/sources/cn-001-tomato-egg/step-01.jpg", originalUrl: "https://cp1.douguo.com/upload/caiku/d/1/5/600_d16ec4970939a44dc91b596784fa7145.jpg", sha256: "bc2fea2d2906b7be606b78ff6ce56be27290c496dadeac585533f8279ed59018", httpStatus: 200, contentType: "image/jpeg" },
      { stepOrder: 2, path: "assets/dishes/sources/cn-001-tomato-egg/step-02.jpg", originalUrl: "https://cp1.douguo.com/upload/caiku/d/8/3/600_d8717ab7eb3ec403854a22f03ea79753.jpg", sha256: "5385ff2b4774fe3e50c35d47f81279fd044acf6709e6cd8f42e4e78919f56640", httpStatus: 200, contentType: "image/jpeg" },
      { stepOrder: 3, path: "assets/dishes/sources/cn-001-tomato-egg/step-03.jpg", originalUrl: "https://cp1.douguo.com/upload/caiku/f/6/1/600_f64de097ff0782fc2bd339ccead67341.jpg", sha256: "1f7d67f5a85ebf8369650a887f8c681954643deb40f1a14ed925ee655607ea5d", httpStatus: 200, contentType: "image/jpeg" },
      { stepOrder: 4, path: "assets/dishes/sources/cn-001-tomato-egg/step-04.jpg", originalUrl: "https://cp1.douguo.com/upload/caiku/b/2/b/600_b258732cc6e830a7448cdec7baac38fb.jpg", sha256: "599c6275848ffaf522e27a81c69f6a7f6d3db2543b767d3c5e335e6e40fe9ff5", httpStatus: 200, contentType: "image/jpeg" },
      { stepOrder: 5, path: "assets/dishes/sources/cn-001-tomato-egg/step-05.jpg", originalUrl: "https://cp1.douguo.com/upload/caiku/4/f/b/600_4f644799eed12ebf23400f2b6e6bc6fb.jpg", sha256: "b026da1a1bbc6ce4510769fca0f3e431b60685beb0bc44483e68b269c6a0b427", httpStatus: 200, contentType: "image/jpeg" },
      { stepOrder: 6, path: "assets/dishes/sources/cn-001-tomato-egg/step-06.jpg", originalUrl: "https://cp1.douguo.com/upload/caiku/3/e/2/600_3e57816522f39809b1903083c1baddb2.jpg", sha256: "626474ca090cdc8b65a89b0e6cdaf7018c21f14ad5376ea0c79015111f5e489e", httpStatus: 200, contentType: "image/jpeg" }
    ]
  }),
  c("宫保鸡丁", "Kung Pao Chicken", "川菜", "炒花生用植物油1茶匙；生花生米1杯（去壳，可带皮或去皮）；鸡胸肉约340克，切约2厘米丁；腌料：植物油1茶匙、玉米淀粉1茶匙、绍兴酒1茶匙、盐1/8茶匙、白胡椒粉1撮；碗汁：生抽1汤匙、老抽1/2茶匙、米醋1汤匙、白糖1茶匙、清水3汤匙、玉米淀粉1茶匙；炒制用食用油3汤匙；大蒜3瓣，拍碎后切片；姜2薄片，切末；干红辣椒2个；花椒粉1/2茶匙；葱白6根，切约2厘米段", "1）炒锅置中火，加入1茶匙植物油和1杯生花生米，不断翻炒3分钟以免焦煳；关火后利用余温继续翻炒1分钟，盛出并彻底放凉，花生冷却后会变酥。也可以跳过炒花生，直接使用烤熟的去壳花生。2）将约340克鸡胸肉切成约2厘米丁，加入1茶匙植物油、1茶匙玉米淀粉、1茶匙绍兴酒、1/8茶匙盐和1撮白胡椒粉，拌匀后腌制20分钟。3）将1汤匙生抽、1/2茶匙老抽、1汤匙米醋、1茶匙白糖、3汤匙清水和1茶匙玉米淀粉放入碗中，充分搅匀备用。4）炒锅以高火烧热，加入2汤匙食用油，下腌好的鸡丁煎至表面上色，盛出备用。5）转小火，另加1汤匙食用油，依次放入大蒜片、姜末、干红辣椒、花椒粉和葱白段，翻炒1—2分钟至出香。6）倒回鸡丁，转高火翻炒1分钟；再次搅匀碗汁，使沉底的淀粉重新混合后倒入锅中，再高火翻炒1分钟，至酱汁迅速变稠并均匀裹住鸡丁。7）加入完全放凉的花生米，快速翻匀后立即出锅。", "02-gongbao-jiding.png", "https://thewoksoflife.com/kung-pao-chicken/", {
    sourceName: "The Woks of Life",
    recipePageUrl: "https://thewoksoflife.com/kung-pao-chicken/",
    mediaPageUrl: "https://thewoksoflife.com/kung-pao-chicken/",
    author: "Judy",
    rightsNotice: "All Rights Reserved © The Woks of Life",
    reuseLicense: null,
    repositoryCopyAuthorization: "user_confirmed_2026-09-16",
    hero: {
      path: "assets/dishes/sources/cn-002-kung-pao-chicken/hero.jpg",
      originalUrl: "https://thewoksoflife.com/wp-content/uploads/2019/05/kung-pao-chicken-14.jpg",
      sha256: "f5010a354ba31204ab8635fc99ecaacb2b08b6eedc20714cfc6018433b397072",
      httpStatus: 200,
      contentType: "image/webp"
    },
    steps: [
      { stepOrder: 1, path: "assets/dishes/sources/cn-002-kung-pao-chicken/step-01-01.jpg", originalUrl: "https://thewoksoflife.com/wp-content/uploads/2019/05/kung-pao-chicken-2.jpg", sha256: "4bbd864f2237db1331ebc46476249c6f2da34dfddbfc4e51d6da1a6866398046", httpStatus: 200, contentType: "image/webp" },
      { stepOrder: 2, path: "assets/dishes/sources/cn-002-kung-pao-chicken/step-02.jpg", originalUrl: "https://thewoksoflife.com/wp-content/uploads/2019/04/kung-pao-chicken.jpg", sha256: "86cda471dc9f35d02a97693d68c07f32c96869a8f7304191fc503a3d736c0391", httpStatus: 200, contentType: "image/jpeg" },
      { stepOrder: 4, path: "assets/dishes/sources/cn-002-kung-pao-chicken/step-04.jpg", originalUrl: "https://thewoksoflife.com/wp-content/uploads/2019/05/kung-pao-chicken-5.jpg", sha256: "25d3300fc76b98d704c4b20300af6eb784985a0d14e608df5659cd562fa55f2c", httpStatus: 200, contentType: "image/webp" },
      { stepOrder: 5, path: "assets/dishes/sources/cn-002-kung-pao-chicken/step-05.jpg", originalUrl: "https://thewoksoflife.com/wp-content/uploads/2019/05/kung-pao-chicken-6.jpg", sha256: "b37dc7112f961c87eece878385f0eb24fa8418f5ec680d8e1100384b81aeddf5", httpStatus: 200, contentType: "image/webp" },
      { stepOrder: 6, path: "assets/dishes/sources/cn-002-kung-pao-chicken/step-06.jpg", originalUrl: "https://thewoksoflife.com/wp-content/uploads/2019/05/kung-pao-chicken-7.jpg", sha256: "fd3b5ddbe9c72f914eff5d9ba3a7c9b2fe8d7e72609cdc37fa39a93736c4135f", httpStatus: 200, contentType: "image/webp" },
      { stepOrder: 7, path: "assets/dishes/sources/cn-002-kung-pao-chicken/step-07-01.jpg", originalUrl: "https://thewoksoflife.com/wp-content/uploads/2019/05/kung-pao-chicken-8.jpg", sha256: "52293921c484bba44ea3508eaeaca436d740b90a51e2f2e95b93836a3c8d2f39", httpStatus: 200, contentType: "image/webp" }
    ]
  }, { totalMinutes: 40, prepMinutes: 30, cookMinutes: 10 }),
  c("麻婆豆腐", "Mapo Tofu", "川菜", "食用油1/2杯（分次使用）；新鲜泰国小米椒1—2个，切薄片；干红辣椒6—8个，粗切；花椒粒1/2—1又1/2汤匙，磨成粉用于炒制，另取少许可选作装饰；姜末3汤匙；蒜末3汤匙；猪肉末约227克；辣豆瓣酱1—2汤匙；低钠鸡汤2/3杯（或清水）；嫩豆腐约454克，切约2.5厘米方块；清水1/4杯；玉米淀粉1又1/2茶匙；芝麻油1/4茶匙（可选）；白糖1/4茶匙（可选）；葱1根，切碎", "1）炒锅或小锅置小火，加入一半食用油、新鲜泰国小米椒片和干红辣椒，间或翻动约5分钟，至辣椒出香但不焦煳；离火，连同辣椒一起放在一旁备用。2）炒锅中加入剩余食用油，以中火加姜末炒1分钟；加入蒜末再炒1分钟。转高火，加入猪肉末，铲散并炒至完全熟透；加入磨好的花椒粉翻炒约15—30秒，勿炒焦，以免发苦。3）加入辣豆瓣酱炒匀，倒入低钠鸡汤或清水，煮约1分钟；其间将嫩豆腐备好，并把1/4杯清水与玉米淀粉调匀成淀粉水。4）将淀粉水倒入锅中搅匀，煮至酱汁开始变稠；若酱汁过稠，加入少许清水或鸡汤调整。5）加入步骤1做好的辣椒油和辣椒，拌匀后放入嫩豆腐，用锅铲轻轻翻拌使豆腐裹上酱汁；煮3—5分钟。加入可选的芝麻油、白糖和葱花，拌至葱花刚刚变蔫。6）装盘；如需要，在表面撒少许花椒粉。", "03-mapo-doufu.png", "https://thewoksoflife.com/ma-po-tofu-real-deal/", {
    sourceName: "The Woks of Life",
    recipePageUrl: "https://thewoksoflife.com/ma-po-tofu-real-deal/",
    mediaPageUrl: "https://thewoksoflife.com/ma-po-tofu-real-deal/",
    author: "Kaitlin",
    rightsNotice: "All Rights Reserved © The Woks of Life",
    reuseLicense: null,
    repositoryCopyAuthorization: "user_confirmed_2026-09-16",
    hero: {
      path: "assets/dishes/sources/cn-003-mapo-tofu/hero.jpg",
      originalUrl: "https://thewoksoflife.com/wp-content/uploads/2019/06/mapo-tofu-10.jpg",
      sha256: "93bbb7e6b5f22a03f97524fbf7d41861320df3a6fd9978b6283ef214ab4c4998",
      httpStatus: 200,
      contentType: "image/webp"
    },
    steps: [
      { stepOrder: 2, path: "assets/dishes/sources/cn-003-mapo-tofu/step-02-01.jpg", originalUrl: "https://thewoksoflife.com/wp-content/uploads/2019/06/mapo-tofu-5.jpg", sha256: "adc9d610637d3b2a100df18292b31ac7a50c575aa82afb3b1cf030a37394ed56", httpStatus: 200, contentType: "image/webp" },
      { stepOrder: 3, path: "assets/dishes/sources/cn-003-mapo-tofu/step-03-01.jpg", originalUrl: "https://thewoksoflife.com/wp-content/uploads/2019/06/mapo-tofu-6.jpg", sha256: "cf07bc4739d7b4c060f34dc4c169e4f90d45c508ce2f7ddbfc0f302ea2f170b5", httpStatus: 200, contentType: "image/webp" },
      { stepOrder: 5, path: "assets/dishes/sources/cn-003-mapo-tofu/step-05.jpg", originalUrl: "https://thewoksoflife.com/wp-content/uploads/2019/06/mapo-tofu-9.jpg", sha256: "f3344f82db52d90f15e3945f8a939a579eb0100c2358d8b444a32797890ff121", httpStatus: 200, contentType: "image/webp" },
      { stepOrder: 6, path: "assets/dishes/sources/cn-003-mapo-tofu/step-06-01.jpg", originalUrl: "https://thewoksoflife.com/wp-content/uploads/2019/06/mapo-tofu-11.jpg", sha256: "5514f23c1754966ad03101163e99df78ddd6e5418830f479c0b1b95d0d93c330", httpStatus: 200, contentType: "image/webp" }
    ]
  }, { totalMinutes: 35, prepMinutes: 10, cookMinutes: 25 }),
  c("鱼香肉丝", "Fish-fragrant Shredded Pork", "川菜", "猪肉8盎司，切丝；食用油2茶匙（腌肉用）；绍兴酒1茶匙（腌肉用）；生抽2茶匙（腌肉用）；白胡椒粉1/4茶匙（腌肉用）；玉米淀粉1茶匙（腌肉用）；清水1又1/2汤匙（腌肉用）；米醋1又1/2汤匙（调汁用）；白糖1又1/2汤匙（调汁用）；生抽1汤匙（调汁用）；绍兴酒1/2汤匙（调汁用）；清水1杯（调汁用）；玉米淀粉1又1/2汤匙（调汁用）；食用油3汤匙（炒制用，分次使用）；辣豆瓣酱1汤匙；姜2茶匙，切末；蒜2茶匙，切末；干辣椒1/4杯；泡发木耳1满杯，切丝；莴笋8盎司，去皮切丝；葱1根，切碎；清水少许（锅太干时按需加数滴）", "1）将8盎司猪肉切丝，加入2茶匙食用油、1茶匙绍兴酒、2茶匙生抽、1/4茶匙白胡椒粉、1茶匙玉米淀粉和1又1/2汤匙清水，拌匀后静置20分钟；其间将莴笋去皮切丝、泡发木耳切丝、葱切碎，并备好姜末、蒜末和干辣椒。2）将1又1/2汤匙米醋、1又1/2汤匙白糖、1汤匙生抽、1/2汤匙绍兴酒、1杯清水和1又1/2汤匙玉米淀粉放入碗中，充分搅匀成鱼香汁。3）将干净炒锅预热至微微冒烟，转高火，加入1汤匙炒制用食用油；下腌好的猪肉丝炒至刚刚不透明，关火后盛出备用。4）检查炒锅；若锅中不干净，洗净并擦干，再开始下一阶段。5）开中火，加入剩余2汤匙炒制用食用油和1汤匙辣豆瓣酱，轻轻翻炒约1分钟至油变红；如有必要调低火力，避免炒焦。6）加入2茶匙姜末、2茶匙蒜末和1/4杯干辣椒，翻炒约15秒；加入1满杯泡发木耳，转高火翻炒30秒至混合均匀，锅中太干时加入数滴清水。7）待锅中液体开始冒泡，将鱼香汁再次搅匀，使沉底的淀粉重新混合；随即与8盎司莴笋丝、1根葱和炒好的猪肉丝一同下锅，快速翻炒均匀后出锅。", "04-yuxiang-rousi.png", "https://thewoksoflife.com/pork-garlic-sauce/", {
    sourceName: "The Woks of Life",
    recipePageUrl: "https://thewoksoflife.com/pork-garlic-sauce/",
    mediaPageUrl: "https://thewoksoflife.com/pork-garlic-sauce/",
    author: "Judy",
    rightsNotice: "All Rights Reserved © The Woks of Life",
    reuseLicense: null,
    repositoryCopyAuthorization: "user_confirmed_2026-09-16",
    hero: {
      path: "assets/dishes/sources/cn-004-yuxiang-rousi/hero.jpg",
      originalUrl: "https://thewoksoflife.com/wp-content/uploads/2017/07/pork-garlic-sauce-2.jpg",
      sha256: "124933bdf24095babc7121368a721f3f582114ebd231050fea060a171d1d207b",
      httpStatus: 200,
      contentType: "image/jpeg"
    },
    steps: [
      { stepOrder: 1, path: "assets/dishes/sources/cn-004-yuxiang-rousi/step-1.jpg", originalUrl: "https://thewoksoflife.com/wp-content/uploads/2017/07/pork-garlic-sauce-7.jpg", sha256: "34d952533a5b322b225c2d96ebb1f27535166d192aacbcf5ea56df6b200086bd", httpStatus: 200, contentType: "image/webp" },
      { stepOrder: 3, path: "assets/dishes/sources/cn-004-yuxiang-rousi/step-3.jpg", originalUrl: "https://thewoksoflife.com/wp-content/uploads/2017/07/pork-garlic-sauce-8.jpg", sha256: "0eccb3383b2998f5e5b614f65ce1511b28a4eb86466e90d1fe684513af886e6a", httpStatus: 200, contentType: "image/jpeg" },
      { stepOrder: 5, path: "assets/dishes/sources/cn-004-yuxiang-rousi/step-5.jpg", originalUrl: "https://thewoksoflife.com/wp-content/uploads/2017/07/pork-garlic-sauce-9.jpg", sha256: "e8ea3fa493ffbdf2610eeae0dea12bd4e48537e5d69ee8b474a78ff84e003dc6", httpStatus: 200, contentType: "image/jpeg" },
      { stepOrder: 6, path: "assets/dishes/sources/cn-004-yuxiang-rousi/step-6.jpg", originalUrl: "https://thewoksoflife.com/wp-content/uploads/2017/07/pork-garlic-sauce-10.jpg", sha256: "59af79a8b2762de0091f2b632fa300f5cea5bdc9532c0a8810de360e788ac8af", httpStatus: 200, contentType: "image/jpeg" },
      { stepOrder: 7, path: "assets/dishes/sources/cn-004-yuxiang-rousi/step-7.jpg", originalUrl: "https://thewoksoflife.com/wp-content/uploads/2017/07/pork-garlic-sauce-11.jpg", sha256: "4085bacb0b3d9419a5c75736a2f8ccb989fa0750ef1742a70ee2b59ed83cdac0", httpStatus: 200, contentType: "image/jpeg" }
    ]
  }, { totalMinutes: 45, prepMinutes: 35, cookMinutes: 10 }),
  c("青椒肉丝", "Shredded Pork with Green Pepper", "家常菜", "青椒250克；猪里脊肉100克；干淀粉5克；红椒20克；味极鲜酱油15克；料酒15克；盐适量（腌肉与出锅前调味，分次使用）；鸡精适量（腌肉与出锅前调味，分次使用）；食用油5克（拌肉用，原页也可选麻油），另备适量用于炒制；葱10克；姜2片；蒜2瓣", "1）准备食材，将猪里脊肉稍微冷冻后取出，沿肉的纹理切成整齐的肉丝。2）葱切小段，蒜切片，姜切丝。青椒和红椒洗净，去蒂、去筋，切成与肉丝粗细相近的丝。3）肉丝中加入少许盐、鸡精、15克料酒和15克味极鲜酱油，用手抓匀后腌制15分钟。4）待肉丝吸收腌制时的调味料汁水，加入5克干淀粉，继续抓匀。5）加入5克食用油拌匀，使肉丝炒制时容易划散、不黏连，原页也可选用麻油。6）锅中倒入适量食用油，加热至七成热，放入葱段、蒜片和姜丝，炒出香味。7）将腌好的肉丝放入锅中。8）转大火，快速将肉丝划散。9）炒至肉丝变色，加入青椒丝和红椒丝，翻炒至断生。10）加入适量盐和鸡精，翻炒均匀。11）装盘上桌。", "05-qingjiao-rousi.png", "https://www.douguo.com/cookbook/1633594.html", {
    "sourceName": "豆果美食",
    "recipePageUrl": "https://www.douguo.com/cookbook/1633594.html",
    "mediaPageUrl": "https://www.douguo.com/cookbook/1633594.html",
    "author": "沙小囡",
    "rightsNotice": "©本菜谱的做法由 沙小囡 编写，未经授权不得转载",
    "reuseLicense": null,
    "repositoryCopyAuthorization": "user_confirmed_2026-09-16",
    "hero": {
      "path": "assets/dishes/sources/cn-005-qingjiao-rousi/hero.jpg",
      "originalUrl": "https://cp1.douguo.com/upload/caiku/1/3/e/960_13d4aaeae19767ba533c8077f33abf9e.jpg",
      "sha256": "c5d382edb7b2d6b99fd7d2ee5196eb69e75053dfbdf8ace6612c488881ac4f60",
      "httpStatus": 200,
      "contentType": "image/jpeg"
    },
    "steps": [
      {
        "stepOrder": 1,
        "path": "assets/dishes/sources/cn-005-qingjiao-rousi/step-1.jpg",
        "originalUrl": "https://cp1.douguo.com/upload/caiku/f/0/4/800_f0a2d4dd230a3858c585ea00e7d3bbd4.jpg",
        "sha256": "90cddfcb3eac1233947f5fb6da3ec571d12f2cccb95a0f7286298d5079010d82",
        "httpStatus": 200,
        "contentType": "image/jpeg"
      },
      {
        "stepOrder": 2,
        "path": "assets/dishes/sources/cn-005-qingjiao-rousi/step-2.jpg",
        "originalUrl": "https://cp1.douguo.com/upload/caiku/2/d/a/800_2d32d23db9e7f3e2e4123af4d7e368ba.jpg",
        "sha256": "e10d338d137deab31d1e24ffcd9f4929326483f1bf6694c7fddce6f4cab8a000",
        "httpStatus": 200,
        "contentType": "image/jpeg"
      },
      {
        "stepOrder": 3,
        "path": "assets/dishes/sources/cn-005-qingjiao-rousi/step-3.jpg",
        "originalUrl": "https://cp1.douguo.com/upload/caiku/6/5/1/800_65d06ca9b36f7228d26d59a8b6c67bf1.jpg",
        "sha256": "5f92442253f3059f8a88c61e923c3d56f703e56da9a63b333899a8648c2bb5c6",
        "httpStatus": 200,
        "contentType": "image/jpeg"
      },
      {
        "stepOrder": 4,
        "path": "assets/dishes/sources/cn-005-qingjiao-rousi/step-4.jpg",
        "originalUrl": "https://cp1.douguo.com/upload/caiku/8/5/7/800_85806a153034e629970570afc7ea2287.jpg",
        "sha256": "f54b8b750aa4f7a07d0ccf42b9e28992a7812e092e8398d4deb56e3a114dd6df",
        "httpStatus": 200,
        "contentType": "image/jpeg"
      },
      {
        "stepOrder": 5,
        "path": "assets/dishes/sources/cn-005-qingjiao-rousi/step-5.jpg",
        "originalUrl": "https://cp1.douguo.com/upload/caiku/4/9/7/800_491bbd410525b77a2aa45d0937ea0517.jpg",
        "sha256": "9ce2a504ea4b1e178fbf73618abe75bfc471c7c0aa1e901f35c73e0460cd6348",
        "httpStatus": 200,
        "contentType": "image/jpeg"
      },
      {
        "stepOrder": 6,
        "path": "assets/dishes/sources/cn-005-qingjiao-rousi/step-6.jpg",
        "originalUrl": "https://cp1.douguo.com/upload/caiku/9/4/9/800_943c0b78c5643eda816c86e1246717e9.jpg",
        "sha256": "081e62ff30948c3cc1a2c69ba2c11044236d66eb9211805cca62353d27fbb843",
        "httpStatus": 200,
        "contentType": "image/jpeg"
      },
      {
        "stepOrder": 7,
        "path": "assets/dishes/sources/cn-005-qingjiao-rousi/step-7.jpg",
        "originalUrl": "https://cp1.douguo.com/upload/caiku/d/1/d/800_d15e4108be2b4d4f57a22ba2f0da057d.jpg",
        "sha256": "7e579f509d8177611c38e0629ea6fa9dc4d5bdf5e0eb1b2f2019aa14c0655259",
        "httpStatus": 200,
        "contentType": "image/jpeg"
      },
      {
        "stepOrder": 8,
        "path": "assets/dishes/sources/cn-005-qingjiao-rousi/step-8.jpg",
        "originalUrl": "https://cp1.douguo.com/upload/caiku/8/8/c/800_889bd641e798de5374776f503ae970bc.jpg",
        "sha256": "3bfaa04ea268246283a52177d09cd5b890254d15ffae8353dbb8d2dd362b133e",
        "httpStatus": 200,
        "contentType": "image/jpeg"
      },
      {
        "stepOrder": 9,
        "path": "assets/dishes/sources/cn-005-qingjiao-rousi/step-9.jpg",
        "originalUrl": "https://cp1.douguo.com/upload/caiku/c/b/a/800_cb0f2ec5e5fb71e987ebe0e989be619a.jpg",
        "sha256": "c04c992a4a37bd76641b4803ae7ee73ae7b00d295b5959dec744ed44bab488c1",
        "httpStatus": 200,
        "contentType": "image/jpeg"
      },
      {
        "stepOrder": 10,
        "path": "assets/dishes/sources/cn-005-qingjiao-rousi/step-10.jpg",
        "originalUrl": "https://cp1.douguo.com/upload/caiku/3/3/5/800_335c603d925a4a0677291afa8afd8c95.jpg",
        "sha256": "086875b1d23c544b4f9f845aa6170847584e95ac7dfe2d798cd5ae9f0e53511b",
        "httpStatus": 200,
        "contentType": "image/jpeg"
      },
      {
        "stepOrder": 11,
        "path": "assets/dishes/sources/cn-005-qingjiao-rousi/step-11.jpg",
        "originalUrl": "https://cp1.douguo.com/upload/caiku/0/6/a/800_06bd451fc1341d8fc5bbb7b78fc6711a.jpg",
        "sha256": "639d89d2f673e369fc27a46557583b74ab736a7358b0fa5aa8607130ba91d468",
        "httpStatus": 200,
        "contentType": "image/jpeg"
      }
    ]
  }),
  c("红烧肉", "Red-braised Pork Belly", "江浙菜", "带皮偏瘦五花肉约680克；食用油2汤匙；冰糖2汤匙（或白砂糖）；绍兴酒1/3杯；生抽2汤匙；老抽1汤匙；清水2—3杯（炖煮用，另备适量用于焯肉及锅干时补水）", "1）将五花肉切成约2厘米厚的块，放入中号锅中，加入清水没过肉块。煮沸后继续煮约1分钟，至肉块刚变得不透明；捞出冲洗，倒掉焯肉水并洗净锅。2）洗净的炒锅或锅置于小火，加入2汤匙食用油和2汤匙冰糖（或白砂糖）；待糖融化后放入焯好的五花肉，转中火煎至肉块表面微微上色。3）转小火，倒入1/3杯绍兴酒，煮2分钟；再加入2汤匙生抽、1汤匙老抽和2—3杯清水。4）加盖，以中火焖煮约45分钟至1小时，至五花肉可用叉子轻松插入；每隔5—10分钟翻动一次以防焦底，锅中太干时补少量清水。5）肉已软嫩后，如锅中仍有较多可见汤汁，揭盖转大火并持续翻动，直至酱汁收成油亮薄层、均匀裹住肉块；若汤汁已收至此状态即可出锅。", "06-hongshao-rou.png", "https://thewoksoflife.com/shanghai-style-braised-pork-belly/", {
    sourceName: "The Woks of Life",
    recipePageUrl: "https://thewoksoflife.com/shanghai-style-braised-pork-belly/",
    mediaPageUrl: "https://thewoksoflife.com/shanghai-style-braised-pork-belly/",
    author: "Judy",
    rightsNotice: "All Rights Reserved © The Woks of Life",
    reuseLicense: null,
    repositoryCopyAuthorization: "user_confirmed_2026-09-16",
    hero: {
      path: "assets/dishes/sources/cn-006-red-braised-pork/hero.jpg",
      originalUrl: "https://thewoksoflife.com/wp-content/uploads/2013/07/shanghai-braised-pork-belly.jpg",
      sha256: "7ffb99fc6458a42ec791309afb0fca8edcbda9a18aed89548e8be5b67d729492",
      httpStatus: 200,
      contentType: "image/webp"
    },
    steps: [
      { stepOrder: 1, path: "assets/dishes/sources/cn-006-red-braised-pork/step-01.jpg", originalUrl: "https://thewoksoflife.com/wp-content/uploads/2024/09/hongshao-rou-shanghai-braised-pork-belly.jpg", sha256: "4ada19cfd7a6483aad0f295d28f8a95e1fffdd5eb8395c58d796a64a1a2b078c", httpStatus: 200, contentType: "image/webp" },
      { stepOrder: 2, path: "assets/dishes/sources/cn-006-red-braised-pork/step-02.jpg", originalUrl: "https://thewoksoflife.com/wp-content/uploads/2024/09/hongshao-rou-shanghai-braised-pork-belly-5.jpg", sha256: "147c102383f40ea9cd1946ecab406643cfe657d69f06ea015d4106199b9105d2", httpStatus: 200, contentType: "image/webp" },
      { stepOrder: 5, path: "assets/dishes/sources/cn-006-red-braised-pork/step-05.jpg", originalUrl: "https://thewoksoflife.com/wp-content/uploads/2013/07/hongshao-rou-3-e1570056864719.jpg", sha256: "71423b7898e31368c3dd09db8cf41d5c3bfa8d820b771324fc635e71e0722bfb", httpStatus: 200, contentType: "image/webp" }
    ]
  }, { totalMinutes: 75, prepMinutes: 15, cookMinutes: 60 }),
  c("糖醋里脊", "Sweet and Sour Pork Tenderloin", "鲁菜/家常", "里脊肉200克；白芝麻适量；米饭一碗（配餐）；玉米淀粉适量（裹里脊肉）；盐少许（腌料）；白胡椒粉少许（腌料）；料酒1勺（腌料）；鸡蛋1个（腌料）；淀粉1勺（腌料）；清水3勺（酱汁）；白醋2勺（酱汁）；生抽1勺（酱汁）；番茄酱4勺（酱汁）；白糖2勺（酱汁）；淀粉1勺（酱汁）；食用油适量（炸制并留底油煮酱汁）", "1）将200克里脊肉切成条。2）在里脊肉中加入少许盐。3）在里脊肉中加入少许白胡椒粉。4）在里脊肉中加入1勺料酒。5）在里脊肉中打入1个鸡蛋。6）在里脊肉中加入1勺淀粉，搅拌均匀后腌制半小时。7）另取一只碗调酱汁，加入3勺清水。8）在酱汁碗中加入2勺白醋。9）在酱汁碗中加入1勺生抽。10）在酱汁碗中加入4勺番茄酱。11）在酱汁碗中加入2勺白糖。12）在酱汁碗中加入1勺淀粉。13）将酱汁搅拌均匀，备用。14）腌制完成后，将里脊肉条裹上适量玉米淀粉。15）锅中加入适量食用油烧热，放入里脊肉条炸4分钟后捞出。16）将里脊肉条倒回锅中复炸1分钟，捞出。17）锅中留底油，倒入调好的酱汁，烧至冒泡后转小火。18）倒入复炸好的里脊肉条，以小火翻炒，使里脊肉全部裹上酱汁。19）撒上适量白芝麻，即可配一碗米饭食用。", "07-tangcu-liji.png", "https://www.douguo.com/cookbook/2343710.html", {
    "sourceName": "豆果美食",
    "recipePageUrl": "https://www.douguo.com/cookbook/2343710.html",
    "mediaPageUrl": "https://www.douguo.com/cookbook/2343710.html",
    "author": "青春妹m",
    "rightsNotice": "©本菜谱的做法由 青春妹m 编写，未经授权不得转载",
    "reuseLicense": null,
    "repositoryCopyAuthorization": "user_confirmed_2026-09-16",
    "hero": {
      "path": "assets/dishes/sources/cn-007-tangcu-liji/hero.jpeg",
      "originalUrl": "https://cp1.douguo.com/upload/caiku/8/f/e/800_8fb88804e4509baa10e9695fba9c3d1e.jpeg",
      "sha256": "f769ef18eb44c1bd2a08765ab7b4b01b330f78a7a4987c38e49cd4b9421006b8",
      "httpStatus": 200,
      "contentType": "image/jpeg"
    },
    "steps": [
      {
        "stepOrder": 1,
        "path": "assets/dishes/sources/cn-007-tangcu-liji/step-1.jpeg",
        "originalUrl": "https://cp1.douguo.com/upload/caiku/3/e/e/800_3ed9ae94ec212029a7115165bbbbad1e.jpeg",
        "sha256": "f19efaca28f3265f85ca8583ced815f68f28351962bc7a56ff35285fd7aa3fa7",
        "httpStatus": 200,
        "contentType": "image/jpeg"
      },
      {
        "stepOrder": 2,
        "path": "assets/dishes/sources/cn-007-tangcu-liji/step-2.jpeg",
        "originalUrl": "https://cp1.douguo.com/upload/caiku/e/4/e/800_e4ef094a1012a49f690a8b36a3a7193e.jpeg",
        "sha256": "0cbb58154ff856ba28398ddcbf3386a4b763dba223adda7fcdfca64fd32461a2",
        "httpStatus": 200,
        "contentType": "image/jpeg"
      },
      {
        "stepOrder": 3,
        "path": "assets/dishes/sources/cn-007-tangcu-liji/step-3.jpeg",
        "originalUrl": "https://cp1.douguo.com/upload/caiku/7/b/6/800_7b628d70a47b25ac20b76ed5c11f3d76.jpeg",
        "sha256": "a0dfb085336189e2051cb5ccbc1e196655d64680658df2317743e64bdbf78d47",
        "httpStatus": 200,
        "contentType": "image/jpeg"
      },
      {
        "stepOrder": 4,
        "path": "assets/dishes/sources/cn-007-tangcu-liji/step-4.jpeg",
        "originalUrl": "https://cp1.douguo.com/upload/caiku/0/b/4/800_0ba33a21c7e096571d0c02b8ebbc9a84.jpeg",
        "sha256": "a375cd8b334c292872d9cd3de69b9bba067461d929ac8f0ab44d9bd433551992",
        "httpStatus": 200,
        "contentType": "image/jpeg"
      },
      {
        "stepOrder": 5,
        "path": "assets/dishes/sources/cn-007-tangcu-liji/step-5.jpeg",
        "originalUrl": "https://cp1.douguo.com/upload/caiku/6/1/8/800_6102e2cfdb0ee878a7af35b1557082c8.jpeg",
        "sha256": "9bf11a987fe9a173da1449361e6787f4d6027f9949e1d0485bec46150ce25223",
        "httpStatus": 200,
        "contentType": "image/jpeg"
      },
      {
        "stepOrder": 6,
        "path": "assets/dishes/sources/cn-007-tangcu-liji/step-6.jpeg",
        "originalUrl": "https://cp1.douguo.com/upload/caiku/6/3/a/800_63845e90d7a5a7853febabeb1b3e740a.jpeg",
        "sha256": "61e250f5a27ec62e3ba91cacf0e7cf4fde00dd647de297074c25345243c39b96",
        "httpStatus": 200,
        "contentType": "image/jpeg"
      },
      {
        "stepOrder": 7,
        "path": "assets/dishes/sources/cn-007-tangcu-liji/step-7.jpeg",
        "originalUrl": "https://cp1.douguo.com/upload/caiku/7/2/5/800_72871c26892392b2acb3823ae6583565.jpeg",
        "sha256": "4f90786531e7b422684e3200d28c22fcad53a92ba692c33133d2db35bb09faf4",
        "httpStatus": 200,
        "contentType": "image/jpeg"
      },
      {
        "stepOrder": 8,
        "path": "assets/dishes/sources/cn-007-tangcu-liji/step-8.jpeg",
        "originalUrl": "https://cp1.douguo.com/upload/caiku/5/d/d/800_5d3f24304fc662245f5d2bffa4624ffd.jpeg",
        "sha256": "b86f6e30087f0671f33e7a5a349ff8a65a3adae582f7c3b9c8390f0c014823e2",
        "httpStatus": 200,
        "contentType": "image/jpeg"
      },
      {
        "stepOrder": 9,
        "path": "assets/dishes/sources/cn-007-tangcu-liji/step-9.jpeg",
        "originalUrl": "https://cp1.douguo.com/upload/caiku/c/7/a/800_c7c0043bef3e96072485f0973a5ced9a.jpeg",
        "sha256": "1683ce4541f91b660684070e9fa01c94d96ce4b7b6ddbdc9f0b2eb39413c667f",
        "httpStatus": 200,
        "contentType": "image/jpeg"
      },
      {
        "stepOrder": 10,
        "path": "assets/dishes/sources/cn-007-tangcu-liji/step-10.jpeg",
        "originalUrl": "https://cp1.douguo.com/upload/caiku/7/0/3/800_7041b35311edad0edebe2834f904c6e3.jpeg",
        "sha256": "227c3210a4d956c9c93f75d17e6843e0d724d0ec8f4828948ced2f472c1c5492",
        "httpStatus": 200,
        "contentType": "image/jpeg"
      },
      {
        "stepOrder": 11,
        "path": "assets/dishes/sources/cn-007-tangcu-liji/step-11.jpeg",
        "originalUrl": "https://cp1.douguo.com/upload/caiku/7/2/e/800_72265dc7d9538b97b5fcee09c15a12ee.jpeg",
        "sha256": "0ad649f060abd46dd7f84b74f39ff31fe5bfa53bba4a2560ec9235bafa623fd6",
        "httpStatus": 200,
        "contentType": "image/jpeg"
      },
      {
        "stepOrder": 12,
        "path": "assets/dishes/sources/cn-007-tangcu-liji/step-12.jpeg",
        "originalUrl": "https://cp1.douguo.com/upload/caiku/3/b/7/800_3bc668fb49757d74257f145e4ed12377.jpeg",
        "sha256": "bc14a5a5a0e9c6a59337bf95abad06706c3865c68004fd46df95f3c16e9df2c3",
        "httpStatus": 200,
        "contentType": "image/jpeg"
      },
      {
        "stepOrder": 13,
        "path": "assets/dishes/sources/cn-007-tangcu-liji/step-13.jpeg",
        "originalUrl": "https://cp1.douguo.com/upload/caiku/8/6/f/800_86fbf696e04455b48edc031c586d5c7f.jpeg",
        "sha256": "7308b445ec7966c959eecdd53c670a748ebbc197f980ad91c66f10d7b85ad633",
        "httpStatus": 200,
        "contentType": "image/jpeg"
      },
      {
        "stepOrder": 14,
        "path": "assets/dishes/sources/cn-007-tangcu-liji/step-14.jpeg",
        "originalUrl": "https://cp1.douguo.com/upload/caiku/5/6/3/800_56b67cfc7dc8f5bf7bb5dd31bd926f03.jpeg",
        "sha256": "9d0572e350c2f31a07a5eb39afe025f529c8eb8491f36f2332632005009d1720",
        "httpStatus": 200,
        "contentType": "image/jpeg"
      },
      {
        "stepOrder": 15,
        "path": "assets/dishes/sources/cn-007-tangcu-liji/step-15.jpeg",
        "originalUrl": "https://cp1.douguo.com/upload/caiku/a/3/e/800_a3c2625fbc135dde780109fd9118fbae.jpeg",
        "sha256": "d478dc76d8646ec3d39a0380b9c37ec2b3b1ca4ed971c8f7a0755b16ed7077e1",
        "httpStatus": 200,
        "contentType": "image/jpeg"
      },
      {
        "stepOrder": 16,
        "path": "assets/dishes/sources/cn-007-tangcu-liji/step-16.jpeg",
        "originalUrl": "https://cp1.douguo.com/upload/caiku/a/d/4/800_ad4b5898cc8101bcbdae5bfff3e527d4.jpeg",
        "sha256": "178ca6256da128ec216475ffa1e4239825e81d8a22ee2cbe9e076690cd39424f",
        "httpStatus": 200,
        "contentType": "image/jpeg"
      },
      {
        "stepOrder": 17,
        "path": "assets/dishes/sources/cn-007-tangcu-liji/step-17.jpeg",
        "originalUrl": "https://cp1.douguo.com/upload/caiku/9/4/4/800_94bc9bbeafee242641d8eb2d7e0fcd14.jpeg",
        "sha256": "b24831fac53aaa2d62b5374aeac917de60236713e43176da9e07c9859b8e0777",
        "httpStatus": 200,
        "contentType": "image/jpeg"
      },
      {
        "stepOrder": 18,
        "path": "assets/dishes/sources/cn-007-tangcu-liji/step-18.jpeg",
        "originalUrl": "https://cp1.douguo.com/upload/caiku/a/1/e/800_a1eb68c011e1040fa9130bdd9b35a64e.jpeg",
        "sha256": "cb75cbb019192135d9d745f86c7e3a2d633763d7bfa54e8578f9af3d530d20ae",
        "httpStatus": 200,
        "contentType": "image/jpeg"
      },
      {
        "stepOrder": 19,
        "path": "assets/dishes/sources/cn-007-tangcu-liji/step-19.jpeg",
        "originalUrl": "https://cp1.douguo.com/upload/caiku/3/b/1/800_3b7b3fb377c757bda55516ac0facfce1.jpeg",
        "sha256": "377250635e0458db18b5c5f0526b77e2af9e41d0c675cf508166dda14b2645fa",
        "httpStatus": 200,
        "contentType": "image/jpeg"
      }
    ]
  }),
  c("扬州炒饭", "Yangzhou Fried Rice", "淮扬菜", "熟米饭5杯；食用油3汤匙（炒蛋用1汤匙，炒饭用2汤匙，米饭偏干时可另加少许）；大鸡蛋2个，打散；鲜虾110克（40—60号，去壳去虾线）；中等大小洋葱1个，切细丁；弗吉尼亚火腿1/2杯（约110克），切丁；中式叉烧1/2杯（约110克），切丁；冷冻青豆3/4杯，解冻；盐1又1/2茶匙；白糖1/4茶匙；绍兴酒1茶匙（可选）；小葱2根，切碎；罗马生菜或球生菜2杯，切碎；现磨白胡椒粉1/8茶匙；煮饭用清水适量（比米包装说明略少）；焯虾用沸水适量；清水或鸡汤少量（米饭偏干时可选）；辣酱或辣椒油适量（可选配餐）", "1）按米包装说明煮饭，清水用量比包装说明略少，避免米饭软黏，备好5杯熟米饭。不加盖放凉，停止冒蒸汽后用叉子拨松并打散饭团，剩下的饭团可在炒锅中继续打散。2）若将米饭冷藏过夜，炒前用手将冷饭团搓散成粒，手发黏时不时用冷水冲洗，再继续搓散。3）炒锅以中高火烧热，加入1汤匙食用油，倒入打散的2个大鸡蛋，轻轻翻折炒散，避免焦煳，再将炒蛋盛回碗中。另备一锅沸水，将110克去壳去虾线的鲜虾焯水，沥干备用。4）炒锅转大火烧热，加入剩余2汤匙食用油和洋葱丁，翻炒至洋葱透明。加入切丁的弗吉尼亚火腿和中式叉烧，翻炒30秒。5）倒入5杯熟米饭，以大火翻炒2分钟，使米饭均匀受热，并用锅铲压散剩余饭团。6）加入焯过的虾和解冻的3/4杯青豆，以大火继续不断翻炒2分钟，至米饭完全热透。7）将1又1/2茶匙盐和1/4茶匙白糖撒在米饭上。若使用绍兴酒，将1茶匙绍兴酒沿锅边淋入，使其发出滋滋声并让酒精挥发，翻炒至调味均匀。8）若米饭略显干，可撒入少量清水或鸡汤，或补少许食用油。将少量液体直接淋在大饭团上可帮助打散，但水加多会使米饭湿软，油加多会使米饭油腻。9）加入炒好的鸡蛋、碎小葱、碎生菜和1/8茶匙现磨白胡椒粉，翻炒至生菜刚刚变蔫便停止，立即装盘。可另配适量辣酱或辣椒油食用。", "08-yangzhou-chaofan.png", "https://thewoksoflife.com/young-chow-fried-rice/", {
    "sourceName": "The Woks of Life",
    "recipePageUrl": "https://thewoksoflife.com/young-chow-fried-rice/",
    "mediaPageUrl": "https://thewoksoflife.com/young-chow-fried-rice/",
    "author": "Bill",
    "rightsNotice": "The Woks of Life source photographs; repository copy separately authorized by user.",
    "reuseLicense": null,
    "repositoryCopyAuthorization": "user_confirmed_2026-09-16",
    "hero": {
      "path": "assets/dishes/sources/cn-008-yangzhou-fried-rice/hero.jpg",
      "originalUrl": "https://thewoksoflife.com/wp-content/uploads/2015/12/young-chow-fried-rice-8.jpg",
      "sha256": "20a85d56c9bf1f2b8aff0c013b51ec802b9c9426fd48c10923d11ba812fc3aab",
      "httpStatus": 200,
      "contentType": "image/jpeg"
    },
    "steps": [
      {
        "stepOrder": 4,
        "path": "assets/dishes/sources/cn-008-yangzhou-fried-rice/step-4.jpg",
        "originalUrl": "https://thewoksoflife.com/wp-content/uploads/2015/12/young-chow-fried-rice-1.jpg",
        "sha256": "e5fea97180369ddaf6d6041a3ac318f71dd9cd8753c1040140081f396ccd8479",
        "httpStatus": 200,
        "contentType": "image/webp"
      },
      {
        "stepOrder": 5,
        "path": "assets/dishes/sources/cn-008-yangzhou-fried-rice/step-5.jpg",
        "originalUrl": "https://thewoksoflife.com/wp-content/uploads/2015/12/young-chow-fried-rice-2.jpg",
        "sha256": "5d16bb2eb1043906a981d20f39dd348f9c2a3d35f5dd018e24ac4f3811749dea",
        "httpStatus": 200,
        "contentType": "image/webp"
      },
      {
        "stepOrder": 6,
        "path": "assets/dishes/sources/cn-008-yangzhou-fried-rice/step-6.jpg",
        "originalUrl": "https://thewoksoflife.com/wp-content/uploads/2015/12/young-chow-fried-rice-3.jpg",
        "sha256": "990ce9c89e6ab8bbd5f3c2d6d650ef5c4ea6d9098a44e0e91780001b117b3a0b",
        "httpStatus": 200,
        "contentType": "image/jpeg"
      },
      {
        "stepOrder": 9,
        "path": "assets/dishes/sources/cn-008-yangzhou-fried-rice/step-9.jpg",
        "originalUrl": "https://thewoksoflife.com/wp-content/uploads/2015/12/young-chow-fried-rice-5.jpg",
        "sha256": "8bc1c01cf1f59c764f5a0ba35f817fd80e3851ae6b01b092f371f190eb75dfee",
        "httpStatus": 200,
        "contentType": "image/jpeg"
      }
    ]
  }, { prepMinutes: 30, cookMinutes: 10, totalMinutes: 40 }),
  c("清蒸鲈鱼", "Steamed Sea Bass", "粤菜", "鲈鱼（日本真鲈、花鲈）750克；小米辣2个；葱（绿色部分）30克；姜10克；料酒2汤匙；盐2调味匙；生抽3调味匙；糖0.5调味匙；香油少许；食用油30克；纯净水2汤匙；冰水适量（浸泡葱丝）；蒸锅用水适量", "1）鲈鱼去鳞、去内脏后清洗干净，在背部两边各划一刀；淋上2汤匙料酒，抹上2调味匙盐，腌制30分钟。2）将30克葱洗净切成长细丝，泡入适量冰水；10克姜分别切丝、切片，小米辣2个切圈。3）盘子里放几片姜。4）放上腌好的鲈鱼，在鱼腹中放几片姜，鱼表面放上葱丝和姜丝。5）蒸锅水烧开后，放入鱼蒸约8分钟；蒸制时间按鱼的大小调整，建议不超过10分钟，以免鱼肉过老。6）蒸鱼期间，将3调味匙生抽、0.5调味匙糖、少许香油和2汤匙纯净水混合均匀，调成碗汁。7）鱼蒸好后取出，倒掉蒸出的水，拿掉原先的葱姜丝，再重新放上葱姜丝和小米辣圈。8）淋上碗汁；将30克食用油烧热至冒烟，把热油浇到鱼身上即可。", "09-qingzheng-luyu.png", "https://www.douguo.com/cookbook/1426656.html", {
    sourceName: "豆果美食",
    recipePageUrl: "https://www.douguo.com/cookbook/1426656.html",
    mediaPageUrl: "https://www.douguo.com/cookbook/1426656.html",
    author: "mature11",
    rightsNotice: "页面署名 mature11；图片归原作者/豆果页面发布者所有。",
    reuseLicense: null,
    repositoryCopyAuthorization: "user_confirmed_2026-09-16",
    hero: {
      path: "assets/dishes/sources/cn-009-steamed-sea-bass/hero.jpeg",
      originalUrl: "https://cp1.douguo.com/upload/caiku/3/2/c/800_32c3b877bb10a1b9140298274e8dd2bc.jpeg",
      sha256: "76c879cebad8a411b50fea636bbed5dd372c89bdac0521ae1d20a23fabe60938",
      httpStatus: 200,
      contentType: "image/jpeg"
    },
    steps: [
      { stepOrder: 1, path: "assets/dishes/sources/cn-009-steamed-sea-bass/step-01.jpg", originalUrl: "https://cp1.douguo.com/upload/caiku/c/e/7/800_cee257b8f8be7a99fed2016e16b48897.jpg", sha256: "be7ff6eee06b22a82d394bc4a59593c12e2d70e7de1de3a32a72d25b0b476137", httpStatus: 200, contentType: "image/jpeg" },
      { stepOrder: 2, path: "assets/dishes/sources/cn-009-steamed-sea-bass/step-02.jpg", originalUrl: "https://cp1.douguo.com/upload/caiku/6/2/7/800_62edfeb94d070f6d8762a5ad1022a807.jpg", sha256: "ae1136f1d306c4e2a337c3ba26a7e7d181e18b7dd9a125f0de63994f77fb5e10", httpStatus: 200, contentType: "image/jpeg" },
      { stepOrder: 3, path: "assets/dishes/sources/cn-009-steamed-sea-bass/step-03.jpg", originalUrl: "https://cp1.douguo.com/upload/caiku/2/3/a/800_23fd7567bafe3734c7dbca6123a71dfa.jpg", sha256: "7a4a3807de3c3ea67d458ff1d176abe18f39afc11a25b7a0284ac6b937415648", httpStatus: 200, contentType: "image/jpeg" },
      { stepOrder: 4, path: "assets/dishes/sources/cn-009-steamed-sea-bass/step-04.jpg", originalUrl: "https://cp1.douguo.com/upload/caiku/1/a/4/800_1af458ac86a055f13b0c61f06e094434.jpg", sha256: "8b02046cdc433544a2048229278c8dc7f320be300dbdc3892a457d03f0637f4e", httpStatus: 200, contentType: "image/jpeg" },
      { stepOrder: 5, path: "assets/dishes/sources/cn-009-steamed-sea-bass/step-05.jpg", originalUrl: "https://cp1.douguo.com/upload/caiku/0/b/7/800_0bf2dd4a5fbe3d47b91f750d292c7fe7.jpg", sha256: "6fb762bda07cccbc7c31ba9b52ca028d4020c8701277d033a6b9a71f1b293689", httpStatus: 200, contentType: "image/jpeg" },
      { stepOrder: 6, path: "assets/dishes/sources/cn-009-steamed-sea-bass/step-06.jpg", originalUrl: "https://cp1.douguo.com/upload/caiku/1/6/e/800_16206d901e23138476f05358e3e8889e.jpg", sha256: "fa9c95b112e394e91c28fc3d3530403754ba19a3ba5923297bd727b048228972", httpStatus: 200, contentType: "image/jpeg" },
      { stepOrder: 7, path: "assets/dishes/sources/cn-009-steamed-sea-bass/step-07.jpg", originalUrl: "https://cp1.douguo.com/upload/caiku/1/7/c/800_178dc8fd4047d32a02dbc76850cdb7ac.jpg", sha256: "9aa58449ecf1568aabbdd98172583bffb44763d381c6ca3fb29fd06b544a8e3b", httpStatus: 200, contentType: "image/jpeg" },
      { stepOrder: 8, path: "assets/dishes/sources/cn-009-steamed-sea-bass/step-08.jpg", originalUrl: "https://cp1.douguo.com/upload/caiku/b/f/9/800_bf784ec6af27ddf2a904f72cbcaada19.jpg", sha256: "25f9c0fec24616f23839409e7c5c70e18098b98eb7a0d5cca91ee43895fd9c15", httpStatus: 200, contentType: "image/jpeg" }
    ]
  }),
  c("地三鲜", "Three Fresh Vegetables", "东北菜", "土豆1个；长茄子1个；辣椒1个（原文回锅步骤称青椒）；蒜4瓣（切末，分两次各用一半）；生抽2勺；蚝油1勺；盐1小勺；白糖1中勺；食用油5勺（煎土豆2勺，煎茄子和辣椒2勺，炒蒜末1勺）；玉米淀粉8克（原料表用量，原文调汁步骤写1勺，未注明二者等值）；红薯淀粉10克（原料表用量，原文裹茄子步骤写1勺，未注明二者等值）；清水半碗", "1）备齐土豆1个、长茄子1个、辣椒1个、蒜4瓣及清单中的其余调料。2）土豆洗净、去皮，切成滚刀块；长茄子洗净、去蒂，切成滚刀块；辣椒洗净、去筋、去籽，切大片备用。3）蒜去皮、去蒂，切成蒜末备用。4）将切好的茄子块放入容器，均匀撒入1勺红薯淀粉，颠匀，使每块茄子都裹上薄薄一层淀粉。5）小碗中加入2勺生抽、1勺蚝油、1中勺白糖、1小勺盐、1勺玉米淀粉和半碗清水，搅拌均匀成料汁。6）锅中加入2勺食用油，烧至7成热后放入土豆块。7）用中小火煎土豆块，待表面金黄、基本熟透后盛出备用。8）锅中再补入2勺食用油，烧热后放入裹好淀粉的茄子块。9）接着放入辣椒，煎至茄子变软、辣椒微焦，快速翻两下，将茄子和辣椒盛出备用。10）锅中再加入1勺食用油，下入一半蒜末，炒出香味。11）倒入提前调好的料汁，用小火煮至微微变稠。12）将土豆、茄子和辣椒倒回锅中，加入剩余一半蒜末。13）转大火快速翻炒，使酱汁均匀裹住食材，收至明亮油润后出锅。", "10-disanxian.png", "https://www.douguo.com/cookbook/3355060.html", {
    sourceName: "豆果美食",
    recipePageUrl: "https://www.douguo.com/cookbook/3355060.html",
    mediaPageUrl: "https://www.douguo.com/cookbook/3355060.html",
    author: "沙小囡",
    rightsNotice: "©本菜谱的做法由 沙小囡 编写，未经授权不得转载",
    reuseLicense: null,
    repositoryCopyAuthorization: "user_confirmed_2026-09-16",
    hero: {
      path: "assets/dishes/sources/cn-010-di-san-xian/hero.jpg",
      originalUrl: "https://cp1.douguo.com/upload/caiku/1/9/6/960_1911ac25f2a9d758f10eb61676a0b686.jpg",
      sha256: "a4bb4c552d3de037cec4f62e7a327b0e939944b1c56d0e704e4d766d364ae28e",
      httpStatus: 200,
      contentType: "image/jpeg"
    },
    steps: [
      { stepOrder: 1, sourceStepOrder: 1, path: "assets/dishes/sources/cn-010-di-san-xian/step-1.jpg", originalUrl: "https://cp1.douguo.com/upload/caiku/4/d/d/800_4d2335fbd7ea0a245b39bf8d3cfbf85d.jpg", sha256: "308a39ae21f1eccce4ea6b354366505ec3f8454efdc98b226bc719e19b3721f0", httpStatus: 200, contentType: "image/jpeg" },
      { stepOrder: 2, sourceStepOrder: 2, path: "assets/dishes/sources/cn-010-di-san-xian/step-2.jpg", originalUrl: "https://cp1.douguo.com/upload/caiku/3/5/3/800_35e6d418d61d7d6102e4c32b85546003.jpg", sha256: "2c6403fcb4c18d62e2fbbba2b5a9da033010e6ba4163855f74b2f9b640ec309d", httpStatus: 200, contentType: "image/jpeg" },
      { stepOrder: 3, sourceStepOrder: 3, path: "assets/dishes/sources/cn-010-di-san-xian/step-3.jpg", originalUrl: "https://cp1.douguo.com/upload/caiku/f/4/d/800_f4e86200b3a885f42b062a334d0cd17d.jpg", sha256: "c12d888e5c60b5245ee627068548c8d6d255b2fc9ab864c6736dcff2b433cd14", httpStatus: 200, contentType: "image/jpeg" },
      { stepOrder: 4, sourceStepOrder: 4, path: "assets/dishes/sources/cn-010-di-san-xian/step-4.jpg", originalUrl: "https://cp1.douguo.com/upload/caiku/9/4/b/800_9412ea75b89494d67ce9a3acfa3577fb.jpg", sha256: "d2663ccffdd075ee0ec4fdfd2bab42a21d66e94cf93a0a70bffbcd61da59bf9b", httpStatus: 200, contentType: "image/jpeg" },
      { stepOrder: 5, sourceStepOrder: 5, path: "assets/dishes/sources/cn-010-di-san-xian/step-5.jpg", originalUrl: "https://cp1.douguo.com/upload/caiku/0/5/d/800_05ae16b393bc5498955e38263a09d4bd.jpg", sha256: "a552ebc806554089f2f595eb71fcb2902bf2a86113f6ce8026cb54d84324ca61", httpStatus: 200, contentType: "image/jpeg" },
      { stepOrder: 6, sourceStepOrder: 6, path: "assets/dishes/sources/cn-010-di-san-xian/step-6.jpg", originalUrl: "https://cp1.douguo.com/upload/caiku/9/f/5/800_9f56899ddacfbcffd51f78c91b2a31c5.jpg", sha256: "ab33347bacd7f5d684861a3757bb88b23303cc8c234a9e29ae205a4c63c78d0d", httpStatus: 200, contentType: "image/jpeg" },
      { stepOrder: 7, sourceStepOrder: 7, path: "assets/dishes/sources/cn-010-di-san-xian/step-7.jpg", originalUrl: "https://cp1.douguo.com/upload/caiku/7/5/f/800_75b8cad0641fa7f65a7e10c324027a1f.jpg", sha256: "31b8ad13c5b7dd5478e611ae923af6f3a19e02dc72901cd1c165fd59a0146c46", httpStatus: 200, contentType: "image/jpeg" },
      { stepOrder: 8, sourceStepOrder: 8, path: "assets/dishes/sources/cn-010-di-san-xian/step-8.jpg", originalUrl: "https://cp1.douguo.com/upload/caiku/4/2/5/800_42cb2309df54ef42e0a150423170bc35.jpg", sha256: "4fc75edd8bd16f82e832372b007359f754593150837ba0454e4c76547571099c", httpStatus: 200, contentType: "image/jpeg" },
      { stepOrder: 9, sourceStepOrder: 9, path: "assets/dishes/sources/cn-010-di-san-xian/step-9.jpg", originalUrl: "https://cp1.douguo.com/upload/caiku/e/4/2/800_e4cb75af13455ecbba1070b88fb34372.jpg", sha256: "a8d45a98d5a06dc8976463b8b168537cc46761580e0970f6971d9fc2546e0160", httpStatus: 200, contentType: "image/jpeg" },
      { stepOrder: 10, sourceStepOrder: 10, path: "assets/dishes/sources/cn-010-di-san-xian/step-10.jpg", originalUrl: "https://cp1.douguo.com/upload/caiku/8/8/2/800_88ad5247700b33edf8dfcbd1cca87542.jpg", sha256: "5cf62d5563bda3f880ff3b0f003e05589881c3c848b1bbea839c020c87929f15", httpStatus: 200, contentType: "image/jpeg" },
      { stepOrder: 11, sourceStepOrder: 11, path: "assets/dishes/sources/cn-010-di-san-xian/step-11.jpg", originalUrl: "https://cp1.douguo.com/upload/caiku/d/7/2/800_d73ba164f2e1235187067a1061a36982.jpg", sha256: "5b80133157a7c8638b3aae22e1cd30cb1cd7af5d6a309a588c3f05a78bbc8589", httpStatus: 200, contentType: "image/jpeg" },
      { stepOrder: 12, sourceStepOrder: 12, path: "assets/dishes/sources/cn-010-di-san-xian/step-12.jpg", originalUrl: "https://cp1.douguo.com/upload/caiku/7/2/5/800_72bb739e5db652f92d168efc30ae0925.jpg", sha256: "f7b29e5a698c2550b342e9b1600e3c3cf64c9216b3a5ea010d6bbb2aa089ef90", httpStatus: 200, contentType: "image/jpeg" },
      { stepOrder: 13, sourceStepOrder: 13, path: "assets/dishes/sources/cn-010-di-san-xian/step-13.jpg", originalUrl: "https://cp1.douguo.com/upload/caiku/0/a/a/800_0ab6838ea80607c82f8d10a53394ce2a.jpg", sha256: "b8409500b01fb3456397d92a5e7937a480e0f7d73056f9775c74265846f5b605", httpStatus: 200, contentType: "image/jpeg" }
    ]
  }),
  c("桂林米粉", "Guilin Rice Noodles", "广西", "猪骨（原文未给用量）；牛骨（原文未给用量）；肥五花肉（原文未给用量）；里脊（原文未给用量）；卤料包（原文未给用量）；卤水调味料（原文未列组成和用量）；腌料（原文未列组成和用量）；酸豆角（原文未给用量）；辣椒（炒酸豆角用，原文未给用量）；花生（装碗时用炸好的花生，原文未给用量）；香葱（原文未给用量）；干米粉（原文未给用量）；清水（熬卤水、白水煮肉和泡粉用，原文未给用量）；开水（烫米粉用，原文未给用量）；食用油（炸制用，原文未列油种和用量）；骨头汤（佐餐，可选，原文未给材料和用量）", "1）用卤料包与猪骨、牛骨熬卤水，再加调料调味；卤水需熬8小时以上才能出味，原文未说明调料的具体组成、用量和熬制火候。2）熬卤水期间准备酸豆角。3）将酸豆角切好，放入锅中简单炒一下，加入辣椒即可；原文未说明炒制火候、时长和用油量。4）腌里脊；原文未给出腌料组成、腌制方法和时间。5）白水煮肉；原文未指定所煮肉的种类、后续去向、煮制火候、时长和完成条件。6）炸叉烧；原文未说明前处理方法、油种、用油量、火候、时长和完成条件。7）炸锅烧，再重复炸一次，使皮酥脆；原文未说明前处理方法、油种、用油量、火候和时长。8）泡干米粉；原文未说明泡粉方法和时间。9）所有材料准备好后，用开水烫米粉，加入锅烧、叉烧、酸豆角、香葱、炸好的花生和卤水，拌匀即可；还可另熬一锅骨头汤佐餐。原文未提供炸花生和另熬骨头汤的具体做法。", "11-guilin-mifen.png", "https://www.douguo.com/cookbook/2331633.html", {
    "sourceName": "豆果美食",
    "recipePageUrl": "https://www.douguo.com/cookbook/2331633.html",
    "mediaPageUrl": null,
    "author": "云私房",
    "rightsNotice": "©本菜谱的做法由云私房编写，未经授权不得转载。",
    "reuseLicense": null,
    "repositoryCopyAuthorization": "user_confirmed_2026-10-07",
    "hero": {
      "path": "assets/dishes/sources/cn-011-douguo/hero.jpg",
      "originalUrl": "https://cp1.douguo.com/upload/caiku/9/f/1/800_9f69de3a9edecb6f0ff659fa1f247681.jpg",
      "sha256": "940e8fad7534c1765c941e8459ee0560b75b092ab37f6009378eb8057ed9f348",
      "httpStatus": 200,
      "contentType": "image/jpeg"
    },
    "steps": [
      {
        "stepOrder": 1,
        "path": "assets/dishes/sources/cn-011-douguo/step-1.jpg",
        "originalUrl": "https://cp1.douguo.com/upload/caiku/d/8/b/800_d8765386261ec38ad699e3fe893ff1bb.jpg",
        "sha256": "75f524326b847e6771dda4e29ccd87ccbbc64aa8d3c318bc4c53824e6b60bfc9",
        "httpStatus": 200,
        "contentType": "image/jpeg"
      },
      {
        "stepOrder": 2,
        "path": "assets/dishes/sources/cn-011-douguo/step-2.jpg",
        "originalUrl": "https://cp1.douguo.com/upload/caiku/1/f/9/800_1f016fe7b995d932b449e52dad043e49.jpg",
        "sha256": "9b69cd8084a5d2c16e34ee75cfb1b255c8a7132b1c7e6255d017e796c3447c23",
        "httpStatus": 200,
        "contentType": "image/jpeg"
      },
      {
        "stepOrder": 3,
        "path": "assets/dishes/sources/cn-011-douguo/step-3.jpg",
        "originalUrl": "https://cp1.douguo.com/upload/caiku/f/5/5/800_f5f0e8b7b969d2a22845998e4de6aa35.jpg",
        "sha256": "a274bffad0439403bea3618b718a2b0cb678e35b2ef0ff2251eb71f309fe70bf",
        "httpStatus": 200,
        "contentType": "image/jpeg"
      },
      {
        "stepOrder": 4,
        "path": "assets/dishes/sources/cn-011-douguo/step-4.jpg",
        "originalUrl": "https://cp1.douguo.com/upload/caiku/8/d/4/800_8d4d640096f0b53eae29454d7ea8ea14.jpg",
        "sha256": "83af0721a3d7d175aa4b8af9cfdb4d79e0534c0a50e8992041fada079aaacceb",
        "httpStatus": 200,
        "contentType": "image/jpeg"
      },
      {
        "stepOrder": 5,
        "path": "assets/dishes/sources/cn-011-douguo/step-5.jpg",
        "originalUrl": "https://cp1.douguo.com/upload/caiku/c/c/a/800_cc745d49a0128ad590214ac97deea17a.jpg",
        "sha256": "2a0ea01e1addfe5c8acd22e1821a3b1122c8e474fdc9e2a02e8ea5738a56b066",
        "httpStatus": 200,
        "contentType": "image/jpeg"
      },
      {
        "stepOrder": 6,
        "path": "assets/dishes/sources/cn-011-douguo/step-6.jpg",
        "originalUrl": "https://cp1.douguo.com/upload/caiku/f/e/9/800_fe0a3f1381c612fd30fede4d64a55759.jpg",
        "sha256": "e8a548843f5235b95f3355fc7040eb42a2f6ec47c294f2d932ebce0ee1157768",
        "httpStatus": 200,
        "contentType": "image/jpeg"
      },
      {
        "stepOrder": 7,
        "path": "assets/dishes/sources/cn-011-douguo/step-7.jpg",
        "originalUrl": "https://cp1.douguo.com/upload/caiku/d/5/b/800_d57c432bfdbdf9ab8aff22a77adcf12b.jpg",
        "sha256": "560541c366b38993f47c1e3870ac524b4a040f41a8374efea43d1ae4e112b3bb",
        "httpStatus": 200,
        "contentType": "image/jpeg"
      },
      {
        "stepOrder": 8,
        "path": "assets/dishes/sources/cn-011-douguo/step-8.jpg",
        "originalUrl": "https://cp1.douguo.com/upload/caiku/3/a/6/800_3a0c95db3f7110b4781f930fae716bc6.jpg",
        "sha256": "8db0dd244f28d1753afcc7dd5affd5581ecb28cdf76c46f14188b1304f5af974",
        "httpStatus": 200,
        "contentType": "image/jpeg"
      },
      {
        "stepOrder": 9,
        "path": "assets/dishes/sources/cn-011-douguo/step-9.jpg",
        "originalUrl": "https://cp1.douguo.com/upload/caiku/d/d/2/800_dd211d8d5aa7e6c0b7b0d74e783f6a42.jpg",
        "sha256": "940e8fad7534c1765c941e8459ee0560b75b092ab37f6009378eb8057ed9f348",
        "httpStatus": 200,
        "contentType": "image/jpeg"
      }
    ]
  }, null, null, {
    "sourceLimitations": [
      "卤水调料身份未列明。",
      "里脊腌料、腌制时间和方法未列明。",
      "白水煮肉未指定肉种去向、煮制火候/时间和完成条件。",
      "炸叉烧/锅烧油种、油量、火候、时间未给，锅烧仅给复炸皮脆条件。",
      "炸花生的准备工序未给。",
      "原料数量、泡粉时间、整道菜总时长未给；8小时以上仅为卤水阶段。"
    ]
  }),
  c("羊肉泡馍", "Lamb Paomo", "陕西", "羊肉500克；面饼2个；粉丝80克；木耳30克；姜20克；花椒1茶匙；香菜和糖蒜适量；盐适量", "1）羊肉加姜和花椒小火煮至软烂，切片，汤过滤。2）面饼掰成黄豆大小，粉丝木耳泡发。3）原汤煮馍粒、粉丝和木耳至入味，铺羊肉，配香菜与糖蒜。", "12-yangrou-paomo.png", CN_HOME),
  c("胡辣汤", "Henan Spicy Pepper Soup", "河南", "熟牛肉100克；面筋100克；木耳40克；海带50克；粉条80克；高汤800毫升；胡椒粉5克；香醋20毫升；淀粉25克", "1）木耳海带切丝，粉条泡软。2）高汤烧开，下牛肉、面筋和配菜煮熟。3）加胡椒、盐和香醋，淀粉水缓慢勾成稠羹。", "13-hulatang.png", CN_HOME),
  c("柳州螺蛳粉", "Liuzhou Luosifen", "广西", "袋装螺蛳粉1包（含米粉、螺蛳肉包，螺蛳肉包可能放在配料包中，以及汤料包、酸笋包、花生包、豆皮包、木耳包等配料包和醋包、辣椒油等调味包）；水1L", "1）锅中加水，将水烧开。2）下米粉，煮 3-5 分钟，期间用筷子搅拌，防止米粉粘在一起。3）下汤料包，按个人口味添加。4）下一部分配料包，如木耳，花生，螺蛳（这部分配料需要煮一会才入味）。5）下调味包，按个人口味添加。6）搅拌后捞出，放入碗中。7）下剩下的配料包，如酸笋，豆皮（这部分配料不适合被汤泡太久）。8）享用美食。", "14-liuzhou-luosifen.png", "https://github.com/Anduin2017/HowToCook/blob/a2d45c6984dff9ee941da0e7c452f7965965d962/dishes/staple/%E8%9E%BA%E8%9B%B3%E7%B2%89.md", null, null, 1, {
  "howtocook": {
    "commit": "a2d45c6984dff9ee941da0e7c452f7965965d962",
    "path": "dishes/staple/螺蛳粉.md",
    "sha256": "0e7baf84512c8dfde0ace61363835589ba32468fa27fef46c35593418d38a0da",
    "rawMarkdown": "# 螺蛳粉的做法\n\n螺蛳粉是广西柳州的特色小吃，汤鲜味浓，酸辣爽口，米粉软滑筋道。口味上融合了螺蛳汤的鲜美、酸笋的独特发酵风味和辣椒油的刺激，层次分明。作为主食，米粉提供充足碳水化合物，螺蛳肉包和配料带来一定蛋白质，酸笋则有助于开胃促消化。这道菜所需操作简单，只需按顺序煮熟米粉和调味即可，对新手非常友好。从烧水到出锅，最快约十分钟就能端上餐桌，适合快手解决一餐。\n\n预估烹饪难度：★\n\n预估卡路里：1109 大卡\n\n## 必备原料和工具\n\n> 出于家常菜考虑，从螺蛳，酸笋等工序开始制作螺蛳粉并不现实，因此本食谱基于袋装螺蛳粉实现。\n\n### 原料\n\n- 袋装螺蛳粉一包，其中应该包含：\n  - 米粉\n  - 螺蛳肉包（可能放在配料包中）\n  - 汤料包\n  - 酸笋包、花生包、豆皮包、木耳包等配料包\n  - 醋包、辣椒油等调味包\n\n### 工具\n\n- 煮锅\n\n- 电磁炉/灶台\n\n- 筷子一双\n\n## 计算\n\n- 根据个人经验，一包袋装螺蛳粉足够一人一餐食（虽然看着很大包）\n- 水 1L\n\n## 操作\n\n1. 锅中加水，将水烧开\n2. 下米粉，煮 3-5 分钟，期间用筷子搅拌，防止米粉粘在一起\n3. 下汤料包，按个人口味添加\n4. 下一部分配料包，如木耳，花生，螺蛳（这部分配料需要煮一会才入味）\n5. 下调味包，按个人口味添加\n6. 搅拌后捞出，放入碗中\n7. 下剩下的配料包，如酸笋，豆皮（这部分配料不适合被汤泡太久）\n8. 享用美食\n\n## 附加内容\n\n- 如果想要更有嚼劲的粉，可以缩短第二步煮粉的时间\n- 如果想在螺蛳粉中添加炸蛋，请参考炸蛋的教程\n- 配料的选择请依照个人口味\n\n如果您遵循本指南的制作流程而发现有问题或可以改进的流程，请提出 Issue 或 Pull request 。\n",
    "sections": [
      {
        "title": "螺蛳粉的做法",
        "markdown": "\n螺蛳粉是广西柳州的特色小吃，汤鲜味浓，酸辣爽口，米粉软滑筋道。口味上融合了螺蛳汤的鲜美、酸笋的独特发酵风味和辣椒油的刺激，层次分明。作为主食，米粉提供充足碳水化合物，螺蛳肉包和配料带来一定蛋白质，酸笋则有助于开胃促消化。这道菜所需操作简单，只需按顺序煮熟米粉和调味即可，对新手非常友好。从烧水到出锅，最快约十分钟就能端上餐桌，适合快手解决一餐。\n\n预估烹饪难度：★\n\n预估卡路里：1109 大卡\n\n",
        "level": 1
      },
      {
        "title": "必备原料和工具",
        "markdown": "\n> 出于家常菜考虑，从螺蛳，酸笋等工序开始制作螺蛳粉并不现实，因此本食谱基于袋装螺蛳粉实现。\n\n",
        "level": 2
      },
      {
        "title": "原料",
        "markdown": "\n- 袋装螺蛳粉一包，其中应该包含：\n  - 米粉\n  - 螺蛳肉包（可能放在配料包中）\n  - 汤料包\n  - 酸笋包、花生包、豆皮包、木耳包等配料包\n  - 醋包、辣椒油等调味包\n\n",
        "level": 3
      },
      {
        "title": "工具",
        "markdown": "\n- 煮锅\n\n- 电磁炉/灶台\n\n- 筷子一双\n\n",
        "level": 3
      },
      {
        "title": "计算",
        "markdown": "\n- 根据个人经验，一包袋装螺蛳粉足够一人一餐食（虽然看着很大包）\n- 水 1L\n\n",
        "level": 2
      },
      {
        "title": "操作",
        "markdown": "\n1. 锅中加水，将水烧开\n2. 下米粉，煮 3-5 分钟，期间用筷子搅拌，防止米粉粘在一起\n3. 下汤料包，按个人口味添加\n4. 下一部分配料包，如木耳，花生，螺蛳（这部分配料需要煮一会才入味）\n5. 下调味包，按个人口味添加\n6. 搅拌后捞出，放入碗中\n7. 下剩下的配料包，如酸笋，豆皮（这部分配料不适合被汤泡太久）\n8. 享用美食\n\n",
        "level": 2
      },
      {
        "title": "附加内容",
        "markdown": "\n- 如果想要更有嚼劲的粉，可以缩短第二步煮粉的时间\n- 如果想在螺蛳粉中添加炸蛋，请参考炸蛋的教程\n- 配料的选择请依照个人口味\n\n如果您遵循本指南的制作流程而发现有问题或可以改进的流程，请提出 Issue 或 Pull request 。\n",
        "level": 2
      }
    ],
    "images": []
  },
  "sourceLimitations": [
    "上游为一包袋装螺蛳粉的一人份做法，未提供从螺蛳汤起制作的配方，也未量化包内各配料。",
    "原文仅写最快约十分钟，并非明确的全程总用时；配料煮一会的时长、火力未注明，均不补造。",
    "上游无图片，保留的原有展示图不属于本次 HowToCook 来源图片。",
    "炸蛋仅作为可选附加内容提及并指向另一个教程，本菜谱未提供其做法。"
  ]
}),
  c("兰州清汤牛肉面", "Lanzhou Beef Noodles", "甘肃", "牛腱600克；鲜面条300克；白萝卜250克；姜20克；花椒和八角少许；香菜蒜苗适量；辣椒油适量；盐适量", "1）牛腱焯水，与姜香料小火炖2小时，取出切片，汤过滤。2）萝卜片在清汤中煮熟。3）面条煮好入碗，浇牛肉清汤，铺牛肉、萝卜、香菜蒜苗。", "15-lanzhou-qingtang-niuroumian.png", CN_HOME),
  c(
    "回锅肉", "Twice-cooked Pork", "川菜",
    "二刀肉（臀尖）或带皮五花肉按人数准备：男性每人0.5斤、女性每人0.3斤；小葱2棵；生姜10—40克；青红椒0—30克（按受辣程度选择，不建议用肉厚的菜椒）；蒜苗1把；料酒5毫升；豆瓣酱10毫升（分两次各5毫升）；味精5克；生抽5毫升；食用油适量（滑锅）；冷水适量（煮肉及冷却）",
    "1）炒锅烧热，将猪肉皮面紧贴锅面炙皮，至猪皮黑色部分炭化；用钢丝球把猪皮彻底刷净，黑色炭化层未刷净会有苦味。2）将2棵小葱打结，取部分生姜切片；猪肉放入锅中，加入足量冷水没过猪肉，再放入姜片、葱结和5毫升料酒。开大火煮，水开后撇去浮沫，继续煮15分钟，至筷子能轻松刺穿瘦肉部分。3）青红椒切圈，蒜苗切段，剩余生姜切小薄片；将5毫升豆瓣酱与5毫升生抽提前混合，另留5毫升豆瓣酱备用。4）捞出煮熟的猪肉，放入冷水中晾凉；擦干表面水分以免炒制时爆油，再切成上肥下瘦、约2毫米厚的薄片，切得过厚会口感油腻。5）后续操作要迅速以免糊锅。锅烧热，加入适量食用油铺成一层底油滑锅；放入肉片煸炒，至肥肉透明、肉片微卷。6）倒入豆瓣酱生抽混合物，加入5克味精，翻炒15秒。7）加入青红椒圈、姜片和剩余5毫升豆瓣酱，翻炒30秒。8）加入蒜苗段翻炒60秒，立即出锅。",
    "26-huiguo-rou.jpeg",
    "https://github.com/Anduin2017/HowToCook/blob/2b19c9e9ee926fd925a68207a57582a338813f9c/dishes/meat_dish/%E5%9B%9E%E9%94%85%E8%82%89/%E5%9B%9E%E9%94%85%E8%82%89.md",
    null,
    { totalMinutes: 40 },
    2,
    {
      difficulty: "进阶",
      relatedImages: [{ src: "assets/dishes/howtocook/huiguo-rou/1.jpeg", alt: "回锅肉备料图" }]
    }
  ),
  c("水煮牛肉", "Sichuan Boiled Beef", "川菜", "牛肉300克；豆芽100克；鸡蛋1个；香菜5根；豆瓣酱10克；料酒10毫升；淀粉15克；干辣椒粉5克；姜20克（腌肉用15克，入锅用5克）；蒜3瓣；红辣椒1根；蚝油8克；食用油适量（原文未注明用量，炒制及淋油用）；开水适量（原文未注明用量，红汤及焯豆芽用）", "1）牛肉洗干净切片。2）加入 15g 姜丝，1 个鸡蛋，15g 淀粉，8g 蚝油，10ml 料酒搅拌均匀，腌制 15 分钟。3）香菜洗干净切好。4）锅里倒油，加入豆瓣酱，5g 姜丝，蒜片。5）倒入开水，煮成红汤。6）豆芽洗干净去掉尾须，放进开水里焯熟。7）将豆芽铺入碗底。8）将牛肉片一片一片地放进红汤中，煮熟以后捞出。9）将牛肉铺在豆芽上，撒上香菜梗。10）撒上香菜叶，辣椒粉，辣椒圈。11）另起锅烧热油，将热油淋在菜上面，就完成了。", "27-shuizhu-niurou.png", "https://github.com/Anduin2017/HowToCook/blob/a2d45c6984dff9ee941da0e7c452f7965965d962/dishes/meat_dish/%E6%B0%B4%E7%85%AE%E7%89%9B%E8%82%89/%E6%B0%B4%E7%85%AE%E7%89%9B%E8%82%89.md", null, { totalMinutes: 40 }, 2, {
  "howtocook": {
    "commit": "a2d45c6984dff9ee941da0e7c452f7965965d962",
    "path": "dishes/meat_dish/水煮牛肉/水煮牛肉.md",
    "sha256": "829ef95e88845f21bb832a1171b268d1121df5dbf74bd8c68a7db28a3e932eeb",
    "rawMarkdown": "# 水煮牛肉的做法\n\n![水煮牛肉-预览图-1](./sznr1.jpg)\n\n水煮牛肉是川菜中的经典麻辣味型，口感滑嫩、汤汁红亮、香辣烫鲜。牛肉富含优质蛋白质和铁，搭配豆芽可补充膳食纤维。这道菜对新手来说不算太难，但需注意火候和泼油安全，整体制作约需四十分钟。\n\n预估烹饪难度：★★★\n\n预估卡路里：431 大卡\n\n## 必备原料和工具\n\n- 牛肉\n- 豆芽\n- 鸡蛋\n- 香菜\n- 豆瓣酱\n- 料酒\n- 淀粉\n- 干辣椒粉\n- 姜\n- 蒜\n- 红辣椒\n- 蚝油\n\n## 计算\n\n每次制作前需要确定计划做几份。一份正好够 2 个人吃。\n\n这是一份的量：\n\n- 牛肉 300g\n- 豆芽 100g\n- 鸡蛋 1 个\n- 香菜 5 根\n- 豆瓣酱 10g\n- 料酒 10ml\n- 淀粉 15g\n- 干辣椒粉 5g\n- 姜 20g\n- 蒜 3 瓣\n- 红辣椒 1 根\n- 蚝油 8g\n\n## 操作\n\n1. 牛肉洗干净切片。\n\n![水煮牛肉-预览图-2](./sznr2.jpg)\n\n2. 加入 15g 姜丝，1 个鸡蛋，15g 淀粉，8g 蚝油，10ml 料酒搅拌均匀，腌制 15 分钟。\n\n![水煮牛肉-预览图-3](./sznr3.jpg)\n\n3. 香菜洗干净切好。\n\n![水煮牛肉-预览图-4](./sznr4.jpg)\n\n4. 锅里倒油，加入豆瓣酱，5g 姜丝，蒜片。\n\n![水煮牛肉-预览图-5](./sznr5.jpg)\n\n5. 倒入开水，煮成红汤。\n\n![水煮牛肉-预览图-6](./sznr6.jpg)\n\n6. 豆芽洗干净去掉尾须，放进开水里焯熟。\n\n![水煮牛肉-预览图-7](./sznr7.jpg)\n\n7. 将豆芽铺入碗底。\n\n![水煮牛肉-预览图-8](./sznr8.jpg)\n\n8. 将牛肉片一片一片的放进红汤中，煮熟以后捞出。\n\n![水煮牛肉-预览图-9](./sznr9.jpg)\n\n9. 将牛肉铺在豆芽上，撒上香菜梗。\n\n![水煮牛肉-预览图-10](./sznr10.jpg)\n\n10. 撒上香菜叶，辣椒粉，辣椒圈。\n\n![水煮牛肉-预览图-11](./sznr11.jpg)\n\n11. 另起锅烧热油，将热油淋在菜上面，就完成了。\n\n![水煮牛肉-预览图-12](./sznr12.jpg)\n\n## 附加内容\n\n- 参考: [水煮牛肉的详细步骤](https://www.zhms.cn/recipe/blrqm.html?source=2)\n\n如果您遵循本指南的制作流程而发现有问题或可以改进的流程，请提出 Issue 或 Pull request 。\n",
    "sections": [
      {
        "title": "水煮牛肉的做法",
        "markdown": "\n![水煮牛肉-预览图-1](./sznr1.jpg)\n\n水煮牛肉是川菜中的经典麻辣味型，口感滑嫩、汤汁红亮、香辣烫鲜。牛肉富含优质蛋白质和铁，搭配豆芽可补充膳食纤维。这道菜对新手来说不算太难，但需注意火候和泼油安全，整体制作约需四十分钟。\n\n预估烹饪难度：★★★\n\n预估卡路里：431 大卡\n\n",
        "level": 1
      },
      {
        "title": "必备原料和工具",
        "markdown": "\n- 牛肉\n- 豆芽\n- 鸡蛋\n- 香菜\n- 豆瓣酱\n- 料酒\n- 淀粉\n- 干辣椒粉\n- 姜\n- 蒜\n- 红辣椒\n- 蚝油\n\n",
        "level": 2
      },
      {
        "title": "计算",
        "markdown": "\n每次制作前需要确定计划做几份。一份正好够 2 个人吃。\n\n这是一份的量：\n\n- 牛肉 300g\n- 豆芽 100g\n- 鸡蛋 1 个\n- 香菜 5 根\n- 豆瓣酱 10g\n- 料酒 10ml\n- 淀粉 15g\n- 干辣椒粉 5g\n- 姜 20g\n- 蒜 3 瓣\n- 红辣椒 1 根\n- 蚝油 8g\n\n",
        "level": 2
      },
      {
        "title": "操作",
        "markdown": "\n1. 牛肉洗干净切片。\n\n![水煮牛肉-预览图-2](./sznr2.jpg)\n\n2. 加入 15g 姜丝，1 个鸡蛋，15g 淀粉，8g 蚝油，10ml 料酒搅拌均匀，腌制 15 分钟。\n\n![水煮牛肉-预览图-3](./sznr3.jpg)\n\n3. 香菜洗干净切好。\n\n![水煮牛肉-预览图-4](./sznr4.jpg)\n\n4. 锅里倒油，加入豆瓣酱，5g 姜丝，蒜片。\n\n![水煮牛肉-预览图-5](./sznr5.jpg)\n\n5. 倒入开水，煮成红汤。\n\n![水煮牛肉-预览图-6](./sznr6.jpg)\n\n6. 豆芽洗干净去掉尾须，放进开水里焯熟。\n\n![水煮牛肉-预览图-7](./sznr7.jpg)\n\n7. 将豆芽铺入碗底。\n\n![水煮牛肉-预览图-8](./sznr8.jpg)\n\n8. 将牛肉片一片一片的放进红汤中，煮熟以后捞出。\n\n![水煮牛肉-预览图-9](./sznr9.jpg)\n\n9. 将牛肉铺在豆芽上，撒上香菜梗。\n\n![水煮牛肉-预览图-10](./sznr10.jpg)\n\n10. 撒上香菜叶，辣椒粉，辣椒圈。\n\n![水煮牛肉-预览图-11](./sznr11.jpg)\n\n11. 另起锅烧热油，将热油淋在菜上面，就完成了。\n\n![水煮牛肉-预览图-12](./sznr12.jpg)\n\n",
        "level": 2
      },
      {
        "title": "附加内容",
        "markdown": "\n- 参考: [水煮牛肉的详细步骤](https://www.zhms.cn/recipe/blrqm.html?source=2)\n\n如果您遵循本指南的制作流程而发现有问题或可以改进的流程，请提出 Issue 或 Pull request 。\n",
        "level": 2
      }
    ],
    "images": [
      {
        "originalReference": "./sznr1.jpg",
        "originalUrl": "https://raw.githubusercontent.com/Anduin2017/HowToCook/a2d45c6984dff9ee941da0e7c452f7965965d962/dishes/meat_dish/%E6%B0%B4%E7%85%AE%E7%89%9B%E8%82%89/sznr1.jpg",
        "path": "assets/dishes/howtocook/cn-017/1.jpg",
        "alt": "水煮牛肉-预览图-1",
        "pageOrder": 1,
        "adjacentText": "# 水煮牛肉的做法\n\n![水煮牛肉-预览图-1](./sznr1.jpg)\n\n水煮牛肉是川菜中的经典麻辣味型，口感滑嫩、汤汁红亮、香辣烫鲜。牛肉富含优质蛋白质和铁，搭配豆芽可补充膳食纤维。这道菜对新手来说不算太难，但需注意火候和泼油安全，整体制作约需四十分钟。\n\n预估烹饪难度：★★★\n\n预估卡路里：431 大卡\n\n## 必备原料和工具\n\n- 牛肉\n- 豆芽\n- 鸡蛋\n- 香菜\n- 豆瓣酱\n- 料酒\n- 淀粉\n- 干辣椒粉\n- 姜\n"
      },
      {
        "originalReference": "./sznr2.jpg",
        "originalUrl": "https://raw.githubusercontent.com/Anduin2017/HowToCook/a2d45c6984dff9ee941da0e7c452f7965965d962/dishes/meat_dish/%E6%B0%B4%E7%85%AE%E7%89%9B%E8%82%89/sznr2.jpg",
        "path": "assets/dishes/howtocook/cn-017/2.jpg",
        "alt": "水煮牛肉-预览图-2",
        "pageOrder": 2,
        "adjacentText": "油\n\n## 计算\n\n每次制作前需要确定计划做几份。一份正好够 2 个人吃。\n\n这是一份的量：\n\n- 牛肉 300g\n- 豆芽 100g\n- 鸡蛋 1 个\n- 香菜 5 根\n- 豆瓣酱 10g\n- 料酒 10ml\n- 淀粉 15g\n- 干辣椒粉 5g\n- 姜 20g\n- 蒜 3 瓣\n- 红辣椒 1 根\n- 蚝油 8g\n\n## 操作\n\n1. 牛肉洗干净切片。\n\n![水煮牛肉-预览图-2](./sznr2.jpg)\n\n2. 加入 15g 姜丝，1 个鸡蛋，15g 淀粉，8g 蚝油，10ml 料酒搅拌均匀，腌制 15 分钟。\n\n![水煮牛肉-预览图-3](./sznr3.jpg)\n\n3. 香菜洗干净切好。\n\n![水煮牛肉-预览图-4](./sznr4.jpg)\n\n4. 锅里倒油，加入豆瓣酱，5g 姜丝，蒜片。\n\n![水煮牛肉-预览图-5](./sznr5.jpg)\n\n5"
      },
      {
        "originalReference": "./sznr3.jpg",
        "originalUrl": "https://raw.githubusercontent.com/Anduin2017/HowToCook/a2d45c6984dff9ee941da0e7c452f7965965d962/dishes/meat_dish/%E6%B0%B4%E7%85%AE%E7%89%9B%E8%82%89/sznr3.jpg",
        "path": "assets/dishes/howtocook/cn-017/3.jpg",
        "alt": "水煮牛肉-预览图-3",
        "pageOrder": 3,
        "adjacentText": " 根\n- 豆瓣酱 10g\n- 料酒 10ml\n- 淀粉 15g\n- 干辣椒粉 5g\n- 姜 20g\n- 蒜 3 瓣\n- 红辣椒 1 根\n- 蚝油 8g\n\n## 操作\n\n1. 牛肉洗干净切片。\n\n![水煮牛肉-预览图-2](./sznr2.jpg)\n\n2. 加入 15g 姜丝，1 个鸡蛋，15g 淀粉，8g 蚝油，10ml 料酒搅拌均匀，腌制 15 分钟。\n\n![水煮牛肉-预览图-3](./sznr3.jpg)\n\n3. 香菜洗干净切好。\n\n![水煮牛肉-预览图-4](./sznr4.jpg)\n\n4. 锅里倒油，加入豆瓣酱，5g 姜丝，蒜片。\n\n![水煮牛肉-预览图-5](./sznr5.jpg)\n\n5. 倒入开水，煮成红汤。\n\n![水煮牛肉-预览图-6](./sznr6.jpg)\n\n6. 豆芽洗干净去掉尾须，放进开水里焯熟。\n\n![水煮牛肉-预览图-7](./sz"
      },
      {
        "originalReference": "./sznr4.jpg",
        "originalUrl": "https://raw.githubusercontent.com/Anduin2017/HowToCook/a2d45c6984dff9ee941da0e7c452f7965965d962/dishes/meat_dish/%E6%B0%B4%E7%85%AE%E7%89%9B%E8%82%89/sznr4.jpg",
        "path": "assets/dishes/howtocook/cn-017/4.jpg",
        "alt": "水煮牛肉-预览图-4",
        "pageOrder": 4,
        "adjacentText": "\n- 姜 20g\n- 蒜 3 瓣\n- 红辣椒 1 根\n- 蚝油 8g\n\n## 操作\n\n1. 牛肉洗干净切片。\n\n![水煮牛肉-预览图-2](./sznr2.jpg)\n\n2. 加入 15g 姜丝，1 个鸡蛋，15g 淀粉，8g 蚝油，10ml 料酒搅拌均匀，腌制 15 分钟。\n\n![水煮牛肉-预览图-3](./sznr3.jpg)\n\n3. 香菜洗干净切好。\n\n![水煮牛肉-预览图-4](./sznr4.jpg)\n\n4. 锅里倒油，加入豆瓣酱，5g 姜丝，蒜片。\n\n![水煮牛肉-预览图-5](./sznr5.jpg)\n\n5. 倒入开水，煮成红汤。\n\n![水煮牛肉-预览图-6](./sznr6.jpg)\n\n6. 豆芽洗干净去掉尾须，放进开水里焯熟。\n\n![水煮牛肉-预览图-7](./sznr7.jpg)\n\n7. 将豆芽铺入碗底。\n\n![水煮牛肉-预览图-8](./sz"
      },
      {
        "originalReference": "./sznr5.jpg",
        "originalUrl": "https://raw.githubusercontent.com/Anduin2017/HowToCook/a2d45c6984dff9ee941da0e7c452f7965965d962/dishes/meat_dish/%E6%B0%B4%E7%85%AE%E7%89%9B%E8%82%89/sznr5.jpg",
        "path": "assets/dishes/howtocook/cn-017/5.jpg",
        "alt": "水煮牛肉-预览图-5",
        "pageOrder": 5,
        "adjacentText": "。\n\n![水煮牛肉-预览图-2](./sznr2.jpg)\n\n2. 加入 15g 姜丝，1 个鸡蛋，15g 淀粉，8g 蚝油，10ml 料酒搅拌均匀，腌制 15 分钟。\n\n![水煮牛肉-预览图-3](./sznr3.jpg)\n\n3. 香菜洗干净切好。\n\n![水煮牛肉-预览图-4](./sznr4.jpg)\n\n4. 锅里倒油，加入豆瓣酱，5g 姜丝，蒜片。\n\n![水煮牛肉-预览图-5](./sznr5.jpg)\n\n5. 倒入开水，煮成红汤。\n\n![水煮牛肉-预览图-6](./sznr6.jpg)\n\n6. 豆芽洗干净去掉尾须，放进开水里焯熟。\n\n![水煮牛肉-预览图-7](./sznr7.jpg)\n\n7. 将豆芽铺入碗底。\n\n![水煮牛肉-预览图-8](./sznr8.jpg)\n\n8. 将牛肉片一片一片的放进红汤中，煮熟以后捞出。\n\n![水煮牛肉-预览图-9](./"
      },
      {
        "originalReference": "./sznr6.jpg",
        "originalUrl": "https://raw.githubusercontent.com/Anduin2017/HowToCook/a2d45c6984dff9ee941da0e7c452f7965965d962/dishes/meat_dish/%E6%B0%B4%E7%85%AE%E7%89%9B%E8%82%89/sznr6.jpg",
        "path": "assets/dishes/howtocook/cn-017/6.jpg",
        "alt": "水煮牛肉-预览图-6",
        "pageOrder": 6,
        "adjacentText": "，1 个鸡蛋，15g 淀粉，8g 蚝油，10ml 料酒搅拌均匀，腌制 15 分钟。\n\n![水煮牛肉-预览图-3](./sznr3.jpg)\n\n3. 香菜洗干净切好。\n\n![水煮牛肉-预览图-4](./sznr4.jpg)\n\n4. 锅里倒油，加入豆瓣酱，5g 姜丝，蒜片。\n\n![水煮牛肉-预览图-5](./sznr5.jpg)\n\n5. 倒入开水，煮成红汤。\n\n![水煮牛肉-预览图-6](./sznr6.jpg)\n\n6. 豆芽洗干净去掉尾须，放进开水里焯熟。\n\n![水煮牛肉-预览图-7](./sznr7.jpg)\n\n7. 将豆芽铺入碗底。\n\n![水煮牛肉-预览图-8](./sznr8.jpg)\n\n8. 将牛肉片一片一片的放进红汤中，煮熟以后捞出。\n\n![水煮牛肉-预览图-9](./sznr9.jpg)\n\n9. 将牛肉铺在豆芽上，撒上香菜梗。\n\n![水煮牛肉-预览图-"
      },
      {
        "originalReference": "./sznr7.jpg",
        "originalUrl": "https://raw.githubusercontent.com/Anduin2017/HowToCook/a2d45c6984dff9ee941da0e7c452f7965965d962/dishes/meat_dish/%E6%B0%B4%E7%85%AE%E7%89%9B%E8%82%89/sznr7.jpg",
        "path": "assets/dishes/howtocook/cn-017/7.jpg",
        "alt": "水煮牛肉-预览图-7",
        "pageOrder": 7,
        "adjacentText": "览图-3](./sznr3.jpg)\n\n3. 香菜洗干净切好。\n\n![水煮牛肉-预览图-4](./sznr4.jpg)\n\n4. 锅里倒油，加入豆瓣酱，5g 姜丝，蒜片。\n\n![水煮牛肉-预览图-5](./sznr5.jpg)\n\n5. 倒入开水，煮成红汤。\n\n![水煮牛肉-预览图-6](./sznr6.jpg)\n\n6. 豆芽洗干净去掉尾须，放进开水里焯熟。\n\n![水煮牛肉-预览图-7](./sznr7.jpg)\n\n7. 将豆芽铺入碗底。\n\n![水煮牛肉-预览图-8](./sznr8.jpg)\n\n8. 将牛肉片一片一片的放进红汤中，煮熟以后捞出。\n\n![水煮牛肉-预览图-9](./sznr9.jpg)\n\n9. 将牛肉铺在豆芽上，撒上香菜梗。\n\n![水煮牛肉-预览图-10](./sznr10.jpg)\n\n10. 撒上香菜叶，辣椒粉，辣椒圈。\n\n![水煮牛肉-预览图-1"
      },
      {
        "originalReference": "./sznr8.jpg",
        "originalUrl": "https://raw.githubusercontent.com/Anduin2017/HowToCook/a2d45c6984dff9ee941da0e7c452f7965965d962/dishes/meat_dish/%E6%B0%B4%E7%85%AE%E7%89%9B%E8%82%89/sznr8.jpg",
        "path": "assets/dishes/howtocook/cn-017/8.jpg",
        "alt": "水煮牛肉-预览图-8",
        "pageOrder": 8,
        "adjacentText": "览图-4](./sznr4.jpg)\n\n4. 锅里倒油，加入豆瓣酱，5g 姜丝，蒜片。\n\n![水煮牛肉-预览图-5](./sznr5.jpg)\n\n5. 倒入开水，煮成红汤。\n\n![水煮牛肉-预览图-6](./sznr6.jpg)\n\n6. 豆芽洗干净去掉尾须，放进开水里焯熟。\n\n![水煮牛肉-预览图-7](./sznr7.jpg)\n\n7. 将豆芽铺入碗底。\n\n![水煮牛肉-预览图-8](./sznr8.jpg)\n\n8. 将牛肉片一片一片的放进红汤中，煮熟以后捞出。\n\n![水煮牛肉-预览图-9](./sznr9.jpg)\n\n9. 将牛肉铺在豆芽上，撒上香菜梗。\n\n![水煮牛肉-预览图-10](./sznr10.jpg)\n\n10. 撒上香菜叶，辣椒粉，辣椒圈。\n\n![水煮牛肉-预览图-11](./sznr11.jpg)\n\n11. 另起锅烧热油，将热油淋在菜上面，就完成"
      },
      {
        "originalReference": "./sznr9.jpg",
        "originalUrl": "https://raw.githubusercontent.com/Anduin2017/HowToCook/a2d45c6984dff9ee941da0e7c452f7965965d962/dishes/meat_dish/%E6%B0%B4%E7%85%AE%E7%89%9B%E8%82%89/sznr9.jpg",
        "path": "assets/dishes/howtocook/cn-017/9.jpg",
        "alt": "水煮牛肉-预览图-9",
        "pageOrder": 9,
        "adjacentText": "-5](./sznr5.jpg)\n\n5. 倒入开水，煮成红汤。\n\n![水煮牛肉-预览图-6](./sznr6.jpg)\n\n6. 豆芽洗干净去掉尾须，放进开水里焯熟。\n\n![水煮牛肉-预览图-7](./sznr7.jpg)\n\n7. 将豆芽铺入碗底。\n\n![水煮牛肉-预览图-8](./sznr8.jpg)\n\n8. 将牛肉片一片一片的放进红汤中，煮熟以后捞出。\n\n![水煮牛肉-预览图-9](./sznr9.jpg)\n\n9. 将牛肉铺在豆芽上，撒上香菜梗。\n\n![水煮牛肉-预览图-10](./sznr10.jpg)\n\n10. 撒上香菜叶，辣椒粉，辣椒圈。\n\n![水煮牛肉-预览图-11](./sznr11.jpg)\n\n11. 另起锅烧热油，将热油淋在菜上面，就完成了。\n\n![水煮牛肉-预览图-12](./sznr12.jpg)\n\n## 附加内容\n\n- 参考: [水煮牛肉的"
      },
      {
        "originalReference": "./sznr10.jpg",
        "originalUrl": "https://raw.githubusercontent.com/Anduin2017/HowToCook/a2d45c6984dff9ee941da0e7c452f7965965d962/dishes/meat_dish/%E6%B0%B4%E7%85%AE%E7%89%9B%E8%82%89/sznr10.jpg",
        "path": "assets/dishes/howtocook/cn-017/10.jpg",
        "alt": "水煮牛肉-预览图-10",
        "pageOrder": 10,
        "adjacentText": "/sznr6.jpg)\n\n6. 豆芽洗干净去掉尾须，放进开水里焯熟。\n\n![水煮牛肉-预览图-7](./sznr7.jpg)\n\n7. 将豆芽铺入碗底。\n\n![水煮牛肉-预览图-8](./sznr8.jpg)\n\n8. 将牛肉片一片一片的放进红汤中，煮熟以后捞出。\n\n![水煮牛肉-预览图-9](./sznr9.jpg)\n\n9. 将牛肉铺在豆芽上，撒上香菜梗。\n\n![水煮牛肉-预览图-10](./sznr10.jpg)\n\n10. 撒上香菜叶，辣椒粉，辣椒圈。\n\n![水煮牛肉-预览图-11](./sznr11.jpg)\n\n11. 另起锅烧热油，将热油淋在菜上面，就完成了。\n\n![水煮牛肉-预览图-12](./sznr12.jpg)\n\n## 附加内容\n\n- 参考: [水煮牛肉的详细步骤](https://www.zhms.cn/recipe/blrqm.html?source"
      },
      {
        "originalReference": "./sznr11.jpg",
        "originalUrl": "https://raw.githubusercontent.com/Anduin2017/HowToCook/a2d45c6984dff9ee941da0e7c452f7965965d962/dishes/meat_dish/%E6%B0%B4%E7%85%AE%E7%89%9B%E8%82%89/sznr11.jpg",
        "path": "assets/dishes/howtocook/cn-017/11.jpg",
        "alt": "水煮牛肉-预览图-11",
        "pageOrder": 11,
        "adjacentText": "./sznr7.jpg)\n\n7. 将豆芽铺入碗底。\n\n![水煮牛肉-预览图-8](./sznr8.jpg)\n\n8. 将牛肉片一片一片的放进红汤中，煮熟以后捞出。\n\n![水煮牛肉-预览图-9](./sznr9.jpg)\n\n9. 将牛肉铺在豆芽上，撒上香菜梗。\n\n![水煮牛肉-预览图-10](./sznr10.jpg)\n\n10. 撒上香菜叶，辣椒粉，辣椒圈。\n\n![水煮牛肉-预览图-11](./sznr11.jpg)\n\n11. 另起锅烧热油，将热油淋在菜上面，就完成了。\n\n![水煮牛肉-预览图-12](./sznr12.jpg)\n\n## 附加内容\n\n- 参考: [水煮牛肉的详细步骤](https://www.zhms.cn/recipe/blrqm.html?source=2)\n\n如果您遵循本指南的制作流程而发现有问题或可以改进的流程，请提出 Issue 或 Pull "
      },
      {
        "originalReference": "./sznr12.jpg",
        "originalUrl": "https://raw.githubusercontent.com/Anduin2017/HowToCook/a2d45c6984dff9ee941da0e7c452f7965965d962/dishes/meat_dish/%E6%B0%B4%E7%85%AE%E7%89%9B%E8%82%89/sznr12.jpg",
        "path": "assets/dishes/howtocook/cn-017/12.jpg",
        "alt": "水煮牛肉-预览图-12",
        "pageOrder": 12,
        "adjacentText": " 将牛肉片一片一片的放进红汤中，煮熟以后捞出。\n\n![水煮牛肉-预览图-9](./sznr9.jpg)\n\n9. 将牛肉铺在豆芽上，撒上香菜梗。\n\n![水煮牛肉-预览图-10](./sznr10.jpg)\n\n10. 撒上香菜叶，辣椒粉，辣椒圈。\n\n![水煮牛肉-预览图-11](./sznr11.jpg)\n\n11. 另起锅烧热油，将热油淋在菜上面，就完成了。\n\n![水煮牛肉-预览图-12](./sznr12.jpg)\n\n## 附加内容\n\n- 参考: [水煮牛肉的详细步骤](https://www.zhms.cn/recipe/blrqm.html?source=2)\n\n如果您遵循本指南的制作流程而发现有问题或可以改进的流程，请提出 Issue 或 Pull request 。\n"
      }
    ]
  },
  "sourceLimitations": [
    "本用量为原文一份，够2人食用。",
    "原文整体制作约需四十分钟，记录总用时40分钟为约值。",
    "步骤使用食用油及开水，但原文未量化其用量，也未给出火力、油温、焯豆芽和煮牛肉的具体时长，不作补造。",
    "原文先撒香菜梗、后撒香菜叶，未另行描述切蒜片和辣椒圈，按原文操作顺序及措辞保留。"
  ]
}),
  c("酸菜鱼", "Fish with Pickled Mustard Greens", "川渝", "黑鱼片400克；酸菜250克；泡椒20克；姜蒜各15克；高汤700毫升；蛋清半个；淀粉10克；花椒和干辣椒适量", "1）鱼片加盐、蛋清和淀粉上浆，鱼骨煎香。2）炒香酸菜、泡椒和姜蒜，加高汤及鱼骨煮10分钟。3）捞出底料，滑入鱼片至变白，倒碗后以辣椒花椒热油激香。", "28-suancai-yu.png"),
  c("东坡肉", "Dongpo Pork", "浙菜", "方块五花肉800克；绍兴酒250毫升；生抽60毫升；老抽15毫升；冰糖50克；葱100克；姜40克", "1）五花肉焯水，切大方块并扎绳定形。2）砂锅垫葱姜，肉皮向下，加酒、酱油和冰糖。3）小火焖90分钟，翻面再焖30分钟，蒸20分钟更酥软。", "29-dongpo-rou.png"),
  c("白切鸡", "Cantonese Poached Chicken", "粤菜", "嫩鸡1只约1000克；姜40克；葱40克；盐10克；料酒20毫升；芝麻油10毫升；蘸料适量", "1）大锅水加姜葱烧至微沸，提鸡三浸三提。2）鸡完全浸入，保持微沸约25分钟，关火焖15分钟。3）立即冰镇，擦干抹芝麻油，斩件配姜葱蘸料。", "30-baiqie-ji.png"),
  c("口水鸡", "Sichuan Mouthwatering Chicken", "川菜", "食用油20毫升；鸡半只（500克）；辣椒粉20克；花椒30颗（20克，煮鸡和红油各用15颗）；花生10颗（30克）；小葱2颗（50克，煮鸡和红油各用1颗）；姜1小块（20克）；蒜2个（10克）；白糖5克；生抽5毫升；醋5毫升；味精5克；花椒粉5克；香菜5克；盐适量（原文未注明用量）；香油适量（原文未注明用量）；清水适量（没过鸡肉，原文未注明定量）；冰水适量（原文未注明用量）", "1）姜切片，1 颗小葱，15 颗花椒备用。2）鸡肉洗干净，放入锅中，清水没过鸡肉，放入姜片、小葱和花椒，开大火烧开。3）大火烧开后，转中小火 20 分钟关火。4）取出鸡肉，放入冰水中，直至冰凉。5）取出鸡肉，切块摆在盘子中，备用。6）小火把锅烧热，倒入花生，烘烤至表皮爆裂（注意随时翻动，不要糊了）。7）一颗葱切成段，蒜拍成末，花椒 15 颗，花生去皮切碎。8）锅内倒入油烧热后，放入葱段，花椒和一半蒜末，炒香。9）炒至油温 8 成热，关火，滤出热油。10）将热油倒入放辣椒粉的碗中，搅拌，并滤出红油。11）红油中放入剩余蒜末、生抽、醋、盐、味精、糖、香油、花椒粉。拌匀放凉。12）在鸡肉上撒上花生碎，把红油淋到切好的鸡肉上，撒上香菜。成盘。", "31-koushui-ji.png", "https://github.com/Anduin2017/HowToCook/blob/a2d45c6984dff9ee941da0e7c452f7965965d962/dishes/meat_dish/%E5%8F%A3%E6%B0%B4%E9%B8%A1/%E5%8F%A3%E6%B0%B4%E9%B8%A1.md", null, { totalMinutes: 90 }, null, {
  "howtocook": {
    "commit": "a2d45c6984dff9ee941da0e7c452f7965965d962",
    "path": "dishes/meat_dish/口水鸡/口水鸡.md",
    "sha256": "331e18f5de20a5091df167ea9b85d5a00a32216789e62780909b1b74fdc6c701",
    "rawMarkdown": "# 口水鸡的做法\n\n![口水鸡](./口水鸡.jpg)\n\n口水鸡是一道经典的四川凉菜，红油包裹的鸡肉冰爽 Q 弹、麻辣鲜香，夏季食用开胃解腻。鸡肉富含优质蛋白，搭配花生碎和香料，提供能量与风味。制作难度中等，需注意煮鸡火候和红油调味，适合有一定下厨经验的烹饪者。从备料、煮鸡、冷却到淋汁完成，预计耗时约 1.5 小时。\n\n预估烹饪难度：★★★\n\n预估卡路里：1392 大卡\n\n## 必备原料和工具\n\n- 半只鸡\n- 辣椒粉\n- 花椒\n- 花生\n- 葱姜蒜\n- 花椒\n- 白糖\n- 生抽\n- 醋\n- 味精\n\n## 计算\n\n每份：\n\n- 食用油   20ml\n- 鸡     半只(500g)\n- 辣椒粉   20g\n- 花椒     30 颗(20g)\n- 花生     10 颗(30g)\n- 小葱     2 颗(50g)\n- 姜       1 小块(20g)\n- 蒜       2 个 (10g)\n- 白糖     5g\n- 生抽     5ml\n- 醋       5ml\n- 味精     5g\n- 花椒粉   5g\n- 香菜     5g\n\n## 操作\n\n1. 姜切片，1 颗小葱，15 颗花椒备用\n2. 鸡肉洗干净，放入锅中，清水没过鸡肉，放入姜片、小葱和花椒，开大火烧开。\n3. 大火烧开后，转中小火 20 分钟关火\n4. 取出鸡肉，放入冰水中，直至冰凉\n5. 取出鸡肉，切块摆盘子中，备用\n6. 小火把锅烧热，导入花生，烘烤至表皮爆裂。（注意随时翻动，不要糊了）\n7. 一颗葱切成段，蒜拍成末，花椒 15 颗，花生去皮切碎。\n8. 锅内导入油烧热后，放入葱段，花椒和一半蒜末，炒香\n9. 炒至油温 8 成热，关火，滤出热油\n10. 将热油倒入放辣椒粉的碗中，搅拌，并滤出红油\n11. 红油中放入剩余蒜末、生抽、醋、盐、味精、糖、香油、花椒粉。拌匀放凉\n12. 在鸡肉上撒上花生碎，把红油淋到切好的鸡肉上，撒上香菜。成盘\n\n## 附加内容\n\n- 口水鸡第二种做法待更\n- 如果您遵循本指南的制作流程而发现有问题或可以改进的流程，请提出 Issue 或 Pull request 。\n\n如果您遵循本指南的制作流程而发现有问题或可以改进的流程，请提出 Issue 或 Pull request 。\n",
    "sections": [
      {
        "title": "口水鸡的做法",
        "markdown": "\n![口水鸡](./口水鸡.jpg)\n\n口水鸡是一道经典的四川凉菜，红油包裹的鸡肉冰爽 Q 弹、麻辣鲜香，夏季食用开胃解腻。鸡肉富含优质蛋白，搭配花生碎和香料，提供能量与风味。制作难度中等，需注意煮鸡火候和红油调味，适合有一定下厨经验的烹饪者。从备料、煮鸡、冷却到淋汁完成，预计耗时约 1.5 小时。\n\n预估烹饪难度：★★★\n\n预估卡路里：1392 大卡\n\n",
        "level": 1
      },
      {
        "title": "必备原料和工具",
        "markdown": "\n- 半只鸡\n- 辣椒粉\n- 花椒\n- 花生\n- 葱姜蒜\n- 花椒\n- 白糖\n- 生抽\n- 醋\n- 味精\n\n",
        "level": 2
      },
      {
        "title": "计算",
        "markdown": "\n每份：\n\n- 食用油   20ml\n- 鸡     半只(500g)\n- 辣椒粉   20g\n- 花椒     30 颗(20g)\n- 花生     10 颗(30g)\n- 小葱     2 颗(50g)\n- 姜       1 小块(20g)\n- 蒜       2 个 (10g)\n- 白糖     5g\n- 生抽     5ml\n- 醋       5ml\n- 味精     5g\n- 花椒粉   5g\n- 香菜     5g\n\n",
        "level": 2
      },
      {
        "title": "操作",
        "markdown": "\n1. 姜切片，1 颗小葱，15 颗花椒备用\n2. 鸡肉洗干净，放入锅中，清水没过鸡肉，放入姜片、小葱和花椒，开大火烧开。\n3. 大火烧开后，转中小火 20 分钟关火\n4. 取出鸡肉，放入冰水中，直至冰凉\n5. 取出鸡肉，切块摆盘子中，备用\n6. 小火把锅烧热，导入花生，烘烤至表皮爆裂。（注意随时翻动，不要糊了）\n7. 一颗葱切成段，蒜拍成末，花椒 15 颗，花生去皮切碎。\n8. 锅内导入油烧热后，放入葱段，花椒和一半蒜末，炒香\n9. 炒至油温 8 成热，关火，滤出热油\n10. 将热油倒入放辣椒粉的碗中，搅拌，并滤出红油\n11. 红油中放入剩余蒜末、生抽、醋、盐、味精、糖、香油、花椒粉。拌匀放凉\n12. 在鸡肉上撒上花生碎，把红油淋到切好的鸡肉上，撒上香菜。成盘\n\n",
        "level": 2
      },
      {
        "title": "附加内容",
        "markdown": "\n- 口水鸡第二种做法待更\n- 如果您遵循本指南的制作流程而发现有问题或可以改进的流程，请提出 Issue 或 Pull request 。\n\n如果您遵循本指南的制作流程而发现有问题或可以改进的流程，请提出 Issue 或 Pull request 。\n",
        "level": 2
      }
    ],
    "images": [
      {
        "originalReference": "./口水鸡.jpg",
        "originalUrl": "https://raw.githubusercontent.com/Anduin2017/HowToCook/a2d45c6984dff9ee941da0e7c452f7965965d962/dishes/meat_dish/%E5%8F%A3%E6%B0%B4%E9%B8%A1/%E5%8F%A3%E6%B0%B4%E9%B8%A1.jpg",
        "path": "assets/dishes/howtocook/cn-021/1.jpg",
        "alt": "口水鸡",
        "pageOrder": 1,
        "adjacentText": "# 口水鸡的做法\n\n![口水鸡](./口水鸡.jpg)\n\n口水鸡是一道经典的四川凉菜，红油包裹的鸡肉冰爽 Q 弹、麻辣鲜香，夏季食用开胃解腻。鸡肉富含优质蛋白，搭配花生碎和香料，提供能量与风味。制作难度中等，需注意煮鸡火候和红油调味，适合有一定下厨经验的烹饪者。从备料、煮鸡、冷却到淋汁完成，预计耗时约 1.5 小时。\n\n预估烹饪难度：★★★\n\n预估卡路里：1392 大卡\n\n## 必备原料和工具\n\n- 半只鸡\n-"
      }
    ]
  },
  "sourceLimitations": [
    "原文预计耗时约1.5小时，总用时90分钟为约值；每份未注明供几人食用，不推测人数。",
    "花椒30颗（20克）、花生10颗（30克）、小葱2颗（50克）等计数与重量并列按原文保留，未校改或自行换算。",
    "盐、香油、清水和冰水仅在操作中出现，未给出定量；清水依原文须没过鸡肉。",
    "原文油温8成热未说明温度数值，冷却时长未注明，不补充温度、时长或其他安全参数。",
    "规范操作中的导入改为倒入，完整原文保留原措辞及重复的附加说明。"
  ]
}),
  c("北京烤鸭", "Peking Duck", "京菜", "净鸭1只约1800克；麦芽糖30克；白醋15毫升；开水适量；荷叶饼20张；葱丝、黄瓜和甜面酱适量", "1）鸭皮淋开水收紧，刷麦芽糖醋水，通风冷藏风干一夜。2）烤箱200℃烤约60分钟，中途翻面，至皮脆肉熟。3）片鸭皮肉，配荷叶饼、葱丝、黄瓜和甜面酱。", "32-beijing-kaoya.png", CN_HOME),
  c("小鸡炖蘑菇", "Chicken Stew with Mushrooms", "东北菜", "鸡块700克；干榛蘑80克；粉条100克；葱姜适量；生抽25毫升；料酒20毫升；八角1个；盐适量", "1）榛蘑和粉条分别泡发，鸡块焯水。2）炒香葱姜八角，下鸡块、生抽和料酒翻炒。3）加热水与蘑菇炖40分钟，下粉条再煮10分钟调盐。", "33-xiaoji-dun-mogu.png"),
  c("锅包肉", "Northeastern Sweet-and-sour Pork", "东北菜", "里脊肉750克（原文一斤半）；黄瓜半根；糖4勺；酱油2勺；桂花醋2勺；葱花适量；姜适量；淀粉适量（裹粉、挂糊与收汁时分次使用，各部分用量未注明）；鸡蛋1个；水适量（泡肉用量未注明，调湿淀粉用少量）；料酒适量（腌肉用，原文未注明用量）；盐适量（腌肉用少许，调汁用量未注明）；食用油1勺（调挂糊用湿淀粉），另备适量炸肉用油，炒制时锅中留少许底油", "1）将750克里脊肉切成薄薄的小片，放入水中浸泡，去除血腥味。2）捞出肉片，控水。3）肉片中加入适量料酒，去腥腌制。4）在上述同一次腌制中加入少许盐，与上一步的料酒一起腌制肉片。5）腌制过程中准备裹粉用的干淀粉。6）将每片肉展开，沾上干淀粉。7）将裹粉的肉片放在一旁。另取适量淀粉，加入少量水和1勺食用油，搅匀成挂糊用的湿淀粉。8）把挂糊用的湿淀粉和1个鸡蛋加入肉片，用手抓匀，不用筷子搅拌。9）锅中加入炸肉用的食用油并加热，将肉片逐片展开下锅，炸至金黄后捞出控油。10）将肉片再炸一次，肉片共炸两次。随后将半根黄瓜切片备用。11）将2勺酱油、4勺糖、2勺桂花醋、适量葱花、姜和盐放在一起，调匀成酱汁。12）锅中留少许底油，将剩余的油倒出。加热底油，油热后倒入酱汁。13）酱汁起泡时，立即放入炸好的肉片，开始翻炒。14）翻炒至酱汁使肉片上色，加入黄瓜片。15）翻炒均匀后，倒入收汁用的湿淀粉，其用量原文未注明。16）收汁后盛出。", "34-guobaorou.png", "https://www.douguo.com/cookbook/1111868.html", {
    sourceName: "豆果美食",
    recipePageUrl: "https://www.douguo.com/cookbook/1111868.html",
    mediaPageUrl: "https://www.douguo.com/cookbook/1111868.html",
    author: "大鹤子",
    rightsNotice: "©本菜谱的做法由 大鹤子 编写，未经授权不得转载",
    reuseLicense: null,
    repositoryCopyAuthorization: "user_confirmed_2026-09-16",
    hero: {
      path: "assets/dishes/sources/cn-024-guo-bao-rou/hero.jpg",
      originalUrl: "https://cp1.douguo.com/upload/caiku/5/1/d/800_51d40f71bf739ac9178900712744e42d.jpg",
      sha256: "126dec6a968385a080dbe47067f87a0461370d86c6928131a647956bbc868a2c",
      httpStatus: 200,
      contentType: "image/jpeg"
    },
    steps: [
      { stepOrder: 1, path: "assets/dishes/sources/cn-024-guo-bao-rou/step-1.jpg", originalUrl: "https://cp1.douguo.com/upload/caiku/5/0/d/800_507390088b2482718c7f495c200fbffd.jpg", sha256: "f6758bec9b4e76ef9ecbb1874cb880a0b07a73a1a5f6e8e3e2a26bfb950d8042", httpStatus: 200, contentType: "image/jpeg" },
      { stepOrder: 2, path: "assets/dishes/sources/cn-024-guo-bao-rou/step-2.jpg", originalUrl: "https://cp1.douguo.com/upload/caiku/d/f/a/800_df11cdd685e8463f16055bf59e37296a.jpg", sha256: "e7347e3b4c64d5f2d70793ae903be5bdd867020a1a387ee373263263291f09b9", httpStatus: 200, contentType: "image/jpeg" },
      { stepOrder: 3, path: "assets/dishes/sources/cn-024-guo-bao-rou/step-3.jpg", originalUrl: "https://cp1.douguo.com/upload/caiku/a/5/5/800_a5d4b15a22a4df00c5f0795045421875.jpg", sha256: "278468d1a03fdb81a71b054ddfd00e399c18add4c914cac2314f4fb1e6a07f78", httpStatus: 200, contentType: "image/jpeg" },
      { stepOrder: 4, path: "assets/dishes/sources/cn-024-guo-bao-rou/step-4.jpg", originalUrl: "https://cp1.douguo.com/upload/caiku/7/3/7/800_73b990cecd994e681e042f790beb67b7.jpg", sha256: "09e588f3bbe17e9d1852b4dad2bb8fdd25695100bec0619c57bb0ff0a21083a5", httpStatus: 200, contentType: "image/jpeg" },
      { stepOrder: 5, path: "assets/dishes/sources/cn-024-guo-bao-rou/step-5.jpg", originalUrl: "https://cp1.douguo.com/upload/caiku/f/d/1/800_fdba01bf9b8f827135117f0d397506d1.jpg", sha256: "dd0cf734a00b5c15cea9e52130a0391c91632d1cb4d14fa71a98dfd814f5b755", httpStatus: 200, contentType: "image/jpeg" },
      { stepOrder: 6, path: "assets/dishes/sources/cn-024-guo-bao-rou/step-6.jpg", originalUrl: "https://cp1.douguo.com/upload/caiku/e/3/6/800_e39c6b971f6c2ec74c4e909850167666.jpg", sha256: "b4646a5bfa918788d901441d88c1c978938a43ba0a64e077b655dc7a7c50bcd4", httpStatus: 200, contentType: "image/jpeg" },
      { stepOrder: 7, path: "assets/dishes/sources/cn-024-guo-bao-rou/step-7.jpg", originalUrl: "https://cp1.douguo.com/upload/caiku/b/c/d/800_bc174da8b1f0a7da3ca304c99479598d.jpg", sha256: "0cae2962e0f1c4a4ddb2a2882a13ff203ad4c1304ce231e34806da1704d5dfa6", httpStatus: 200, contentType: "image/jpeg" },
      { stepOrder: 8, path: "assets/dishes/sources/cn-024-guo-bao-rou/step-8.jpg", originalUrl: "https://cp1.douguo.com/upload/caiku/c/a/2/800_ca1ad6420e75dd4f76f39a26d323a2b2.jpg", sha256: "0713f503ed153c73e4b870e98633db48143804400ac55f068d316ce7d6cdcd46", httpStatus: 200, contentType: "image/jpeg" },
      { stepOrder: 9, path: "assets/dishes/sources/cn-024-guo-bao-rou/step-9.jpg", originalUrl: "https://cp1.douguo.com/upload/caiku/5/3/d/800_53530322c45e0f688b1a92d902d1e0fd.jpg", sha256: "853cf135cf18486f4cc3dfe19bb58ca4db3e93c65eec0cc14119536b4a298aaa", httpStatus: 200, contentType: "image/jpeg" },
      { stepOrder: 10, path: "assets/dishes/sources/cn-024-guo-bao-rou/step-10.jpg", originalUrl: "https://cp1.douguo.com/upload/caiku/3/c/d/800_3c2d0cfebb09ccbd0b4df29f2aeb41fd.jpg", sha256: "78e6668c8fb8cffbb461bf06a8583624ad5378cb6bdfe14ca26772e78c77cd50", httpStatus: 200, contentType: "image/jpeg" },
      { stepOrder: 11, path: "assets/dishes/sources/cn-024-guo-bao-rou/step-11.jpg", originalUrl: "https://cp1.douguo.com/upload/caiku/9/9/0/800_997b576b175b235545a4dd39ed1b8890.jpg", sha256: "0f46e3b2a19364d7893247d26648c8ac065831f21e9948a8b1cf15721203facb", httpStatus: 200, contentType: "image/jpeg" },
      { stepOrder: 12, path: "assets/dishes/sources/cn-024-guo-bao-rou/step-12.jpg", originalUrl: "https://cp1.douguo.com/upload/caiku/3/a/b/800_3a7f596e1f0f99c4a10f91693d8e4f2b.jpg", sha256: "f3caacbd4d5895c3c5e3da010183bf1a153f1426167fc599979c8cdebbc2a536", httpStatus: 200, contentType: "image/jpeg" },
      { stepOrder: 13, path: "assets/dishes/sources/cn-024-guo-bao-rou/step-13.jpg", originalUrl: "https://cp1.douguo.com/upload/caiku/9/0/8/800_9012630f855c9f7a577f941db6f529c8.jpg", sha256: "b44cb72d0da7c20304ce0a0aac04de0319f1f621fbc3eb2146665550654564a3", httpStatus: 200, contentType: "image/jpeg" },
      { stepOrder: 14, path: "assets/dishes/sources/cn-024-guo-bao-rou/step-14.jpg", originalUrl: "https://cp1.douguo.com/upload/caiku/5/f/0/800_5faceab6e9847e3f0887753e21cea0c0.jpg", sha256: "8d6134531d51e80c009d2824420f012dcae3ac1361fde8c7a7c6b1b299f1e19d", httpStatus: 200, contentType: "image/jpeg" },
      { stepOrder: 15, path: "assets/dishes/sources/cn-024-guo-bao-rou/step-15.jpg", originalUrl: "https://cp1.douguo.com/upload/caiku/7/1/b/800_71afd1fd42f19f7a5e7c31bb07192efb.jpg", sha256: "2174949a27ff06fb175e9132c199a795d6a706e7b5579dcc4ed562a8a51dffeb", httpStatus: 200, contentType: "image/jpeg" }
    ]
  }),
  c("西湖醋鱼", "West Lake Vinegar Fish", "浙菜", "草鱼1条约700克；姜末15克；香醋60毫升；白糖40克；酱油20毫升；料酒15毫升；淀粉10克", "1）鱼从背部剖开，沸水加料酒，鱼皮向上小火汆熟。2）鱼盛盘保温。3）原汤加酱油、糖、醋和姜末煮开，薄芡后浇鱼。", "35-xihu-cuyu.png", CN_HOME),
  c("龙井虾仁", "Dragon Well Tea Shrimp", "浙菜", "虾仁350克；龙井茶5克；蛋清半个；淀粉8克；料酒10毫升；盐3克；食用油适量", "1）龙井用80℃水泡开，留茶汤和部分茶叶。2）虾仁以盐、蛋清和淀粉上浆，低温滑油至变色。3）锅留少油，下虾仁、茶汤和茶叶快速翻炒。", "36-longjing-xiaren.png", CN_HOME),
  c("蒜蓉粉丝蒸扇贝", "Steamed Scallops with Garlic Vermicelli", "粤菜", "扇贝10个；龙口粉丝1小把；大蒜7瓣；味极鲜酱油15克；蚝油15克；盐适量（抓洗扇贝肉和调料汁用，分次使用，原页未区分用量）；鸡精适量；白糖适量；小米辣2个；小葱1根；食用油20克；水适量（泡粉丝、清洗和蒸制用，原页未注明用量）", "1）准备扇贝、龙口粉丝、大蒜、味极鲜酱油、蚝油、盐、鸡精、白糖、小米辣、小葱、食用油和水。2）龙口粉丝用温水泡软，备用。3）大蒜切末，小米辣和小葱切圈，备用。4）用刷子将扇贝刷洗干净。5）用小刀将扇贝肉与壳分离。6）扇贝肉去掉裙边和泥肠等，用清水冲洗干净，再用盐抓洗干净。7）将扇贝壳也刷洗干净。8）将泡软的粉丝捞出、沥水，用手卷一下，放入扇贝壳中。9）将扇贝肉放在粉丝上。10）将15克味极鲜酱油、15克蚝油与适量盐、鸡精、白糖放入碗中，搅拌均匀成料汁，尝一下味道，按个人喜好调整咸淡。11）锅中加入20克食用油，烧热后放入蒜末，炒出香味并炒至金黄。12）倒入调好的料汁。13）用大火煮开，至汤汁浓郁。14）将制作好的汤汁浇在扇贝肉上。15）撒上小米辣圈。16）蒸锅中加水，将扇贝放入蒸锅，隔水加盖，用大火蒸5–8分钟。17）出锅后撒上适量小葱圈。", "37-suanrong-fensi-zheng-shanbei.png", "https://www.douguo.com/cookbook/2292246.html", {
    "recipePageUrl": "https://www.douguo.com/cookbook/2292246.html",
    "mediaPageUrl": "https://www.douguo.com/cookbook/2292246.html",
    "sourceName": "豆果美食",
    "author": "沙小囡",
    "rightsNotice": "©本菜谱的做法由 沙小囡 编写，未经授权不得转载",
    "reuseLicense": null,
    "repositoryCopyAuthorized": true,
    "hero": {
      "originalUrl": "https://cp1.douguo.com/upload/caiku/3/e/b/960_3e0f481aebc6ee996e0e14693b8bb89b.jpg",
      "adjacentText": "蒜蓉粉丝蒸扇贝",
      "pageOrder": 1,
      "httpStatus": 200,
      "contentType": "image/jpeg",
      "recipePageUrl": "https://www.douguo.com/cookbook/2292246.html",
      "mediaPageUrl": "https://www.douguo.com/cookbook/2292246.html",
      "visualVerified": true,
      "sha256": "748e0290aba760f3955dc1bed7def54874b40565c37104a8cf7f51581d308d0d",
      "path": "assets/dishes/sources/cn-027-scallop-vermicelli/hero.jpg"
    },
    "steps": [
      {
        "stepOrder": 1,
        "sourceStepOrder": 1,
        "pageOrder": 2,
        "originalUrl": "https://cp1.douguo.com/upload/caiku/5/b/1/800_5b42634ec2b58bedd425a73b36158f01.jpg",
        "adjacentText": "准备食材。",
        "httpStatus": 200,
        "contentType": "image/jpeg",
        "recipePageUrl": "https://www.douguo.com/cookbook/2292246.html",
        "mediaPageUrl": "https://www.douguo.com/cookbook/2292246.html",
        "visualVerified": true,
        "sha256": "42b0c0df1df1fce27589353eaba31316e91e570cace68c9143899d4338ce9773",
        "path": "assets/dishes/sources/cn-027-scallop-vermicelli/step-1.jpg"
      },
      {
        "stepOrder": 2,
        "sourceStepOrder": 2,
        "pageOrder": 3,
        "originalUrl": "https://cp1.douguo.com/upload/caiku/1/f/c/800_1fd6c4e362e4474a540d6db72a26e5ec.jpg",
        "adjacentText": "粉丝用温水泡软备用。",
        "httpStatus": 200,
        "contentType": "image/jpeg",
        "recipePageUrl": "https://www.douguo.com/cookbook/2292246.html",
        "mediaPageUrl": "https://www.douguo.com/cookbook/2292246.html",
        "visualVerified": true,
        "sha256": "79adc4ca0eaf2aa7f9fa1546e5d36895a23b88b9d844e0b753c5cf9b386fe1ab",
        "path": "assets/dishes/sources/cn-027-scallop-vermicelli/step-2.jpg"
      },
      {
        "stepOrder": 3,
        "sourceStepOrder": 3,
        "pageOrder": 4,
        "originalUrl": "https://cp1.douguo.com/upload/caiku/5/a/b/800_5a973960d12202bda6b4932644136c6b.jpg",
        "adjacentText": "蒜切末，小米辣和小葱切圈备用。",
        "httpStatus": 200,
        "contentType": "image/jpeg",
        "recipePageUrl": "https://www.douguo.com/cookbook/2292246.html",
        "mediaPageUrl": "https://www.douguo.com/cookbook/2292246.html",
        "visualVerified": true,
        "sha256": "efeef850c28f8f14d5014b9bb25e93ce35980de39486084e36868dce5bddcc98",
        "path": "assets/dishes/sources/cn-027-scallop-vermicelli/step-3.jpg"
      },
      {
        "stepOrder": 4,
        "sourceStepOrder": 4,
        "pageOrder": 5,
        "originalUrl": "https://cp1.douguo.com/upload/caiku/4/0/c/800_40560493df4d1e45ec5af17fd289756c.jpg",
        "adjacentText": "扇贝用刷子刷净。",
        "httpStatus": 200,
        "contentType": "image/jpeg",
        "recipePageUrl": "https://www.douguo.com/cookbook/2292246.html",
        "mediaPageUrl": "https://www.douguo.com/cookbook/2292246.html",
        "visualVerified": true,
        "sha256": "ed1fe4e119d435f25a1c14c36c34f04576f3f5a879d8ac3a7f17db3384581b14",
        "path": "assets/dishes/sources/cn-027-scallop-vermicelli/step-4.jpg"
      },
      {
        "stepOrder": 5,
        "sourceStepOrder": 5,
        "pageOrder": 6,
        "originalUrl": "https://cp1.douguo.com/upload/caiku/8/2/3/800_8275d80c827ca01170a12ac3589a67d3.jpg",
        "adjacentText": "再用小刀将扇贝肉与壳分离。",
        "httpStatus": 200,
        "contentType": "image/jpeg",
        "recipePageUrl": "https://www.douguo.com/cookbook/2292246.html",
        "mediaPageUrl": "https://www.douguo.com/cookbook/2292246.html",
        "visualVerified": true,
        "sha256": "aacb10bb28053b8b28b805e6ca2e3eac637fd06d163ccaa15dc7d1b7fffb96af",
        "path": "assets/dishes/sources/cn-027-scallop-vermicelli/step-5.jpg"
      },
      {
        "stepOrder": 6,
        "sourceStepOrder": 6,
        "pageOrder": 7,
        "originalUrl": "https://cp1.douguo.com/upload/caiku/9/5/2/800_95e393f499167a620755a68737bc7212.jpg",
        "adjacentText": "扇贝肉去裙边和泥肠等，过清水冲洗净，在用盐抓洗干净。",
        "httpStatus": 200,
        "contentType": "image/jpeg",
        "recipePageUrl": "https://www.douguo.com/cookbook/2292246.html",
        "mediaPageUrl": "https://www.douguo.com/cookbook/2292246.html",
        "visualVerified": true,
        "sha256": "df6cb95aaa5c8fc7eb801180e35a5bf175519efbc794f87daed6ebedad0a28b1",
        "path": "assets/dishes/sources/cn-027-scallop-vermicelli/step-6.jpg"
      },
      {
        "stepOrder": 7,
        "sourceStepOrder": 7,
        "pageOrder": 8,
        "originalUrl": "https://cp1.douguo.com/upload/caiku/3/f/f/800_3f843bf0383865ea677990bcfd2d01bf.jpg",
        "adjacentText": "扇贝壳也要刷洗干净。",
        "httpStatus": 200,
        "contentType": "image/jpeg",
        "recipePageUrl": "https://www.douguo.com/cookbook/2292246.html",
        "mediaPageUrl": "https://www.douguo.com/cookbook/2292246.html",
        "visualVerified": true,
        "sha256": "85528a5588fc20316c66c6cb371e576577dc3a015c8a9e8ce903e65caa4dbeab",
        "path": "assets/dishes/sources/cn-027-scallop-vermicelli/step-7.jpg"
      },
      {
        "stepOrder": 8,
        "sourceStepOrder": 8,
        "pageOrder": 9,
        "originalUrl": "https://cp1.douguo.com/upload/caiku/4/a/4/800_4a32f3e821daf15e1a46f67c1fb37ae4.jpg",
        "adjacentText": "粉丝沥水捞出，用手卷一下放入扇贝壳中这样不会横七竖八的影响美观。",
        "httpStatus": 200,
        "contentType": "image/jpeg",
        "recipePageUrl": "https://www.douguo.com/cookbook/2292246.html",
        "mediaPageUrl": "https://www.douguo.com/cookbook/2292246.html",
        "visualVerified": true,
        "sha256": "2932446675c1e6715ecbf1b0b1e4866646e1e9f02870077ea70e5ed14340d823",
        "path": "assets/dishes/sources/cn-027-scallop-vermicelli/step-8.jpg"
      },
      {
        "stepOrder": 9,
        "sourceStepOrder": 9,
        "pageOrder": 10,
        "originalUrl": "https://cp1.douguo.com/upload/caiku/f/d/b/800_fd5ddaf377b10be5c0da7bfbc64e1c5b.jpg",
        "adjacentText": "放上扇贝肉。",
        "httpStatus": 200,
        "contentType": "image/jpeg",
        "recipePageUrl": "https://www.douguo.com/cookbook/2292246.html",
        "mediaPageUrl": "https://www.douguo.com/cookbook/2292246.html",
        "visualVerified": true,
        "sha256": "eadd05cf7b3fe742dda1f565f4ca39d2ec75114bf34b311b65861f4efde88b99",
        "path": "assets/dishes/sources/cn-027-scallop-vermicelli/step-9.jpg"
      },
      {
        "stepOrder": 10,
        "sourceStepOrder": 10,
        "pageOrder": 11,
        "originalUrl": "https://cp1.douguo.com/upload/caiku/9/d/2/800_9dd754894676a29c8f3c193f73ab1b02.jpg",
        "adjacentText": "用味极鲜酱油，蚝油，盐，鸡精，白糖调一碗料汁，搅拌均匀，自己尝一下口味，咸淡根据个人喜好调整就行。",
        "httpStatus": 200,
        "contentType": "image/jpeg",
        "recipePageUrl": "https://www.douguo.com/cookbook/2292246.html",
        "mediaPageUrl": "https://www.douguo.com/cookbook/2292246.html",
        "visualVerified": true,
        "sha256": "dcc7d215cce58d1dc246a246c6d59b947f547423ba32b6c8a6904362f623e406",
        "path": "assets/dishes/sources/cn-027-scallop-vermicelli/step-10.jpg"
      },
      {
        "stepOrder": 11,
        "sourceStepOrder": 11,
        "pageOrder": 12,
        "originalUrl": "https://cp1.douguo.com/upload/caiku/d/9/d/800_d9a6d1a53b3f0dff93726b08a70d283d.jpg",
        "adjacentText": "锅里放点油烧热，将蒜末下锅爆出香味炒至金黄。",
        "httpStatus": 200,
        "contentType": "image/jpeg",
        "recipePageUrl": "https://www.douguo.com/cookbook/2292246.html",
        "mediaPageUrl": "https://www.douguo.com/cookbook/2292246.html",
        "visualVerified": true,
        "sha256": "dfb32ef6fa39a35409d5ab6d6e8062dee266a46bcd00e0144455b06c4be5bd92",
        "path": "assets/dishes/sources/cn-027-scallop-vermicelli/step-11.jpg"
      },
      {
        "stepOrder": 12,
        "sourceStepOrder": 12,
        "pageOrder": 13,
        "originalUrl": "https://cp1.douguo.com/upload/caiku/1/5/3/800_15f8e56ee80fa4205ecc090eb9fb1383.jpg",
        "adjacentText": "倒入调好的料汁。",
        "httpStatus": 200,
        "contentType": "image/jpeg",
        "recipePageUrl": "https://www.douguo.com/cookbook/2292246.html",
        "mediaPageUrl": "https://www.douguo.com/cookbook/2292246.html",
        "visualVerified": true,
        "sha256": "f9cb4b63d26bcf82dcf5d2de12d209bdbdf617830ce385281e0a8e9dc93bc0ec",
        "path": "assets/dishes/sources/cn-027-scallop-vermicelli/step-12.jpg"
      },
      {
        "stepOrder": 13,
        "sourceStepOrder": 13,
        "pageOrder": 14,
        "originalUrl": "https://cp1.douguo.com/upload/caiku/c/7/6/800_c77d4031b8d7f4a7a2581888ce3296e6.jpg",
        "adjacentText": "大火煮开至汤汁浓郁。",
        "httpStatus": 200,
        "contentType": "image/jpeg",
        "recipePageUrl": "https://www.douguo.com/cookbook/2292246.html",
        "mediaPageUrl": "https://www.douguo.com/cookbook/2292246.html",
        "visualVerified": true,
        "sha256": "28e6becb110f1e9c5007eec82dbd11a54d9c6b542fc5b1c3733c39e6e5d20619",
        "path": "assets/dishes/sources/cn-027-scallop-vermicelli/step-13.jpg"
      },
      {
        "stepOrder": 14,
        "sourceStepOrder": 14,
        "pageOrder": 15,
        "originalUrl": "https://cp1.douguo.com/upload/caiku/a/5/3/800_a5becd603f0b15b6c8c0aa93fc885663.jpg",
        "adjacentText": "在扇贝肉上浇上制作好的汤汁。",
        "httpStatus": 200,
        "contentType": "image/jpeg",
        "recipePageUrl": "https://www.douguo.com/cookbook/2292246.html",
        "mediaPageUrl": "https://www.douguo.com/cookbook/2292246.html",
        "visualVerified": true,
        "sha256": "fcb3f5454520aa2a81029265341cab573be32f7457cf77a718d0cb0eb74ca6f1",
        "path": "assets/dishes/sources/cn-027-scallop-vermicelli/step-14.jpg"
      },
      {
        "stepOrder": 15,
        "sourceStepOrder": 15,
        "pageOrder": 16,
        "originalUrl": "https://cp1.douguo.com/upload/caiku/3/e/8/800_3e7b7e8172c30afe7d71c2dcf1697d68.jpg",
        "adjacentText": "撒上小米辣圈。",
        "httpStatus": 200,
        "contentType": "image/jpeg",
        "recipePageUrl": "https://www.douguo.com/cookbook/2292246.html",
        "mediaPageUrl": "https://www.douguo.com/cookbook/2292246.html",
        "visualVerified": true,
        "sha256": "7d54a44ee20d7168c7e407601c0fd89f25c76be01129f7cf4fbc9f4c9642c9e1",
        "path": "assets/dishes/sources/cn-027-scallop-vermicelli/step-15.jpg"
      },
      {
        "stepOrder": 16,
        "sourceStepOrder": 16,
        "pageOrder": 17,
        "originalUrl": "https://cp1.douguo.com/upload/caiku/7/2/7/800_7238b40457f088370515512d88692837.jpg",
        "adjacentText": "上锅隔水大火加盖蒸5-8分钟即可。",
        "httpStatus": 200,
        "contentType": "image/jpeg",
        "recipePageUrl": "https://www.douguo.com/cookbook/2292246.html",
        "mediaPageUrl": "https://www.douguo.com/cookbook/2292246.html",
        "visualVerified": true,
        "sha256": "af8df74ecd66b9780eb189cfe64252a3f22190589ea617d8cb675d8687983e30",
        "path": "assets/dishes/sources/cn-027-scallop-vermicelli/step-16.jpg"
      },
      {
        "stepOrder": 17,
        "sourceStepOrder": 17,
        "pageOrder": 18,
        "originalUrl": "https://cp1.douguo.com/upload/caiku/c/3/8/800_c3ae099a6d803013da9d58cefccd2a28.jpg",
        "adjacentText": "出锅撒适量葱花。",
        "httpStatus": 200,
        "contentType": "image/jpeg",
        "recipePageUrl": "https://www.douguo.com/cookbook/2292246.html",
        "mediaPageUrl": "https://www.douguo.com/cookbook/2292246.html",
        "visualVerified": true,
        "sha256": "4276b046d4841284d2e8813451a01268001f80267361a8e3858046cc866de7b4",
        "path": "assets/dishes/sources/cn-027-scallop-vermicelli/step-17.jpg"
      }
    ],
    "repositoryCopyAuthorization": "user_confirmed_2026-09-16"
  }),
  c("清炒虾仁", "Stir-fried Shrimp", "淮扬菜", "虾仁350克；黄瓜100克；蛋清半个；淀粉8克；盐3克；料酒10毫升；白胡椒少许", "1）虾仁用盐、蛋清和淀粉上浆，黄瓜切丁。2）温油滑熟虾仁盛出。3）原锅下黄瓜，回锅虾仁，加料酒、盐和白胡椒快速翻匀。", "38-qingchao-xiaren.png"),
  c("干煸四季豆", "Dry-fried Green Beans", "川菜", "四季豆400克；猪肉末50克；碎米芽菜15克；食用油适量；盐2克（分次使用，来源未注明两次的用量分配）；葱花5克；姜末10克；蒜末10克；干辣椒2个，去籽后斜切小段；鲜酱油8克；老抽5克；糖1勺；料酒5克；白胡椒粉1克；清洗用水（仅用于清洗四季豆，用量未注明）", "1）备齐猪肉末、葱花、姜末、蒜末、碎米芽菜及其余食材，将2个干辣椒去籽后斜切成小段。2）四季豆用清洗用水洗净后，摘去两头的老茎，掰成段。3）锅里倒入适量食用油，从总量2克的盐中取少许放入锅中，开中火。4）油热后倒入四季豆煸炒，其间可多次翻炒，并多次加盖焖一小会，以加快成熟。5）煎制时注意火候，避免煎糊。待四季豆两面起皱、略带微焦且煎熟后，盛出备用。四季豆一定要煎熟，否则食用后容易引起中毒。6）锅中留油，放入50克猪肉末。7）将肉末炒至变白，加入5克料酒、5克葱花、10克姜末、10克蒜末和干辣椒段，翻炒片刻。8）放入15克碎米芽菜，炒出香味。9）放入8克鲜酱油。10）放入5克老抽。11）放入1勺糖和1克白胡椒粉，翻炒片刻。12）倒入煎好的四季豆，将剩余的盐撒在四季豆上，翻炒均匀。13）出锅装盘。", "39-ganbian-sijidou.png", "https://www.douguo.com/cookbook/1228444.html", {
    "recipePageUrl": "https://www.douguo.com/cookbook/1228444.html",
    "mediaPageUrl": "https://www.douguo.com/cookbook/1228444.html",
    "sourceName": "豆果美食",
    "author": "i粗茶淡饭1",
    "rightsNotice": "©本菜谱的做法由 i粗茶淡饭1 编写，未经授权不得转载",
    "reuseLicense": null,
    "repositoryCopyAuthorized": true,
    "hero": {
      "originalUrl": "https://cp1.douguo.com/upload/caiku/d/1/e/960_d12823d95a67dad60b9abd54bd06c58e.jpg",
      "adjacentText": "干煸四季豆",
      "pageOrder": 1,
      "httpStatus": 200,
      "contentType": "image/jpeg",
      "visualVerified": true,
      "sha256": "05730ea8170f478019fc954567e52b727e90d9ff40ed3a0d0a171c683d071334",
      "recipePageUrl": "https://www.douguo.com/cookbook/1228444.html",
      "mediaPageUrl": "https://www.douguo.com/cookbook/1228444.html",
      "path": "assets/dishes/sources/cn-029-dry-fried-green-beans/hero.jpg"
    },
    "steps": [
      {
        "originalUrl": "https://cp1.douguo.com/upload/caiku/d/4/d/800_d46b10961291e8ed516cb237390d833d.jpg",
        "adjacentText": "准备好食材：猪肉末、葱花、姜末、蒜末、碎米芽菜和干辣椒去籽后斜切小段",
        "pageOrder": 2,
        "httpStatus": 200,
        "contentType": "image/jpeg",
        "visualVerified": true,
        "stepOrder": 1,
        "sourceStepOrder": 1,
        "sha256": "397d72203b8f1dfbfb272896ee701b2bedbb574b2729a5072bbe905116ea793c",
        "recipePageUrl": "https://www.douguo.com/cookbook/1228444.html",
        "mediaPageUrl": "https://www.douguo.com/cookbook/1228444.html",
        "path": "assets/dishes/sources/cn-029-dry-fried-green-beans/step-1.jpg"
      },
      {
        "originalUrl": "https://cp1.douguo.com/upload/caiku/1/3/e/800_1355da7e1d2822367c418ea6b9d3492e.jpg",
        "adjacentText": "四季豆洗净后摘去两头的老茎，掰成段",
        "pageOrder": 3,
        "httpStatus": 200,
        "contentType": "image/jpeg",
        "visualVerified": true,
        "stepOrder": 2,
        "sourceStepOrder": 2,
        "sha256": "e0cbdebf2af5e6e74b94f903b85f01039eb465e426f20b94a4e4f0aa769ef89d",
        "recipePageUrl": "https://www.douguo.com/cookbook/1228444.html",
        "mediaPageUrl": "https://www.douguo.com/cookbook/1228444.html",
        "path": "assets/dishes/sources/cn-029-dry-fried-green-beans/step-2.jpg"
      },
      {
        "originalUrl": "https://cp1.douguo.com/upload/caiku/b/4/b/800_b486cf1af758d506e76fe9a2e94cd50b.jpg",
        "adjacentText": "锅里倒油，放少许盐，开中火",
        "pageOrder": 4,
        "httpStatus": 200,
        "contentType": "image/jpeg",
        "visualVerified": true,
        "stepOrder": 3,
        "sourceStepOrder": 3,
        "sha256": "4fdb16f20e5a5deeab83c39fb0351b9574cb84a314a5c57ef4fdf7c84cae933c",
        "recipePageUrl": "https://www.douguo.com/cookbook/1228444.html",
        "mediaPageUrl": "https://www.douguo.com/cookbook/1228444.html",
        "path": "assets/dishes/sources/cn-029-dry-fried-green-beans/step-3.jpg"
      },
      {
        "originalUrl": "https://cp1.douguo.com/upload/caiku/7/5/5/800_7509dbfbae09ad5329b3f0e974776bc5.jpg",
        "adjacentText": "油热后倒入四季豆进行煸炒，在煸炒时可多次翻炒多次盖盖闷小会，可加快成熟度",
        "pageOrder": 5,
        "httpStatus": 200,
        "contentType": "image/jpeg",
        "visualVerified": true,
        "stepOrder": 4,
        "sourceStepOrder": 4,
        "sha256": "14d379dc3f1f10e8c086eb82076a9e7dffd219bf88baf93eba0e13cb553d40a1",
        "recipePageUrl": "https://www.douguo.com/cookbook/1228444.html",
        "mediaPageUrl": "https://www.douguo.com/cookbook/1228444.html",
        "path": "assets/dishes/sources/cn-029-dry-fried-green-beans/step-4.jpg"
      },
      {
        "originalUrl": "https://cp1.douguo.com/upload/caiku/a/9/3/800_a9a1c78518e4ee1d097f10feeb207463.jpg",
        "adjacentText": "直到煎制两面起皱，带点微焦即可盛出",
        "pageOrder": 6,
        "httpStatus": 200,
        "contentType": "image/jpeg",
        "visualVerified": true,
        "stepOrder": 5,
        "sourceStepOrder": 5,
        "sha256": "24b9e2de49fce37a29bb3477423a1ffe365038c0d41900c1c5a00b153ba2d6ee",
        "recipePageUrl": "https://www.douguo.com/cookbook/1228444.html",
        "mediaPageUrl": "https://www.douguo.com/cookbook/1228444.html",
        "path": "assets/dishes/sources/cn-029-dry-fried-green-beans/step-5.jpg"
      },
      {
        "originalUrl": "https://cp1.douguo.com/upload/caiku/2/6/f/800_260f535e42438355c5d0184ea5447c8f.jpg",
        "adjacentText": "锅中留油，放入肉末",
        "pageOrder": 7,
        "httpStatus": 200,
        "contentType": "image/jpeg",
        "visualVerified": true,
        "stepOrder": 6,
        "sourceStepOrder": 6,
        "sha256": "898089d85533d15b15dcabc31d1bb94789dbd4cf25db72afa9f32843e6c36c68",
        "recipePageUrl": "https://www.douguo.com/cookbook/1228444.html",
        "mediaPageUrl": "https://www.douguo.com/cookbook/1228444.html",
        "path": "assets/dishes/sources/cn-029-dry-fried-green-beans/step-6.jpg"
      },
      {
        "originalUrl": "https://cp1.douguo.com/upload/caiku/1/1/1/800_1110c9ca7f8a5b6d2514dc8dcb18a2a1.jpg",
        "adjacentText": "肉末炒至变白加入料酒、葱姜蒜末、干辣椒翻炒片刻",
        "pageOrder": 8,
        "httpStatus": 200,
        "contentType": "image/jpeg",
        "visualVerified": true,
        "stepOrder": 7,
        "sourceStepOrder": 7,
        "sha256": "546ac6d79176f803e80add81f7b54e4589c66dc39a0e3f4c2e770fed9a9db932",
        "recipePageUrl": "https://www.douguo.com/cookbook/1228444.html",
        "mediaPageUrl": "https://www.douguo.com/cookbook/1228444.html",
        "path": "assets/dishes/sources/cn-029-dry-fried-green-beans/step-7.jpg"
      },
      {
        "originalUrl": "https://cp1.douguo.com/upload/caiku/a/f/0/800_af89c08ff108634c2ec8e43ae18ad2e0.jpg",
        "adjacentText": "放入芽菜炒香",
        "pageOrder": 9,
        "httpStatus": 200,
        "contentType": "image/jpeg",
        "visualVerified": true,
        "stepOrder": 8,
        "sourceStepOrder": 8,
        "sha256": "9349a0ce560a68cedee5c50d5e769c2f2883be662f0aa11d212e516d3266623f",
        "recipePageUrl": "https://www.douguo.com/cookbook/1228444.html",
        "mediaPageUrl": "https://www.douguo.com/cookbook/1228444.html",
        "path": "assets/dishes/sources/cn-029-dry-fried-green-beans/step-8.jpg"
      },
      {
        "originalUrl": "https://cp1.douguo.com/upload/caiku/3/d/f/800_3d595d3def74f5c87cd47fef56aa27cf.jpg",
        "adjacentText": "放入鲜酱油",
        "pageOrder": 10,
        "httpStatus": 200,
        "contentType": "image/jpeg",
        "visualVerified": true,
        "stepOrder": 9,
        "sourceStepOrder": 9,
        "sha256": "92a453ac23d63ad52d79140c48b8f016c23eba2a172f235305a3fd40443ce44b",
        "recipePageUrl": "https://www.douguo.com/cookbook/1228444.html",
        "mediaPageUrl": "https://www.douguo.com/cookbook/1228444.html",
        "path": "assets/dishes/sources/cn-029-dry-fried-green-beans/step-9.jpg"
      },
      {
        "originalUrl": "https://cp1.douguo.com/upload/caiku/a/2/7/800_a2b0df69f40c0b877c0dd6b1ce550447.jpg",
        "adjacentText": "老抽",
        "pageOrder": 11,
        "httpStatus": 200,
        "contentType": "image/jpeg",
        "visualVerified": true,
        "stepOrder": 10,
        "sourceStepOrder": 10,
        "sha256": "9abf6015045276a88c8ccb2696a95e34c975b16c6e3ad09c426380146f3ec3e6",
        "recipePageUrl": "https://www.douguo.com/cookbook/1228444.html",
        "mediaPageUrl": "https://www.douguo.com/cookbook/1228444.html",
        "path": "assets/dishes/sources/cn-029-dry-fried-green-beans/step-10.jpg"
      },
      {
        "originalUrl": "https://cp1.douguo.com/upload/caiku/b/d/8/800_bd3cc9b3328aa5f948ed9a0be7e89c08.jpg",
        "adjacentText": "放入糖和白胡椒粉后翻炒片刻",
        "pageOrder": 12,
        "httpStatus": 200,
        "contentType": "image/jpeg",
        "visualVerified": true,
        "stepOrder": 11,
        "sourceStepOrder": 11,
        "sha256": "f41da55f3da2518a0502d679429d22cf443011ce2aea156122c145fb9c99e591",
        "recipePageUrl": "https://www.douguo.com/cookbook/1228444.html",
        "mediaPageUrl": "https://www.douguo.com/cookbook/1228444.html",
        "path": "assets/dishes/sources/cn-029-dry-fried-green-beans/step-11.jpg"
      },
      {
        "originalUrl": "https://cp1.douguo.com/upload/caiku/a/5/f/800_a565cbc2666adab6ea7aae58a2ef228f.jpg",
        "adjacentText": "倒入煎好的四季豆，再把盐撒在四季豆上翻炒均匀",
        "pageOrder": 13,
        "httpStatus": 200,
        "contentType": "image/jpeg",
        "visualVerified": true,
        "stepOrder": 12,
        "sourceStepOrder": 12,
        "sha256": "8061f4c5ee28cf84351cebb35293fb0346d2f6bfd626ac9e96bf941e6a4913e5",
        "recipePageUrl": "https://www.douguo.com/cookbook/1228444.html",
        "mediaPageUrl": "https://www.douguo.com/cookbook/1228444.html",
        "path": "assets/dishes/sources/cn-029-dry-fried-green-beans/step-12.jpg"
      }
    ],
    "repositoryCopyAuthorization": "user_confirmed_2026-09-16"
  }),
  c("蚂蚁上树", "Minced Pork with Glass Noodles", "川菜", "红薯粉丝80克（干重）；猪肉末150克；郫县豆瓣酱15克；生抽10毫升（可根据口味酌情减少）；老抽5毫升；食用油10毫升；蒜末10克；姜末5克；清水300毫升（煮粉丝用）；水适量（泡粉丝用，原文未注明用量）；小葱适量（可选，原文未注明用量）；白胡椒粉0.5克（可选）", "1）红薯粉丝提前泡软，泡水时间为 20 分钟，备用。2）将蒜、姜分别剁碎，备用。3）锅烧热，加入 10ml 食用油，加入蒜末、姜末炒香。4）加入猪肉末翻炒至肉色发白且微微出油。5）加入郫县豆瓣酱，炒至红油析出。6）加入生抽和老抽，翻炒均匀。7）倒入 300ml 清水，煮沸。8）放入泡软沥干的粉丝，用筷子轻轻拨动防止粘连。9）中小火煮约 5 分钟，直至粉丝完全吸收汤汁、呈现微微收干状态。10）依据口味可撒入小葱末，关火装盘。", "40-mayi-shangshu.png", "https://github.com/Anduin2017/HowToCook/blob/a2d45c6984dff9ee941da0e7c452f7965965d962/dishes/meat_dish/%E8%9A%82%E8%9A%81%E4%B8%8A%E6%A0%91.md", null, { totalMinutes: 20 }, 2, {
  "howtocook": {
    "commit": "a2d45c6984dff9ee941da0e7c452f7965965d962",
    "path": "dishes/meat_dish/蚂蚁上树.md",
    "sha256": "547feef7fc58df68756bac4e753ef9519e6f23426b734a90252f3f5cb4184e7e",
    "rawMarkdown": "# 蚂蚁上树的做法\n\n蚂蚁上树是一道经典的川味家常菜，咸香微辣，粉丝软滑吸汁，肉末细嫩鲜香。以红薯粉丝和肉末为主料，富含碳水化合物与蛋白质，能快速补充能量。制作难度中等，步骤清晰，对新手比较友好，全程约需 20 分钟即可完成。\n\n预估烹饪难度：★★★\n\n预估卡路里：791 大卡\n\n## 必备原料和工具\n\n- 红薯粉丝\n- 猪肉末（或牛肉末）\n- 郫县豆瓣酱\n- 生抽\n- 老抽\n- 食用油\n- 蒜末、姜末\n- 小葱（可选）\n\n## 计算\n\n每次制作前需要确定计划做几份。一份正好够 2 个人吃。\n\n每份：\n\n- 红薯粉丝 80g（干重）\n- 猪肉末 150g\n- 郫县豆瓣酱 15g\n- 生抽 10ml\n- 老抽 5ml\n- 食用油 10ml\n- 蒜末 10g\n- 姜末 5g\n- 清水 300ml（用于煮粉丝）\n\n## 操作\n\n1. 红薯粉丝提前泡软，泡水时间为 20 分钟，备用\n2. 将蒜、姜分别剁碎，备用\n3. 锅烧热，加入 10ml 食用油，加入蒜末、姜末炒香\n4. 加入猪肉末翻炒至**肉色发白且微微出油**\n5. 加入郫县豆瓣酱，炒至**红油析出**\n6. 加入生抽和老抽，翻炒均匀\n7. 倒入 300ml 清水，煮沸\n8. 放入泡软沥干的粉丝，用筷子轻轻拨动防止粘连\n9. 中小火煮约 5 分钟，直至粉丝**完全吸收汤汁**、呈现微微收干状态\n10. 依据口味可撒入小葱末，关火装盘\n\n## 附加内容\n\n- 粉丝不建议煮太久，易断且口感变差；若时间过长汤汁应适当减少\n- 郫县豆瓣酱含盐量较高，可根据口味酌情减少生抽用量\n- 可加入 0.5g 白胡椒粉调味，风味更佳\n\n如果您遵循本指南的制作流程而发现有问题或可以改进的流程，请提出 Issue 或 Pull request 。\n",
    "sections": [
      {
        "title": "蚂蚁上树的做法",
        "markdown": "\n蚂蚁上树是一道经典的川味家常菜，咸香微辣，粉丝软滑吸汁，肉末细嫩鲜香。以红薯粉丝和肉末为主料，富含碳水化合物与蛋白质，能快速补充能量。制作难度中等，步骤清晰，对新手比较友好，全程约需 20 分钟即可完成。\n\n预估烹饪难度：★★★\n\n预估卡路里：791 大卡\n\n",
        "level": 1
      },
      {
        "title": "必备原料和工具",
        "markdown": "\n- 红薯粉丝\n- 猪肉末（或牛肉末）\n- 郫县豆瓣酱\n- 生抽\n- 老抽\n- 食用油\n- 蒜末、姜末\n- 小葱（可选）\n\n",
        "level": 2
      },
      {
        "title": "计算",
        "markdown": "\n每次制作前需要确定计划做几份。一份正好够 2 个人吃。\n\n每份：\n\n- 红薯粉丝 80g（干重）\n- 猪肉末 150g\n- 郫县豆瓣酱 15g\n- 生抽 10ml\n- 老抽 5ml\n- 食用油 10ml\n- 蒜末 10g\n- 姜末 5g\n- 清水 300ml（用于煮粉丝）\n\n",
        "level": 2
      },
      {
        "title": "操作",
        "markdown": "\n1. 红薯粉丝提前泡软，泡水时间为 20 分钟，备用\n2. 将蒜、姜分别剁碎，备用\n3. 锅烧热，加入 10ml 食用油，加入蒜末、姜末炒香\n4. 加入猪肉末翻炒至**肉色发白且微微出油**\n5. 加入郫县豆瓣酱，炒至**红油析出**\n6. 加入生抽和老抽，翻炒均匀\n7. 倒入 300ml 清水，煮沸\n8. 放入泡软沥干的粉丝，用筷子轻轻拨动防止粘连\n9. 中小火煮约 5 分钟，直至粉丝**完全吸收汤汁**、呈现微微收干状态\n10. 依据口味可撒入小葱末，关火装盘\n\n",
        "level": 2
      },
      {
        "title": "附加内容",
        "markdown": "\n- 粉丝不建议煮太久，易断且口感变差；若时间过长汤汁应适当减少\n- 郫县豆瓣酱含盐量较高，可根据口味酌情减少生抽用量\n- 可加入 0.5g 白胡椒粉调味，风味更佳\n\n如果您遵循本指南的制作流程而发现有问题或可以改进的流程，请提出 Issue 或 Pull request 。\n",
        "level": 2
      }
    ],
    "images": []
  },
  "sourceLimitations": [
    "本用量为原文一份，够2人食用。",
    "简介写全程约20分钟，操作另写泡水20分钟及中小火煮约5分钟，存在原文总估计与分段时长不一致；总用时20分钟保留原简介约值，不自行合计。",
    "泡粉丝的水及可选小葱未注明用量，不作定量补充。",
    "必备原料列猪肉末或牛肉末，计算及操作采用猪肉末，保留该完整做法。",
    "附加内容可选白胡椒粉0.5克，原文未说明添加时机，不新增操作。",
    "上游无图片，保留的原有展示图不属于本次 HowToCook 来源图片。"
  ]
}),
  c("家常豆腐", "Home-style Tofu", "川菜", "北豆腐450克；猪肉片100克；木耳50克；青红椒各60克；豆瓣酱15克；生抽15毫升；蒜末10克；淀粉5克", "1）豆腐切片煎至两面金黄。2）炒熟肉片，加入豆瓣和蒜末，再下木耳青红椒。3）倒入豆腐和少量水焖3分钟，以淀粉水薄芡。", "41-jiachang-doufu.png"),
  c("虎皮青椒", "Blistered Green Peppers", "川菜", "青椒5个（长度10—15厘米最合适）；大蒜2—3瓣；食用油20毫升；白糖15克；生抽15毫升；香醋15毫升；盐4克；自来水适量（冲洗用，原文未注明用量）", "1）去掉青椒蒂，用自来水冲洗干净。2）青椒切长片，平均一个青椒纵向切成 3-4 片即可。3）大蒜去皮，切成碎末，体积在 2mm x 2mm x 2mm 即可。4）调料 1：拿一个小碗倒入 20ml 油，将大蒜末放入其中。5）调料 2：白糖、生抽、醋、盐全部倒入砵（碗）等容器，搅拌。6）将 调料 1 倒入锅中，开火加热 5 成放入青椒，青椒片不要叠在一起，单独成片放置锅中。7）用锅铲不停的按压青椒，合适的时候翻面。8）翻炒约 2 分钟，待青椒表皮出现褶皱时，倒入 调料 2。9）加大火候继续翻炒 30秒 后即可出锅盛入盘中。", "42-hupi-qingjiao.png", "https://github.com/Anduin2017/HowToCook/blob/a2d45c6984dff9ee941da0e7c452f7965965d962/dishes/vegetable_dish/%E8%99%8E%E7%9A%AE%E9%9D%92%E6%A4%92/%E8%99%8E%E7%9A%AE%E9%9D%92%E6%A4%92.md", null, { totalMinutes: 15 }, null, {
  "howtocook": {
    "commit": "a2d45c6984dff9ee941da0e7c452f7965965d962",
    "path": "dishes/vegetable_dish/虎皮青椒/虎皮青椒.md",
    "sha256": "b49f516f967eb74688024ba32c332ee3893ad85ab0706de61ed87d6cd33e71da",
    "rawMarkdown": "\n# 虎皮青椒的做法\n\n虎皮青椒是一道家常小菜，外皮微焦起皱，口感软嫩带脆，咸鲜中透着酸甜，十分开胃下饭。青椒富含维生素 C 和膳食纤维，有助于增强免疫力、促进消化。制作过程简单明了，只需掌握按压和火候，对新手也比较友好，一般约 15 分钟就能完成。\n\n预估烹饪难度：★★★\n\n预估卡路里：341 大卡\n\n## 必备原料和工具\n\n- 青椒\n- 大蒜\n- 白糖（灵魂）\n- 醋\n- 生抽\n- 盐\n- 砵或者有一定深度的碗\n\n## 计算\n\n每份：\n\n- 青椒 5 个，长度在 10-15cm 的最为合适\n- 大蒜 2-3 瓣\n- 油 20ml\n- 白糖 15g\n- 生抽 15ml\n- 香醋 15ml\n- 盐 4g\n\n## 操作\n\n1. 去掉青椒蒂，用自来水冲洗干净。\n2. 青椒切长片，平均一个青椒纵向切成 3-4 片即可。\n3. 大蒜去皮，切成碎末，体积在 2mm x 2mm x 2mm 即可。\n4. `调料 1`：拿一个小碗倒入 20ml 油，将大蒜末放入其中。\n5. `调料 2`：白糖、生抽、醋、盐全部倒入砵（碗）等容器，搅拌。\n6. 将 `调料 1` 倒入锅中，开火加热 5 成放入青椒，青椒片不要叠在一起，单独成片放置锅中。\n7. 用锅铲不停的按压青椒，合适的时候翻面。\n8. 翻炒约 2 分钟，待青椒表皮出现褶皱时，倒入 `调料 2`。\n9. 加大火候继续翻炒 30s 后即可出锅盛入盘中。\n\n## 附加内容\n\n如果您遵循本指南的制作流程而发现有问题或可以改进的流程，请提出 Issue 或 Pull request 。\n\n![虎皮青椒](./虎皮青椒.jpg)\n",
    "sections": [
      {
        "title": "虎皮青椒的做法",
        "markdown": "\n虎皮青椒是一道家常小菜，外皮微焦起皱，口感软嫩带脆，咸鲜中透着酸甜，十分开胃下饭。青椒富含维生素 C 和膳食纤维，有助于增强免疫力、促进消化。制作过程简单明了，只需掌握按压和火候，对新手也比较友好，一般约 15 分钟就能完成。\n\n预估烹饪难度：★★★\n\n预估卡路里：341 大卡\n\n",
        "level": 1
      },
      {
        "title": "必备原料和工具",
        "markdown": "\n- 青椒\n- 大蒜\n- 白糖（灵魂）\n- 醋\n- 生抽\n- 盐\n- 砵或者有一定深度的碗\n\n",
        "level": 2
      },
      {
        "title": "计算",
        "markdown": "\n每份：\n\n- 青椒 5 个，长度在 10-15cm 的最为合适\n- 大蒜 2-3 瓣\n- 油 20ml\n- 白糖 15g\n- 生抽 15ml\n- 香醋 15ml\n- 盐 4g\n\n",
        "level": 2
      },
      {
        "title": "操作",
        "markdown": "\n1. 去掉青椒蒂，用自来水冲洗干净。\n2. 青椒切长片，平均一个青椒纵向切成 3-4 片即可。\n3. 大蒜去皮，切成碎末，体积在 2mm x 2mm x 2mm 即可。\n4. `调料 1`：拿一个小碗倒入 20ml 油，将大蒜末放入其中。\n5. `调料 2`：白糖、生抽、醋、盐全部倒入砵（碗）等容器，搅拌。\n6. 将 `调料 1` 倒入锅中，开火加热 5 成放入青椒，青椒片不要叠在一起，单独成片放置锅中。\n7. 用锅铲不停的按压青椒，合适的时候翻面。\n8. 翻炒约 2 分钟，待青椒表皮出现褶皱时，倒入 `调料 2`。\n9. 加大火候继续翻炒 30s 后即可出锅盛入盘中。\n\n",
        "level": 2
      },
      {
        "title": "附加内容",
        "markdown": "\n如果您遵循本指南的制作流程而发现有问题或可以改进的流程，请提出 Issue 或 Pull request 。\n\n![虎皮青椒](./虎皮青椒.jpg)\n",
        "level": 2
      }
    ],
    "images": [
      {
        "originalReference": "./虎皮青椒.jpg",
        "originalUrl": "https://raw.githubusercontent.com/Anduin2017/HowToCook/a2d45c6984dff9ee941da0e7c452f7965965d962/dishes/vegetable_dish/%E8%99%8E%E7%9A%AE%E9%9D%92%E6%A4%92/%E8%99%8E%E7%9A%AE%E9%9D%92%E6%A4%92.jpg",
        "path": "assets/dishes/howtocook/cn-032/1.jpg",
        "alt": "虎皮青椒",
        "pageOrder": 1,
        "adjacentText": "热 5 成放入青椒，青椒片不要叠在一起，单独成片放置锅中。\n7. 用锅铲不停的按压青椒，合适的时候翻面。\n8. 翻炒约 2 分钟，待青椒表皮出现褶皱时，倒入 `调料 2`。\n9. 加大火候继续翻炒 30s 后即可出锅盛入盘中。\n\n## 附加内容\n\n如果您遵循本指南的制作流程而发现有问题或可以改进的流程，请提出 Issue 或 Pull request 。\n\n![虎皮青椒](./虎皮青椒.jpg)\n"
      }
    ]
  },
  "sourceLimitations": [
    "原文一般约15分钟完成，总用时15分钟为约值；每份未注明供几人食用，不推测人数。",
    "原文油未限定种类，规范食材写为食用油；自来水用于冲洗，未注明用量。",
    "原文开火加热5成未给出温度数值，合适的时候翻面未给出明确判定或时长，不补造参数。",
    "完整保留调料1为油与蒜末、调料2为白糖、生抽、醋、盐的定义及使用顺序。"
  ]
}),
  c("酸辣土豆丝", "Hot and Sour Shredded Potatoes", "家常菜", "土豆240克（丝越细越长更好）；大蒜4瓣（蒜末分为两等份）；青椒0.5个；红椒0.5个；干辣椒3个；葱1根（葱花分两次用）；生抽5毫升；陈醋10毫升；盐2克；食用油10—15毫升；清水适量（清洗及焯土豆丝用，原文未注明用量）", "1）土豆去皮、切丝（或用刨丝器）。2）切好的土豆丝用清水清洗，去除多余的淀粉，然后对土豆丝焯水 10 秒。沥干，备用。3）葱切成葱花；大蒜拍碎切成蒜末（分为两等份备用）；干辣椒切小段；青红椒切丝。4）热锅，小火热油，下入一半的葱花（葱白部分）、一半的蒜末和干辣椒爆香。5）加入青红椒翻炒几下，加入土豆丝翻炒至变色。6）加 5ml 生抽，10ml 陈醋，倒入剩下的一半蒜末和 2g 盐快速翻炒均匀。7）出锅前撒上剩余的葱花，翻匀即可装盘。", "43-suanla-tudousi.png", "https://github.com/Anduin2017/HowToCook/blob/a2d45c6984dff9ee941da0e7c452f7965965d962/dishes/vegetable_dish/%E9%85%B8%E8%BE%A3%E5%9C%9F%E8%B1%86%E4%B8%9D.md", null, { totalMinutes: 20 }, null, {
  "howtocook": {
    "commit": "a2d45c6984dff9ee941da0e7c452f7965965d962",
    "path": "dishes/vegetable_dish/酸辣土豆丝.md",
    "sha256": "c6bf903ae1c79e1089f32bffb79a14dd4d2bea58d1a2f90330f164b0b4f3f3cb",
    "rawMarkdown": "# 酸辣土豆丝的做法\n\n酸辣开胃的经典家常菜，口感脆爽，色泽鲜亮，属于大众喜爱的快手小炒。土豆提供碳水化合物和钾元素，辣椒富含维生素 C，有助于增进食欲。操作步骤简单明了，对新手十分友好，从备料到出锅大约只需 20 分钟。\n\n预估烹饪难度：★★\n\n预估卡路里：374 大卡\n\n## 必备原料和工具\n\n- 土豆\n- 大蒜\n- 青椒\n- 红椒\n- 干辣椒\n- 葱\n- 生抽\n- 陈醋\n- 盐\n\n## 计算\n\n每份：\n\n- 土豆 240g（越细越长更好）\n- 大蒜 4 瓣\n- 青椒 0.5 个\n- 红椒 0.5 个\n- 干辣椒 3 个\n- 葱 1 根\n- 生抽 5ml\n- 陈醋 10ml\n- 盐 2g\n- 食用油 10-15ml\n\n## 操作\n\n1. 土豆去皮、切丝（或用刨丝器）。\n2. 切好的土豆丝用清水清洗，去除多余的淀粉，然后对土豆丝焯水 10 秒。沥干，备用。\n3. 葱切成葱花；大蒜拍碎切成蒜末（分为两等份备用）；干辣椒切小段；青红椒切丝。\n4. 热锅，小火热油，下入一半的葱花（葱白部分）、一半的蒜末和干辣椒爆香。\n5. 加入青红椒翻炒几下，加入土豆丝翻炒至变色。\n6. 加 5ml 生抽，10ml 陈醋，倒入剩下的一半蒜末和 2g 盐快速翻炒均匀。\n7. 出锅前撒上剩余的葱花，翻匀即可装盘。\n\n## 附加内容\n\n- 清洗土豆丝淀粉一定要去干净，不然会全黏在一起\n- 加入蒜末、盐后应尽快出锅，保留蒜香以及避免破坏口感。\n\n如果您遵循本指南的制作流程而发现有问题或可以改进的流程，请提出 Issue 或 Pull request 。\n",
    "sections": [
      {
        "title": "酸辣土豆丝的做法",
        "markdown": "\n酸辣开胃的经典家常菜，口感脆爽，色泽鲜亮，属于大众喜爱的快手小炒。土豆提供碳水化合物和钾元素，辣椒富含维生素 C，有助于增进食欲。操作步骤简单明了，对新手十分友好，从备料到出锅大约只需 20 分钟。\n\n预估烹饪难度：★★\n\n预估卡路里：374 大卡\n\n",
        "level": 1
      },
      {
        "title": "必备原料和工具",
        "markdown": "\n- 土豆\n- 大蒜\n- 青椒\n- 红椒\n- 干辣椒\n- 葱\n- 生抽\n- 陈醋\n- 盐\n\n",
        "level": 2
      },
      {
        "title": "计算",
        "markdown": "\n每份：\n\n- 土豆 240g（越细越长更好）\n- 大蒜 4 瓣\n- 青椒 0.5 个\n- 红椒 0.5 个\n- 干辣椒 3 个\n- 葱 1 根\n- 生抽 5ml\n- 陈醋 10ml\n- 盐 2g\n- 食用油 10-15ml\n\n",
        "level": 2
      },
      {
        "title": "操作",
        "markdown": "\n1. 土豆去皮、切丝（或用刨丝器）。\n2. 切好的土豆丝用清水清洗，去除多余的淀粉，然后对土豆丝焯水 10 秒。沥干，备用。\n3. 葱切成葱花；大蒜拍碎切成蒜末（分为两等份备用）；干辣椒切小段；青红椒切丝。\n4. 热锅，小火热油，下入一半的葱花（葱白部分）、一半的蒜末和干辣椒爆香。\n5. 加入青红椒翻炒几下，加入土豆丝翻炒至变色。\n6. 加 5ml 生抽，10ml 陈醋，倒入剩下的一半蒜末和 2g 盐快速翻炒均匀。\n7. 出锅前撒上剩余的葱花，翻匀即可装盘。\n\n",
        "level": 2
      },
      {
        "title": "附加内容",
        "markdown": "\n- 清洗土豆丝淀粉一定要去干净，不然会全黏在一起\n- 加入蒜末、盐后应尽快出锅，保留蒜香以及避免破坏口感。\n\n如果您遵循本指南的制作流程而发现有问题或可以改进的流程，请提出 Issue 或 Pull request 。\n",
        "level": 2
      }
    ],
    "images": []
  },
  "sourceLimitations": [
    "原文从备料到出锅大约20分钟，总用时20分钟为约值；每份未注明食客人数，不作推测。",
    "清洗及焯土豆丝的清水原文未注明用量；炒制仅有小火热油及翻炒至变色的指示，不补充其他火力或时长。",
    "保留原文蒜末分两等份和葱花分次加入的顺序：爆香用一半蒜末及一半葱花（葱白部分），调味加剩余蒜末，出锅前加剩余葱花。",
    "上游无图片，保留的原有展示图不属于本次 HowToCook 来源图片。"
  ]
}),
  c("韭菜炒鸡蛋", "Chive and Egg Stir-fry", "家常菜", "韭菜100克；鸡蛋2个；食用油10毫升（原文一份总量，操作另写再加5毫升，两次用量关系未明确）；盐2克；水适量（清洗韭菜用，原文未注明用量）", "1）韭菜洗净，沥干水分。2）韭菜切成约 3cm 长的小段，即为 韭菜段。3）将鸡蛋打入碗中，搅匀，即为 鸡蛋液。4）热锅，加入食用油。5）油热后，倒入 鸡蛋液，快速翻炒至鸡蛋凝固成块，盛出备用，即为 炒好的鸡蛋。6）锅中再加 5ml 食用油，放入 韭菜段，大火快速翻炒 30 秒。7）向锅中加入 炒好的鸡蛋，翻炒均匀。8）加入盐，翻炒均匀。9）关火，盛盘。", "44-jiucai-chaodan.png", "https://github.com/Anduin2017/HowToCook/blob/a2d45c6984dff9ee941da0e7c452f7965965d962/dishes/vegetable_dish/%E9%9F%AD%E8%8F%9C%E7%82%92%E8%9B%8B/%E9%9F%AD%E8%8F%9C%E7%82%92%E8%9B%8B.md", null, { totalMinutes: 10 }, 1, {
  "howtocook": {
    "commit": "a2d45c6984dff9ee941da0e7c452f7965965d962",
    "path": "dishes/vegetable_dish/韭菜炒蛋/韭菜炒蛋.md",
    "sha256": "b6adaa156b2a5d821069e12fd84544e323e02f7fe305c65645dc93fb03669561",
    "rawMarkdown": "# 韭菜炒蛋的做法\n\n韭菜炒蛋是一道经典的家常菜，韭菜香气浓郁，鸡蛋嫩滑鲜美，简单易做，营养丰富。韭菜含有丰富的维生素和纤维素，鸡蛋提供优质蛋白质。这道菜制作简单，原材料易得，特别适合厨房新手入门，从头备菜到盛盘出锅大约只需 10 分钟。\n\n预估烹饪难度：★★\n\n预估卡路里：180 大卡\n\n## 必备原料和工具\n\n* 韭菜\n* 鸡蛋\n* 食用油\n* 盐\n\n## 计算\n\n每次制作前需要确定计划做几份。一份正好够 1 个人食用\n\n总量：\n\n* 韭菜 = 100g * 份数\n* 鸡蛋 = 2 个 * 份数\n* 食用油 = 10ml * 份数\n* 盐 = 2g * 份数\n\n## 操作\n\n1. 韭菜洗净，沥干水分\n2. 韭菜切成约 3cm 长的小段，即为 `韭菜段`\n3. 将鸡蛋打入碗中，搅匀，即为 `鸡蛋液`\n4. 热锅，加入食用油\n5. 油热后，倒入 `鸡蛋液`，快速翻炒至鸡蛋凝固成块，盛出备用，即为 `炒好的鸡蛋`\n6. 锅中再加 5ml 食用油，放入 `韭菜段`，大火快速翻炒 30 秒\n7. 向锅中加入 `炒好的鸡蛋`，翻炒均匀\n8. 加入盐，翻炒均匀\n9. 关火，盛盘\n\n## 附加内容\n\n* 韭菜炒蛋讲究大火快炒，韭菜炒久了容易失去香气和脆嫩口感\n* 如果喜欢韭菜更软烂，可以适当延长翻炒时间\n\n如果您遵循本指南的制作流程而发现有问题或可以改进的流程，请提出 Issue 或 Pull request 。\n",
    "sections": [
      {
        "title": "韭菜炒蛋的做法",
        "markdown": "\n韭菜炒蛋是一道经典的家常菜，韭菜香气浓郁，鸡蛋嫩滑鲜美，简单易做，营养丰富。韭菜含有丰富的维生素和纤维素，鸡蛋提供优质蛋白质。这道菜制作简单，原材料易得，特别适合厨房新手入门，从头备菜到盛盘出锅大约只需 10 分钟。\n\n预估烹饪难度：★★\n\n预估卡路里：180 大卡\n\n",
        "level": 1
      },
      {
        "title": "必备原料和工具",
        "markdown": "\n* 韭菜\n* 鸡蛋\n* 食用油\n* 盐\n\n",
        "level": 2
      },
      {
        "title": "计算",
        "markdown": "\n每次制作前需要确定计划做几份。一份正好够 1 个人食用\n\n总量：\n\n* 韭菜 = 100g * 份数\n* 鸡蛋 = 2 个 * 份数\n* 食用油 = 10ml * 份数\n* 盐 = 2g * 份数\n\n",
        "level": 2
      },
      {
        "title": "操作",
        "markdown": "\n1. 韭菜洗净，沥干水分\n2. 韭菜切成约 3cm 长的小段，即为 `韭菜段`\n3. 将鸡蛋打入碗中，搅匀，即为 `鸡蛋液`\n4. 热锅，加入食用油\n5. 油热后，倒入 `鸡蛋液`，快速翻炒至鸡蛋凝固成块，盛出备用，即为 `炒好的鸡蛋`\n6. 锅中再加 5ml 食用油，放入 `韭菜段`，大火快速翻炒 30 秒\n7. 向锅中加入 `炒好的鸡蛋`，翻炒均匀\n8. 加入盐，翻炒均匀\n9. 关火，盛盘\n\n",
        "level": 2
      },
      {
        "title": "附加内容",
        "markdown": "\n* 韭菜炒蛋讲究大火快炒，韭菜炒久了容易失去香气和脆嫩口感\n* 如果喜欢韭菜更软烂，可以适当延长翻炒时间\n\n如果您遵循本指南的制作流程而发现有问题或可以改进的流程，请提出 Issue 或 Pull request 。\n",
        "level": 2
      }
    ],
    "images": []
  },
  "sourceLimitations": [
    "上游标题为韭菜炒蛋，与本记录韭菜炒鸡蛋同菜，保留本记录名称。",
    "原文一份供1人食用，展示原料采用1份用量，原文总量按份数倍增的规则完整保留。",
    "原文从备菜到盛盘大约10分钟，总用时10分钟为约值。",
    "原文总量列食用油10毫升乘份数，操作第4步未量化首次加油、第6步另写再加5毫升，两次加油与总量关系未明确，不推算首次用量或另加后的总量。",
    "清洗韭菜所用水原文未注明用量，不补造定量。"
  ]
}),
  c("冬瓜排骨汤", "Winter Melon Pork Rib Soup", "粤式家常", "排骨500克；冬瓜500克；姜20克；葱1根；料酒15毫升；盐适量；白胡椒少许", "1）排骨冷水焯去血沫。2）排骨加姜、葱和足量清水，小火炖50分钟。3）冬瓜切厚块入锅再煮20分钟，以盐和白胡椒调味。", "45-donggua-paigu-tang.png"),
  c("莲藕排骨汤", "Lotus Root Pork Rib Soup", "湖北", "排骨适量；莲藕一根；葱一段；姜2片；盐适量；清水适量（用于焯水、清洗和煮汤）；葱花适量；料酒适量（用量未注明）", "1）排骨冷水入锅，加入料酒焯水去腥，再洗干净备用。2）将莲藕和排骨放入高压锅，加入葱段和姜片。3）加入适量清水，将食材煮熟。4）加入葱花和适量盐调味，即可饮用。", "46-lianou-paigu-tang.png", "https://www.douguo.com/cookbook/3356395.html", {
    "recipePageUrl": "https://www.douguo.com/cookbook/3356395.html",
    "mediaPageUrl": "https://www.douguo.com/cookbook/3356395.html",
    "sourceName": "豆果美食",
    "author": "晓筱家",
    "rightsNotice": "©本菜谱的做法由 晓筱家 编写，未经授权不得转载",
    "reuseLicense": null,
    "repositoryCopyAuthorized": true,
    "hero": {
      "originalUrl": "https://cp1.douguo.com/upload/caiku/8/b/2/960_8b7aa39fe852849a6c1d090c7be76772.jpeg",
      "adjacentText": "莲藕排骨汤",
      "pageOrder": 1,
      "httpStatus": 200,
      "contentType": "image/jpeg",
      "visualVerified": true,
      "visualReview": "已实际查看：白碗成品汤，莲藕、排骨和葱花清晰可见。",
      "sha256": "f8fd97d27d2b9a21f1af83be75146d8b4dad3fc69daa27c7353cc9c7711a5be6",
      "recipePageUrl": "https://www.douguo.com/cookbook/3356395.html",
      "mediaPageUrl": "https://www.douguo.com/cookbook/3356395.html",
      "path": "assets/dishes/sources/cn-036-lotus-rib-soup/hero.jpeg"
    },
    "steps": [
      {
        "originalUrl": "https://cp1.douguo.com/upload/caiku/8/9/b/800_890ec4de1dc03a845eb9b10641fe8b1b.jpeg",
        "adjacentText": "排骨冷水入锅，加入料酒焯水去腥洗干净备用",
        "pageOrder": 2,
        "httpStatus": 200,
        "contentType": "image/jpeg",
        "visualVerified": true,
        "visualReview": "实际高分辨图为锅内排骨与冷水，支持本步冷水入锅阶段；不声称图中能看出料酒或完成焯洗。",
        "stepOrder": 1,
        "sourceStepOrder": 1,
        "sha256": "a3f6f1ddaebab4f7ac630a9a0aacb2b15d639af78db8a5a68bed5e5a86a2c02b",
        "recipePageUrl": "https://www.douguo.com/cookbook/3356395.html",
        "mediaPageUrl": "https://www.douguo.com/cookbook/3356395.html",
        "path": "assets/dishes/sources/cn-036-lotus-rib-soup/step-1.jpeg"
      },
      {
        "originalUrl": "https://cp1.douguo.com/upload/caiku/9/6/9/800_961a2ea48ae0e294b2cd3d8eb4d66fc9.jpeg",
        "adjacentText": "高压锅放入莲藕排骨，加入葱段姜片",
        "pageOrder": 3,
        "httpStatus": 200,
        "contentType": "image/jpeg",
        "visualVerified": true,
        "visualReview": "实际高分辨图为锅内排骨和切好的莲藕，支持装入阶段；此帧尚无葱姜，不声称整步所有动作均在图中。",
        "stepOrder": 2,
        "sourceStepOrder": 2,
        "sha256": "f31ca73faf749836d3db4e7d887a6cadb90d86f298be67fda90c2b4e62268f2e",
        "recipePageUrl": "https://www.douguo.com/cookbook/3356395.html",
        "mediaPageUrl": "https://www.douguo.com/cookbook/3356395.html",
        "path": "assets/dishes/sources/cn-036-lotus-rib-soup/step-2.jpeg"
      },
      {
        "originalUrl": "https://cp1.douguo.com/upload/caiku/6/6/3/800_66752cfe1707b1ba49b518014de0ea33.jpeg",
        "adjacentText": "加入适量清水煮熟即可",
        "pageOrder": 4,
        "httpStatus": 200,
        "contentType": "image/jpeg",
        "visualVerified": true,
        "visualReview": "实际高分辨图为装锅排骨莲藕葱姜浸在清水中，支持加水阶段；不拿照片推算用水量或压力烹饪时长。",
        "stepOrder": 3,
        "sourceStepOrder": 3,
        "sha256": "5d2c35757af43ed67c1f5bbe5619fa0d8fd10e4cbac193dd1f7d9540b3fe5cf3",
        "recipePageUrl": "https://www.douguo.com/cookbook/3356395.html",
        "mediaPageUrl": "https://www.douguo.com/cookbook/3356395.html",
        "path": "assets/dishes/sources/cn-036-lotus-rib-soup/step-3.jpeg"
      }
    ],
    "repositoryCopyAuthorization": "user_confirmed_2026-09-16"
  }),
  c("佛跳墙", "Buddha Jumps Over the Wall", "闽菜", "泡发海参150克；鲍鱼6只；花胶100克；干贝50克；鸡块300克；排骨300克；香菇6朵；绍兴酒80毫升；高汤1200毫升", "1）各类干货提前泡发处理，鸡块和排骨焯水。2）食材分层装入炖盅，加绍兴酒和高汤。3）密封后隔水小火炖3小时，最后按咸度调味。", "47-fotiaoqiang.png", CN_HOME),
  c("腊味煲仔饭", "Claypot Rice with Chinese Sausage", "粤菜", "米200毫升；腊肠1根；鸡蛋1个；红萝卜1个；盐5克；食用油15毫升（青菜碗10毫升，小碗5毫升）；生抽10毫升；香葱1颗；水400毫升（煮饭用）；水适量（淘米及洗青菜用，原文未注明用量）；青菜适量（原文未注明用量）；酱油适量（多余青菜蘸食用，原文未注明种类及用量）", "1）将米淘洗干净后倒入 饭碗 内，加入 400ml 的水，盖上盖。2）放入微波炉，高火，6 分钟，煮饭途中准备原料，切好腊肠，洗好青菜，切好红萝卜片，切好葱花，青菜碗 中放入青菜、红萝卜片，倒入 10 ml 油，放入 5 g 盐，小碗 中倒入 10 ml 生抽、5 ml 油。3）6 分钟后，用毛巾或隔热手套取出碗，可以看见米饭已经八分熟。4）在米饭上摆入切片的腊肠，继续高火 2 分钟。5）取出腊肠饭，放入 青菜碗，高火 4-5 分钟。6）在腊肠饭上摆好青菜，磕入鸡蛋，看个人喜好继续高火 40-60 秒。7）取出腊肠饭，此时已经基本完成。8）将 小碗 放入，继续高火 30 秒。9）在腊肠饭上淋上叮热的生抽，撒上葱花即可。10）多余的青菜可以沾着酱油吃。", "48-lawei-baozai-fan.png", "https://github.com/Anduin2017/HowToCook/blob/a2d45c6984dff9ee941da0e7c452f7965965d962/dishes/staple/%E5%BE%AE%E6%B3%A2%E7%82%89%E8%85%8A%E8%82%A0%E7%85%B2%E4%BB%94%E9%A5%AD/%E5%BE%AE%E6%B3%A2%E7%82%89%E8%85%8A%E8%82%A0%E7%85%B2%E4%BB%94%E9%A5%AD.md", null, { totalMinutes: 15 }, 1, {
  "howtocook": {
    "commit": "a2d45c6984dff9ee941da0e7c452f7965965d962",
    "path": "dishes/staple/微波炉腊肠煲仔饭/微波炉腊肠煲仔饭.md",
    "sha256": "854102c03d1874b1f06669894bbbda166e96bdbb3be9a77c7823d65d739d9cf6",
    "rawMarkdown": "# 微波炉腊肠煲仔饭的做法\n\n![微波炉腊肠煲仔饭](微波炉腊肠煲仔饭.png)\n\n这是一道简单快手的粤式风味主食，米饭吸足腊肠油脂后油润咸香，搭配脆嫩青菜和胡萝卜，口感层次丰富。富含碳水化合物、蛋白质和多种维生素，营养均衡。烹饪用微波炉操作，对新手十分友好，预计全程仅需 15 分钟即可享用。\n\n预估烹饪难度：★★\n\n预估卡路里：1039 大卡\n\n## 必备原料和工具\n\n- 工具\n  - 微波炉\n  - 2 个大碗（推荐微波炉专用碗）\n  - 1 个小碗\n- 原料\n  - 米 200 ml\n  - 腊肠 1 根\n  - 鸡蛋 1 个\n  - 红萝卜 1 个\n  - 盐\n  - 油 15 ml\n  - 生抽 10 ml\n  - 香葱 1 颗\n\n## 计算\n\n1 人份。\n\n## 操作\n\n1. 将米淘洗干净后倒入 `饭碗` 内，加入 400ml 的水，**盖上盖**\n2. 放入微波炉，高火，`6` 分钟，煮饭途中准备原料\n\n  - 切好腊肠\n  - 洗好青菜\n  - 切好红萝卜片\n  - 切好葱花\n  - `青菜碗` 中放入青菜、红萝卜片，倒入 10 ml 油，放入 5 g 盐\n  - `小碗` 中倒入 10 ml 生抽、5 ml 油\n\n3. 6 分钟后，用毛巾或隔热手套取出碗，可以看见米饭已经八分熟\n4. 在米饭上摆入切片的腊肠，继续高火 `2` 分钟\n5. 取出腊肠饭，放入 `青菜碗`，高火 `4-5` 分钟\n6. 在腊肠饭上摆好青菜，磕入鸡蛋，看个人喜好继续高火 `40-60` 秒\n7. 取出腊肠饭，此时已经基本完成。\n8. 将 `小碗` 放入，继续高火 `30` 秒\n9. 在腊肠饭上淋上叮热的生抽，撒上葱花即可\n10. 多余的青菜可以沾着酱油吃\n\n## 附加内容\n\n如果您遵循本指南的制作流程而发现有问题或可以改进的流程，请提出 Issue 或 Pull request 。\n",
    "sections": [
      {
        "title": "微波炉腊肠煲仔饭的做法",
        "markdown": "\n![微波炉腊肠煲仔饭](微波炉腊肠煲仔饭.png)\n\n这是一道简单快手的粤式风味主食，米饭吸足腊肠油脂后油润咸香，搭配脆嫩青菜和胡萝卜，口感层次丰富。富含碳水化合物、蛋白质和多种维生素，营养均衡。烹饪用微波炉操作，对新手十分友好，预计全程仅需 15 分钟即可享用。\n\n预估烹饪难度：★★\n\n预估卡路里：1039 大卡\n\n",
        "level": 1
      },
      {
        "title": "必备原料和工具",
        "markdown": "\n- 工具\n  - 微波炉\n  - 2 个大碗（推荐微波炉专用碗）\n  - 1 个小碗\n- 原料\n  - 米 200 ml\n  - 腊肠 1 根\n  - 鸡蛋 1 个\n  - 红萝卜 1 个\n  - 盐\n  - 油 15 ml\n  - 生抽 10 ml\n  - 香葱 1 颗\n\n",
        "level": 2
      },
      {
        "title": "计算",
        "markdown": "\n1 人份。\n\n",
        "level": 2
      },
      {
        "title": "操作",
        "markdown": "\n1. 将米淘洗干净后倒入 `饭碗` 内，加入 400ml 的水，**盖上盖**\n2. 放入微波炉，高火，`6` 分钟，煮饭途中准备原料\n\n  - 切好腊肠\n  - 洗好青菜\n  - 切好红萝卜片\n  - 切好葱花\n  - `青菜碗` 中放入青菜、红萝卜片，倒入 10 ml 油，放入 5 g 盐\n  - `小碗` 中倒入 10 ml 生抽、5 ml 油\n\n3. 6 分钟后，用毛巾或隔热手套取出碗，可以看见米饭已经八分熟\n4. 在米饭上摆入切片的腊肠，继续高火 `2` 分钟\n5. 取出腊肠饭，放入 `青菜碗`，高火 `4-5` 分钟\n6. 在腊肠饭上摆好青菜，磕入鸡蛋，看个人喜好继续高火 `40-60` 秒\n7. 取出腊肠饭，此时已经基本完成。\n8. 将 `小碗` 放入，继续高火 `30` 秒\n9. 在腊肠饭上淋上叮热的生抽，撒上葱花即可\n10. 多余的青菜可以沾着酱油吃\n\n",
        "level": 2
      },
      {
        "title": "附加内容",
        "markdown": "\n如果您遵循本指南的制作流程而发现有问题或可以改进的流程，请提出 Issue 或 Pull request 。\n",
        "level": 2
      }
    ],
    "images": [
      {
        "originalReference": "微波炉腊肠煲仔饭.png",
        "originalUrl": "https://raw.githubusercontent.com/Anduin2017/HowToCook/a2d45c6984dff9ee941da0e7c452f7965965d962/dishes/staple/%E5%BE%AE%E6%B3%A2%E7%82%89%E8%85%8A%E8%82%A0%E7%85%B2%E4%BB%94%E9%A5%AD/%E5%BE%AE%E6%B3%A2%E7%82%89%E8%85%8A%E8%82%A0%E7%85%B2%E4%BB%94%E9%A5%AD.png",
        "path": "assets/dishes/howtocook/cn-038/1.png",
        "alt": "微波炉腊肠煲仔饭",
        "pageOrder": 1,
        "adjacentText": "# 微波炉腊肠煲仔饭的做法\n\n![微波炉腊肠煲仔饭](微波炉腊肠煲仔饭.png)\n\n这是一道简单快手的粤式风味主食，米饭吸足腊肠油脂后油润咸香，搭配脆嫩青菜和胡萝卜，口感层次丰富。富含碳水化合物、蛋白质和多种维生素，营养均衡。烹饪用微波炉操作，对新手十分友好，预计全程仅需 15 分钟即可享用。\n\n预估烹饪难度：★★\n\n预估卡路里：1039 大卡\n\n## 必备原料和工具\n\n- 工具\n  - 微波炉\n  - 2 个大碗（推荐微波炉专用碗）\n"
      }
    ]
  },
  "sourceLimitations": [
    "上游为微波炉腊肠煲仔饭具体版本，沿用本记录腊味煲仔饭名称及身份字段，实际操作完整采用微波炉路线。",
    "原文明确1人份、预计全程15分钟，保留该预估总时长。",
    "原文仅写微波炉高火，未给出额定功率，不推测瓦数。",
    "青菜仅在步骤出现且未注明用量；额外青菜蘸食的酱油未注明种类及用量，分别列出不补造。",
    "米以200毫升计量，不换算重量；煮饭用水400毫升，淘米及洗菜所用水未量化。",
    "保留原文建议使用微波炉专用碗及用毛巾或隔热手套取碗的工具和操作说明。"
  ]
}),
  c("海南鸡饭", "Hainanese Chicken Rice", "海南/东南亚", "嫩鸡半只约700克；大米300克；鸡汤适量；姜蒜各20克；斑斓叶可选；黄瓜100克；辣椒姜蓉蘸料适量", "1）鸡以姜葱微沸浸煮至熟，冰镇斩件，鸡汤留用。2）鸡油炒香米和姜蒜，用鸡汤煮成饭。3）鸡肉配鸡油饭、黄瓜及辣椒姜蓉蘸料。", "49-hainan-jifan.png", CN_HOME),
  c("担担面", "Dan Dan Noodles", "川菜", "鲜面条300克；猪肉末150克；芽菜50克；芝麻酱30克；辣椒油30毫升；生抽20毫升；香醋10毫升；花椒粉2克；青菜100克", "1）肉末炒酥，加芽菜炒香。2）碗中调入芝麻酱、辣椒油、生抽、醋、花椒粉和少量面汤。3）面条和青菜煮熟入碗，铺肉臊拌匀。", "50-dandan-mian.png"),
  c("炸酱面", "Beijing Zhajiang Noodles", "京菜", "肉丁或肉末150克（原文推荐瘦肉丁）；面条150克挂面或250克普通面条（二选一）；葱15克；菜码总量35克（按喜好通常选4—10种，可选黄瓜、白菜、萝卜等）；食用油10克；豆瓣酱20克；甜面酱20克；蒜适量（原文未注明用量及用法）；水适量（煮面用，原文未注明用量）；凉水适量（过面用，原文未注明用量）", "1）菜码切丝备用。2）葱切碎。油锅烧热，下葱和肉，炒至肉完全熟透（无红色）。3）下豆瓣酱和甜面酱，继续炒至微微粘稠。盛出，得到炸酱。4）取大碗，加凉水备用。5）煮面条至断生（无白芯），盛入第 4 步装有凉水的碗中。6）立即控水捞出，盛入干净的碗中。7）取第 3 步炸酱，倒入碗中，拌匀。然后取第 1 步菜码，倒入碗中，拌匀。", "51-zhajiang-mian.png", "https://github.com/Anduin2017/HowToCook/blob/a2d45c6984dff9ee941da0e7c452f7965965d962/dishes/staple/%E7%82%B8%E9%85%B1%E9%9D%A2.md", null, { totalMinutes: 30 }, 1, {
  "howtocook": {
    "commit": "a2d45c6984dff9ee941da0e7c452f7965965d962",
    "path": "dishes/staple/炸酱面.md",
    "sha256": "dc8249046f936141ba2e95c0a6d206825692c42c5eedb2f443245c174375ed99",
    "rawMarkdown": "# 炸酱面的做法\n\n炸酱面是一道酱香浓郁、面条劲道的传统北京家常面食，搭配清爽菜码，咸甜适口。主要营养来自瘦肉蛋白质和蔬菜维生素，能为人体提供充足能量。做法对新手友好，预计制作时长约 30 分钟，熟练掌握后可通过备菜与炒酱并行进一步缩短时间。\n\n预估烹饪难度：★★★\n\n预估卡路里：1272 大卡\n\n## 必备原料和工具\n\n* 肉丁/肉末\n* 面条（挂面或普通面条）\n* 蒜\n* 菜码（根据个人喜好选择，通常 4-10 种，可选择黄瓜、白菜、萝卜等）\n* 豆瓣酱\n* 甜面酱\n\n## 计算\n\n每次制作前需要确定计划做几份。一份正好够 1 个人食用\n\n每份：\n\n* 肉丁/肉末 150g\n* 如果 *面条* 选择了*挂面*：150g  \n  如果 *面条* 选择了*普通面条*：250g\n* 葱 15g\n* 菜码 总量 35g\n* 食用油 10g\n* 豆瓣酱 20g\n* 甜面酱 20g\n\n## 操作\n\n1. 菜码切丝备用。\n2. 葱切碎。油锅烧热，下葱和肉，炒至肉完全熟透（无红色）\n3. 下豆瓣酱和甜面酱，继续炒至**微微粘稠**。盛出，得到*炸酱*。\n4. 取大碗，加凉水备用。\n5. 煮面条至断生（无白芯），盛入第 4 步装有凉水的碗中。\n6. 立即控水捞出，盛入干净的碗中。\n7. 取第 3 步炸酱，倒入碗中，拌匀。然后取第 1 步菜码，倒入碗中，拌匀。\n\n## 附加内容\n\n* 肉推荐瘦肉丁，口感更好，推荐现买现用。\n* *面条*推荐使用*普通面条*。\n* 面条口感关键在于劲道。勿选龙须等细面。\n* 如有条件（另一个锅）且熟练后，第 2、3 步和 1、4、5、6 步可分时并行执行。\n* 甜咸口个人有爱好，两种酱的配比需要自己迭代优化。\n\n如果您遵循本指南的制作流程而发现有问题或可以改进的流程，请提出 Issue 或 Pull request 。\n",
    "sections": [
      {
        "title": "炸酱面的做法",
        "markdown": "\n炸酱面是一道酱香浓郁、面条劲道的传统北京家常面食，搭配清爽菜码，咸甜适口。主要营养来自瘦肉蛋白质和蔬菜维生素，能为人体提供充足能量。做法对新手友好，预计制作时长约 30 分钟，熟练掌握后可通过备菜与炒酱并行进一步缩短时间。\n\n预估烹饪难度：★★★\n\n预估卡路里：1272 大卡\n\n",
        "level": 1
      },
      {
        "title": "必备原料和工具",
        "markdown": "\n* 肉丁/肉末\n* 面条（挂面或普通面条）\n* 蒜\n* 菜码（根据个人喜好选择，通常 4-10 种，可选择黄瓜、白菜、萝卜等）\n* 豆瓣酱\n* 甜面酱\n\n",
        "level": 2
      },
      {
        "title": "计算",
        "markdown": "\n每次制作前需要确定计划做几份。一份正好够 1 个人食用\n\n每份：\n\n* 肉丁/肉末 150g\n* 如果 *面条* 选择了*挂面*：150g  \n  如果 *面条* 选择了*普通面条*：250g\n* 葱 15g\n* 菜码 总量 35g\n* 食用油 10g\n* 豆瓣酱 20g\n* 甜面酱 20g\n\n",
        "level": 2
      },
      {
        "title": "操作",
        "markdown": "\n1. 菜码切丝备用。\n2. 葱切碎。油锅烧热，下葱和肉，炒至肉完全熟透（无红色）\n3. 下豆瓣酱和甜面酱，继续炒至**微微粘稠**。盛出，得到*炸酱*。\n4. 取大碗，加凉水备用。\n5. 煮面条至断生（无白芯），盛入第 4 步装有凉水的碗中。\n6. 立即控水捞出，盛入干净的碗中。\n7. 取第 3 步炸酱，倒入碗中，拌匀。然后取第 1 步菜码，倒入碗中，拌匀。\n\n",
        "level": 2
      },
      {
        "title": "附加内容",
        "markdown": "\n* 肉推荐瘦肉丁，口感更好，推荐现买现用。\n* *面条*推荐使用*普通面条*。\n* 面条口感关键在于劲道。勿选龙须等细面。\n* 如有条件（另一个锅）且熟练后，第 2、3 步和 1、4、5、6 步可分时并行执行。\n* 甜咸口个人有爱好，两种酱的配比需要自己迭代优化。\n\n如果您遵循本指南的制作流程而发现有问题或可以改进的流程，请提出 Issue 或 Pull request 。\n",
        "level": 2
      }
    ],
    "images": []
  },
  "sourceLimitations": [
    "原文一份供1人食用；预计制作约30分钟，总用时30分钟为约值。",
    "面条按原文择一：挂面150克或普通面条250克；原文推荐普通面条，不推荐龙须等细面。",
    "菜码总量35克，通常依喜好选4—10种，黄瓜、白菜、萝卜仅为举例，不要求全部使用。",
    "蒜列在必备原料，但未量化且操作未交代使用方法，不新增蒜的操作。",
    "煮面用水及过面凉水未注明用量，火力与各段时长未量化，不补造。",
    "原文附加内容含并行执行及个人调整酱比例建议，完整保留，不自行优化配比。",
    "上游无图片，保留的原有展示图不属于本次 HowToCook 来源图片。"
  ]
}),
  c("热干面", "Wuhan Hot Dry Noodles", "湖北", "热干面特有的碱水面250克；小葱10克；酸豆角20克；肉末30克（原文未注明熟制状态及预烹制方法）；蒜水30毫升；肉汤汁30毫升；萝卜干50克；芝麻酱40毫升；辣椒油0—10毫升（按口味可选）；胡椒粉0—10克；酱油5毫升；食盐3克；鸡精0—3克；水90毫升（稀释芝麻酱用）；水适量（煮面用，原文未注明用量）", "1）水煮沸，并加入碱水面，焯烫 25 秒钟捞起。2）撒上食盐、鸡精和胡椒粉。3）芝麻酱用 90ml 水稀释，搅匀，然后加入。4）加入 5ml 酱油，加入 30ml 肉汤汁和蒜水。5）加入萝卜干，肉末，酸豆角，葱花。6）拌均匀后开吃。", "52-regan-mian.png", "https://github.com/Anduin2017/HowToCook/blob/a2d45c6984dff9ee941da0e7c452f7965965d962/dishes/staple/%E7%83%AD%E5%B9%B2%E9%9D%A2.md", null, null, null, {
  "howtocook": {
    "commit": "a2d45c6984dff9ee941da0e7c452f7965965d962",
    "path": "dishes/staple/热干面.md",
    "sha256": "de82449d41b2bab191c727d0415590f39558918b79a8eaa4a0ddcbaff44c403e",
    "rawMarkdown": "# 热干面的做法\n\n热干面是武汉最具代表性的小吃之一，属于鄂菜系。碱水面条筋道爽滑，裹满浓稠的芝麻酱，搭配酸豆角、萝卜干和肉末，咸香微辣，滋味醇厚。主要提供碳水化合物和蛋白质，芝麻酱也富含钙质。制作简单快捷，新手也能轻松上手，从煮面到拌好大约只需十几分钟。\n\n预估烹饪难度：★★★\n\n预估卡路里：1341 大卡\n\n## 必备原料和工具\n\n* 热干面特有的碱水面\n* 小葱\n* 酸豆角\n* 肉末\n* 蒜水\n* 肉汤汁\n* 萝卜干\n* 芝麻酱\n* 辣椒油\n* 胡椒粉\n* 酱油\n* 食盐\n* 鸡精\n\n## 计算\n\n每份：\n\n* 热干面特有的碱水面 (250g)\n* 小葱 (10g)\n* 酸豆角 (20g)\n* 肉末 (30g)\n* 蒜水 (30ml)\n* 肉汤汁 (30ml)\n* 萝卜干 (50g)\n* 芝麻酱 (40ml)\n* 辣椒油 (0-10ml)\n* 胡椒粉(0-10g)\n* 酱油(5ml)\n* 食盐(3g)\n* 鸡精(0-3g)\n\n## 操作\n\n1. 水煮沸，并加入碱水面，焯烫 25 秒钟捞起\n2. 撒上食盐、鸡精和胡椒粉\n3. 芝麻酱用 90ml 水稀释，搅匀，然后加入\n4. 加入 5ml 酱油，加入 30ml 肉汤汁和蒜水\n5. 加入萝卜干，肉末，酸豆角，葱花\n6. 拌均匀后开吃\n\n## 附加内容\n\n* 辣椒油看个人口味添加\n\n如果您遵循本指南的制作流程而发现有问题或可以改进的流程，请提出 Issue 或 Pull request 。\n",
    "sections": [
      {
        "title": "热干面的做法",
        "markdown": "\n热干面是武汉最具代表性的小吃之一，属于鄂菜系。碱水面条筋道爽滑，裹满浓稠的芝麻酱，搭配酸豆角、萝卜干和肉末，咸香微辣，滋味醇厚。主要提供碳水化合物和蛋白质，芝麻酱也富含钙质。制作简单快捷，新手也能轻松上手，从煮面到拌好大约只需十几分钟。\n\n预估烹饪难度：★★★\n\n预估卡路里：1341 大卡\n\n",
        "level": 1
      },
      {
        "title": "必备原料和工具",
        "markdown": "\n* 热干面特有的碱水面\n* 小葱\n* 酸豆角\n* 肉末\n* 蒜水\n* 肉汤汁\n* 萝卜干\n* 芝麻酱\n* 辣椒油\n* 胡椒粉\n* 酱油\n* 食盐\n* 鸡精\n\n",
        "level": 2
      },
      {
        "title": "计算",
        "markdown": "\n每份：\n\n* 热干面特有的碱水面 (250g)\n* 小葱 (10g)\n* 酸豆角 (20g)\n* 肉末 (30g)\n* 蒜水 (30ml)\n* 肉汤汁 (30ml)\n* 萝卜干 (50g)\n* 芝麻酱 (40ml)\n* 辣椒油 (0-10ml)\n* 胡椒粉(0-10g)\n* 酱油(5ml)\n* 食盐(3g)\n* 鸡精(0-3g)\n\n",
        "level": 2
      },
      {
        "title": "操作",
        "markdown": "\n1. 水煮沸，并加入碱水面，焯烫 25 秒钟捞起\n2. 撒上食盐、鸡精和胡椒粉\n3. 芝麻酱用 90ml 水稀释，搅匀，然后加入\n4. 加入 5ml 酱油，加入 30ml 肉汤汁和蒜水\n5. 加入萝卜干，肉末，酸豆角，葱花\n6. 拌均匀后开吃\n\n",
        "level": 2
      },
      {
        "title": "附加内容",
        "markdown": "\n* 辣椒油看个人口味添加\n\n如果您遵循本指南的制作流程而发现有问题或可以改进的流程，请提出 Issue 或 Pull request 。\n",
        "level": 2
      }
    ],
    "images": []
  },
  "sourceLimitations": [
    "原文从煮面到拌好大约十几分钟，没有明确总分钟数，不设置总用时；每份未注明人数，不推测。",
    "原文肉末30克未注明预先烹制方法或熟制状态，不擅自新增炒肉步骤；肉汤汁、蒜水未提供制作方法。",
    "保留碱水面焯烫25秒的原操作，原文未说明面条是否预熟，不自行更改时长。",
    "芝麻酱40毫升使用90毫升水稀释；另有煮面用水，原文未注明其用量。",
    "蒜水与肉汤汁各30毫升依据计算清单保留；辣椒油0—10毫升按口味可选，附加原文完整保留。",
    "上游无图片，保留的原有展示图不属于本次 HowToCook 来源图片。"
  ]
}),
  c("重庆小面", "Chongqing Spicy Noodles", "重庆", "鲜面条300克；青菜100克；辣椒油30毫升；生抽20毫升；香醋10毫升；花椒粉2克；蒜水20毫升；猪油5克；花生碎适量", "1）碗中放辣椒油、生抽、醋、花椒粉、蒜水和猪油，冲入热汤。2）面条和青菜煮熟。3）捞入调料碗，撒花生碎和葱花。", "53-chongqing-xiaomian.png", CN_HOME),
  c("小笼包", "Soup Dumplings", "江南", "中筋面粉250克；温水130毫升；猪肉馅300克；皮冻180克；葱姜水80毫升；生抽15毫升；糖5克；盐4克", "1）面粉加水揉成光滑面团，醒30分钟。2）肉馅分次打入葱姜水调味，拌入切碎皮冻。3）擀薄皮包馅捏褶，水开大火蒸8分钟。", "54-xiaolongbao.png", CN_HOME),
  c("韭菜猪肉饺子", "Pork and Chive Dumplings", "北方家常", "面粉200克；面粉适量（手、桌面、擀面杖及面团防粘用，原文未注明额外量）；冷水150毫升（和面用，分次加入并按面团状态停止）；芝麻香油2—3毫升（和面用）；瘦肉末250克；肥肉末20克（不喜可不加）；姜3克（馅料用）；葱15克；盐3克（原文未交代添加时机）；蚝油2毫升；香油2毫升（馅料用）；生抽2毫升；鸡蛋1个（馅料仅用蛋清）；韭菜适量（原文未注明用量）；水约锅高3/4（煮饺用）；冷水每次50毫升（煮饺时加三次）；水适量（清洗韭菜用，原文未注明用量）；黑醋10毫升（可选蘸料，附加建议10—20毫升，姜丝蘸料示例用20毫升）；姜1小块50克（可选蘸料）；香油2滴（可选蘸料，附加建议1—3滴）；大蒜或蒜泥3瓣/人（可选蘸料）", "1）制作饺子皮：盆中加入和面用的200克面粉。2）加入芝麻香油。3）面粉中央挖小洞。4）分 4-5 次加入水，并搅和，至出现碎末状的稍微干燥面团。5）取消加水，用手将面团压实。6）面团压实至可把盆周围的面粉纳入即可，此步骤为面光盆光。7）将面团置于桌上，盆倒扣于桌上，环境温度为 25 度，使面团醒发约 45 分钟。8）醒发完成后，将面团搓成条状，合成一团，再次搓成条，重复 3 次。9）擀成条状，切成 20 份均匀大小面团，并搓成直径约 3-3.5cm 的球状。10）压扁面团，在手上，桌上，擀面杖上，及面团上撒上面粉，此步骤防止面团发粘。11）用擀面杖将面团擀平，约 8cm 直径，厚约 2mm，中间略微比四周厚 1mm。12）拌馅：猪肉去皮，保留部分肥肉，切成小块。13）用菜刀（建议两把）将猪肉剁成肉沫，放入碗中。14）葱、姜切成末，放入肉碗中搅拌均匀。15）韭菜洗净，切短至 3mm 以下长度。16）韭菜和肉沫混合，加入蚝油、生抽、香油各 2ml，加入一个鸡蛋的蛋清，用手混合搅拌均匀。17）放置 30 分钟即可开始包饺子。18）包饺子：左手上放面皮，放饺子馅一面尽量不要粘到面粉，防止无法合拢。19）右手用筷子夹约面皮 1/2 直径的馅。20）沿饺子皮圆周进行合拢，捏实，个人吃无需捏花，饺子皮不漏即可。21）煮饺子：使用可放下 20 只饺子的锅，或分批量煮。煮水饺不需要盖锅盖，加三次水是为了避免饺子一直处于沸腾状态导致表皮破损变成面片。22）烧水，水约 3/4 锅的高度。23）大火烧开水后放入饺子，调至中火。24）第一次放入饺子，且水冒泡后，锅边加入 50ml 冷水（重复此步骤两次）。25）第三次水开后加入冷水 50ml，水开后调至小火等 60秒 即可出锅。", "55-jiucai-zhurou-jiaozi.png", "https://github.com/Anduin2017/HowToCook/blob/a2d45c6984dff9ee941da0e7c452f7965965d962/dishes/staple/%E6%89%8B%E5%B7%A5%E6%B0%B4%E9%A5%BA.md", null, { totalMinutes: 180 }, 1, {
  "howtocook": {
    "commit": "a2d45c6984dff9ee941da0e7c452f7965965d962",
    "path": "dishes/staple/手工水饺.md",
    "sha256": "7f8d99109472b07cb8459259fbfde9c97d8294e811c6a8f3b539e44110268adc",
    "rawMarkdown": "# 手工水饺的做法\n\n手工水饺是一道中式经典主食，皮薄馅大、鲜美多汁，饱腹又可以根据个人口味随意调味。猪肉馅提供优质蛋白质和脂肪，搭配韭菜还能补充维生素与膳食纤维。这道菜品对新手来说难度较高，需要掌握和面、擀皮、调馅和煮饺的火候，预计制作时间约 3 小时。\n\n预估烹饪难度：★★★★★\n\n预估卡路里：1313 大卡\n\n## 必备原料和工具\n\n- 擀面杖\n- 面粉\n- 冷水\n- 直径 30cm 以上的盆\n- 芝麻香油\n\n## 计算\n\n-单人，约 20 只\n\n每份：\n\n- 面粉 200g\n- 冷水 150ml\n- 芝麻香油 2-3ml\n- 瘦肉末 250g\n- 肥肉末 20g #不喜可不加\n- 姜 3g\n- 葱 15g\n- 盐 3g\n- 蚝油 2ml\n- 香油 2ml\n- 生抽 2ml\n- 鸡蛋 1 个\n\n## 操作\n\n### 制作饺子皮\n\n1. 盆中加入所有面粉\n2. 加入芝麻香油\n3. 面粉中央挖小洞\n4. 分 4-5 次加入水，并搅和，当出现碎末状的稍微干燥面团时\n5. 取消加水，用手将面团压实\n6. 面团压实至可把盆周围的面粉纳入即可，此步骤为面光盆光\n7. 将面团置于桌上，盆倒扣于桌上，环境温度为 25 度，使面团醒发约 45 分钟\n8. 醒发完成后，将面团搓成条状，合成一团，再次搓成条，重复 3 次\n9. 擀成条状，切成 20 份均匀大小面团，并搓成直径约 3-3.5cm 的球状\n10. 压扁面团，在手上，桌上，擀面杖上，及面团上撒上面粉，此步骤防止面团发粘\n11. 用擀面杖将面团擀平，约 8cm 直径，厚约 2mm，中间略微比四周厚 1mm\n\n### 拌馅\n\n1. 猪肉去皮，保留部分肥肉,切成小块\n2. 菜刀（建议两把）将猪肉剁成肉沫，放入碗中\n3. 葱、姜切成末，放入肉碗中搅拌均匀\n4. 韭菜洗净，切短至 3mm 以下长度\n5. 韭菜和肉沫混合，加入蚝油、生抽、香油各 2ml，加入一个鸡蛋的蛋清，用手混合搅拌均匀\n6. 放置 30 分钟即可开始包饺子\n\n### 包饺子\n\n1. 左手上放面皮，放饺子馅一面尽量不要粘到面粉，防止无法合拢\n2. 右手用筷子夹约面皮 1/2 直径的馅\n3. 沿饺子皮圆周进行合拢，捏实，个人吃无需捏花，饺子皮不漏即可\n\n### 煮饺子\n\n1. 使用可放下 20 只饺子的锅，或分批量煮\n2. 烧水，水约 3/4 锅的高度\n3. 大火烧开水后放入饺子，调至中火\n4. 第一次放入饺子，且水冒泡后，锅边加入 50ml 冷水（重复此步骤两次）\n5. 第三次水开后加入冷水 50ml，水开后调至小火等 60s 即可出锅\n\n## 附加内容\n\n- 煮水饺不需要盖锅盖，加三次水就是为了不让饺子一直处于沸腾状态导致表皮破损变成面片。\n\n这道菜存在一些补充做法，包括但不限于：\n\n额外添加下列材料：\n\n* 黑醋 10ml\n* 姜 一小块 50 克\n* 香油 2 滴\n* 大蒜/蒜泥 3 瓣/人\n\n* 考虑搭配黑醋食用。建议用量：10-20ml。\n* 考虑姜切丝，在小碗加入 20ml 的黑醋与姜丝搅拌当蘸料，味道更丰富。\n* 考虑搭配黑醋时加入 1~3 滴香油，搅拌当蘸料。\n* 考虑搭配黑醋时加入砸好的蒜泥，搅拌当蘸料。（口腔内会残留蒜味，若饭后需要与他人面对面谈话建议放弃或清洁口腔）\n\n如果您遵循本指南的制作流程而发现有问题或可以改进的流程，请提出 Issue 或 Pull request 。\n",
    "sections": [
      {
        "title": "手工水饺的做法",
        "markdown": "\n手工水饺是一道中式经典主食，皮薄馅大、鲜美多汁，饱腹又可以根据个人口味随意调味。猪肉馅提供优质蛋白质和脂肪，搭配韭菜还能补充维生素与膳食纤维。这道菜品对新手来说难度较高，需要掌握和面、擀皮、调馅和煮饺的火候，预计制作时间约 3 小时。\n\n预估烹饪难度：★★★★★\n\n预估卡路里：1313 大卡\n\n",
        "level": 1
      },
      {
        "title": "必备原料和工具",
        "markdown": "\n- 擀面杖\n- 面粉\n- 冷水\n- 直径 30cm 以上的盆\n- 芝麻香油\n\n",
        "level": 2
      },
      {
        "title": "计算",
        "markdown": "\n-单人，约 20 只\n\n每份：\n\n- 面粉 200g\n- 冷水 150ml\n- 芝麻香油 2-3ml\n- 瘦肉末 250g\n- 肥肉末 20g #不喜可不加\n- 姜 3g\n- 葱 15g\n- 盐 3g\n- 蚝油 2ml\n- 香油 2ml\n- 生抽 2ml\n- 鸡蛋 1 个\n\n",
        "level": 2
      },
      {
        "title": "操作",
        "markdown": "\n",
        "level": 2
      },
      {
        "title": "制作饺子皮",
        "markdown": "\n1. 盆中加入所有面粉\n2. 加入芝麻香油\n3. 面粉中央挖小洞\n4. 分 4-5 次加入水，并搅和，当出现碎末状的稍微干燥面团时\n5. 取消加水，用手将面团压实\n6. 面团压实至可把盆周围的面粉纳入即可，此步骤为面光盆光\n7. 将面团置于桌上，盆倒扣于桌上，环境温度为 25 度，使面团醒发约 45 分钟\n8. 醒发完成后，将面团搓成条状，合成一团，再次搓成条，重复 3 次\n9. 擀成条状，切成 20 份均匀大小面团，并搓成直径约 3-3.5cm 的球状\n10. 压扁面团，在手上，桌上，擀面杖上，及面团上撒上面粉，此步骤防止面团发粘\n11. 用擀面杖将面团擀平，约 8cm 直径，厚约 2mm，中间略微比四周厚 1mm\n\n",
        "level": 3
      },
      {
        "title": "拌馅",
        "markdown": "\n1. 猪肉去皮，保留部分肥肉,切成小块\n2. 菜刀（建议两把）将猪肉剁成肉沫，放入碗中\n3. 葱、姜切成末，放入肉碗中搅拌均匀\n4. 韭菜洗净，切短至 3mm 以下长度\n5. 韭菜和肉沫混合，加入蚝油、生抽、香油各 2ml，加入一个鸡蛋的蛋清，用手混合搅拌均匀\n6. 放置 30 分钟即可开始包饺子\n\n",
        "level": 3
      },
      {
        "title": "包饺子",
        "markdown": "\n1. 左手上放面皮，放饺子馅一面尽量不要粘到面粉，防止无法合拢\n2. 右手用筷子夹约面皮 1/2 直径的馅\n3. 沿饺子皮圆周进行合拢，捏实，个人吃无需捏花，饺子皮不漏即可\n\n",
        "level": 3
      },
      {
        "title": "煮饺子",
        "markdown": "\n1. 使用可放下 20 只饺子的锅，或分批量煮\n2. 烧水，水约 3/4 锅的高度\n3. 大火烧开水后放入饺子，调至中火\n4. 第一次放入饺子，且水冒泡后，锅边加入 50ml 冷水（重复此步骤两次）\n5. 第三次水开后加入冷水 50ml，水开后调至小火等 60s 即可出锅\n\n",
        "level": 3
      },
      {
        "title": "附加内容",
        "markdown": "\n- 煮水饺不需要盖锅盖，加三次水就是为了不让饺子一直处于沸腾状态导致表皮破损变成面片。\n\n这道菜存在一些补充做法，包括但不限于：\n\n额外添加下列材料：\n\n* 黑醋 10ml\n* 姜 一小块 50 克\n* 香油 2 滴\n* 大蒜/蒜泥 3 瓣/人\n\n* 考虑搭配黑醋食用。建议用量：10-20ml。\n* 考虑姜切丝，在小碗加入 20ml 的黑醋与姜丝搅拌当蘸料，味道更丰富。\n* 考虑搭配黑醋时加入 1~3 滴香油，搅拌当蘸料。\n* 考虑搭配黑醋时加入砸好的蒜泥，搅拌当蘸料。（口腔内会残留蒜味，若饭后需要与他人面对面谈话建议放弃或清洁口腔）\n\n如果您遵循本指南的制作流程而发现有问题或可以改进的流程，请提出 Issue 或 Pull request 。\n",
        "level": 2
      }
    ],
    "images": []
  },
  "sourceLimitations": [
    "上游标题为手工水饺，采用其中猪肉韭菜馅做法对应本记录，完整保留手工和面、擀皮、拌馅、包制及煮制路线。",
    "原文单人约20只，预计制作约3小时；servings为1人，总用时180分钟为约值。",
    "韭菜在方法出现但未给用量；盐3克在计算出现但操作未交代添加时机，不新增操作。",
    "面粉200克之外的防粘撒粉用量未说明，冷水150毫升和分4—5次按面团状态停止加水的原规则均保留，不强制全部用完。",
    "煮饺水约锅高3/4，不换算毫升；三次每次50毫升冷水依原文及附加内容保留，不额外改变煮制参数。",
    "可选蘸料黑醋原文材料列10毫升，建议10—20毫升，姜丝蘸料示例20毫升；香油材料列2滴，建议1—3滴，按原文保留不同说明，不合并为同时必需。",
    "原文没有来源照片，保留的原有展示图不属于本次 HowToCook 来源图片。"
  ]
}),
  c("馄饨", "Pork Wontons", "江南家常", "未过期的速冻馄饨12—20个（自带调味料包更佳）；水约600毫升（一人份，刚好没过所有馄饨的水量乘2—3倍）；水适量（下锅前可选过水用，原文未注明用量）；调味料包按速冻馄饨自带量（有料包时使用）；盐适量（无调味料包时，按口味）；鸡精适量（无调味料包时，按口味）；胡椒粉适量（无调味料包时，按口味）；香油适量（无调味料包时，按口味）；香菜1根（可选，操作取5—8片叶）；水煮荷包蛋适量（出锅后可选搭配，原文未注明数量）", "1）烧开水：将水倒入电饭煲中，按炖或煮的模式运行 35 分钟，此时揭开电饭煲应看到水为沸腾状态。2）下馄饨：将速冻馄饨小心放入水中，注意不要烫伤。3）放入电饭煲前可以适当用水过一下。4）如果馄饨有调料包，此时可一并加入水中。5）煮馄饨：盖上电饭煲，按同样炖或煮的模式运行 20 分钟。6）盛馄饨：将所有馄饨连同能没过所有馄饨的水一同盛入碗中。7）如果此前没有加入调料包，此时可按自身口味轻重加入盐、鸡精、胡椒粉、香油调味。8）也可撒上 5~8 片香菜叶佐味（仅适用于对香菜味道不敏感的人）。", "76-huntun.png", "https://github.com/Anduin2017/HowToCook/blob/a2d45c6984dff9ee941da0e7c452f7965965d962/dishes/semi-finished/%E9%80%9F%E5%86%BB%E9%A6%84%E9%A5%A8.md", null, { totalMinutes: 55 }, 1, {
  "howtocook": {
    "commit": "a2d45c6984dff9ee941da0e7c452f7965965d962",
    "path": "dishes/semi-finished/速冻馄饨.md",
    "sha256": "09e3d026b9bffacc414465cb0748550f7c791a87501c5d0edd737498f25e8f3b",
    "rawMarkdown": "# 速冻馄饨的做法\n\n速冻馄饨皮薄馅嫩，汤清味鲜，是一道便捷的家常面食。主要提供碳水化合物和蛋白质，便于快速补充能量。做法简单，对新手非常友好，使用电饭煲即可完成，从烧水到出锅大约需要 55 分钟。\n\n预估烹饪难度：★★\n\n预估卡路里：540 大卡\n\n## 必备原料和工具\n\n* 未过期的一袋速冻馄饨（自带调味料包更佳）\n* 电饭煲（推荐品牌小米智能电饭煲）\n* 盐（速冻馄饨无调味料包时）\n* 鸡精（速冻馄饨无调味料包时）\n* 胡椒粉（速冻馄饨无调味料包时）\n* 香油（速冻馄饨无调味料包时）\n* 香菜 1 根（可选）\n\n> 注意，使用的烹饪工具不同速冻馄饨可能有不同的做法，这里仅介绍使用「电饭煲」的做法。\n\n## 计算\n\n* 一般一个人一顿可以食用 12～20 个馄饨\n* 当所有馄饨放入电饭煲中时，能刚好没过所有馄饨的水乘以 2~3 倍的水量（一人食用的馄饨约需要 600ml 水量）\n\n## 操作\n\n### 烧开水\n\n1. 将水倒入电饭煲中，按炖或煮的模式运行 35 分钟，此时揭开电饭煲应看到水为沸腾状态。\n\n### 下馄饨\n\n1. 将速冻馄饨小心放入水中，注意不要烫伤。\n2. 放入电饭煲前可以适当用水过一下。\n3. 如果馄饨有调料包，此时可一并加入水中。\n\n### 煮馄饨\n\n1. 盖上电饭煲，按同样炖或煮的模式运行 20 分钟。\n\n### 盛馄饨\n\n1. 将所有馄饨连同能没过所有馄饨的水一同盛入碗中。\n2. 如果此前没有加入调料包，此时可按自身口味轻重加入盐、鸡精、胡椒粉、香油调味。\n3. 也可撒上 5~8 片香菜叶佐味（仅适用于对香菜味道不敏感的人）。\n\n## 附加内容\n\n* 出锅后也可以加入水煮荷包蛋（[太阳蛋](../../dishes/breakfast/太阳蛋.md)）一起食用。\n\n如果您遵循本指南的制作流程而发现有问题或可以改进的流程，请提出 Issue 或 Pull request 。\n",
    "sections": [
      {
        "title": "速冻馄饨的做法",
        "markdown": "\n速冻馄饨皮薄馅嫩，汤清味鲜，是一道便捷的家常面食。主要提供碳水化合物和蛋白质，便于快速补充能量。做法简单，对新手非常友好，使用电饭煲即可完成，从烧水到出锅大约需要 55 分钟。\n\n预估烹饪难度：★★\n\n预估卡路里：540 大卡\n\n",
        "level": 1
      },
      {
        "title": "必备原料和工具",
        "markdown": "\n* 未过期的一袋速冻馄饨（自带调味料包更佳）\n* 电饭煲（推荐品牌小米智能电饭煲）\n* 盐（速冻馄饨无调味料包时）\n* 鸡精（速冻馄饨无调味料包时）\n* 胡椒粉（速冻馄饨无调味料包时）\n* 香油（速冻馄饨无调味料包时）\n* 香菜 1 根（可选）\n\n> 注意，使用的烹饪工具不同速冻馄饨可能有不同的做法，这里仅介绍使用「电饭煲」的做法。\n\n",
        "level": 2
      },
      {
        "title": "计算",
        "markdown": "\n* 一般一个人一顿可以食用 12～20 个馄饨\n* 当所有馄饨放入电饭煲中时，能刚好没过所有馄饨的水乘以 2~3 倍的水量（一人食用的馄饨约需要 600ml 水量）\n\n",
        "level": 2
      },
      {
        "title": "操作",
        "markdown": "\n",
        "level": 2
      },
      {
        "title": "烧开水",
        "markdown": "\n1. 将水倒入电饭煲中，按炖或煮的模式运行 35 分钟，此时揭开电饭煲应看到水为沸腾状态。\n\n",
        "level": 3
      },
      {
        "title": "下馄饨",
        "markdown": "\n1. 将速冻馄饨小心放入水中，注意不要烫伤。\n2. 放入电饭煲前可以适当用水过一下。\n3. 如果馄饨有调料包，此时可一并加入水中。\n\n",
        "level": 3
      },
      {
        "title": "煮馄饨",
        "markdown": "\n1. 盖上电饭煲，按同样炖或煮的模式运行 20 分钟。\n\n",
        "level": 3
      },
      {
        "title": "盛馄饨",
        "markdown": "\n1. 将所有馄饨连同能没过所有馄饨的水一同盛入碗中。\n2. 如果此前没有加入调料包，此时可按自身口味轻重加入盐、鸡精、胡椒粉、香油调味。\n3. 也可撒上 5~8 片香菜叶佐味（仅适用于对香菜味道不敏感的人）。\n\n",
        "level": 3
      },
      {
        "title": "附加内容",
        "markdown": "\n* 出锅后也可以加入水煮荷包蛋（[太阳蛋](../../dishes/breakfast/太阳蛋.md)）一起食用。\n\n如果您遵循本指南的制作流程而发现有问题或可以改进的流程，请提出 Issue 或 Pull request 。\n",
        "level": 2
      }
    ],
    "images": []
  },
  "sourceLimitations": [
    "上游为电饭煲速冻馄饨具体版本，不含现包馄饨皮和肉馅的制作方法，不补造包制流程。",
    "原文一般一人一顿12—20个馄饨、从烧水到出锅约55分钟，保留1人份及预估总时长55分钟。",
    "水量按原文为刚好没过所有馄饨的水量乘2—3倍，一人份约600毫升；过水用水未量化。",
    "有调味料包时煮制中加入，无调味料包时盛碗后按口味用盐、鸡精、胡椒粉和香油调味，各调味料未给定量。",
    "香菜原料列可选1根，操作用5—8片叶；可选水煮荷包蛋仅链接独立太阳蛋教程，未提供本菜内的煮蛋做法或数量。",
    "原文先写下馄饨，再写放入前可过水，规范步骤原序保留该前置说明，不擅改来源操作顺序。",
    "原文只适用于电饭煲炖或煮模式，未提供其他工具的做法。",
    "上游无图片，保留的原有展示图不属于本次 HowToCook 来源图片。"
  ]
}),
  c("葱油拌面", "Scallion Oil Noodles", "上海", "小葱100克（葱油酱汁基础量，原文称约够3—4份）；食用油100毫升（葱油酱汁基础量）；生抽60毫升（葱油酱汁基础量）；老抽20毫升（葱油酱汁基础量）；白糖15克（葱油酱汁基础量）；干面条80克（每份，约相当于150克湿面条）；葱油酱汁15毫升（每份，取前述自制酱汁）；饮用水1000毫升（每份煮面用）；水适量（清洗小葱用，原文未注明用量）", "1）制作葱油酱汁：将小葱洗净，切成长段（约 5-7 cm）。葱白和葱绿可以分开。2）锅中加入 100 ml 食用油，中火烧热。先放入葱白段，煸炒至微黄。3）加入葱绿段，转小火，继续煸炒。4）保持小火，耐心煸炒约 15-20 分钟，直至葱段变得焦黄酥脆。5）将焦黄的葱段捞出（葱油保留在锅中）。6）在锅中的葱油中，加入 60 ml 生抽，20 ml 老抽，15 g 白糖。小火加热并搅拌，约 1 分钟，至糖溶解，酱汁混合均匀。立即关火。将制作好的葱油酱汁倒入容器中，放凉后密封保存。7）煮面条（按份操作）：取 80 g 干面条。8）锅中加入 1000 ml 饮用水，大火烧开。9）放入面条，根据面条包装说明，煮至熟透（通常 3-8 分钟，以包装说明为准）。10）将煮好的面条捞出，沥干水分，放入碗中。11）混合拌面（按份操作）：在装有面条的碗中，加入 15 ml 之前做好的葱油酱汁。12）可以加入之前炸好的葱段（可选）。13）用筷子快速搅拌均匀，即可食用。", "77-congyou-ban-mian.png", "https://github.com/Anduin2017/HowToCook/blob/a2d45c6984dff9ee941da0e7c452f7965965d962/dishes/staple/%E8%91%B1%E6%B2%B9%E6%8B%8C%E9%9D%A2.md", null, { totalMinutes: 20 }, null, {
  "howtocook": {
    "commit": "a2d45c6984dff9ee941da0e7c452f7965965d962",
    "path": "dishes/staple/葱油拌面.md",
    "sha256": "353b5c30fed110a891282bb890f5690d3a09dcb97edfdee8b67a06dd250a2c5a",
    "rawMarkdown": "# 葱油拌面的做法\n\n葱油拌面是一道经典的上海家常面点，以独特的葱油香味著称，做法简单快捷。富含碳水化合物和脂肪，能快速补充能量。一般初学者只需 20 分钟即可完成，非常适合作为日常快手晚餐。\n\n预估烹饪难度：★★\n\n预估卡路里：355 大卡\n\n## 必备原料和工具\n\n- 干面条\n- 小葱\n- 生抽\n- 老抽\n- 白糖\n\n## 计算\n\n葱油酱汁可以一次制作多份的量，分次使用。以下提供制作葱油酱汁的基础量，以及每份面条所需的葱油酱汁量。\n\n葱油酱汁基础量 （约够 3-4 份使用）：\n\n- 小葱 100 g\n- 食用油 100 ml\n- 生抽 60 ml\n- 老抽 20 ml\n- 白糖 15 g\n\n每份面条：\n\n- 干面条 80 g （约相当于 150 g 湿面条）\n- 葱油酱汁 15 ml\n\n## 操作\n\n### 制作葱油酱汁\n\n1. 将 小葱 洗净，切成长段（约 5-7 cm）。葱白和葱绿可以分开。\n2. 锅中加入 100 ml 食用油，中火烧热。先放入葱白段，煸炒至微黄。\n3. 加入葱绿段，转小火，继续煸炒。\n4. 保持小火，耐心煸炒约 **15-20 分钟**，直至葱段变得焦黄酥脆。\n5. 将焦黄的葱段捞出（葱油保留在锅中）。\n6. 在锅中的葱油中，加入 60 ml 生抽，20 ml 老抽，15 g 白糖。小火加热并搅拌，约 **1 分钟**，至糖溶解，酱汁混合均匀。立即关火。将制作好的葱油酱汁倒入容器中，放凉后密封保存。\n\n### 煮面条 （按份操作）\n\n1. 取 80 g 干面条。\n2. 锅中加入 1000 ml 饮用水，大火烧开。\n3. 放入 面条，根据面条包装说明，煮至熟透（通常 **3-8 分钟**，以包装说明为准）。\n4. 将 煮好的 面条 捞出，沥干水分，放入碗中。\n\n### 混合拌面 （按份操作）\n\n1. 在装有 面条 的碗中，加入 15 ml 之前做好的 葱油酱汁。\n2. 可以加入之前炸好的葱段（可选）。\n3. 用 筷子 快速搅拌均匀，即可食用。\n\n## 附加内容\n\n- 炸葱油时，火一定要小，要有耐心，才能将葱的香味充分炸出。\n- 制作好的葱油酱汁可以冷藏保存一段时间，下次吃面时直接取用。\n\n如果您遵循本指南的制作流程而发现有问题或可以改进的流程，请提出 Issue 或 Pull request 。\n",
    "sections": [
      {
        "title": "葱油拌面的做法",
        "markdown": "\n葱油拌面是一道经典的上海家常面点，以独特的葱油香味著称，做法简单快捷。富含碳水化合物和脂肪，能快速补充能量。一般初学者只需 20 分钟即可完成，非常适合作为日常快手晚餐。\n\n预估烹饪难度：★★\n\n预估卡路里：355 大卡\n\n",
        "level": 1
      },
      {
        "title": "必备原料和工具",
        "markdown": "\n- 干面条\n- 小葱\n- 生抽\n- 老抽\n- 白糖\n\n",
        "level": 2
      },
      {
        "title": "计算",
        "markdown": "\n葱油酱汁可以一次制作多份的量，分次使用。以下提供制作葱油酱汁的基础量，以及每份面条所需的葱油酱汁量。\n\n葱油酱汁基础量 （约够 3-4 份使用）：\n\n- 小葱 100 g\n- 食用油 100 ml\n- 生抽 60 ml\n- 老抽 20 ml\n- 白糖 15 g\n\n每份面条：\n\n- 干面条 80 g （约相当于 150 g 湿面条）\n- 葱油酱汁 15 ml\n\n",
        "level": 2
      },
      {
        "title": "操作",
        "markdown": "\n",
        "level": 2
      },
      {
        "title": "制作葱油酱汁",
        "markdown": "\n1. 将 小葱 洗净，切成长段（约 5-7 cm）。葱白和葱绿可以分开。\n2. 锅中加入 100 ml 食用油，中火烧热。先放入葱白段，煸炒至微黄。\n3. 加入葱绿段，转小火，继续煸炒。\n4. 保持小火，耐心煸炒约 **15-20 分钟**，直至葱段变得焦黄酥脆。\n5. 将焦黄的葱段捞出（葱油保留在锅中）。\n6. 在锅中的葱油中，加入 60 ml 生抽，20 ml 老抽，15 g 白糖。小火加热并搅拌，约 **1 分钟**，至糖溶解，酱汁混合均匀。立即关火。将制作好的葱油酱汁倒入容器中，放凉后密封保存。\n\n",
        "level": 3
      },
      {
        "title": "煮面条 （按份操作）",
        "markdown": "\n1. 取 80 g 干面条。\n2. 锅中加入 1000 ml 饮用水，大火烧开。\n3. 放入 面条，根据面条包装说明，煮至熟透（通常 **3-8 分钟**，以包装说明为准）。\n4. 将 煮好的 面条 捞出，沥干水分，放入碗中。\n\n",
        "level": 3
      },
      {
        "title": "混合拌面 （按份操作）",
        "markdown": "\n1. 在装有 面条 的碗中，加入 15 ml 之前做好的 葱油酱汁。\n2. 可以加入之前炸好的葱段（可选）。\n3. 用 筷子 快速搅拌均匀，即可食用。\n\n",
        "level": 3
      },
      {
        "title": "附加内容",
        "markdown": "\n- 炸葱油时，火一定要小，要有耐心，才能将葱的香味充分炸出。\n- 制作好的葱油酱汁可以冷藏保存一段时间，下次吃面时直接取用。\n\n如果您遵循本指南的制作流程而发现有问题或可以改进的流程，请提出 Issue 或 Pull request 。\n",
        "level": 2
      }
    ],
    "images": []
  },
  "sourceLimitations": [
    "原文酱汁基础量标称约够3—4份，另列每份面条用酱汁15毫升；基础量与每份用量的关系不清，不自行换算或改写基础量为单份。",
    "食材清单同时保留整批酱汁基础量及每份面条量，15毫升葱油酱汁来自前述自制酱汁，不需另购或全部一次拌入。",
    "原介绍一般20分钟完成，但操作另列炸葱15—20分钟、调酱约1分钟及煮面通常3—8分钟，存在原文估计不一致，总用时20分钟保留原介绍，不自行相加。",
    "每份未注明供几人食用，不设置人数；干面80克约相当于湿面150克保留原文对照。",
    "小葱清洗用水未给用量；冷藏保存一段时间未给期限，不补造。",
    "上游无图片，保留的原有展示图不属于本次 HowToCook 来源图片。"
  ]
}),
  c("炒河粉", "Beef Chow Fun", "粤菜", "河粉250克/人（食量大可再加100克/人，原文写向下取整）；猪肉或牛肉适量（原文未注明用量）；黄瓜丝30克/人；面筋块30克/人；绿豆芽30克/人；鸡蛋1个/人；蒜瓣2个/人；小葱1根/人；河粉料20克/人（或自配盐10克、味精2克、孜然粉3克，二选一）；淀粉按每100克肉配5克；老抽10毫升（每250克河粉）；生抽15毫升（每250克河粉）；胡椒粉适量（原文未注明用量）；食用油20克（炒河粉用，原文称高血压人群可降低用量）；食用油适量（暖锅后倒出，原文未注明用量）；水适量（煮豆芽及清洗用，原文未注明用量）；凉水适量（豆芽过凉用，原文未注明用量）；辣椒适量（可选，按口味，原文未注明用量）", "1）准备工作：小葱切碎（葱白和葱叶分开）、蒜瓣拍碎，放在案板上备用。2）打碎鸡蛋，捞一点蛋清到一只碗中，剩下的放入另一只碗中备用。3）将绿豆芽放入锅中，大火煮 60 秒。豆芽捞出，过凉水，放入盘中备用。4）黄瓜切丝放入盘中备用，可和豆芽放在一起。5）处理面筋，单独放入一个盘中。6）肉切细条状，加入淀粉与刚刚碗中的鸡蛋清、胡椒粉，顺时针拌匀。7）注：超市购买来的凉皮表面一般会有食用油，可以使用自来水清洗。面筋同样。8）注：清洗面筋之后，请用手将面筋中的大量水分挤出（不需过于用力）。9）热锅炒肉：加入食用油，锅热倒出。10）倒入处理好的肉，翻炒均匀至变色，倒入碗中备用。11）炒制河粉：趁锅热，加入 20g 食用油（高血压人群可降低用量），倒入葱白、蒜爆炒出香。12）加入河粉，淋入老抽提色，翻炒均匀后再加入河粉炒料，继续翻炒。13）河粉即将透明时，放入炒制好的肉丝与面筋，并加入生抽提鲜，简单翻炒两次。14）加入豆芽与黄瓜丝，翻炒至河粉完全透明。15）关火！16）最终步骤：撒入葱叶点缀，把锅端起。17）倒入盘中，开始干饭。", "78-chao-hefen.png", "https://github.com/Anduin2017/HowToCook/blob/a2d45c6984dff9ee941da0e7c452f7965965d962/dishes/staple/%E7%82%92%E6%B2%B3%E7%B2%89.md", null, { totalMinutes: 30 }, 1, {
  "howtocook": {
    "commit": "a2d45c6984dff9ee941da0e7c452f7965965d962",
    "path": "dishes/staple/炒河粉.md",
    "sha256": "ce1db3a27306600f6706b4b02094f1e9fb2a3026eefce5be06f5e217d2edfca0",
    "rawMarkdown": "# 炒河粉的做法\n\n炒河粉是一道流行于广东地区的经典小吃，讲究镬气十足、干香爽滑，河粉软韧透亮，搭配肉丝、豆芽和黄瓜丝，口感层次丰富。主要提供碳水化合物和蛋白质，蔬菜的加入也补充了维生素与膳食纤维。按本菜谱操作难度适中，即便新手只要备齐材料也能尝试，整个制作过程约需 30 分钟即可端上餐桌。\n\n预估烹饪难度：★★★★\n\n预估卡路里：822 大卡\n\n## 必备原料和工具\n\n* 炒河粉、猪肉/牛肉\n* 炒料：盐、味精、老抽、生抽、孜然粉（或直接用河粉料）\n* 其他调味料：胡椒粉\n* 黄瓜、面筋块、绿豆芽、鸡蛋、蒜瓣、小葱、淀粉\n* 盆、盘子\n\n> 建议购买方案：在某宝、某买菜等平台上购买袋装鲜河粉，一般是1斤起售，冷藏保质期可达到两周，而且送河粉炒料！\n\n## 计算\n\n* 河粉用量为 250 g/人，如果需要更大食量，可再加 100g/人 向下取整。\n* 黄瓜丝 30g/人、面筋块 30g/人、绿豆芽 30g/人、打碎的鸡蛋 1 个/人。\n* 拍碎的蒜瓣 2 个/人、小葱 1 根/人\n* 河粉料可按 20g/人添加，若自行准备炒料可 10g 盐+2g 味精+3g 孜然粉。\n* 淀粉可准备每 100g 肉+5g 淀粉比例准备。\n* 老抽/生抽，分别为每 250g 河粉 10ml/15ml。\n\n## 操作\n\n### 准备工作\n\n1. 小葱切碎（葱白和葱叶分开）、蒜瓣拍碎，丢案板上备用。\n2. 打碎鸡蛋，捞一点蛋清到一只碗中，剩下的丢入另一只碗中备用。\n3. 将绿豆芽放入锅中，大火煮 60 秒。豆芽捞出，过凉水，放入盘中备用。\n4. 黄瓜切丝放入盘中备用，可和豆芽丢一起。\n5. 处理面筋，单独丢一个盘中。\n6. 肉切细条状，加入淀粉与刚刚碗中的鸡蛋清、胡椒粉，顺时针拌匀。\n7. 注：超市购买来的凉皮表面一般会有食用油，可以使用自来水清洗。面筋同样。\n8. 注：清洗面筋之后，请用手将面筋中的大量水分挤出（不需过于用力）。\n\n### 热锅炒肉\n\n1. 加入食用油，锅热倒出。\n2. 倒入处理好的肉，翻炒均匀至变色，倒入碗中备用。\n\n### 炒制河粉\n\n1. 趁锅热，加入 20g 食用油（高血压人群可降低用量），倒入葱白、蒜爆炒出香。\n2. 加入河粉，淋入老抽提色，翻炒均匀后再加入河粉炒料，继续翻炒。\n3. 河粉即将透明时，放入炒制好的肉丝与面筋，并加入生抽提鲜，简单翻炒两次。\n4. 加入豆芽与黄瓜丝，翻炒至河粉完全透明。\n5. 关火！\n\n### 最终步骤\n\n1. 撒入葱叶点缀，把锅端起。\n2. 倒入盘中，开始干饭。\n\n## 附加内容\n\n个人口味根据地区、天气、时间均有不同，调料的具体使用量请据个人情况而定，喜欢辣椒的可以自行添加。\n\n如果您遵循本指南的制作流程而发现有问题或可以改进的流程，请提出 Issue 或 Pull request 。\n",
    "sections": [
      {
        "title": "炒河粉的做法",
        "markdown": "\n炒河粉是一道流行于广东地区的经典小吃，讲究镬气十足、干香爽滑，河粉软韧透亮，搭配肉丝、豆芽和黄瓜丝，口感层次丰富。主要提供碳水化合物和蛋白质，蔬菜的加入也补充了维生素与膳食纤维。按本菜谱操作难度适中，即便新手只要备齐材料也能尝试，整个制作过程约需 30 分钟即可端上餐桌。\n\n预估烹饪难度：★★★★\n\n预估卡路里：822 大卡\n\n",
        "level": 1
      },
      {
        "title": "必备原料和工具",
        "markdown": "\n* 炒河粉、猪肉/牛肉\n* 炒料：盐、味精、老抽、生抽、孜然粉（或直接用河粉料）\n* 其他调味料：胡椒粉\n* 黄瓜、面筋块、绿豆芽、鸡蛋、蒜瓣、小葱、淀粉\n* 盆、盘子\n\n> 建议购买方案：在某宝、某买菜等平台上购买袋装鲜河粉，一般是1斤起售，冷藏保质期可达到两周，而且送河粉炒料！\n\n",
        "level": 2
      },
      {
        "title": "计算",
        "markdown": "\n* 河粉用量为 250 g/人，如果需要更大食量，可再加 100g/人 向下取整。\n* 黄瓜丝 30g/人、面筋块 30g/人、绿豆芽 30g/人、打碎的鸡蛋 1 个/人。\n* 拍碎的蒜瓣 2 个/人、小葱 1 根/人\n* 河粉料可按 20g/人添加，若自行准备炒料可 10g 盐+2g 味精+3g 孜然粉。\n* 淀粉可准备每 100g 肉+5g 淀粉比例准备。\n* 老抽/生抽，分别为每 250g 河粉 10ml/15ml。\n\n",
        "level": 2
      },
      {
        "title": "操作",
        "markdown": "\n",
        "level": 2
      },
      {
        "title": "准备工作",
        "markdown": "\n1. 小葱切碎（葱白和葱叶分开）、蒜瓣拍碎，丢案板上备用。\n2. 打碎鸡蛋，捞一点蛋清到一只碗中，剩下的丢入另一只碗中备用。\n3. 将绿豆芽放入锅中，大火煮 60 秒。豆芽捞出，过凉水，放入盘中备用。\n4. 黄瓜切丝放入盘中备用，可和豆芽丢一起。\n5. 处理面筋，单独丢一个盘中。\n6. 肉切细条状，加入淀粉与刚刚碗中的鸡蛋清、胡椒粉，顺时针拌匀。\n7. 注：超市购买来的凉皮表面一般会有食用油，可以使用自来水清洗。面筋同样。\n8. 注：清洗面筋之后，请用手将面筋中的大量水分挤出（不需过于用力）。\n\n",
        "level": 3
      },
      {
        "title": "热锅炒肉",
        "markdown": "\n1. 加入食用油，锅热倒出。\n2. 倒入处理好的肉，翻炒均匀至变色，倒入碗中备用。\n\n",
        "level": 3
      },
      {
        "title": "炒制河粉",
        "markdown": "\n1. 趁锅热，加入 20g 食用油（高血压人群可降低用量），倒入葱白、蒜爆炒出香。\n2. 加入河粉，淋入老抽提色，翻炒均匀后再加入河粉炒料，继续翻炒。\n3. 河粉即将透明时，放入炒制好的肉丝与面筋，并加入生抽提鲜，简单翻炒两次。\n4. 加入豆芽与黄瓜丝，翻炒至河粉完全透明。\n5. 关火！\n\n",
        "level": 3
      },
      {
        "title": "最终步骤",
        "markdown": "\n1. 撒入葱叶点缀，把锅端起。\n2. 倒入盘中，开始干饭。\n\n",
        "level": 3
      },
      {
        "title": "附加内容",
        "markdown": "\n个人口味根据地区、天气、时间均有不同，调料的具体使用量请据个人情况而定，喜欢辣椒的可以自行添加。\n\n如果您遵循本指南的制作流程而发现有问题或可以改进的流程，请提出 Issue 或 Pull request 。\n",
        "level": 2
      }
    ],
    "images": []
  },
  "sourceLimitations": [
    "原文按每人计算，规范食材列1人基础量，整体制作约30分钟，总用时30分钟为约值。",
    "河粉每人250克，食量大可再加每人100克向下取整的原措辞完整保留；老抽和生抽按每250克河粉分别10毫升和15毫升。",
    "猪肉或牛肉未给总用量，淀粉按每100克肉配5克计算，不推测肉量或固定淀粉量。",
    "河粉料每人20克与自配盐10克、味精2克、孜然粉3克为替代方案，不同时要求使用。",
    "原文只取少量蛋清拌肉，剩余鸡蛋液虽写备用，后续未交代用途，不新增炒蛋步骤。",
    "原文清洗说明写凉皮而非河粉，保留原词并披露名称矛盾，不擅改烹饪路线。",
    "原文暖锅用油加热后倒出但未量化，另列炒河粉用油20克；胡椒粉、清洗焯水用水及可选辣椒未量化。",
    "来源关于高血压人群可降低油量及购买后冷藏保质期的原文仅完整转录，未扩展或验证这些说法。",
    "上游无图片，保留的原有展示图不属于本次 HowToCook 来源图片。"
  ]
}),
  c("肉夹馍", "Roujiamo", "陕西", "白吉馍4个；带皮猪肉600克；冰糖20克；生抽30毫升；料酒30毫升；八角桂皮香叶适量；青椒可选", "1）猪肉焯水，与香料、酱油、冰糖和热水小火卤90分钟。2）肉剁碎并拌少量卤汁。3）白吉馍烤热剖开，夹入肉末和可选青椒。", "79-roujiamo.png", CN_HOME),
  c("煎饼果子", "Jianbing Guozi", "天津", "绿豆面100克；中筋面粉50克；水260毫升；鸡蛋4个；薄脆4片；甜面酱30克；葱花香菜适量；芝麻和辣酱适量", "1）两种面粉加水调成流动面糊。2）薄摊在平底锅，打蛋摊开，撒芝麻葱香菜后翻面。3）刷酱，放薄脆折起即可。", "80-jianbing-guozi.png", CN_HOME),
  c("叉烧", "Cantonese Char Siu", "粤菜", "梅花肉600克；叉烧酱60克；生抽20毫升；蜂蜜25克；料酒15毫升；蒜末10克", "1）猪肉切粗条，以叉烧酱、生抽、料酒和蒜末冷藏腌一夜。2）200℃烤30–35分钟，中途翻面并刷腌汁。3）最后刷蜂蜜，升温烤至焦亮，静置后切片。", "81-chashao.png"),
  c("梅菜扣肉", "Pork Belly with Preserved Mustard Greens", "客家菜", "五花肉200克；梅菜30克；五香粉2克；食用油300毫升（可选猪皮步骤用50毫升，其他步骤分配未注明）；白砂糖5克（不喜甜可去掉）；老抽30毫升；生抽20毫升（原文未交代使用时机）；小米椒1个；蒜末10克；食用盐2克；鸡精2克；清水适量（泡梅菜用，原文未注明用量）；开水适量（煮肉用，原文未注明用量）；水适量（蒸制用，原文未注明用量）", "1）梅菜放到清水中，浸泡 1 小时。2）锅中倒入 50 ml 食用油，将整块五花肉猪皮朝下，放到锅中 1 分钟 ，取出后去除猪皮（可选）。3）锅中加入开水，放入五花肉，大火煮 20 分钟 （筷子可以插进五花肉），取出五花肉。4）将老抽、五香粉、白砂糖均匀涂抹在五花肉表面，放置 15 分钟。5）起锅烧油，加入五花肉，中火油炸直至两面金黄色（3-5 分钟）。6）起锅烧油，倒入梅菜，加上小米椒、蒜蓉、鸡精、食用盐后翻炒，直至炒干梅干菜水分。7）五花肉切片（厚度0.5—1厘米），放在大碗中，撒上梅干菜。8）中火蒸 45 分钟。9）拿个盘子倒盖在五花肉大碗中，将五花肉倒在盘子中。", "82-meicai-kourou.png", "https://github.com/Anduin2017/HowToCook/blob/a2d45c6984dff9ee941da0e7c452f7965965d962/dishes/meat_dish/%E6%A2%85%E8%8F%9C%E6%89%A3%E8%82%89/%E6%A2%85%E8%8F%9C%E6%89%A3%E8%82%89.md", null, { totalMinutes: 150 }, null, {
  "howtocook": {
    "commit": "a2d45c6984dff9ee941da0e7c452f7965965d962",
    "path": "dishes/meat_dish/梅菜扣肉/梅菜扣肉.md",
    "sha256": "e104b5fee4a148c929a628bb14a86f79b658595d325613aa1f2da616916da937",
    "rawMarkdown": "# 梅菜扣肉的做法\n\n这是一道客家传统名菜，成菜酱红油亮、汤汁黏稠，扣肉肥而不腻、软烂醇香。五花肉富含优质蛋白和脂肪酸，搭配梅干菜能提供膳食纤维。整体工序稍多，需要掌握煮、炸、蒸的火候，对新手有一定挑战。从备料到出锅，连同浸泡梅菜的时间在内，大约需要 2.5 小时。\n\n预估烹饪难度：★★★★\n\n预估卡路里：3756 大卡\n\n## 必备原料和工具\n\n* 五花肉\n* 梅菜\n* 五香粉\n* 食用油\n* 白砂糖\n* 老抽\n* 生抽\n* 小米椒\n* 蒜末\n* 食用盐\n* 鸡精\n\n## 计算\n\n每份：\n\n* 五花肉 200 g\n* 梅菜 30 g\n* 五香粉 2 g\n* 食用油 300 ml\n* 白砂糖 5 g\n* 老抽  30 ml\n* 生抽  20 ml\n* 小米椒  1 个\n* 蒜末 10 g\n* 食用盐 2 g\n* 鸡精 2 g\n\n## 操作\n\n1. 梅菜放到清水中，浸泡 1 小时\n2. 锅中倒入 50 ml 食用油，将整个五花肉猪皮朝下，放到锅中 1 分钟 ，取出挂掉猪皮 【可选】\n3. 锅中加入开水，放入五花肉，大火煮 20 分钟 （筷子可以插进五花肉），取出五花肉\n4. 在五花肉表面涂抹均匀老抽、五香粉、白砂糖，放置 15 分钟\n5. 起锅烧油，加入五花肉，中火油炸直至两面金黄色（3-5 分钟）\n6. 起锅烧油，倒入梅菜，加上小米椒、蒜蓉、鸡精、食用盐后翻炒，直至炒干梅干菜水分\n7. 五花肉切片（后端 0.5-1 cm）,放在大碗中，散上梅干菜\n8. 中火蒸 45 分钟\n9. 拿个盘子倒盖在五花肉大碗中，将五花肉倒在盘子中\n\n![梅菜扣肉-预览图-1](./1.jpeg)\n![梅菜扣肉-预览图-2](./2.jpeg)\n![梅菜扣肉-预览图-3](./3.jpeg)\n![梅菜扣肉-预览图-4](./4.jpeg)\n\n## 附加内容\n\n* 制作过程中发现，脆皮五花肉真香 Orz~\n* 不喜欢吃甜的可以去掉白砂糖，不影响主流程\n* 倒数第二个步骤，可以根据个人喜好调整时间\n* 炒干梅干菜的作用是为了后续吸油（盲猜）\n\n如果您遵循本指南的制作流程而发现有问题或可以改进的流程，请提出 Issue 或 Pull request 。\n",
    "sections": [
      {
        "title": "梅菜扣肉的做法",
        "markdown": "\n这是一道客家传统名菜，成菜酱红油亮、汤汁黏稠，扣肉肥而不腻、软烂醇香。五花肉富含优质蛋白和脂肪酸，搭配梅干菜能提供膳食纤维。整体工序稍多，需要掌握煮、炸、蒸的火候，对新手有一定挑战。从备料到出锅，连同浸泡梅菜的时间在内，大约需要 2.5 小时。\n\n预估烹饪难度：★★★★\n\n预估卡路里：3756 大卡\n\n",
        "level": 1
      },
      {
        "title": "必备原料和工具",
        "markdown": "\n* 五花肉\n* 梅菜\n* 五香粉\n* 食用油\n* 白砂糖\n* 老抽\n* 生抽\n* 小米椒\n* 蒜末\n* 食用盐\n* 鸡精\n\n",
        "level": 2
      },
      {
        "title": "计算",
        "markdown": "\n每份：\n\n* 五花肉 200 g\n* 梅菜 30 g\n* 五香粉 2 g\n* 食用油 300 ml\n* 白砂糖 5 g\n* 老抽  30 ml\n* 生抽  20 ml\n* 小米椒  1 个\n* 蒜末 10 g\n* 食用盐 2 g\n* 鸡精 2 g\n\n",
        "level": 2
      },
      {
        "title": "操作",
        "markdown": "\n1. 梅菜放到清水中，浸泡 1 小时\n2. 锅中倒入 50 ml 食用油，将整个五花肉猪皮朝下，放到锅中 1 分钟 ，取出挂掉猪皮 【可选】\n3. 锅中加入开水，放入五花肉，大火煮 20 分钟 （筷子可以插进五花肉），取出五花肉\n4. 在五花肉表面涂抹均匀老抽、五香粉、白砂糖，放置 15 分钟\n5. 起锅烧油，加入五花肉，中火油炸直至两面金黄色（3-5 分钟）\n6. 起锅烧油，倒入梅菜，加上小米椒、蒜蓉、鸡精、食用盐后翻炒，直至炒干梅干菜水分\n7. 五花肉切片（后端 0.5-1 cm）,放在大碗中，散上梅干菜\n8. 中火蒸 45 分钟\n9. 拿个盘子倒盖在五花肉大碗中，将五花肉倒在盘子中\n\n![梅菜扣肉-预览图-1](./1.jpeg)\n![梅菜扣肉-预览图-2](./2.jpeg)\n![梅菜扣肉-预览图-3](./3.jpeg)\n![梅菜扣肉-预览图-4](./4.jpeg)\n\n",
        "level": 2
      },
      {
        "title": "附加内容",
        "markdown": "\n* 制作过程中发现，脆皮五花肉真香 Orz~\n* 不喜欢吃甜的可以去掉白砂糖，不影响主流程\n* 倒数第二个步骤，可以根据个人喜好调整时间\n* 炒干梅干菜的作用是为了后续吸油（盲猜）\n\n如果您遵循本指南的制作流程而发现有问题或可以改进的流程，请提出 Issue 或 Pull request 。\n",
        "level": 2
      }
    ],
    "images": [
      {
        "originalReference": "./1.jpeg",
        "originalUrl": "https://raw.githubusercontent.com/Anduin2017/HowToCook/a2d45c6984dff9ee941da0e7c452f7965965d962/dishes/meat_dish/%E6%A2%85%E8%8F%9C%E6%89%A3%E8%82%89/1.jpeg",
        "path": "assets/dishes/howtocook/cn-052/1.jpeg",
        "alt": "梅菜扣肉-预览图-1",
        "pageOrder": 1,
        "adjacentText": "五花肉表面涂抹均匀老抽、五香粉、白砂糖，放置 15 分钟\n5. 起锅烧油，加入五花肉，中火油炸直至两面金黄色（3-5 分钟）\n6. 起锅烧油，倒入梅菜，加上小米椒、蒜蓉、鸡精、食用盐后翻炒，直至炒干梅干菜水分\n7. 五花肉切片（后端 0.5-1 cm）,放在大碗中，散上梅干菜\n8. 中火蒸 45 分钟\n9. 拿个盘子倒盖在五花肉大碗中，将五花肉倒在盘子中\n\n![梅菜扣肉-预览图-1](./1.jpeg)\n![梅菜扣肉-预览图-2](./2.jpeg)\n![梅菜扣肉-预览图-3](./3.jpeg)\n![梅菜扣肉-预览图-4](./4.jpeg)\n\n## 附加内容\n\n* 制作过程中发现，脆皮五花肉真香 Orz~\n* 不喜欢吃甜的可以去掉白砂糖，不影响主流程\n* 倒数第二个步骤，可以根据个人喜好调整时间\n* 炒干梅干菜的作用是为了后续吸油（盲猜）\n\n如果您遵循"
      },
      {
        "originalReference": "./2.jpeg",
        "originalUrl": "https://raw.githubusercontent.com/Anduin2017/HowToCook/a2d45c6984dff9ee941da0e7c452f7965965d962/dishes/meat_dish/%E6%A2%85%E8%8F%9C%E6%89%A3%E8%82%89/2.jpeg",
        "path": "assets/dishes/howtocook/cn-052/2.jpeg",
        "alt": "梅菜扣肉-预览图-2",
        "pageOrder": 2,
        "adjacentText": "5 分钟\n5. 起锅烧油，加入五花肉，中火油炸直至两面金黄色（3-5 分钟）\n6. 起锅烧油，倒入梅菜，加上小米椒、蒜蓉、鸡精、食用盐后翻炒，直至炒干梅干菜水分\n7. 五花肉切片（后端 0.5-1 cm）,放在大碗中，散上梅干菜\n8. 中火蒸 45 分钟\n9. 拿个盘子倒盖在五花肉大碗中，将五花肉倒在盘子中\n\n![梅菜扣肉-预览图-1](./1.jpeg)\n![梅菜扣肉-预览图-2](./2.jpeg)\n![梅菜扣肉-预览图-3](./3.jpeg)\n![梅菜扣肉-预览图-4](./4.jpeg)\n\n## 附加内容\n\n* 制作过程中发现，脆皮五花肉真香 Orz~\n* 不喜欢吃甜的可以去掉白砂糖，不影响主流程\n* 倒数第二个步骤，可以根据个人喜好调整时间\n* 炒干梅干菜的作用是为了后续吸油（盲猜）\n\n如果您遵循本指南的制作流程而发现有问题或可以改进的流程，请"
      },
      {
        "originalReference": "./3.jpeg",
        "originalUrl": "https://raw.githubusercontent.com/Anduin2017/HowToCook/a2d45c6984dff9ee941da0e7c452f7965965d962/dishes/meat_dish/%E6%A2%85%E8%8F%9C%E6%89%A3%E8%82%89/3.jpeg",
        "path": "assets/dishes/howtocook/cn-052/3.jpeg",
        "alt": "梅菜扣肉-预览图-3",
        "pageOrder": 3,
        "adjacentText": "至两面金黄色（3-5 分钟）\n6. 起锅烧油，倒入梅菜，加上小米椒、蒜蓉、鸡精、食用盐后翻炒，直至炒干梅干菜水分\n7. 五花肉切片（后端 0.5-1 cm）,放在大碗中，散上梅干菜\n8. 中火蒸 45 分钟\n9. 拿个盘子倒盖在五花肉大碗中，将五花肉倒在盘子中\n\n![梅菜扣肉-预览图-1](./1.jpeg)\n![梅菜扣肉-预览图-2](./2.jpeg)\n![梅菜扣肉-预览图-3](./3.jpeg)\n![梅菜扣肉-预览图-4](./4.jpeg)\n\n## 附加内容\n\n* 制作过程中发现，脆皮五花肉真香 Orz~\n* 不喜欢吃甜的可以去掉白砂糖，不影响主流程\n* 倒数第二个步骤，可以根据个人喜好调整时间\n* 炒干梅干菜的作用是为了后续吸油（盲猜）\n\n如果您遵循本指南的制作流程而发现有问题或可以改进的流程，请提出 Issue 或 Pull request "
      },
      {
        "originalReference": "./4.jpeg",
        "originalUrl": "https://raw.githubusercontent.com/Anduin2017/HowToCook/a2d45c6984dff9ee941da0e7c452f7965965d962/dishes/meat_dish/%E6%A2%85%E8%8F%9C%E6%89%A3%E8%82%89/4.jpeg",
        "path": "assets/dishes/howtocook/cn-052/4.jpeg",
        "alt": "梅菜扣肉-预览图-4",
        "pageOrder": 4,
        "adjacentText": "入梅菜，加上小米椒、蒜蓉、鸡精、食用盐后翻炒，直至炒干梅干菜水分\n7. 五花肉切片（后端 0.5-1 cm）,放在大碗中，散上梅干菜\n8. 中火蒸 45 分钟\n9. 拿个盘子倒盖在五花肉大碗中，将五花肉倒在盘子中\n\n![梅菜扣肉-预览图-1](./1.jpeg)\n![梅菜扣肉-预览图-2](./2.jpeg)\n![梅菜扣肉-预览图-3](./3.jpeg)\n![梅菜扣肉-预览图-4](./4.jpeg)\n\n## 附加内容\n\n* 制作过程中发现，脆皮五花肉真香 Orz~\n* 不喜欢吃甜的可以去掉白砂糖，不影响主流程\n* 倒数第二个步骤，可以根据个人喜好调整时间\n* 炒干梅干菜的作用是为了后续吸油（盲猜）\n\n如果您遵循本指南的制作流程而发现有问题或可以改进的流程，请提出 Issue 或 Pull request 。\n"
      }
    ]
  },
  "sourceLimitations": [
    "原文从备料到出锅连同梅菜浸泡约2.5小时，总用时150分钟为约值；每份未注明食客人数，不推测。",
    "生抽20毫升列于计算清单，但原操作未交代其使用时机，不擅自插入。",
    "食用油总量300毫升，仅可选猪皮步骤注明50毫升，其余炸肉和炒梅菜的分配未注明，不自行拆分。",
    "规范操作将挂掉猪皮写为去除猪皮，将后端0.5—1厘米写为厚度0.5—1厘米，将散上写为撒上；完整原文原样保留，不补充刮皮手法。",
    "梅菜浸泡清水、煮肉开水及蒸制用水原文未定量，不补造。",
    "不喜甜可按原文去掉白砂糖，蒸制时长可依原文附加内容按个人喜好调整；炒干梅菜便于吸油在原文标为盲猜，不提升为已证实结论。",
    "4张图片为原文操作后连续图片，按原位置映射保留，不伪造逐步照片对应。"
  ]
}),
  c("盐焗鸡", "Salt-baked Chicken", "客家菜", "三黄鸡1只约1000克；粗盐1500克；沙姜粉10克；盐8克；葱姜适量；烘焙纸2张", "1）鸡擦干，以沙姜粉和盐抹匀腌2小时。2）腹中塞葱姜，用纸严密包裹。3）锅中粗盐炒热，埋入鸡，小火焗45分钟，关火焖20分钟。", "83-yanju-ji.png", CN_HOME),
  c("豉汁蒸排骨", "Steamed Pork Ribs with Black Bean", "粤菜", "排骨500克；陈皮5克（不喜欢可不放）；豆豉50克；高汤50克（制汁与腌制时分次使用，各次用量未注明）；葱花10克；青红椒末适量；花生油55克（爆香、腌制与淋热油时分次使用，各次用量未注明）；酱油15克（制汁用10克，拌排骨用5克）；蚝油15克（制汁用10克，拌排骨用5克）；生粉15克；姜末10克；蒜末10克；糖15克；味精10克；水（泡陈皮与蒸锅用，用量未注明）", "1）排骨去除背部脊骨和腩尾软骨部分，切成约3厘米的段备用。青红椒切粒，姜和蒜切末。陈皮用水泡软后切丝备用（不喜欢陈皮可不放）。2）将50克豆豉切碎。3）料理锅加热，不加油，放入切碎的豆豉干煸。4）加入陈皮丝，继续煸炒至出香味（不放陈皮时省略此步）。5）加入10克蒜末、10克姜末和爆香用的花生油，继续爆香约30秒。6）从50克高汤中取少许加入锅中，再加入15克糖和10克味精，煮至酱汁黏稠。7）加入10克酱油和10克蚝油，煮至混合均匀，盛出豆豉汁。8）将豆豉汁加入排骨，充分翻拌均匀，再加入剩余的5克酱油和5克蚝油补味。9）加入少量高汤、15克生粉和腌制用的花生油，充分搅拌均匀，腌制20分钟备用。高汤与花生油各次用量原文未注明，花生油需留出最后淋热油的部分。10）将腌制好的排骨放入蒸锅，蒸锅中加水，待水开上汽后大火蒸25分钟，出锅。11）撒入10克葱花和适量青红椒末，将预留的花生油加热后淋在排骨上。", "84-chizhi-zheng-paigu.png", "https://www.douguo.com/cookbook/3316845.html", {
    sourceName: "豆果美食",
    recipePageUrl: "https://www.douguo.com/cookbook/3316845.html",
    mediaPageUrl: "https://www.douguo.com/cookbook/3316845.html",
    author: "清幽梅花2",
    rightsNotice: "©本菜谱的做法由 清幽梅花2 编写，未经授权不得转载",
    reuseLicense: null,
    repositoryCopyAuthorization: "user_confirmed_2026-09-16",
    hero: {
      path: "assets/dishes/sources/cn-054-black-bean-ribs/hero.jpg",
      originalUrl: "https://cp1.douguo.com/upload/caiku/3/2/1/960_322b54e34a4ad2a4ba53f21a3c7115f1.jpg",
      sha256: "73d59bbfff1010fce910c76117bda5a1b0f9077610dd2580b79429cf22bde123",
      httpStatus: 200,
      contentType: "image/jpeg"
    },
    steps: [
      { stepOrder: 2, path: "assets/dishes/sources/cn-054-black-bean-ribs/step-2.jpg", originalUrl: "https://cp1.douguo.com/upload/caiku/d/f/f/800_dfbc9ce3fcee54d21c4e9f0663b7c4df.jpg", sha256: "f21ccd3437c5dc2ebb81adc0323e20d43ad17dab299f3cc408cbd60d918540bf", httpStatus: 200, contentType: "image/jpeg" },
      { stepOrder: 3, path: "assets/dishes/sources/cn-054-black-bean-ribs/step-3.jpg", originalUrl: "https://cp1.douguo.com/upload/caiku/7/c/a/800_7c1405449e240169454b69a2c03e019a.jpg", sha256: "b7086c839eeb698477eb8d6ea077d2702a23d84c547dede8875d266037484433", httpStatus: 200, contentType: "image/jpeg" },
      { stepOrder: 4, path: "assets/dishes/sources/cn-054-black-bean-ribs/step-4.jpg", originalUrl: "https://cp1.douguo.com/upload/caiku/5/c/f/800_5c1d2056e4a08b693fbbdf344f1fab5f.jpg", sha256: "d9b21bc5339dac55cc0d24da70626ebcccb4bd749218753dd86befef004d4ced", httpStatus: 200, contentType: "image/jpeg" },
      { stepOrder: 5, path: "assets/dishes/sources/cn-054-black-bean-ribs/step-5.jpg", originalUrl: "https://cp1.douguo.com/upload/caiku/e/0/2/800_e0047cf0ff651e1fb0efa345de2d7d82.jpg", sha256: "77aaeb5aa6c7e5f9d43dd2008e1bf7ff51bbe5bd020e26022eb8d55e588b15e5", httpStatus: 200, contentType: "image/jpeg" },
      { stepOrder: 6, path: "assets/dishes/sources/cn-054-black-bean-ribs/step-6.jpg", originalUrl: "https://cp1.douguo.com/upload/caiku/3/9/4/800_399e1038b1787b9546fb340fb5ba2674.jpg", sha256: "a8589343502c4faa9afcb84b936d09b72695317dd92f48b61520987596789a57", httpStatus: 200, contentType: "image/jpeg" },
      { stepOrder: 7, path: "assets/dishes/sources/cn-054-black-bean-ribs/step-7.jpg", originalUrl: "https://cp1.douguo.com/upload/caiku/1/9/0/800_198e7a52b2a05533d44de396ad3bb690.jpg", sha256: "24e8625fc5a5bc968e87a2fc1ff7a257dc5ae2e4798e27a5f5001b24d49c3d35", httpStatus: 200, contentType: "image/jpeg" },
      { stepOrder: 8, path: "assets/dishes/sources/cn-054-black-bean-ribs/step-8.jpg", originalUrl: "https://cp1.douguo.com/upload/caiku/a/5/4/800_a5d17f3276a4c840fc07f38855d125b4.jpg", sha256: "deb22442238082a5d6a2b76df27e4dff7282382347faed40055efecb2b731372", httpStatus: 200, contentType: "image/jpeg" },
      { stepOrder: 9, path: "assets/dishes/sources/cn-054-black-bean-ribs/step-9.jpg", originalUrl: "https://cp1.douguo.com/upload/caiku/0/3/d/800_03b7bd9186eab89c3dcfaf07989395ed.jpg", sha256: "86f0f56833f41e33e1def3c7ca826e5aa6710a45c532210e1815cf6d24ef93c1", httpStatus: 200, contentType: "image/jpeg" },
      { stepOrder: 10, path: "assets/dishes/sources/cn-054-black-bean-ribs/step-10.jpg", originalUrl: "https://cp1.douguo.com/upload/caiku/f/4/c/800_f4cbb216ebc518d59e15581d5bdf996c.jpg", sha256: "b942e6d2c6c28fa0316f3c8f61464ef7f5551f8525274c0249689dad713b4e6c", httpStatus: 200, contentType: "image/jpeg" }
    ]
  }),
  c("干锅花菜", "Dry-pot Cauliflower", "湘川风味", "花菜400克；五花肉100克；辣椒1—2根（操作称小红辣椒）；生抽10毫升；白糖5克；蒜瓣3—4个；盐2克（原文未说明使用时机）；食用油10毫升；大蒜白色部分适量（原文指代不明，未注明用量）；大葱白适量（原文与大蒜白色指代不一致，未注明用量）；大蒜叶适量（原文未注明用量）；淡盐水适量（泡花菜用，原文未注明用量及浓度）；水适量（清洗及焯水用，原文未注明用量）；冷水适量（冲淋用，原文未注明用量）", "1）花菜朵朝下，浸入淡盐水中浸泡 20 分钟。然后洗净用小刀拆成小朵。2）放入开水锅中焯水 1 分钟，捞出立即用冷水冲淋至完全凉透，沥水备用。3）五花肉切成薄片，将大蒜白色部分切下，用刀背拍扁，小红辣椒切成段。4）锅烧热后放油，油热后下大葱白爆香。5）将五花肉片下入锅中，用中火煸炒至表面全部变色，继续煸炒一会儿，把肥肉部分的油份逼出一部分。6）倒入红辣椒段和花菜，翻炒几下。7）加入 10 ml 生抽。8）再加入 5 g 白糖，转大火不断翻炒 1 分钟。9）把大蒜叶部分切成段，放入锅中，翻炒几下后，关火盖上盖子焖 1 分钟即可。", "85-ganguo-huacai.png", "https://github.com/Anduin2017/HowToCook/blob/a2d45c6984dff9ee941da0e7c452f7965965d962/dishes/vegetable_dish/%E5%B9%B2%E9%94%85%E8%8A%B1%E8%8F%9C/%E5%B9%B2%E9%94%85%E8%8A%B1%E8%8F%9C.md", null, { totalMinutes: 40 }, null, {
  "howtocook": {
    "commit": "a2d45c6984dff9ee941da0e7c452f7965965d962",
    "path": "dishes/vegetable_dish/干锅花菜/干锅花菜.md",
    "sha256": "7bc7117f7735d73eee88229f81bc4e64ecd750205fa2543a4e1392905cda7780",
    "rawMarkdown": "# 干锅花菜的做法\n\n![干锅花菜成品](./干锅花菜.jpg)\n\n干锅花菜是一道湘味家常菜，口感脆嫩干香，五花肉焦香四溢，带着微微辣意。花菜富含维生素 C 和膳食纤维，搭配五花肉补充蛋白质与能量。制作难度适中，只需注意焯水后充分沥干并把五花肉煸出油脂，适合有一定基础的烹饪新手。从准备到出锅大约需要 40 分钟。\n\n预估烹饪难度：★★★\n\n预估卡路里：759 大卡\n\n## 必备原料和工具\n\n- 花菜\n- 五花肉\n- 辣椒\n- 生抽\n- 白糖\n- 蒜\n- 盐\n- 油\n\n## 计算\n\n每份：\n\n- 花菜 400 g\n- 五花肉 100 g\n- 辣椒 1-2 根\n- 生抽 10 ml\n- 白糖 5g\n- 蒜瓣 3-4 个\n- 盐 2 g\n- 油 10 ml\n\n## 操作\n\n1. 花菜朵朝下，没入淡盐水中浸泡 20 分钟。然后洗净用小刀拆成小朵\n2. 入开水锅中焯水 1 分钟，捞出立即用冷水冲淋至完全凉透，沥水备用\n3. 五花肉切成薄片，大蒜白色切下用刀背拍扁，小红辣椒切成段\n4. 锅烧热放油，油热下大葱白爆香\n5. 下五花肉片入锅，用中火煸炒至表面全部变色，继续煸炒一会儿，把肥肉部分的油份逼出一部分\n6. 倒入红辣椒段和花菜，翻炒几下\n7. 加入 10 ml 生抽\n8. 再加入 5 g 白糖，转大火不断翻炒 1 分钟\n9. 把大蒜叶部分切成段，放入锅中，翻炒几下后，关火盖上盖子焖 1 分钟即可\n\n## 附加内容\n\n如果您遵循本指南的制作流程而发现有问题或可以改进的流程，请提出 Issue 或 Pull request 。\n",
    "sections": [
      {
        "title": "干锅花菜的做法",
        "markdown": "\n![干锅花菜成品](./干锅花菜.jpg)\n\n干锅花菜是一道湘味家常菜，口感脆嫩干香，五花肉焦香四溢，带着微微辣意。花菜富含维生素 C 和膳食纤维，搭配五花肉补充蛋白质与能量。制作难度适中，只需注意焯水后充分沥干并把五花肉煸出油脂，适合有一定基础的烹饪新手。从准备到出锅大约需要 40 分钟。\n\n预估烹饪难度：★★★\n\n预估卡路里：759 大卡\n\n",
        "level": 1
      },
      {
        "title": "必备原料和工具",
        "markdown": "\n- 花菜\n- 五花肉\n- 辣椒\n- 生抽\n- 白糖\n- 蒜\n- 盐\n- 油\n\n",
        "level": 2
      },
      {
        "title": "计算",
        "markdown": "\n每份：\n\n- 花菜 400 g\n- 五花肉 100 g\n- 辣椒 1-2 根\n- 生抽 10 ml\n- 白糖 5g\n- 蒜瓣 3-4 个\n- 盐 2 g\n- 油 10 ml\n\n",
        "level": 2
      },
      {
        "title": "操作",
        "markdown": "\n1. 花菜朵朝下，没入淡盐水中浸泡 20 分钟。然后洗净用小刀拆成小朵\n2. 入开水锅中焯水 1 分钟，捞出立即用冷水冲淋至完全凉透，沥水备用\n3. 五花肉切成薄片，大蒜白色切下用刀背拍扁，小红辣椒切成段\n4. 锅烧热放油，油热下大葱白爆香\n5. 下五花肉片入锅，用中火煸炒至表面全部变色，继续煸炒一会儿，把肥肉部分的油份逼出一部分\n6. 倒入红辣椒段和花菜，翻炒几下\n7. 加入 10 ml 生抽\n8. 再加入 5 g 白糖，转大火不断翻炒 1 分钟\n9. 把大蒜叶部分切成段，放入锅中，翻炒几下后，关火盖上盖子焖 1 分钟即可\n\n",
        "level": 2
      },
      {
        "title": "附加内容",
        "markdown": "\n如果您遵循本指南的制作流程而发现有问题或可以改进的流程，请提出 Issue 或 Pull request 。\n",
        "level": 2
      }
    ],
    "images": [
      {
        "originalReference": "./干锅花菜.jpg",
        "originalUrl": "https://raw.githubusercontent.com/Anduin2017/HowToCook/a2d45c6984dff9ee941da0e7c452f7965965d962/dishes/vegetable_dish/%E5%B9%B2%E9%94%85%E8%8A%B1%E8%8F%9C/%E5%B9%B2%E9%94%85%E8%8A%B1%E8%8F%9C.jpg",
        "path": "assets/dishes/howtocook/cn-055/1.jpg",
        "alt": "干锅花菜成品",
        "pageOrder": 1,
        "adjacentText": "# 干锅花菜的做法\n\n![干锅花菜成品](./干锅花菜.jpg)\n\n干锅花菜是一道湘味家常菜，口感脆嫩干香，五花肉焦香四溢，带着微微辣意。花菜富含维生素 C 和膳食纤维，搭配五花肉补充蛋白质与能量。制作难度适中，只需注意焯水后充分沥干并把五花肉煸出油脂，适合有一定基础的烹饪新手。从准备到出锅大约需要 40 分钟。\n\n预估烹饪难度：★★★\n\n预估卡路里：759 大卡\n\n## 必备原料和工具\n\n- 花菜\n- 五花肉\n- 辣椒"
      }
    ]
  },
  "sourceLimitations": [
    "原文从准备到出锅大约40分钟，总用时40分钟为约值；每份未注明食客人数，不推测。",
    "计算列蒜瓣3—4个，操作先写大蒜白色、后写大葱白和大蒜叶，指代不一致，保留各原词，不自行统一为蒜苗，也不推测各自用量或替换关系。",
    "计算列盐2克，操作未说明其添加时机；浸泡另要求淡盐水，未说明配制浓度、用量或与2克盐的关系，不补造。",
    "油未限定种类，规范食材写食用油10毫升；清洗、焯水及冷水冲淋用水未定量。",
    "继续煸炒一会儿及翻炒几下未给具体时长，保持原文观察状态及原有中火、大火和关火焖制顺序。"
  ]
}),
  c("上汤娃娃菜", "Baby Napa Cabbage in Superior Broth", "粤菜", "娃娃菜700克；金针菇10克（按个人喜好可不放）；皮蛋1个（没有可不放）；午餐肉或火腿肠适量（原文未注明用量）；葱3克；蒜10克；姜10克；清水300克（原文另要求没过娃娃菜，两项指示均保留）；蚝油适量（原文未注明用量）；糖适量（原文未注明用量）；盐适量（原文未注明用量）；味精适量（原文未注明用量）；淀粉适量（原文未注明用量，步骤未使用）；食用油适量（热锅后倒出，再重新倒一点油，两次用量均未注明）；水适量（清洗及焯娃娃菜用，原文未注明用量）", "1）娃娃菜洗净， 竖着切开切成段。2）葱 3g 切小段。蒜 10g 切片。姜 10g 切小片。3）皮蛋切成丁， 火腿肠或者午餐肉切成丁（1cm 大小的丁）。4）金针菇洗净撕开。5）烧热水，将娃娃菜放进去焯十秒钟，捞出。6）热锅凉油：加热锅后倒入油，过一遍就倒出来，重新倒入一点油。7）调至小火加入葱姜蒜，煎炒出香味即可。8）加入300克清水（水量没过娃娃菜即可），放入娃娃菜、金针菇、午餐肉。9）加入调味料蚝油、糖、盐、味精烧开。10）煮3分钟，煮开后开始装盘。盛出娃娃菜后，将皮蛋放在上面，再把汤汁浇上去即可。", "86-shangtang-wawacai.png", "https://github.com/Anduin2017/HowToCook/blob/a2d45c6984dff9ee941da0e7c452f7965965d962/dishes/vegetable_dish/%E4%B8%8A%E6%B1%A4%E5%A8%83%E5%A8%83%E8%8F%9C/%E4%B8%8A%E6%B1%A4%E5%A8%83%E5%A8%83%E8%8F%9C.md", null, { totalMinutes: 20 }, null, {
  "howtocook": {
    "commit": "a2d45c6984dff9ee941da0e7c452f7965965d962",
    "path": "dishes/vegetable_dish/上汤娃娃菜/上汤娃娃菜.md",
    "sha256": "3f78058f94d453648d94822db0384aafcb2b24736d8d6f4d60189fc6b21643db",
    "rawMarkdown": "# 上汤娃娃菜的做法\n\n这道上汤娃娃菜清甜鲜美，口感软嫩，属于家常素菜，尤其适合减肥期间食用。娃娃菜富含维生素和膳食纤维，低脂低热量，搭配皮蛋和午餐肉增添风味又不会过多增加负担。制作难度适中，新手也能尝试，从备菜到出锅大约只需 20 分钟。\n\n预估烹饪难度：★★★\n\n预估卡路里：158 大卡\n\n## 必备原料和工具\n\n- 娃娃菜\n- 皮蛋\n- 午餐肉（火腿肠）\n- 葱\n- 姜\n- 蒜\n- 盐\n- 糖\n- 淀粉\n\n## 计算\n\n注意，这道菜仅有足够 2-4 人食用的版本。\n\n- 娃娃菜 700g\n- 金针菇 10g（看个人喜好, 不喜欢 see you tomorrow 的就不放 😂）\n- 皮蛋 一个（没有也可以不放）\n- 午餐肉（火腿肠都可以替代）\n\n## 操作\n\n1. 娃娃菜洗净, 竖着切开切成段。\n2. 葱 3g 切 小段。蒜 10g 切片。姜 10g 切小片。\n3. 皮蛋切成丁, 火腿肠或者午餐肉切成丁（1cm 大小的丁）\n4. 金针菇洗净撕开\n5. 烧热水娃娃菜放进去十秒钟出一下水捞出。\n6. 热锅凉油, 加热锅倒入油过一遍就倒出来, 重新倒入一点油。\n7. 调至小火加入葱姜蒜，煎炒出香味即可。\n8. 加入适 300g 清水（水量没过娃娃菜即可）, 放入娃娃菜, 金针菇, 午餐肉\n9. 加入调味料蚝油、糖、盐、味精烧开。\n10. 煮 3 分钟, 煮开后开始装盘, 盛出娃娃菜后皮蛋放在上面把汤汁浇上去就可以了\n11. ![上汤娃娃菜](./上汤娃娃菜.png)\n\n    拍照技术有限, 味道还是很不错的\n\n## 附加内容\n\n如果您遵循本指南的制作流程而发现有问题或可以改进的流程，请提出 Issue 或 Pull request 。\n",
    "sections": [
      {
        "title": "上汤娃娃菜的做法",
        "markdown": "\n这道上汤娃娃菜清甜鲜美，口感软嫩，属于家常素菜，尤其适合减肥期间食用。娃娃菜富含维生素和膳食纤维，低脂低热量，搭配皮蛋和午餐肉增添风味又不会过多增加负担。制作难度适中，新手也能尝试，从备菜到出锅大约只需 20 分钟。\n\n预估烹饪难度：★★★\n\n预估卡路里：158 大卡\n\n",
        "level": 1
      },
      {
        "title": "必备原料和工具",
        "markdown": "\n- 娃娃菜\n- 皮蛋\n- 午餐肉（火腿肠）\n- 葱\n- 姜\n- 蒜\n- 盐\n- 糖\n- 淀粉\n\n",
        "level": 2
      },
      {
        "title": "计算",
        "markdown": "\n注意，这道菜仅有足够 2-4 人食用的版本。\n\n- 娃娃菜 700g\n- 金针菇 10g（看个人喜好, 不喜欢 see you tomorrow 的就不放 😂）\n- 皮蛋 一个（没有也可以不放）\n- 午餐肉（火腿肠都可以替代）\n\n",
        "level": 2
      },
      {
        "title": "操作",
        "markdown": "\n1. 娃娃菜洗净, 竖着切开切成段。\n2. 葱 3g 切 小段。蒜 10g 切片。姜 10g 切小片。\n3. 皮蛋切成丁, 火腿肠或者午餐肉切成丁（1cm 大小的丁）\n4. 金针菇洗净撕开\n5. 烧热水娃娃菜放进去十秒钟出一下水捞出。\n6. 热锅凉油, 加热锅倒入油过一遍就倒出来, 重新倒入一点油。\n7. 调至小火加入葱姜蒜，煎炒出香味即可。\n8. 加入适 300g 清水（水量没过娃娃菜即可）, 放入娃娃菜, 金针菇, 午餐肉\n9. 加入调味料蚝油、糖、盐、味精烧开。\n10. 煮 3 分钟, 煮开后开始装盘, 盛出娃娃菜后皮蛋放在上面把汤汁浇上去就可以了\n11. ![上汤娃娃菜](./上汤娃娃菜.png)\n\n    拍照技术有限, 味道还是很不错的\n\n",
        "level": 2
      },
      {
        "title": "附加内容",
        "markdown": "\n如果您遵循本指南的制作流程而发现有问题或可以改进的流程，请提出 Issue 或 Pull request 。\n",
        "level": 2
      }
    ],
    "images": [
      {
        "originalReference": "./上汤娃娃菜.png",
        "originalUrl": "https://raw.githubusercontent.com/Anduin2017/HowToCook/a2d45c6984dff9ee941da0e7c452f7965965d962/dishes/vegetable_dish/%E4%B8%8A%E6%B1%A4%E5%A8%83%E5%A8%83%E8%8F%9C/%E4%B8%8A%E6%B1%A4%E5%A8%83%E5%A8%83%E8%8F%9C.png",
        "path": "assets/dishes/howtocook/cn-056/1.png",
        "alt": "上汤娃娃菜",
        "pageOrder": 1,
        "adjacentText": "进去十秒钟出一下水捞出。\n6. 热锅凉油, 加热锅倒入油过一遍就倒出来, 重新倒入一点油。\n7. 调至小火加入葱姜蒜，煎炒出香味即可。\n8. 加入适 300g 清水（水量没过娃娃菜即可）, 放入娃娃菜, 金针菇, 午餐肉\n9. 加入调味料蚝油、糖、盐、味精烧开。\n10. 煮 3 分钟, 煮开后开始装盘, 盛出娃娃菜后皮蛋放在上面把汤汁浇上去就可以了\n11. ![上汤娃娃菜](./上汤娃娃菜.png)\n\n    拍照技术有限, 味道还是很不错的\n\n## 附加内容\n\n如果您遵循本指南的制作流程而发现有问题或可以改进的流程，请提出 Issue 或 Pull request 。\n"
      }
    ]
  },
  "sourceLimitations": [
    "原文仅有够2—4人食用的版本，不压缩为单一人数；从备菜到出锅大约20分钟，总用时20分钟为约值。",
    "此做法含午餐肉或火腿肠及皮蛋，原简介称家常素菜不准确，原文仅原样存档，不据此将菜标为素食。",
    "清水原文写300克，同时要求水量没过娃娃菜，两项指示可能不一致，均保留不改算。",
    "午餐肉或火腿肠、蚝油、糖、盐、味精及两次用油未量化，不补造；热锅用油过一遍后倒出，再倒少量油的操作保留。",
    "淀粉列在必备原料，但未定量且操作未使用，保留食材并披露，不新增勾芡。",
    "原操作第11编号仅为图片及作者拍照说明，保存在完整原文及图片原位置，不作为可执行步骤。",
    "金针菇和皮蛋按来源为可选；清洗和焯娃娃菜的水未注明用量。"
  ]
}),
  c("红烧茄子", "Red-braised Eggplant", "家常菜", "青茄子（数量=份数×0.7个）；青辣椒（数量=份数×0.5个）；洋葱（数量=份数×0.3个）；西红柿1个；大葱半颗；大蒜3瓣；鸡蛋1个；面粉（用量=青茄子数量×150克）；淀粉（用量=面粉÷4克，保留原公式）；酱油（用量=茄子数量×7克，向上取整）；盐（面糊用量=面粉÷20克）；盐（炒制用量=份数×3克）；食用油500毫升（炸茄子用，之后倒出）；食用油（炒制用量=份数×5克）；水少量（面糊初次加入）；水30克（加淀粉后加入）；水（烧制水面高度为锅内食材的0.8倍）；水适量（清洗用，原文未注明用量）", "1）青茄子、青辣椒、西红柿、洋葱、大葱洗净。2）大葱切 5 毫米宽的葱花，大蒜去皮并拍碎，西红柿切 6 立方厘米的块，青辣椒、洋葱切 5g 的块。3）茄子切菱形块（先切 2 公分厚的片，然后再把片切成 2 公分的条，最后斜刀切块儿...）。4）将面粉倒入盆中，依次加入少量水，搅拌均匀，呈粘稠糊状。注意：第4—6步必须按顺序执行，原文强调否则会有灾难性错误。5）加入淀粉，加入 30 克水，搅拌均匀。6）将鸡蛋打到盆中，加入（面粉 / 20）克的盐，搅拌均匀。7）将茄块倒入面糊中，搅拌使茄块的每一面都能沾上面糊。8）开大火，热锅，加入 500 毫升的油，当能看到锅里的油冒出一丝烟时，调至小火，用筷子将茄块夹入油锅，待所有的茄块下锅之后，调至中火，直到茄块变金黄色时捞出，将油倒出。9）加入（份数 * 5）g 的油，放入大蒜、葱花，翻炒 15 秒，放入青辣椒块翻炒 30 秒，放入西红柿翻炒 30 秒。10）放入炸好的茄块，加水至水面高度为锅内食材的0.8倍。11）放入酱油和（份数 * 3）g 的盐。12）等待，直到汤汁呈粘稠状（水位大概为剩余食材高度的 0.2-0.3 倍），开盖，盛出菜，关火。", "87-hongshao-qiezi.png", "https://github.com/Anduin2017/HowToCook/blob/a2d45c6984dff9ee941da0e7c452f7965965d962/dishes/vegetable_dish/%E7%BA%A2%E7%83%A7%E8%8C%84%E5%AD%90.md", null, { totalMinutes: 45 }, null, {
  "howtocook": {
    "commit": "a2d45c6984dff9ee941da0e7c452f7965965d962",
    "path": "dishes/vegetable_dish/红烧茄子.md",
    "sha256": "490ef2db64fe58ecae97bc7f06566d75988181c5b7b7f394c4f0756f7d03f30b",
    "rawMarkdown": "# 红烧茄子的做法\n\n红烧茄子是一道咸香浓郁的家常下饭菜，软糯的茄块吸饱汤汁，搭配柿子椒和番茄，酸辣适口。茄子富含膳食纤维和维生素 P，炸过的茄块香而不腻。制作需要挂糊油炸并慢烧入味，步骤略多但对新手仍可尝试，专注细节就能成功。从备料到出锅大约需要 45 分钟。\n\n预估烹饪难度：★★★★\n\n预估卡路里：547 大卡\n\n## 必备原料和工具\n\n- 大蒜\n- 大葱\n- 青辣椒\n- 洋葱\n- 西红柿\n- 青茄子\n- 盐\n- 酱油\n- 鸡蛋\n- 面粉\n- 淀粉\n\n## 计算\n\n每次制作前需要确定计划做几份。一份正好够 2 个人食用\n\n总量：\n\n- 青茄子的数量 = 份数 * 0.7 个\n- 青辣椒 = 份数 * 0.5 个\n- 洋葱 = 份数 * 0.3 个\n- 西红柿 = 1 个\n- 大葱 = 半颗\n- 大蒜 = 3 瓣\n- 鸡蛋 = 1 个\n- 面粉 = 青茄子数量 * 150 克\n- 淀粉 = 面粉 / 4 克\n- 酱油 = 茄子数量 * 7 克（向上取整）\n\n## 操作\n\n1. 青茄子、青辣椒、西红柿、洋葱、大葱洗净。\n1. 大葱切 5 毫米宽的葱花，大蒜扒皮并拍碎，西红柿切 6 立方厘米的块，青辣椒、洋葱切 5g 的块。\n1. 茄子切菱形块（先切 2 公分厚的片，然后再把片切成 2 公分的条，最后斜刀切块儿...）。\n1. 将面粉倒入盆中，依次加入少量水，搅拌均匀，呈粘稠糊状。\n1. 加入淀粉，加入 30 克水，搅拌均匀。\n1. 将鸡蛋打到盆中，加入（面粉 / 20）克的盐，搅拌均匀。\n1. 将茄块倒入面糊中，搅拌使茄块的每一面都能沾上面糊。\n1. 开大火，热锅，加入 500 毫升的油，当能看到锅里的油冒出一丝烟时，调至小火，将茄块用筷子夹入到油锅，待所有的茄块下锅之后，调至中火，直到茄块变金黄色时捞出，将油倒出。\n1. 加入（份数 * 5）g 的油，放入大蒜、葱花，翻炒 15 秒，放入青辣椒块翻炒 30 秒，放入西红柿翻炒 30 秒。\n1. 放入炸好的茄块，加水面高度为锅内食材的 0.8 倍。\n1. 放入酱油和（份数 * 3）g 的盐。\n1. 等待，直到汤汁呈粘稠状（水位大概为剩余食材高度的 0.2-0.3 倍），开盖，盛出菜，关火。\n\n## 附加内容\n\n在操作的第 4-6 步骤中要注意：\n一定要顺序执行，否则会有灾难性错误......\n\n如果您遵循本指南的制作流程而发现有问题或可以改进的流程，请提出 Issue 或 Pull request 。\n",
    "sections": [
      {
        "title": "红烧茄子的做法",
        "markdown": "\n红烧茄子是一道咸香浓郁的家常下饭菜，软糯的茄块吸饱汤汁，搭配柿子椒和番茄，酸辣适口。茄子富含膳食纤维和维生素 P，炸过的茄块香而不腻。制作需要挂糊油炸并慢烧入味，步骤略多但对新手仍可尝试，专注细节就能成功。从备料到出锅大约需要 45 分钟。\n\n预估烹饪难度：★★★★\n\n预估卡路里：547 大卡\n\n",
        "level": 1
      },
      {
        "title": "必备原料和工具",
        "markdown": "\n- 大蒜\n- 大葱\n- 青辣椒\n- 洋葱\n- 西红柿\n- 青茄子\n- 盐\n- 酱油\n- 鸡蛋\n- 面粉\n- 淀粉\n\n",
        "level": 2
      },
      {
        "title": "计算",
        "markdown": "\n每次制作前需要确定计划做几份。一份正好够 2 个人食用\n\n总量：\n\n- 青茄子的数量 = 份数 * 0.7 个\n- 青辣椒 = 份数 * 0.5 个\n- 洋葱 = 份数 * 0.3 个\n- 西红柿 = 1 个\n- 大葱 = 半颗\n- 大蒜 = 3 瓣\n- 鸡蛋 = 1 个\n- 面粉 = 青茄子数量 * 150 克\n- 淀粉 = 面粉 / 4 克\n- 酱油 = 茄子数量 * 7 克（向上取整）\n\n",
        "level": 2
      },
      {
        "title": "操作",
        "markdown": "\n1. 青茄子、青辣椒、西红柿、洋葱、大葱洗净。\n1. 大葱切 5 毫米宽的葱花，大蒜扒皮并拍碎，西红柿切 6 立方厘米的块，青辣椒、洋葱切 5g 的块。\n1. 茄子切菱形块（先切 2 公分厚的片，然后再把片切成 2 公分的条，最后斜刀切块儿...）。\n1. 将面粉倒入盆中，依次加入少量水，搅拌均匀，呈粘稠糊状。\n1. 加入淀粉，加入 30 克水，搅拌均匀。\n1. 将鸡蛋打到盆中，加入（面粉 / 20）克的盐，搅拌均匀。\n1. 将茄块倒入面糊中，搅拌使茄块的每一面都能沾上面糊。\n1. 开大火，热锅，加入 500 毫升的油，当能看到锅里的油冒出一丝烟时，调至小火，将茄块用筷子夹入到油锅，待所有的茄块下锅之后，调至中火，直到茄块变金黄色时捞出，将油倒出。\n1. 加入（份数 * 5）g 的油，放入大蒜、葱花，翻炒 15 秒，放入青辣椒块翻炒 30 秒，放入西红柿翻炒 30 秒。\n1. 放入炸好的茄块，加水面高度为锅内食材的 0.8 倍。\n1. 放入酱油和（份数 * 3）g 的盐。\n1. 等待，直到汤汁呈粘稠状（水位大概为剩余食材高度的 0.2-0.3 倍），开盖，盛出菜，关火。\n\n",
        "level": 2
      },
      {
        "title": "附加内容",
        "markdown": "\n在操作的第 4-6 步骤中要注意：\n一定要顺序执行，否则会有灾难性错误......\n\n如果您遵循本指南的制作流程而发现有问题或可以改进的流程，请提出 Issue 或 Pull request 。\n",
        "level": 2
      }
    ],
    "images": []
  },
  "sourceLimitations": [
    "原文一份够2人，食材保留按份数N计算的总量公式，未指定N值，因此不设置固定人数，不能将本清单整体视作2人份固定用量。",
    "原文从备料到出锅大约45分钟，总用时45分钟为约值。",
    "面粉为青茄子数量乘150克，淀粉为面粉除4克，面糊盐为面粉除20克，酱油为茄子数量乘7克向上取整，均保留原公式，不改算。",
    "食用油分为炸茄子的500毫升及炒制的份数乘5克，原质量与容量单位分别保留，不换算。",
    "洋葱在切配出现，但后续未交代入锅时机；最终开盖前未交代盖盖时机，不新增步骤。",
    "操作第4—6步来源明确要求严格按顺序执行，规范步骤保留该注意事项。",
    "面糊少量水、洗菜用水及烧制到食材高度0.8倍的水未给容量，保留原量词及水位判断。",
    "上游无图片，保留的原有展示图不属于本次 HowToCook 来源图片。"
  ]
}),
  c("番茄牛腩", "Tomato Braised Beef Brisket", "家常菜", "西红柿3—4个（每个约200克）；牛腩500克；食用油20—30毫升；葱段2段（各长2厘米，炖肉用）；姜片2片（炖肉用）；葱或葱花10克（炒制用，最后撒葱花未另注明用量）；姜10克（炒制用）；八角3小片；料酒或黄酒5—10毫升；生抽适量（按口味，原文未注明用量）；白胡椒粉适量（原文未注明用量及使用时机）；白糖适量（按口味，原文未注明用量）；盐适量（按口味，原文未注明用量）；水2升（炖肉用）；冷水适量（焯肉用，原文未注明用量）；水适量（冲洗牛肉用，原文未注明用量）", "1）将牛腩切条，再切成长、宽、高均为2厘米的块，冷水下锅，开锅煮制 2 分钟去除血水，捞出冲洗干净。2）另起锅 2L 水烧开，加入 2cm 两段葱段、两片姜片、八角、料/黄酒 5-10ml，放入焯好的牛肉，盖盖炖制（砂锅 1 小时，高压锅炖肉模式 45 分钟），筷子能轻松插透就证明炖好了。用砂锅或铝锅炖肉时，水开后转中小火或小火；高压锅使用方法见原文链接的学习使用压力锅教程。3）西红柿去皮：西红柿头部划十字至腰线，筷子/刀叉从果蒂捅入，煤气灶小火，一边转动一边烤，及时拿下来查看，起皮后撕下来，切块。越小越好。撕皮小心烫，去皮后的西红柿特别滑，慢切注意安全。4）起锅烧油，油温7成热时，将葱、姜各10克及番茄下锅，炒透炒出番茄红色，加入煮好的牛腩和原汤，原汤刚刚没过牛肉即可。5）根据个人口味放入盐、糖、生抽调味，盖上盖子。6）开锅后大火继续炒制 3-5 分钟。7）待番茄汁呈中等粘稠程度后关火，撒入葱花，盛盘。", "88-fanqie-niunan.png", "https://github.com/Anduin2017/HowToCook/blob/a2d45c6984dff9ee941da0e7c452f7965965d962/dishes/meat_dish/%E8%A5%BF%E7%BA%A2%E6%9F%BF%E7%89%9B%E8%85%A9/%E8%A5%BF%E7%BA%A2%E6%9F%BF%E7%89%9B%E8%85%A9.md", null, { totalMinutes: 90 }, null, {
  "howtocook": {
    "commit": "a2d45c6984dff9ee941da0e7c452f7965965d962",
    "path": "dishes/meat_dish/西红柿牛腩/西红柿牛腩.md",
    "sha256": "82f1ae878a443d109e8fd9291f0d0854d41f586080440351417fc665726f2c31",
    "rawMarkdown": "# 西红柿牛腩的做法\n\n西红柿牛腩汤汁浓厚酸甜可口，牛肉软绵醇香，是道开胃下饭的家常菜。富含蛋白质、维生素和番茄红素，营养均衡。对新手有一定挑战，需要掌握炖肉火候和番茄炒汁的技巧。一般初学者大约需要 90 分钟完成。\n\n预估烹饪难度：★★★★★\n\n预估卡路里：1569 大卡\n\n## 必备原料和工具\n\n* 西红柿\n* 牛腩\n* 燃气灶（西红柿去皮用）\n* 高压锅/砂锅/普通铝锅（铁锅）\n* 2cm 两段葱段、两片姜片，葱花、姜各 10g\n* 生抽、白胡椒粉，白糖，料/黄酒，八角三小片\n* 牛腩（挑选肥瘦相间的口感比较好）\n\n## 计算\n\n每份：\n\n- 西红柿 3-4 个（每个约 200g）\n- 牛腩 500g\n- 食用油 20-30ml\n\n## 操作\n\n1. 牛腩切条、切块成长宽高均 2cm ，冷水下锅，开锅煮制 2 分钟去除血水，捞出冲洗干净\n2. 另起锅 2L 水烧开，加入 2cm 两段葱段、两片姜片、八角、料/黄酒 5-10ml，放入焯好的牛肉，盖盖炖制（砂锅 1 小时，高压锅炖肉模式 45 分钟），筷子能轻松插透就证明炖好了\n3. 西红柿去皮：西红柿头部滑十字至腰线，筷子/刀叉从果蒂捅入，煤气灶小火，一边转动一边烤，及时拿下来查看，起皮后撕下来，切块。越小越好\n\n  - 撕皮小心烫，去皮后的西红柿特别滑，慢切注意安全\n\n4. 起锅烧油，油温 7 成热，葱、姜各 10g，番茄下锅，炒透炒出番茄红色，加入煮好的牛腩和原汤，原汤刚刚没过牛肉即可\n5. 根据个人口味放入盐、糖、生抽调味盖盖\n6. 开锅后大火继续炒制 3-5 分钟\n7. 待番茄汁呈中等粘稠程度后关火，散入葱花，盛盘\n\n## 附加内容\n\n- 用火注意安全、用火注意安全、用火注意安全\n- 用砂锅/铝锅炖肉时，水开后转中小火/小火，使用高压锅见[学习使用压力锅](./../../../tips/learn/高压力锅.md)\n- 教程中的番茄去皮方式是目前为止本人实践最快的方式\n- 绝对不用番茄酱和少加佐料，尽可能还原食材的原味\n\n如果您遵循本指南的制作流程而发现有问题或可以改进的流程，请提出 Issue 或 Pull request 。\n",
    "sections": [
      {
        "title": "西红柿牛腩的做法",
        "markdown": "\n西红柿牛腩汤汁浓厚酸甜可口，牛肉软绵醇香，是道开胃下饭的家常菜。富含蛋白质、维生素和番茄红素，营养均衡。对新手有一定挑战，需要掌握炖肉火候和番茄炒汁的技巧。一般初学者大约需要 90 分钟完成。\n\n预估烹饪难度：★★★★★\n\n预估卡路里：1569 大卡\n\n",
        "level": 1
      },
      {
        "title": "必备原料和工具",
        "markdown": "\n* 西红柿\n* 牛腩\n* 燃气灶（西红柿去皮用）\n* 高压锅/砂锅/普通铝锅（铁锅）\n* 2cm 两段葱段、两片姜片，葱花、姜各 10g\n* 生抽、白胡椒粉，白糖，料/黄酒，八角三小片\n* 牛腩（挑选肥瘦相间的口感比较好）\n\n",
        "level": 2
      },
      {
        "title": "计算",
        "markdown": "\n每份：\n\n- 西红柿 3-4 个（每个约 200g）\n- 牛腩 500g\n- 食用油 20-30ml\n\n",
        "level": 2
      },
      {
        "title": "操作",
        "markdown": "\n1. 牛腩切条、切块成长宽高均 2cm ，冷水下锅，开锅煮制 2 分钟去除血水，捞出冲洗干净\n2. 另起锅 2L 水烧开，加入 2cm 两段葱段、两片姜片、八角、料/黄酒 5-10ml，放入焯好的牛肉，盖盖炖制（砂锅 1 小时，高压锅炖肉模式 45 分钟），筷子能轻松插透就证明炖好了\n3. 西红柿去皮：西红柿头部滑十字至腰线，筷子/刀叉从果蒂捅入，煤气灶小火，一边转动一边烤，及时拿下来查看，起皮后撕下来，切块。越小越好\n\n  - 撕皮小心烫，去皮后的西红柿特别滑，慢切注意安全\n\n4. 起锅烧油，油温 7 成热，葱、姜各 10g，番茄下锅，炒透炒出番茄红色，加入煮好的牛腩和原汤，原汤刚刚没过牛肉即可\n5. 根据个人口味放入盐、糖、生抽调味盖盖\n6. 开锅后大火继续炒制 3-5 分钟\n7. 待番茄汁呈中等粘稠程度后关火，散入葱花，盛盘\n\n",
        "level": 2
      },
      {
        "title": "附加内容",
        "markdown": "\n- 用火注意安全、用火注意安全、用火注意安全\n- 用砂锅/铝锅炖肉时，水开后转中小火/小火，使用高压锅见[学习使用压力锅](./../../../tips/learn/高压力锅.md)\n- 教程中的番茄去皮方式是目前为止本人实践最快的方式\n- 绝对不用番茄酱和少加佐料，尽可能还原食材的原味\n\n如果您遵循本指南的制作流程而发现有问题或可以改进的流程，请提出 Issue 或 Pull request 。\n",
        "level": 2
      }
    ],
    "images": []
  },
  "sourceLimitations": [
    "上游名西红柿牛腩，与番茄牛腩同菜，保留本记录身份字段。",
    "原简介一般初学者大约90分钟完成，总用时90分钟为约值；每份未给人数，不推测。",
    "原文西红柿3—4个、每个约200克，不换算为固定总重量，不沿用旧记录番茄分批加入的做法。",
    "葱段2段各2厘米、姜片2片用于炖制，炒制葱和姜各10克；最后撒葱花未另列用量，不擅分配或增加克数。",
    "白胡椒粉列在必备原料，但未量化且操作未说明使用，不新增步骤；盐、糖、生抽按口味，未给定量。",
    "八角保留原文三小片，料酒或黄酒5—10毫升；冷水焯肉和冲洗用水未量化。",
    "砂锅1小时与高压锅炖肉模式45分钟为替代路线，依原文保留，普通锅仅给转中小火或小火的说明，未补造其炖制时长。",
    "原文油温7成热未给具体温度，不换算；番茄火烤去皮的安全提醒及压力锅教程链接完整保留。"
  ]
}),
  c("紫菜蛋花汤", "Seaweed Egg Drop Soup", "家常汤", "干紫菜10克（喜欢可多放些）；鸡蛋2个；盐2克；清水1.5升（煮汤用）；食用油5毫升；葱花适量（原文未注明用量）；香油几滴；虾皮一点（可选）；虾仁适量（按口味可选，原文未注明用量及添加时机）；淀粉2克（喜欢浓稠可选）；清水适量（泡紫菜用，原文未注明用量）", "1）干紫菜用清水泡 15 分钟，捞起沥干水分备用。2）热锅，倒入 1.5 升清水、5ml 油、2g 盐。待水开后放入紫菜。3）紫菜烧开后 3 分钟，将打好的蛋液徐徐倒入锅内，30秒即可起锅。4）撒上葱花，转小火 20 秒。5）关火，出锅前放入几滴香油，也有的会放入一点虾皮，味道也不错。", "89-zicai-danhua-tang.png", "https://github.com/Anduin2017/HowToCook/blob/a2d45c6984dff9ee941da0e7c452f7965965d962/dishes/soup/%E7%B4%AB%E8%8F%9C%E8%9B%8B%E8%8A%B1%E6%B1%A4.md", null, { totalMinutes: 20 }, 1, {
  "howtocook": {
    "commit": "a2d45c6984dff9ee941da0e7c452f7965965d962",
    "path": "dishes/soup/紫菜蛋花汤.md",
    "sha256": "8b83438660e9d15b9658644b4b9c8d16eecf1207cf33ac7e2fd526aa3f760020",
    "rawMarkdown": "# 紫菜蛋花汤的做法\n\n紫菜蛋花汤是一道清淡鲜美的家常汤品，属于中式简易汤菜。紫菜富含碘、钙和膳食纤维，鸡蛋提供优质蛋白质，二者搭配营养均衡。做法非常简单，对新手友好，从准备到出锅仅需约 20 分钟。\n\n预估烹饪难度：★★\n\n预估卡路里：217 大卡\n\n## 必备原料和工具\n\n* 鸡蛋\n* 紫菜\n* 葱花\n* 水\n* 盐\n* 油\n* 虾仁（个人口味，可加可不加）\n\n## 计算\n\n按照 1 人份的份量：\n\n* 10g 的干紫菜（喜欢紫菜的可以多放些）\n* 两个鸡蛋\n* 盐 2 克\n\n## 操作\n\n1. 干紫菜用清水泡 15 分钟，捞起沥干水份备用。\n2. 热锅，倒入 1.5 升清水、5ml 油、2g 盐。待水开后放入紫菜。\n3. 紫菜烧开后 3 分钟，将打好的蛋液徐徐倒入锅内，30 秒既可起锅。\n4. 撒上葱花，转小火 20 秒。\n5. 关火，出锅前放入几滴香油，也有的会放入一点虾皮，味道也不错。\n\n## 附加内容\n\n* 水开后，将火关小，将打好的蛋液围绕中间沸腾的水倒入。为了使蛋花比较嫩，锅盖盖上熄灭火等半分钟后再打开.\n* 如果喜欢浓稠口感，可加入 2g 淀粉.\n\n如果您遵循本指南的制作流程而发现有问题或可以改进的流程，请提出 Issue 或 Pull request 。\n",
    "sections": [
      {
        "title": "紫菜蛋花汤的做法",
        "markdown": "\n紫菜蛋花汤是一道清淡鲜美的家常汤品，属于中式简易汤菜。紫菜富含碘、钙和膳食纤维，鸡蛋提供优质蛋白质，二者搭配营养均衡。做法非常简单，对新手友好，从准备到出锅仅需约 20 分钟。\n\n预估烹饪难度：★★\n\n预估卡路里：217 大卡\n\n",
        "level": 1
      },
      {
        "title": "必备原料和工具",
        "markdown": "\n* 鸡蛋\n* 紫菜\n* 葱花\n* 水\n* 盐\n* 油\n* 虾仁（个人口味，可加可不加）\n\n",
        "level": 2
      },
      {
        "title": "计算",
        "markdown": "\n按照 1 人份的份量：\n\n* 10g 的干紫菜（喜欢紫菜的可以多放些）\n* 两个鸡蛋\n* 盐 2 克\n\n",
        "level": 2
      },
      {
        "title": "操作",
        "markdown": "\n1. 干紫菜用清水泡 15 分钟，捞起沥干水份备用。\n2. 热锅，倒入 1.5 升清水、5ml 油、2g 盐。待水开后放入紫菜。\n3. 紫菜烧开后 3 分钟，将打好的蛋液徐徐倒入锅内，30 秒既可起锅。\n4. 撒上葱花，转小火 20 秒。\n5. 关火，出锅前放入几滴香油，也有的会放入一点虾皮，味道也不错。\n\n",
        "level": 2
      },
      {
        "title": "附加内容",
        "markdown": "\n* 水开后，将火关小，将打好的蛋液围绕中间沸腾的水倒入。为了使蛋花比较嫩，锅盖盖上熄灭火等半分钟后再打开.\n* 如果喜欢浓稠口感，可加入 2g 淀粉.\n\n如果您遵循本指南的制作流程而发现有问题或可以改进的流程，请提出 Issue 或 Pull request 。\n",
        "level": 2
      }
    ],
    "images": []
  },
  "sourceLimitations": [
    "原文明确1人份、准备到出锅约20分钟，总用时20分钟为约值，清水1.5升保留原量。",
    "原步骤3写倒蛋液后30秒即可起锅，步骤4又写撒葱花转小火20秒、步骤5关火，前后顺序有矛盾；规范步骤保持原序并明确披露，不擅自合并为连贯时序。",
    "原附加嫩蛋技巧为水开转小火、围绕沸腾水倒蛋液、盖盖熄火等半分钟后打开，与主步骤为另一说明，完整存档，不叠加为必须执行的新流程。",
    "虾仁在原料中可选，未给用量和添加时机；虾皮是步骤5另提的可选一点，两者不混同。",
    "葱花、泡紫菜用水未量化；香油保留几滴、虾皮保留一点，不换算克数或毫升。",
    "可选淀粉2克用于浓稠口感，原文未交代添加时机，不新增步骤。",
    "上游无图片，保留的原有展示图不属于本次 HowToCook 来源图片。"
  ]
}),
  c("银耳莲子羹", "Tremella and Lotus Seed Sweet Soup", "中式甜汤", "银耳60克（原文未注明干湿重量）；去心莲子20克；红枣6克；枸杞5—6克（可选）；冰糖10—20克（分两次各5—10克加入）；水600毫升（熬煮用）；清水适量（浸泡及清洗用，原文未注明用量）", "1）把银耳、莲子用清水浸泡 2 个小时，红枣浸泡 10 - 20 分钟，枸杞洗净，备用。2）在锅中倒入 600ml 水，烧开后依次放入银耳、莲子、红枣。3）等待水再次烧开后，盖上锅盖，转至中火继续熬。4）熬到大约 1 小时后，放入 5g - 10g 冰糖和 5g - 6g 枸杞，转至小火熬。5）小火继续熬 30 分钟，此时银耳开始呈现粘稠状态。银耳呈现粘稠状态时，用勺子及时搅拌，防止糊在锅底。6）再次放入 5g - 10g 冰糖，用勺子搅拌 5 - 10 分钟。7）关火，用勺子盛出。", "90-yiner-lianzi-geng.png", "https://github.com/Anduin2017/HowToCook/blob/a2d45c6984dff9ee941da0e7c452f7965965d962/dishes/soup/%E9%93%B6%E8%80%B3%E8%8E%B2%E5%AD%90%E7%B2%A5/%E9%93%B6%E8%80%B3%E8%8E%B2%E5%AD%90%E7%B2%A5.md", null, { totalMinutes: 210 }, 1, {
  "howtocook": {
    "commit": "a2d45c6984dff9ee941da0e7c452f7965965d962",
    "path": "dishes/soup/银耳莲子粥/银耳莲子粥.md",
    "sha256": "26b2d70247e989e283a21319280f9f2e38bab15b21be2019127717cf6235d404",
    "rawMarkdown": "# 银耳莲子粥的做法\n\n![银耳莲子粥](./银耳莲子粥.png)\n\n银耳莲子粥清甜润滑，银耳软糯、莲子绵密，是常见的滋补粥品。富含天然胶质、膳食纤维及多种微量元素，有助养心安神。制作需经历浸泡和慢熬，对新手的耐心是个考验，全程大约需要 3.5 小时。\n\n预估烹饪难度：★★★★\n\n预估卡路里：282 大卡\n\n## 必备原料和工具\n\n- 银耳\n- 去心莲子\n- 红枣\n- 枸杞（可选）\n- 冰糖\n\n## 计算\n\n按照 1 人的份量：\n\n- 银耳 60g\n- 去心莲子 20g\n- 红枣 6g\n- 枸杞 5-6g\n- 冰糖 10-20g\n\n## 操作\n\n1. 把银耳、莲子用清水浸泡 2 个小时，红枣浸泡 10 - 20 分钟，枸杞洗净，备用\n2. 在锅中倒入 600ml 水，烧开后依次放入银耳、莲子、红枣\n3. 等待水再次烧开后，盖上锅盖，转至中火继续熬\n4. 熬到大约 1 小时后，放入 5g - 10g 冰糖和 5g - 6g 枸杞，转至小火熬\n5. 小火继续熬 30 分钟，此时银耳开始呈现粘稠状态\n6. 再次放入 5g - 10g 冰糖，用勺子搅拌 5 - 10 分钟\n7. 关火，用勺子盛出\n\n## 附加内容\n\n- 当银耳呈现粘稠状态时，需要用勺子及时搅拌，防止银耳糊在锅底\n\n如果您遵循本指南的制作流程而发现有问题或可以改进的流程，请提出 Issue 或 Pull request 。\n",
    "sections": [
      {
        "title": "银耳莲子粥的做法",
        "markdown": "\n![银耳莲子粥](./银耳莲子粥.png)\n\n银耳莲子粥清甜润滑，银耳软糯、莲子绵密，是常见的滋补粥品。富含天然胶质、膳食纤维及多种微量元素，有助养心安神。制作需经历浸泡和慢熬，对新手的耐心是个考验，全程大约需要 3.5 小时。\n\n预估烹饪难度：★★★★\n\n预估卡路里：282 大卡\n\n",
        "level": 1
      },
      {
        "title": "必备原料和工具",
        "markdown": "\n- 银耳\n- 去心莲子\n- 红枣\n- 枸杞（可选）\n- 冰糖\n\n",
        "level": 2
      },
      {
        "title": "计算",
        "markdown": "\n按照 1 人的份量：\n\n- 银耳 60g\n- 去心莲子 20g\n- 红枣 6g\n- 枸杞 5-6g\n- 冰糖 10-20g\n\n",
        "level": 2
      },
      {
        "title": "操作",
        "markdown": "\n1. 把银耳、莲子用清水浸泡 2 个小时，红枣浸泡 10 - 20 分钟，枸杞洗净，备用\n2. 在锅中倒入 600ml 水，烧开后依次放入银耳、莲子、红枣\n3. 等待水再次烧开后，盖上锅盖，转至中火继续熬\n4. 熬到大约 1 小时后，放入 5g - 10g 冰糖和 5g - 6g 枸杞，转至小火熬\n5. 小火继续熬 30 分钟，此时银耳开始呈现粘稠状态\n6. 再次放入 5g - 10g 冰糖，用勺子搅拌 5 - 10 分钟\n7. 关火，用勺子盛出\n\n",
        "level": 2
      },
      {
        "title": "附加内容",
        "markdown": "\n- 当银耳呈现粘稠状态时，需要用勺子及时搅拌，防止银耳糊在锅底\n\n如果您遵循本指南的制作流程而发现有问题或可以改进的流程，请提出 Issue 或 Pull request 。\n",
        "level": 2
      }
    ],
    "images": [
      {
        "originalReference": "./银耳莲子粥.png",
        "originalUrl": "https://raw.githubusercontent.com/Anduin2017/HowToCook/a2d45c6984dff9ee941da0e7c452f7965965d962/dishes/soup/%E9%93%B6%E8%80%B3%E8%8E%B2%E5%AD%90%E7%B2%A5/%E9%93%B6%E8%80%B3%E8%8E%B2%E5%AD%90%E7%B2%A5.png",
        "path": "assets/dishes/howtocook/cn-060/1.png",
        "alt": "银耳莲子粥",
        "pageOrder": 1,
        "adjacentText": "# 银耳莲子粥的做法\n\n![银耳莲子粥](./银耳莲子粥.png)\n\n银耳莲子粥清甜润滑，银耳软糯、莲子绵密，是常见的滋补粥品。富含天然胶质、膳食纤维及多种微量元素，有助养心安神。制作需经历浸泡和慢熬，对新手的耐心是个考验，全程大约需要 3.5 小时。\n\n预估烹饪难度：★★★★\n\n预估卡路里：282 大卡\n\n## 必备原料和工具\n\n- 银耳\n- 去心莲子\n- 红枣\n- 枸杞（可选）\n- 冰糖\n\n## 计算\n\n按照 1 人的"
      }
    ]
  },
  "sourceLimitations": [
    "上游名银耳莲子粥，配方未含米谷，按该银耳莲子甜汤做法对应本记录银耳莲子羹，保留本记录名称及原文标题。",
    "原文按照1人份量、全程大约3.5小时，保留1人份及总用时210分钟约值。",
    "冰糖来源明确总量10—20克，分两次各5—10克加入；不沿用旧记录50克冰糖。",
    "银耳60克原文未注明干重或泡发后重量，不擅加干银耳身份或换算；去心莲子20克原文未注明是否干品。",
    "枸杞可选，按来源5—6克；浸泡银耳、莲子、红枣及清洗枸杞的水未量化，另有熬煮用水600毫升。",
    "原分段浸泡、熬煮及搅拌时长可能使实际总时长超过简介约3.5小时，保留各原参数，不自行改算总用时。"
  ]
})
];

export const western = [
  w("意大利肉酱面", "Spaghetti Bolognese", "意大利", "意大利面180克（可按食量浮动）；肉末80克（可按食量浮动，原文未限定肉类）；白洋葱大半个（约150克，通常约肉重两倍，可用紫洋葱）；意大利面酱300克（成品意面酱，可按情况浮动）；食用油10—15毫升；水适量（煮面用，原文未注明用量）", "1）锅中加水，烧开后放入意面（等待 6 - 12 分钟）。2）在烧水的时候可以进行下面这些步骤，但请注意煮面的时间。3）洋葱切成小丁。4）空锅中倒油，中火下入洋葱碎。5）时刻搅拌，注意不要让洋葱烧糊，直到洋葱变成半透明状。6）下入肉末，继续搅拌（搅散），直到肉末变成棕色。7）加入意大利面酱，稍微搅拌一下即可。8）把煮好的意大利面沥干水分并倒入肉酱中搅拌均匀即可（或者直接把做好的肉酱倒在意面上也行）。", "16-spaghetti-bolognese.png", "https://github.com/Anduin2017/HowToCook/blob/a2d45c6984dff9ee941da0e7c452f7965965d962/dishes/staple/%E6%84%8F%E5%BC%8F%E8%82%89%E9%85%B1%E9%9D%A2/%E6%84%8F%E5%BC%8F%E8%82%89%E9%85%B1%E9%9D%A2.md", null, { totalMinutes: 15 }, 2, {
  "howtocook": {
    "commit": "a2d45c6984dff9ee941da0e7c452f7965965d962",
    "path": "dishes/staple/意式肉酱面/意式肉酱面.md",
    "sha256": "02329109acd923c6466382e8e3b34c5ca3cd7b6befa3f45d15e25ef3fbecae6e",
    "rawMarkdown": "# 意式肉酱面的做法\n\n![意式肉酱面-预览图-1](./final.jpg)\n\n意式肉酱面是一道简单快手的家常西餐，酱汁浓郁、面条筋道，适合忙碌的日常。肉末和洋葱搭配成品意面酱，能快速补充蛋白质与碳水化合物，洋葱还含有膳食纤维。做法对初学者十分友好，全程只需简单切炒，熟练后 15 分钟就能端上桌，比方便面更满足。\n\n预估烹饪难度：★\n\n预估卡路里：1199 大卡\n\n## 必备原料和工具\n\n- 意大利面\n- 意大利面酱\n- 肉沫\n- 白洋葱（紫洋葱也可以）\n\n## 计算\n\n每次制作前需要确定计划做几份。一份正好够 2 个人吃。\n\n每份：\n\n- 意大利面 180 克（可以根据食量上下浮动）\n- 肉沫 80 克（可以根据食量上下浮动）\n- 洋葱大半个 （大约 150 克，通常是肉的两倍重）\n- 意大利面酱 300 克（可以看情况上下浮动）\n- 食用油 10-15ml\n\n## 操作\n\n1. 锅中加水，烧开后放入意面（等待 6 - 12 分钟）\n2. 在烧水的时候可以进行下面这些步骤，但请注意煮面的时间\n3. 洋葱切成小丁\n4. 空锅中倒油，中火下入洋葱碎\n5. 时刻搅拌，注意不要让洋葱烧糊，直到洋葱变成半透明状\n6. 下入肉沫，继续搅拌（搅散），直到肉末变成棕色\n7. 加入意大利面酱，稍微搅拌一下即可\n8. 把煮好的意大利面沥干水分并倒入肉酱中搅拌均匀即可（或者直接把做好的肉酱倒在意面上也行）\n\n## 附加内容\n\n- 意大利面分为很多不同的粗细，煮面条之前请注意意面盒子上标注的时间\n- 意大利面酱并不是番茄酱，平常用的番茄酱准确是叫番茄沙司，而意大利面酱虽然和番茄沙司都是调味过的番茄酱，但加的调味料不同\n\n![不同种类的意面](./spaghetti.jpg)\n![意大利面酱](./sauce.jpg)\n\n如果您遵循本指南的制作流程而发现有问题或可以改进的流程，请提出 Issue 或 Pull request 。\n",
    "sections": [
      {
        "title": "意式肉酱面的做法",
        "markdown": "\n![意式肉酱面-预览图-1](./final.jpg)\n\n意式肉酱面是一道简单快手的家常西餐，酱汁浓郁、面条筋道，适合忙碌的日常。肉末和洋葱搭配成品意面酱，能快速补充蛋白质与碳水化合物，洋葱还含有膳食纤维。做法对初学者十分友好，全程只需简单切炒，熟练后 15 分钟就能端上桌，比方便面更满足。\n\n预估烹饪难度：★\n\n预估卡路里：1199 大卡\n\n",
        "level": 1
      },
      {
        "title": "必备原料和工具",
        "markdown": "\n- 意大利面\n- 意大利面酱\n- 肉沫\n- 白洋葱（紫洋葱也可以）\n\n",
        "level": 2
      },
      {
        "title": "计算",
        "markdown": "\n每次制作前需要确定计划做几份。一份正好够 2 个人吃。\n\n每份：\n\n- 意大利面 180 克（可以根据食量上下浮动）\n- 肉沫 80 克（可以根据食量上下浮动）\n- 洋葱大半个 （大约 150 克，通常是肉的两倍重）\n- 意大利面酱 300 克（可以看情况上下浮动）\n- 食用油 10-15ml\n\n",
        "level": 2
      },
      {
        "title": "操作",
        "markdown": "\n1. 锅中加水，烧开后放入意面（等待 6 - 12 分钟）\n2. 在烧水的时候可以进行下面这些步骤，但请注意煮面的时间\n3. 洋葱切成小丁\n4. 空锅中倒油，中火下入洋葱碎\n5. 时刻搅拌，注意不要让洋葱烧糊，直到洋葱变成半透明状\n6. 下入肉沫，继续搅拌（搅散），直到肉末变成棕色\n7. 加入意大利面酱，稍微搅拌一下即可\n8. 把煮好的意大利面沥干水分并倒入肉酱中搅拌均匀即可（或者直接把做好的肉酱倒在意面上也行）\n\n",
        "level": 2
      },
      {
        "title": "附加内容",
        "markdown": "\n- 意大利面分为很多不同的粗细，煮面条之前请注意意面盒子上标注的时间\n- 意大利面酱并不是番茄酱，平常用的番茄酱准确是叫番茄沙司，而意大利面酱虽然和番茄沙司都是调味过的番茄酱，但加的调味料不同\n\n![不同种类的意面](./spaghetti.jpg)\n![意大利面酱](./sauce.jpg)\n\n如果您遵循本指南的制作流程而发现有问题或可以改进的流程，请提出 Issue 或 Pull request 。\n",
        "level": 2
      }
    ],
    "images": [
      {
        "originalReference": "./final.jpg",
        "originalUrl": "https://raw.githubusercontent.com/Anduin2017/HowToCook/a2d45c6984dff9ee941da0e7c452f7965965d962/dishes/staple/%E6%84%8F%E5%BC%8F%E8%82%89%E9%85%B1%E9%9D%A2/final.jpg",
        "path": "assets/dishes/howtocook/west-001/1.jpg",
        "alt": "意式肉酱面-预览图-1",
        "pageOrder": 1,
        "adjacentText": "# 意式肉酱面的做法\n\n![意式肉酱面-预览图-1](./final.jpg)\n\n意式肉酱面是一道简单快手的家常西餐，酱汁浓郁、面条筋道，适合忙碌的日常。肉末和洋葱搭配成品意面酱，能快速补充蛋白质与碳水化合物，洋葱还含有膳食纤维。做法对初学者十分友好，全程只需简单切炒，熟练后 15 分钟就能端上桌，比方便面更满足。\n\n预估烹饪难度：★\n\n预估卡路里：1199 大卡\n\n## 必备原料和工具\n\n- 意大利面\n- 意大利面酱\n- 肉沫\n- "
      },
      {
        "originalReference": "./spaghetti.jpg",
        "originalUrl": "https://raw.githubusercontent.com/Anduin2017/HowToCook/a2d45c6984dff9ee941da0e7c452f7965965d962/dishes/staple/%E6%84%8F%E5%BC%8F%E8%82%89%E9%85%B1%E9%9D%A2/spaghetti.jpg",
        "path": "assets/dishes/howtocook/west-001/2.jpg",
        "alt": "不同种类的意面",
        "pageOrder": 2,
        "adjacentText": "变成棕色\n7. 加入意大利面酱，稍微搅拌一下即可\n8. 把煮好的意大利面沥干水分并倒入肉酱中搅拌均匀即可（或者直接把做好的肉酱倒在意面上也行）\n\n## 附加内容\n\n- 意大利面分为很多不同的粗细，煮面条之前请注意意面盒子上标注的时间\n- 意大利面酱并不是番茄酱，平常用的番茄酱准确是叫番茄沙司，而意大利面酱虽然和番茄沙司都是调味过的番茄酱，但加的调味料不同\n\n![不同种类的意面](./spaghetti.jpg)\n![意大利面酱](./sauce.jpg)\n\n如果您遵循本指南的制作流程而发现有问题或可以改进的流程，请提出 Issue 或 Pull request 。\n"
      },
      {
        "originalReference": "./sauce.jpg",
        "originalUrl": "https://raw.githubusercontent.com/Anduin2017/HowToCook/a2d45c6984dff9ee941da0e7c452f7965965d962/dishes/staple/%E6%84%8F%E5%BC%8F%E8%82%89%E9%85%B1%E9%9D%A2/sauce.jpg",
        "path": "assets/dishes/howtocook/west-001/3.jpg",
        "alt": "意大利面酱",
        "pageOrder": 3,
        "adjacentText": "把煮好的意大利面沥干水分并倒入肉酱中搅拌均匀即可（或者直接把做好的肉酱倒在意面上也行）\n\n## 附加内容\n\n- 意大利面分为很多不同的粗细，煮面条之前请注意意面盒子上标注的时间\n- 意大利面酱并不是番茄酱，平常用的番茄酱准确是叫番茄沙司，而意大利面酱虽然和番茄沙司都是调味过的番茄酱，但加的调味料不同\n\n![不同种类的意面](./spaghetti.jpg)\n![意大利面酱](./sauce.jpg)\n\n如果您遵循本指南的制作流程而发现有问题或可以改进的流程，请提出 Issue 或 Pull request 。\n"
      }
    ]
  },
  "sourceLimitations": [
    "上游为意式肉酱面，采用成品意大利面酱和肉末的快捷版本，保持本记录名称及英文身份字段，不沿用旧记录自熬博洛尼亚肉酱配方。",
    "原文一份够2人，熟练后15分钟可端上桌，总用时15分钟仅适用于该熟练条件，不保证初学者完成时间。",
    "肉沫80克未限定动物种类，不指定牛肉或猪肉；食用油也未限定品种。",
    "洋葱保留大半个约150克及通常约肉重两倍的说明，不据此改算为160克；白洋葱可用紫洋葱替代。",
    "面条等待6—12分钟需以包装标注及不同粗细调整，原文提醒同时备菜时注意煮面时间。",
    "意大利面酱300克为成品意面酱，来源明确区别于普通番茄沙司，不替换为番茄酱或番茄罐头。",
    "煮面用水未量化，不补造；3张图片为成品与附加意面及意面酱说明图片，保留原位置，不伪造步骤映射。"
  ]
}),
  w("玛格丽特披萨", "Margherita Pizza", "意大利", "披萨面团1份约300克；番茄酱100克；马苏里拉150克；罗勒叶10片；橄榄油10毫升；盐少许", "1）烤箱和烤盘预热至最高温。2）面团拉成薄饼，抹番茄酱，铺马苏里拉。3）高温烤8–12分钟至边缘焦香，出炉放罗勒并淋橄榄油。", "17-margherita-pizza.png"),
  w("香煎牛排", "Pan-seared Steak", "欧美", "牛排450—500克（两片，厚2—3厘米）；黑胡椒粉2克（推荐粗颗粒现磨）；盐5克（推荐大颗粒海盐）；大蒜1个（约25—30克，原文实际用量约5—10克，操作另写5—8个较大蒜瓣）；橄榄油10—15毫升（推荐特级初榨）；黄油20—25克；口蘑5—10个（配菜可选）；小土豆5—10个（每个约20克，配菜可选）；小番茄5—10个（每个约15克，配菜可选）；芦笋适量（配菜可选，原文未注明用量，配菜择1—2种）；百里香2克（香草可选，新鲜枝条取3—6根，每根约10厘米）；迷迭香适量（香草可选，原文未注明用量）；预制牛排酱汁适量（可选，原文未注明用量）；小米辣适量（附加可选调味，原文未注明用量）；烤肉调味盐适量（附加替代调味选项，原文未注明用量）；水适量（洗配菜及可选煮土豆用，原文未注明用量）", "1）从冰箱中取出牛排解冻。 如果牛排处于冰冻状态，需提前一晚转移至冷藏室，并在烹饪前半小时放置在常温中。 请勿将牛排置于水中或加热解冻。2）将小番茄，小土豆和口蘑洗净，对半切开备用。3）将大蒜剥皮，留 5-8 个较大的蒜瓣，用刀背压扁备用。4）牛排的预处理：对于肉眼牛排（见如何选择不同种类的牛排），使用厨房剪刀竖直插入到肉眼牛排中心的结缔组织，剪 1-2 刀。这是因为肉眼牛排的“肉眼”（即这块结缔组织）在高温下会剧烈收缩导致牛排变形，使得牛排无法均匀受热。 对于西冷牛排，如果您不喜欢西冷牛排边上的油脂，可以用刀慢慢将其剔除。 随后，使用厨房纸包裹牛排，将牛排上附着的水全部吸干，直至牛排放在案板上拿起后不留下明显水渍即可。烹饪条件：  注：本过程适用于制作 2-3cm 厚、5-7 成熟的牛排。如果您喜欢不同的熟度，考虑将前半部分煎制时间在此基础上增加或缩短 20-30%。5）将炉灶打开高火（见附录对于火力大小的说明），同时锅中加入橄榄油，热锅 15-30 秒。6）腌制牛排。将海盐和黑胡椒均匀地撒在牛排的全部表面并用手涂抹，揉搓，使得盐和胡椒颗粒尽量嵌入到肉中。注意，腌制完成后牛排需要立即下锅，不推荐提前腌制牛排。这是因为外表涂抹的盐会析出牛肉中的水分，影响烹饪的同时丧失风味。7）热锅至油温 6-8 成（参见油温判断技巧），将牛排由近及远地缓慢放入锅中。8）如果您使用了土豆作为配菜，可以将土豆放入碗中，然后放进微波炉加热 10 分钟，或者放入开水煮 3-5 分钟。9）单面煎制 1.5 分钟（这个时间适用于 约2—3厘米厚的牛排。如果您的牛排更薄，考虑将这个时间缩短为 1 分钟。如果您的牛排更厚，考虑将这个时间增加至 2-2.5 分钟。）10）翻面，再煎制 1.5 分钟。 对于西冷牛排和菲力牛排，您需要使用筷子或者锅铲将牛排竖起来，煎它的侧面约 30 秒。11）将炉灶切换至中火，随后按顺序快速加入黄油、大蒜、百里香。用锅铲推动黄油在锅中快速涂抹直至完全融化。将大蒜压在牛排下以增加风味。12）将平底锅倾斜地放在灶上，使得油全部流到锅的一侧。13）将香料和大蒜放置在牛排上，用汤匙舀起锅中的油，不断地淋在牛排上。这个过程持续 30 秒，随后将牛排翻面，再重复这个过程 30 秒。 您可以通过观察油淋在牛排表面时的状态来判断当前的火候。如果油淋在牛排上时冒泡并且油的颜色没有变成深褐色，则油温合适。 如果您的牛排没有擦干净或使用了不推荐的方式解冻，或者使用盐进行了提前腌制，这个时候锅中会出现大量水，导致牛排最后是被“煮熟”的，从而丧失风味。 如果牛排表面出现大量的油泡并且油的颜色变成深褐色，则说明油温过高，您需要将锅移开灶台，稍等片刻再继续淋油。14）将牛排盛出放在案板上，用锡箔纸包裹，等待 5-10 分钟。这个过程（称为醒肉）的作用是利用牛排自身的温度继续加热，锁住水分。15）将配菜（土豆，番茄，蘑菇）倒入锅中，开中火煎 5 分钟。16）取出牛排，用刀切成宽度1.5厘米的肉条，此时您可以观察到牛肉的熟度。17）取出配菜，装盘，淋上锅中剩余的油或者牛排酱汁（可选）", "18-beef-steak.png", "https://github.com/Anduin2017/HowToCook/blob/a2d45c6984dff9ee941da0e7c452f7965965d962/dishes/meat_dish/%E7%89%9B%E6%8E%92/%E7%89%9B%E6%8E%92.md", null, null, 2, {
  "howtocook": {
    "commit": "a2d45c6984dff9ee941da0e7c452f7965965d962",
    "path": "dishes/meat_dish/牛排/牛排.md",
    "sha256": "708bf0f9096217237f4bdea9dddc647323044773f01523455b16fe053d2ef02f",
    "rawMarkdown": "\n# 牛排的做法\n\n![牛排成品](./牛排.jpg)\n\n这是一道经典的西式煎牛排，焦香外壳包裹着鲜嫩多汁的肉心，搭配黄油、大蒜和香草，风味浓郁。富含优质蛋白质、油脂及铁、锌等矿物质。烹饪流程对新手较为友好，但掌握火候仍需一些练习，全程 15-30 分钟即可完成。\n\n预估烹饪难度：★★★★\n\n预估卡路里：1605 大卡\n\n## 必备原料和工具\n\n- 平底锅（有条件的推荐铸铁平底锅）\n- 锡箔纸（可选）\n- 厨房纸（可选）\n- 汤匙\n- 牛排，参见[如何选择不同种类的牛排](https://zhuanlan.zhihu.com/p/72352426)\n- 橄榄油（推荐特级初榨橄榄油）\n- 黄油\n- 盐（推荐大颗粒海盐）\n- 黑胡椒粉（推荐粗颗粒现磨黑胡椒）\n- 大蒜\n- 香料（可选，推荐迷迭香或者百里香，尽量使用新鲜的植物枝条而不是这些香料磨成的粉）\n- 预制牛排酱汁（可选）\n- 配菜（ 可选，按喜好准备，这里推荐芦笋，口蘑，小番茄，小土豆，选其中的 1-2 种即可）\n\n## 计算\n\n每次制作前需要确定计划做几份。一份正好够 2 个人吃。\n\n每份：\n\n- 牛排 450-500g（两片牛排）\n- 黑胡椒粉 2g\n- 盐 5g\n- 大蒜 1 个（约 25-30g，实际用量约为 5-10g）\n- 橄榄油 10-15ml\n- 黄油 20-25g\n- 口蘑 5-10 个\n- 小土豆 5-10 个（每个约 20g）\n- 小番茄 5-10 个（每个约 15g）\n- 百里香 2g（若使用新鲜百里香枝条，取 3-6 根，每根约 10cm 长即可）\n\n## 操作\n\n### 备料\n\n1. 从冰箱中取出牛排解冻。\n\n  - 如果牛排处于冰冻状态，需提前一晚转移至冷藏室，并在烹饪前半小时放置在常温中。\n  - **请勿**将牛排**置于水中或加热解冻**。\n\n2. 将小番茄，小土豆和口蘑洗净，对半切开备用。\n3. 将大蒜剥皮，留 5-8 个较大的蒜瓣，用刀背**压扁**备用。\n4. 牛排的预处理\n\n  - 对于肉眼牛排（见[如何选择不同种类的牛排](https://zhuanlan.zhihu.com/p/72352426)），使用厨房剪刀竖直插入到肉眼牛排中心的结缔组织，剪 1-2 刀。这是因为肉眼牛排的“肉眼”（即这块结缔组织）在高温下会剧烈收缩导致牛排变形，使得牛排无法均匀受热。\n  - 对于西冷牛排，如果您不喜欢西冷牛排边上的油脂，可以用刀慢慢将其剔除。\n  - 随后，使用厨房纸包裹牛排，将牛排上附着的水全部吸干，直至牛排放在案板上拿起后不留下明显水渍即可。\n\n### 烹饪\n\n 注：本过程适用于制作 2-3cm 厚、5-7 成熟的牛排。如果您喜欢不同的熟度，考虑将前半部分煎制时间在此基础上增加或缩短 20-30%。\n\n1. 将炉灶打开高火（见附录对于火力大小的说明），同时锅中加入橄榄油，热锅 15-30 秒。\n2. 腌制牛排。将海盐和黑胡椒均匀的洒在牛排的全部表面并用手涂抹，揉搓，使得盐和胡椒颗粒尽量嵌入到肉中。注意，腌制完成后牛排**需要立即下锅，不推荐提前腌制牛排**。这是因为外表涂抹的盐会析出牛肉中的水分，影响烹饪的同时丧失风味。\n3. 热锅至油温 6-8 成（参见[油温判断技巧](./../../../tips/advanced/油温判断技巧.md)），将牛排由近及远的缓慢放入锅中。\n4. 如果您使用了土豆作为配菜，可以将土豆放入碗中，然后放进微波炉加热 10 分钟，或者放入开水煮 3-5 分钟。\n5. 单面煎制 1.5 分钟（这个时间适用于 2-3cm 厚大约的牛排。如果您的牛排更薄，考虑将这个时间缩短为 1 分钟。如果您的牛排更厚，考虑将这个时间增加至 2-2.5 分钟。）\n6. 翻面，再煎制 1.5 分钟。\n\n  - 对于西冷牛排和菲力牛排，您需要使用筷子或者锅铲将牛排竖起来，煎它的侧面约 30 秒。\n\n7. 将炉灶切换至中火，随后按顺序**快速加入**黄油、大蒜、百里香。用锅铲推动黄油在锅中快速涂抹直至完全融化。将大蒜压在牛排下以增加风味。\n8. 将平底锅**倾斜地放在灶上**，使得油全部流到锅的一侧。\n9. 将香料和大蒜放置在牛排上，用汤匙舀起锅中的油，不断地淋在牛排上。这个过程持续 30 秒，随后将牛排翻面，再重复这个过程 30 秒。\n\n  - 您可以通过观察油淋在牛排表面时的状态来判断当前的火候。如果油淋在牛排上时冒泡并且油的颜色没有变成深褐色，则油温合适。\n  - 如果您的牛排没有擦干净或使用了不推荐的方式解冻，或者使用盐进行了提前腌制，这个时候锅中会出现大量水，导致牛排最后是被“煮熟”的，从而丧失风味。\n  - 如果牛排表面出现大量的油泡并且油的颜色变成深褐色，则说明油温过高，您需要将锅移开灶台，稍等片刻再继续淋油。\n\n10. 将牛排盛出放在案板上，用锡箔纸包裹，等待 5-10 分钟。这个过程（称为醒肉）的作用是利用牛排自身的温度继续加热，锁住水分。\n11. 将配菜（土豆，番茄，蘑菇）倒入锅中，开中火煎 5 分钟。\n12. 取出牛排，用刀切成宽度 1.5cm 宽度的肉条，此时您可以观察到牛肉的熟度。\n13. 取出配菜，装盘，淋上锅中剩余的油或者牛排酱汁（可选）\n\n## 附加内容\n\n### 火候的控制\n\n煎制牛排是控制火候的艺术。限于篇幅，这里简单给出一些定量评估火力的方法和本文中用到的与火候相关的术语。更多内容参见[油温判断技巧](./../../../tips/advanced/油温判断技巧.md)。\n\n- 对于电磁炉：\n  - 高火：功率 1.8Kw - 2.2kw。\n  - 中火：功率 800w - 1.4kw。  \n  - 小火：功率 200w - 600w。\n- 对于燃气灶：\n  - 高火：旋转气阀至最大出气速度的 70%-90%。\n  - 中火：旋转气阀至最大出气速度的 40%-60%。\n  - 小火：旋转气阀至最大出气速度的 10%-30%。\n\n### 关于调味\n\n牛排的调味不一定需要遵循本指南的规范。通常来说，大蒜、黑胡椒和黄油是必须的，但如果您不喜欢迷迭香或百里香等唇形科植物等味道，您可以自由尝试其他牛排调味料进行调味。市面上也有售卖的多种烤肉调味盐可供选择。笔者曾发现一种中西结合的做法，即将小米辣切开与蒜片加入橄榄油中煎，并作为调味在最后淋到牛排上，也独具风味。\n\n如果您遵循本指南的制作流程而发现有问题或可以改进的流程，请提出 Issue 或 Pull request 。\n",
    "sections": [
      {
        "title": "牛排的做法",
        "markdown": "\n![牛排成品](./牛排.jpg)\n\n这是一道经典的西式煎牛排，焦香外壳包裹着鲜嫩多汁的肉心，搭配黄油、大蒜和香草，风味浓郁。富含优质蛋白质、油脂及铁、锌等矿物质。烹饪流程对新手较为友好，但掌握火候仍需一些练习，全程 15-30 分钟即可完成。\n\n预估烹饪难度：★★★★\n\n预估卡路里：1605 大卡\n\n",
        "level": 1
      },
      {
        "title": "必备原料和工具",
        "markdown": "\n- 平底锅（有条件的推荐铸铁平底锅）\n- 锡箔纸（可选）\n- 厨房纸（可选）\n- 汤匙\n- 牛排，参见[如何选择不同种类的牛排](https://zhuanlan.zhihu.com/p/72352426)\n- 橄榄油（推荐特级初榨橄榄油）\n- 黄油\n- 盐（推荐大颗粒海盐）\n- 黑胡椒粉（推荐粗颗粒现磨黑胡椒）\n- 大蒜\n- 香料（可选，推荐迷迭香或者百里香，尽量使用新鲜的植物枝条而不是这些香料磨成的粉）\n- 预制牛排酱汁（可选）\n- 配菜（ 可选，按喜好准备，这里推荐芦笋，口蘑，小番茄，小土豆，选其中的 1-2 种即可）\n\n",
        "level": 2
      },
      {
        "title": "计算",
        "markdown": "\n每次制作前需要确定计划做几份。一份正好够 2 个人吃。\n\n每份：\n\n- 牛排 450-500g（两片牛排）\n- 黑胡椒粉 2g\n- 盐 5g\n- 大蒜 1 个（约 25-30g，实际用量约为 5-10g）\n- 橄榄油 10-15ml\n- 黄油 20-25g\n- 口蘑 5-10 个\n- 小土豆 5-10 个（每个约 20g）\n- 小番茄 5-10 个（每个约 15g）\n- 百里香 2g（若使用新鲜百里香枝条，取 3-6 根，每根约 10cm 长即可）\n\n",
        "level": 2
      },
      {
        "title": "操作",
        "markdown": "\n",
        "level": 2
      },
      {
        "title": "备料",
        "markdown": "\n1. 从冰箱中取出牛排解冻。\n\n  - 如果牛排处于冰冻状态，需提前一晚转移至冷藏室，并在烹饪前半小时放置在常温中。\n  - **请勿**将牛排**置于水中或加热解冻**。\n\n2. 将小番茄，小土豆和口蘑洗净，对半切开备用。\n3. 将大蒜剥皮，留 5-8 个较大的蒜瓣，用刀背**压扁**备用。\n4. 牛排的预处理\n\n  - 对于肉眼牛排（见[如何选择不同种类的牛排](https://zhuanlan.zhihu.com/p/72352426)），使用厨房剪刀竖直插入到肉眼牛排中心的结缔组织，剪 1-2 刀。这是因为肉眼牛排的“肉眼”（即这块结缔组织）在高温下会剧烈收缩导致牛排变形，使得牛排无法均匀受热。\n  - 对于西冷牛排，如果您不喜欢西冷牛排边上的油脂，可以用刀慢慢将其剔除。\n  - 随后，使用厨房纸包裹牛排，将牛排上附着的水全部吸干，直至牛排放在案板上拿起后不留下明显水渍即可。\n\n",
        "level": 3
      },
      {
        "title": "烹饪",
        "markdown": "\n 注：本过程适用于制作 2-3cm 厚、5-7 成熟的牛排。如果您喜欢不同的熟度，考虑将前半部分煎制时间在此基础上增加或缩短 20-30%。\n\n1. 将炉灶打开高火（见附录对于火力大小的说明），同时锅中加入橄榄油，热锅 15-30 秒。\n2. 腌制牛排。将海盐和黑胡椒均匀的洒在牛排的全部表面并用手涂抹，揉搓，使得盐和胡椒颗粒尽量嵌入到肉中。注意，腌制完成后牛排**需要立即下锅，不推荐提前腌制牛排**。这是因为外表涂抹的盐会析出牛肉中的水分，影响烹饪的同时丧失风味。\n3. 热锅至油温 6-8 成（参见[油温判断技巧](./../../../tips/advanced/油温判断技巧.md)），将牛排由近及远的缓慢放入锅中。\n4. 如果您使用了土豆作为配菜，可以将土豆放入碗中，然后放进微波炉加热 10 分钟，或者放入开水煮 3-5 分钟。\n5. 单面煎制 1.5 分钟（这个时间适用于 2-3cm 厚大约的牛排。如果您的牛排更薄，考虑将这个时间缩短为 1 分钟。如果您的牛排更厚，考虑将这个时间增加至 2-2.5 分钟。）\n6. 翻面，再煎制 1.5 分钟。\n\n  - 对于西冷牛排和菲力牛排，您需要使用筷子或者锅铲将牛排竖起来，煎它的侧面约 30 秒。\n\n7. 将炉灶切换至中火，随后按顺序**快速加入**黄油、大蒜、百里香。用锅铲推动黄油在锅中快速涂抹直至完全融化。将大蒜压在牛排下以增加风味。\n8. 将平底锅**倾斜地放在灶上**，使得油全部流到锅的一侧。\n9. 将香料和大蒜放置在牛排上，用汤匙舀起锅中的油，不断地淋在牛排上。这个过程持续 30 秒，随后将牛排翻面，再重复这个过程 30 秒。\n\n  - 您可以通过观察油淋在牛排表面时的状态来判断当前的火候。如果油淋在牛排上时冒泡并且油的颜色没有变成深褐色，则油温合适。\n  - 如果您的牛排没有擦干净或使用了不推荐的方式解冻，或者使用盐进行了提前腌制，这个时候锅中会出现大量水，导致牛排最后是被“煮熟”的，从而丧失风味。\n  - 如果牛排表面出现大量的油泡并且油的颜色变成深褐色，则说明油温过高，您需要将锅移开灶台，稍等片刻再继续淋油。\n\n10. 将牛排盛出放在案板上，用锡箔纸包裹，等待 5-10 分钟。这个过程（称为醒肉）的作用是利用牛排自身的温度继续加热，锁住水分。\n11. 将配菜（土豆，番茄，蘑菇）倒入锅中，开中火煎 5 分钟。\n12. 取出牛排，用刀切成宽度 1.5cm 宽度的肉条，此时您可以观察到牛肉的熟度。\n13. 取出配菜，装盘，淋上锅中剩余的油或者牛排酱汁（可选）\n\n",
        "level": 3
      },
      {
        "title": "附加内容",
        "markdown": "\n",
        "level": 2
      },
      {
        "title": "火候的控制",
        "markdown": "\n煎制牛排是控制火候的艺术。限于篇幅，这里简单给出一些定量评估火力的方法和本文中用到的与火候相关的术语。更多内容参见[油温判断技巧](./../../../tips/advanced/油温判断技巧.md)。\n\n- 对于电磁炉：\n  - 高火：功率 1.8Kw - 2.2kw。\n  - 中火：功率 800w - 1.4kw。  \n  - 小火：功率 200w - 600w。\n- 对于燃气灶：\n  - 高火：旋转气阀至最大出气速度的 70%-90%。\n  - 中火：旋转气阀至最大出气速度的 40%-60%。\n  - 小火：旋转气阀至最大出气速度的 10%-30%。\n\n",
        "level": 3
      },
      {
        "title": "关于调味",
        "markdown": "\n牛排的调味不一定需要遵循本指南的规范。通常来说，大蒜、黑胡椒和黄油是必须的，但如果您不喜欢迷迭香或百里香等唇形科植物等味道，您可以自由尝试其他牛排调味料进行调味。市面上也有售卖的多种烤肉调味盐可供选择。笔者曾发现一种中西结合的做法，即将小米辣切开与蒜片加入橄榄油中煎，并作为调味在最后淋到牛排上，也独具风味。\n\n如果您遵循本指南的制作流程而发现有问题或可以改进的流程，请提出 Issue 或 Pull request 。\n",
        "level": 3
      }
    ],
    "images": [
      {
        "originalReference": "./牛排.jpg",
        "originalUrl": "https://raw.githubusercontent.com/Anduin2017/HowToCook/a2d45c6984dff9ee941da0e7c452f7965965d962/dishes/meat_dish/%E7%89%9B%E6%8E%92/%E7%89%9B%E6%8E%92.jpg",
        "path": "assets/dishes/howtocook/west-003/1.jpg",
        "alt": "牛排成品",
        "pageOrder": 1,
        "adjacentText": "\n# 牛排的做法\n\n![牛排成品](./牛排.jpg)\n\n这是一道经典的西式煎牛排，焦香外壳包裹着鲜嫩多汁的肉心，搭配黄油、大蒜和香草，风味浓郁。富含优质蛋白质、油脂及铁、锌等矿物质。烹饪流程对新手较为友好，但掌握火候仍需一些练习，全程 15-30 分钟即可完成。\n\n预估烹饪难度：★★★★\n\n预估卡路里：1605 大卡\n\n## 必备原料和工具\n\n- 平底锅（有条件的推荐铸铁平底锅）\n- 锡箔纸（可选）\n- 厨房"
      }
    ]
  },
  "sourceLimitations": [
    "原文一份供2人、两片牛排共450—500克；配菜数量及每份规则原样保留，不换算成人均量。",
    "原简介全程15—30分钟为范围，不设置单一总用时；冰冻牛排另需提前一晚冷藏解冻和烹饪前半小时室温放置。",
    "大蒜计算列1个约25—30克、实际用量约5—10克，但操作留5—8个大蒜瓣，计量不一致，全部保留不自行取舍或换算。",
    "原过程适用于2—3厘米厚、5—7成熟牛排，熟度与厚薄调整、立即下锅不提前腌制、擦干及淋油观察等条件完整保留，不补造中心温度。",
    "配菜来源推荐芦笋、口蘑、小番茄、小土豆择1—2种，量化清单分别保留各选项，不要求全部使用。",
    "原料香草可选，规范步骤按原文百里香路线保留；附加其他调味和小米辣蒜片橄榄油做法保存在原文，不替换主流程。",
    "水煮土豆及洗配菜所用水未量化；可选预制牛排酱汁、芦笋、迷迭香、小米辣及替代烤肉调味盐无用量，不补造。"
  ]
}),
  w("凯撒沙拉", "Caesar Salad", "美式/意式", "特级初榨橄榄油3汤匙加1/4杯（共105毫升，面包丁用45毫升，酱汁用60毫升）；大蒜2瓣（中等大小，切末约2茶匙）；质地结实的面包3杯（切成约1.9厘米方丁）；帕尔马干酪约57克（2盎司，细磨后约1杯，烤前与出炉后各用2汤匙，酱汁用1/4杯，余下分次拌入和撒在沙拉上）；犹太盐适量；现磨黑胡椒适量；大鸡蛋蛋黄1个；柠檬汁1汤匙（15毫升，取自1个柠檬）；凤尾鱼2—6条；伍斯特酱1茶匙（5毫升）；菜籽油1/3杯（80毫升）；罗马生菜2棵（只取内叶，大叶撕小，小叶完整）；冷水适量（冲洗生菜用）", "1）将烤架放在烤箱中层，预热至190℃。将2瓣大蒜切末，放入小碗，与3汤匙（45毫升）特级初榨橄榄油搅拌30秒。将细网滤筛架在大碗上，倒入蒜油，用勺背按压蒜末，尽量挤出油，滤下的蒜末另留备用。将3杯面包切成约1.9厘米方丁，加入滤出的蒜香油拌匀，让面包丁裹上油。2）加入2汤匙细磨帕尔马干酪，再次拌匀，以适量犹太盐和现磨黑胡椒调味，移至有边沿的烤盘。烤约15分钟，至面包丁呈浅金黄色且酥脆；取出，再拌入2汤匙帕尔马干酪，放凉。来源整道菜的时间栏列出冷却10分钟，此处烤制方向只要求放凉。3）趁面包丁烘烤时制作酱汁。将1个大鸡蛋蛋黄、1汤匙（15毫升）柠檬汁、2—6条凤尾鱼、1茶匙（5毫升）伍斯特酱、步骤1留存的蒜末和1/4杯帕尔马干酪放入刚好容纳手持搅拌器头的杯底，也可放入食品料理机底部。开动机器，缓缓淋入1/3杯（80毫升）菜籽油，直至形成细滑的乳化酱汁。倒入中碗，持续用手动打蛋器搅拌，缓缓淋入剩余1/4杯（60毫升）特级初榨橄榄油，以适量犹太盐和现磨黑胡椒充分调味。特级初榨橄榄油应在乳化后手动搅入，避免电动搅打造成苦味。凤尾鱼和伍斯特酱的用量可按口味调整。来源生蛋提示：怀孕期间或对生蛋安全有顾虑时，可购买已巴氏杀菌的鸡蛋；来源另给出用低温循环器在57℃（135°F）处理鸡蛋2小时的家庭选项。4）剥去2棵罗马生菜松软的外叶，只保留脆挺的内叶；切去基部约2.54厘米以分离叶片，取下已松开的叶片后，再切去约2.54厘米以分离中心的剩余叶片。即使生菜已预洗，也用冷水仔细冲洗，再放在多层厨房纸上仔细擦干，避免碰伤。最大的叶片撕半，大叶撕小，小叶保留完整。取足够大的碗，先加入生菜和几汤匙酱汁，用手轻轻拌匀，需要时再加酱汁，避免撞伤或弄碎叶片。叶片裹匀后，加入剩余帕尔马干酪的一半和面包丁的四分之三，再拌匀。装入沙拉碗，撒上余下的干酪和面包丁，即可食用。本配方为4人份，制成的酱汁会多于4份沙拉所需，额外酱汁可冷藏最多1周。", "19-caesar-salad.png", "https://www.seriouseats.com/the-best-caesar-salad-recipe", {
    sourceName: "Serious Eats",
    recipePageUrl: "https://www.seriouseats.com/the-best-caesar-salad-recipe",
    mediaPageUrl: "https://www.seriouseats.com/the-best-caesar-salad-recipe",
    author: "Diana Chistruga",
    rightsNotice: "Serious Eats / Diana Chistruga",
    reuseLicense: null,
    repositoryCopyAuthorization: "user_confirmed_2026-09-16",
    hero: {
      path: "assets/dishes/sources/west-004-caesar-salad/hero.webp",
      originalUrl: "https://www.seriouseats.com/thmb/CI40mF5sQEuUr1voWRdbA2bjscs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/the-best-caesar-salad-recipe-06-40e70f549ba2489db09355abd62f79a9.jpg",
      sha256: "64348ee15db8056b758bb69957f60843575fe3483c2ed3431b801bd4d2a674ad",
      httpStatus: 200,
      contentType: "image/webp"
    },
    steps: [
      { stepOrder: 1, sourceStepOrder: 1, path: "assets/dishes/sources/west-004-caesar-salad/step-1.webp", originalUrl: "https://www.seriouseats.com/thmb/x02Ditablcpk_F8mzO_kr57MCkU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/the-best-caesar-salad-recipe-step-1-collage-72fb5db0685240df9a3cd425054941a2.jpg", sha256: "1aadb67ac217f654647fcef945d588403b032328b42a6827d016d5e9b48c807e", httpStatus: 200, contentType: "image/webp" },
      { stepOrder: 2, sourceStepOrder: 2, path: "assets/dishes/sources/west-004-caesar-salad/step-2.webp", originalUrl: "https://www.seriouseats.com/thmb/NKCebTxWM6fs-7mgL60f5FJuN6A=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/the-best-caesar-salad-recipe-step-2-collage-9e2703813f5f4310b2aa2b75d4ef2ffb.jpg", sha256: "25d49bf6642a803a9e237a0ff92f8ffe769b6f44a801dc650ac43bdab2c5d8bb", httpStatus: 200, contentType: "image/webp" },
      { stepOrder: 3, sourceStepOrder: 3, path: "assets/dishes/sources/west-004-caesar-salad/step-3.webp", originalUrl: "https://www.seriouseats.com/thmb/aoDBKKQVT_TM69Iv1DscCSvAjvg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/the-best-caesar-salad-recipe-step-3-collage-fa335ddff899490db49c70cb7b49ad79.jpg", sha256: "81484293448f7c526bd15236762a9b98fd264bab9293bb985e35e0e96a39cfaf", httpStatus: 200, contentType: "image/webp" },
      { stepOrder: 4, sourceStepOrder: 4, path: "assets/dishes/sources/west-004-caesar-salad/step-4.webp", originalUrl: "https://www.seriouseats.com/thmb/YLDOfEhM9I761R44rsZPa3346JA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/the-best-caesar-salad-recipe-step-4-collage-34f35d856f93430c8f4938ccea3af5b8.jpg", sha256: "abbe7ef92f4d7a9e828f23bacfa52a8ce3c28116d96e33b84ade379bae09d7e3", httpStatus: 200, contentType: "image/webp" }
    ]
  }, { totalMinutes: 35, prepMinutes: 5, cookMinutes: 20, stepDurations: [null, null, null, null] }, 4),
  w("芝士汉堡", "Cheeseburger", "美国", "牛肉馅360克；汉堡胚2个；切达芝士2片；生菜2片；番茄4片；洋葱适量；酸黄瓜适量；盐和黑胡椒；酱料适量", "1）牛肉轻拢成2个肉饼，煎前撒盐胡椒。2）热锅每面煎2–4分钟，翻面后铺芝士融化。3）面包胚烤香，依次叠酱、生菜、肉饼、番茄和酸黄瓜。", "20-cheeseburger.png"),
  w("法式洋葱汤", "French Onion Soup", "法国", "无盐黄油90克，另取适量涂面包；洋葱1.4千克（黄洋葱或混合洋葱，切约3.2毫米厚片）；犹太盐适量（分次调味）；现磨黑胡椒适量（分次调味）；干雪莉酒120毫升（如Amontillado，可选味美思、白葡萄酒、红葡萄酒或波特酒替代，替代用量来源未给出）；高汤1.8升（自制牛高汤，或自制鸡高汤，或低钠市售鸡高汤）；百里香2枝；月桂叶1片；鱼露5毫升（可选）；苹果醋5毫升；乡村面包8片（与碗口大小相称，烤至酥脆）；大蒜1瓣（中等大小）；格鲁耶尔干酪450克（磨碎，分次使用）；细香葱末2汤匙（装饰用）；清水15毫升（每次在锅底洋葱汁液将要焦煳时使用）", "1）将1.4千克洋葱切成约3.2毫米厚片。黄洋葱适合这道汤，也可混用黄洋葱、甜洋葱（如Vidalia）、红洋葱和红葱头，以增加风味层次。在一个大不锈钢汤锅，或两个大不锈钢或铸铁平底锅中，以中高火融化90克无盐黄油至起泡。加入洋葱，偶尔翻动，炒约8分钟至变软；转中低火，经常翻动，继续炒1—2小时，至洋葱非常软、甘甜且呈浓郁金棕色，避免炒得过深而发苦。焦糖化速度会随锅具、批量和脂肪而变化。若锅底褐色洋葱汁液将要焦煳，加入15毫升清水，刮起褐色附着物，再继续炒，必要时按此方法加水。用适量犹太盐和现磨黑胡椒调味。2）加入120毫升干雪莉酒，煮至微沸，同时刮起锅底褐色附着物。若用了两个平底锅，将雪莉酒分加至两锅，再把两锅中的洋葱和液体刮入一个汤锅或荷兰锅，继续煮约3分钟，至酒精气味基本散去。雪莉酒也可用味美思（vermouth）、白葡萄酒、红葡萄酒或波特酒替代，来源未列出各替代用量。加入1.8升高汤、2枝百里香和1片月桂叶，升至中高火，煮到微沸，再调低火力，保持微沸20分钟。高汤优先用自制牛高汤，也可用自制鸡高汤或低钠市售鸡高汤。3）加入5毫升苹果醋；如选用鱼露，此时一并加入5毫升鱼露。以适量犹太盐和现磨黑胡椒调味，取出并丢弃百里香枝和月桂叶。鱼露、苹果醋和雪莉酒可增加汤底的风味层次。4）将8片与碗口大小相称的乡村面包烤至酥脆。预热烤箱上火，将烤架调至最上层。用另取的适量无盐黄油涂抹烤面包片，再用1瓣大蒜擦至有香气。在4个可入烤箱的汤碗底部各舀少量汤汁，先用其中4片烤面包，每碗各放1片，撒一些磨碎的格鲁耶尔干酪。继续舀入汤和洋葱，至接近碗满，再将剩余4片烤面包各放1片入碗，向下轻压至几乎浸入汤中。覆盖余下的干酪，将4个汤碗放在有边沿的烤盘上，用上火烤至干酪融化且局部呈棕色，最后撒上2汤匙细香葱末，即可食用。", "21-french-onion-soup.png", "https://www.seriouseats.com/french-onion-soup-recipe", {
    sourceName: "Serious Eats",
    recipePageUrl: "https://www.seriouseats.com/french-onion-soup-recipe",
    mediaPageUrl: "https://www.seriouseats.com/french-onion-soup-recipe",
    author: "Julia Estrada",
    recipeAuthor: "Daniel Gritzer",
    rightsNotice: "Serious Eats / Julia Estrada",
    reuseLicense: null,
    repositoryCopyAuthorization: "user_confirmed_2026-09-16",
    hero: {
      path: "assets/dishes/sources/west-006-french-onion-soup/hero.webp",
      originalUrl: "https://www.seriouseats.com/thmb/LrfQvaX1S3PgpfxshU55RMSwHDo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/SEA-french-onion-soup-recipe-hero-01-cbeea4db88344d00bc2254d4d2df602e.jpg",
      sha256: "7770b56f9992e1b88a37d53185dbc8e0f1155e8b9cf85e550aebd1649ca43dbd",
      httpStatus: 200,
      contentType: "image/webp"
    },
    steps: [
      { stepOrder: 1, sourceStepOrder: 1, path: "assets/dishes/sources/west-006-french-onion-soup/step-1.webp", originalUrl: "https://www.seriouseats.com/thmb/6Xq4Ki9mPtZHyn-0OIgv3y5eWyE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/SEA-french-onion-soup-recipe-step-1-91802185e9974b5ca0783d63be59354b.jpg", sha256: "e5d65400ca392b8c6cd8aab5561306fece39d5a203d9b2403f689af053702bf6", httpStatus: 200, contentType: "image/webp" },
      { stepOrder: 2, sourceStepOrder: 2, path: "assets/dishes/sources/west-006-french-onion-soup/step-2.webp", originalUrl: "https://www.seriouseats.com/thmb/qTDM_j4mtUB8BZ7dogvgZGRWLCQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/SEA-french-onion-soup-recipe-step-2-ce9e81870c034814a10f667e2e59b19b.jpg", sha256: "d1f10cc3bb1b356df944ba6a80d9874ad5d9bc8907984ebb2fe0402eea43aeb8", httpStatus: 200, contentType: "image/webp" },
      { stepOrder: 3, sourceStepOrder: 3, path: "assets/dishes/sources/west-006-french-onion-soup/step-3.webp", originalUrl: "https://www.seriouseats.com/thmb/jsYMjwBbqDyFH5AFQfV_jSabDh0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/SEA-french-onion-soup-recipe-step-03-1-5491d6b1f31c426b803e6eb20f9ea8b3.jpg", sha256: "4b53bf1009ca0e755c120f61f445cc8ad5b84691ea90ae183faf7f256a07b56b", httpStatus: 200, contentType: "image/webp" },
      { stepOrder: 4, sourceStepOrder: 4, path: "assets/dishes/sources/west-006-french-onion-soup/step-4.webp", originalUrl: "https://www.seriouseats.com/thmb/UY7jZudw10sC5sx21huU5-DziLI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/SEA-french-onion-soup-recipe-step-04-69e8eef9e229429ca589dffcd7e6e04c.jpg", sha256: "d6f77bb911d562cf9478ea86a97d937d4d4b00fadcaa18f7fe524e72640ba5ee", httpStatus: 200, contentType: "image/webp" }
    ]
  }, { totalMinutes: 140, prepMinutes: 20, cookMinutes: 120, stepDurations: [null, null, null, null] }, 4),
  w("炸鱼薯条", "Fish and Chips", "英国", "鳕鱼柳400克；土豆500克；面粉150克；啤酒200毫升；泡打粉3克；盐和黑胡椒；食用油适量；塔塔酱适量", "1）土豆条低温炸熟，升温复炸至脆。2）面粉、泡打粉和冰啤酒快速调糊，鱼柳调味后蘸糊。3）炸至金黄熟透，配薯条、柠檬和塔塔酱。", "22-fish-and-chips.png", "https://www.bbcgoodfood.com/howto/guide/great-british-seaside-recipes"),
  w("西班牙海鲜饭", "Seafood Paella", "西班牙", "短粒米300克；虾8只；贻贝400克；鱿鱼150克；番茄150克；高汤750毫升；藏红花少许；甜椒粉3克；橄榄油25毫升", "1）锅中炒香鱿鱼、番茄和甜椒粉，加入米拌匀。2）倒入藏红花高汤，铺虾和贻贝后不再搅动。3）中小火煮至米熟底部略焦，关火盖布焖5分钟。", "23-spanish-paella.png"),
  w("德式烤香肠", "German Bratwurst", "德国", "德式香肠6根；洋葱200克；啤酒330毫升；黄油20克；酸菜300克；芥末适量；黑胡椒少许", "1）黄油炒软洋葱，加入香肠和啤酒小火煮10分钟。2）取出香肠煎烤至表面焦香。3）酸菜加热，与洋葱、香肠和芥末同食。", "24-german-bratwurst.png"),
  w("香草烤鸡", "Herb Roast Chicken", "欧美", "鸡腿肉1—2个/人；盐2克/人；黑胡椒0.5克/人；橄榄油5毫升/人；蒜1瓣/人；柠檬汁5毫升/人；欧芹1根/人；蜂蜜适量（烤制时可选，原文未注明用量，可替换为其他烤肉酱）；烤肉酱适量（烤制时可选，与蜂蜜二选一，原文未注明用量）", "1）鸡肉的预处理：鸡腿肉涂上盐、黑胡椒、橄榄油和蒜末。2）放入预热至 180 度的烤箱中，烤 30-40 分钟或至熟。烤制时间根据鸡肉大小和厚度调整，必须确保鸡肉全熟后才能食用。3）佐料的准备：欧芹切成碎末备用。4）柠檬挤出汁备用。5）烤制：烤好的鸡肉取出，淋上柠檬汁。6）撒上欧芹碎即可。", "25-herb-roast-chicken.png", "https://github.com/Anduin2017/HowToCook/blob/a2d45c6984dff9ee941da0e7c452f7965965d962/dishes/meat_dish/%E6%84%8F%E5%BC%8F%E7%83%A4%E9%B8%A1.md", null, { totalMinutes: 50 }, 1, {
  "howtocook": {
    "commit": "a2d45c6984dff9ee941da0e7c452f7965965d962",
    "path": "dishes/meat_dish/意式烤鸡.md",
    "sha256": "858f0a7409f90deb98cd61c34263c897f63e233a6104e5fc9dc3ba81f27a559c",
    "rawMarkdown": "# 意式烤鸡的做法\n\n意式烤鸡是一道带有地中海风味的家常烤箱菜。鸡腿肉经过蒜香橄榄油腌制，烤后外皮微焦、内里鲜嫩多汁，搭配柠檬汁和欧芹，口感清爽不腻。鸡肉富含优质蛋白质，橄榄油提供不饱和脂肪酸，营养均衡。制作难度适中，需要提前预热烤箱，新手跟着步骤也能顺利完成，从腌制到出炉总计约五十分钟。\n\n预估烹饪难度：★★★\n\n预估卡路里：315 大卡\n\n## 必备原料和工具\n\n- 鸡腿肉\n- 盐\n- 黑胡椒\n- 橄榄油\n- 蒜\n- 柠檬汁\n- 欧芹\n\n## 计算\n\n- 鸡腿肉用量通常来说为 1-2 个/人\n- 盐用量为 2 g/人\n- 黑胡椒用量为 0.5 g/人\n- 橄榄油用量为 5 ml/人\n- 蒜用量为 1 瓣/人\n- 柠檬汁用量为 5ml/人\n- 欧芹用量为 1 根/人\n\n使用上述条件，计算出计划使用的原材料比例。\n\n## 操作\n\n### 鸡肉的预处理\n\n1. 鸡腿肉涂上盐、黑胡椒、橄榄油和蒜末\n2. 放入预热至 180 度的烤箱中，烤 30-40 分钟或至熟\n\n### 佐料的准备\n\n1. 欧芹切成碎末备用\n2. 柠檬挤出汁备用\n\n### 烤制\n\n1. 烤好的鸡肉取出，淋上柠檬汁\n2. 撒上欧芹碎即可\n\n## 附加内容\n\n- 烤制时可以将鸡肉淋上蜂蜜或其他烤肉酱提升口感\n- 烤箱预热至 180 度，烤制时间根据鸡肉的大小和厚度而定，需确保鸡肉熟透\n- 鸡肉必须全熟才能吃，吃未全熟的鸡肉可能会导致食物中毒和感染细菌，如沙门氏菌和福氏杆菌等。\n\n如果您遵循本指南的制作流程而发现有问题或可以改进的流程，请提出 Issue 或 Pull request 。\n",
    "sections": [
      {
        "title": "意式烤鸡的做法",
        "markdown": "\n意式烤鸡是一道带有地中海风味的家常烤箱菜。鸡腿肉经过蒜香橄榄油腌制，烤后外皮微焦、内里鲜嫩多汁，搭配柠檬汁和欧芹，口感清爽不腻。鸡肉富含优质蛋白质，橄榄油提供不饱和脂肪酸，营养均衡。制作难度适中，需要提前预热烤箱，新手跟着步骤也能顺利完成，从腌制到出炉总计约五十分钟。\n\n预估烹饪难度：★★★\n\n预估卡路里：315 大卡\n\n",
        "level": 1
      },
      {
        "title": "必备原料和工具",
        "markdown": "\n- 鸡腿肉\n- 盐\n- 黑胡椒\n- 橄榄油\n- 蒜\n- 柠檬汁\n- 欧芹\n\n",
        "level": 2
      },
      {
        "title": "计算",
        "markdown": "\n- 鸡腿肉用量通常来说为 1-2 个/人\n- 盐用量为 2 g/人\n- 黑胡椒用量为 0.5 g/人\n- 橄榄油用量为 5 ml/人\n- 蒜用量为 1 瓣/人\n- 柠檬汁用量为 5ml/人\n- 欧芹用量为 1 根/人\n\n使用上述条件，计算出计划使用的原材料比例。\n\n",
        "level": 2
      },
      {
        "title": "操作",
        "markdown": "\n",
        "level": 2
      },
      {
        "title": "鸡肉的预处理",
        "markdown": "\n1. 鸡腿肉涂上盐、黑胡椒、橄榄油和蒜末\n2. 放入预热至 180 度的烤箱中，烤 30-40 分钟或至熟\n\n",
        "level": 3
      },
      {
        "title": "佐料的准备",
        "markdown": "\n1. 欧芹切成碎末备用\n2. 柠檬挤出汁备用\n\n",
        "level": 3
      },
      {
        "title": "烤制",
        "markdown": "\n1. 烤好的鸡肉取出，淋上柠檬汁\n2. 撒上欧芹碎即可\n\n",
        "level": 3
      },
      {
        "title": "附加内容",
        "markdown": "\n- 烤制时可以将鸡肉淋上蜂蜜或其他烤肉酱提升口感\n- 烤箱预热至 180 度，烤制时间根据鸡肉的大小和厚度而定，需确保鸡肉熟透\n- 鸡肉必须全熟才能吃，吃未全熟的鸡肉可能会导致食物中毒和感染细菌，如沙门氏菌和福氏杆菌等。\n\n如果您遵循本指南的制作流程而发现有问题或可以改进的流程，请提出 Issue 或 Pull request 。\n",
        "level": 2
      }
    ],
    "images": []
  },
  "sourceLimitations": [
    "上游意式烤鸡为欧芹、柠檬和蒜橄榄油调味的鸡腿肉具体版本，对应本记录香草烤鸡，不沿用旧记录整鸡及迷迭香百里香路线。",
    "来源按每人计算，规范食材列1人基础量，鸡腿肉1—2个保留原计数，不换算重量。",
    "简介从腌制到出炉总计约50分钟，总用时50分钟为约值；主操作没有说明单独腌制时长或条件，不补造等待时间。",
    "原文烤箱预热至180度、烤30—40分钟或至熟，时间随鸡肉大小厚度调整；完整保留必须熟透的注意事项，不补造中心温度。",
    "蒜在计算列1瓣，方法使用蒜末，但未独列剁蒜步骤，不增加未源明示的操作。",
    "附加可选蜂蜜或其他烤肉酱未注明用量，不替代主调味；原文疾病风险措辞仅原样存档，不扩展其医学内容。",
    "上游无图片，保留的原有展示图不属于本次 HowToCook 来源图片。"
  ]
}),
  w(
    "意式培根蛋面", "Spaghetti Carbonara", "意大利",
    "犹太盐适量；干意大利长面450克；意式腌猪颊肉85克（可用意式腌五花肉或培根替代）；特级初榨橄榄油45毫升（分次使用，先用30毫升，另留15毫升）；大鸡蛋2个；蛋黄6个；佩科里诺罗马诺芝士25克，另备适量装盘；帕玛森芝士25克，另备适量装盘；现磨黑胡椒1茶匙（磨至中粗，另备适量装盘）；清水适量（煮面用，另预留120毫升煮面水）",
    "1）锅中加入足量清水以浸没意面，加入犹太盐并煮至沸腾；面水不要过咸。放入450克干意大利长面，边搅拌边煮至有嚼劲。煮好后量取并预留120毫升煮面水，锅中其余沸腾煮面水不要倒掉，留作后续隔水加热。2）意式腌猪颊肉（或意式腌五花肉、培根）切丁前可充分冷藏，便于操作。将85克肉丁与2汤匙（30毫升）特级初榨橄榄油放入大煎锅，中火加热并频繁翻动约7分钟，至油脂析出、肉丁酥脆。3）在大号金属耐热搅拌碗中，将2个大鸡蛋的全蛋液、6个蛋黄、25克磨碎的佩科里诺罗马诺芝士、25克磨碎的帕玛森芝士和1茶匙中粗现磨黑胡椒充分搅匀；选用能架在煮面锅上且碗底不碰水的碗。4）用夹子和/或滤网把意面移入有酥脆肉丁及其油脂的煎锅，不要倒掉沸腾的煮面水。加入剩余1汤匙（15毫升）特级初榨橄榄油并拌匀，稍微放凉。把意面、肉丁和全部油脂刮入蛋液混合物，加入预留的1/2杯（120毫升）煮面水并充分拌匀。5）将搅拌碗架在盛有沸腾煮面水的锅上，确保碗底不碰水。用夹子快速、持续翻拌，至酱汁变得浓稠、顺滑且搅拌会留下纹路；持续翻拌以免蛋液凝结成块。达到状态后立即离火，必要时加盐调味，分装入碗，按需撒额外芝士和现磨黑胡椒，立即食用。",
    "56-spaghetti-carbonara.png", "https://www.seriouseats.com/pasta-carbonara-sauce-recipe", {
      sourceName: "Serious Eats",
      recipePageUrl: "https://www.seriouseats.com/pasta-carbonara-sauce-recipe",
      mediaPageUrl: "https://www.seriouseats.com/pasta-carbonara-sauce-recipe",
      author: "Vicky Wasik",
      recipeAuthor: "Daniel Gritzer",
      rightsNotice: "Serious Eats / Vicky Wasik",
      reuseLicense: null,
      repositoryCopyAuthorization: "user_confirmed_2026-09-16",
      hero: {
        path: "assets/dishes/sources/west-011-carbonara/hero.webp",
        originalUrl: "https://www.seriouseats.com/thmb/5aKCalIkNFzVMKs-dFYlEkkCnR8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__recipes__images__2016__02__20151118-spaghetti-carbonara-vicky-wasik-27-5ed8e4c860c945f0a3c4315a25a7001b.jpg",
        sha256: "012d0b0ac82f41b608f753b83eaf66d935bd8426684230fc03a48b6ee933cd7b",
        httpStatus: 200,
        contentType: "image/webp"
      },
      steps: [
        { stepOrder: 2, sourceStepOrder: 2, path: "assets/dishes/sources/west-011-carbonara/step-2.webp", originalUrl: "https://www.seriouseats.com/thmb/22GqBrLR3NgyGtsy07VGrn121Sk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__images__2015__11__20151118-spaghetti-carbonara-COLLAGE-3-033d6a7784d140e4ae984bb9b72a0ade.jpg", sha256: "4df487115c5154df961905fdfb5942fa054f535141c192f82b120cf221e68cd7", httpStatus: 200, contentType: "image/webp" },
        { stepOrder: 3, sourceStepOrder: 3, path: "assets/dishes/sources/west-011-carbonara/step-3.webp", originalUrl: "https://www.seriouseats.com/thmb/8IdexrEMEXVpnfglj6_KIscFC_U=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__images__2015__11__20151118-spaghetti-carbonara-COLLAGE-5-f513acc2cc29485c924e29d4cab34e72.jpg", sha256: "d5786fd05770f0ab27527720aa96261d0ee95520e9863172bdc2d27e254efed6", httpStatus: 200, contentType: "image/webp" },
        { stepOrder: 4, sourceStepOrder: 4, path: "assets/dishes/sources/west-011-carbonara/step-4.webp", originalUrl: "https://www.seriouseats.com/thmb/zR54CkYMz52-UFoE2wim0NUr8E=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__images__2015__11__20151118-spaghetti-carbonara-COLLAGE-1-cff1bf96d3e64da1acf122b9aea52170.jpg", sha256: "59277f0d2b0276194f5b411749efd0d8868579fd4c771ff93e2c97e3b4750e98", httpStatus: 200, contentType: "image/webp" },
        { stepOrder: 5, sourceStepOrder: 5, path: "assets/dishes/sources/west-011-carbonara/step-5.webp", originalUrl: "https://www.seriouseats.com/thmb/PLRRWkMnLzh5zq8XmEhvFmZcwtI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__images__2015__11__20151118-spaghetti-carbonara-COLLAGE-2-6780e7da09a04dc5a1a6e86b886c376d.jpg", sha256: "df5191f1718e55560e355fc442d7d96c860e993ef71ad8181d083dd500c3d57d", httpStatus: 200, contentType: "image/webp" }
      ]
    }, { totalMinutes: 30, prepMinutes: 5, cookMinutes: 25, stepDurations: [null, 420, null, null, null] }, 4
  ),
  w("千层面", "Lasagna", "意大利", "无盐黄油60克（白酱用，另备适量涂烤盘）；通用面粉35克；全脂牛奶700毫升；粗粒盐适量（白酱调味及煮面用）；现磨黑胡椒适量；现磨肉豆蔻粉一撮；千层面片900克（鲜面片可选自制普通鸡蛋或菠菜面片、或市售鲜面片，干面片可选2盒，每盒450克，普通或免煮路线仅选一种，可能用不完全部面片）；植物油适量（给面片涂油用）；博洛尼亚肉酱1.5升（提前做好并保持温热）；帕玛森芝士85克，磨碎；清水适量（普通面片煮制用）；冰水适量（普通面片过冷用）；温水适量（仅免煮面片浸泡用）", "1）小锅置于中高火，融化60克无盐黄油，不让黄油变褐；用打蛋器拌入35克通用面粉，搅成糊状，边搅边炒约1分钟，至生面粉气味消失。持续搅打，将700毫升全脂牛奶以细流倒入，或每次加几汤匙、分次加入；锅的边角也要搅到，使酱汁均匀。混合物会先明显变稠，待牛奶全部加入后重新变稀。2）继续边加热边搅拌，至白酱开始微沸并稍稍变稠；转小火，边搅边煮约3分钟，至白酱能在木勺背面留下薄薄一层。3）加入适量粗粒盐、现磨黑胡椒和一撮现磨肉豆蔻粉，搅打均匀；小结块可直接搅散，顽固大结块可用手持或台式搅拌机打匀。白酱可立即使用，或将保鲜膜贴在表面并保持温热；也可密封冷藏数天，使用前在灶上或微波炉中轻柔加热。白酱此时保留较稀状态，烤制时还会继续变稠。4）先选定一种面片路线：市售鲜面片、普通干面片或免煮面片均不需制作面团，跳过本步的自制操作。仅选自制鲜面片时，依原信源链接的鲜面团配方做到其第10步，使用双倍配方制成约900克面片；压面机可选第6或第7档，将长面片切成约20厘米长的矩形。多备一些面片可防叠层时不够，实际可能用不完。普通鲜面片或干面片执行步骤5、6后跳过步骤7，免煮面片跳过步骤5、6，仅执行步骤7。5）仅鲜面片或普通干面片执行：准备一锅加盐的沸水，必要时分批将面片煮至有嚼劲；市售面片通常比包装建议时间少煮约1分钟。用漏勺或网筛捞出，立即放入一大盆冰水中。6）仅步骤5煮过的面片执行：将冷却的面片充分沥干，两面薄薄涂植物油以防黏连；可暂存最多3小时。如需暂存，将面片摊在铺有烘焙纸的烤盘上，多层面片之间用保鲜膜隔开；随后跳过步骤7，进入步骤8。7）仅免煮面片执行，不能再重复步骤5、6：用温水浸泡30分钟，使面片部分吸水，再用纸巾或厨房巾沥干，进入步骤8。8）确保已备好1.5升温热的博洛尼亚肉酱，烤箱预热至190℃。在约23×33厘米的烤盘（原文9×13英寸）内涂无盐黄油；底部均匀铺一层薄薄的博洛尼亚肉酱，再铺面片。面片略有重叠无妨，过大的面片应剪裁，避免形成不必要的双层厚面片。9）面片上再铺很薄一层博洛尼亚肉酱，使部分位置仍能透过肉酱看到面片；淋少量白酱，再撒帕玛森芝士碎。按面片、博洛尼亚肉酱、白酱、芝士的顺序继续叠至烤盘装满，约6层；最上面以一层面片收尾，均匀铺上全部剩余白酱，再磨上丰厚一层芝士。10）放入190℃烤箱烤约35分钟，至酱汁冒泡、表面上色；烤盘下可放带边烤盘接住溢出的酱汁。出炉后静置10分钟，再切块食用。", "57-lasagna.png", "https://www.seriouseats.com/lasagna-bolognese-al-forno-recipe", {
    "sourceName": "Serious Eats",
    "recipePageUrl": "https://www.seriouseats.com/lasagna-bolognese-al-forno-recipe",
    "mediaPageUrl": null,
    "author": "Daniel Gritzer; photographs Vicky Wasik",
    "rightsNotice": "Serious Eats; photographs credited to Vicky Wasik.",
    "reuseLicense": null,
    "repositoryCopyAuthorization": "user_confirmed_2026-10-07",
    "hero": {
      "path": "assets/dishes/sources/west-012-serious-eats/hero.webp",
      "originalUrl": "https://www.seriouseats.com/thmb/kog6qJ8iuNbyhyyTn2EyA-5Z19c=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__images__2016__11__20161118-lasagne-bolognese-vicky-wasik-22-3edfa22e77c64a27817cb27bfa5fee3e.jpg",
      "sha256": "5650a643a4f3533469c44b8415e006b8fe266c2819a5f3c8e52b7a678d65bd3f",
      "httpStatus": 200,
      "contentType": "image/webp"
    },
    "steps": [
      {
        "stepOrder": 1,
        "sourceStepOrder": 1,
        "path": "assets/dishes/sources/west-012-serious-eats/step-1.webp",
        "originalUrl": "https://www.seriouseats.com/thmb/Ecv1y4jteVR_cips3cd-3yFz9m8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__images__2016__09__20160901-bechamel-sauce-vicky-wasik-11-cdb54a7a215542a9bea561d384e67bc1.jpg",
        "sha256": "7591bf55d649fb81f6f143c38ec9a0c4b8f65286b3c33570202fe82304f95381",
        "httpStatus": 200,
        "contentType": "image/webp"
      },
      {
        "stepOrder": 5,
        "sourceStepOrder": 5,
        "path": "assets/dishes/sources/west-012-serious-eats/step-5.webp",
        "originalUrl": "https://www.seriouseats.com/thmb/q10Imnq7aFha7ks8EDfREJNUE4s=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__images__2016__11__20161118-lasagne-bolognese-vicky-wasik-pasta-collage-034a983deb0642a59ea8e12c0ff28804.jpg",
        "sha256": "f4df1a56005240c39cf986b89652c1267646532f1462357070ed0dc4dc22b395",
        "httpStatus": 200,
        "contentType": "image/webp"
      },
      {
        "stepOrder": 9,
        "sourceStepOrder": 9,
        "path": "assets/dishes/sources/west-012-serious-eats/step-9.webp",
        "originalUrl": "https://www.seriouseats.com/thmb/fVPbxARHb0JyD-2IUfeZEl1BPhw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__images__2016__11__20161118-lasagne-bolognese-vicky-wasik-assembly-collage-8fe6ff78c00049448b5505458f94aebe.jpg",
        "sha256": "b463357c2d17c3ecbe589e97be3092ce8ac5ba1161e0eeefbf84f6a168fc924d",
        "httpStatus": 200,
        "contentType": "image/webp"
      },
      {
        "stepOrder": 10,
        "sourceStepOrder": 10,
        "path": "assets/dishes/sources/west-012-serious-eats/step-10.webp",
        "originalUrl": "https://www.seriouseats.com/thmb/e1-c68vJZl2Dbqw5iM6wGqKVyYE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__images__2016__11__20161118-lasagne-bolognese-vicky-wasik-top-collage-e5a3bd2486aa4947844350f20ce9a999.jpg",
        "sha256": "53ab42393606eef72c314b728411dcedae7b4035186e89b6a1dd3e54770e3d79",
        "httpStatus": 200,
        "contentType": "image/webp"
      }
    ]
  }, { totalMinutes: 80, prepMinutes: 15, cookMinutes: 65 }, 8, {
    "recipeLinks": [
      {
        "recipeId": "west-031",
        "name": "博洛尼亚肉酱"
      }
    ],
    "sourceLimitations": [
      "来源总用时80分钟从已备好温热博洛尼亚肉酱开始，不包含另做肉酱的225分钟。",
      "鲜面片或普通干面片走煮制及冰水冷却路线，免煮面片仅走温水浸泡路线；同一批面片不能重复执行两条路线。"
    ]
  }),
  w("奶油宽面", "Fettuccine Alfredo", "意大利/美国", "宽面250克；黄油50克；淡奶油200毫升；帕玛森100克；蒜1瓣；盐和黑胡椒；欧芹少许", "1）宽面煮至有嚼劲，留面汤。2）黄油炒香蒜，加入奶油微沸。3）下宽面和帕玛森，少量面汤调至顺滑，撒黑胡椒和欧芹。", "58-fettuccine-alfredo.png"),
  w("蘑菇烩饭", "Mushroom Risotto", "意大利", "意大利烩饭米250克；蘑菇300克；洋葱80克；白葡萄酒100毫升；热高汤800毫升；黄油35克；帕玛森60克", "1）蘑菇煎香盛出，原锅黄油炒软洋葱和米。2）加白酒收干，分次加入热高汤并不断搅拌。3）约18分钟米芯微硬时拌入蘑菇、黄油和帕玛森。", "59-mushroom-risotto.png"),
  w("帕玛森鸡排", "Chicken Parmesan", "意大利裔美国", "鸡胸肉2块约400克；面包糠100克；帕玛森50克；鸡蛋1个；番茄酱200克；马苏里拉120克；面粉50克", "1）鸡胸拍薄，依次裹面粉、蛋液和帕玛森面包糠，煎至金黄。2）烤盘铺番茄酱和鸡排，盖马苏里拉。3）200℃烤12–15分钟至鸡肉熟透芝士上色。", "60-chicken-parmesan.png"),
  w("惠灵顿牛排", "Beef Wellington", "英国", "牛里脊中心段500克；蘑菇300克；帕尔马火腿8片；酥皮1张；第戎芥末20克；蛋黄1个；黄油20克", "1）牛里脊煎上色，抹芥末冷却；蘑菇剁碎炒干水分。2）火腿铺膜，抹蘑菇蓉包牛肉冷藏定形，再包酥皮刷蛋黄。3）200℃烤25–35分钟，静置10分钟切片。", "61-beef-wellington.png", WEST_ESSENTIAL),
  w("红酒炖鸡", "Coq au Vin", "法国", "鸡腿4只；红酒500毫升；培根100克；蘑菇200克；珍珠洋葱150克；胡萝卜150克；鸡汤300毫升；面粉15克；百里香适量", "1）培根煎香，鸡腿拍干煎至上色。2）炒胡萝卜洋葱，撒面粉，倒红酒和鸡汤，放鸡腿与香草。3）小火炖45分钟，另煎蘑菇后拌入收汁。", "62-coq-au-vin.png"),
  w("普罗旺斯炖菜", "Ratatouille", "法国", "茄子250克；西葫芦250克；彩椒200克；番茄400克；洋葱120克；大蒜15克；橄榄油35毫升；百里香适量", "1）蔬菜切块，茄子和西葫芦分别煎上色。2）炒软洋葱蒜和彩椒，加番茄和百里香煮成底汁。3）合入所有蔬菜小火炖20分钟，调盐胡椒。", "63-ratatouille.png"),
  w("马赛鱼汤", "Bouillabaisse", "法国", "白肉鱼300克；虾200克；贻贝300克；番茄300克；洋葱100克；茴香头150克；白葡萄酒150毫升；鱼汤700毫升；藏红花少许", "1）橄榄油炒洋葱、茴香和番茄，加入白酒、鱼汤和藏红花煮20分钟。2）先下鱼块，再下虾和贻贝。3）煮至海鲜刚熟、贝壳打开，配烤面包食用。", "64-bouillabaisse.png"),
  w(
    "牧羊人派", "Shepherd's Pie", "英国",
    "淀粉质土豆（Russet）1.6千克，约4个大土豆，去皮切约2.5厘米块；清水适量（漂洗和煮土豆用）；犹太盐适量（煮土豆及调味）；无盐黄油85克，切块；低钠鸡汤360毫升；无味明胶14克；植物油30毫升；羊肉末1千克（采用传统羊肉版本）；大黄洋葱1个约400克，切丁；中等胡萝卜3根约225克，切丁；芹菜梗2根约110克，切丁；中等蒜瓣2瓣，切末；番茄膏30毫升；干红葡萄酒240毫升；百里香枝2枝；月桂叶1片；伍斯特酱15毫升；Marmite酵母酱5毫升（可选）；通用面粉15克；冷冻豌豆225克；现磨黑胡椒适量；浓奶油360毫升；帕玛森芝士碎适量（可选）",
    "1）将土豆块放入漏篮，用冷水冲洗至水变清。放入大锅，加冷水至高出土豆至少5厘米；加犹太盐，咸度接近海水。大火煮沸后转中小火，煮10—15分钟，至刀尖能毫无阻力地刺穿土豆。沥水后用热水冲洗30秒，倒入大碗。2）用土豆压泥器、食物磨或薯泥压榨器把土豆与85克黄油压成泥，抹平表面并紧贴薯泥覆盖保鲜膜以防表面结皮，备用。3）将360毫升低钠鸡汤倒入量杯，均匀撒入14克无味明胶，静置备用。4）大号荷兰锅中高火加热30毫升植物油至油面发亮。放入一半羊肉末，边炒边刮锅底，煎6—8分钟至充分褐变，用土豆压泥器或大号打蛋器拨散；加入剩余羊肉末，继续拨散约3分钟至碎小颗粒，必要时调低火力以免焦煳。若析出油脂过多，舀出大部分，仅留几汤匙；加入洋葱、胡萝卜、芹菜和蒜，翻炒并刮锅底约4分钟，至刚开始变软。5）转中火加入番茄膏，边搅拌边炒1分钟。倒入干红葡萄酒并以高火煮至微沸，刮起锅底褐色焦香物，继续煮至酒液几乎收干。加入预先混合的鸡汤和明胶、百里香、月桂叶、伍斯特酱及可选Marmite；将面粉均匀撒在肉馅上并拌匀。煮至微沸后转小火，煮约20分钟至肉汁收浓；取出百里香枝和月桂叶，拌入冷冻豌豆，以犹太盐和黑胡椒调味。6）烤箱架调至中层并预热至220℃。组装前将浓奶油加热至微沸，倒入薯泥中轻轻拌匀，再以盐和黑胡椒调味。7）将肉馅盛入约23×33厘米的烤盘，肉馅高度不要超过烤盘一半（视烤盘大小，可能不必用完全部肉馅）。上面铺满薯泥，用刮刀抹平并做出起伏纹理；按需撒帕玛森芝士。将烤盘放在铺有锡纸的带边烤盘上接住溢出的肉汁。8）入220℃烤箱烤约20分钟，至顶部上色且整盘热透。如需更深的焦色，可在最后短暂移至距上火约15厘米处炙烤，并密切观察以免薯泥烤焦。出炉静置15—20分钟再分装食用。",
    "65-shepherds-pie.png", "https://www.seriouseats.com/shepherds-pie-beef-lamb-recipe", {
      sourceName: "Serious Eats",
      recipePageUrl: "https://www.seriouseats.com/shepherds-pie-beef-lamb-recipe",
      mediaPageUrl: "https://www.seriouseats.com/shepherds-pie-beef-lamb-recipe",
      author: "Vicky Wasik",
      recipeAuthor: "Daniel Gritzer",
      rightsNotice: "Serious Eats / Vicky Wasik",
      reuseLicense: null,
      repositoryCopyAuthorization: "user_confirmed_2026-09-16",
      hero: {
        path: "assets/dishes/sources/west-020-shepherds-pie/hero.webp",
        originalUrl: "https://www.seriouseats.com/thmb/cWyyokLX1T9Jx3pq__8v1wLcUy8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__recipes__images__2016__10__20161012-shepherds-pie-vicky-wasik-Version-A-21-ceea33d28eb440278d297b2cf60a9f32.jpg",
        sha256: "1bec7af510d22174d25ddf14babef51fc2ed054cf496c52a5ceb904e6482198e",
        httpStatus: 200,
        contentType: "image/webp"
      },
      steps: [
        { stepOrder: 2, sourceStepOrder: 2, path: "assets/dishes/sources/west-020-shepherds-pie/step-02.webp", originalUrl: "https://www.seriouseats.com/thmb/vb8J6GjsQQNUwKFukxcY22MfpUg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__images__2014__11__20141113-make-ahead-mashed-potatoes-vicky-wasik-4-a47238f541dd48a2994a0b127db34397.jpg", sha256: "b80266e379b3eb3774a8b0d008532be56a111b64387be92cde0f8ac7cc4579b1", httpStatus: 200, contentType: "image/webp" },
        { stepOrder: 4, sourceStepOrder: 4, path: "assets/dishes/sources/west-020-shepherds-pie/step-04.webp", originalUrl: "https://www.seriouseats.com/thmb/pJs9I0eBhzEYqqvl8OK8oDtqjKM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__images__2016__10__20161012-shepherds-pie-vicky-wasik-collage-1-16171107127f4a2f867c3c02620b1438.jpg", sha256: "52a1abceda566aa17d0cce3ccae01764d13621bed1f5d9fad29704fec92f95d8", httpStatus: 200, contentType: "image/webp" },
        { stepOrder: 5, sourceStepOrder: 5, path: "assets/dishes/sources/west-020-shepherds-pie/step-05.webp", originalUrl: "https://www.seriouseats.com/thmb/A43eozN2u-XgEwqBpwkn6B7_h3Q=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__images__2016__10__20161012-shepherds-pie-vicky-wasik-collage-2-4f3ba460995c4b1ca24798704a5ad4b9.jpg", sha256: "7592d443a01e4774d88fa5fc70841210d17be154f32aa13579e7f970cd90eca6", httpStatus: 200, contentType: "image/webp" },
        { stepOrder: 6, sourceStepOrder: 6, path: "assets/dishes/sources/west-020-shepherds-pie/step-06.webp", originalUrl: "https://www.seriouseats.com/thmb/KUGdnz6fOXyb6bIBsuIHju6ZeH8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__images__2014__11__20141113-make-ahead-mashed-potatoes-vicky-wasik-6-df341d6476e140b6a096a046cd21ce55.jpg", sha256: "0d8ea91e93f9cd5481e4cae1b7f495bd97b70d7506e15b03ca9933ebdf3817cf", httpStatus: 200, contentType: "image/webp" },
        { stepOrder: 8, sourceStepOrder: 8, path: "assets/dishes/sources/west-020-shepherds-pie/step-08.webp", originalUrl: "https://www.seriouseats.com/thmb/6ZPC3bFKrK3xBBdbkawb0Txk5IM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__images__2016__10__20161012-shepherds-pie-vicky-wasik-Version-A-18-34a6fde7e3d141388ffbf857713688a4.jpg", sha256: "c2de5723050023b6f21391de56ed2f22aec0d3c1e04480cfefda08d7bb741ff9", httpStatus: 200, contentType: "image/webp" }
      ]
    }, { totalMinutes: 145, prepMinutes: 15, cookMinutes: 110, stepDurations: [null, null, null, null, null, null, null, null] }, 8
  ),
  w("法式红酒炖牛肉", "Beef Bourguignon", "法国", "牛肩肉700克；红酒500毫升；牛高汤300毫升；培根100克；胡萝卜200克；珍珠洋葱150克；蘑菇200克；番茄膏20克；百里香适量", "1）牛肉擦干分批煎上色，培根煎香。2）炒蔬菜和番茄膏，倒红酒刮锅，加入牛肉、高汤和香草。3）盖锅小火炖2小时，最后加入煎蘑菇和珍珠洋葱。", "66-beef-bourguignon.png"),
  w("希腊穆萨卡", "Moussaka", "希腊", "茄子600克；羊或牛肉末400克；番茄300克；洋葱100克；肉桂少许；白酱400克；帕玛森50克；橄榄油适量", "1）茄子切片刷油烤软。2）洋葱肉末炒香，加番茄和少量肉桂炖浓。3）烤盘交替铺茄子与肉酱，顶层抹白酱撒芝士，190℃烤40分钟。", "67-moussaka.png"),
  w("希腊沙拉", "Greek Salad", "希腊", "番茄350克；黄瓜200克；红洋葱80克；卡拉马塔橄榄80克；菲达芝士150克；橄榄油25毫升；红酒醋10毫升；牛至2克", "1）番茄黄瓜切大块，洋葱切薄片。2）与橄榄、橄榄油、醋和牛至轻拌。3）顶部放整块或大块菲达，略撒黑胡椒。", "68-greek-salad.png"),
  w("香煎鸡肉炸排", "Chicken Schnitzel", "奥地利/德国", "鸡胸肉2块约400克；面粉60克；鸡蛋1个；面包糠120克；盐和黑胡椒；食用油适量；柠檬1个", "1）鸡胸横剖拍至约6毫米厚，调盐胡椒。2）依次裹面粉、蛋液和面包糠。3）浅油煎炸每面2–3分钟至金黄熟透，配柠檬。", "69-chicken-schnitzel.png"),
  w("瑞典肉丸", "Swedish Meatballs", "瑞典", "牛猪混合肉馅400克；洋葱80克；面包糠50克；牛奶80毫升；鸡蛋1个；黄油25克；面粉20克；牛高汤300毫升；淡奶油120毫升", "1）肉馅与炒软洋葱、泡牛奶的面包糠和鸡蛋拌匀，搓丸煎熟。2）原锅黄油炒面粉，逐渐加入高汤和奶油煮成酱。3）肉丸回锅煨5分钟，配薯泥和越橘酱。", "70-swedish-meatballs.png"),
  w("匈牙利牛肉汤", "Hungarian Goulash", "匈牙利", "牛肩肉600克；洋葱250克；土豆300克；胡萝卜180克；甜椒粉20克；番茄200克；牛高汤800毫升；葛缕子1茶匙", "1）洋葱慢炒至金黄，离火拌入甜椒粉避免焦苦。2）加入牛肉、番茄、高汤和葛缕子，小火炖60分钟。3）下土豆胡萝卜再煮30分钟至软。", "71-hungarian-goulash.png"),
  w("炸鱼塔可", "Fish Tacos", "墨西哥/美国", "白肉鱼350克；小玉米饼8张；面粉80克；啤酒100毫升；卷心菜180克；番茄莎莎120克；青柠2个；酸奶油60克", "1）面粉和冰啤酒调糊，鱼条蘸糊炸至金黄熟透。2）玉米饼加热，酸奶油与青柠汁调酱。3）饼中放卷心菜、炸鱼、莎莎和青柠酱。", "72-fish-tacos.png"),
  w("鸡肉芝士薄饼", "Chicken Quesadilla", "墨西哥/美国", "面粉薄饼4张；熟鸡肉250克；切达或蒙特雷杰克芝士200克；彩椒100克；洋葱80克；孜然2克；莎莎酱适量", "1）洋葱彩椒与鸡肉、孜然炒香。2）平底锅放薄饼，半边铺芝士和馅料，折叠。3）两面煎至金黄且芝士融化，切角配莎莎。", "73-chicken-quesadilla.png"),
  w("班尼迪克蛋", "Eggs Benedict", "美国", "英式松饼2个；鸡蛋4个；加拿大培根4片；蛋黄3个；黄油120克；柠檬汁15毫升；白醋15毫升；盐少许", "1）蛋黄隔温水打发，缓慢加入融化黄油和柠檬汁制荷兰酱。2）水微沸加醋，鸡蛋水波煮约3分钟。3）烤热松饼，依次放培根、水波蛋和荷兰酱。", "74-eggs-benedict.png"),
  w("酪乳煎饼", "Buttermilk Pancakes", "美国", "中筋面粉200克；酪乳250毫升；鸡蛋1个；融化黄油30克；糖25克；泡打粉8克；小苏打2克；盐2克；枫糖浆适量", "1）干料混匀，另将酪乳、鸡蛋和黄油混匀。2）湿料倒入干料，只拌至刚无干粉。3）平底锅中小火煎至表面冒泡后翻面，配黄油和枫糖浆。", "75-buttermilk-pancakes.png"),
  w("博洛尼亚肉酱", "Ragù Bolognese", "意大利", "无味吉利丁粉15克（2包）；低钠高汤475毫升（自制或市售）；无盐黄油45克；胡萝卜2大根，约375克，去皮切细末；芹菜3中根，约240克，切细末；黄洋葱2中个，约480克，切细末；肉末1800克（可全用牛肉末，或用牛肉末2磅、猪肉末1磅和小牛肉末1磅混合，分两次下锅）；番茄膏60毫升；干白葡萄酒或干红葡萄酒350毫升；月桂叶2片；粗粒盐适量；现磨肉豆蔻粉一撮；亚洲鱼露3毫升；淡奶油120毫升", "1）将475毫升低钠高汤倒入宽口容器，将15克无味吉利丁粉均匀撒在液面上，放在一旁，让吉利丁吸水。2）大炖锅置于中高火，放入45克无盐黄油，融化至起泡；加入切细末的胡萝卜、芹菜和黄洋葱，边翻动边炒约6分钟，至蔬菜呈半透明。仅加入一半肉末，即2磅；炒约15分钟，间或翻动并铲散大块肉团，至锅底形成明显的焦褐色煎炒层。3）加入剩余2磅肉末，翻动并刮起锅底的焦褐色煎炒层，将新下的肉末铲得很细；继续炒约6分钟，至全部肉末熟透。必要时随时调低火力，避免烧焦。4）拌入60毫升番茄膏，边翻动边炒2分钟；倒入350毫升干白或干红葡萄酒，刮起锅底附着物，煮至沸腾。再煮约5分钟，至生酒精气味消失，加入2片月桂叶。5）倒入步骤1的高汤，将容器中全部吸水吉利丁也刮入锅中。煮至微沸后调低火力，保持非常轻柔的微沸；加入适量粗粒盐、一撮现磨肉豆蔻粉和3毫升鱼露。间或翻动，微沸约3小时，至肉酱浓稠且基本没有多余液体；撇去并丢弃表面浮油，取出月桂叶。拌入120毫升淡奶油，再按口味调整盐量。6）肉酱可立即使用，也可用于制作千层面；或冷藏保存最多5天，或冷冻保存最多3个月。", "west-031-bolognese.webp", "https://www.seriouseats.com/basic-ragu-bolognese-recipe", {
    "sourceName": "Serious Eats",
    "recipePageUrl": "https://www.seriouseats.com/basic-ragu-bolognese-recipe",
    "mediaPageUrl": null,
    "author": "Daniel Gritzer; photograph Vicky Wasik",
    "rightsNotice": "Serious Eats; photography Vicky Wasik.",
    "reuseLicense": null,
    "repositoryCopyAuthorization": "user_confirmed_2026-10-07",
    "heroOnlyAuthorization": "user_explicit_2026-10-07_west-031",
    "hero": {
      "path": "assets/dishes/sources/west-031-serious-eats/hero.webp",
      "originalUrl": "https://www.seriouseats.com/thmb/gYEUSQ6BRH7u1huNwwjHRZtzHuQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__recipes__images__2016__12__20161118-lasagne-bolognese-vicky-wasik-5-a9ff0574a41746ff92fde42483d40b02.jpg",
      "sha256": "69986f354c3d4b5f33e62e26d16d4458a25355d1ecc3d2b260736260586fd5e3",
      "httpStatus": 200,
      "contentType": "image/webp"
    },
    "steps": []
  }, { totalMinutes: 225, cookMinutes: 225 }, 16, {
    "sourceLimitations": [
      "本配方产出约2夸脱，来源标为16份；不将2夸脱改写为2升。",
      "本肉酱总用时225分钟；用于千层面时需先准备好，千层面的80分钟不包含本肉酱制作时间。"
    ]
  })
];
