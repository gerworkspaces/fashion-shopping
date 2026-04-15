export default defineNuxtRouteMiddleware((to, from) => {
    if (!to.query.ticket_id) {
        return navigateTo("/home/tickets");
    }
});
