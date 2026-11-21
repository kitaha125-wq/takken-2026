import type { BuzzTrend, RecipeDraft, RecipeMood } from "./types";

type CatalogRecipe = Omit<
  RecipeDraft,
  "matchedIngredients" | "missingIngredients" | "score" | "why" | "buzzNote" | "source"
> & {
  id: string;
  tags: string[];
  pantry: string[];
};

export const BUZZ_TRENDS: BuzzTrend[] = [
  {
    id: "miso-butter",
    title: "味噌バター炒め",
    hook: "SNSで「晩ごはん決定」が多い、こってり時短炒め",
    vibe: "こってり・時短",
    keywords: ["味噌", "バター", "キャベツ", "豚肉", "にんにく"],
  },
  {
    id: "lemon-pasta",
    title: "レモンペッパーパスタ",
    hook: "さっぱり系が伸びてる、冷蔵庫の余りチーズでも成立",
    vibe: "さっぱり・映え",
    keywords: ["レモン", "パスタ", "にんにく", "チーズ", "胡椒"],
  },
  {
    id: "donburi-egg",
    title: "とろとろ卵どん",
    hook: "ワンパン丼が再燃。卵があればだいたい勝てる",
    vibe: "やさしい・早い",
    keywords: ["卵", "ごはん", "玉ねぎ", "醤油", "みりん"],
  },
  {
    id: "sheet-veg",
    title: "オーブンいらず温野菜プレート",
    hook: "蒸し焼き野菜＋ポン酢系がヘルシー枠で話題",
    vibe: "軽め・野菜多め",
    keywords: ["ブロッコリー", "にんじん", "キャベツ", "ポン酢", "ごま油"],
  },
  {
    id: "kimchi-jjigae",
    title: "キムチ豆腐チゲ風",
    hook: "ピリ辛鍋が寒い夜に強い。豆腐とキムチだけで濃い",
    vibe: "ピリ辛・温まる",
    keywords: ["キムチ", "豆腐", "ネギ", "にんにく", "ごま油"],
  },
];

export const CATALOG: CatalogRecipe[] = [
  {
    id: "cabbage-miso-butter",
    title: "キャベツと豚肉の味噌バター炒め",
    summary: "話題の味噌バターを、冷蔵庫の定番野菜で。ご飯が進むこってり時短。",
    minutes: 18,
    servings: 2,
    mood: "comfort",
    tags: ["炒め", "時短", "buzz"],
    pantry: ["味噌", "バター", "醤油", "酒", "にんにく"],
    ingredients: [
      { name: "キャベツ", amount: "1/4玉" },
      { name: "豚肉", amount: "150g" },
      { name: "にんにく", amount: "1片" },
      { name: "バター", amount: "10g" },
      { name: "味噌", amount: "大さじ1" },
      { name: "醤油", amount: "小さじ1", optional: true },
      { name: "酒", amount: "大さじ1", optional: true },
    ],
    steps: [
      {
        title: "切る",
        body: "キャベツはざく切り、豚肉は一口大、にんにくはみじん切りにする。",
        minutes: 4,
        ingredients: ["キャベツ", "豚肉", "にんにく"],
      },
      {
        title: "豚肉を焼く",
        body: "フライパンを中火で熱し、バター半量とにんにくを入れて香りを出し、豚肉を広げて焼く。",
        minutes: 4,
        ingredients: ["豚肉", "にんにく", "バター"],
      },
      {
        title: "キャベツを炒める",
        body: "キャベツを加え、しんなりするまで2〜3分炒める。酒があれば回し入れる。",
        minutes: 3,
        ingredients: ["キャベツ", "酒"],
      },
      {
        title: "味噌バターで絡める",
        body: "火を弱め、味噌と残りのバターを溶かし入れる。全体に絡めたら醤油少々で整えて完成。",
        minutes: 3,
        ingredients: ["味噌", "バター", "醤油"],
      },
    ],
    tips: [
      "味噌は火が強すぎると苦くなるので、最後に弱火で溶かす。",
      "豚肉がなければ卵や厚揚げでもいける。",
    ],
  },
  {
    id: "lemon-garlic-pasta",
    title: "レモンにんにくペペロン風パスタ",
    summary: "酸味と胡椒で軽いのに満足感あり。バズりやすいレモンパスタの家庭版。",
    minutes: 20,
    servings: 2,
    mood: "fresh",
    tags: ["麺", "buzz"],
    pantry: ["塩", "胡椒", "オリーブオイル", "にんにく"],
    ingredients: [
      { name: "パスタ", amount: "160g" },
      { name: "レモン", amount: "1/2個" },
      { name: "にんにく", amount: "2片" },
      { name: "オリーブオイル", amount: "大さじ2" },
      { name: "赤唐辛子", amount: "適量", optional: true },
      { name: "粉チーズ", amount: "適量", optional: true },
      { name: "塩", amount: "適量" },
      { name: "胡椒", amount: "適量" },
    ],
    steps: [
      {
        title: "湯を沸かす",
        body: "大きめの鍋に塩を入れた湯を沸かし、パスタを袋表記より1分短くゆでる。",
        minutes: 8,
        ingredients: ["パスタ", "塩"],
      },
      {
        title: "香りを立てる",
        body: "別のフライパンでにんにくと赤唐辛子をオイルで弱火にかけ、香りが出たら火を止める。",
        minutes: 3,
        ingredients: ["にんにく", "オリーブオイル", "赤唐辛子"],
      },
      {
        title: "和える",
        body: "ゆで上がったパスタとゆで汁少々を入れ、レモン汁・皮・胡椒・粉チーズを加えて絡める。",
        minutes: 3,
        ingredients: ["レモン", "胡椒", "粉チーズ"],
      },
    ],
    tips: [
      "ゆで汁を少し残すとソースが乳化してまとまる。",
      "レモンは皮を擦ると香りが一気に立つ。",
    ],
  },
  {
    id: "oyako-don",
    title: "とろとろ親子どん風",
    summary: "卵があれば今日のごはんが決まる。話題のとろとろ卵どんを家で再現。",
    minutes: 15,
    servings: 2,
    mood: "quick",
    tags: ["丼", "卵", "buzz"],
    pantry: ["醤油", "みりん", "砂糖", "だし"],
    ingredients: [
      { name: "卵", amount: "3個" },
      { name: "鶏肉", amount: "150g", optional: true },
      { name: "玉ねぎ", amount: "1/2個" },
      { name: "ごはん", amount: "茶碗2杯" },
      { name: "醤油", amount: "大さじ2" },
      { name: "みりん", amount: "大さじ2" },
      { name: "砂糖", amount: "小さじ1", optional: true },
      { name: "だし", amount: "100ml", optional: true },
    ],
    steps: [
      {
        title: "切って調味液",
        body: "玉ねぎは薄切り、鶏肉があれば一口大に。醤油・みりん・砂糖・だしを合わせておく。卵は溶きほぐす。",
        minutes: 4,
        ingredients: ["玉ねぎ", "鶏肉", "醤油", "みりん", "砂糖", "だし", "卵"],
      },
      {
        title: "煮て卵を流す",
        body: "フライパンに調味液と玉ねぎ、鶏肉を入れ中火で煮る。火が通ったら卵を回し入れ、ふたをしてとろっとさせる。",
        minutes: 6,
        ingredients: ["玉ねぎ", "鶏肉", "卵"],
      },
      {
        title: "どんぶりに盛る",
        body: "ごはんの上に半熟のうちにのせる。青ねぎがあれば散らして完成。",
        minutes: 2,
        ingredients: ["ごはん"],
      },
    ],
    tips: [
      "卵は一気に入れず、周りから流すとふわっとしやすい。",
      "鶏肉がなくても玉ねぎと卵だけで成立する。",
    ],
  },
  {
    id: "steamed-veg-plate",
    title: "フライパン蒸し野菜ポン酢だれ",
    summary: "火をほとんど使わない感覚の野菜プレート。ヘルシー枠で見かける蒸し焼きの家版。",
    minutes: 17,
    servings: 2,
    mood: "fresh",
    tags: ["野菜", "buzz"],
    pantry: ["ポン酢", "ごま油", "塩"],
    ingredients: [
      { name: "キャベツ", amount: "数枚" },
      { name: "にんじん", amount: "1/2本" },
      { name: "ブロッコリー", amount: "1/2株", optional: true },
      { name: "きのこ", amount: "1パック", optional: true },
      { name: "ポン酢", amount: "大さじ2" },
      { name: "ごま油", amount: "小さじ1" },
      { name: "塩", amount: "少々" },
    ],
    steps: [
      {
        title: "切る",
        body: "野菜を食べやすい大きさに切る。にんじんは薄め、ブロッコリーは小房に分ける。",
        minutes: 4,
        ingredients: ["キャベツ", "にんじん", "ブロッコリー", "きのこ"],
      },
      {
        title: "蒸し焼き",
        body: "フライパンに野菜を並べ、水大さじ2と塩少々。ふたをして中火で5〜7分蒸す。",
        minutes: 7,
        ingredients: ["塩"],
      },
      {
        title: "だれをかける",
        body: "器に盛り、ポン酢とごま油をかけて完成。醤油＋レモンでもOK。",
        minutes: 2,
        ingredients: ["ポン酢", "ごま油"],
      },
    ],
    tips: [
      "水分が出る野菜から並べるとむらなく火が通る。",
      "余った豆腐を添えると食事感が増える。",
    ],
  },
  {
    id: "kimchi-tofu",
    title: "キムチと豆腐のチゲ風",
    summary: "ピリ辛で温まる。キムチがあれば味がほぼ決まる、寒い夜の一品。",
    minutes: 16,
    servings: 2,
    mood: "comfort",
    tags: ["鍋", "buzz"],
    pantry: ["ごま油", "にんにく", "醤油"],
    ingredients: [
      { name: "キムチ", amount: "150g" },
      { name: "豆腐", amount: "1丁" },
      { name: "ネギ", amount: "1/2本", optional: true },
      { name: "豚肉", amount: "100g", optional: true },
      { name: "にんにく", amount: "1片" },
      { name: "ごま油", amount: "大さじ1" },
      { name: "水", amount: "200ml" },
      { name: "醤油", amount: "小さじ1", optional: true },
    ],
    steps: [
      {
        title: "具を切る",
        body: "豆腐は大きめ、ネギは斜め切り。にんにくはみじん切り。",
        minutes: 3,
        ingredients: ["豆腐", "ネギ", "にんにく"],
      },
      {
        title: "炒める",
        body: "鍋にごま油とにんにく、豚肉があれば入れて炒め、キムチを加えてさらに炒める。",
        minutes: 4,
        ingredients: ["ごま油", "にんにく", "豚肉", "キムチ"],
      },
      {
        title: "煮込む",
        body: "水を加えてひと煮立ちさせ、豆腐とネギを入れる。3分ほど煮て醤油で味を整える。",
        minutes: 5,
        ingredients: ["水", "豆腐", "ネギ", "醤油"],
      },
    ],
    tips: [
      "キムチの汁も入れると味が濃くなる。",
      "卵を落としてもおいしい。",
    ],
  },
  {
    id: "salmon-butter-soy",
    title: "鮭のバター醤油ホイル焼き風",
    summary: "魚がある日の定番。焦がしバター醤油で食堂感。",
    minutes: 22,
    servings: 2,
    mood: "everyday",
    tags: ["魚", "定番"],
    pantry: ["醤油", "バター", "酒"],
    ingredients: [
      { name: "鮭", amount: "2切れ" },
      { name: "玉ねぎ", amount: "1/2個", optional: true },
      { name: "きのこ", amount: "適量", optional: true },
      { name: "バター", amount: "10g" },
      { name: "醤油", amount: "大さじ1" },
      { name: "酒", amount: "大さじ1", optional: true },
      { name: "塩", amount: "少々" },
      { name: "胡椒", amount: "少々", optional: true },
    ],
    steps: [
      {
        title: "下ごしらえ",
        body: "鮭に塩・胡椒。玉ねぎときのこがあれば薄切りにする。",
        minutes: 4,
        ingredients: ["鮭", "塩", "胡椒", "玉ねぎ", "きのこ"],
      },
      {
        title: "焼く",
        body: "フライパンにバターを溶かし鮭を皮目から焼く。途中で酒を振り、ふたをして中まで火を通す。",
        minutes: 10,
        ingredients: ["バター", "鮭", "酒"],
      },
      {
        title: "醤油を絡める",
        body: "最後に醤油を回し入れ、野菜も一緒に絡めて完成。",
        minutes: 3,
        ingredients: ["醤油", "玉ねぎ", "きのこ"],
      },
    ],
    tips: ["焦げそうなら火を弱めてふた優先。", "ご飯かサラダがあれば献立完成。"],
  },
  {
    id: "egg-rice-garlic",
    title: "にんにく醤油の卵かけごはんアレンジ",
    summary: "材料がほぼなくても今日を乗り切る。話題のたまごかけごはん強化版。",
    minutes: 8,
    servings: 1,
    mood: "quick",
    tags: ["超時短", "卵"],
    pantry: ["醤油", "ごま油", "にんにく"],
    ingredients: [
      { name: "ごはん", amount: "茶碗1杯" },
      { name: "卵", amount: "1個" },
      { name: "醤油", amount: "小さじ1.5" },
      { name: "ごま油", amount: "数滴" },
      { name: "にんにく", amount: "少々", optional: true },
      { name: "ネギ", amount: "適量", optional: true },
    ],
    steps: [
      {
        title: "だれを作る",
        body: "小皿に醤油・ごま油・すりおろしにんにくを合わせる。",
        minutes: 2,
        ingredients: ["醤油", "ごま油", "にんにく"],
      },
      {
        title: "のせる",
        body: "温かいごはんに卵を落とし、だれをかけて混ぜる。ネギがあれば散らす。",
        minutes: 2,
        ingredients: ["ごはん", "卵", "ネギ"],
      },
    ],
    tips: ["卵は新鮮なものを。", "バターを米粒サイズ溶かすとコクが増す。"],
  },
  {
    id: "tofu-meat-don",
    title: "豆腐ハンバーグ風あんかけ",
    summary: "ひき肉が少ししかなくてもかさ増しできる。ふわっとした食感がうれしい。",
    minutes: 25,
    servings: 2,
    mood: "everyday",
    tags: ["おかず"],
    pantry: ["醤油", "みりん", "片栗粉", "塩", "胡椒"],
    ingredients: [
      { name: "豆腐", amount: "1/2丁" },
      { name: "ひき肉", amount: "150g" },
      { name: "玉ねぎ", amount: "1/4個" },
      { name: "卵", amount: "1個" },
      { name: "醤油", amount: "大さじ2" },
      { name: "みりん", amount: "大さじ1" },
      { name: "片栗粉", amount: "大さじ1" },
      { name: "塩", amount: "少々" },
      { name: "胡椒", amount: "少々" },
    ],
    steps: [
      {
        title: "水気を切る",
        body: "豆腐はキッチンペーパーで軽く押し、玉ねぎはみじん切り。",
        minutes: 5,
        ingredients: ["豆腐", "玉ねぎ"],
      },
      {
        title: "こねて焼く",
        body: "豆腐・ひき肉・玉ねぎ・卵・塩胡椒・片栗粉を混ぜ、小判型にして中火で両面焼く。",
        minutes: 10,
        ingredients: ["豆腐", "ひき肉", "玉ねぎ", "卵", "塩", "胡椒", "片栗粉"],
      },
      {
        title: "あんをかける",
        body: "醤油・みりん・水を入れてひと煮立ちさせ、とろみがついたら完成。",
        minutes: 4,
        ingredients: ["醤油", "みりん"],
      },
    ],
    tips: ["混ぜすぎると固くなるので軽くまとめる程度に。"],
  },
  {
    id: "tomato-egg",
    title: "トマトと卵の中華炒め",
    summary: "甘酸っぱくてご飯に合う。トマトが余っている日の強い味方。",
    minutes: 14,
    servings: 2,
    mood: "quick",
    tags: ["炒め", "卵"],
    pantry: ["塩", "砂糖", "醤油", "油"],
    ingredients: [
      { name: "トマト", amount: "2個" },
      { name: "卵", amount: "3個" },
      { name: "ネギ", amount: "適量", optional: true },
      { name: "塩", amount: "少々" },
      { name: "砂糖", amount: "小さじ1" },
      { name: "醤油", amount: "小さじ1" },
      { name: "油", amount: "大さじ1" },
    ],
    steps: [
      {
        title: "切って溶く",
        body: "トマトはざく切り、卵は溶きほぐす。",
        minutes: 3,
        ingredients: ["トマト", "卵"],
      },
      {
        title: "卵を炒める",
        body: "熱したフライパンに油を入れ卵を半熟で取り出す。",
        minutes: 2,
        ingredients: ["油", "卵"],
      },
      {
        title: "トマトと合わせる",
        body: "同じフライパンでトマトを炒め、塩・砂糖・醤油で味付け。卵を戻し入れて絡める。",
        minutes: 5,
        ingredients: ["トマト", "塩", "砂糖", "醤油", "卵", "ネギ"],
      },
    ],
    tips: ["トマトの水気が出たら強火で少し飛ばすとべたつかない。"],
  },
  {
    id: "natto-avocado",
    title: "アボカド納豆ごはん",
    summary: "レンジいらずの満足丼。バズりやすい組み合わせを家庭向けに。",
    minutes: 7,
    servings: 1,
    mood: "quick",
    tags: ["超時短", "buzz"],
    pantry: ["醤油", "ごま油"],
    ingredients: [
      { name: "納豆", amount: "1パック" },
      { name: "アボカド", amount: "1/2個" },
      { name: "ごはん", amount: "茶碗1杯" },
      { name: "醤油", amount: "適量" },
      { name: "ごま油", amount: "数滴", optional: true },
      { name: "卵", amount: "1個", optional: true },
    ],
    steps: [
      {
        title: "切る",
        body: "アボカドを食べやすく切る。納豆は付属のたれとカラシで混ぜる。",
        minutes: 2,
        ingredients: ["アボカド", "納豆"],
      },
      {
        title: "のせる",
        body: "ごはんに納豆とアボカドをのせ、醤油・ごま油・好みで卵黄を落とす。",
        minutes: 2,
        ingredients: ["ごはん", "醤油", "ごま油", "卵"],
      },
    ],
    tips: ["アボカドがない日はきゅうりやトマトでもいける。"],
  },
];

const ALIASES: Record<string, string[]> = {
  キャベツ: ["きゃべつ", "cabbage"],
  豚肉: ["豚こま", "豚バラ", "ぶたにく"],
  鶏肉: ["鶏むね", "鶏もも", "とりにく"],
  ひき肉: ["豚ひき", "合挽", "あいびき"],
  卵: ["たまご", "玉子"],
  ごはん: ["米", "ご飯", "ライス"],
  ネギ: ["長ねぎ", "青ねぎ", "ねぎ"],
  きのこ: ["しめじ", "まいたけ", "えのき", "しいたけ"],
  パスタ: ["スパゲティ", "麺"],
  だし: ["めんつゆ", "和風だし"],
  油: ["サラダ油", "菜種油"],
  鮭: ["サーモン", "しゃけ"],
};

export function normalizeIngredient(raw: string): string {
  const s = raw.trim().toLowerCase().replace(/\s+/g, "");
  if (!s) return "";
  for (const [canonical, aliases] of Object.entries(ALIASES)) {
    if (s === canonical || aliases.some((a) => s.includes(a.toLowerCase()))) {
      return canonical;
    }
    if (canonical.toLowerCase() === s || s.includes(canonical.toLowerCase())) {
      return canonical;
    }
  }
  return raw.trim();
}

function hasIngredient(fridge: Set<string>, name: string): boolean {
  const n = normalizeIngredient(name);
  if (fridge.has(n)) return true;
  for (const item of fridge) {
    if (item.includes(n) || n.includes(item)) return true;
  }
  return false;
}

function moodMatch(mood: RecipeMood | "any", recipeMood: RecipeMood): number {
  if (mood === "any") return 0;
  if (mood === recipeMood) return 12;
  if (mood === "quick" && recipeMood === "everyday") return 4;
  if (mood === "comfort" && recipeMood === "everyday") return 3;
  return -2;
}

export function suggestRecipes(input: {
  fridge: string[];
  mood: RecipeMood | "any";
  buzzId?: string | null;
  buzzText?: string;
  limit?: number;
}): RecipeDraft[] {
  const fridge = new Set(
    input.fridge.map(normalizeIngredient).filter(Boolean),
  );
  const buzz = BUZZ_TRENDS.find((b) => b.id === input.buzzId);
  const buzzWords = [
    ...(buzz?.keywords ?? []),
    ...(buzz?.title ? [buzz.title] : []),
    ...(input.buzzText
      ? input.buzzText.split(/[\s、,\/]+/).filter(Boolean)
      : []),
  ].map(normalizeIngredient);

  const scored = CATALOG.map((recipe) => {
    const required = recipe.ingredients.filter((i) => !i.optional);
    const matched: string[] = [];
    const missing: string[] = [];
    for (const ing of recipe.ingredients) {
      if (hasIngredient(fridge, ing.name)) matched.push(ing.name);
      else if (!ing.optional) missing.push(ing.name);
    }

    let score = matched.length * 10;
    score -= missing.length * 7;
    score += moodMatch(input.mood, recipe.mood);
    if (recipe.minutes <= 15 && input.mood === "quick") score += 8;
    if (recipe.tags.includes("buzz")) score += 3;

    let buzzHits = 0;
    for (const w of buzzWords) {
      const hay = `${recipe.title}${recipe.summary}${recipe.tags.join("")}${recipe.ingredients.map((i) => i.name).join("")}`;
      if (w && hay.includes(w)) buzzHits += 1;
    }
    score += buzzHits * 9;

    const pantryCovered = recipe.pantry.filter((p) =>
      hasIngredient(fridge, p),
    ).length;
    score += pantryCovered;

    const coverage =
      required.length === 0
        ? 1
        : matched.filter((m) => required.some((r) => r.name === m)).length /
          required.length;

    const whyParts: string[] = [];
    if (matched.length)
      whyParts.push(`冷蔵庫の「${matched.slice(0, 3).join("・")}」が活きる`);
    if (buzzHits && buzz)
      whyParts.push(`いま話題の「${buzz.title}」に寄せた提案`);
    else if (buzzHits && input.buzzText)
      whyParts.push(`気になってた「${input.buzzText}」のニュアンス入り`);
    if (missing.length === 0) whyParts.push("足りないものはほぼなし");
    else if (missing.length <= 2)
      whyParts.push(`買い足しは「${missing.join("・")}」くらい`);
    if (recipe.minutes <= 20) whyParts.push(`${recipe.minutes}分で着地`);

    return {
      title: recipe.title,
      summary: recipe.summary,
      minutes: recipe.minutes,
      servings: recipe.servings,
      mood: recipe.mood,
      source: (buzzHits > 0 ? "buzz" : "suggest") as RecipeDraft["source"],
      buzzNote: buzz?.title ?? input.buzzText?.trim() ?? "",
      ingredients: recipe.ingredients,
      steps: recipe.steps,
      tips: recipe.tips,
      matchedIngredients: matched,
      missingIngredients: missing,
      score: score + coverage * 5,
      why: whyParts.join(" / ") || "今日の気分に合いそう",
    };
  });

  scored.sort((a, b) => b.score - a.score);
  const limit = input.limit ?? 4;
  const top = scored.slice(0, limit);

  // If fridge is empty, still return trending-leaning picks.
  if (fridge.size === 0) {
    return scored
      .map((r) => ({
        ...r,
        why:
          r.why.includes("話題") || r.source === "buzz"
            ? r.why
            : `サンプル提案：冷蔵庫を入れると精度が上がる / ${r.why}`,
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  }

  return top;
}
