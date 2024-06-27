const { convertMethods, Input, isJsx } = require("./core");

const TO_JSX = {
  title: "转换为JSX",
  description: "将template语法转换为JSX语法",
  key: "template2Jsx",
  icon: "", // 图标(可选)
};
const TO_TEMPLATE = {
  title: "转换为template",
  description: "将JSX语法转换为template语法",
  key: "jsx2Template",
  icon: "", // 图标(可选)
};
const selectList = [TO_JSX, TO_TEMPLATE];

const mainInput = new Input();

window.exports = {
  JsxAndTemplateConvert: {
    mode: "list",
    args: {
      // 进入插件应用时调用（可选）
      enter: (action, callbackSetList) => {
        mainInput.set(action.payload);
        if (isJsx(mainInput.get())) {
          callbackSetList([...selectList].reverse());
        } else {
          callbackSetList(selectList);
        }
      },
      // 子输入框内容变化时被调用 可选 (未设置则无搜索)
      search: (action, searchWord, callbackSetList) => {
        mainInput.set(searchWord);
        if (isJsx(searchWord)) {
          callbackSetList([...selectList].reverse());
        } else {
          callbackSetList(selectList);
        }
      },
      // 用户选择列表中某个条目时被调用
      select: (action, itemData) => {
        const key = itemData.key;
        const str = convertMethods[key](mainInput.get());
        const flag = window.utools.copyText(str);
        if (flag) {
          window.utools.showNotification("转换成功，并已复制到剪贴板");
          window.utools.hideMainWindow();
        } else {
          window.utools.showNotification("复制失败");
        }
      },
      // 子输入框为空时的占位符，默认为字符串"搜索"
      placeholder: "搜索",
    },
  },
};
