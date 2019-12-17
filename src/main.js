import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueResource from "vue-resource";
import router from './router';
import moment from 'moment'
import store from './store'


Vue.use(ElementUI);
Vue.use(VueResource);

Vue.filter('formatDate', function (value) {
    if (value) {
        return moment(String(value)).format('MM/DD/YYYY hh:mm')
    }
});

new Vue({
    el: '#app',
    router,
    store,
    data() {
        return {
            message: 'Hello!',
            filterText: '',
            defaultProps: {
                label: 'name',
                children: 'children',
                isLeaf: 'leaf'
            },
            showHeader: store.state.isLoggedIn,
            showSideContents: store.state.isLoggedIn
        }
    },
    mounted() {
        if(!store.state.isLoggedIn) {
            router.replace("/login");
        }
    },
    watch: {
        filterText(val) {
            this.$refs.tree.filter(val);
        }
    },
    methods: {
        filterNode(value, data) {
            if (!value) return true;
            return data.name.indexOf(value) !== -1;
        },
        reloadTree() {
            let root = this.$refs.tree.$data.root;
            root.store.load({level : 0 , label : ""}, function(data){
                root.childNodes = [];
                root.doCreateChildren(data);
            });
        },
        loadNodes(node, resolve) {
            let url = "";
            if (node.level === 0) {
                url = "buckets";
                return this.loadData(url, false, resolve);
            }

            if (node.level === 1) {
                for (let child in node.childNodes) {
                    child.remove();
                }
                url = "buckets/" + node.label + "/collections";
                return this.loadData(url, false, resolve);
            }

            return resolve([]);
        },
        loadData(url, isLeaf, resolve) {
            this.$http.get(store.state.url + url, {headers: {'Authorization': 'Basic ' + store.getters.authorization}})
                .then(function (res) {
                    let nodes = [];
                    for (let item in res.data.data) {
                        nodes.push({
                            name: res.data.data[item].id,
                            children: null,
                            leaf: isLeaf,
                            link: url + "/" + res.data.data[item].id
                        })
                    }
                    resolve(nodes);
                }).catch(function (error) {
                console.error(error);
                return resolve([])
            });
        },
        handleNodeClick(node, nodeProperty, treeNode) {
            this.$router.replace("/" + node.link, function () {
            }, function () {
            });
        },
        goToAddBucketView() {
            this.$router.replace("/add-bucket", function () {
            }, function () {
            })
        },
        logout(){
            store.commit("logout");
            this.$router.replace("login");
        }
    }
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.state.isLoggedIn) {
            next();
        } else
            next("login")
    } else {
        next()
    }
});

