export default {
    data() {
        return {
            project_name: "",
            project_version: "",
            http_api_version: "",
            project_docs: "",
            url: "",
            settings: {batch_max_requests: '', readonly: false},
            user: {
                id: "",
                principals: [],
                bucket: ""
            },
            capabilities: {
                default_bucket: {description: '', url: ''},
                admin: {description: '', url: '', version: ""},
                accounts: {description: '', url: '', validation_enabled: ""},
                permissions_endpoint: {description: '', url: ''}
            }
        }
    },
    methods: {
        loadData() {
            this.$root.$refs.tree.$forceUpdate();
            this.$http.get(this.$store.state.url, {headers: {'Authorization': 'Basic '+this.$store.getters.authorization}})
                .then(result => {
                    this.project_name = result.body.project_name;
                    this.project_version = result.body.project_version;
                    this.http_api_version = result.body.http_api_version;
                    this.project_docs = result.body.project_docs;
                    this.url = result.body.url;
                    this.settings = result.body.settings;
                    this.capabilities = result.body.capabilities;
                    this.user = result.body.user;
                }).catch(reason => {
                console.error(reason);
            })
        }
    },
    created() {
        this.loadData();
    }
}