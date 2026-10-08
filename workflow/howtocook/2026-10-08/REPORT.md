# HowToCook 菜谱迁移报告

分支：[howtocook](https://github.com/mayiwei442-bojack/yanhuo-youpu/tree/howtocook)。上游固定版本：`a2d45c6984dff9ee941da0e7c452f7965965d962`。
状态：已提交并推送，完成提交 1f8675fc207bfce0c467a38e42c63be99dd93c38。

请求 68 道；匹配迁移 24 道（中餐 21 道、西餐 3 道）；跳过 44 道。已完成 24 道独立 Reviewer PASS；24 道来源写入现有知识库，共 121 chunks（Voyage voyage-4 / 1024 维），语义和混合检索均命中。26 张上游原图已校验并复制到本地。

保留上游完整 Markdown、章节、工具、计算公式、操作与附加内容，并以固定提交及 SHA-256 追踪。规范步骤只修明显语法和标点；上游原始文字保持不变。来源缺项及矛盾在菜谱说明公开保留，未借其他配方补全。

验证：完整 deterministic suite PASS，提交快照独立验证 PASS；原文章节和图片浏览器检查 PASS。未运行 test:ai，未修改 main。

## 已匹配菜谱

| ID | 菜谱 | HowToCook 原文 |
| --- | --- | --- |
| cn-014 | 柳州螺蛳粉 | [螺蛳粉](https://github.com/Anduin2017/HowToCook/blob/a2d45c6984dff9ee941da0e7c452f7965965d962/dishes/staple/%E8%9E%BA%E8%9B%B3%E7%B2%89.md) |
| cn-017 | 水煮牛肉 | [水煮牛肉](https://github.com/Anduin2017/HowToCook/blob/a2d45c6984dff9ee941da0e7c452f7965965d962/dishes/meat_dish/%E6%B0%B4%E7%85%AE%E7%89%9B%E8%82%89/%E6%B0%B4%E7%85%AE%E7%89%9B%E8%82%89.md) |
| cn-021 | 口水鸡 | [口水鸡](https://github.com/Anduin2017/HowToCook/blob/a2d45c6984dff9ee941da0e7c452f7965965d962/dishes/meat_dish/%E5%8F%A3%E6%B0%B4%E9%B8%A1/%E5%8F%A3%E6%B0%B4%E9%B8%A1.md) |
| cn-030 | 蚂蚁上树 | [蚂蚁上树](https://github.com/Anduin2017/HowToCook/blob/a2d45c6984dff9ee941da0e7c452f7965965d962/dishes/meat_dish/%E8%9A%82%E8%9A%81%E4%B8%8A%E6%A0%91.md) |
| cn-032 | 虎皮青椒 | [虎皮青椒](https://github.com/Anduin2017/HowToCook/blob/a2d45c6984dff9ee941da0e7c452f7965965d962/dishes/vegetable_dish/%E8%99%8E%E7%9A%AE%E9%9D%92%E6%A4%92/%E8%99%8E%E7%9A%AE%E9%9D%92%E6%A4%92.md) |
| cn-033 | 酸辣土豆丝 | [酸辣土豆丝](https://github.com/Anduin2017/HowToCook/blob/a2d45c6984dff9ee941da0e7c452f7965965d962/dishes/vegetable_dish/%E9%85%B8%E8%BE%A3%E5%9C%9F%E8%B1%86%E4%B8%9D.md) |
| cn-034 | 韭菜炒鸡蛋 | [韭菜炒蛋](https://github.com/Anduin2017/HowToCook/blob/a2d45c6984dff9ee941da0e7c452f7965965d962/dishes/vegetable_dish/%E9%9F%AD%E8%8F%9C%E7%82%92%E8%9B%8B/%E9%9F%AD%E8%8F%9C%E7%82%92%E8%9B%8B.md) |
| cn-038 | 腊味煲仔饭 | [微波炉腊肠煲仔饭](https://github.com/Anduin2017/HowToCook/blob/a2d45c6984dff9ee941da0e7c452f7965965d962/dishes/staple/%E5%BE%AE%E6%B3%A2%E7%82%89%E8%85%8A%E8%82%A0%E7%85%B2%E4%BB%94%E9%A5%AD/%E5%BE%AE%E6%B3%A2%E7%82%89%E8%85%8A%E8%82%A0%E7%85%B2%E4%BB%94%E9%A5%AD.md) |
| cn-041 | 炸酱面 | [炸酱面](https://github.com/Anduin2017/HowToCook/blob/a2d45c6984dff9ee941da0e7c452f7965965d962/dishes/staple/%E7%82%B8%E9%85%B1%E9%9D%A2.md) |
| cn-042 | 热干面 | [热干面](https://github.com/Anduin2017/HowToCook/blob/a2d45c6984dff9ee941da0e7c452f7965965d962/dishes/staple/%E7%83%AD%E5%B9%B2%E9%9D%A2.md) |
| cn-045 | 韭菜猪肉饺子 | [手工水饺](https://github.com/Anduin2017/HowToCook/blob/a2d45c6984dff9ee941da0e7c452f7965965d962/dishes/staple/%E6%89%8B%E5%B7%A5%E6%B0%B4%E9%A5%BA.md) |
| cn-046 | 馄饨 | [速冻馄饨](https://github.com/Anduin2017/HowToCook/blob/a2d45c6984dff9ee941da0e7c452f7965965d962/dishes/semi-finished/%E9%80%9F%E5%86%BB%E9%A6%84%E9%A5%A8.md) |
| cn-047 | 葱油拌面 | [葱油拌面](https://github.com/Anduin2017/HowToCook/blob/a2d45c6984dff9ee941da0e7c452f7965965d962/dishes/staple/%E8%91%B1%E6%B2%B9%E6%8B%8C%E9%9D%A2.md) |
| cn-048 | 炒河粉 | [炒河粉](https://github.com/Anduin2017/HowToCook/blob/a2d45c6984dff9ee941da0e7c452f7965965d962/dishes/staple/%E7%82%92%E6%B2%B3%E7%B2%89.md) |
| cn-052 | 梅菜扣肉 | [梅菜扣肉](https://github.com/Anduin2017/HowToCook/blob/a2d45c6984dff9ee941da0e7c452f7965965d962/dishes/meat_dish/%E6%A2%85%E8%8F%9C%E6%89%A3%E8%82%89/%E6%A2%85%E8%8F%9C%E6%89%A3%E8%82%89.md) |
| cn-055 | 干锅花菜 | [干锅花菜](https://github.com/Anduin2017/HowToCook/blob/a2d45c6984dff9ee941da0e7c452f7965965d962/dishes/vegetable_dish/%E5%B9%B2%E9%94%85%E8%8A%B1%E8%8F%9C/%E5%B9%B2%E9%94%85%E8%8A%B1%E8%8F%9C.md) |
| cn-056 | 上汤娃娃菜 | [上汤娃娃菜](https://github.com/Anduin2017/HowToCook/blob/a2d45c6984dff9ee941da0e7c452f7965965d962/dishes/vegetable_dish/%E4%B8%8A%E6%B1%A4%E5%A8%83%E5%A8%83%E8%8F%9C/%E4%B8%8A%E6%B1%A4%E5%A8%83%E5%A8%83%E8%8F%9C.md) |
| cn-057 | 红烧茄子 | [红烧茄子](https://github.com/Anduin2017/HowToCook/blob/a2d45c6984dff9ee941da0e7c452f7965965d962/dishes/vegetable_dish/%E7%BA%A2%E7%83%A7%E8%8C%84%E5%AD%90.md) |
| cn-058 | 番茄牛腩 | [西红柿牛腩](https://github.com/Anduin2017/HowToCook/blob/a2d45c6984dff9ee941da0e7c452f7965965d962/dishes/meat_dish/%E8%A5%BF%E7%BA%A2%E6%9F%BF%E7%89%9B%E8%85%A9/%E8%A5%BF%E7%BA%A2%E6%9F%BF%E7%89%9B%E8%85%A9.md) |
| cn-059 | 紫菜蛋花汤 | [紫菜蛋花汤](https://github.com/Anduin2017/HowToCook/blob/a2d45c6984dff9ee941da0e7c452f7965965d962/dishes/soup/%E7%B4%AB%E8%8F%9C%E8%9B%8B%E8%8A%B1%E6%B1%A4.md) |
| cn-060 | 银耳莲子羹 | [银耳莲子粥](https://github.com/Anduin2017/HowToCook/blob/a2d45c6984dff9ee941da0e7c452f7965965d962/dishes/soup/%E9%93%B6%E8%80%B3%E8%8E%B2%E5%AD%90%E7%B2%A5/%E9%93%B6%E8%80%B3%E8%8E%B2%E5%AD%90%E7%B2%A5.md) |
| west-001 | 意大利肉酱面 | [意式肉酱面](https://github.com/Anduin2017/HowToCook/blob/a2d45c6984dff9ee941da0e7c452f7965965d962/dishes/staple/%E6%84%8F%E5%BC%8F%E8%82%89%E9%85%B1%E9%9D%A2/%E6%84%8F%E5%BC%8F%E8%82%89%E9%85%B1%E9%9D%A2.md) |
| west-003 | 香煎牛排 | [牛排](https://github.com/Anduin2017/HowToCook/blob/a2d45c6984dff9ee941da0e7c452f7965965d962/dishes/meat_dish/%E7%89%9B%E6%8E%92/%E7%89%9B%E6%8E%92.md) |
| west-010 | 香草烤鸡 | [意式烤鸡](https://github.com/Anduin2017/HowToCook/blob/a2d45c6984dff9ee941da0e7c452f7965965d962/dishes/meat_dish/%E6%84%8F%E5%BC%8F%E7%83%A4%E9%B8%A1.md) |

具体版本保留：柳州螺蛳粉为袋装版；腊味煲仔饭为微波炉腊肠版；馄饨为电饭煲煮速冻版；意大利肉酱面为成品酱快捷版；香草烤鸡为意式欧芹鸡腿肉版。韭菜炒蛋、西红柿牛腩按同义名对应；手工水饺采用源中猪肉韭菜馅；银耳莲子粥不含米谷，对应银耳莲子甜羹。

## 跳过菜谱

| ID | 菜谱 | 原因 |
| --- | --- | --- |
| cn-012 | 羊肉泡馍 | 锁定上游完整目录中无对应菜谱。 |
| cn-013 | 胡辣汤 | 锁定上游完整目录中无对应菜谱。 |
| cn-015 | 兰州清汤牛肉面 | 锁定上游完整目录中无对应菜谱。 |
| cn-018 | 酸菜鱼 | 锁定上游完整目录中无对应菜谱。 |
| cn-019 | 东坡肉 | 锁定上游完整目录中无对应菜谱。 |
| cn-020 | 白切鸡 | 锁定上游完整目录中无对应菜谱。 |
| cn-022 | 北京烤鸭 | 锁定上游完整目录中无对应菜谱。 |
| cn-023 | 小鸡炖蘑菇 | 锁定上游完整目录中无对应菜谱。 |
| cn-025 | 西湖醋鱼 | 锁定上游完整目录中无对应菜谱。 |
| cn-026 | 龙井虾仁 | 锁定上游完整目录中无对应菜谱。 |
| cn-028 | 清炒虾仁 | 锁定上游完整目录中无对应菜谱。 |
| cn-031 | 家常豆腐 | 锁定上游完整目录中无对应菜谱。 |
| cn-035 | 冬瓜排骨汤 | 锁定上游完整目录中无对应菜谱。 |
| cn-037 | 佛跳墙 | 锁定上游完整目录中无对应菜谱。 |
| cn-039 | 海南鸡饭 | 锁定上游完整目录中无对应菜谱。 |
| cn-040 | 担担面 | 锁定上游完整目录中无对应菜谱。 |
| cn-043 | 重庆小面 | 锁定上游完整目录中无对应菜谱。 |
| cn-044 | 小笼包 | 锁定上游完整目录中无对应菜谱。 |
| cn-049 | 肉夹馍 | 锁定上游完整目录中无对应菜谱。 |
| cn-050 | 煎饼果子 | 锁定上游完整目录中无对应菜谱。 |
| cn-051 | 叉烧 | 锁定上游完整目录中无对应菜谱。 |
| cn-053 | 盐焗鸡 | 锁定上游完整目录中无对应菜谱。 |
| west-002 | 玛格丽特披萨 | 锁定上游完整目录中无对应菜谱。 |
| west-005 | 芝士汉堡 | 锁定上游完整目录中无对应菜谱。 |
| west-007 | 炸鱼薯条 | 锁定上游完整目录中无对应菜谱。 |
| west-008 | 西班牙海鲜饭 | 锁定上游完整目录中无对应菜谱。 |
| west-009 | 德式烤香肠 | 锁定上游完整目录中无对应菜谱。 |
| west-013 | 奶油宽面 | 锁定上游完整目录中无对应菜谱。 |
| west-014 | 蘑菇烩饭 | 锁定上游完整目录中无对应菜谱。 |
| west-015 | 帕玛森鸡排 | 锁定上游完整目录中无对应菜谱。 |
| west-016 | 惠灵顿牛排 | 近名菜谱做法不同，不替代指定菜谱。 |
| west-017 | 红酒炖鸡 | 锁定上游完整目录中无对应菜谱。 |
| west-018 | 普罗旺斯炖菜 | 锁定上游完整目录中无对应菜谱。 |
| west-019 | 马赛鱼汤 | 锁定上游完整目录中无对应菜谱。 |
| west-021 | 法式红酒炖牛肉 | 锁定上游完整目录中无对应菜谱。 |
| west-022 | 希腊穆萨卡 | 锁定上游完整目录中无对应菜谱。 |
| west-023 | 希腊沙拉 | 锁定上游完整目录中无对应菜谱。 |
| west-024 | 香煎鸡肉炸排 | 锁定上游完整目录中无对应菜谱。 |
| west-025 | 瑞典肉丸 | 锁定上游完整目录中无对应菜谱。 |
| west-026 | 匈牙利牛肉汤 | 锁定上游完整目录中无对应菜谱。 |
| west-027 | 炸鱼塔可 | 锁定上游完整目录中无对应菜谱。 |
| west-028 | 鸡肉芝士薄饼 | 锁定上游完整目录中无对应菜谱。 |
| west-029 | 班尼迪克蛋 | 锁定上游完整目录中无对应菜谱。 |
| west-030 | 酪乳煎饼 | 锁定上游完整目录中无对应菜谱。 |

跳过菜谱的正式数据与原有 pending 状态均保留。本次不合并 main，也未部署线上站点。
