export interface ITodo {
    _id: string;
    user: string;
    title: string;
    description: string;
    completed: boolean;
    updatedAt: string;
}

export type GetTodoDetailType = {
    id?: string
}

export type CreateTodoType = {
    title: string
    description?: string
}

export type EditTodoType = {
    id: string;
    completed?: boolean;
    title?: string
    description?: string
}

export type DeleteTodoType = {
    id: string;
}