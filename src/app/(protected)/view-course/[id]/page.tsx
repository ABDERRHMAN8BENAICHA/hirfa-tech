"use client";

import { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

type Lesson = {
    id: string;
    title: string;
    videoUrl: string;
    content: string;
    isFree: boolean;
};

type Course = {
    id: string;
    title: string;
    description: string;
    image: string;
    price: number;
    discount: number;
    numberOfStars: number;
    published: boolean;
    isFree: boolean;
    lessons: Lesson[];
};
type Props = {
    params: {
        id: string,
    }
}
export default function CoursePlayer({ params }: Props) {
    const courseId = params.id;

    const [course, setCourse] = useState<Course | null>(null);
    const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCourse = async () => {
            console.log("Fetching course...");
            setLoading(true);
            setError(null); // Reset any previous errors

            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/api/courses/get-course`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ courseId }),
                    }
                );

                const data = await response.json();

                if (data.ok) {
                    setCourse(data.course);
                    if (data.course.lessons.length > 0) {
                        setCurrentLesson(data.course.lessons[0]);
                    }
                } else {
                    setError("Error fetching course data");
                    console.log("Error fetching course data:", data);
                }
            } catch (err) {
                setError("Error fetching course: " + (err instanceof Error ? err.message : "Unknown error"));
                console.error("Error fetching course:", err);
            } finally {
                setLoading(false);
            }
        };

        if (courseId) {
            fetchCourse();
        }
    }, [courseId]);

    const handleLessonChange = (lesson: Lesson) => {
        setCurrentLesson(lesson);
    };

    if (loading) {
        return <p>Loading course...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>; // Display error message
    }

    if (!course || !currentLesson) {
        return <p>No course available.</p>; // Fallback message if no course data
    }

    return (
        <div className="flex flex-col lg:flex-row h-screen bg-background">
            <Card className="lg:w-3/4 m-4 shadow-lg rounded-lg">
                <CardContent className="p-0">
                    <div className="relative pt-[56.25%]">
                        <ReactPlayer
                            url={currentLesson.videoUrl}
                            controls
                            width="100%"
                            height="100%"
                            className="absolute top-0 left-0"
                        />
                    </div>
                    <div className="p-4">
                        <h2 className="text-2xl font-bold mb-2">{currentLesson.title}</h2>
                        <p>{currentLesson.content}</p>
                    </div>
                </CardContent>
            </Card>
            <Card className="lg:w-1/4 m-4 p-4 shadow-lg rounded-lg">
                <CardContent>
                    <h2 className="text-2xl font-bold mb-4">{course.title}</h2>
                    <p className="mb-4">{course.description}</p>
                    <div className="mb-4">
                        <span className="font-bold">Price: </span>
                        {course.isFree ? (
                            'Free'
                        ) : (
                            <>
                                ${course.price - (course.price * course.discount / 100)}
                                {course.discount > 0 && (
                                    <span className="ml-2 line-through text-gray-500">${course.price}</span>
                                )}
                            </>
                        )}
                    </div>
                    <div className="mb-4">
                        <span className="font-bold">Rating: </span>
                        {course.numberOfStars} / 5
                    </div>
                    <h3 className="text-xl font-bold mb-2">قائمة الدروس</h3>
                    <ScrollArea className="h-[calc(100vh-400px)]">
                        {course.lessons.map((lesson) => (
                            <Button
                                key={lesson.id}
                                variant={currentLesson.id === lesson.id ? "secondary" : "ghost"}
                                className="w-full justify-start mb-2 text-left"
                                onClick={() => handleLessonChange(lesson)}
                            >
                                {lesson.title}
                                {lesson.isFree && <span className="ml-2 text-green-500">(Free)</span>}
                            </Button>
                        ))}
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
    );
}
