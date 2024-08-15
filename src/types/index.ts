import { IconType } from "react-icons";

export interface NavItemType {
    name: string;
    link: string;
}

export interface HeroCardType {
    icon: IconType,
    title: string,
    content: string
}
export interface AboutType {
    icon: IconType,
    title: string,
    content: string
}

export interface FooterLink {
    title: string;
    link: string;
}

export interface FooterItemType {
    header: string;
    items: { title: string; link: string }[];
}

export interface SocialLinks {
    instagram: string;
    linkedin: string;
    github: string;
}

export interface TeamMember {
    name: string;
    role: string;
    image: string;
    bio: string;
    social: SocialLinks;
}

export interface AboutContent {
    title: string;
    description: string;
    team: TeamMember[];
}

export interface Post {
    id: string;
    content: string;
    authorId: string;
    createdAt: string;
    updatedAt: string;
    image?: string;
    comment: Comment[];
    like: Like[];
    user: User,
    _count: {
        comment: number,
        like: number,
    }
}
export interface Comment {
    id: string;
    content: string;
    authorId: string;
    postId: string;
    createdAt: string;
    updatedAt: string;
}
export interface Like {
    id: string;
    userId: string;
    postId: string;
    createdAt: string;
}

export interface PostResponse {
    ok: true;
    message: string;
    posts: Post[];
    countOfPosts: number;
}

export interface User {
    id: string;
    name: string;
    username: string | null;
    email: string;
    emailVerified: string | null;
    image: string;
    createdAt: string;
    updatedAt: string;
    address: string | null;
    password: string | null;
    phone: string | null;
    role: 'USER' | 'ADMIN';
}

export interface Comment {
    id: string;
    content: string;
    authorId: string;
    postId: string;
    createdAt: string;
    updatedAt: string;
    user: User;
}

export interface CommentsResponse {
    ok: boolean;
    comments: Comment[];
    message: string;
}

export interface Like {
    id: string;
    userId: string;
    postId: string;
    createdAt: string;
    user: User;
}

export interface LikesResponse {
    ok: boolean;
    likes: Like[];
}