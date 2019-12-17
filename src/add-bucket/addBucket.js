export default {
    data() {
        return {
            bucketName: '',
        }
    },
    methods: {
        saveBucket() {
            this.$http.post(this.$store.state.url + 'buckets',
                {
                    "data": {
                        "id": this.bucketName
                    }
                }, {headers: {'Authorization': 'Basic '+this.$store.getters.authorization}})
                .then(function () {
                    this.$router.replace("/buckets/", function () {
                    }, function () {
                    });
                    this.$message.success("Bucket added successfully!");
                    let root = this.$root.$refs.tree.$data.root;
                    root.store.load({level : 0 , label : ""}, function(data){
                        root.childNodes = [];
                        root.doCreateChildren(data);
                    });
                }).catch(error => {
                console.error(error);
                this.$message.error(error.body.message);
            });
        }
    }
}