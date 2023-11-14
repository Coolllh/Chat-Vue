<template>
  <div>
    <div class="custom-tree-container">
      <div class="block">
        <p>使用 scoped slot</p>
        <el-tree
          :data="data1"
          show-checkbox
          node-key="id"
          default-expand-all
          :expand-on-click-node="false"
        >
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
            <span>
              <el-button type="text" size="mini" @click="() => append(data)">
                添加
              </el-button>
              <el-button
                type="text"
                size="mini"
                @click="() => remove(node, data)"
              >
                删除
              </el-button>
              <el-button type="text" size="mini" @click="() => update(data)">
                修改
              </el-button>
              <el-button
                type="text"
                size="mini"
                @click="() => queryChild(data)"
              >
                查询
              </el-button>
            </span>
          </span>
        </el-tree>
      </div>
    </div>
  </div>
</template>
<script>
import axiosInstance from "@/store/request";

class TreeNode {
  constructor(id, label) {
    this.id = id;
    this.label = label;
    this.children = [];
  }
}

export default {
  data() {
    const data1 = [];
    const childTree1=[]
    return {
      data1: JSON.parse(JSON.stringify(data1)),
      childTree1:JSON.parse(JSON.stringify(childTree1))
    };
  },
  created() {
    console.log("hahaa");
    this.treeLoadOn();
  },
  methods: {
    open() {
      const h=this.$createElement
      const treeComponent=h('el-tree',{
        props:{
          data:this.childTree1,
          "show-checkbox":false,
          nodeKey:"id",
          "default-expand-all":true,
          "expand-on-click-node":false
        }
      });
      this.$alert(treeComponent, "这是他的子树", {
        dangerouslyUseHTMLString: true,
        confirmButtonText: "确定",
        callback: () => {
          this.$message({
            type: "success",
            message: `退出成功`,
          });
        },
      });
    },
    queryChild(data) {
      axiosInstance.post("/getTree").then((response) => {
        this.childTree1 = this.buildTree(response.data, data.id);
        console.log(this.childTree1);
        this.open()
      });
    },

    buildTree(respdata, father) {
      const tree = [];
      for (const item of respdata) {
        if (item.father === father) {
          const treeNode = new TreeNode(item.id, item.label);
          treeNode.children = this.buildTree(respdata, treeNode.id);
          tree.push(treeNode);
        }
      }
      console.log(tree + "this is");
      return tree;
    },
    treeLoadOn() {
      console.log("asdsaad");
      axiosInstance.post("/getTree").then((response) => {
        if (response && response.status === 200) {
          console.log(response.data);
          this.data1 = this.buildTree(response.data, 0);
          console.log(this.data1);
        }
      });
    },
    append(data) {
      axiosInstance
        .get("/addNode", {
          params: {
            label: "newNode",
            father: data.id,
          },
        })
        .then((response) => {
          const newChild = {
            id: response.data,
            label: "newNode",
            children: [],
          };
          if (!data.children) {
            this.$set(data, "children", []);
          }
          data.children.push(newChild);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex((d) => d.id === data.id);
      children.splice(index, 1);
      axiosInstance
        .get("/delNode", {
          params: {
            id: data.id,
          },
        })
        .catch((error) => {
          console.log(error);
        });
    },
    update(data) {
      this.$prompt("请输入节点名称", "修改节点名称", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(({ value }) => {
          axiosInstance.get("/updateNode", {
            params: {
              id: data.id,
              label: value,
            },
          });
          data.label = value;
          this.$message({
            type: "success",
            message: "修改后的节点名称为 " + value,
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
  },
};
</script>


  

<style>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>