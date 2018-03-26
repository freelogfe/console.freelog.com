# console.freelog.com

## 资源系统

### resource policy language
根据freelog的业务定义policy的语法，然后基于[antlr4](https://github.com/antlr/antlr4)词法分析器制定policy的语法解析规则。

具体规则查看[resource-policy-lang](https://github.com/freelogfe/resource-policy-lang)

### 资源

#### 资源组成要素

- 基础属性，包括资源描述、资源类型、资源内容（文件），当资源类型为``widget``时，属性需包括widget名，widget名必须跟web component widget里定义的component name一致。
- meta信息，描述资源自定义信息的JSON内容
- 资源策略，使用[resource-policy-lang](https://github.com/freelogfe/resource-policy-lang)描写资源的使用策略

#### 资源创建

| 输入项| 描述| 是否可更改|
| --- | --- | --- |
|资源描述||yes
|资源类型|除已有的选择列表项外，可自行定义资源类型，直接在输入框中输入即可|no
|widget名称|资源类型为widget时才出现。保持跟web component中的tag name一致|no
|资源文件|提交对应资源类型的文件|no
|meta信息|当资源类型为widget时。必须包含version属性，且version需符合[semver](https://semver.org/lang/zh-CN/)|yes
|资源策略|资源策略``更新``后，只针对后来的签约生效，已签约的则只会按老的资源策略执行|yes

widget和pagebuild这两种资源的创建与其他类型的资源存在一定的差异，下面单独写。

#### pagebuild资源开发
在console系统上创建资源，当选择资源类型为pagebuild时，会出现pagebuild的builder。pagebuilder支持源码模式和可视化拖拽模式开发pagebuild。组成pagebuild的widget不仅仅是当前资源作者，而是freelog全局的widget都可以用来搭建pagebuild。

#### widget资源开发
widget资源基于web component规范进行开发，是组成pagebuild的有机部分。

`` scaffold ``

使用脚手架freelog-cli快速生成开发widget的项目文件，提供widget的开发环境、代码构建。具体可查看[freelog-cli](https://github.com/freelogfe/freelog-cli)。


`` widget开发指南 ``

widget的开发可查看[widget开发指南](https://freelogfe.github.io/)

## 节点系统

### 节点
每个节点对应一个节点域名，创建节点时可自定义节点域名，类型类似xxxx.freelog.com。

节点组成要素

| 属性| 描述| 可否更改|
|---| ---|---|
| 节点名称| 描述节点，会作为页面的title进行展示| no
| 节点域名| 用户可通过节点域名来访问节点，域名格式xxxx.freelog.com| no

### presentable
presentable一定是属于某个节点的，主要作用是串连虚拟资源在资源作者-节点-用户的流转

presentable组成因素

- 资源，可在资源市场中找到需要签约的虚拟资源
- 资源合同，选择资源开发作者制定的合同策略进行签约，即可创建资源合同
- 使用策略(policy)，节点根据[presentable-policy-lang](https://github.com/freelogfe/presentable-policy-lang)的语法自定义面向普通用户的资源使用策略

## 分组系统
policy制定时，需要添加乙方，除了官方规定的`` nodes ``、`` public``、``REGISTERED_USERS``等特定写法外，用户可通过分组自定义乙方的组成。

### 创建分组

** 分组描述 ** 描述分组的内容，目前一旦创建后，描述不可更改

** 分组类型 ** 用户分组、节点分组，选择用户分组后，分组成员只能是用户，节点分组同理，只能是节点。

** 分组成员 ** 选择好分组类型后，可输入对应的userId或nodeId进行查询，然后进行选择。


### 查找
略，暂时默认直接展示所有分组。

### 更新
通过分组列表进入分组的管理面板，可对分组成员进行增减操作

