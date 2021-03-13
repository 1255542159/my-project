<template>
<div class="box">
    <div class="search-box">
        <!-- <el-form style="
          margin-top: 10px;
          margin-left: 10px;
          font-size: large;
          font-weight: bold;
        ">
            <el-form-item label="按活动名:">
                <el-input type="text" style="width: 200px" v-model="searchValue" @keypress.enter.native="searchPersonnel"></el-input>
                <el-button class="login-button" type="primary" @click="searchPersonnel">搜索</el-button>
            </el-form-item>
        </el-form> -->
    </div>

    <div class="list-box">
        <el-table v-loading="loading" :data="activity" :row-class-name="tableRowClassName" style="width: 100%" class="el-table">
            <el-table-column prop="id" label="id" width="50"> </el-table-column>
            <el-table-column prop="activityName" label="活动名" width="150">
            </el-table-column>
            <el-table-column prop="activityCreator" label="发起人" width="120">
            </el-table-column>
            <el-table-column prop="activityDesc" label="活动描述" width="200">
            </el-table-column>

            <el-table-column label="创立时间" width="100">
                <template slot-scope="scope">
                    <span v-text="formatDate(scope.row.createdTime)"> </span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button @click="edit(scope.row)" type="primary" size="mini">编辑</el-button>
                    <el-button @click="deleteItem(scope.row)" type="danger" size="mini">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="page-navigation-box margin-bottom clearfix">
            <el-pagination class="user-list-page-navigation-bar" background @current-change="currentPageChange" :current-page="pageNavigation.currentPage" :page-size="pageNavigation.pageSize" layout="prev, pager, next" :total="pageNavigation.totalCount">
            </el-pagination>
        </div>
    </div>
    <div class="club-dialog">
        <el-dialog title="提示" :visible.sync="deleteDialogShow" width="400px">
            <span>你确定要删除 '{{ deleteMassage }}' 这个成员吗</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="deleteDialogShow = false">取 消</el-button>
                <el-button type="danger" @click="doDeleteItem">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</div>
</template>

<script>
import user from "../../api/user";
import * as dateUtils from "../../utils/date";
export default {
    data() {
        return {
            default_value: "",
            searchValue: "",
            value: "",
            loading: false,
            deleteDialogShow: false,
            editorDialogShow: false,
            editorCommitText: "修改活动",
            editTitle: "编辑活动",
            deleteMassage: "",
            deleteTargetId: "",
            pageNavigation: {
                currentPage: 1,
                totalCount: 0,
                pageSize: 5,
            },
            activity: [],
            activityList: [],
            personnelList: {
                id: "",
                nickName: "",
                sex: "",
                avatar: "",
                phone: "",
                email: "",
                sign: "",
                state: "",
                createdTime: "",
                updatedTime: "",
                clubId: "",
                club: {
                    id: "",
                    clubName: "",
                },
            },
            item: {},
        };
    },
    methods: {
        currentPageChange(page) {
            this.pageNavigation.currentPage = page;
            this.getPersonnelList();
        },

        closeDialog() {
            this.resetLooper();
            this.editorDialogShow = false;
        },

        tableRowClassName({ row, rowIndex }) {
            if (rowIndex === 1 || rowIndex === 5) {
                return "warning-row";
            } else if (rowIndex === 3 || rowIndex === 7) {
                return "success-row";
            }
            return "";
        },
        formatDate(dateStr) {
            let date = new Date(dateStr);
            return dateUtils.formatDate(date, "yyyy-MM-dd");
        },
        deleteItem(item) {
            //不是马上删除，而是给出警告提示
            this.deleteDialogShow = true;
            this.deleteMassage = item.nickName;
            this.deleteTargetId = item.id;
        },
        doDeleteItem() {
            club.deleteActivity(this.deleteTargetId).then((resp) => {
                if (resp.data.code === 200) {
                    this.getActivityList();
                }
            });
            this.deleteDialogShow = false;
        },
        getActivityList() {
            this.loading = true;
            user
                .getActivityList(
                    this.pageNavigation.currentPage,
                    this.pageNavigation.pageSize
                )
                .then((response) => {
                    if (response.data.code === 200) {
                        this.loading = false;
                        this.activity = response.data.data.list;
                        this.pageNavigation.currentPage = response.data.data.pageNum;
                        this.pageNavigation.pageSize = response.data.data.pageSize;
                        this.pageNavigation.totalCount = response.data.data.total;
                    }
                });
        },

    },

    mounted() {
        this.getActivityList();

    },

    watch: {
        dialogWidth(val) {
            if (val - 100 > 1350) {
                this.dialogWidth = 1350 + 'px'
            } else {
                this.dialogWidth = val - 100 + 'px'
            }
        }

    }
};
</script>

<style>
.list-box {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    padding: 10px;
    margin-top: 5px;
}

.el-table .warning-row {
    background: oldlace;
}

.el-table .success-row {
    background: #f0f9eb;
}

.data-v-3cad7a59 {
    background: #409eff;
}

.loop-list-box .el-table {
    min-height: 300px;
}

.user-list-page-navigation-bar {
    float: right;
    margin-right: 50px;
    margin-top: 10px;
}

.el-dialog {
    width: 70%;
}
</style>
