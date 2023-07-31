export interface IBlog {
    _id: string;
    user: string;
    title: string;
    description: string;
    updatedAt: string;
    image: string
}

export type GetBlogDetailType = {
    id?: string
}

export type CreateBlogType = {
    title: string
    description?: string,
    image: string
}

export type EditBlogType = {
    id: string;
    completed?: boolean;
    title?: string
    description?: string,
    image: string
}

export type DeleteBlogType = {
    id: string;
}