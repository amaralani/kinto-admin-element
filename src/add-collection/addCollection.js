export default {
    data() {
        return {
            collectionName: '',
            bucketId: this.$route.params.bucketId
        }
    },
    methods: {
        saveCollection() {
            this.$http.post(this.$store.state.url + 'buckets/' + this.bucketId + "/collections",
                {
                    "data": {
                        "id": this.collectionName
                    }
                }, {headers: {'Authorization': 'Basic ' + this.$store.getters.authorization}})
                .then(function () {
                    this.$router.replace("/buckets/" + this.bucketId, function () {
                    }, function () {
                    });
                    let root = this.$root.$refs.tree.$data.root;
                    root.store.load({level : 0 , label : ""}, function(data){
                        root.childNodes = [];
                        root.doCreateChildren(data);
                    });
                    this.$message.success("Collection added successfully!");
                }).catch(error => {
                console.error(error);
                this.$message.error(error.body.message);
            });
        }
    }
}