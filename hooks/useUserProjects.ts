// hooks/useUserProjects.ts
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";

export function useUserProjects() {
    const { data: session, status } = useSession();

    return useQuery({
        queryKey: ["userProjects", session?.user?.id],
        queryFn: async () => {
            if (!session?.user?.id) throw new Error("Not authenticated");

            const res = await fetch("/api/projects");

            if (!res.ok) {
                const text = await res.text();
                throw new Error(text || "Failed to fetch projects");
            }

            return res.json();
        },
        enabled: status === "authenticated",
        retry: false,
    });
}
