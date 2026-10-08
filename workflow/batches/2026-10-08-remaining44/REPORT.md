# HowToCook 跳过的 44 道菜谱补充报告

分支：[codex/recipe-automation](https://github.com/mayiwei442-bojack/yanhuo-youpu/tree/codex/recipe-automation)。更新时间：2026-10-08T17:36:00.554Z。
请求44道（中餐22道、西餐22道）；完成0道、失败11道、处理中33道。

每道菜以完整性和内部自洽优先，其次比较来源图片、可执行步骤和原料覆盖，选择恰好一份完整配方。网站候选与数据库书籍分别保存，不跨来源拼接。新资料写入现有 Supabase 知识库，未变化资料复用文档和向量。

处理中包含23道等待用户答复缺图处理方式。

## 逐菜结果

| ID | 菜名 | 状态 | 最终信源或原因 |
| --- | --- | --- | --- |
| cn-012 | 羊肉泡馍 | 未修改（研究失败） | 在两项启用网站限定检索未得到羊肉泡馍完整配方；豆果题名目录页不可访问，不能用羊汤或水盆羊肉替代。 |
| cn-013 | 胡辣汤 | 等待缺图答复 | [豆果美食](https://www.douguo.com/cookbook/3300061.html) |
| cn-015 | 兰州清汤牛肉面 | 未修改（研究失败） | Mandatory soup-bone roasting at 400 degrees lacks Fahrenheit/Celsius unit in accessible complete source; no explicit alternative, no unit inferred. |
| cn-018 | 酸菜鱼 | 未修改（研究失败） | 豆果候选正常抓取超时，未取得可认证全文；不是因料包或原料表漏项而拒绝。Woks中文、拼音与英文别名检索仅得不同菜品或词汇页，未找到可访问的完整同菜配方。 |
| cn-019 | 东坡肉 | 编辑或验收中 | [The Woks of Life](https://thewoksoflife.com/braised-pork-belly-dong-po-rou/) |
| cn-020 | 白切鸡 | 编辑或验收中 | [The Woks of Life](https://thewoksoflife.com/cantonese-poached-chicken-w-ginger-scallion-oil-bai-qie-ji/) |
| cn-022 | 北京烤鸭 | 未修改（研究失败） | Woks完整候选为鸭胸煎制的简化Peking Duck，明显区别整鸭北京烤鸭工艺；未擅自改成煎鸭胸。豆果检索无可读取完整匹配。 |
| cn-023 | 小鸡炖蘑菇 | 未修改（研究失败） | Woks上海双菇鸡翅炖菜属于不同地区和配方变体；未用它替代东北小鸡炖蘑菇。豆果目录页不可读。 |
| cn-025 | 西湖醋鱼 | 未修改（研究失败） | 启用来源检索无可核验西湖醋鱼完整配方；豆果目录不可访问，不以普通糖醋鱼替代。 |
| cn-026 | 龙井虾仁 | 未修改（研究失败） | 唯一找到的豆果龙井虾仁候选抓取HTTP429/403；未绕过访问控制，不能把索引摘要冒充全文。Woks无对应完整菜谱。 |
| cn-028 | 清炒虾仁 | 未修改（研究失败） | 豆果候选可读时虾仁等所有主料均无用量，无法从同一来源还原主料比例；后续正常全文访问403。做法中原料表漏项本身可提取，并非独立拒绝理由。Woks别名结果为技术指南、其他菜与无配方的水晶虾仁介绍，未取得完整同菜信源。 |
| cn-031 | 家常豆腐 | 编辑或验收中 | [The Woks of Life](https://thewoksoflife.com/home-style-tofu-stir-fry/) |
| cn-035 | 冬瓜排骨汤 | 编辑或验收中 | [The Woks of Life](https://thewoksoflife.com/winter-melon-soup-pork-ribs/) |
| cn-037 | 佛跳墙 | 未修改（研究失败） | 配置两项网站未获得佛跳墙完整配方；豆果目录不可读；不以菌菇汤等近名来源补齐。 |
| cn-039 | 海南鸡饭 | 编辑或验收中 | [The Woks of Life](https://thewoksoflife.com/hainanese-chicken-rice/) |
| cn-040 | 担担面 | 编辑或验收中 | [The Woks of Life](https://thewoksoflife.com/dan-dan-noodles/) |
| cn-043 | 重庆小面 | 未修改（研究失败） | 豆果重庆小面候选页面抓取403；Woks结果为酸辣粉或上海面条，不匹配。 |
| cn-044 | 小笼包 | 编辑或验收中 | [The Woks of Life](https://thewoksoflife.com/steamed-shanghai-soup-dumplings-xiaolongbao/) |
| cn-049 | 肉夹馍 | 等待缺图答复 | [The Woks of Life](https://thewoksoflife.com/chinese-hamburgers-rou-jia-mo/) |
| cn-050 | 煎饼果子 | 未修改（研究失败） | Woks鸡蛋饼正文明确区分煎饼与鸡蛋饼；其链接JianBingApproximation用速冻葱油饼代替面糊并省略果子，属于不同变体；另一个链接只是游记无配方。豆果目录不可读。 |
| cn-051 | 叉烧 | 编辑或验收中 | [The Woks of Life](https://thewoksoflife.com/chinese-bbq-pork-cha-siu/) |
| cn-053 | 盐焗鸡 | 编辑或验收中 | [The Woks of Life](https://thewoksoflife.com/salt-baked-chicken/) |
| west-002 | 玛格丽特披萨 | 等待缺图答复 | [BBC Good Food](https://www.bbcgoodfood.com/recipes/pizza-margherita-4-easy-steps) |
| west-005 | 芝士汉堡 | 等待缺图答复 | [BBC Good Food](https://www.bbcgoodfood.com/recipes/cheeseburgers) |
| west-007 | 炸鱼薯条 | 等待缺图答复 | [BBC Good Food](https://www.bbcgoodfood.com/recipes/golden-beer-battered-fish-chips) |
| west-008 | 西班牙海鲜饭 | 等待缺图答复 | [BBC Good Food](https://www.bbcgoodfood.com/recipes/seafood-paella) |
| west-009 | 德式烤香肠 | 等待缺图答复 | [Serious Eats](https://www.seriouseats.com/grilled-bratwurst-with-beer-mustard-and-sauerkraut-recipe) |
| west-013 | 奶油宽面 | 等待缺图答复 | [BBC Good Food](https://www.bbcgoodfood.com/recipes/fettucine-alfredo) |
| west-014 | 蘑菇烩饭 | 等待缺图答复 | [BBC Good Food](https://www.bbcgoodfood.com/recipes/mushroom-risotto) |
| west-015 | 帕玛森鸡排 | 等待缺图答复 | [BBC Good Food](https://www.bbcgoodfood.com/recipes/chicken-parmigiana) |
| west-016 | 惠灵顿牛排 | 等待缺图答复 | [BBC Good Food](https://www.bbcgoodfood.com/recipes/beef-wellington) |
| west-017 | 红酒炖鸡 | 等待缺图答复 | [BBC Good Food](https://www.bbcgoodfood.com/recipes/coq-au-vin) |
| west-018 | 普罗旺斯炖菜 | 等待缺图答复 | [BBC Good Food](https://www.bbcgoodfood.com/recipes/ratatouille) |
| west-019 | 马赛鱼汤 | 等待缺图答复 | [BBC Good Food](https://www.bbcgoodfood.com/recipes/bouillabaisse) |
| west-021 | 法式红酒炖牛肉 | 等待缺图答复 | [BBC Good Food](https://www.bbcgoodfood.com/recipes/beef-bourguignon) |
| west-022 | 希腊穆萨卡 | 等待缺图答复 | [BBC Good Food](https://www.bbcgoodfood.com/recipes/moussaka) |
| west-023 | 希腊沙拉 | 等待缺图答复 | [BBC Good Food](https://www.bbcgoodfood.com/recipes/greek-salad) |
| west-024 | 香煎鸡肉炸排 | 编辑或验收中 | [BBC Good Food](https://www.bbcgoodfood.com/recipes/chicken-schnitzel-coleslaw) |
| west-025 | 瑞典肉丸 | 等待缺图答复 | [BBC Good Food](https://www.bbcgoodfood.com/recipes/classic-swedish-meatballs) |
| west-026 | 匈牙利牛肉汤 | 等待缺图答复 | [BBC Good Food](https://www.bbcgoodfood.com/recipes/beef-goulash-soup) |
| west-027 | 炸鱼塔可 | 等待缺图答复 | [BBC Good Food](https://www.bbcgoodfood.com/recipes/beer-battered-fish-tacos) |
| west-028 | 鸡肉芝士薄饼 | 等待缺图答复 | [BBC Good Food](https://www.bbcgoodfood.com/recipes/chicken-quesadillas) |
| west-029 | 班尼迪克蛋 | 等待缺图答复 | [BBC Good Food](https://www.bbcgoodfood.com/recipes/eggs-benedict) |
| west-030 | 酪乳煎饼 | 等待缺图答复 | [BBC Good Food](https://www.bbcgoodfood.com/recipes/buttermilk-pancakes-maple-apples-pecans) |

## 验证与来源边界

完成状态以独立 Reviewer PASS、确定性验证及提交推送均成功为前提。失败菜谱的正式数据保持编辑前版本；具体失败与尝试记录保留在本目录和 `workflow/runs/2026-10-08-remaining44-*.json`。书籍比较见 `cn-book-inventory.json`、`cn-kb-audit.json` 和 `west-kb-audit.json`。

本批不合入 howtocook 的24道修改，不合并 main，不部署线上站点。
