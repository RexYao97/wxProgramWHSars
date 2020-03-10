// 地图 svg数据
import geoJson from "./mapData";
// api 文件
import echarts from "../ec-canvas/echarts";
module.exports = {
  // 绘制操作
  initChart: function(canvas, width, height, seriesData) {
    const chart = echarts.init(canvas, null, {
      width: width,
      height: height
    });
    canvas.setChart(chart);
    echarts.registerMap("china", geoJson);

    const option = {
      tooltip: {
        trigger: "item",
        formatter:function(obj){
            return `${obj.data.name} 确诊人数：${obj.data.value}`
        },
        textStyle:{
            fontWeight:'bold',
            width:'30px'
        },
        position:function(point,dom,rect,size){
            let windowWidth =wx.getSystemInfoSync().windowWidth
            if(point[0]> windowWidth /2 ){
                return [parseInt(point[0]-size.width),point[1]]
            }else {
                return [point[0],point[1]]
            }
            
        }
      },
      visualMap: {
        min: 0,
        max: 34000,
        // splitNumber: 5,
        top: "top",
        pieces: [
          { min: 5001 }, // 不指定 max，表示 max 为无限大（Infinity）。
          { min: 3001, max: 5000 },
          { min: 1001, max: 3000 },
          { min: 101, max: 1000 },
          { min: 11, max: 100 },
          // {value: 123, label: '123（自定义特殊颜色）', color: 'grey'}, // 表示 value 等于 123 的情况。
          { max: 10 } // 不指定 min，表示 min 为无限大（-Infinity）。
        ],
        color: [
          "#c0e3e4",
          "#92bfc7",
          "#639aa9",
          "#35768c",
          "#06516e"
        ].reverse(),
        textStyle: {
          color: "#000",
          fontSize: 12
        }
      },
      textStyle: {
        color: "#ecf7f7"
      },

      series: [
        {
          type: "map",
          mapType: "china",
          label: {
            show: true,
            emphasis: {
              textStyle: {
                color: "#fff",
                fontSize: 8
              }
            },
            textStyle: {
              color: "#000",
              fontSize: 8
            },
            // formatter:function(value){
            //   console.log(value)
            //   if(value.value > 3000) {
            //     value.marker.style
            //   }
            // },
          },
          itemStyle: {
            normal: {
              borderColor: "#AAAAAA",
              areaColor: "#fff"
              //   fontSize:8,
            },
            emphasis: {
              areaColor: "#0000AA",
              borderWidth: 0
              //   fontSize:8,
            }
          },
          animation: false,

          data: seriesData
        }
      ]
    };
    chart.setOption(option);
    return chart;
  }
};
