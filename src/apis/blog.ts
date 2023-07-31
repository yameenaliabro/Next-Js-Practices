import { CreateBlogType, DeleteBlogType, EditBlogType, GetBlogDetailType, IBlog } from "@src/types";
import axios from "@src/utils/axios";
import { useMutation, useQuery } from "@tanstack/react-query";

export const UseGetBlog = () => useQuery<IBlog, string>({
    queryKey: ["blog"],
    queryFn: async () => (await axios.get("/blog")).data
})

export const UseBlogDeatail = (props: GetBlogDetailType) => {
    const { id } = props || {}
    return useQuery<IBlog, string>({
        queryKey: ["blog", id],
        queryFn: async () => (await axios.get("/blog", { params: id })).data
    })
}

export const UseCreateBlog = () => useMutation<void, string, CreateBlogType>({
    mutationFn: async (props) => await axios.post("/blog", props)

})

export const UseEditBlog = () => useMutation<void, string, EditBlogType>({
    mutationFn: async ({ id, ...rest }) => await axios.patch("/blog", rest, { params: { id } })
})

export const UseDeleteBlog = () => useMutation<void, string, DeleteBlogType>({
    mutationFn: async (props) => await axios.delete("/blog", { params: props })
})

