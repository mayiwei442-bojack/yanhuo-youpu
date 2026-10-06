const CN_SOURCE = "https://thewoksoflife.com/category/recipes/chinese-take-out/";
const CN_HOME = "https://thewoksoflife.com/";
const WEST_SOURCE = "https://www.bbcgoodfood.com/recipes/category/cuisine-collections?page=2";
const WEST_ESSENTIAL = "https://www.bbcgoodfood.com/howto/guide/21-essential-recipes-to-learn-for-life";

const c = (name, en, region, ingredients, steps, img = "", source = CN_SOURCE, media = null, timing = null, servings = null, extra = {}) => ({ name, en, region, ingredients, steps, img, source, ...(media ? { media } : {}), ...(timing ? { timing } : {}), ...(servings != null ? { servings } : {}), ...extra });
const w = (name, en, region, ingredients, steps, img = "", source = WEST_SOURCE, media = null, timing = null, servings = null) => ({ name, en, region, ingredients, steps, img, source, ...(media ? { media } : {}), ...(timing ? { timing } : {}), ...(servings != null ? { servings } : {}) });

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
  }),
  c("鱼香肉丝", "Fish-fragrant Shredded Pork", "川菜", "猪肉8盎司，切丝；腌料：食用油2茶匙、绍兴酒1茶匙、生抽2茶匙、白胡椒粉1/4茶匙、玉米淀粉1茶匙、清水1又1/2汤匙；鱼香汁：米醋1又1/2汤匙、白糖1又1/2汤匙、生抽1汤匙、绍兴酒1/2汤匙、清水1杯、玉米淀粉1又1/2汤匙；炒制用食用油3汤匙，分次使用；辣豆瓣酱1汤匙；姜2茶匙，切末；蒜2茶匙，切末；干辣椒1/4杯；泡发木耳1满杯，切丝；莴笋8盎司，去皮切丝；葱1根，切碎；清水数滴（锅太干时）", "1）将8盎司猪肉切丝，加入2茶匙食用油、1茶匙绍兴酒、2茶匙生抽、1/4茶匙白胡椒粉、1茶匙玉米淀粉和1又1/2汤匙清水，拌匀后静置20分钟；其间将莴笋去皮切丝、泡发木耳切丝、葱切碎，并备好姜末、蒜末和干辣椒。2）将1又1/2汤匙米醋、1又1/2汤匙白糖、1汤匙生抽、1/2汤匙绍兴酒、1杯清水和1又1/2汤匙玉米淀粉放入碗中，充分搅匀成鱼香汁。3）将干净炒锅预热至微微冒烟，转高火，加入1汤匙炒制用食用油；下腌好的猪肉丝炒至刚刚不透明，关火后盛出备用。4）检查炒锅；若锅中不干净，洗净并擦干，再开始下一阶段。5）开中火，加入剩余2汤匙炒制用食用油和1汤匙辣豆瓣酱，轻轻翻炒约1分钟至油变红；如有必要调低火力，避免炒焦。6）加入2茶匙姜末、2茶匙蒜末和1/4杯干辣椒，翻炒约15秒；加入1满杯泡发木耳，转高火翻炒30秒至混合均匀，锅中太干时加入数滴清水。7）待锅中液体开始冒泡，将鱼香汁再次搅匀，使沉底的淀粉重新混合；随即与8盎司莴笋丝、1根葱和炒好的猪肉丝一同下锅，快速翻炒均匀后出锅。", "04-yuxiang-rousi.png", "https://thewoksoflife.com/pork-garlic-sauce/", {
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
  }),
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
  }),
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
  c("桂林米粉", "Guilin Rice Noodles", "广西", "猪骨适量；牛骨适量；肥五花肉适量；里脊适量；卤料包适量；卤水调味料适量（原文未具体列明）；腌料适量（原文未具体列明）；酸豆角适量；辣椒适量；花生适量；香葱适量；干米粉适量；清水适量（熬卤水、白水煮肉、泡发和烫米粉）；食用油适量（炒酸豆角、炸花生、炸叉烧和炸锅烧）；骨头汤适量（佐餐，可选）", "1）准备猪骨、牛骨、肥五花肉、里脊、卤料包、酸豆角、辣椒、花生、香葱和干米粉；来源未给出各项数量，也未列明卤水调味料和腌料的具体组成。2）将猪骨、牛骨和卤料包放入锅中，加适量清水熬卤水，再用来源未具体列明的调味料调味；卤水需熬8小时以上才能出味，原文未说明具体火候。3）熬卤水期间将酸豆角切好；锅中放适量食用油，加入酸豆角和辣椒简单翻炒后盛出，原文未给火候和时长。另将花生用适量食用油炸好备用，原文未给油温和时长。4）里脊用来源未具体列明的腌料腌制；随后放入清水中白水煮制，再用适量食用油炸成叉烧。原文未给腌制、煮制和炸制的火候、时长及用油量。5）肥五花肉用适量食用油制成锅烧，再重复炸一次，至皮酥脆；原文未给前处理方式、油温、时长及用油量。6）干米粉先用水泡发，原文未给泡发时长；食用前用开水烫米粉，沥水后装碗。7）依次加入锅烧、叉烧、炒酸豆角、香葱和炸花生，淋入卤水并拌匀即可；可另配骨头汤佐餐，原文未说明骨头汤的另用材料和熬制方法。", "11-guilin-mifen.png", "https://www.douguo.com/cookbook/2331633.html"),
  c("羊肉泡馍", "Lamb Paomo", "陕西", "羊肉500克；面饼2个；粉丝80克；木耳30克；姜20克；花椒1茶匙；香菜和糖蒜适量；盐适量", "1）羊肉加姜和花椒小火煮至软烂，切片，汤过滤。2）面饼掰成黄豆大小，粉丝木耳泡发。3）原汤煮馍粒、粉丝和木耳至入味，铺羊肉，配香菜与糖蒜。", "12-yangrou-paomo.png", CN_HOME),
  c("胡辣汤", "Henan Spicy Pepper Soup", "河南", "熟牛肉100克；面筋100克；木耳40克；海带50克；粉条80克；高汤800毫升；胡椒粉5克；香醋20毫升；淀粉25克", "1）木耳海带切丝，粉条泡软。2）高汤烧开，下牛肉、面筋和配菜煮熟。3）加胡椒、盐和香醋，淀粉水缓慢勾成稠羹。", "13-hulatang.png", CN_HOME),
  c("柳州螺蛳粉", "Liuzhou Luosifen", "广西", "干米粉250克；螺蛳汤底700毫升；酸笋80克；腐竹50克；木耳40克；花生30克；青菜100克；辣椒油适量", "1）米粉泡软煮熟。2）螺蛳汤底烧开，下酸笋、木耳和青菜。3）米粉入碗，浇热汤，放腐竹、花生，按口味加辣椒油。", "14-liuzhou-luosifen.png", CN_HOME),
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
  c("水煮牛肉", "Sichuan Boiled Beef", "川菜", "牛里脊300克；豆芽200克；莴笋150克；郫县豆瓣25克；干辣椒12个；花椒2茶匙；蒜末20克；高汤500毫升；淀粉10克", "1）牛肉切薄片，用盐、淀粉和少量油腌10分钟，蔬菜焯熟垫碗。2）炒香豆瓣，加高汤煮开，逐片下牛肉至刚熟。3）连汤倒入碗，铺辣椒花椒蒜末，浇热油。", "27-shuizhu-niurou.png"),
  c("酸菜鱼", "Fish with Pickled Mustard Greens", "川渝", "黑鱼片400克；酸菜250克；泡椒20克；姜蒜各15克；高汤700毫升；蛋清半个；淀粉10克；花椒和干辣椒适量", "1）鱼片加盐、蛋清和淀粉上浆，鱼骨煎香。2）炒香酸菜、泡椒和姜蒜，加高汤及鱼骨煮10分钟。3）捞出底料，滑入鱼片至变白，倒碗后以辣椒花椒热油激香。", "28-suancai-yu.png"),
  c("东坡肉", "Dongpo Pork", "浙菜", "方块五花肉800克；绍兴酒250毫升；生抽60毫升；老抽15毫升；冰糖50克；葱100克；姜40克", "1）五花肉焯水，切大方块并扎绳定形。2）砂锅垫葱姜，肉皮向下，加酒、酱油和冰糖。3）小火焖90分钟，翻面再焖30分钟，蒸20分钟更酥软。", "29-dongpo-rou.png"),
  c("白切鸡", "Cantonese Poached Chicken", "粤菜", "嫩鸡1只约1000克；姜40克；葱40克；盐10克；料酒20毫升；芝麻油10毫升；蘸料适量", "1）大锅水加姜葱烧至微沸，提鸡三浸三提。2）鸡完全浸入，保持微沸约25分钟，关火焖15分钟。3）立即冰镇，擦干抹芝麻油，斩件配姜葱蘸料。", "30-baiqie-ji.png"),
  c("口水鸡", "Sichuan Mouthwatering Chicken", "川菜", "鸡腿2只约500克；姜葱适量；花生碎30克；辣椒油50毫升；生抽25毫升；香醋15毫升；糖5克；花椒粉2克；蒜末15克", "1）鸡腿加姜葱煮至熟，冰镇后斩块。2）辣椒油、生抽、醋、糖、花椒粉和蒜末调成料汁。3）浇在鸡块上，撒花生碎和葱花。", "31-koushui-ji.png"),
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
  c("蚂蚁上树", "Minced Pork with Glass Noodles", "川菜", "红薯粉条150克；猪肉末150克；郫县豆瓣15克；姜蒜末适量；生抽15毫升；高汤300毫升；葱花适量", "1）粉条泡软剪短。2）炒散肉末，加入豆瓣和姜蒜炒出红油。3）加高汤和生抽，下粉条焖至吸汁，撒葱花。", "40-mayi-shangshu.png"),
  c("家常豆腐", "Home-style Tofu", "川菜", "北豆腐450克；猪肉片100克；木耳50克；青红椒各60克；豆瓣酱15克；生抽15毫升；蒜末10克；淀粉5克", "1）豆腐切片煎至两面金黄。2）炒熟肉片，加入豆瓣和蒜末，再下木耳青红椒。3）倒入豆腐和少量水焖3分钟，以淀粉水薄芡。", "41-jiachang-doufu.png"),
  c("虎皮青椒", "Blistered Green Peppers", "川菜", "薄皮青椒400克；蒜末15克；生抽20毫升；香醋15毫升；糖5克；盐2克；食用油15毫升", "1）青椒去蒂去籽，擦干。2）干锅或少油中火按压煎至表面起虎皮。3）加蒜末、生抽、醋、糖和盐，翻炒收汁。", "42-hupi-qingjiao.png"),
  c("酸辣土豆丝", "Hot and Sour Shredded Potatoes", "家常菜", "土豆400克；青红椒各40克；干辣椒4个；蒜末10克；米醋25毫升；盐3克；食用油20毫升", "1）土豆切细丝，多次冲水去淀粉并沥干。2）热油爆香干辣椒蒜末，大火下土豆丝。3）沿锅边烹醋，加青红椒和盐，炒至断生仍脆。", "43-suanla-tudousi.png"),
  c("韭菜炒鸡蛋", "Chive and Egg Stir-fry", "家常菜", "韭菜250克；鸡蛋4个；盐4克；白胡椒少许；食用油25毫升", "1）韭菜切段，鸡蛋加盐打散。2）热油炒鸡蛋至蓬松，盛出。3）原锅大火炒韭菜梗再下叶，回锅鸡蛋，调盐迅速出锅。", "44-jiucai-chaodan.png"),
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
  c("腊味煲仔饭", "Claypot Rice with Chinese Sausage", "粤菜", "大米300克；广式腊肠2根；腊肉100克；青菜150克；姜丝10克；生抽20毫升；蚝油10克；糖3克；芝麻油5毫升", "1）大米浸30分钟，砂锅加水煮至表面见孔。2）铺腊肠、腊肉和姜丝，小火焖12分钟，沿锅边淋少量油。3）关火焖10分钟，放焯青菜，淋酱汁拌匀。", "48-lawei-baozai-fan.png"),
  c("海南鸡饭", "Hainanese Chicken Rice", "海南/东南亚", "嫩鸡半只约700克；大米300克；鸡汤适量；姜蒜各20克；斑斓叶可选；黄瓜100克；辣椒姜蓉蘸料适量", "1）鸡以姜葱微沸浸煮至熟，冰镇斩件，鸡汤留用。2）鸡油炒香米和姜蒜，用鸡汤煮成饭。3）鸡肉配鸡油饭、黄瓜及辣椒姜蓉蘸料。", "49-hainan-jifan.png", CN_HOME),
  c("担担面", "Dan Dan Noodles", "川菜", "鲜面条300克；猪肉末150克；芽菜50克；芝麻酱30克；辣椒油30毫升；生抽20毫升；香醋10毫升；花椒粉2克；青菜100克", "1）肉末炒酥，加芽菜炒香。2）碗中调入芝麻酱、辣椒油、生抽、醋、花椒粉和少量面汤。3）面条和青菜煮熟入碗，铺肉臊拌匀。", "50-dandan-mian.png"),
  c("炸酱面", "Beijing Zhajiang Noodles", "京菜", "鲜面条300克；五花肉丁180克；干黄酱50克；甜面酱30克；葱姜适量；黄瓜和豆芽等菜码200克", "1）黄酱以水调开，与甜面酱混合。2）炒香肉丁和葱姜，倒酱小火炸10分钟至油酱分离。3）面条煮熟，放菜码和炸酱拌食。", "51-zhajiang-mian.png"),
  c("热干面", "Wuhan Hot Dry Noodles", "湖北", "碱水面300克；芝麻酱50克；芝麻油15毫升；生抽15毫升；香醋8毫升；萝卜丁30克；葱花和辣椒油适量", "1）碱水面煮至八成熟，拌少量油摊凉。2）食用时复烫30秒沥干。3）加入调稀的芝麻酱、生抽、醋、萝卜丁、葱花和辣椒油，趁热拌匀。", "52-regan-mian.png", CN_HOME),
  c("重庆小面", "Chongqing Spicy Noodles", "重庆", "鲜面条300克；青菜100克；辣椒油30毫升；生抽20毫升；香醋10毫升；花椒粉2克；蒜水20毫升；猪油5克；花生碎适量", "1）碗中放辣椒油、生抽、醋、花椒粉、蒜水和猪油，冲入热汤。2）面条和青菜煮熟。3）捞入调料碗，撒花生碎和葱花。", "53-chongqing-xiaomian.png", CN_HOME),
  c("小笼包", "Soup Dumplings", "江南", "中筋面粉250克；温水130毫升；猪肉馅300克；皮冻180克；葱姜水80毫升；生抽15毫升；糖5克；盐4克", "1）面粉加水揉成光滑面团，醒30分钟。2）肉馅分次打入葱姜水调味，拌入切碎皮冻。3）擀薄皮包馅捏褶，水开大火蒸8分钟。", "54-xiaolongbao.png", CN_HOME),
  c("韭菜猪肉饺子", "Pork and Chive Dumplings", "北方家常", "饺子皮40张；猪肉馅400克；韭菜300克；葱姜水80毫升；生抽20毫升；芝麻油10毫升；盐5克", "1）肉馅分次搅入葱姜水、生抽和盐至上劲。2）韭菜切末拌芝麻油，再与肉馅混合。3）包入饺子皮，沸水下锅，点水两次煮至鼓起熟透。", "55-jiucai-zhurou-jiaozi.png"),
  c("馄饨", "Pork Wontons", "江南家常", "馄饨皮30张；猪肉馅250克；虾仁100克；葱姜水60毫升；生抽15毫升；紫菜5克；虾皮10克；高汤700毫升", "1）肉馅与虾仁碎调味，分次搅入葱姜水。2）包成馄饨，沸水煮至浮起后再煮2分钟。3）碗中放紫菜虾皮，冲高汤，捞入馄饨。", "76-huntun.png"),
  c("葱油拌面", "Scallion Oil Noodles", "上海", "鲜面条300克；小葱120克；食用油80毫升；生抽35毫升；老抽8毫升；糖15克", "1）葱切段擦干，冷油下锅小火炸至焦黄捞出。2）油中加生抽、老抽和糖，小火煮至起泡。3）面条煮熟沥干，拌葱油汁并放回酥葱。", "77-congyou-ban-mian.png"),
  c("炒河粉", "Beef Chow Fun", "粤菜", "鲜河粉400克；牛肉180克；豆芽150克；韭黄80克；生抽20毫升；老抽8毫升；蚝油10克；淀粉5克", "1）牛肉切片用生抽和淀粉腌10分钟，滑炒至七成熟盛出。2）大火把河粉煎炒出香气。3）加牛肉、豆芽、韭黄和调味料，快速翻匀避免碎断。", "78-chao-hefen.png"),
  c("肉夹馍", "Roujiamo", "陕西", "白吉馍4个；带皮猪肉600克；冰糖20克；生抽30毫升；料酒30毫升；八角桂皮香叶适量；青椒可选", "1）猪肉焯水，与香料、酱油、冰糖和热水小火卤90分钟。2）肉剁碎并拌少量卤汁。3）白吉馍烤热剖开，夹入肉末和可选青椒。", "79-roujiamo.png", CN_HOME),
  c("煎饼果子", "Jianbing Guozi", "天津", "绿豆面100克；中筋面粉50克；水260毫升；鸡蛋4个；薄脆4片；甜面酱30克；葱花香菜适量；芝麻和辣酱适量", "1）两种面粉加水调成流动面糊。2）薄摊在平底锅，打蛋摊开，撒芝麻葱香菜后翻面。3）刷酱，放薄脆折起即可。", "80-jianbing-guozi.png", CN_HOME),
  c("叉烧", "Cantonese Char Siu", "粤菜", "梅花肉600克；叉烧酱60克；生抽20毫升；蜂蜜25克；料酒15毫升；蒜末10克", "1）猪肉切粗条，以叉烧酱、生抽、料酒和蒜末冷藏腌一夜。2）200℃烤30–35分钟，中途翻面并刷腌汁。3）最后刷蜂蜜，升温烤至焦亮，静置后切片。", "81-chashao.png"),
  c("梅菜扣肉", "Pork Belly with Preserved Mustard Greens", "客家菜", "五花肉700克；梅干菜150克；生抽30毫升；老抽10毫升；糖10克；姜蒜适量；料酒20毫升", "1）五花肉煮至七成熟，抹老抽，肉皮向下煎至起泡，切片。2）梅干菜泡洗后与姜蒜炒香调味。3）肉片皮朝下码碗，铺梅菜，蒸90分钟后倒扣。", "82-meicai-kourou.png"),
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
  c("干锅花菜", "Dry-pot Cauliflower", "湘川风味", "花菜500克；五花肉150克；青蒜80克；干辣椒6个；豆瓣酱15克；生抽15毫升；蒜片适量", "1）花菜掰小朵，淡盐水浸洗后焯至七成熟。2）五花肉煸出油，加豆瓣、辣椒和蒜片。3）下花菜大火煸至边缘焦香，加生抽和青蒜。", "85-ganguo-huacai.png"),
  c("上汤娃娃菜", "Baby Napa Cabbage in Superior Broth", "粤菜", "娃娃菜2棵；皮蛋1个；咸蛋黄1个；火腿30克；蒜片10克；高汤500毫升；盐适量", "1）娃娃菜纵切，焯水后摆盘。2）炒香蒜片，下皮蛋、咸蛋黄和火腿丁。3）加入高汤煮浓，调盐后浇在娃娃菜上。", "86-shangtang-wawacai.png"),
  c("红烧茄子", "Red-braised Eggplant", "家常菜", "茄子500克；青椒80克；蒜末15克；生抽20毫升；老抽5毫升；糖8克；香醋8毫升；淀粉8克", "1）茄子切块撒少许盐，挤水后裹薄淀粉煎软。2）炒香蒜末和青椒。3）加入酱油糖醋汁及茄子，焖2分钟后收汁。", "87-hongshao-qiezi.png"),
  c("番茄牛腩", "Tomato Braised Beef Brisket", "家常菜", "牛腩600克；番茄500克；洋葱150克；姜20克；番茄酱30克；生抽20毫升；八角1个；盐适量", "1）牛腩焯水，番茄一半炒成酱。2）下牛腩、洋葱、姜、八角和热水，小火炖80分钟。3）加入剩余番茄再炖15分钟，调盐收至浓郁。", "88-fanqie-niunan.png"),
  c("紫菜蛋花汤", "Seaweed Egg Drop Soup", "家常汤", "鸡蛋2个；干紫菜8克；虾皮10克；高汤700毫升；盐3克；白胡椒少许；芝麻油5毫升；葱花适量", "1）高汤烧开，放虾皮和紫菜。2）保持微沸，蛋液细流淋入，静置数秒再轻推。3）加盐、白胡椒和芝麻油，撒葱花。", "89-zicai-danhua-tang.png"),
  c("银耳莲子羹", "Tremella and Lotus Seed Sweet Soup", "中式甜汤", "干银耳20克；干莲子80克；红枣8颗；冰糖50克；枸杞10克；清水1200毫升", "1）银耳泡发去蒂撕小朵，莲子泡软去芯。2）银耳莲子加水小火煮60–90分钟至胶质浓稠。3）加红枣和冰糖煮15分钟，关火前放枸杞。", "90-yiner-lianzi-geng.png", CN_HOME)
];

export const western = [
  w("意大利肉酱面", "Spaghetti Bolognese", "意大利", "意大利面250克；牛肉末300克；番茄罐头400克；洋葱100克；胡萝卜80克；芹菜60克；红酒80毫升；橄榄油20毫升；帕玛森适量", "1）橄榄油炒软洋葱、胡萝卜和芹菜，下牛肉末炒散上色。2）加红酒收干，倒番茄小火炖40分钟。3）面煮至有嚼劲，与肉酱拌匀，撒帕玛森。", "16-spaghetti-bolognese.png", WEST_ESSENTIAL),
  w("玛格丽特披萨", "Margherita Pizza", "意大利", "披萨面团1份约300克；番茄酱100克；马苏里拉150克；罗勒叶10片；橄榄油10毫升；盐少许", "1）烤箱和烤盘预热至最高温。2）面团拉成薄饼，抹番茄酱，铺马苏里拉。3）高温烤8–12分钟至边缘焦香，出炉放罗勒并淋橄榄油。", "17-margherita-pizza.png"),
  w("香煎牛排", "Pan-seared Steak", "欧美", "牛排2块每块约250克；盐5克；黑胡椒2克；橄榄油15毫升；黄油25克；大蒜3瓣；迷迭香2枝", "1）牛排回温擦干，充分撒盐和黑胡椒。2）厚底锅高温煎至上色，加入黄油蒜和香草反复淋油。3）按厚度煎至目标熟度，静置5–8分钟再切。", "18-beef-steak.png", WEST_ESSENTIAL),
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
  w("香草烤鸡", "Herb Roast Chicken", "欧美", "整鸡1只约1500克；黄油40克；柠檬1个；大蒜1头；迷迭香和百里香各适量；盐10克；黑胡椒3克", "1）鸡擦干，皮下和表面抹香草黄油、盐和胡椒，腹中放柠檬蒜。2）200℃烤约65–80分钟至最厚处熟透。3）出炉静置15分钟再切。", "25-herb-roast-chicken.png", WEST_ESSENTIAL),
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
  w("千层面", "Lasagna", "意大利", "鲜千层面片250克；橄榄油适量；帕玛森芝士碎一大把；肉酱：无盐黄油110克、芹菜梗1根、胡萝卜1根、小红洋葱1个、干牛肝菌25克、迷迭香1枝、去筋牛腹肉或小牛腹肉1千克、干白葡萄酒125毫升、优质番茄碎罐头400克；白酱：全脂牛奶1升、月桂叶1片、无盐黄油75克、00号面粉125克、现磨肉豆蔻适量、帕玛森芝士100克、蛋黄2个；调味料适量", "1）干牛肝菌用热水浸泡10分钟，沥干后粗切；芹菜、胡萝卜、小红洋葱切细，迷迭香取叶切碎。耐火炖锅中以中火将110克黄油烧至起泡，加入上述蔬菜、牛肝菌和迷迭香，适量调味后炒5分钟。2）牛腹肉切细并调味，放入锅中炒5分钟至上色；倒入白葡萄酒和番茄碎，煮沸后转小火，加盖煮1小时30分钟，最后30分钟揭盖收浓，至肉质软嫩但仍有结构、肉酱浓稠。3）牛奶与月桂叶放入锅中煮至微沸，关火备用；厚底锅中火融化75克黄油，打入面粉和热牛奶，持续用力搅打至顺滑，再煮10—15分钟至非常浓稠。取出月桂叶，适量调味并磨入肉豆蔻，拌入100克帕玛森和2个蛋黄，放凉。4）烤箱预热至180℃，风扇烤箱160℃。千层面片每3张一批放入加盐沸水中20秒使其变软，立即移入冰水。5）大烤盘底部和四周抹橄榄油，依次铺面片、肉酱和白酱，重复至面片和肉酱用完，顶层以白酱收尾并撒一大把帕玛森。6）烤40—45分钟至表面金黄、酱汁冒泡；出炉静置10分钟后切块，再静置10分钟再食用。", "57-lasagna.png"),
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
  w("酪乳煎饼", "Buttermilk Pancakes", "美国", "中筋面粉200克；酪乳250毫升；鸡蛋1个；融化黄油30克；糖25克；泡打粉8克；小苏打2克；盐2克；枫糖浆适量", "1）干料混匀，另将酪乳、鸡蛋和黄油混匀。2）湿料倒入干料，只拌至刚无干粉。3）平底锅中小火煎至表面冒泡后翻面，配黄油和枫糖浆。", "75-buttermilk-pancakes.png")
];
