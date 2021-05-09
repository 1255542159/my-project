<template>
<div class="box">
    <div class="list-box">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="全部" name="all">
                <!-- all -->
                <div class="success-content clearfix" v-for="(item, index) in activity" :key="index">
                    <div class="el-card is-hover-shadow">
                        <div class="el-card__body">
                            <div>
                                <!-- 标题 -->
                                <div class="item-title">
                                    <a v-bind:href="['/actId?id='+item.id]" v-text="item.title"></a>
                                </div>
                                <div class="item-content clearfix" v-text="'摘要:'+item.summary"></div>
                                <!-- 点赞，浏览 -->
                                <div class="item-info">
                                    <span class="el-tag el-tag--small el-tag--light" v-text="'查看数:'+item.viewCount"></span>
                                    <span class="el-tag el-tag--success el-tag--small el-tag--light" v-text="'参与数:'+item.joinCount"></span>
                                    <span class="el-tag el-tag--warning el-tag--small el-tag--light" v-if="item.status===1">已通过</span>
                                    <span class="el-tag el-tag--danger el-tag--small el-tag--light" v-if="item.status===2">审核中</span>
                                    <span class="el-tag el-tag--warning el-tag--small el-tag--light" v-if="item.status===3">未通过</span>
                                    <span class="el-tag el-tag--info el-tag--small el-tag--light" v-text="item.updateTime"></span>
                                    <!-- 编辑删除等 -->
                                    <div class="right-control">
                                        <span type="primary" size="mini" @click="edit(item)"><i class="el-icon-edit"></i>编辑
                                        </span>
                                        <span type="danger" size="mini" @click="deleteItem(item)"><i class="el-icon-delete"></i>删除
                                        </span>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="已通过" name="approved">
                <div class="success-content clearfix" v-for="(item, index) in activity" :key="index">
                    <div class="el-card is-hover-shadow">
                        <div class="el-card__body">
                            <div>
                                <!-- 标题 -->
                                <div class="item-title">
                                    <a v-bind:href="['/actId?id='+item.id]" v-text="item.title"></a>
                                </div>
                                <div class="item-content clearfix" v-text="'摘要:'+item.summary"></div>
                                <!-- 点赞，浏览 -->
                                <div class="item-info">
                                    <span class="el-tag el-tag--small el-tag--light" v-text="'查看数:'+item.viewCount"></span>
                                    <span class="el-tag el-tag--success el-tag--small el-tag--light" v-text="'参与数:'+item.joinCount"></span>
                                    <span class="el-tag el-tag--warning el-tag--small el-tag--light" v-if="item.status===1">已通过</span>
                                    <span class="el-tag el-tag--info el-tag--small el-tag--light" v-text="item.updateTime"></span>
                                    <!-- 编辑删除等 -->
                                    <div class="right-control">
                                        <span type="primary" size="mini" @click="edit(item)"><i class="el-icon-edit"></i>编辑
                                        </span>
                                        <span type="danger" size="mini" @click="deleteItem(item)"><i class="el-icon-delete"></i>删除
                                        </span>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="审核中" name="approving">
                <div class="success-content clearfix" v-for="(item, index) in activity" :key="index">
                    <div class="el-card is-hover-shadow">
                        <div class="el-card__body">
                            <div>
                                <!-- 标题 -->
                                <div class="item-title">
                                    <a v-bind:href="['/actId?id='+item.id]" v-text="item.title"></a>
                                </div>
                                <div class="item-content clearfix" v-text="'摘要:'+item.summary"></div>
                                <!-- 点赞，浏览 -->
                                <div class="item-info">
                                    <span class="el-tag el-tag--small el-tag--light" v-text="'查看数:'+item.viewCount"></span>
                                    <span class="el-tag el-tag--success el-tag--small el-tag--light" v-text="'参与数:'+item.joinCount"></span>
                                    <span class="el-tag el-tag--danger el-tag--small el-tag--light" v-if="item.status===2">审核中</span>
                                    <span class="el-tag el-tag--info el-tag--small el-tag--light" v-text="item.updateTime"></span>
                                    <!-- 编辑删除等 -->
                                    <div class="right-control">
                                        <span type="primary" size="mini" @click="edit(item)"><i class="el-icon-edit"></i>编辑
                                        </span>
                                        <span type="danger" size="mini" @click="deleteItem(item)"><i class="el-icon-delete"></i>删除
                                        </span>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="未通过" name="failed">
                <div class="success-content clearfix" v-for="(item, index) in activity" :key="index">
                    <div class="el-card is-hover-shadow">
                        <div class="el-card__body">
                            <div>
                                <!-- 标题 -->
                                <div class="item-title">
                                    <a v-bind:href="['/actId?id='+item.id]" v-text="item.title"></a>
                                </div>
                                <div class="item-content clearfix" v-text="'摘要:'+item.summary"></div>
                                <!-- 点赞，浏览 -->
                                <div class="item-info">
                                    <span class="el-tag el-tag--small el-tag--light" v-text="'查看数:'+item.viewCount"></span>
                                    <span class="el-tag el-tag--success el-tag--small el-tag--light" v-text="'参与数:'+item.joinCount"></span>
                                    <span class="el-tag el-tag--warning el-tag--small el-tag--light" v-if="item.status===3">未通过</span>
                                    <span class="el-tag el-tag--info el-tag--small el-tag--light" v-text="item.updateTime"></span>
                                    <!-- 编辑删除等 -->
                                    <div class="right-control">
                                        <span type="primary" size="mini" @click="edit(item)"><i class="el-icon-edit"></i>编辑
                                        </span>
                                        <span type="danger" size="mini" @click="deleteItem(item)"><i class="el-icon-delete"></i>删除
                                        </span>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
    <div class="page-navigation-box margin-bottom clearfix">
        <el-pagination class="user-list-page-navigation-bar" background @current-change="currentPageChange" :current-page="pageNavigation.currentPage" :page-size="pageNavigation.pageSize" layout="prev, pager, next" :total="pageNavigation.totalCount">
        </el-pagination>
    </div>
    <div class="activity-dialog">
        <el-dialog title="提示" :visible.sync="deleteDialogShow" width="400px">
            <span>你确定要删除 '{{deleteMassage}}' 这个活动吗</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="deleteDialogShow = false">取 消</el-button>
                <el-button type="danger" @click="doDeleteItem">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</div>
</template>

<script>
import user from "../../../api/user";
import * as dateUtils from "../../../utils/date";
export default {
    data() {
        return {
            activeName: 'all',
            status: 0,
            loading: false,
            deleteDialogShow: false,
            deleteMassage: "",
            deleteTargetId: "",
            pageNavigation: {
                currentPage: 1,
                totalCount: 0,
                pageSize: 5,
            },
            activity: []
        };
    },
    methods: {
        edit(item) {
            console.log(item)
            //跳转到发布页面
            this.$router.push({
                'path': '/activity/add',
                'name': '发布活动',
                params: { activity: item }

            });
        },
        currentPageChange(page) {
            this.pageNavigation.currentPage = page;
            this.getActivityList();
        },
        //标签页切换事件
        handleClick(tab, event) {
            //0表示全部1表示已通过，2审核中，3已拒绝
            this.status = tab.index;
            this.getActivityList();
        },
        deleteItem(item) {
            //不是马上删除，而是给出警告提示
            this.deleteDialogShow = true;
            this.deleteTargetId = item.id;
        },
        doDeleteItem() {
            user.deleteActivity(this.deleteTargetId).then((resp) => {
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
                    this.pageNavigation.pageSize, this.status
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

};
</script>

<style scoped>
.box{

}
.box .list-box {
       margin-right: 20px;

}

.el-card {
    margin-top: 10px;
}

.el-card__body {
    padding-top: 20px;
    padding-left: 20px;
    padding-bottom: 20px;
}

.el-card__body .item-title {
    font-weight: 600;
    line-height: 28px;
    font-size: 18px;
}

.el-card__body .item-title a {
    color: #000;
}

.success-content .item-content {
    margin-top: 10px;
}

.success-content .item-info {
    width: 1000px;
    margin-top: 20px;
    font-size: 14px;
    line-height: 14px;
    font-weight: 400;
}

.success-content .item-info .right-control {
    float: right;
}

.success-content .item-info .right-control {
    margin-left: 10px;
    color: #666;
    cursor: pointer;
    margin-right: 10px;
}

.success-content .item-info .right-control span {
    margin-left: 10px;
    color: #666;
    cursor: pointer;
    margin-right: 5px;
}

.user-list-page-navigation-bar {
    float: right;
    margin-right: 50px;
    margin-top: 10px;
}
</style>
