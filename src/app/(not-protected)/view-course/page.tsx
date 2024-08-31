"use client"
import { useState } from 'react'
import ReactPlayer from 'react-player'
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"

type videoList = {
    id: number;
    title: string;
    url: string;
}

// نفترض أن هذه هي مصفوفة الفيديوهات التي ستمررها
const videoList: videoList[] = [
    { id: 1, title: 'مقدمة الكورس', url: 'https://files.edgestore.dev/qss7bau5ccanh5kn/publicFiles/_public/70317e99-63e0-4e75-88e1-146e9f2a211b.mp4' },
    { id: 2, title: 'الدرس الأول', url: 'https://files.edgestore.dev/qss7bau5ccanh5kn/publicFiles/_public/5e6bf1fc-9922-4f18-9725-76d776b747a4.mp4' },
    { id: 3, title: 'الدرس الثاني', url: 'https://www.example.com/video3.mp4' },
    // ... المزيد من الفيديوهات
]

export default function CoursePlayer() {
    const [currentVideo, setCurrentVideo] = useState<videoList>(videoList[0])

    const handleVideoChange = (video: videoList) => {
        setCurrentVideo(video)
    }

    return (
        <div className="flex flex-col lg:flex-row h-screen bg-background">
            <Card className="lg:w-3/4 m-4 shadow-lg rounded-lg">
                <CardContent className="p-0">
                    <div className="relative pt-[56.25%]">
                        <ReactPlayer
                            url={currentVideo.url}
                            controls
                            width="100%"
                            height="100%"
                            className="absolute top-0 left-0"
                        />
                    </div>
                </CardContent>
            </Card>
            <Card className="lg:w-1/4 m-4 p-4 shadow-lg rounded-lg">
                <CardContent>
                    <h2 className="text-2xl font-bold mb-4">قائمة الفيديوهات</h2>
                    <ScrollArea className="h-[calc(100vh-200px)]">
                        {videoList.map((video) => (
                            <Button
                                key={video.id}
                                variant={currentVideo.id === video.id ? "secondary" : "ghost"}
                                className="w-full justify-start mb-2 text-left"
                                onClick={() => handleVideoChange(video)}
                            >
                                {video.title}
                            </Button>
                        ))}
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
    )
}
