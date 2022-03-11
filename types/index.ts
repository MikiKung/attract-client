export interface IPost {
    _id: string
    ownUserId: string | IUser
    timePost: Date | string
    categoryId: ICategory[]
    postText: string
    img: string
    markId: IMark[]
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
}

export interface ICategory {
    _id: string
    name: string
}

export interface IMark {
    _id: string
    postId: string
    userId: string
}