export function formatMessageTime(date) {
    return new Date(date).toLocaleTimeString("fr", {
        hour:"2-digit",
        minute: "2-digit",
        Hour12: false,
    })
}