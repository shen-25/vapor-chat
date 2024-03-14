import { createRouter, createWebHashHistory } from "vue-router";

import EditUserInfoItem from "@/views/me/userinfo/EditUserInfoItem";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () =>
      import(/* webpackChunkName: "HomeView" */ "@/views/HomeView.vue"),
  },
  {
    path: "/friend",
    name: "Friend",
    component: () =>
      import(/* webpackChunkName: "Singer" */ "@/views/friend/index.vue"),
  },
  {
    path: "/upload-content",
    name: "UploadContent",
    component: () =>
      import(
        /* webpackChunkName: "Singer" */ "@/views/upload-content/index.vue"
      ),
  },
  {
    path: "/message",
    name: "Message",
    component: () =>
      import(/* webpackChunkName: "Singer" */ "@/views/message/index.vue"),
  },
  {
    path: "/message/chat",
    name: "Chat",
    component: () =>
      import(
        /* webpackChunkName: "ChooseSchool" */ "@/views/message/chat/index.vue"
      ),
  },
  {
    path: "/me",
    name: "Me",
    component: () =>
      import(/* webpackChunkName: "Singer" */ "@/views/me/index.vue"),
    children: [
      {
        path: "edit-userinfo",
        name: "meEditUserInfo",
        component: () =>
          import(
            /* webpackChunkName: "EditUserInfo" */ "@/views/me/userinfo/EditUserInfo.vue"
          ),
        children: [
          {
            path: ":id",
            component: EditUserInfoItem,
          },
        ],
      },
    ],
  },
  {
    path: "/me/edit/chooseSchool",
    name: "chooseSchool",
    component: () =>
      import(
        /* webpackChunkName: "ChooseSchool" */ "@/views/me/userinfo/ChooseSchool.vue"
      ),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
