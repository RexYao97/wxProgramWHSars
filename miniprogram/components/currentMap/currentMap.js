// components/currentMap/currentMap.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    visable:true
  },

  /**
   * 组件的方法列表
   */
  methods: {  
    setVisable(flag){
      this.setData({
        visable:flag
      })
    },
  }
})
