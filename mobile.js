// ==========================================
// 放射化学ソクラテスチューター - スマホ専用スクリプト
// ==========================================

// 主要放射性核種データシート (診療放射線技師国家試験頻出核種)
const radionuclides = [
    {
        id: "h3",
        symbol: "³H",
        element: "水素 (トリチウム)",
        halfLife: "12.32 年",
        decayMode: "β-",
        radiation: "β⁻線: 18.6 keV (最大)",
        production: "⁶Li(n, α)³H 反応など",
        usage: "放射能標識化合物、シンチレータの校正。",
        examNotes: "極めて低エネルギーのβ⁻線を放出する（最大18.6keV）。そのため、測定には液体シンチレーションカウンタ(LSC)が必要となる。"
    },
    {
        id: "be7",
        symbol: "⁷Be",
        element: "ベリリウム",
        halfLife: "53.22 日",
        decayMode: "EC",
        radiation: "γ線: 478 keV (放出比 10.4%)",
        production: "宇宙線による大気窒素・酸素のスパレーション等",
        usage: "大気循環のトレーサー。",
        examNotes: "軌道電子捕獲(EC)壊変し、安定な⁷Liになる。その際、約10%の確率で478keVのγ線を放出する。"
    },
    {
        id: "c11",
        symbol: "¹¹C",
        element: "炭素",
        halfLife: "20.39 分",
        decayMode: "β+",
        radiation: "β⁺線 (最大 960 keV), 消滅放射線 (511 keV)",
        production: "サイクロトロンを用いた ¹⁴N(p, α)¹¹C 反応",
        usage: "PET検査用超短寿命トレーサー (¹¹C-メチオニンによる脳腫瘍診断など)。",
        examNotes: "半減期が約20分と極めて短いため、院内サイクロトロンでの製造と即時の自動合成装置による合成・投与が必要となる。有機化合物の骨格をそのまま標識できる強みがある。"
    },
    {
        id: "c14",
        symbol: "¹⁴C",
        element: "炭素",
        halfLife: "5730 年",
        decayMode: "β-",
        radiation: "β⁻線: 156 keV (最大)",
        production: "大気中での ¹⁴N(n, p)¹⁴C 反応 (宇宙線中性子)",
        usage: "年代測定、生化学・薬物代謝研究（標識化合物）。",
        examNotes: "半減期が5730年と長く、最大エネルギー156 keVの比較的弱いβ⁻線を放出する純β放出体。測定には液体シンチレーションカウンタなどが用いられる。"
    },
    {
        id: "n13",
        symbol: "¹³N",
        element: "窒素",
        halfLife: "9.97 分",
        decayMode: "β+",
        radiation: "β⁺線 (最大 1.20 MeV), 消滅放射線 (511 keV)",
        production: "サイクロトロンを用いた ¹⁶O(p, α)¹³N 反応",
        usage: "PET検査（¹³N-アンモニアを用いた心筋血流イメージング）。",
        examNotes: "超短寿命の陽電子放出核種（半減期約10分）。院内サイクロトロンが必須。壊変に伴い511keVの消滅γ線を放出する。"
    },
    {
        id: "o15",
        symbol: "¹⁵O",
        element: "酸素",
        halfLife: "122 秒",
        decayMode: "β+",
        radiation: "β⁺線 (最大 1.73 MeV), 消滅放射線 (511 keV)",
        production: "サイクロトロンを用いた ¹⁴N(d, n)¹⁵O 反応",
        usage: "PET検査（¹⁵O-ガスや¹⁵O-水を用いた脳血流・酸素代謝測定）。",
        examNotes: "半減期が122秒と極めて短いため、製造直後にオンラインでガスや水として患者へ吸入・投与するシステムが必要。"
    },
    {
        id: "f18",
        symbol: "¹⁸F",
        element: "フッ素",
        halfLife: "109.77 分",
        decayMode: "β+",
        radiation: "β⁺線 (最大 634 keV), 消滅放射線 (511 keV)",
        production: "サイクロトロンを用いた ¹⁸O(p, n)¹⁸F 反応",
        usage: "PET検査 (¹⁸F-FDGを用いたがんの糖代謝イメージング、脳・心筋の代謝診断)。",
        examNotes: "陽電子(β⁺)壊変し、放出した陽電子が周囲の電子と結合して消滅する際に、511 keVの消滅放射線を互いに180度反対方向に2本放出する（同時計数法に利用）。"
    },
    {
        id: "na22",
        symbol: "²²Na",
        element: "ナトリウム",
        halfLife: "2.60 年",
        decayMode: "β+",
        radiation: "β⁺線 (最大 546 keV), γ線 (1.275 MeV)",
        production: "サイクロトロンでの ²⁴Mg(d, α)²²Na 反応",
        usage: "PET装置のキャリブレーション、陽電子消滅寿命測定の線源。",
        examNotes: "陽電子(β⁺)壊変(90%)とEC壊変(10%)が並発する。β⁺線放出と同時に1.275 MeV of γ線も放出するため、消滅γ線(511keV)との同時測定等に利用される。"
    },
    {
        id: "na24",
        symbol: "²⁴Na",
        element: "ナトリウム",
        halfLife: "14.96 時間",
        decayMode: "β-",
        radiation: "β⁻線 (最大 1.39 MeV), γ線 (1.37 MeV & 2.75 MeV)",
        production: "原子炉での ²³Na(n, γ)²⁴Na 反応",
        usage: "生体内ナトリウム代謝の研究、工業用配管の漏洩調査（トレーサー）。",
        examNotes: "β⁻壊変後に極めて高エネルギーのγ線（1.37 MeVと2.75 MeV）を放出する。中性子被ばく時に生体内の²³Naが中性子放射化して²⁴Naが生成されるため、被ばく評価の指標となる。"
    },
    {
        id: "p32",
        symbol: "³²P",
        element: "リン",
        halfLife: "14.26 日",
        decayMode: "β-",
        radiation: "純β⁻線: 1.71 MeV (最大)",
        production: "原子炉での ³²S(n, p)³²P 反応、または ³¹P(n, γ)³²P",
        usage: "悪性腫瘍の治療、分子生物学におけるDNA・RNA標識試験。",
        examNotes: "γ線を一切放出しない純β放出体。最大エネルギーが1.71 MeVと高いため、プラスチックシールド（アクリル板など）でベータ線を遮蔽する（鉛を使うと制動放射線が発生するため注意）。"
    },
    {
        id: "p33",
        symbol: "³³P",
        element: "リン",
        halfLife: "25.34 日",
        decayMode: "β-",
        radiation: "β⁻線: 0.248 MeV (最大)",
        production: "原子炉での ³³S(n, p)³³P 反応",
        usage: "生化学におけるDNA・RNA・代謝標識（³²Pより低エネルギーで扱いやすい）。",
        examNotes: "純β放出体。半減期25.3日、最大エネルギー0.248 MeVであり、³²Pよりもβ線エネルギーが低く、飛程が短いため安全に取り扱える。"
    },
    {
        id: "s35",
        symbol: "³⁵S",
        element: "硫黄",
        halfLife: "87.51 日",
        decayMode: "β-",
        radiation: "純β⁻線: 167 keV (最大)",
        production: "原子炉での ³⁵Cl(n, p)³⁵S 反応",
        usage: "アミノ酸（メチオニン等）の放射性標識によるタンパク質合成解析。",
        examNotes: "低エネルギーの純β放出体（最大167keV）。C-14（最大156keV）とエネルギー域が非常に近く、測定法や取り扱いも類似している。"
    },
    {
        id: "cl36",
        symbol: "³⁶Cl",
        element: "塩素",
        halfLife: "3.01 × 10⁵ 年",
        decayMode: "β-",
        radiation: "β⁻線: 0.709 MeV (最大)",
        production: "原子炉での ³⁵Cl(n, γ)³⁶Cl 反応",
        usage: "環境水・地下水の年代測定用トレーサー。",
        examNotes: "半減期が30万年と極めて長く、長寿命放射性廃棄物として原子力分野で重要視される。β⁻壊変(98.1%)のほかに、ごく稀にEC壊変(1.9%)も行う。"
    },
    {
        id: "ar37",
        symbol: "³⁷Ar",
        element: "アルゴン",
        halfLife: "35.0 日",
        decayMode: "EC",
        radiation: "特性X線: 2.82 keV (Cl-K特性X線) / γ線は殆ど放出しない",
        production: "⁴⁰Ca(n, α)³⁷Ar 反応",
        usage: "空気循環の測定、地下核実験の検知指標。",
        examNotes: "軌道電子捕獲(EC)壊変。放出されるのは主に内殻電子が捕獲された後に生じる塩素(Cl)の超低エネルギー特性X線（約2.8 keV）のみであり、検出には特殊なガス比例計数管等が必要。"
    },
    {
        id: "k40",
        symbol: "⁴⁰K",
        element: "カリウム",
        halfLife: "1.251 × 10⁹ 年",
        decayMode: "β-",
        radiation: "β⁻線 (最大 1.311 MeV / 89.3%), γ線 (1.461 MeV / 10.7%)",
        production: "天然に存在する長寿命放射性核種",
        usage: "K-Ar法による岩石の年代測定、生体内放射能の基準値。",
        examNotes: "天然カリウムの中に0.0117%含まれる。β⁻壊変(89.3%)で⁴⁰Caになる一方、EC壊変(10.7%)で⁴⁰Arになり、その際1.461 MeVのガンマ線を放出する（分岐壊変の代表例）。生体の自己被ばくの最大要因。"
    },
    {
        id: "k42",
        symbol: "⁴²K",
        element: "カリウム",
        halfLife: "12.30 時間",
        decayMode: "β-",
        radiation: "β⁻線 (最大 3.525 MeV / 81.8%), γ線 (1.525 MeV)",
        production: "原子炉での ⁴¹K(n, γ)⁴²K 反応",
        usage: "植物や生物体内におけるカリウム移行速度の測定トレーサー。",
        examNotes: "非常に高エネルギーのβ⁻線（最大3.525 MeV）を放出する。半減期が約12.3時間と短いため、短時間の動態追跡に適している。"
    },
    {
        id: "ca45",
        symbol: "⁴⁵Ca",
        element: "カルシウム",
        halfLife: "162.67 日",
        decayMode: "β-",
        radiation: "純β⁻線: 0.257 MeV (最大)",
        production: "原子炉での ⁴⁴Ca(n, γ)⁴⁵Ca 反応",
        usage: "骨代謝、カルシウムチャネルなどの生理機能研究。",
        examNotes: "純β放出体。カルシウムのトレーサーとして、骨や歯への沈着速度の研究、骨粗鬆症モデル動物での吸収実験などに用いられる。"
    },
    {
        id: "cr51",
        symbol: "⁵¹Cr",
        element: "クロム",
        halfLife: "27.70 日",
        decayMode: "EC",
        radiation: "γ線: 320 keV (放出比 9.9%)",
        production: "原子炉での ⁵⁰Cr(n, γ)⁵¹Cr 反応",
        usage: "赤血球容積測定、赤血球寿命測定（⁵¹Cr-クロム酸ナトリウム）。",
        examNotes: "EC壊変し、娘核種⁵¹Vの励起状態から320 keVのγ線が約10%の割合で放出される。赤血球の標識に汎用される。"
    },
    {
        id: "mn54",
        symbol: "⁵⁴Mn",
        element: "マンガン",
        halfLife: "312.03 日",
        decayMode: "EC",
        radiation: "γ線: 835 keV (100%)",
        production: "原子炉での ⁵⁴Fe(n, p)⁵⁴Mn 反応",
        usage: "放射線測定器の検出効率較正用ガンマ線源。",
        examNotes: "EC壊変し、ほぼ100%の確率で835 keVのガンマ線のみを放出する。そのため、エネルギーおよび検出効率校正用として使いやすい標準線源とされる。"
    },
    {
        id: "fe55",
        symbol: "⁵⁵Fe",
        element: "鉄",
        halfLife: "2.737 年",
        decayMode: "EC",
        radiation: "特性X線: 5.9 keV (Mn-K特性X線)",
        production: "原子炉での ⁵⁴Fe(n, γ)⁵⁵Fe 反応",
        usage: "低エネルギーX線検出器のキャリブレーション、鉄鋼めっき厚測定。",
        examNotes: "EC壊変により、励起ガンマ線を一切出さずに、マンガン(Mn)のK殻特性X線（約5.9 keV）のみを放出する。極めて低いエネルギーの特性X線源として重要。"
    },
    {
        id: "fe59",
        symbol: "⁵⁹Fe",
        element: "鉄",
        halfLife: "44.50 日",
        decayMode: "β-",
        radiation: "β⁻線 (最大 466 keV), γ線 (1.10 MeV & 1.29 MeV)",
        production: "原子炉での ⁵₈Fe(n, γ)⁵⁹Fe 反応",
        usage: "鉄代謝検査（循環赤血球鉄摂取率、鉄クリアランス試験）。",
        examNotes: "β⁻壊変後に高エネルギーのγ線（1.10 MeVと1.29 MeV）を放出する。体内の鉄の動態や赤血球への鉄の取り込み能を調べる血液内科領域の検査で使用。"
    },
    {
        id: "co57",
        symbol: "⁵⁷Co",
        element: "コバルト",
        halfLife: "271.74 日",
        decayMode: "EC",
        radiation: "γ線: 122 keV (放出比 85.6%) & 136 keV",
        production: "サイクロトロンでの ⁵⁶Fe(d, n)⁵⁷Co 反応",
        usage: "ガンマカメラ（シンチカメラ）の検出面感度均一性校正用面源、メスバウアー効果測定。",
        examNotes: "EC壊変し、放出するガンマ線（122 keV）が⁹⁹ᵐTcのガンマ線（141 keV）に近いため、シンチカメラの日常品質管理用外部線源（面源）として最も適している。"
    },
    {
        id: "co60",
        symbol: "⁶⁰Co",
        element: "コバルト",
        halfLife: "5.27 年",
        decayMode: "β-",
        radiation: "β⁻線 (最大 318 keV), γ線 (1.17 MeV & 1.33 MeV)",
        production: "原子炉での ⁵⁹Co(n, γ)⁶⁰Co 反応",
        usage: "外部放射線治療、産業用滅菌、非破壊検査の線源。",
        examNotes: "β⁻壊変した後に放出される2本のγ線(1.17 MeVと1.33 MeV)のエネルギー強度が非常に強く、外部照射の代表的線源。壊変後は安定な⁶⁰Niになる。"
    },
    {
        id: "ni59",
        symbol: "⁵⁹Ni",
        element: "ニッケル",
        halfLife: "1.001 × 10⁵ 年",
        decayMode: "EC",
        radiation: "特性X線: 6.9 keV (Co-K特性X線)",
        production: "原子炉での ⁵₈Ni(n, γ)⁵⁹Ni 反応",
        usage: "原子炉廃炉時の長寿命廃棄物評価。",
        examNotes: "EC壊変のみを行い、ガンマ線を伴わず、コバルト(Co)の特性X線（約6.9 keV）のみを放出する。半減期が約10万年と長いため、廃棄物評価で注意を要する。"
    },
    {
        id: "cu64",
        symbol: "⁶⁴Cu",
        element: "銅",
        halfLife: "12.70 時間",
        decayMode: "β-",
        radiation: "β⁻線 (39.0%), β⁺線 (17.4%), EC壊変 (43.6%)",
        production: "原子炉での ⁶³Cu(n, γ)⁶⁴Cu 反応、またはサイクロトロン",
        usage: "がんのPET診断と内用療法の両用（セラノスティクス）。",
        examNotes: "β⁻壊変(39.0%)、β⁺壊変(17.4%)、EC壊変(43.6%)の3つが複雑に分岐して起こる特異な核種。β⁺線によるPET撮影と、β⁻線によるがん治療効果を同時に狙える。"
    },
    {
        id: "ga67",
        symbol: "⁶⁷Ga",
        element: "ガリウム",
        halfLife: "3.26 日",
        decayMode: "EC",
        radiation: "γ線: 93 keV, 185 keV, 300 keV, 394 keV",
        production: "サイクロトロンを用いた ⁶⁸Zn(p, 2n)⁶⁷Ga 反応",
        usage: "腫瘍シンチグラフィ、炎症・膿瘍シンチグラフィ (⁶⁷Ga-クエン酸ガリウム)。",
        examNotes: "軌道電子捕獲(EC)壊変。放出されるエネルギー強度が複数あり、中エネルギー用コロメータを使用する。トランスフェリンと結合して腫瘍や炎症局所に集積する。"
    },
    {
        id: "ge68",
        symbol: "⁶⁸Ge",
        element: "ゲルマニウム",
        halfLife: "270.95 日",
        decayMode: "EC",
        radiation: "特性X線: 9.25 keV (Ga-K特性X線) / γ線は殆ど放出しない",
        production: "サイクロトロンでの ⁶⁹Ga(p, 2n)⁶⁸Ge 反応",
        usage: "⁶⁸Ge - ⁶⁸Ga ジェネレータの親核種、PET装置の減衰補正用線源。",
        examNotes: "EC壊変し、娘核種⁶⁸Ga（半減期67.7分、β⁺放出体）になり永続平衡が成立する。自主的なPET用Ga-68線源供給として国試で頻出。"
    },
    {
        id: "kr81m",
        symbol: "⁸¹ᵐKr",
        element: "クリプトン",
        halfLife: "13.1 秒",
        decayMode: "IT",
        radiation: "γ線: 190 keV (放出比 67.5%)",
        production: "⁸¹Rb - ⁸¹ᵐKr ジェネレータからの溶離",
        usage: "肺換気シンチグラフィ（吸入ガス診断）。",
        examNotes: "半減期が13.1秒と極めて短いため、患者に持続吸入させながらリアルタイムで肺換気像を撮影できる。親核種⁸¹Rb（半減期4.6時間）のジェネレータから供給される。"
    },
    {
        id: "kr85",
        symbol: "⁸⁵Kr",
        element: "クリプトン",
        halfLife: "10.78 年",
        decayMode: "β-",
        radiation: "β⁻線 (最大 687 keV), γ線 (514 keV)",
        production: "原子炉での核分裂生成物",
        usage: "厚さ計、密閉リークテストの漏洩検知源。",
        examNotes: "β⁻壊変し、微量のγ線(514keV, 放出比0.4%)を随伴する。希ガスであり化学的に不活性なため、ガス洩れの試験などに好適。"
    },
    {
        id: "sr90",
        symbol: "⁹⁰Sr",
        element: "ストロンチウム",
        halfLife: "28.79 年",
        decayMode: "β-",
        radiation: "純β⁻線 (最大 546 keV ※娘核種⁹⁰Yは最大 2.28 MeV)",
        production: "原子炉内での U-235 核分裂生成物",
        usage: "厚さ計などの工業計測器、骨転移癌の痛みの緩和用治療薬、放射線源の基礎研究。",
        examNotes: "親・娘ともにγ線をほとんど放出しない「純β放出体」。娘核種⁹⁰Y(半減期64時間)と永続平衡を形成する。カルシウムと化学的性質が似ており骨に集積しやすい。"
    },
    {
        id: "y90",
        symbol: "⁹⁰Y",
        element: "イットリウム",
        halfLife: "64.00 時間",
        decayMode: "β-",
        radiation: "純β⁻線 (最大 2.28 MeV)",
        production: "⁹⁰Sr - ⁹⁰Y ジェネレータによる分離、または原子炉中性子照射",
        usage: "がんの放射性免疫療法、がんの放射性微小球治療。",
        examNotes: "純β⁻放出体。高エネルギーのベータ線(最大2.28 MeV)を放出し、飛程が水中で最大約11mmと大きいため、局所のがん組織に高線量を照射して治療できる。"
    },
    {
        id: "mo99",
        symbol: "⁹⁹Mo",
        element: "モリブデン",
        halfLife: "65.94 時間",
        decayMode: "β-",
        radiation: "β⁻線 (最大 1.215 MeV), γ線 (主要 740 keV, 141 keV 等)",
        production: "原子炉での ²³⁵U の核分裂(n, f)から分離、または ⁹⁸Mo(n, γ)⁹⁹Mo",
        usage: "⁹⁹ᵐTcジェネレータの親核種。",
        examNotes: "⁹⁹ᵐTcの親核種。β⁻壊変(87.6%)で励起状態の⁹⁹ᵐTcとなり、残りは直接⁹⁹Tc（基底状態）になる。ジェネレータ内で娘核種との間で過渡平衡が成立する超重要核種。"
    },
    {
        id: "tc99m",
        symbol: "⁹⁹ᵐTc",
        element: "テクネチウム",
        halfLife: "6.02 時間",
        decayMode: "IT",
        radiation: "γ線: 141 keV (放出比 89%)",
        production: "⁹⁹Mo - ⁹⁹ᵐTc ジェネレータ",
        usage: "骨シンチグラフィ、脳血流シンチグラフィ、心筋シンチグラフィなど、核医学診断で最も多用される。",
        examNotes: "核異性体転移(IT)により、娘核種の安定基底状態(⁹⁹Tc、半減期2.1×10⁵年)へ純γ線放出して壊変する。親核種⁹⁹Mo(半減期66時間)から約23時間で極大となり、過渡平衡が成立する。"
    },
    {
        id: "in111",
        symbol: "¹¹¹In",
        element: "インジウム",
        halfLife: "2.80 日",
        decayMode: "EC",
        radiation: "γ線: 171 keV & 245 keV",
        production: "サイクロトロンを用いた ¹¹¹Cd(p, n)¹¹¹In 反応など",
        usage: "白血球標識シンチグラフィ（炎症局在診断）、脳脊髄腔シンチグラフィ（¹¹¹In-DTPA）。",
        examNotes: "EC壊変し、171 keVと245 keVの2つの明瞭なγ線をカスケード放出する。標識抗体やDTPA錯体として体内の動態評価に広く用いられる。"
    },
    {
        id: "i123",
        symbol: "¹²³I",
        element: "ヨウ素",
        halfLife: "13.22 時間",
        decayMode: "EC",
        radiation: "γ線: 159 keV",
        production: "サイクロトロンを用いた ¹²⁴Xe(p, 2n)¹²³Cs → ¹²³Xe → ¹²³I",
        usage: "甲状腺摂取率測定・シンチグラフィ、脳血流シンチグラフィ (¹²³I-IMP)、心臓交感神経シンチグラフィ (¹²³I-MIBG)。",
        examNotes: "EC壊変。放出するγ線のエネルギー(159 keV)がシンチカメラでの検出に極めて適しており、ベータ線を出さないため診断用ヨウ素として被ばくが少ない優れた核種。"
    },
    {
        id: "i125",
        symbol: "¹²⁵I",
        element: "ヨウ素",
        halfLife: "59.40 日",
        decayMode: "EC",
        radiation: "γ線: 35.5 keV / 特性X線 (Te-Kα): 約27〜31 keV",
        production: "原子炉での ¹²⁴Xe(n, γ)¹²⁵Xe → ¹²⁵I",
        usage: "ラジオイムノアッセイ(RIA)などの体外検査用標識源、前立腺がんの密封小線源治療（永久挿入）。",
        examNotes: "EC壊変し、低エネルギーのγ線と特性X線を放出する。治療用には前立腺がんの内照射（永久挿入）に使われる。半減期が約60日とヨウ素の中では比較的長い。"
    },
    {
        id: "i131",
        symbol: "¹³¹I",
        element: "ヨウ素",
        halfLife: "8.02 日",
        decayMode: "β-",
        radiation: "β⁻線 (最大 606 keV), γ線 (364 keV)",
        production: "原子炉での U-235 核分裂生成物からの分離、または ¹³⁰Te(n, γ)¹³¹Te → ¹³¹I",
        usage: "甲状腺疾患の治療（甲状腺がん、バセドウ病の放射性ヨウ素内用療法）、甲状腺シンチグラフィ。",
        examNotes: "β⁻線による治療効果と、γ線(364keV)による体内シンチグラフィ診断の両方に用いられる。揮発性があり吸入危険があるため注意が必要。"
    },
    {
        id: "xe133",
        symbol: "¹³³Xe",
        element: "キセノン",
        halfLife: "5.25 日",
        decayMode: "β-",
        radiation: "β⁻線 (最大 346 keV), γ線 (81 keV)",
        production: "原子炉での U-235 核分裂生成物からの分離",
        usage: "肺換気機能検査、局所脳血流測定。",
        examNotes: "希ガス（キセノンガス）。吸入させることで肺の換気能や血流分布を調べる。β⁻線(346keV)と低エネルギーγ線(81keV)を放出する。"
    },
    {
        id: "cs137",
        symbol: "¹³⁷Cs",
        element: "セシウム",
        halfLife: "30.17 年",
        decayMode: "β-",
        radiation: "β⁻線 (最大 514 keV), γ線 (662 keV ※娘核種¹³⁷ᵐBaより放出)",
        production: "原子炉内での U-235 核分裂生成物",
        usage: "放射線測定器の校校用標準線源、がんの小線源治療（腔内照射など）。",
        examNotes: "自身は純粋なβ⁻壊変(95%)で娘核種¹³⁷ᵐBa(半減期2.55分)になり、そこから662 keVのγ線が放出される。測定器のエネルギー校正の基準線源として最重要。"
    },
    {
        id: "ba137m",
        symbol: "¹³⁷ᵐBa",
        element: "バリウム",
        halfLife: "2.55 分",
        decayMode: "IT",
        radiation: "γ線: 662 keV (放出比 89.7%)",
        production: "¹³⁷Cs のβ⁻壊変に伴い生成",
        usage: "放射能測定器の校正用線源（¹³⁷Csと平衡状態にあるもの）、教育用ミルキング実験。",
        examNotes: "¹³⁷Csの娘核種。半減期が2.55分と非常に短く、IT壊変により662 keVのγ線を放出して安定な¹³⁷Baになる。日常的に『セシウムのγ線』と呼んでいるのは、正確にはこの娘核種から放出されているものである。"
    },
    {
        id: "pm147",
        symbol: "¹⁴⁷Pm",
        element: "プロメチウム",
        halfLife: "2.62 年",
        decayMode: "β-",
        radiation: "純β⁻線: 0.224 MeV (最大)",
        production: "原子炉での核分裂生成物から抽出",
        usage: "厚さ計（薄層シート用）、夜光塗料のエネルギー源。",
        examNotes: "純β放出体。最大エネルギー0.224 MeVと比較的穏やかなβ線のみを放出し、γ線を出さないため、工業用の薄物厚さ計の測定源として安定して使われる。"
    },
    {
        id: "ir192",
        symbol: "¹⁹²Ir",
        element: "イリジウム",
        halfLife: "73.83 日",
        decayMode: "β-",
        radiation: "β⁻線 (最大 675 keV), γ線 (主要 317 keV, ほか多数)",
        production: "原子炉での ¹⁹¹Ir(n, γ)¹⁹²Ir 反応",
        usage: "がんの遠隔後充填治療（RALS）、非破壊検査（産業用ガンマ線透過試験）。",
        examNotes: "β⁻壊変(95%)とEC壊変(5%)が並発。平均約380 keVの透過力の高いγ線を放出し、高線量率小線源治療(RALS)の線源として極めて重要。"
    },
    {
        id: "au198",
        symbol: "¹⁹⁸Au",
        element: "金",
        halfLife: "2.69 日",
        decayMode: "β-",
        radiation: "β⁻線 (最大 961 keV), γ線 (412 keV)",
        production: "原子炉での ¹⁹⁷Au(n, γ)¹⁹⁸Au 反応",
        usage: "がんの組織内照射治療（金コロイドや金シード線源）。",
        examNotes: "金は中性子吸収断面積が大きいため、容易に中性子放射化して¹⁹⁸Auとなる。β⁻線による治療効果と、412 keVのγ線による線量評価が行える。"
    },
    {
        id: "tl201",
        symbol: "²⁰¹Tl",
        element: "タリウム",
        halfLife: "3.04 日",
        decayMode: "EC",
        radiation: "γ線: 135 keV, 167 keV / 特性X線 (Hg-Kα): 69〜83 keV (主要検出対象)",
        production: "サイクロトロンを用いた ²⁰³Tl(p, 3n)²⁰¹Pb → ²⁰¹Tl",
        usage: "心筋血流シンチグラフィ、腫瘍シンチグラフィ（脳腫瘍や甲状腺がんの再発診断）。",
        examNotes: "EC壊変。主として放出されるγ線よりも、壊変に伴う娘核種水銀(Hg)の特性X線(69〜83 keV)をシンチカメラで検出して画像化する点が出題されやすい。カリウムイオンと類似の挙動。"
    },
    {
        id: "po210",
        symbol: "²¹⁰Po",
        element: "ポロニウム",
        halfLife: "138.38 日",
        decayMode: "alpha",
        radiation: "α線: 5.30 MeV (ほぼ 100%)",
        production: "ウラン系列（天然存在）、または ²⁰九Bi(n, γ)²¹⁰Bi → ²¹⁰Po",
        usage: "静電気除去装置のイオン源、基礎研究線源。",
        examNotes: "ウラン系列に属する天然放射性核種。ほぼ純粋なα線（5.30 MeV）のみを放出して安定な²⁰⁶Pbに壊変する。γ線を殆ど伴わないため遮蔽が容易だが、体内摂取時の内部被ばく危険性が極めて高い。"
    },
    {
        id: "rn222",
        symbol: "²²²Rn",
        element: "ラドン",
        halfLife: "3.82 日",
        decayMode: "alpha",
        radiation: "α線: 5.49 MeV",
        production: "²²⁶Raのα壊変により生成される天然の放射性希ガス",
        usage: "ラドン温泉（健康効果）、大気中のトレーサー。",
        examNotes: "ウラン系列の天然放射性希ガス。体内吸入による呼吸器被ばくの原因物質として公衆衛生上重要。壊変生成物（Po-218、Pb-214、Bi-214など）もすべて放射性物質である。"
    },
    {
        id: "ra223",
        symbol: "²²³Ra",
        element: "ラジウム",
        halfLife: "11.43 日",
        decayMode: "alpha",
        radiation: "α線: 5.72 MeV",
        production: "²³⁵U 壊変系列（天然のウラン系列から分離）",
        usage: "骨転移を有する去勢抵抗性前立腺がんの治療薬（塩化ラジウム-223）。",
        examNotes: "アルファ線を放出する治療用放射性核種として国家試験で注目されています。カルシウムと同族（アルカリ土類金属）のため、骨に集積しやすい性質を持ちます。"
    },
    {
        id: "ra226",
        symbol: "²²⁶Ra",
        element: "ラジウム",
        halfLife: "1600 年",
        decayMode: "alpha",
        radiation: "α線: 4.78 MeV, γ線: 186 keV",
        production: "ウラン系列の天然放射性核種",
        usage: "がんの組織内照射・針治療（歴史的）、蛍光塗料の励起光源（歴史的）。",
        examNotes: "ウラン系列の中核核種。半減期が1600年と長く、α壊変してガス状の ²²²Rnになる。壊変系列の下流にある²¹⁴Biなどから強力なγ線が放出されるため、遮蔽およびガス漏れに注意が必要。"
    },
    {
        id: "ra228",
        symbol: "²²₈Ra",
        element: "ラジウム",
        halfLife: "5.75 年",
        decayMode: "β-",
        radiation: "β⁻線: 0.012 MeV (最大)",
        production: "天然のトリウム壊変系列から生成",
        usage: "トリウム系列の環境トレーサー、地質学研究。",
        examNotes: "トリウム系列（4n系列）に属する天然放射性核種。親核種である²³²Thからアルファ壊変を経て生成され、自身は低エネルギーのβ⁻線を放出して²²⁸Acになる。"
    },
    {
        id: "th232",
        symbol: "²³²Th",
        element: "トリウム",
        halfLife: "1.405 × 10¹⁰ 年",
        decayMode: "alpha",
        radiation: "α線: 4.01 MeV",
        production: "天然のトリウム鉱石",
        usage: "原子力燃料、タングステン電極の添加剤、光学ガラス。",
        examNotes: "トリウム系列（4n系列）の親核種。宇宙の年齢（約138億年）と同等かそれ以上の長寿命を持つ天然放射性核種。α壊変を繰り返して最終的に安定な²⁰⁸Pbに到達する。"
    },
    {
        id: "u235",
        symbol: "²³⁵U",
        element: "ウラン",
        halfLife: "7.04 × 10⁸ 年",
        decayMode: "alpha",
        radiation: "α線: 4.40 MeV, γ線: 186 keV",
        production: "天然ウランからの濃縮",
        usage: "原子力発電所の核分裂燃料、研究用原子炉の燃料。",
        examNotes: "アクチニウム系列（4n+3系列）の親核種。天然ウラン中に約0.72%しか存在しないが、熱中性子によって核分裂反応を起こす唯一の天然核種。"
    },
    {
        id: "u238",
        symbol: "²³₈U",
        element: "ウラン",
        halfLife: "4.468 × 10⁹ 年",
        decayMode: "alpha",
        radiation: "α線: 4.20 MeV",
        production: "天然ウランの主成分（約99.27%）",
        usage: "原子力発電でのプルトニウム-239親物質、遮蔽体（劣化ウラン）。",
        examNotes: "ウラン系列（4n+2系列）の親核種。天然ウランの99%以上を占め、半減期は地球の年齢（約45億年）とほぼ等しい。熱中性子を吸収するとプルトニウム-239へ変化する。"
    },
    {
        id: "np237",
        symbol: "²³⁷Np",
        element: "ネプチュニウム",
        halfLife: "2.144 × 10⁶ 年",
        decayMode: "alpha",
        radiation: "α線: 4.79 MeV",
        production: "原子炉内での重水素照射、またはU-238の(n, 2n)反応",
        usage: "アメリシウム-241の崩壊に伴う生成、核物理研究。",
        examNotes: "ネプチュニウム系列（4n+1系列）の親核種。この系列は半減期が短いため、天然にはすでに存在しない（消滅系列）。最終的に安定な²⁰⁹Biに到達する。"
    },
    {
        id: "pu239",
        symbol: "²³⁹Pu",
        element: "プルトニウム",
        halfLife: "2.411 × 10⁴ 年",
        decayMode: "alpha",
        radiation: "α線: 5.16 MeV",
        production: "原子炉内で U-238 が中性子を吸収し、β⁻壊変を2回繰り返して生成",
        usage: "高速増殖炉燃料、混合酸化物（MOX）燃料、核兵器。",
        examNotes: "人工放射性核種。熱中性子による核分裂断面積が大きく、ウラン-235と同様に核燃料や兵器となる。体内移行時に骨や肝臓に沈着し、極めて毒性が強い。"
    },
    {
        id: "am241",
        symbol: "²⁴¹Am",
        element: "アメリシウム",
        halfLife: "432.2 年",
        decayMode: "alpha",
        radiation: "α線: 5.49 MeV, γ線: 59.5 keV",
        production: "原子炉内のプルトニウム-241のβ⁻壊変により生成",
        usage: "煙感知器のイオン化線源、厚さ計、α・γ線源。",
        examNotes: "強力なα線源であると同時に、59.5 keVの扱いやすいγ線を放出するため、測定器の検出効率校正などに広く用いられる。"
    },
    {
        id: "cf252",
        symbol: "²⁵²Cf",
        element: "カリホルニウム",
        halfLife: "2.645 年",
        decayMode: "alpha",
        radiation: "α線: 6.12 MeV (放出比 96.9%) / 自発核分裂 (SF) (3.1%)",
        production: "原子炉内でプルトニウムやアメリシウムへの多重中性子照射",
        usage: "自発核分裂中性子源（原子炉の起動用線源、中性子ラジオグラフィなど）。",
        examNotes: "自発核分裂（SF）を起こす極めて稀な人工核種。1壊変あたり平均3.76個の中性子を放出するため、ポータブルな中性子源として試験で最重要視される。"
    }
];

// 過去問テンプレートのデータ
const questionTemplates = {
    q1: {
        title: "放射能の減衰と残存割合",
        text: "【国試類題：放射能の減衰】\n半減期が8日の放射性核種があります。この核種の放射能が、初期値の12.5%（1/8）になるのは何日後ですか？",
        initialPrompt: "半減期が8日の放射性核種があります。この核種の放射能が、初期値の12.5%（1/8）になるのは何日後ですか？解き方のヒントをください。"
    },
    q2: {
        title: "99Mo-99mTcの放射平衡",
        text: "【国試類題：過渡平衡】\n99Mo - 99mTc ジェネレータ（過渡平衡）において、ジェネレータから溶離（ミルキング）を行った後、娘核種である99mTcの放射能が極大に達するのは約何時間後ですか？また、なぜ極大が存在するのかヒントをください。",
        initialPrompt: "99Mo-99mTcジェネレータで、ミルキング後に99mTcの放射能が極大になる時間と、放射平衡の原理についてステップ順に考えていきたいです。"
    },
    q3: {
        title: "半減期と壊変定数の関係",
        text: "【国試類題：壊変定数と半減期】\nある放射性核種の壊変定数λが 0.1 日⁻¹ であるとき、この核種の物理学的半減期T_pはおよそ何日ですか？公式と計算のコツを教えてください。",
        initialPrompt: "壊変定数が0.1/日である核種の物理学的半減期を求める問題です。どの公式を使ってどう計算すればいいか、最初のステップを提示してください。"
    },
    q4: {
        title: "放射性医薬品の比放射能",
        text: "【国試類題：比放射能】\n「無担体の放射性核種の比放射能（Bq/g）は、半減期が短いほど（あるいは壊変定数が大きいほど）どうなりますか？」という問題です。比放射能の式を導出しながら考えたいです。",
        initialPrompt: "無担体放射性核種の比放射能と半減期の関係について学習したいです。比放射能（Bq/g）の定義から順を追ってヒントをください。"
    },
    q5: {
        title: "EC壊変と特性X線・オージェ電子",
        text: "【国試類題：EC壊変】\n軌道電子捕獲（EC）壊変の後に、特性X線やオージェ電子が放出されるメカニズムについて質問です。なぜこれらの放射線が出るのか、誘導質問をお願いします。",
        initialPrompt: "EC壊変の後に特性X線やオージェ電子が放出される理由と、国家試験で問われるポイントを整理したいです。質問を投げてください。"
    },
    q6: {
        title: "放射線測定器の選択と原理",
        text: "【国試類題：測定器の選択】\n3H（トリチウム）や14Cのような、最大エネルギーが極めて低いβ⁻線を効率よく測定できる装置は何ですか？また、なぜ他の測定器では測定が難しいのか、ヒントをもらいながら解きたいです。",
        initialPrompt: "エネルギーの低いβ線放出核種（3Hや14C）を測定するのに適した測定器とその原理について、順を追って質問してください。"
    },
    q7: {
        title: "分配比と溶媒抽出の計算",
        text: "【国試過去問（第76回午後2）：分配比】\n水相と有機相との分配比が50の放射性標識化合物があり、その放射性標識化合物を含む水溶液の放射能は100 MBqである。水相と等容積の有機相で溶媒抽出したときに水相に残る放射能［MBq］に最も近いのはどれか。\n選択肢： 1. 0.1  2. 0.2  3. 0.5  4. 1.0  5. 2.0",
        initialPrompt: "分配比が50の標識化合物を等容積の有機相で1回抽出したとき、水相に残る放射能を求める問題です。分配比の定義と立式のヒントをください。"
    },
    q8: {
        title: "有効半減期の計算公式",
        text: "【国試過去問（第78回午前12）：有効半減期】\n生物学的半減期をTb、物理学的半減期をTpとすると、有効半減期Teffを表す式はどれか。\n選択肢：\n１．Tb + Tp\n２．Tb - Tp\n３．1/Tb + 1/Tp\n４．(Tb + Tp)/2\n５．Tb * Tp / (Tb + Tp)",
        initialPrompt: "有効半減期Teffを、物理学的半減期Tpと生物学的半減期Tbから求める問題です。有効半減期の基本公式と、選択肢の形に変形するヒントを教えてください。"
    },
    q9: {
        title: "標識化合物の自己放射線分解と保存",
        text: "【国試過去問（第75回午前4 / 第78回午前11）：標識化合物の保存】\n標識化合物の自己放射線分解を防ぐための保存方法で正しいのはどれか。2つ選べ。\n選択肢：\n１．常温で保存する。\n２．窒素ガスなどの不活性ガスを充塡する。\n３．比放射能を高くする。\n４．放射能濃度を高くする。\n５．ラジカルスカベンジャを添加する。",
        initialPrompt: "標識化合物の分解を防ぐための保存法についての問題です。自己放射線分解を抑制するための基本的なアプローチについて、ヒントをお願いします。"
    },
    q10: {
        title: "放射性核種純度と検定方法",
        text: "【国試過去問（第76回午後4）：純度検定】\n標識化合物の放射性核種純度の検定に用いるのはどれか。\n選択肢：\n１．電気泳動法\n２．ホットアトム法\n３．同位体逆希釈分析法\n４．γ 線スペクトロメトリ\n５．高速液体クロマトグラフィ法",
        initialPrompt: "標識化合物の『放射性核種純度』の検定方法を答える問題です。『放射性核種純度』と『放射化学的純度』という言葉の違いについて、ヒントを交えて教えてください。"
    },
    q11: {
        title: "放射化学分離と担体の特徴",
        text: "【国試過去問（第78回午後11）：放射化学分離】\n放射化学分離で正しいのはどれか。\n選択肢：\n１．溶媒抽出法は溶解度積を利用した分離法である。\n２．担体は対象とする放射性核種の同位体に限られる。\n３．担体を加えてもラジオコロイドの生成は防げない。\n４．無担体の放射性核種の比放射能はその核種によって決まる。\n５．目的の放射性核種の沈殿を防ぐためにスカベンジャを加える。",
        initialPrompt: "放射化学分離と担体（キャリア）の性質に関する問題です。選択肢1〜5について、正しいものを見分けるヒントをください。"
    },
    q12: {
        title: "放射性核種の分離法の原理",
        text: "【国試過去問（第77回午前11）：分離法】\n放射性核種の分離法で正しいのはどれか。\n選択肢：\n１．共沈法は溶解度積の法則を利用する。\n２．電気泳動法はイオン化傾向の差を利用する。\n３．ラジオコロイド法はイオン交換樹脂によるろ過を利用する。\n４．電気化学的分離法はイオン交換体の分布係数の違いを利用する。\n５．Szilard-Chalmers〈ジラード・チャルマー〉法ではRf 値の違いを利用する。",
        initialPrompt: "放射性核種のさまざまな分離法の原理に関する知識問題です。選択肢1〜5について、正しい組み合わせや誤りを見分けるヒントをください。"
    },
    q13: {
        title: "99Mo-99mTcジェネレータの溶出液",
        text: "【国試過去問（第78回午後12）：溶出液】\n99Mo−99ｍTcジェネレータで99mTcを溶出するのに用いられるのはどれか。\n選択肢：\n１．蒸留水\n２．生理食塩水\n３． 5 ％ブドウ糖液\n４．10％アミノ酸液\n５．0.1 mol/L 塩酸水溶液",
        initialPrompt: "99Mo-99mTcジェネレータから99mTc（過テクネチウム酸）を溶離（ミルキング）するときに使用する溶出液に関する問題です。どの溶出液が適しているか、またなぜそれを使うのかヒントをください。"
    },
    q14: {
        title: "標識化合物の純度の定義と特徴",
        text: "【国試過去問：標識化合物の純度】\n標識化合物の純度で正しいのはどれか。\n選択肢：\n１．標識率は放射性核種純度と同義である。\n２．放射性核種純度検定に高速液体クロマトグラフィが用いられる。\n３．標識化合物を長時間保存した場合、放射化学的不純物が生成される。\n４．化学的純度は目的とする化学形で放射性核種がその物質の全放射能に占める割合をいう。\n５．放射化学的純度は化学形に関係なく着目する放射性核種の放射能がその物質の全放射能に占める割合をいう。",
        initialPrompt: "標識化合物の純度に関する問題です。放射性核種純度、放射化学的純度、化学的純度の定義の違いと、正解を見分けるヒントをください。"
    },
    q15: {
        title: "ホウ素中性子捕捉療法(BNCT)の核反応",
        text: "【国試過去問（第76回午前1）：BNCTの核反応】\nホウ素中性子捕捉療法〈BNCT〉での治療時に用いられる核反応はどれか。\n選択肢：\n１．（d，n）\n２．（n，α）\n３．（n，γ）\n４．（n，p）\n５．（p，d）",
        initialPrompt: "BNCT治療時の核反応を問う問題です。ホウ素-10が中性子を吸収して起こる反応式について、ヒントを提示します。"
    },
    q16: {
        title: "放射性核種の沈殿防止と保持担体",
        text: "【国試過去問（第76回午前2）：保持担体】\n目的とする放射性核種の沈殿を防ぐために加えるのはどれか。\n選択肢：\n１．還元剤\n２．共沈剤\n３．捕集剤\n４．保持担体\n５．スカベンジャ",
        initialPrompt: "目的とする超微量放射性核種が他の沈殿と混ざって落ちるのを防ぐための添加剤を問う問題です。保持担体や共沈剤、スカベンジャの定義について考えましょう。"
    },
    q17: {
        title: "カラムを必要としないクロマトグラフィ",
        text: "【国試過去問（第76回午前3）：TLC】\nクロマトグラフィでカラムを必要としないのはどれか。\n選択肢：\n１．ガスクロマトグラフィ\n２．吸着クロマトグラフィ\n３．薄層クロマトグラフィ\n４．高速液体クロマトグラフィ\n５．イオン交換クロマトグラフィ",
        initialPrompt: "カラム（筒状の容器）を使用しないクロマトグラフィの種類を答える問題です。各手法の展開形態やプレートを使用する特徴について考えましょう。"
    },
    q18: {
        title: "荷電粒子線を用いる元素分析(PIXE法)",
        text: "【国試過去問（第76回午前4）：PIXE法】\nサイクロトロンによる荷電粒子線を用いる分析法はどれか。\n選択肢：\n１．PIXE 法\n２．直接希釈法\n３．電気泳動法\n４．不足当量法\n５．アクチバブルトレーサ法",
        initialPrompt: "サイクロトロン加速粒子を照射して特性X線を分析する元素分析手法を問う問題です。非破壊分析としても有名なこの手法の名称についてヒントを出します。"
    },
    q19: {
        title: "ジェネレータの親核種と放射平衡",
        text: "【国試過去問（第76回午後1）：Ge-Gaジェネレータ】\nジェネレータの親核種に用いられているのはどれか。\n選択肢：\n１．64Cu\n２．68Ge\n３．111In\n４．131I\n５．201Tl",
        initialPrompt: "PET用の短寿命娘核種（68Ga）を得るための親核種を答える問題です。Ge-Gaジェネレータと、そこで成立する放射平衡の性質について考えましょう。"
    },
    q20: {
        title: "14Cおよび各種核種の標識合成法",
        text: "【国試過去問（第76回午後3）：標識合成】\n14C 標識化合物の合成方法で正しいのはどれか。2つ選べ。\n選択肢：\n１．生合成法は用いられない。\n２．Wilzbach 法で合成される。\n３．化学合成法では 14CO2 が出発物質として汎用される。\n４．有機化合物の構成炭素原子を 14C に置換して合成する。\n５．無機化合物の構成炭素原子を 14C に置換したものである。",
        initialPrompt: "14C標識化合物の化学合成・生合成の原理に関する問題です。14Cの特徴と、Wilzbach法など他の標識法との違いについて整理していきましょう。"
    }
};

// モック対話のデータ
const mockConversations = {
    q1: [
        {
            turn: 0,
            reply: `減衰の計算問題ですね！まずは公式を思い出してみましょう。
放射能が初期値の1/8（12.5%）になるということは、半減期（半分になる期間）が何回繰り返されたということでしょうか？`
        },
        {
            check: (text) => text.includes("3") || text.includes("３") || text.includes("三"),
            success: `その通り！半分（1/2）の3乗が1/8なので、半減期がちょうど3回分経過したことになります。
では、この核種の半減期は8日です。半減期3回分ということは、全部で何日後になるでしょうか？`,
            fail: `違います。半分になるのが1回で1/2、2回で1/4...と増えていきます。1/8になるには何回半分になればいいか、もう一度数えてみてください。`
        },
        {
            check: (text) => text.includes("24") || text.includes("２４"),
            success: `大正解です！ 8日 × 3回 ＝ 24日後になります。
この基本パターンは完璧ですね。国家試験でも非常によく出題されます。`,
            fail: `半減期は「8日」です。これが「3回」繰り返されるので、掛け算をしてみてください。何日になりますか？`
        }
    ],
    q2: [
        {
            turn: 0,
            reply: `核医学で最も重要な「⁹⁹Mo - ⁹⁹ᵐTc ジェネレータ」の放射平衡ですね！毎年必ず出題される超重要テーマです。
            
この現象を考える上で、親核種（⁹⁹Mo）と娘核種（⁹⁹ᵐTc）の物理学的半減期はそれぞれいくらでしょうか？
「核種」タブで⁹⁹Moと⁹⁹ᵐTcの半減期を調べて、**それぞれの半減期（時間または日）を教えてください。**`
        },
        {
            check: (text) => (text.includes("66") || text.includes("2.75")) && (text.includes("6") || text.includes("6.01")),
            success: `素晴らしい！よく調べられましたね。
親の⁹⁹Moが「約66時間」、娘の⁹⁹ᵐTcが「約6時間」です。
親の半減期が娘よりも「やや長い」ため、ここには**「過渡平衡」**という放射平衡が成り立ちます。

では次のステップです。ジェネレータ内の⁹⁹ᵐTcを食塩水で洗い流す操作（ミルキング）を行って⁹⁹ᵐTcをゼロにした後、娘核種の放射能は再び蓄積して極大値へと向かいます。
**この娘核種（⁹⁹ᵐTc）の放射能が「極大（最大）」になるのは、ミルキングからおよそ何時間後でしょうか？**`,
            fail: `惜しいですね！
- 親核種 ⁹⁹Mo の半減期は **66時間**
- 娘核種 ⁹⁹ᵐTc の半減期は **6時間**
です。これらを確認した上で、「親の半減期」と「娘の半減期」を答えてみてください。`
        },
        {
            check: (text) => text.includes("23") || text.includes("２３") || text.includes("22") || text.includes("24"),
            success: `その通り！お見事です。およそ **23時間後（または約1日後）** に極大値に達します。
国家試験では「極大に達する時間（約23時間）」そのものがズバリ問われることが多いので、この数値は暗記必須です。

ちなみに、極大に達したとき、**親核種（⁹⁹Mo）の放射能と娘核種（⁹⁹ᵐTc）の放射能の大きさには、どのような関係が成り立っているでしょうか？** 考えてみてください！`,
            fail: `ヒントです！
時間は**「約23時間後」**になります。この数字を覚えておいてくださいね！`
        },
        {
            check: (text) => text.includes("等しい") || text.includes("同じ") || text.includes("一致") || text.includes("交わる"),
            success: `素晴らしい洞察です！
娘核種が極大になる瞬間、**「娘核種の放射能 ＝ 親核種の放射能」**となります。
これ以降は、娘の放射能が親の放射能を少し上回った状態をキープしながら、親の半減期（66時間）に従って一緒に減衰していきます（過渡平衡の成立）。
完璧に頭に入れておきましょう！`,
            fail: `ヒントです。
グラフをイメージしてみましょう。娘の放射能がどんどん増えていき、ピーク（極大）に達した瞬間、親の放射能減少ラインと「交差」します。両者の放射能はどのようになりますか？`
        }
    ],
    q3: [
        {
            turn: 0,
            reply: `壊変定数と半減期の関係についての問題ですね。
壊変定数 $\lambda$ と物理学的半減期 $T_{1/2}$ には、公式としてどのような関係式がありますか？`
        },
        {
            check: (text) => text.includes("0.693") || text.includes("ln") || text.includes("log"),
            success: `その通り！ $T_{1/2} = \frac{\ln(2)}{\lambda} \approx \frac{0.693}{\lambda}$ です。
今回の壊変定数 $\lambda$ は 0.1 日⁻¹ です。
この公式に代入して計算すると、半減期 $T$ は何日になりますか？`,
            fail: `公式を思い出しましょう。半減期 $T$ と壊変定数 $\lambda$ の間には、 $T \approx \frac{0.693}{\lambda}$ という関係があります。この式を元に考えてみてください。`
        },
        {
            check: (text) => text.includes("6.9") || text.includes("7"),
            success: `正解です！ $\frac{0.693}{0.1} = 6.93 \approx 7$ 日 となります。
この変換計算も非常に基礎的ながら頻出なので、素早く立式できるようにしておきましょう！`,
            fail: `$\frac{0.693}{0.1}$ を計算してみてください。小数の位置がずれます。いくつになりますか？`
        }
    ],
    q7: [
        {
            turn: 0,
            reply: `溶媒抽出における「分配比」の計算問題ですね！国試でも頻出の基本計算です。
            
まず「分配比」の定義から整理しましょう。
分配比 $D$ は、次の式で定義されます：
$$D = \\frac{\\text{有機相中の物質の濃度}}{\\text{水相中の物質の濃度}}$$

この問題では、水相の容積と有機相の容積が「等容積（同じ体積）」となっています。
**容積が等しい場合、分配比 $D = 50$ ということは、(有機相に移行した放射能) は (水相に残った放射能) の何倍になるでしょうか？** 考えて答えてみてください！`
        },
        {
            check: (text) => text.includes("50") || text.includes("５０"),
            success: `大正解です！容積が等しいため、濃度の比がそのまま放射能（量）の比になります。
つまり、有機相に移行した放射能は、水相に残った放射能のちょうど **50倍** になります。

水相に残る放射能を $A_w$ (MBq) と置くと、有機相に移行した放射能は $50 A_w$ (MBq) と表せます。
抽出前の全体の放射能は 100 MBq でした。放射能の合計値は抽出の前後で保存されます。
したがって、次の方程式が成り立ちます：
$$A_w + 50 A_w = 100$$
（$51 A_w = 100$）

**この方程式を解いて、水相に残る放射能 $A_w$ を計算すると約いくつになりますか？** 選択肢（1〜5）の中から最も近いものを選んでみてください。`,
            fail: `もう一度定義を見てみましょう。分配比は 50 ですから、有機相の放射能は水相の放射能の何倍になりますか？ 数値で答えてみてください。`
        },
        {
            check: (text) => text.includes("2") || text.includes("２") || text.includes("2.0") || text.includes("5") || text.includes("５"),
            success: `完璧です！その通りです！
$51 A_w = 100$ より、
$$A_w = \\frac{100}{51} \\approx 1.96 \\text{ MBq}$$
となり、選択肢の中で最も近いのは **5番の 2.0 MBq** です。
お見事です！`,
            fail: `計算をもう一度見直してみましょう！
$51 A_w = 100$ ですから、
$$A_w = \\frac{100}{51}$$
これはほぼ 100/50 と等しいですね。計算結果はいくつになりますか？選択肢から最も近いものを選んで答えてみてください。`
        }
    ],
    q8: [
        {
            turn: 0,
            reply: `有効半減期の公式に関する問題ですね。これも絶対に落とせない国試の超重要公式です。

有効半減期を $T_{eff}$、物理学的半減期を $T_p$、生物学的半減期を $T_b$ とします。
まず面数を伴う逆数関係式から整理しましょう。
**分数（逆数）を使った基本公式はどのようになりますか？** （ヒント：『1 / Teff ＝ ...』の形です）`
        },
        {
            check: (text) => text.includes("1/") || text.includes("+") || text.includes("逆数"),
            success: `大正解です！
基本公式は次の通りです：
$$\\frac{1}{T_{eff}} = \\frac{1}{T_p} + \\frac{1}{T_b}$$

では、この右辺（$\\frac{1}{T_p} + \\frac{1}{T_b}$）を1つの分数にまとめてみましょう。
分母を共通にするために**通分すると、右辺の分子と分母はそれぞれどうなりますか？**`,
            fail: `ヒントです！
有効半減期は、物理学的半減期と生物学的半減期の逆数の和として表されます。
$$1 / Teff = 1 / Tp + 1 / Tb$$
という関係式を踏まえて、この右辺を通分するとどうなるか、考えてみてください！`
        },
        {
            check: (text) => (text.includes("p") && text.includes("b") && text.includes("+")) || text.includes("通分") || text.includes("/"),
            success: `素晴らしい！正解です。
右辺を通分してまとめると、次のようになります：
$$\\frac{1}{T_{eff}} = \\frac{T_b + T_p}{T_p \\cdot T_b}$$

今、求めたいのは $T_{eff}$ ですから、この式の両辺の逆数を取ります（分母と分子を入れ替えます）。
**逆数を取ると、 $T_{eff} = $ の後はどのような式になりますか？ 選択肢（1〜5）の中から選んでみてください！**`,
            fail: `通分のやり方をおさらいしましょう。
分母を $T_p \\cdot T_b$ に揃えます。
$$\\frac{1}{T_p} + \\frac{1}{T_b} = \\frac{T_b + T_p}{T_p \\cdot T_b}$$
にになります。この両辺をひっくり返して（逆数を取って）みてください。`
        },
        {
            check: (text) => text.includes("5") || text.includes("５") || text.includes("tb*tp") || text.includes("tp*tb") || text.includes("和分の積"),
            success: `完璧です！
逆数を取ると、
$$T_{eff} = \\frac{T_p \\cdot T_b}{T_p + T_b}$$
となり、正解は **5番** になります。
この公式は、受験生の間で**「和分の積（足した数ぶんの掛けた数）」**として広く暗記されています。
完璧に理解できましたね！お見事です。`,
            fail: `逆数を取るので、分数は $\\frac{T_p \\cdot T_b}{T_p + T_b}$ になります。
これは選択肢の何番に該当しますか？ もう一度選択肢を確認して答えてみてください！`
        }
    ],
    q9: [
        {
            turn: 0,
            reply: `標識化合物の自己放射線分解と保存方法に関する問題ですね！
            
標識化合物は、自身が放出する放射線によって自己分解を起こしてしまいます。
まず基礎知識の確認です。
**α線、β線、γ線のうち、飛程（進む距離）が極めて短く、その飛程内にエネルギーを集中的に与えるため、最も自己放射線分解を起こしやすい放射線はどれでしょうか？**`
        },
        {
            check: (text) => text.includes("アルファ") || text.includes("α") || text.includes("alpha"),
            success: `大正解です！
飛程が非常に短く、周囲の分子を激しく電離する**α線**が最も自己分解を起こしやすく、次いでβ線、γ線の順になります。

では、自己放射線分解を抑制するための具体的な保存方法についてです。
溶液中で放射線が周囲の他の標識化合物分子に衝突する確率を下げるためには、放射能濃度や比放射能をどうすればよいでしょうか？
**「高くする」と「低くする（希釈する）」のどちらが適切ですか？**`,
            fail: `放射線の「飛程（物質中を進む距離）」を思い出してみましょう。進む範囲内で強力にエネルギーを吸収される放射線（ヘリウムの原子核と同じもの）は何でしたか？`
        },
        {
            check: (text) => text.includes("低") || text.includes("ひくく") || text.includes("希釈") || text.includes("下げる"),
            success: `その通りです！
比放射能や放射能濃度は**「低くする（希釈する）」**のが正しい対策です。濃度が高いとそれだけ周囲の標識分子に放射線が当たりやすくなってしまいます。

さらに、酸素による酸化を防ぐため、容器内は不活性ガス（窒素など）で置換し、ラジカルによる間接作用を防ぐために「ラジカルスカベンジャ」を添加します。
**これらを正しく満たしている選択肢の組み合わせは、問題文の（1〜5）のうちどれになりますか？（2つ選んでください）**`,
            fail: `もし比放射能や濃度を「高く」してしまうと、狭い空間に非常に多くの放射線が飛び交うことになり、自己分解のペースが跳ね上がってしまいます。ですので、キャリアを加えて希釈し、比放射能を「低く」保ちます。`
        },
        {
            check: (text) => (text.includes("2") || text.includes("２")) && (text.includes("5") || text.includes("５")),
            success: `大正解です！ **2番（窒素ガスなどの不活性ガスを充塡する）** と **5番（ラジカルスカベンジャを添加する）** が正しい保存方法です。
自己分解を防ぐための理由と対策をセットで覚えておきましょう！素晴らしいです。`,
            fail: `選択肢をよく見直してみましょう！
正しい対策は：
- 酸素による酸化分解を防ぐため：**窒素ガスなどの不活性ガスを充填する（2番）**
- 活性なラジカルによる間接分解を防ぐため：**ラジカルスカベンジャを添加する（5番）**
この2つになります。答えてみてください。`
        }
    ]
};

// デフォルトのシステムプロンプト
const defaultSystemPrompt = `あなたは診療放射線技師国家試験対策の専門チューター「SocraticChem」です。
担当分野は「放射化学」です。
指導スタイルは「ソクラテス式問答」です。以下のルールを厳格に守って回答してください：
1. 学生に直接の「答え」や「式そのもの」を絶対にすぐに教えてはいけません。
2. 常に、1つの応答で提示するヒントは「1ステップ」または「1つの質問」にとどめてください。
3. 学生が誤った回答をした場合は、どこが間違っているかを考えさせる誘導の質問をしてください。
4. 正しい理解に達したときは、その内容をわかりやすく褒め、重要ポイントを簡潔にまとめて記憶に定着させてください。
5. 日本語で、親しみやすく、かつ熱意をもって指導してください。`;

// 状態管理
const state = {
    apiKey: "",
    model: "gemini-2.5-flash",
    personality: "socratic_standard",
    systemPrompt: defaultSystemPrompt,
    chatHistory: [],
    currentMockQuestionId: null,
    mockTurnIndex: 0,
    mockTimeoutId: null,
    activeAbortController: null
};

// UIの初期化
document.addEventListener("DOMContentLoaded", () => {
    loadSettings();
    initUI();
    renderTemplates();
    renderIsotopes();
});

// UIイベントのバインド
function initUI() {
    // タブ切り替え処理
    const tabButtons = document.querySelectorAll(".tab-btn");
    const tabContents = document.querySelectorAll(".tab-content");

    tabButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const targetId = btn.getAttribute("data-target");
            
            // ボタンのアクティブ化
            tabButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            // コンテンツのアクティブ化
            tabContents.forEach(c => c.classList.remove("active"));
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.add("active");
                
                // チャットタブが開かれたら最下部にスクロール
                if (targetId === "view-chat") {
                    const messagesContainer = document.getElementById("chat-messages");
                    if (messagesContainer) messagesContainer.scrollTop = messagesContainer.scrollHeight;
                }
            }
        });
    });

    // 各種DOM要素の取得
    const chatInput = document.getElementById("chat-input");
    const btnSend = document.getElementById("btn-send");
    const btnClearChat = document.getElementById("btn-clear-chat");
    const settingsForm = document.getElementById("settings-form");
    const btnSaveSettings = document.getElementById("btn-save-settings");
    const btnSettingsClearKey = document.getElementById("btn-settings-clear-key");
    const btnResetPrompt = document.getElementById("btn-reset-prompt");
    const isotopeSearch = document.getElementById("isotope-search");
    const decayFilter = document.getElementById("decay-filter");

    // チャット入力テキストエリアの自動伸縮
    chatInput.addEventListener("input", () => {
        chatInput.style.height = "auto";
        chatInput.style.height = (chatInput.scrollHeight - 4) + "px";
        btnSend.disabled = chatInput.value.trim() === "";
    });

    // メッセージ送信
    btnSend.addEventListener("click", handleSendMessage);
    
    // スマホのキーボード確定時の誤送信を防ぐため、Enterでの送信は無効化し、フォーカス時のスクロール処理を追加
    chatInput.addEventListener("focus", () => {
        setTimeout(() => {
            const container = document.getElementById("chat-messages");
            if (container) container.scrollTop = container.scrollHeight;
        }, 300); // キーボード表示時のビューポート収縮を待つ
    });

    // チャットクリア
    btnClearChat.addEventListener("click", () => {
        clearChat();
    });

    // 設定フォームへの値反映
    document.getElementById("settings-api-key").value = state.apiKey;
    document.getElementById("settings-model").value = state.model;
    document.getElementById("settings-personality").value = state.personality;
    document.getElementById("settings-system-prompt").value = state.systemPrompt;

    // 設定保存
    btnSaveSettings.addEventListener("click", () => {
        state.apiKey = document.getElementById("settings-api-key").value.trim();
        state.model = document.getElementById("settings-model").value;
        state.personality = document.getElementById("settings-personality").value;
        state.systemPrompt = document.getElementById("settings-system-prompt").value.trim();
        
        localStorage.setItem("socratic_api_key", state.apiKey);
        localStorage.setItem("socratic_model", state.model);
        localStorage.setItem("socratic_personality", state.personality);
        localStorage.setItem("socratic_system_prompt", state.systemPrompt);
        
        updateStatusIndicator();
        alert("設定を保存しました。");

        // ウェルカムメッセージ警告表示の更新
        const demoBanner = document.getElementById("demo-banner");
        if (state.apiKey) {
            if (demoBanner) demoBanner.style.display = "none";
            appendSystemMessage("⚙️ 設定が保存されました。Gemini API を使った個別対話が可能です！");
        } else {
            if (demoBanner) demoBanner.style.display = "block";
        }
    });

    // APIキーの削除
    btnSettingsClearKey.addEventListener("click", () => {
        document.getElementById("settings-api-key").value = "";
        state.apiKey = "";
        localStorage.removeItem("socratic_api_key");
        updateStatusIndicator();
    });

    // システムプロンプトのリセット
    btnResetPrompt.addEventListener("click", () => {
        document.getElementById("settings-system-prompt").value = defaultSystemPrompt;
    });

    // 検索・フィルタリング
    isotopeSearch.addEventListener("input", filterIsotopes);
    decayFilter.addEventListener("change", filterIsotopes);

    // 周期表詳細モーダルの閉じるボタン
    const isotopeModal = document.getElementById("isotope-modal");
    document.getElementById("btn-close-isotope-modal").addEventListener("click", () => {
        isotopeModal.classList.remove("active");
    });
    document.getElementById("btn-modal-close-footer").addEventListener("click", () => {
        isotopeModal.classList.remove("active");
    });
    
    // 核種データを質問に添える
    document.getElementById("btn-insert-isotope-info").addEventListener("click", () => {
        const symbol = document.getElementById("modal-isotope-title").innerText;
        const hl = document.getElementById("detail-half-life").innerText;
        const decay = document.getElementById("detail-decay-mode").innerText;
        
        chatInput.value = `【核種情報参照：${symbol} (半減期 ${hl}, 壊変モード ${decay})】\n` + chatInput.value;
        chatInput.style.height = "auto";
        chatInput.style.height = (chatInput.scrollHeight - 4) + "px";
        btnSend.disabled = false;
        isotopeModal.classList.remove("active");
        
        // チャットタブへ遷移
        switchToChatTab();
        chatInput.focus();
    });

    updateStatusIndicator();
}

// チャットタブへ強制的に遷移する処理
function switchToChatTab() {
    document.querySelectorAll(".tab-btn").forEach(btn => {
        if (btn.getAttribute("data-target") === "view-chat") {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });
    document.querySelectorAll(".tab-content").forEach(content => {
        if (content.id === "view-chat") {
            content.classList.add("active");
        } else {
            content.classList.remove("active");
        }
    });
    // スクロール
    const container = document.getElementById("chat-messages");
    if (container) container.scrollTop = container.scrollHeight;
}

// 過去問テンプレートの表示用
function renderTemplates() {
    const listContainer = document.getElementById("mobile-template-list");
    listContainer.innerHTML = "";

    Object.keys(questionTemplates).forEach(qid => {
        const template = questionTemplates[qid];
        const btn = document.createElement("button");
        btn.className = "template-btn";
        btn.setAttribute("data-qid", qid);
        
        // タグ判別
        const isCalc = qid === "q1" || qid === "q2" || qid === "q3" || qid === "q4" || qid === "q7" || qid === "q8";
        const tagText = isCalc ? "計算" : "知識";
        const tagClass = isCalc ? "tag-calc" : "tag-know";

        btn.innerHTML = `
            <span class="tag ${tagClass}">${tagText}</span>
            <span class="txt">${template.title}</span>
        `;

        btn.addEventListener("click", () => {
            loadQuestionTemplate(qid);
        });

        listContainer.appendChild(btn);
    });
}

// 設定の読み込み
function loadSettings() {
    state.apiKey = localStorage.getItem("socratic_api_key") || "";
    state.model = localStorage.getItem("socratic_model") || "gemini-2.5-flash";
    state.personality = localStorage.getItem("socratic_personality") || "socratic_standard";
    state.systemPrompt = localStorage.getItem("socratic_system_prompt") || defaultSystemPrompt;
}

// ステータス表示の更新
function updateStatusIndicator() {
    const indicator = document.getElementById("api-status");
    if (state.apiKey) {
        indicator.innerHTML = `
            <span class="status-dot active"></span>
            <span class="status-text">接続中</span>
        `;
    } else {
        indicator.innerHTML = `
            <span class="status-dot warning"></span>
            <span class="status-text">デモ</span>
        `;
    }
}

// 過去問テンプレートのロード
function loadQuestionTemplate(qid) {
    const template = questionTemplates[qid];
    if (!template) return;
    
    clearChat();
    
    // ユーザーの質問表示用
    appendMessage("user", template.text);
    
    // チャットビューへ切り替え
    switchToChatTab();

    // API動作かデモ動作かに応じて応答を呼び出す
    if (state.apiKey) {
        state.chatHistory.push({ role: "user", parts: [{ text: template.initialPrompt }] });
        fetchAIResponse();
    } else {
        // モックモード初期化
        state.currentMockQuestionId = qid;
        state.mockTurnIndex = 0;
        
        showTyping(true);
        state.mockTimeoutId = setTimeout(() => {
            showTyping(false);
            state.mockTimeoutId = null;
            const mockResp = mockConversations[qid] ? mockConversations[qid][0].reply : "デモ用のテキストがありません。";
            appendMessage("model", mockResp);
            state.chatHistory.push({ role: "user", parts: [{ text: template.initialPrompt }] });
            state.chatHistory.push({ role: "model", parts: [{ text: mockResp }] });
        }, 1000);
    }
}

// チャットをクリア
function clearChat() {
    const messagesContainer = document.getElementById("chat-messages");
    messagesContainer.innerHTML = "";
    state.chatHistory = [];
    state.currentMockQuestionId = null;
    state.mockTurnIndex = 0;
    
    if (state.mockTimeoutId) {
        clearTimeout(state.mockTimeoutId);
        state.mockTimeoutId = null;
    }
    if (state.activeAbortController && typeof AbortController !== 'undefined') {
        state.activeAbortController.abort();
        state.activeAbortController = null;
    }
    
    showTyping(false);
    
    const chatInput = document.getElementById("chat-input");
    if (chatInput) {
        chatInput.value = "";
        chatInput.style.height = "auto";
    }
    const btnSend = document.getElementById("btn-send");
    if (btnSend) {
        btnSend.disabled = true;
    }
    
    const welcome = document.createElement("div");
    welcome.className = "message system-msg";
    welcome.innerHTML = `
        <div class="msg-avatar">🎓</div>
        <div class="msg-content">
            <h3>新しい学習セッションを開始しました</h3>
            <p>「過去問」タブから問題テーマを選んで学習を開始してください。</p>
        </div>
    `;
    messagesContainer.appendChild(welcome);
}

// メッセージを画面に追加
function appendMessage(role, text) {
    const container = document.getElementById("chat-messages");
    const msgDiv = document.createElement("div");
    msgDiv.className = `message ${role === "user" ? "user-msg" : "ai-msg"}`;
    
    let formattedText = escapeHTML(text)
        .replace(/\n/g, "<br>")
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.*?)\*/g, "<em>$1</em>")
        .replace(/`(.*?)`/g, "<code>$1</code>");
        
    const avatar = role === "user" ? "👤" : "🎓";
    
    msgDiv.innerHTML = `
        <div class="msg-avatar">${avatar}</div>
        <div class="msg-content">${formattedText}</div>
    `;
    
    container.appendChild(msgDiv);
    container.scrollTop = container.scrollHeight;
}

// システムテキスト通知
function appendSystemMessage(text) {
    const container = document.getElementById("chat-messages");
    const msgDiv = document.createElement("div");
    msgDiv.className = "message system-msg";
    msgDiv.innerHTML = `
        <div class="msg-avatar">⚙️</div>
        <div class="msg-content" style="font-size: 0.75rem; color: var(--primary);">${escapeHTML(text)}</div>
    `;
    container.appendChild(msgDiv);
    container.scrollTop = container.scrollHeight;
}

// エスケープ処理
function escapeHTML(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// タイピングインジケータの制御
function showTyping(show) {
    const indicator = document.getElementById("typing-indicator");
    const container = document.getElementById("chat-messages");
    if (show) {
        container.appendChild(indicator);
        indicator.style.display = "flex";
        container.scrollTop = container.scrollHeight;
    } else {
        indicator.style.display = "none";
    }
}

// メッセージ送信時の処理
async function handleSendMessage() {
    const chatInput = document.getElementById("chat-input");
    const text = chatInput.value.trim();
    if (!text) return;

    chatInput.value = "";
    chatInput.style.height = "auto";
    document.getElementById("btn-send").disabled = true;

    appendMessage("user", text);

    if (state.apiKey) {
        state.chatHistory.push({ role: "user", parts: [{ text: text }] });
        await fetchAIResponse();
    } else {
        if (state.mockTimeoutId) {
            clearTimeout(state.mockTimeoutId);
        }
        showTyping(true);
        state.mockTimeoutId = setTimeout(() => {
            showTyping(false);
            state.mockTimeoutId = null;
            
            if (state.currentMockQuestionId && mockConversations[state.currentMockQuestionId]) {
                const script = mockConversations[state.currentMockQuestionId];
                state.mockTurnIndex++;
                
                const currentStep = script[state.mockTurnIndex];
                if (currentStep) {
                    if (currentStep.check(text)) {
                        appendMessage("model", currentStep.success);
                        state.chatHistory.push({ role: "user", parts: [{ text: text }] });
                        state.chatHistory.push({ role: "model", parts: [{ text: currentStep.success }] });
                    } else {
                        state.mockTurnIndex--;
                        appendMessage("model", currentStep.fail);
                        state.chatHistory.push({ role: "user", parts: [{ text: text }] });
                        state.chatHistory.push({ role: "model", parts: [{ text: currentStep.fail }] });
                    }
                } else {
                    const endMsg = "よく理解できましたね！この問題の演習は終了です。「過去問」タブから他のテーマを選択するか、APIキーを入力してフリートークをお試しください。";
                    appendMessage("model", endMsg);
                }
            } else {
                const fallback = "【デモモード】\n現在APIキーが設定されていないため、自由な質問へのAI応答ができません。\n\n「過去問」タブから問題を選んでいただくか、「設定」タブからGemini APIキーを入力いただくと、私と自由にチャット勉強が可能です！";
                appendMessage("model", fallback);
            }
        }, 1200);
    }
}

// Gemini API からの回答取得
async function fetchAIResponse() {
    showTyping(true);
    
    let signal = null;
    if (typeof AbortController !== 'undefined') {
        if (state.activeAbortController) {
            state.activeAbortController.abort();
        }
        state.activeAbortController = new AbortController();
        signal = state.activeAbortController.signal;
    }
    
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${state.model}:generateContent?key=${state.apiKey}`;
    
    let styleInstruction = "";
    if (state.personality === "socratic_strict") {
        styleInstruction = "\n【追加指示】学生に対するヒントはさらに最小限にし、教科書や元素表などを自分で調べるよう促してください。解法を一足飛びに教える式は書かないでください。";
    } else if (state.personality === "step_by_step") {
        styleInstruction = "\n【追加指示】学生が途中式や考え方を1行書くごとに、その行が数学的・化学的に合っているかを厳密に確認し、合っていれば次のステップの式を書くよう指示してください。";
    }
    
    const combinedSystemPrompt = state.systemPrompt + styleInstruction;

    const requestBody = {
        contents: state.chatHistory,
        systemInstruction: {
            parts: [{ text: combinedSystemPrompt }]
        },
        generationConfig: {
            temperature: 0.35,
            topP: 0.95,
            maxOutputTokens: 1024
        }
    };

    try {
        const fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
        };
        if (signal) {
            fetchOptions.signal = signal;
        }

        const response = await fetch(url, fetchOptions);

        if (!response.ok) {
            const errData = await response.json();
            throw new Error(errData.error?.message || "通信エラーが発生しました");
        }

        const data = await response.json();
        const aiReply = data.candidates?.[0]?.content?.parts?.[0]?.text;
        
        showTyping(false);
        state.activeAbortController = null;
        
        if (aiReply) {
            appendMessage("model", aiReply);
            state.chatHistory.push({ role: "model", parts: [{ text: aiReply }] });
        } else {
            throw new Error("AIからの応答が空でした。");
        }

    } catch (error) {
        if (error.name === "AbortError") {
            return;
        }
        showTyping(false);
        state.activeAbortController = null;
        console.error("Gemini API Error:", error);
        
        // エラー発生時は、同じ role (user) が連続してAPIエラー(400)になるのを防ぐため、直前に追加したuser発言を履歴から削除
        if (state.chatHistory.length > 0 && state.chatHistory[state.chatHistory.length - 1].role === "user") {
            state.chatHistory.pop();
        }
        
        appendSystemMessage(`❌ エラー: ${error.message}\nAPIキーと接続環境を確認してください。`);
    }
}

// 放射性核種データシートのレンダリング
function renderIsotopes() {
    const listContainer = document.getElementById("isotope-list");
    listContainer.innerHTML = "";

    radionuclides.forEach(nuclide => {
        const card = document.createElement("div");
        card.className = "isotope-card";
        card.setAttribute("data-id", nuclide.id);
        card.setAttribute("data-decay", nuclide.decayMode);

        const cleanDecayClass = nuclide.decayMode
            .replace("β-", "beta-")
            .replace("β+", "beta-plus");

        card.innerHTML = `
            <div class="iso-header">
                <span class="iso-symbol">${nuclide.symbol}</span>
                <span class="iso-type-badge type-${cleanDecayClass}">${nuclide.decayMode}</span>
            </div>
            <div class="iso-body">
                <span class="iso-half-life">${nuclide.halfLife}</span>
                <span class="iso-energy">${nuclide.radiation.split(",")[0]}</span>
            </div>
        `;

        card.addEventListener("click", () => showIsotopeDetails(nuclide));
        listContainer.appendChild(card);
    });
}

// 核種詳細モーダルの表示
function showIsotopeDetails(nuclide) {
    document.getElementById("modal-isotope-title").innerText = `${nuclide.symbol} (${nuclide.element})`;
    document.getElementById("detail-half-life").innerText = nuclide.halfLife;
    document.getElementById("detail-decay-mode").innerText = nuclide.decayMode;
    document.getElementById("detail-radiation").innerText = nuclide.radiation;
    document.getElementById("detail-production").innerText = nuclide.production;
    document.getElementById("detail-usage").innerText = nuclide.usage;
    document.getElementById("detail-exam-notes").innerHTML = nuclide.examNotes.replace(/\n/g, "<br>");

    document.getElementById("isotope-modal").classList.add("active");
}

// 放射性核種リストのフィルタリング
function filterIsotopes() {
    const searchVal = document.getElementById("isotope-search").value.toLowerCase().replace(/[^a-zA-Z0-9]/g, "");
    const decayVal = document.getElementById("decay-filter").value;
    const cards = document.querySelectorAll(".isotope-card");

    cards.forEach(card => {
        const id = card.getAttribute("data-id");
        const decay = card.getAttribute("data-decay");
        
        const nuclideData = radionuclides.find(n => n.id === id);
        const symbolClean = nuclideData.symbol.toLowerCase().replace(/[^a-zA-Z0-9]/g, "");
        const elemClean = nuclideData.element.toLowerCase();
        const searchClean = searchVal.replace(/[^a-zA-Z0-9]/g, "");

        const matchesSearch = symbolClean.includes(searchClean) || 
                              elemClean.includes(searchVal) || 
                              id.includes(searchVal);
                              
        const normalizedDecay = decay.replace("β-", "beta-").replace("β+", "beta+");
        const matchesDecay = decayVal === "all" || normalizedDecay === decayVal;

        if (matchesSearch && matchesDecay) {
            card.style.display = "flex";
        } else {
            card.style.display = "none";
        }
    });
}
