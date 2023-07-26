import { CreateTodosType, GetTodosType, ITodo } from "@src/types/todo"
import axios from "@src/utils/axios"
import { useMutation, useQuery } from "@tanstack/react-query"

export const useGetTodos = (props?: GetTodosType) => {
    const { id } = props || {}
    const query = useQuery<ITodo[], string>({
        queryKey: ["todos", id],
        queryFn: async () => (await axios.get("/todos")).data
    })
    return query;
}

export const useCreateTodo = () => useMutation<void, string, CreateTodosType>({
    mutationFn: async (props) => axios.post("/todos", props)
})