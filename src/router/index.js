import { createRouter, createWebHashHistory } from "vue-router";

import MessageChat from "@/views/message/chat/index.vue";
import ExploreWork from "@/views/explore-work/index.vue";
import FriendDetail from "@/views/friend/index-list/index.vue";
import GroupDetail from "@/views/group/GroupDetail.vue";
import ExploreWorkVideo from "@/views/video-work/index.vue";
const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/HomeView.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/common/login/index.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/views/common/register/index.vue"),
  },
  {
    path: "/friend/find",
    name: "findFriend",
    component: () => import("@/views/friend/find/index.vue"),
  },
  {
    path: "/friend",
    name: "Friend",
    component: () => import("@/views/friend/index.vue"),
    children: [
      {
        path: ":id",
        component: FriendDetail,
      },
    ],
  },

  {
    path: "/recommend",
    name: "Recommend",
    component: () => import("@/views/recommend/index.vue"),
    children: [
      {
        path: ":id",
        component: ExploreWork,
      },
      {
        path: "video/:id",
        component: ExploreWorkVideo,
      },
    ],
  },
  {
    path: "/publishWork",
    name: "publishWork",
    component: () => import("@/views/publish-work/index.vue"),
  },
  {
    path: "/publishWork/publish",
    name: "publish",
    component: () => import("@/views/publish-work/publish.vue"),
  },
  {
    path: "/message",
    name: "Message",
    component: () => import("@/views/message/index.vue"),
    children: [
      {
        path: ":id",
        component: MessageChat,
      },
    ],
  },
  {
    path: "/me",
    name: "Me",
    component: () => import("@/views/me/index.vue"),
    children: [
      {
        path: "userInfo/edit",
        name: "editUserInfo",
        component: () => import("@/views/me/user-info/EditUserInfo.vue"),
      },
    ],
  },

  {
    path: "/group/add",
    name: "addGroup",
    component: () =>
      import(/* webpackChunkName: "HomeView" */ "@/views/group/AddGroup.vue"),
  },
  {
    path: "/group/setting/:id",
    name: "GroupSetting",
    component: () =>
      import(
        /* webpackChunkName: "HomeView" */ "@/views/group/GroupSetting.vue"
      ),
  },
  {
    path: "/group/list",
    name: "GroupList",
    component: () =>
      import(/* webpackChunkName: "HomeView" */ "@/views/group/GroupList.vue"),
    children: [
      {
        path: ":id",
        component: GroupDetail,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
