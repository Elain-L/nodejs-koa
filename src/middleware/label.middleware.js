const { queryLabelByname, create } = require("../service/label.service");

const verifyLabelExists = async (ctx, next) => {
  //判断客户端传递过来的所有labels
  const { labels } = ctx.request.body;

  //2.判断，所有的label是否在label表里面
  //2.1这个数组用来存放，labelName和他的id
  const newLabelArr = [];
  try {
    for (const name of labels) {
      const result = await queryLabelByname(name);
      //用来存放，label的id名字
      const labelObj = { name };
      if (result) {
        //存在的话，获取name的id
        labelObj.id = result.id; //得到结果 => {name:"篮球"， id:"1"}
      } else {
        //不存在的话，添加，并且拿到对应id
        const inserResult = await create(name);
        labelObj.id = inserResult.insertId; // => {name:"安庆"， id:"47"}
      }
      //最后将这些对象放到数组里面
      // => [ {name:"篮球"， id:"1"},... ,{name:"安庆"， id:"47"} ]
      newLabelArr.push(labelObj);
    }
    //然后添加到ctx里面，进行下一步操作
    //console.log(newLabelArr);
    ctx.labels = newLabelArr;
  } catch (error) {
    console.log(error);
    ctx.body = {
      code: -1,
      message: "标签处理失败",
    };
  }

  await next();
};

module.exports = {
  verifyLabelExists,
};
