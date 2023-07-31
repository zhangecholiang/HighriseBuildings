import { createRouter, createWebHashHistory } from "vue-router";
import { List, Management, Memo, OfficeBuilding, Paperclip, Tickets, } from "@element-plus/icons-vue";

export const routes = [
	{
		path: "/",
		redirect: "/high-buildings",
	},
	{
		path: "/high-buildings",
		meta: {
			icon: OfficeBuilding,
			name: "高层建筑",
		},
		redirect: "/high-buildings/jzwgl",
		component: () => import("@/layouts/index.vue"),
		children: [
			{
				path: "jzwgl",
				meta: {
					icon: Tickets,
					name: "建筑物管理",
				},
				component: () => import("@/views/HighriseBuildings/BuildingManagement/index.vue"),
			},
			{
				path: "jzwjc",
				meta: {
					icon: Memo,
					name: "建筑物检查",
				},
				component: () => import("@/views/HighriseBuildings/CheckBuilding/index.vue"),
			},
			{
				path: "yhgl",
				meta: {
					icon: Management,
					name: "隐患管理",
				},
				children: [
					{
						path: "ybyh",
						meta: {
							icon: Memo,
							name: "一般隐患",
						},
						component: () => import("@/views/HighriseBuildings/HazardManagement/GeneralHiddendangers/index.vue"),
					},
					{
						path: "zdyh",
						meta: {
							icon: Memo,
							name: "重大隐患",
						},
						component: () => import("@/views/HighriseBuildings/HazardManagement/MajorHhiddendangers/index.vue"),
					},
				],
			},
			{
				path: "lrtj",
				meta: {
					icon: List,
					name: "录入统计",
				},
				component: () => import("@/views/HighriseBuildings/EnterStatistics/index.vue"),
			},
		],
	},
	{
		path: "/process-agency",
		meta: {
			name: "流程图代办",
			icon: Paperclip,
		},
		component: () => import("@/views/ProcessAgency/index.vue"),
	},
];

const router = createRouter({
	                            history: createWebHashHistory(),
	                            routes,
                            });

export default router;
