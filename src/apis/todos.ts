import { CreateTodoType, DeleteTodoType, EditTodoType, GetTodoDetailType, ITodo } from "@src/types/todo"
import axios from "@src/utils/axios"
import { useMutation, useQuery } from "@tanstack/react-query"

export const UseGetTodos = () => useQuery<ITodo[], string>({
    queryKey: ["todos"],
    queryFn: async () => (await axios.get("/todos")).data
})

export const UseGetTodoDetail = (props?: GetTodoDetailType) => {
    const { id } = props || {}
    return useQuery<ITodo, string>({
        queryKey: ["todo", id],
        queryFn: async () => (await axios.get("/todos", { params: { id } })).data
    })
}

export const useCreateTodo = () => useMutation<void, string, CreateTodoType>({
    mutationFn: async (props) => axios.post("/todos", props)
})

export const useEditTodo = () => useMutation<void, string, EditTodoType>({
    mutationFn: async ({ id, ...rest }) => axios.patch("/todos", rest, { params: { id } })
})

export const useDeleteTodo = () => useMutation<void, string, DeleteTodoType>({
    mutationFn: async (props) => axios.delete("/todos", { params: props })
})