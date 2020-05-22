<template>
  <div class="home-box">
    <el-container style="height: 500px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1', '1']">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>导航一</template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="1-1">选项1</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>   
      <el-main>
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column label="供应商" width="140">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.supplierContact }}</span>
            </template>
          </el-table-column>

          <el-table-column label="姓名" width="120">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.supplierName }}</span>
            </template>
          </el-table-column>

          <el-table-column label="联系电话" width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.phone }}</span>
            </template>
          </el-table-column>

          <el-table-column label="预付款" width="100">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.address }}</span>
            </template>
          </el-table-column>

          <el-table-column label="应付款" width="100">
            <template >
              <span style="margin-left: 10px">0</span>
            </template>
          </el-table-column>

          <el-table-column label="状态" width="80">
            <template slot-scope="scope">
              <span v-if="scope.row.status" style="margin-left: 10px"><el-tag type="success">启用</el-tag></span>
              <span v-else style="margin-left: 10px"><el-tag type="danger">禁用</el-tag></span>
            </template>
          </el-table-column>

          <el-table-column label="描述" width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.description }}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
    <el-dialog
      title="修改"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <el-form :label-position="labelPosition" label-width="80px" :model="datas">
        <el-form-item label="供应商名称">
          <el-input v-model="datas.supplierContact"></el-input>
        </el-form-item>
        <el-form-item label="供应商联系人">
          <el-input v-model="datas.supplierName"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="datas.phone"></el-input>
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input v-model="datas.address"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-input v-model="datas.status"></el-input>
        </el-form-item>
        <el-form-item label="备注信息">
          <el-input v-model="datas.description"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updata">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="添加"
      :visible.sync="isAd"
      width="30%"
      :before-close="handleClose">
      <el-form :label-position="labelPosition" label-width="80px" :model="datas">
        <el-form-item label="供应商名称">
          <el-input v-model="datas.supplierContact"></el-input>
        </el-form-item>
        <el-form-item label="供应商联系人">
          <el-input v-model="datas.supplierName"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="datas.phone"></el-input>
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input v-model="datas.address"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-input v-model="datas.status"></el-input>
        </el-form-item>
        <el-form-item label="备注信息">
          <el-input v-model="datas.description"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isAd = false">取 消</el-button>
        <el-button type="primary" @click="adddata">确 定</el-button>
      </span>
    </el-dialog>
    <el-button type="primary" @click="tj">添加</el-button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import './styles.less'
export default {
  
  created() {
    this['FETCH_MR_ACTION']()
  }, 
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      labelPosition: 'right',
      isAd: false,
      datas: {
        address: '',
        supplierName: '',
        phone: '',
        supplierContact: '',
        status: '',
        description: '',
        supplierId: '',
      }
    }
  },
  watch: {
    data(data) {
      this.tableData = data
    },
    isDel(isDel) {
      if(isDel){
        this['FETCH_MR_ACTION']()
      }
    },
    isUpd(isUpd) {
       if(isUpd){
        this['FETCH_MR_ACTION']()
      }
    },
    isADD(isADD) {
       if(isADD){
        this['FETCH_MR_ACTION']()
      }
    }
  },
  methods: { 
    adddata() {
      this.isAd = false
      this['FETCH_ADD_ACTION'](this.datas)
    },
    tj() {
      let addDa = {
        address: '',
        supplierName: '',
        phone: '',
        supplierContact: '',
        status: '',
        description: '',
        supplierId: '',
      }
      this.datas =  addDa
      this.isAd = true
   
    },
    updata() {
      this.dialogVisible = false
      this['FETCH_UPD_ACTION'](this.datas)
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    handleEdit(index, row) {
      this.dialogVisible = true
      this.datas = {...this.datas, ...row}
    },
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this['FETCH_DEL_ACTION']({id: row.supplierId})
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      
    },
    ...mapActions('home', 
      [
        'FETCH_MR_ACTION',
        'FETCH_DEL_ACTION',
        'FETCH_UPD_ACTION',
        'FETCH_ADD_ACTION',
      ]
    )
  },
  computed: {
    ...mapState('home', ['data', 'isDel', 'isUpd', 'isADD'])
  }
};
</script>

