import moment from "moment";

export default {
    methods: {
        loadTable() {
            if (this.isCollectionList) {
                this.loadByUrl(this.$store.state.url + 'buckets/' + this.$route.params.id + "/collections");
            } else {
                this.loadByUrl(this.$store.state.url + 'buckets');
            }

        },
        dateFormat(row, column, cellValue, index) {
            if (cellValue) {
                return moment(cellValue).format('DD/MM/YYYY hh:mm')
            }
        },
        loadByUrl(url) {
            this.$http.get(url, {headers: {'Authorization': 'Basic ' + this.$store.getters.authorization}})
                .then(res => {
                    for (let item in res.data.data) {
                        this.tableData.push({
                            "id": res.data.data[item].id,
                            "lastModified": res.data.data[item].last_modified
                        })
                    }
                })
                .catch(reason => {
                    console.error(reason);
                    this.tableData = [];
                })
        },
        show(row) {
            if (this.isCollectionList) {
                this.$router.replace("/buckets/" + this.$route.params.id + "/collections/" + row.id, function () {
                }, function () {
                })
            } else {
                this.$router.replace("/buckets/" + row.id, function () {
                }, function () {
                })
            }
        },
        deleteRow(row, isCollection) {
            let url = "";
            let item = "";
            if (isCollection) {
                url = this.$store.state.url + 'buckets/' + this.$route.params.id + "/collections/" + row.id;
                item = "Collection";
            } else {
                url = this.$store.state.url + 'buckets/' + row.id;
                item = "Bucket";
            }
            this.$http.delete(url, {headers: {'Authorization': 'Basic ' + this.$store.getters.authorization}})
                .then(value => {
                    this.$router.replace("/buckets", function () {
                    }, function () {
                    });
                    this.$message.success(item + " removed successfully!");
                    let root = this.$root.$refs.tree.$data.root;
                    root.store.load({level : 0 , label : ""}, function(data){
                        root.childNodes = [];
                        root.doCreateChildren(data);
                    });
                })
                .catch(error => {
                    console.error(error);
                    this.$message.error(error.body);
                });
        },
        goToAddCollectionView() {
            this.$router.replace("/add-collection/" + this.$route.params.id, function () {
            }, function () {
            })
        },
        goToAddBucketView() {
            this.$router.replace("/add-bucket", function () {
            }, function () {
            })
        }
    },
    created() {
        this.loadTable();
    },
    data() {
        return {
            tableData: [],
            isCollectionList: !!this.$route.params.id
        }
    },
}