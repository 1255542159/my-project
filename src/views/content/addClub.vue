<template>
  <div class="club-box">

    <div class="user-info-list-part">
      <el-form label-width="100px" class="demo-ruleForm" v-if="club !== null" size="medium">
        <el-form-item label="社团名" required>
          <el-input type="text" v-model="club.clubName"></el-input>
        </el-form-item>

        <el-form-item label="创立者" required>
          <el-input type="text" v-model="club.clubCreator"></el-input>
        </el-form-item>

        <el-form-item label="负责人ID" required>
          <el-input type="text" v-model="club.leaderId"></el-input>
        </el-form-item>

        <el-form-item label="社团介绍" required>
          <el-input type="textarea" :rows="5" v-model="club.clubIntroduce"></el-input>
        </el-form-item>

        <el-form-item label="社团描述" required>
          <el-input type="textarea" :rows="5" v-model="club.clubDesc"></el-input>
        </el-form-item>

        <el-form-item label="社团照片" required>
          <el-upload
            class="avatar-uploader"
            name="file"
            drag
            action="/api/user/image/uploadImage"
            :show-file-list="false"
            :on-success="uploadSuccess"
            multiple>
            <el-image fit="cover" v-if="club.clubImg" :src="club.clubImg" ></el-image>
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addClub">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>

</template>

<script>

import club from '../../api/club'

export default {
  data () {
    return {
      club: {
        clubName:'',
        clubCreator:'',
        leaderId:'',
        clubIntroduce:'',
        clubDesc:'',
        clubImg:''
      }

    }

  },
  methods:{
    /*图片上传成功*/
    uploadSuccess(res,file){
    console.log("图片上传成功 ==>"+res.data)
      /*对图片进行处理*/
      this.club.clubImg = res.data;
    },

    addClub(){
      //检查数据
      if (this.club.clubName === '') {
        this.showWarrning('社团名不能为空');
        return;
      }
      if (this.club.clubCreator === '') {
        this.showWarrning('创立者不能为空');
        return;
      }

      if (this.club.leaderId === '') {
        this.showWarrning('负责人ID不能为空');
        return;
      }

      if (this.club.clubIntroduce === '') {
        this.showWarrning('社团介绍不能为空');
        return;
      }

      if (this.club.clubDesc === '') {
        this.showWarrning('社团描述不能为空');
        return;
      }

      if (this.club.clubImg === '') {
        this.showWarrning('图片不能为空');
        return;
      }
      club.addClub(this.club).then(resp => {
        if(resp.data.code === 200){
        this.showSuccess(resp.data.msg)
        this.club.clubName = '',
        this.club.clubCreator = '',
        this.club.leaderId = '',
        this.club.clubDesc = '',
        this.club.clubIntroduce = '',
        this.club.clubImg = '';

        }
      })
    },
    showWarrning(msg){
      this.$message({
        message:msg,
        type:'warning',
        center:true
      })
    },
      showSuccess(msg){
      this.$message({
        message:msg,
        type:'success',
        center:true
      })
    },
  }
}

</script>

<style scoped>
.user-info-avatar {
  display: inline-block;

}

.club-box .el-input {
  width: 250px;
}

.updateEmail {
  margin-left: 20px;
}

.user-avatar-container {
  width: 100px;
  cursor: pointer;
}

.el-textarea {
  width: 400px;
  resize: none

}

.article-cover-selector {
  cursor: pointer;
  width: 200px;
  height: 160px;
  border: #dcdfe6 dashed 1px;
  border-radius: 4px;
  text-align: center;
}

.article-cover-selector i {
  font-size: 20px;
  line-height: 140px;
  color: #dcdfe6;
}

.article-cover-selector img {
  width: 200px;
  height: 140px;

}

.user-info-list-part{
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 10px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.avatar-uploader.el-upload__input{
    display: none;
}
</style>
