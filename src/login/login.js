export default {
    data() {
        return {
            username: "",
            password: "",
            url: ''
        }
    },
    methods: {
        login() {
            let authHeader = window.btoa(this.username + ":" + this.password);
            this.$http.get(this.url, {headers: {'Authorization': 'Basic ' + authHeader}})
                .then(result => {
                    if (result.body.user) {
                        this.$store.commit("login", {username: this.username, password: this.password, url: this.url});
                        this.$root.$refs.tree.$data.root.loadData();
                        this.$router.replace("/home", function () {
                        }, function () {
                        });
                    } else {
                        this.$message.error("Authentication Failed.");
                    }
                }).catch(reason => {
                console.error(reason);
            })
        }
    },
    created() {

    }
}