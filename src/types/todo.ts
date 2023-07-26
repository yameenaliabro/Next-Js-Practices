export interface ITodo {
    _id: string;
    auth_id: string;
    title: string;
    description: string;
    completed: boolean;
    createdAt: string;
    updatedAt: string;
}

export type GetTodosType = {
    id?: string
}

export type CreateTodosType = {
    title: string
    description?: string
}