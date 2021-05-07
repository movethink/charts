<template>
  <div>
    <p><button @click="loop(tree)">loop</button></p>
  </div>
</template>
<script>
export default {
  name: "Tree",
  data() {
    return {
      tree: {
        key: 1,
        value: 1,
        children: [
          {
            key: 2,
            value: 2,
            children: [
              {
                key: 4,
                value: 4,
              },
              {
                key: 5,
                value: 5,
              },
            ],
          },
          {
            key: 3,
            value: 3,
            children: [
              {
                key: 6,
                value: 6,
              },
              {
                key: 7,
                value: 7,
              },
            ],
          },
        ],
      },
    };
  },
  components: {},
  methods: {
    /**
     * 深度优先
     */
    DFS(tree) {
      let list = [];
      const recursion = (node) => {
        list.push(node);
        if (node.children && node.children.length > 0) {
          for (let i = 0; i < node.children.length; i++) {
            recursion(node.children[i]);
          }
        }
      };
      recursion(tree);
      return list;
    },
    /**
     * 广度优先
     */
    BFS(tree) {
      let queue = [];
      let list = [];
      queue.unshift(tree);
      while (queue.length > 0) {
        let current = queue.shift();
        list.push(current);
        if (current.children && current.children.length > 0) {
          for (let i = 0; i < current.children.length; i++) {
            queue.push(current.children[i]);
          }
        }
      }
      return list;
    },
    loop(tree) {
      let list = [];
      list = this.BFS(tree);
      console.log(list, "list");
    },
  },
  mounted() {
    console.log(this.tree, "tree");
  },
};
</script>

<style scoped>
h6 {
  color: red;
}
</style>
