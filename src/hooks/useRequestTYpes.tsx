import { useQuery } from "@tanstack/react-query";
import { GetRequestTypesApi } from "../api/getRequestTypesApi";

export const UseRequestTypes = () => {
    const query = useQuery({
        queryKey: ["requestTypes"],
        queryFn: GetRequestTypesApi,
        staleTime: Infinity
    });

    return query;
};