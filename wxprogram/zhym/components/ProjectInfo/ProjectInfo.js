Component({
  options: {
    multipleSlots: true // 启用多slot支持
  },
  externalClasses: ['discount'],
  properties: {
    projectTitle: {
      type: String,
      value: ""
    },
    projectIntro: {
      type: String,
      value: ""
    },
    payPrice: {
      type: String,
      value: ""
    },
    originPrice: {
      type: String,
      value: ""
    }
  },
  data: {},
  methods: {
    _viewOrderDetail(){
      this.triggerEvent("orderDetail");
    }
  }
})