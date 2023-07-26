import { createRouter, createWebHashHistory } from 'vue-router'
import { List, Management, Memo, OfficeBuilding, Paperclip, Tickets } from "@element-plus/icons-vue";

export const routes = [{
	path: '/', redirect: '/buildings',
}, {
	path: '/buildings', component: () => import('@/layouts/index.vue'), redirect: '/high-buildings/jzwgl', children: [{
		path: '/high-buildings', meta: {
			name: '高层建筑', icon: OfficeBuilding
		}, children: [{
			path: 'jzwgl', meta: {
				icon: Tickets, name: '建筑物管理',
			}, component: () => import('@/views/HighriseBuildings/BuildingManagement/index.vue')
		}, {
			path: 'jzwjc', meta: {
				icon: Memo, name: '建筑物检查',
			}, component: () => import('@/views/HighriseBuildings/CheckBuilding/index.vue')
		}, {
			path: 'yhgl', meta: {
				icon: Management, name: '隐患管理',
			}, component: () => import('@/views/HighriseBuildings/HazardManagement/index.vue')
		}, {
			path: 'lrtj', meta: {
				icon: List, name: '录入统计',
			}, component: () => import('@/views/HighriseBuildings/EnterStatistics/index.vue')
		}]
	}, {
		path: '/process-agency', meta: {
			name: '流程图代办', icon: Paperclip
		}, component: () => import('@/views/ProcessAgency/index.vue'),
	},]
}]

const router = createRouter({
	history: createWebHashHistory(), routes
})

export default router