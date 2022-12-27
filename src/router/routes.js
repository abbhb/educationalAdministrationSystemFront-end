import App from '../App.vue'
import login from "../views/Login/Login.vue";

import test from "../views/publicmodel/test.vue";
import test1 from "../views/publicmodel/test1.vue";
import test2 from "../views/publicmodel/test2.vue";
import test3 from "../views/publicmodel/test3.vue";
import Admin from "@/views/Admin/Admin";
import NotFound from "@/views/NotFound";
import UserInfo from "@/views/publicmodel/UserInfo";
import MDCourse from "@/views/publicmodel/MDCourse";


import TimeTableForAdmin from "@/views/Admin/TimeTableForAdmin";
import ChangePassword from "@/views/publicmodel/ChangePassword";

import Teacher from "@/views/Teacher/Teacher";
import TimeTableForTeacher from "@/views/Teacher/TimeTableForTeacher";


export default [
	{
		path: '/',
		component: App,
		meta:{
			requireAuth: false,
			roles:['admin','student','teacher','user']
		},
		children: [
			{
				path: '',
				redirect: '/login',
				meta:{
					requireAuth: false,
					roles:['admin','student','teacher','user']
				}
			},
		]
	},
	{
		path: '/login',
		name: 'login',
		component: login,
		meta:{
			requireAuth: false,
			roles:['admin','student','teacher','user']
		}
	},
	{
		path: '/404',
		name: 'NotFound',
		component: NotFound,
		meta:{
			requireAuth: false,
			roles:['admin','student','teacher','user']
		}
	},
	{
		path: '/admin',
		name: 'admin',
		component: Admin,
		meta: {
			requireAuth: true,
			roles:['admin']
		},
		children: [
			{
				path: 'UserInfo',
				name: 'UserInfoForAdmin',
				component: UserInfo,
				meta:{
					requireAuth: true,
					roles:['admin']
				}
			},
			{
				path: 'changepassword',
				name:'ChangePasswordForAdmin',
				component: ChangePassword,
				meta: {
					requireAuth: true,
					roles: ['admin']
				}
			},
			{
				path: 'MDCourse',
				name: 'MDCourseForAdmin',
				component: MDCourse,
				meta:{
					requireAuth: true,
					roles:['admin']
				}
			},
			{
				path: 'test',
				name: 'test',
				component: test,
				meta:{
					requireAuth: true,
					roles:['student','teacher','user']
				}
			},
			{
				path: 'test1',
				name: 'test1',
				component: test1,
				meta:{
					requireAuth: true,
					roles:['admin']
				}
			},
			{
				path: 'test2',
				name: 'test2',
				component: test2,
				meta:{
					requireAuth: true,
					roles:['admin']
				}
			},
			{
				path: 'TimeTableForAdmin',
				name: 'TimeTableForAdmin',
				component: TimeTableForAdmin,
				meta:{
					requireAuth: true,
					roles:['admin']
				}
			},
			{
				path: 'test3',
				name: 'test3',
				component: test3,
				meta:{
					requireAuth: true,
					roles:['admin']
				}
			},
		]
	},
	{
		path: '/teacher',
		name: 'teacher',
		component: Teacher,
		meta: {
			requireAuth: true,
			roles:['teacher']
		},
		children: [
			{
				path: 'UserInfo',
				name: 'UserInfoForTeacher',
				component: UserInfo,
				meta:{
					requireAuth: true,
					roles:['teacher']
				}
			},
			{
				path: 'changepassword',
				name:'ChangePasswordForTeacher',
				component: ChangePassword,
				meta: {
					requireAuth: true,
					roles: ['teacher']
				}
			},
			{
				path: 'MDCourse',
				name: 'MDCourseForTeacher',
				component: MDCourse,
				meta:{
					requireAuth: true,
					roles:['teacher']
				}
			},
			{
				path: 'test',
				name: 'test',
				component: test,
				meta:{
					requireAuth: true,
					roles:['student','teacher','user']
				}
			},
			{
				path: 'test1',
				name: 'test1',
				component: test1,
				meta:{
					requireAuth: true,
					roles:['teacher']
				}
			},
			{
				path: 'test2',
				name: 'test2ForTeacher',
				component: test2,
				meta:{
					requireAuth: true,
					roles:['teacher']
				}
			},
			{
				path: 'TimeTableForTeacher',
				name: 'TimeTableForTeacher',
				component: TimeTableForTeacher,
				meta:{
					requireAuth: true,
					roles:['teacher']
				}
			},
			{
				path: 'test3',
				name: 'test3ForTeacher',
				component: test3,
				meta:{
					requireAuth: true,
					roles:['teacher']
				}
			},
		]
	},
	{
		path: '*',
		name: '*',
		component: login,
		meta:{
			requireAuth: false,
			roles:['admin','student','teacher','user']
		}
	},
];

