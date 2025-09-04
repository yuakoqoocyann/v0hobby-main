"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"

/**
 * V0用：診断（40問×5択）＋シンプルなX風掲示板（ローカル保存）
 * - 診断結果は localStorage に保存（profile.type）
 * - 掲示板は localStorage に保存。投稿はユーザーの診断タイプでタグ付け
 * - タイプごとのタイムライン表示が可能
 * - そのままV0に貼って動かせる単一ファイルコンポーネント
 */

const QUESTIONS = [
  "人と一緒に楽しむ方がワクワクする",
  "体を動かすことが好き",
  "新しい刺激や冒険に心惹かれる",
  "短時間で気軽にできる趣味が好みだ",
  "完成品や結果が残ると嬉しい",
  "誰かに作品や結果を見せたい",
  "自然や屋外で過ごすのが好きだ",
  "ワクワクする体験を求める",
  "コツコツ継続するのが得意だ",
  "思い立ったらすぐ行動する方だ",
  "知識を集めるのが好きだ",
  "体験を通して学ぶのが好きだ",
  "少人数でじっくりが好きだ",
  "自分の世界に没頭するのが好きだ",
  "人から注目されたい方だ",
  "裏方で支えるのが得意だ",
  "創作することが楽しい",
  "実用的なことが好きだ",
  "新しいことをすぐ試したい",
  "一つを極めたいタイプだ",
  "勝負や競争が燃えるタイプだ",
  "マイペースに楽しみたい",
  "自然の中でリフレッシュしたい",
  "室内で集中する方が落ち着く",
  "チームで何かを作るのが好きだ",
  "個人で成果を出す方が好きだ",
  "体力を使うことが楽しい",
  "頭脳戦や思考するのが楽しい",
  "コレクションをするのが好きだ",
  "体験を積み重ねたい",
  "人を楽しませたい",
  "静かに過ごす時間が好きだ",
  "デザインや美術に惹かれる",
  "技術や科学に興味がある",
  "思いついたらすぐ行動する方だ",
  "じっくり計画して行動する方だ",
  "達成感を重視する",
  "癒しや心地よさを重視する",
  "外で活動するのが好きだ",
  "家で活動するのが好きだ",
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

const SCALE: Record<string, number> = {
  "1": 2,
  "2": 1,
  "3": 0,
  "4": -1,
  "5": -2,
}

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

function loadPosts() {
  try {
    const raw = localStorage.getItem("v0_posts")
    return raw ? JSON.parse(raw) : []
  } catch (e) {
    return []
  }
}

function savePosts(posts: any[]) {
  localStorage.setItem("v0_posts", JSON.stringify(posts))
}

function loadProfile() {
  try {
    const raw = localStorage.getItem("v0_profile")
    return raw
      ? JSON.parse(raw)
      : { name: "あなた", type: null, bio: "", avatar: "😊", avatarSize: "medium", imageScale: 100 }
  } catch (e) {
    return { name: "あなた", type: null, bio: "", avatar: "😊", avatarSize: "medium", imageScale: 100 }
  }
}

function saveProfile(profile: any) {
  localStorage.setItem("v0_profile", JSON.stringify(profile))
}

export default function HobbyTestV0() {
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [profile, setProfile] = useState<{
    name: string
    type: string | null
    bio: string
    avatar: string
    avatarSize: string
    imageScale: number
  }>({
    ...loadProfile(),
    avatarSize: loadProfile().avatarSize || "medium",
    imageScale: loadProfile().imageScale || 100,
  })
  const [posts, setPosts] = useState<any[]>(loadPosts())
  const [tab, setTab] = useState<"feed" | "global">("feed")
  const [newPost, setNewPost] = useState("")
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [editProfile, setEditProfile] = useState(profile)
  const [currentView, setCurrentView] = useState<"timeline" | "questions">("timeline")

  useEffect(() => {
    savePosts(posts)
  }, [posts])

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
    setIsEditingProfile(false)
  }

  const postNow = () => {
    if (!newPost.trim() || !profile.type) return
    const item = {
      id: Date.now().toString(),
      author: profile.name || "あなた",
      content: newPost.trim(),
      typeTag: profile.type,
      createdAt: new Date().toISOString(),
      avatar: profile.avatar,
      avatarSize: profile.avatarSize,
      imageScale: profile.imageScale,
    }
    setPosts((p) => [item, ...p])
    setNewPost("")
  }

  const feedPosts = posts.filter((p) => (tab === "feed" ? p.typeTag === profile.type : true))

  const getAvatarSizeClass = (size: string) => {
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

  const renderAvatar = (avatarData: string, size: string, scale = 100) => {
    const sizeClass = getAvatarSizeClass(size)

    if (avatarData?.startsWith("data:")) {
      return (
        <img
          src={avatarData || "/placeholder.svg"}
          alt="Avatar"
          className="w-full h-full object-cover"
          style={{
            transform: `scale(${scale / 100})`,
            transformOrigin: "center",
          }}
        />
      )
    } else {
      return avatarData || "😊"
    }
  }

  return (
    <div className="mx-auto max-w-4xl p-6 space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">趣味診断＆趣味タイムライン</h1>
          <p className="text-sm text-muted-foreground">
            40問に答えてタイプ登録 → タイプ別タイムラインで趣味友を見つけよう
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Avatar className="cursor-pointer" onClick={() => setIsEditingProfile(true)}>
            <div
              className={`bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center font-semibold overflow-hidden ${getAvatarSizeClass(profile.avatarSize)}`}
            >
              {renderAvatar(profile.avatar, profile.avatarSize, profile.imageScale)}
            </div>
          </Avatar>
          <div className="text-right cursor-pointer" onClick={() => setIsEditingProfile(true)}>
            <div className="text-sm font-medium">{profile.name}</div>
            <div className="text-xs text-muted-foreground">{profile.type ? TYPES[profile.type].label : "未診断"}</div>
            {profile.bio && <div className="text-xs text-muted-foreground max-w-32 truncate">{profile.bio}</div>}
          </div>
        </div>
      </header>

      <div className="flex gap-2 border-b">
        <Button
          variant={currentView === "timeline" ? "default" : "ghost"}
          onClick={() => setCurrentView("timeline")}
          className="rounded-b-none"
        >
          タイムライン
        </Button>
        <Button
          variant={currentView === "questions" ? "default" : "ghost"}
          onClick={() => setCurrentView("questions")}
          className="rounded-b-none"
        >
          診断テスト
        </Button>
      </div>

      {isEditingProfile && (
        <Card className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
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
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>50%</span>
                        <span>200%</span>
                      </div>
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
                  setIsEditingProfile(false)
                  setEditProfile(profile)
                }}
                className="flex-1"
              >
                キャンセル
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsEditingProfile(false)
                  setCurrentView("questions")
                }}
                className="flex-1"
              >
                診断へ
              </Button>
            </div>
          </div>
        </Card>
      )}

      {currentView === "questions" ? (
        <Card className="p-4">
          <CardContent>
            <h2 className="font-semibold mb-2">診断（全部で40問）</h2>
            <p className="text-xs text-muted-foreground mb-3">5段階で答えてください（賛成 → 反対）</p>
            <div className="space-y-3 max-h-[60vh] overflow-auto pr-2">
              {QUESTIONS.map((q, i) => (
                <div key={i} className="mb-2">
                  <p className="text-sm font-medium">{`Q${i + 1}. ${q}`}</p>
                  <div className="flex gap-1 mt-2">
                    {[
                      { value: "1", label: "賛成" },
                      { value: "2", label: "やや賛成" },
                      { value: "3", label: "どちらでもない" },
                      { value: "4", label: "やや反対" },
                      { value: "5", label: "反対" },
                    ].map(({ value, label }) => (
                      <Button
                        key={value}
                        variant={answers[i + 1] === value ? "default" : "outline"}
                        size="sm"
                        className="flex-1 text-xs h-8"
                        onClick={() => handleAnswer(i + 1, value)}
                      >
                        {label}
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 mt-3">
              <Input
                placeholder="あなたの名前（プロフィール用）"
                value={profile.name}
                onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
              />
              <Button
                onClick={() => {
                  calculate()
                  setCurrentView("timeline")
                }}
              >
                診断してタイムラインへ
              </Button>
            </div>
            {profile.type && (
              <div className="mt-3">
                <Badge>{TYPES[profile.type].label}</Badge>
                <div className="mt-2">
                  <p className="text-sm font-medium mb-1">おすすめの趣味:</p>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {TYPES[profile.type].hobbies.map((hobby, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {hobby}
                      </Badge>
                    ))}
                  </div>
                </div>
                <p className="text-sm">{TYPES[profile.type].advice}</p>
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card className="p-4">
          <CardContent>
            <h2 className="font-semibold mb-2">タイムライン</h2>
            <div className="flex gap-2 mb-3">
              <Button onClick={() => setTab("feed")} variant={tab === "feed" ? "default" : "ghost"} size="sm">
                フォロー中
              </Button>
              <Button onClick={() => setTab("global")} variant={tab === "global" ? "default" : "ghost"} size="sm">
                おすすめ
              </Button>
            </div>

            {!profile.type && (
              <p className="text-sm text-muted-foreground mb-4">
                診断してタイプを登録すると、あなた専用タイムラインが表示されます。
              </p>
            )}

            <div className="border rounded-lg p-4 mb-4 bg-gray-50/50">
              <div className="flex gap-3">
                <Avatar>
                  <div
                    className={`bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center font-semibold overflow-hidden ${getAvatarSizeClass(profile.avatarSize)}`}
                  >
                    {renderAvatar(profile.avatar, profile.avatarSize, profile.imageScale)}
                  </div>
                </Avatar>
                <div className="flex-1">
                  <Textarea
                    placeholder="いまどうしてる？"
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    className="border-none resize-none bg-transparent text-xl placeholder:text-gray-500 focus-visible:ring-0"
                    rows={3}
                  />
                  <div className="flex justify-between items-center mt-3">
                    <div className="text-sm text-gray-500">{newPost.length}/280</div>
                    <Button
                      onClick={postNow}
                      disabled={!profile.type || !newPost.trim() || newPost.length > 280}
                      className="rounded-full px-6"
                      size="sm"
                    >
                      ポストする
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3 max-h-[60vh] overflow-auto pr-2">
              {feedPosts.length === 0 && <p className="text-sm text-muted-foreground">投稿がまだありません。</p>}
              {feedPosts.map((p) => (
                <div key={p.id} className="border-b pb-3 last:border-b-0">
                  <div className="flex gap-3">
                    <Avatar>
                      <div
                        className={`bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center font-semibold overflow-hidden ${getAvatarSizeClass(p.avatarSize)}`}
                      >
                        {renderAvatar(p.avatar, p.avatarSize, p.imageScale || 100)}
                      </div>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm">{p.author}</span>
                        <Badge variant="outline" className="text-xs">
                          {TYPES[p.typeTag]?.label || p.typeTag}
                        </Badge>
                        <span className="text-xs text-gray-500">{new Date(p.createdAt).toLocaleString()}</span>
                      </div>
                      <p className="mt-1 text-sm leading-relaxed">{p.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
