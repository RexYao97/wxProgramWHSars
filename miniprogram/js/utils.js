
module.exports = {
  handleData(result, defaultDate) {
    // console.log(result,defaultDate)
    let res = [];
    // console.log(result)
    for (let item of (result)) {
      // console.log(item)
      let { name, en_name } = getTextName(defaultDate, item);
      if (name) {
        let data = item;
        let cities = [];
        if (data.cities.length < 1) {
          cities.push({
            cityName: data.provinceShortName,
            confirmedCount: data.confirmedCount,
            curedCount: data.curedCount,
            deadCount: data.deadCount,
            locationId: data.locationId,
            suspectedCount: data.suspectedCount
          });
        } else {
          cities = data.cities;
        }
        res.push({
          name,
          key: en_name,
          value: data.confirmedCount,
          cities: cities
        });
      }
    }
    return res;
  },
  async httpGet(tableName) {
    let MyTableObject = new wx.BaaS.TableObject(tableName);
    return await MyTableObject.count().then(async res => {
      return await MyTableObject.offset(res - 1)
        .find()
        .then(res => {
          return res.data.objects.pop();
        });
    });
  }
};
function getTextName(defaultDate, data) {
  for (let item of defaultDate) {
    // console.log(data.provinceShortName, item.name)
    if (data.provinceShortName === item.name) {
      // console.log(item)

      return {
        name: `${item.name}`,
        en_name: item.en_name
      };
    }
  }
  return false;
}
