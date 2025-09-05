"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"

const QUESTIONS = [
  "仲間と一緒に楽しむとより楽しい",
  "音楽や映画を見る方が作るより楽しい",
  "休日は外に出ないと物足りない",
  "短時間で気軽にできる趣味が好みだ",
  "趣味に関しても計画を立てる方が好きだ",
  "イベントやオフ会などに積極的に参加したい",
  "新しい場所やイベントに行くとワクワクする",
  "貯金してから大きな趣味に投資する",
  "コツコツ継続するのが得意だ",
  "思い立ったらすぐ行動する方だ",
  "アイデアを形にするのに喜びを感じる",
  "お金を使って好きなものを楽しむことに満足する",
  "一人で趣味に没頭するのが好きだ",
  "カフェや自室など決まった場所で趣味を楽しむことが多い",
  "趣味の話を共有することでつながりを感じる",
  "他人に干渉されずに自由に楽しみたい",
  "欲しいと思ったらすぐ行動する",
  "気分次第で趣味がコロコロ変わる",
  "新しいことをすぐ試したい",
  "一つを極めたいタイプだ",
  "「最新の流行に触れること」が楽しみだ",
  "自分の趣味をあまり人に話さない",
  "自然やアウトドアに出かけるのが好き",
  "家でゆっくり過ごすのが一番落ち着く",
  "SNSで趣味に関する投稿を良くする",
  "趣味の時間は「自分だけの世界」でありたい",
  "作るより見たり聞いたりする方が性に合っている",
  "日記や和えなど、自分の表現を残すことが多い",
  "コレクションをするのが好きだ",
  "体験を積み重ねたい",
  "人を楽しませたい",
  "グループで遊ぶより一人遊びが得意だ",
  "ゼロから作り上げる作業が得意だ",
  "技術や科学に興味がある",
  "思いついたらすぐ行動する方だ",
  "じっくり計画して行動する方だ",
  "計画通りに物事が進むと満足する",
  "衝動的に「今やりたい！」と始めてしまう",
  "「旅行に行こう」と急に誘われてもワクワクする",
  "体を動かすより静かに過ごすのが好きだ",
]

const MAPPING: Record<number, [string, string]> = {
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

const SCALE: Record<string, number> = { "1": 2, "2": 1, "3": 0, "4": -1, "5": -2 }

const TYPES: Record<string, { label: string; hobbies: string[]; advice: string }> = {
  Adventurer: {
    label: "冒険家タイプ",
    hobbies: ["登山", "キャンプ", "サーフィン", "ロードバイク"],
    advice: "新しい挑戦がエネルギー源。仲間と計画して遠出してみよう！",
  },
  Creator: {
    label: "創作者タイプ",
    hobbies: ["イラスト", "DTM", "執筆", "動画編集"],
    advice: "作品を公開する場所を持つとモチベーションが続きます。小さな発表を習慣に。",
  },
  Harmonizer: {
    label: "調和者タイプ",
    hobbies: ["料理", "園芸", "カフェ巡り", "手芸"],
    advice: "人と分かち合える形にすると喜びが増します。教室や交換会がおすすめ。",
  },
  Researcher: {
    label: "研究者タイプ",
    hobbies: ["読書", "プログラミング", "語学学習", "ボードゲーム"],
    advice: "小さな目標を作って、達成を積み重ねよう。ノートに進捗を残すと続く。",
  },
  Entertainer: {
    label: "ムードメーカータイプ",
    hobbies: ["ダンス", "カラオケ", "イベント企画", "スポーツ観戦"],
    advice: "人を巻き込むことであなたの魅力が発揮されます。主催もチャレンジしてみて。",
  },
  Artist: {
    label: "アーティストタイプ",
    hobbies: ["写真", "演劇", "絵画", "書道"],
    advice: "直感を尊重して表現を続けよう。展示や撮影会で刺激を得ると良い。",
  },
  Healer: {
    label: "癒し手タイプ",
    hobbies: ["散歩", "ヨガ", "釣り", "温泉巡り"],
    advice: "自然や癒しの習慣をルーティンにすると心身の回復が早まります。",
  },
  Challenger: {
    label: "チャレンジャータイプ",
    hobbies: ["eスポーツ", "カードゲーム", "短距離ラン", "クイズ"],
    advice: "勝負を楽しむ一方で、仲間とのリラックスタイムも作ると長続きします。",
  },
  Crafter: {
    label: "クラフタータイプ",
    hobbies: ["プラモデル", "DIY", "陶芸", "レザークラフト"],
    advice: "完成品を記録してSNSで共有すると達成感とつながりが増します。",
  },
  Collector: {
    label: "コレクタータイプ",
    hobbies: ["切手集め", "フィギュア収集", "御朱印集め"],
    advice: "コレクションの背景や由来を調べると楽しみが深まります。",
  },
}

const AVATAR_OPTIONS = [
  "😊",
  "😎",
  "🤔",
  "😄",
  "🥰",
  "🤗",
  "😇",
  "🙂",
  "😋",
  "🤓",
  "🎨",
  "🎵",
  "🎮",
  "📚",
  "🏃",
  "🧘",
  "🌟",
  "🔥",
  "💡",
  "🚀",
  "🐱",
  "🐶",
  "🦊",
  "🐼",
  "🦄",
  "🌸",
  "🌺",
  "🍀",
  "⭐",
  "🌙",
]

const SAMPLE_POSTS = [
  {
    id: 1,
    content: "今日は新しい趣味を始めました！写真撮影にチャレンジ 📸",
    timestamp: "2時間前",
    likes: 12,
    retweets: 3,
    replies: 5,
  },
  {
    id: 2,
    content: "週末のキャンプ、最高でした！自然の中で過ごす時間は本当に癒されます 🏕️",
    timestamp: "1日前",
    likes: 28,
    retweets: 8,
    replies: 12,
  },
  {
    id: 3,
    content: "趣味診断の結果、創作者タイプでした。確かにものづくりが好きです ✨",
    timestamp: "3日前",
    likes: 15,
    retweets: 2,
    replies: 7,
  },
]

const HeartIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    />
  </svg>
)

const RetweetIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
    />
  </svg>
)

const ReplyIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
  </svg>
)

const CameraIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
    />
  </svg>
)

function loadProfile() {
  try {
    const raw = localStorage.getItem("v0_profile")
    return raw
      ? JSON.parse(raw)
      : {
          name: "あなた",
          type: null,
          bio: "",
          avatar: "😊",
          avatarSize: "medium",
          imageScale: 100,
          coverPhoto: "",
          followers: 42,
          following: 128,
          posts: 156,
        }
  } catch (e) {
    return {
      name: "あなた",
      type: null,
      bio: "",
      avatar: "😊",
      avatarSize: "medium",
      imageScale: 100,
      coverPhoto: "",
      followers: 42,
      following: 128,
      posts: 156,
    }
  }
}

function saveProfile(profile: any) {
  localStorage.setItem("v0_profile", JSON.stringify(profile))
}

function renderAvatar(avatarData: string, size: string, scale = 100) {
  const sizeClass = getAvatarSizeClass(size)
  if (avatarData?.startsWith("data:")) {
    return (
      <img
        src={avatarData || "/placeholder.svg"}
        alt="Avatar"
        className="w-full h-full object-cover"
        style={{ transform: `scale(${scale / 100})`, transformOrigin: "center" }}
      />
    )
  } else {
    return avatarData || "😊"
  }
}

function getAvatarSizeClass(size: string) {
  switch (size) {
    case "small":
      return "h-8 w-8 text-sm"
    case "medium":
      return "h-10 w-10 text-lg"
    case "large":
      return "h-12 w-12 text-xl"
    default:
      return "h-10 w-10 text-lg"
  }
}

export default function ProfilePage() {
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [profile, setProfile] = useState(loadProfile())
  const [isEditing, setIsEditing] = useState(false)
  const [editProfile, setEditProfile] = useState(profile)
  const [currentView, setCurrentView] = useState<"posts" | "test" | "media" | "likes">("posts")

  useEffect(() => {
    saveProfile(profile)
  }, [profile])

  const handleAnswer = (idx: number, val: string) => {
    setAnswers((p) => ({ ...p, [idx]: val }))
  }

  const calculate = () => {
    const s: Record<string, number> = {
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

    Object.entries(answers).forEach(([k, v]) => {
      const i = Number.parseInt(k)
      const val = SCALE[v]
      const [a, b] = MAPPING[i]
      if (val > 0) s[a] += val
      if (val < 0) s[b] += -val
    })

    let chosen = "Researcher"
    if (s.outdoor > s.indoor && s.active > s.creative && s.social > s.solo) chosen = "Adventurer"
    else if (s.indoor > s.outdoor && s.creative > s.active && s.solo > s.social) chosen = "Creator"
    else if (s.collector > s.experiencer) chosen = "Collector"
    else if (s.experiencer > s.collector) chosen = "Researcher"
    else if (s.healing > s.practical) chosen = "Healer"
    else if (s.practical > s.healing) chosen = "Crafter"
    else if (s.long > s.short) chosen = "Researcher"
    else if (s.short > s.long) chosen = "Challenger"
    else if (s.social > s.solo) chosen = "Entertainer"
    else if (s.solo > s.social) chosen = "Researcher"

    setProfile((p) => {
      const next = { ...p, type: chosen }
      saveProfile(next)
      return next
    })
    setCurrentView("posts")
  }

  const handleCoverPhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setEditProfile((p) => ({ ...p, coverPhoto: result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setEditProfile((p) => ({ ...p, avatar: result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const saveProfileChanges = () => {
    setProfile(editProfile)
    setIsEditing(false)
  }

  return (
    <div className="mx-auto max-w-2xl bg-white min-h-screen">
      <div className="relative">
        {/* Cover Photo */}
        <div
          className="h-48 bg-gradient-to-r from-blue-400 to-purple-500 relative overflow-hidden"
          style={{
            backgroundImage: profile.coverPhoto ? `url(${profile.coverPhoto})` : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {isEditing && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <label className="cursor-pointer bg-black/70 text-white px-4 py-2 rounded-full flex items-center gap-2">
                <CameraIcon />
                カバー写真を変更
                <input type="file" accept="image/*" onChange={handleCoverPhotoUpload} className="hidden" />
              </label>
            </div>
          )}
        </div>

        {/* Profile Picture */}
        <div className="absolute -bottom-16 left-4">
          <div className="relative">
            <Avatar className="w-32 h-32 border-4 border-white bg-white">
              <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center text-4xl font-semibold overflow-hidden rounded-full">
                {renderAvatar(profile.avatar, "large", profile.imageScale)}
              </div>
            </Avatar>
            {isEditing && (
              <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                <CameraIcon className="text-white w-6 h-6" />
              </div>
            )}
          </div>
        </div>

        {/* Edit Profile Button */}
        <div className="absolute top-4 right-4">
          <Button
            variant={isEditing ? "default" : "outline"}
            onClick={() => setIsEditing(!isEditing)}
            className="bg-white/90 backdrop-blur-sm"
          >
            {isEditing ? "保存" : "プロフィールを編集"}
          </Button>
        </div>
      </div>

      <div className="pt-20 px-4 pb-4">
        <div className="mb-4">
          <h1 className="text-2xl font-bold">{profile.name}</h1>
          <p className="text-gray-500">@{profile.name.toLowerCase().replace(/\s+/g, "")}</p>
        </div>

        {profile.bio && <p className="mb-4 text-gray-800">{profile.bio}</p>}

        {profile.type && (
          <div className="mb-4">
            <Badge className="mb-2">{TYPES[profile.type].label}</Badge>
            <div className="flex flex-wrap gap-1 mb-2">
              {TYPES[profile.type].hobbies.map((hobby, idx) => (
                <Badge key={idx} variant="outline" className="text-xs">
                  {hobby}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-6 mb-4 text-sm">
          <div>
            <span className="font-bold">{profile.following}</span>
            <span className="text-gray-500 ml-1">フォロー中</span>
          </div>
          <div>
            <span className="font-bold">{profile.followers}</span>
            <span className="text-gray-500 ml-1">フォロワー</span>
          </div>
          <div>
            <span className="font-bold">{profile.posts}</span>
            <span className="text-gray-500 ml-1">投稿</span>
          </div>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <div className="flex">
          {[
            { key: "posts", label: "投稿" },
            { key: "test", label: "趣味診断" },
            { key: "media", label: "メディア" },
            { key: "likes", label: "いいね" },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setCurrentView(key as any)}
              className={`flex-1 py-4 text-center font-medium transition-colors relative ${
                currentView === key ? "text-blue-500" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {label}
              {currentView === key && <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500 rounded-full" />}
            </button>
          ))}
        </div>
      </div>


export default function HobbyTest() {
  const [answers, setAnswers] = useState<{ [key: number]: number }>({})

  const handleAnswer = (index: number, value: number) => {
    setAnswers((prev) => ({ ...prev, [index]: value }))
  }

  const calculate = () => {
    console.log("診断結果", answers)
  }

  return (
    <div className="p-4">
      <Card>
        <CardContent className="p-4">
          <h2 className="font-semibold mb-2">趣味診断テスト（全40問）</h2>
          <p className="text-xs text-muted-foreground mb-3">
            5段階で答えてください（賛成 → 反対）
          </p>

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

          <div className="flex justify-center mt-4">
            <Button
              onClick={calculate}
              disabled={Object.keys(answers).length < QUESTIONS.length}
            >
              診断結果を見る
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


        {currentView === "media" && (
          <div className="p-4 text-center text-gray-500">
            <p>メディアはまだありません</p>
          </div>
        )}

        {currentView === "likes" && (
          <div className="p-4 text-center text-gray-500">
            <p>いいねした投稿はまだありません</p>
          </div>
        )}
      </div>

      {isEditing && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">プロフィール編集</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">アイコン</label>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">サイズ</label>
                    <div className="flex gap-2">
                      {[
                        { value: "small", label: "小" },
                        { value: "medium", label: "中" },
                        { value: "large", label: "大" },
                      ].map(({ value, label }) => (
                        <Button
                          key={value}
                          variant={editProfile.avatarSize === value ? "default" : "outline"}
                          size="sm"
                          onClick={() => setEditProfile((p) => ({ ...p, avatarSize: value }))}
                        >
                          {label}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">ファイルから選択</label>
                    <Input type="file" accept="image/*" onChange={handleFileUpload} className="text-sm" />
                  </div>
                  {editProfile.avatar?.startsWith("data:") && (
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">
                        画像の拡大・縮小: {editProfile.imageScale}%
                      </label>
                      <input
                        type="range"
                        min="50"
                        max="200"
                        value={editProfile.imageScale}
                        onChange={(e) => setEditProfile((p) => ({ ...p, imageScale: Number(e.target.value) }))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                  )}
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">絵文字から選択</label>
                    <div className="grid grid-cols-10 gap-2 p-3 border rounded-lg max-h-24 overflow-y-auto">
                      {AVATAR_OPTIONS.map((emoji) => (
                        <button
                          key={emoji}
                          onClick={() => setEditProfile((p) => ({ ...p, avatar: emoji }))}
                          className={`w-8 h-8 text-lg hover:bg-gray-100 rounded transition-colors ${
                            editProfile.avatar === emoji ? "bg-blue-100 ring-2 ring-blue-500" : ""
                          }`}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">名前</label>
                <Input
                  value={editProfile.name}
                  onChange={(e) => setEditProfile((p) => ({ ...p, name: e.target.value }))}
                  placeholder="あなたの名前"
                />
              </div>
              <div>
                <label className="text-sm font-medium">自己紹介</label>
                <Textarea
                  value={editProfile.bio}
                  onChange={(e) => setEditProfile((p) => ({ ...p, bio: e.target.value }))}
                  placeholder="趣味や興味について書いてみましょう"
                  rows={3}
                />
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <Button onClick={saveProfileChanges} className="flex-1">
                保存
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsEditing(false)
                  setEditProfile(profile)
                }}
                className="flex-1"
              >
                キャンセル
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
