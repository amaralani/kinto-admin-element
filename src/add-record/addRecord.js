export default {
    data() {
        return {
            error: null,
            recordData: '',
            bucketId: this.$route.params.bucketId,
            collectionId: this.$route.params.collectionId
        }
    },
    methods: {
        saveRecords() {
            this.$http.post(this.$store.state.url+'buckets/' + this.bucketId + "/collections/" + this.collectionId + "/records",
                '{"data":' + this.recordData + '}',
                {headers: {'Authorization': 'Basic '+this.$store.getters.authorization, "Content-Type": "application/json"}})
                .then(function () {
                    this.$router.replace("/buckets/" + this.bucketId + "/collections/" + this.collectionId, function () {
                    }, function () {
                    });
                    this.$message.success("Record added successfully!");
                }).catch(error => {
                this.$message.error(error.body);
                console.error(error);
            });
        }
    }
}