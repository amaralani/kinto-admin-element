import moment from "moment";

export default {
    methods: {
        loadRecordsTable() {
            this.$http.get(this.$store.state.url +'buckets/' + this.$route.params.bucketId + "/collections/" + this.$route.params.id + "/records",
                {headers: {'Authorization': 'Basic '+this.$store.getters.authorization}})
                .then(res => {
                    for (let item in res.data.data) {
                        this.tableData.push({
                            "data": JSON.stringify(res.data.data[item]),
                            "lastModified": res.data.data[item].last_modified
                        })
                    }
                })
                .catch(reason => {
                    console.error(reason);
                    this.tableData = [];
                })
        },
        dateFormat(row, column, cellValue, index) {
            if (cellValue) {
                return moment(cellValue).format('DD/MM/YYYY hh:mm')
            }
        },
        show(row) {
            this.$router.replace("/buckets/" + this.$route.params.bucketId + "/collections/" + this.$route.params.id + "/records/", function () {
            }, function () {
            })
        },
        goToRecordView() {
            this.$router.replace("/add-record/" + this.$route.params.bucketId + "/" + this.$route.params.id, function () {
            }, function () {
            })
        }
    },
    created() {
        this.loadRecordsTable();
    },
    data() {
        return {
            tableData: []
        }
    },
}

