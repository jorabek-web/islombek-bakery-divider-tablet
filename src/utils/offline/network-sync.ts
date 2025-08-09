
import { SERVER_URL } from "@/constants";
import { API_TAGS } from "@/constants/ApiTags";
import { baseApi, store } from "@/integration";
import { useStorage } from "@/utils";
import { deleteRequest, getAllRequests } from "./offline-cache";

async function sendStoredRequests() {
    const requests = await getAllRequests();

    for (const req of requests) {
        const headers = new Headers(req.headers);

        const token = useStorage.getTokens()?.accessToken;
        headers.set("Accept", "application/json");
        headers.set("Content-Type", "application/json");
        
        if (token) {
            headers.set("Authorization", token);
        }

        try {
            const response = await fetch(SERVER_URL + req.url.slice(1), {
                method: req.method,
                headers,
                body: req.body ? JSON.stringify(req.body) : undefined,
            });

            if (response.ok) {
                await deleteRequest(req.id);
                store.dispatch(baseApi.util.invalidateTags(Object.values(API_TAGS)));
            }
        } catch (error) {
            console.error("Saqlangan so'rovlarni yuborishda xatolik.", error);
        }
    }
}

window.addEventListener("online", () => {
    sendStoredRequests();
});