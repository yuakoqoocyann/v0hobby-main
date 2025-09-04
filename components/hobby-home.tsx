"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const SearchIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="8"></circle>
    <path d="m21 21-4.35-4.35"></path>
  </svg>
)

const MessageCircleIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </svg>
)

const HeartIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
)

const ShareIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="18" cy="5" r="3"></circle>
    <circle cx="6" cy="12" r="3"></circle>
    <circle cx="18" cy="19" r="3"></circle>
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
  </svg>
)

const UsersIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
)

const TrendingUpIcon = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
    <polyline points="17 6 23 6 23 12"></polyline>
  </svg>
)

const hobbyRooms = [
  { id: 1, name: "写真撮影", members: 1234, online: 89, category: "アート" },
  { id: 2, name: "料理・レシピ", members: 2156, online: 156, category: "ライフスタイル" },
  { id: 3, name: "ガーデニング", members: 987, online: 45, category: "ライフスタイル" },
  { id: 4, name: "読書クラブ", members: 1567, online: 78, category: "文化" },
  { id: 5, name: "プログラミング", members: 3421, online: 234, category: "テクノロジー" },
  { id: 6, name: "音楽制作", members: 876, online: 67, category: "アート" },
]

const timelinePosts = [
  {
    id: 1,
    user: { name: "田中さん", avatar: "/placeholder.svg?height=40&width=40", username: "@tanaka_photo" },
    content: "今日撮影した桜の写真です。満開でとても美しかったです！",
    image: "/cherry-blossoms-garden.png",
    likes: 24,
    comments: 8,
    time: "2時間前",
    hobby: "写真撮影",
  },
  {
    id: 2,
    user: { name: "佐藤料理人", avatar: "/placeholder.svg?height=40&width=40", username: "@sato_chef" },
    content: "新しいパスタレシピを試してみました。トマトとバジルの組み合わせが最高です！",
    image: "/placeholder-fv82y.png",
    likes: 45,
    comments: 12,
    time: "4時間前",
    hobby: "料理・レシピ",
  },
  {
    id: 3,
    user: { name: "山田ガーデナー", avatar: "/placeholder.svg?height=40&width=40", username: "@yamada_garden" },
    content: "春の花壇の準備が完了しました。今年はどんな花が咲くか楽しみです。",
    likes: 18,
    comments: 5,
    time: "6時間前",
    hobby: "ガーデニング",
  },
]

const trendingTopics = [
  { name: "春の写真コンテスト", posts: 234 },
  { name: "新レシピ挑戦", posts: 156 },
  { name: "ガーデニング初心者", posts: 89 },
  { name: "読書感想文", posts: 67 },
]

export function HobbyHome() {
  const [activeTab, setActiveTab] = useState("timeline")

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="timeline">タイムライン</TabsTrigger>
            <TabsTrigger value="chatrooms">チャットルーム</TabsTrigger>
          </TabsList>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <TabsContent value="timeline" className="space-y-6">
                {/* Post Creation */}
                <Card>
                  <CardContent className="p-4">
                    <div className="flex gap-3">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <Input placeholder="今日の趣味活動をシェアしよう..." className="mb-3 bg-input border-border" />
                        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">投稿する</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Timeline Posts */}
                {timelinePosts.map((post) => (
                  <Card key={post.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-3">
                        <Avatar>
                          <AvatarImage src={post.user.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{post.user.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-semibold text-foreground">{post.user.name}</span>
                            <span className="text-muted-foreground text-sm">{post.user.username}</span>
                            <span className="text-muted-foreground text-sm">•</span>
                            <span className="text-muted-foreground text-sm">{post.time}</span>
                            <Badge variant="secondary" className="bg-accent text-accent-foreground">
                              {post.hobby}
                            </Badge>
                          </div>
                          <p className="text-card-foreground mb-3">{post.content}</p>
                          {post.image && (
                            <img
                              src={post.image || "/placeholder.svg"}
                              alt="投稿画像"
                              className="rounded-lg w-full max-w-md mb-3"
                            />
                          )}
                          <div className="flex items-center gap-6 text-muted-foreground">
                            <button className="flex items-center gap-2 hover:text-accent transition-colors">
                              <MessageCircleIcon />
                              <span>{post.comments}</span>
                            </button>
                            <button className="flex items-center gap-2 hover:text-accent transition-colors">
                              <HeartIcon />
                              <span>{post.likes}</span>
                            </button>
                            <button className="flex items-center gap-2 hover:text-accent transition-colors">
                              <ShareIcon />
                            </button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="chatrooms" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {hobbyRooms.map((room) => (
                    <Card key={room.id} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg text-card-foreground">{room.name}</CardTitle>
                          <Badge variant="outline">{room.category}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <UsersIcon />
                              <span>{room.members.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <div className="w-2 h-2 bg-accent rounded-full"></div>
                              <span>{room.online} オンライン</span>
                            </div>
                          </div>
                        </div>
                        <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                          参加する
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Trending Topics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-card-foreground">
                    <TrendingUpIcon />
                    トレンド
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {trendingTopics.map((topic, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-card-foreground hover:text-accent cursor-pointer">
                        #{topic.name}
                      </span>
                      <span className="text-xs text-muted-foreground">{topic.posts}投稿</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Suggested Hobbies */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-card-foreground">おすすめの趣味</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="bg-accent text-accent-foreground cursor-pointer">
                      陶芸
                    </Badge>
                    <Badge variant="secondary" className="bg-accent text-accent-foreground cursor-pointer">
                      ヨガ
                    </Badge>
                    <Badge variant="secondary" className="bg-accent text-accent-foreground cursor-pointer">
                      釣り
                    </Badge>
                    <Badge variant="secondary" className="bg-accent text-accent-foreground cursor-pointer">
                      映画鑑賞
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  )
}
