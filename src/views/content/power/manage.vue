<template>
  <div class="list-box">
    <div>
      <el-table
        :data="roleList"
        border stripe
        style="width: 100%">
        <!--展开列-->
        <el-table-column type="expand"></el-table-column>
      <!--索引列-->
        <el-table-column type="index"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作" >
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete"size="mini">删除</el-button>
            <el-button type="warning" icon="el-icon-setting"size="mini" @click="showSetRightDialog(scope.row)">分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
<!--分配权限-->
    <el-dialog
      title="分配权限"
      :visible.sync="setRightDialogVisiable"
      width="50%" @close="setRightDialogClosed">
<!--树形控件-->
      <el-tree :data="rightslist" :props="treeProps"
               show-checkbox
               node-key="id"
               default-expand-all
               :default-checked-keys="defKeys" ref="treeRef"></el-tree>
      <span slot="footer" class="dialog-footer">
    <el-button @click="setRightDialogVisiable = false">取 消</el-button>
    <el-button type="primary" @click="allotRights">确 定</el-button>
  </span>
    </el-dialog>

  </div>
</template>

<script>
import admin from '../../../api/admin'

export default {
  data () {
    return {
      roleList: [],
      setRightDialogVisiable:false,
      rightslist:[],
      treeProps: {
        children: 'childMenu',
        label: 'name'
      },
      //默认选中节点id
      defKeys:[],
      //即将分配权限的id
      roleId:'',
    }
  },
  methods: {
    //分配权限确定
    allotRights(){
      //拿到所有的key
      const keys = [
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys()
      ]
      const  idStr = keys.join(',')
      console.log(keys);
    },
    getRoleList () {
      admin.roleList().then((res) => {
          this.roleList = res.data.data
      })

    },
    //展示分配权限对话框
    showSetRightDialog(role){
      this.roleId = role.id;
      //获取所有权限数据
      admin.powerAllList().then((response) =>{
        if(response.data.code == 200){
          this.rightslist = response.data.data
          console.log(this.rightslist)
        }
      })
      //递归获取3级节点id

      this.getLeafKeys(role,this.defKeys)
      this.setRightDialogVisiable = true;
    },

    //监听分配权限关闭对话框
    setRightDialogClosed(){
      this.defKeys = []
    },
    //通过递归形式获取角色下3级权限id
    getLeafKeys(node,arr){
      if(!node.childMenu){
        //如果当前node节点不包含childMenu则是3级节点

        return arr.push( parseInt(node.id))
      }
      node.childMenu.forEach(item =>
      this.getLeafKeys(item,arr))
    }




  },
  mounted () {

    this.getRoleList()
  },

}
</script>
<style>
.list-box {
  box-shadow: 0 1px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  margin-top: 5px;
}
</style>
