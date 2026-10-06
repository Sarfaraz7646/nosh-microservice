import api from "./api";
export const authApi = {
  me: () => api.get("/auth/me"),
  login: (v) => api.post("/auth/login", v),
  register: (v) => api.post("/auth/register", v),
  adminUsers: (params) => api.get("/auth/admin/users", { params }),
  adminUserStatus: (id, status) =>
    api.patch(`/auth/admin/users/${id}/status`, { status }),
};
export const restaurantApi = {
  list: (params) => api.get("/restaurants", { params }),
  get: (id) => api.get(`/restaurants/${id}`),
  mine: () => api.get("/restaurants/me/current"),
  create: (v) => api.post("/restaurants", v),
  update: (v) => api.patch("/restaurants/me/current", v),
  toggleOpen: () => api.patch("/restaurants/me/current/toggle-open"),
  adminList: (params) => api.get("/restaurants/admin/all", { params }),
  adminStatus: (id, status) =>
    api.patch(`/restaurants/admin/${id}/status`, { status }),
};
export const menuApi = {
  list: (restaurantId) => api.get(`/menu/${restaurantId}`),
  create: (restaurantId, v) => api.post(`/menu/${restaurantId}`, v),
  update: (restaurantId, id, v) => api.patch(`/menu/${restaurantId}/${id}`, v),
  remove: (restaurantId, id) => api.delete(`/menu/${restaurantId}/${id}`),
};
export const offerApi = {
  list: (restaurantId) => api.get(`/offers/${restaurantId}`),
  create: (restaurantId, v) => api.post(`/offers/${restaurantId}`, v),
  update: (restaurantId, id, v) =>
    api.patch(`/offers/${restaurantId}/${id}`, v),
  remove: (restaurantId, id) => api.delete(`/offers/${restaurantId}/${id}`),
};
export const orderApi = {
  create: (v) => api.post("/orders", v),
  mine: (params) => api.get("/orders/mine", { params }),
  get: (id) => api.get(`/orders/${id}`),
  cancel: (id, reason) => api.patch(`/orders/${id}/cancel`, { reason }),
  restaurant: () => api.get("/orders/restaurant/current"),
  restaurantStatus: (id, v) => api.patch(`/orders/restaurant/${id}/status`, v),
  deliveryAvailable: () => api.get("/orders/delivery/available"),
  deliveryAccept: (id) => api.patch(`/orders/delivery/${id}/accept`),
  deliveryStatus: (id, v) => api.patch(`/orders/delivery/${id}/status`, v),
  admin: () => api.get("/orders/admin/all"),
};
export const paymentApi = {
  create: (v) => api.post("/payments", v),
  confirm: (id, success) => api.post(`/payments/${id}/confirm`, { success }),
  get: (id) => api.get(`/payments/${id}`),
};
export const deliveryApi = {
  verification: () => api.get("/delivery/verification"),
  availability: () => api.get("/delivery/availability"),
  setOnline: (online) => api.patch("/delivery/availability", { online }),
  requests: () => api.get("/delivery/requests"),
  accept: (id) => api.post(`/delivery/requests/${id}/accept`),
  reject: (id) => api.post(`/delivery/requests/${id}/reject`),
  active: () => api.get("/delivery/active"),
  status: (id, status) =>
    api.patch(`/delivery/active/${id}/status`, { status }),
  navigation: (id) => api.get(`/delivery/navigation/${id}`),
  location: (v) => api.post("/delivery/location", v),
  history: () => api.get("/delivery/history"),
  earnings: () => api.get("/delivery/earnings"),
};
export const notificationApi = {
  list: () => api.get("/notifications"),
  read: (id) => api.patch(`/notifications/${id}/read`),
  readAll: () => api.patch("/notifications/read-all"),
  remove: (id) => api.delete(`/notifications/${id}`),
  unread: () => api.get("/notifications/unread-count"),
};
export const analyticsApi = {
  overview: (period = "30d") =>
    api.get("/analytics/overview", { params: { period } }),
  sales: (period = "30d") =>
    api.get("/analytics/sales", { params: { period } }),
  topItems: (period = "30d") =>
    api.get("/analytics/top-items", { params: { period } }),
  status: (period = "30d") =>
    api.get("/analytics/status-breakdown", { params: { period } }),
  delivery: (period = "30d") =>
    api.get("/analytics/delivery-performance", { params: { period } }),
  payments: (period = "30d") =>
    api.get("/analytics/payments", { params: { period } }),
  recent: (period = "30d") =>
    api.get("/analytics/recent-orders", { params: { period } }),
};
export const profileApi = {
  me: () => api.get("/users/me"),
  update: (v) => api.patch("/users/me", v),
  addresses: (v) => api.post("/users/me/addresses", v),
};
export const partnerApi = {
  status: () => api.get("/partners/verification-status"),
  application: () => api.get("/partners/application"),
  save: (v) => api.post("/partners/application", v),
  upload: (form) =>
    api.post("/partners/application/documents", form, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
};
export const adminApi = {
  partnerApplications: () => api.get("/admin/partner-applications"),
  partnerReview: (id, v) =>
    api.patch(`/admin/partner-applications/${id}/review`, v),
  partnerVerify: (id) => api.patch(`/admin/partner-applications/${id}/verify`),
  partnerReject: (id, v) =>
    api.patch(`/admin/partner-applications/${id}/reject`, v),
  partnerSuspend: (id) =>
    api.patch(`/admin/partner-applications/${id}/suspend`),
};
