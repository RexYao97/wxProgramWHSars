// components/dailyData.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 传递过来的数据
    dailyTextContent:{
      type:Object
    }
  },
  // 监听数据变化
  observers:{
    dailyTextContent: function (dailyTextContent){
      console.log(dailyTextContent)
      this.getDate(dailyTextContent.updated_at)
      this.setIncr(dailyTextContent)
    }
  },
  data: {
    updateTime:'',
    incrData:{
      curedIncr: '',
      deadIncr: '',
      seriousIncr: '',
      suspectedIncr: '',
      confirmedIncr: ''
    }
  },
  
  /**
   * 组件的方法列表
   */
  methods: {
    // 设置数据
    setIncr(result){
      let data = this.getIncr(result)
      for (let [key, value] of Object.entries(data)){
        if(value > 0) {
          data[key] = `+${value}`
        }else {
          data[key] = `-${value}`
        }
      }
      this.setData({
        incrData:data
      })
    },
    // 获取需要的数据
    getIncr(result){
      let { curedIncr,
        deadIncr,
        seriousIncr,
        suspectedIncr,
        confirmedIncr } = result
      return {
        curedIncr,
        deadIncr,
        seriousIncr,
        suspectedIncr,
        confirmedIncr
      }
    },
    // 获取时间格式
    getDate(time){
      let date = new Date()
      date.setTime(time)
      this.setData({
        updateTime: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
      })
      // return `${date.getYear()}-${date.getMount() + 1}-${date.getDate()}`
    }
  }
})
