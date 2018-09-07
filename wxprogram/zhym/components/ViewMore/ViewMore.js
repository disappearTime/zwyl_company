Component({
  options: {
    multipleSlots: true // 启用多slot支持
  },
  externalClasses: ['margin_bot_10'], // 接受外部传入的样式类
  properties: {
    content : {
      type: String,
      value: ''
    }
  },
  data: {},
  methods: {
    _handleClick () { // 内部私有方法最好使用下划线开头
      // 触发点击回调 类似vue中的$emit
      this.triggerEvent("viewMore")
    }
  }
})