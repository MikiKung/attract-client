export interface IPost {
    _id: string
    ownUserId:IUser
    timePost: Date | string
    categoryId: ICategory[]
    postText: string
    img: string
    markId: IMark[]
    commentId: IComment[]
}

export interface IUser {
    _id: string
    firstname: string
    surename: string
    username: string
    email: string
    gender: string
    bgImg: string
    img: string
    bio: string
    postId: IPost[]
    followingUser: IUser[]
    followerUser: IUser[]
    historySearch: string[]
    counts?: number
}

export interface ICategory {
    _id: string
    name: string
}

export interface IMark {
    _id: string
    postId: IPost
    userId: string
}

export interface IComment {
    _id: string
    ownUserId: IUser
    postId: IPost
    commentText: string
}