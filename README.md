# 元年图表转换组件

## 简介

元年图表转换中间件，转换可视化结构为标准 echarts options，并且美化为元年统一风格的样式。

- 可视化结构
  - 为元年多维库和关系库等后端输出的统一结构
- echarts options
  - 开源图表组件 echarts 中的标准配置项，把该配置项注入 echarts 中可以生成一个图

在 v3.0.0 版本后（包含 3.0.0），加入了 sdv 数据类型转 handson 数据类型的方法，使得能够合适的展示在 mdv-grid 中

中间件提供 3 个方法：

getEchartsData 转换约定的可视化结构为 echarts options，该 options 可以直接注入 echarts 中生成图表

formatToYNChart 转换 echarts options 为元年自定义的样式，该样式为元年内部使用的默认图样式

transformsTable 转换 sdv 数据，生成 handson table 数据

## 使用

#### 安装

```js
npm install yn-chart-middleware --save
```

注意，中间件宿主环境，需要安装 echarts。

#### 引入

```js
import {
  getEchartsData,
  formatToYNChart,
  transformsTable,
} from "yn-chart-middleware";
```

#### 使用

```js
// 生成echars options
let options = getEchartsData(mockLine, {
  hideNullValue: false, // 是否消除零值
  legendStrict: false, // 是否严格使用legend字段显示图的系列，主要用于legend中只有一个维度成员的情况
});
// 生成YN样式风格的echarts options
options = formatToYNChart(options, {
  completeXAxisName: false, // 是否使用完整的x轴名称
});

// sdv table数据生成handson table数据
let handsonData = transformsTable(sdvMock, {
  hideNullValue: false, // 是否消除空值
  mergeCells: true, // 是否合并行列
});
```

图配置项参数：

getEchartsData 方法会接收两个参数，第一个是可视化数据结构，第二个是配置项

| getEchartsData 配置项 | 默认值 | 含义                                                                           |
| --------------------- | ------ | ------------------------------------------------------------------------------ |
| hideNullValue         | false  | 是否去除图中的 null 值和零值                                                   |
| legendStrict          | false  | 是否严格使用 legend 字段显示图的系列，主要用于 legend 中只有一个维度成员的情况 |

formatToYNChart 方法会接收两个参数，第一个是标准 echarts options，第二个是配置项

| formatToYNChart 配置项 | 默认值 | 含义                                       |
| ---------------------- | ------ | ------------------------------------------ |
| completeXAxisName      | false  | 是否使用完整的 x 轴名称                    |
| tooltipTypeSemple      | false  | 是否使用 dashboard 样式的 tooltip 显示方式 |

表配置项参数：

transformsTable 方法会接收两个参数，第一个是 sdv 数据结构，第二个是配置项

| transformsTable 配置项 | 默认值 | 含义         |
| ---------------------- | ------ | ------------ |
| hideNullValue          | true   | 是否消除空值 |
| mergeCells             | true   | 是否合并行列 |

专有名词解释：

| 数据源名称  | 解释                                                                                   |
| ----------- | -------------------------------------------------------------------------------------- |
| mockLine    | 标准的可视化数据结构                                                                   |
| sdvMock     | 标准的 sdv table 数据结构                                                              |
| options     | 标准的 echarts 配置项数据，可以直接用来生成 echarts 图（树图除外，由阿里 G6 引擎实现） |
| handsonData | 简易的 handson table 数据，用来生成 ynmdvgrid 表格                                     |

## 开发

本环境除了提供中间件使用说明，还是中间件开发环境，中间件源代码位于`src/common/libreries/yn-chart-middleware`中，通过入口`index.js`向外暴露 3 个方法。

本环境集成了 vue2，可以依赖`Charts.vue`组件完成图相关开发；表开发同理。

启动本地开发服务器：

```js
npm run serve
```

运行命令后会在本地启动一个服务，可以用来调试和开发中间件代码

## 打包

开发完毕后，需要打包中间件代码，执行以下命令：

```js
npm run build
```

打包后的中间件源代码在根目录下`build/`文件目录中，代码默认转换为 es5，并且压缩。

## 发布

打包后的中间件源码，需要发布到内网 npm 中，登录内网 npm 之后，使用`npm publish`命令即可发布中间件，每一次发版均需要修改`package.json`中的版本号信息，即`version`字段。在有重大更新的情况下，推荐修改大版本号，一般更新修改小版本号

发版帮助文档：
https://www.tapd.cn/65863259/markdown_wikis/show/#1165863259001002525

内部仓库地址：
http://192.168.12.28:4873

## 测试

1.中间件发布到 npm 后，可以下载 npm 包到本地，然后直接用包暴露出来的方法验证代码行为

2.本地代码测试暂未集成

## 注意事项

1.若无必要则不能新安装别的 npm 包 。

2.每个函数尽量不能超过 50 行，代码尽量保持高可读性。

3.任何一次代码合并提交均需 codereview

4.有任何问题请联系维护人员: guanhj@yuanian.com

## 处理流程图

图处理流程：

![图处理流程图](/img/图中间件逻辑梳理.jpg)

表处理流程：

![表处理流程图](/img/handson-table转换方法.jpg)

## 版本信息

[历史版本](./历史版本.md)
