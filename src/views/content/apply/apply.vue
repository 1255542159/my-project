<template>
  <div class="club-box">
    <div class="user-info-list-part">
      <el-form label-width="100px" class="demo-ruleForm" size="medium">
        <el-form-item label="类型">
          <el-select v-model="audit.type" placeholder="请选择" @change="currentType">
            <el-option v-for="item in typeData" :key="item.type" :label="item.label" :value="item.type">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="部门">
          <el-select v-model="audit.clubId" placeholder="请选择" @change="currentSel" :disabled="dep">
            <el-option v-for="item in clubList" :key="item.id" :label="item.clubName" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="时长" required>
          <el-select v-model="audit.leaveTime" placeholder="请选择" @change="currentTime" :disabled="visible">
            <el-option v-for="item in time" :key="item.type" :label="item.label" :value="item.type">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="描述" required>
          <el-input type="textarea" :rows="3" placeholder="入团理由" v-model="audit.description">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="apply" style="margin-left: 65px" v-text="postOrUpdate">申请</el-button>
        </el-form-item>

      </el-form>
    </div>
  </div>
</template>

<script>
import club from '../../../api/club'
import user from '../../../api/user'

export default {
  data () {
    return {
      postOrUpdate:'申请',
      dep: true,
      visible: true,
      showAvatar: false,
      clubList: [],
      audit: {
        clubId: '',
        description: '',
        type: '',
        leaveTime: '',
      },
      typeData: [{
        type: 'join',
        label: '入团'
      }, {
        type: 'quit',
        label: '退团'
      }, {
        type: 'leave',
        label: '请假'
      }
      ],
      time: [{
        type: 1,
        label: '1天'
      }, {
        type: 2,
        label: '2天'
      },
        {
          type: 3,
          label: '3天'
        }
      ]

    }
  },
  methods: {
    currentTime (selVa) {
      this.audit.leaveTime = selVa
    },
    currentSel (selVa) {
      this.audit.clubId = selVa
    },
    currentType (selVa) {
      this.audit.type = selVa
      if (selVa == 'leave') {
        this.visible = false
        this.dep = true
      } else {
        this.visible = true
        this.dep = false
      }
    },
    //获取全部的社团不分页
    getClubList () {
      club.clubList().then((response) => {
        if (response.data.code === 200) {
          this.clubList = response.data.data
        }
      })
    },
    apply () {
      //根据选择类型来进行不同的判断
      if (this.audit.type === 'leave') {
        //请假类型
        if (this.audit.leaveTime === '') {
          this.$message.error('请假时长不能为空')
          return
        }

      }else {
        //检查数据
        if (this.audit.clubId === '') {
          this.$message.error('部门不能为空')
          return
        }
      }
      if (this.audit.description === '') {
        this.$message.error('理由不能为空')
        return
      }
      //判断是更新还是申请
      user.auditJoin(this.audit).then((resp) => {
        if (resp.data.code === 200) {
          this.$message.success(resp.data.msg)
          //成功后将输入框置空
          this.audit = ''
        }
      })
    },
  },
  mounted () {
    if (this.$route.params.audit != null) {
      this.postOrUpdate = "更新"
      this.audit = this.$route.params.audit;
    }
    this.getClubList()
  },
}
</script>

<style>
.user-info-list-part {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 10px;
}

.avatar-uploader i {
  line-height: 140px;
  color: #DCDFE6;
  font-size: 20px;
}
</style>
