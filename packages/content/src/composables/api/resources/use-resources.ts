import { useQuery } from "../generic/use-query";
import type { Resource } from "@starter/domain";

export function useResources() {
    const response = useQuery<Resource[]>(() => "/resources");
    console.log("useResources response", response.data);
    return response;
}
