import Router from 'vue-router';
import Home from './home/Home'
import Login from './login/Login'
import Buckets from './buckets/Buckets'
import Collections from './collections/Collections'
import AddCollection from './add-collection/AddCollection'
import AddRecord from './add-record/AddRecord'
import AddBucket from './add-bucket/AddBucket'
import Vue from 'vue';

Vue.use(Router);

export default new Router({
    routes: getRoutes()
});

function getRoutes() {
    return [
        {
            path: "/",
            name: "default",
            alias: "",
            component: Home,
            meta : {
                requiresAuth : true
            }
        },
        {
            path: "/login",
            name: "Login",
            alias: "",
            component: Login,
            meta : {
                requiresAuth : false
            }
        },
        {
            path: '/home',
            name: 'Home',
            component: Home,
            meta : {
                requiresAuth : true
            }
        },
        {
            path: '/buckets',
            name: "Buckets",
            component: Buckets,
            meta: {
                breadcrumbItems: [{title: 'Buckets', route: "/buckets"}],
                requiresAuth : true
            }
        },
        {
            path: '/buckets/:id',
            name: "Collections",
            component: Buckets,
            meta: {
                breadcrumbItems: [{title: 'Buckets', route: "/buckets"},{title: 'Collections'}],
                requiresAuth : true
            }
        },
        {
            path: '/buckets/:bucketId/collections/:id',
            name: "Collections",
            component: Collections,
            meta: {
                breadcrumbItems: [{title: 'Buckets', route: "/buckets"}, {title: 'Collections'},{title: 'Records'}],
                requiresAuth : true
            }
        },
        {
            path: '/add-bucket',
            name: "Add Bucket",
            component: AddBucket,
            meta: {
                breadcrumbItems: [],
                requiresAuth : true
            }
        },
        {
            path: '/add-collection/:bucketId',
            name: "Add Collection",
            component: AddCollection,
            meta: {
                breadcrumbItems: [{title: 'Buckets', route: "/buckets"},{title: 'Collections'}],
                requiresAuth : true
            }
        },
        {
            path: '/add-record/:bucketId/:collectionId',
            name: "Add Record",
            component: AddRecord,
            meta: {
                breadcrumbItems: [{title: 'Buckets', route: "/buckets"},{title: 'Collections'}],
                requiresAuth : true
            }
        }
    ]
}