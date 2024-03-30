import { createRouter, createWebHashHistory } from "vue-router";

import EditUserInfoItem from "@/views/me/userinfo/EditUserInfoItem";
import MessageChat from "@/views/message/chat/index.vue";
import ExploreWork from "@/views/explore-work/index.vue";
import FriendDetail from "@/views/friend/index-list/index.vue";
import GroupDetail from "@/views/group/GroupDetail.vue";
const routes = [
  {
    path: "/",
    name: "Home",
    component: () =>
      import(/* webpackChunkName: "HomeView" */ "@/views/HomeView.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "Login" */ "@/views/common/login/index.vue"),
  },
  {
    path: "/friend",
    name: "Friend",
    component: () =>
      import(/* webpackChunkName: "friend" */ "@/views/friend/index.vue"),
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
    component: () =>
      import(/* webpackChunkName: "recommend" */ "@/views/recommend/index.vue"),
    children: [
      {
        path: ":id",
        component: ExploreWork,
      },
    ],
  },
  {
    path: "/publishWork",
    name: "publishWork",
    component: () =>
      import(
        /* webpackChunkName: "publishWork" */ "@/views/publish-work/index.vue"
      ),
  },
  {
    path: "/publishWork/publish",
    name: "publish",
    component: () =>
      import(
        /* webpackChunkName: "publish" */ "@/views/publish-work/publish.vue"
      ),
  },
  {
    path: "/message",
    name: "Message",
    component: () =>
      import(/* webpackChunkName: "message" */ "@/views/message/index.vue"),
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
