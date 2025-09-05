"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export default function HobbyTest() {
  const questions = [
    "人と一緒に楽しむ方がワクワクする",
    "体を動かすのが好き",
    "新しい刺激や冒険に心惹かれる",
    "短時間で気軽にできるのがいい",
    "完成品や結果が残ると嬉しい",
    "誰かと共有・発表したい",
    "自然や外の環境に関わりたい",
    "ワクワクする体験を求める",
    "コツコツ継続するのが得意",
    "直感で動くのが好き",
    "知識を集めることが好き",
    "体験を通して学ぶのが好き",
    "大人数より少人数の方が楽しい",
    "自分の世界に没頭するのが好き",
    "人から注目されたい",
    "裏方で支えるのが好き",
    "創作するのが楽しい",
    "実用的なことが好き",
    "新しいことをすぐ試したい",
    "一つを極めたい",
    "競争するのが好き",
    "マイペースに楽しみたい",
    "自然の中でリフレッシュしたい",
    "室内で落ち着きたい",
    "チームで何かを作りたい",
    "個人で成果を出したい",
    "体力を使うことが楽しい",
    "頭脳戦が楽しい",
    "コレクションするのが好き",
    "体験を積み重ねたい",
    "人を楽しませたい",
    "静かに過ごしたい",
    "デザインや美術に惹かれる",
    "技術や科学に惹かれる",
    "思いついたらすぐ行動",
    "じっくり計画して行動",
    "達成感を重視する",
    "癒しや心地よさを重視する",
    "外で活動するのが好き",
    "家で活動するのが好き",
  ]

  const mapping: Record<number, [string, string]> = {
    1: ["social", "solo"],
    2: ["active", "creative"],
    3: ["outdoor", "indoor"],
    4: ["short", "long"],
    5: ["practical", "healing"],
    6: ["social", "solo"],
    7: ["outdoor", "indoor"],
    8: ["active", "healing"],
    9: ["long", "short"],
    10: ["active", "creative"],
    11: ["collector", "experiencer"],
    12: ["experiencer", "collector"],
    13: ["solo", "social"],
    14: ["indoor", "outdoor"],
    15: ["social", "solo"],
    16: ["solo", "social"],
    17: ["creative", "practical"],
    18: ["practical", "creative"],
    19: ["active", "long"],
    20: ["long", "short"],
    21: ["active", "creative"],
    22: ["solo", "social"],
    23: ["outdoor", "indoor"],
    24: ["indoor", "outdoor"],
    25: ["social", "solo"],
    26: ["solo", "social"],
    27: ["active", "creative"],
    28: ["creative", "active"],
    29: ["collector", "experiencer"],
    30: ["experiencer", "collector"],
    31: ["social", "solo"],
    32: ["solo", "social"],
    33: ["creative", "practical"],
    34: ["practical", "creative"],
    35: ["active", "long"],
    36: ["long", "short"],
    37: ["practical", "healing"],
    38: ["healing", "practical"],
    39: ["outdoor", "indoor"],
    40: ["indoor", "outdoor"],
  }

  const scale: Record<string, number> = {
    "1": 2,
    "2": 1,
    "3": 0,
    "4": -1,
    "5": -2,
  }

  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [result, setResult] = useState<{ type: string; hobbies: string[]; advice: string } | null>(null)

  const handleChange = (qIndex: number, value: string) => {
    setAnswers({ ...answers, [qIndex]: value })
  }

  const calculateResult = () => {
    const scores: Record<string, number> = {
      indoor: 0,
      outdoor: 0,
      active: 0,
      creative: 0,
      solo: 0,
      social: 0,
      short: 0,
      long: 0,
      practical: 0,
      healing: 0,
      collector: 0,
      experiencer: 0,
    }

    Object.entries(answers).forEach(([q, v]) => {
      const qIndex = Number.parseInt(q)
      const val = scale[v]
      const [axisA, axisB] = mapping[qIndex]

      if (val > 0) scores[axisA] += val
      if (val < 0) scores[axisB] += -val
    })

    // 10タイプに分類
    let type = "Explorer"
    if (scores.indoor > scores.outdoor && scores.creative > scores.active && scores.solo > scores.social) {
      type = "Creator"
    } else if (scores.outdoor > scores.indoor && scores.active > scores.creative && scores.social > scores.solo) {
      type = "Adventurer"
    } else if (scores.collector > scores.experiencer) {
      type = "Collector"
    } else if (scores.experiencer > scores.collector) {
      type = "Experiencer"
    } else if (scores.healing > scores.practical) {
      type = "Healer"
    } else if (scores.practical > scores.healing) {
      type = "Builder"
    } else if (scores.long > scores.short) {
      type = "Deep Diver"
    } else if (scores.short > scores.long) {
      type = "Sampler"
    } else if (scores.social > scores.solo) {
      type = "Entertainer"
    } else if (scores.solo > scores.social) {
      type = "Thinker"
    }

    const hobbyMap: Record<string, { hobbies: string[]; advice: string }> = {
      Creator: {
        hobbies: ["小説執筆", "イラスト制作", "音楽作曲", "プラモデル"],
        advice: "自分の世界を形にすると満足感が高まります。成果をSNSで共有するのも◎",
      },
      Adventurer: {
        hobbies: ["キャンプ", "サーフィン", "登山", "旅行"],
        advice: "仲間と一緒に体験を楽しむとさらに充実します。新しい場所に挑戦を！",
      },
      Collector: {
        hobbies: ["切手収集", "フィギュア集め", "古本収集", "観葉植物育成"],
        advice: "コレクションの魅力を語れる仲間を見つけると楽しみが広がります。",
      },
      Experiencer: {
        hobbies: ["料理", "映画鑑賞", "ワークショップ参加", "街歩き"],
        advice: "体験を記録に残すと振り返りが楽しくなります。ブログや写真がおすすめ。",
      },
      Healer: {
        hobbies: ["ヨガ", "瞑想", "ハーブティー作り", "アロマクラフト"],
        advice: "癒しの時間を習慣化すると、日常のストレスが和らぎます。",
      },
      Builder: {
        hobbies: ["DIY", "ガーデニング", "料理", "電子工作"],
        advice: "形に残る趣味は達成感につながります。作ったものを使ってさらに楽しみましょう。",
      },
      "Deep Diver": {
        hobbies: ["将棋", "研究", "楽器演奏", "プログラミング"],
        advice: "じっくり時間をかけることで高いスキルが身につきます。習慣化が成功のカギ。",
      },
      Sampler: {
        hobbies: ["ボードゲーム", "カラオケ", "スポーツ観戦", "お試しワークショップ"],
        advice: "いろいろ試して気に入ったものを深めると、自分の本命が見つかります。",
      },
      Entertainer: {
        hobbies: ["ダンス", "演劇", "配信活動", "イベント企画"],
        advice: "人を楽しませることで自分も満たされます。仲間を巻き込むとさらに楽しい！",
      },
      Thinker: {
        hobbies: ["読書", "哲学カフェ", "日記", "パズル"],
        advice: "一人の時間を大切にすることで心が落ち着きます。時々シェアすると新発見も。",
      },
    }

    setResult({ type, ...hobbyMap[type] })
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">趣味診断テスト</h1>
      <div className="space-y-4">
        {questions.map((q, i) => (
          <Card key={i} className="p-4">
            <CardContent>
              <p className="mb-2">{`Q${i + 1}. ${q}`}</p>
        <div className="flex items-center justify-between px-2">
          <span className="text-xs text-gray-500">反対</span>
          <Slider
            min={1}
            max={5}
            step={1}
            value={[Number(answers[i + 1]) || 3]}
            onValueChange={(val) => handleChange(i + 1, String(val[0]))}
            className="w-3/4"
          />
          <span className="text-xs text-gray-500">賛成</span>
        </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Button onClick={calculateResult}>診断する</Button>

      {result && (
        <Card className="p-4 mt-6">
          <CardContent>
            <h2 className="text-xl font-bold mb-2">診断結果</h2>
            <p className="mb-2">あなたのタイプ: {result.type}</p>
            <h3 className="font-semibold">おすすめの趣味</h3>
            {result.hobbies.map((hobby, idx) => (
              <p key={idx}>- {hobby}</p>
            ))}
            <h3 className="font-semibold mt-4">アドバイス</h3>
            <p>{result.advice}</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
