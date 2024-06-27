import { camel, pascal } from "radash";

function template2Jsx(str) {
  // :variable="value" to variable={value}
  str = str.replace(/:([a-zA-Z0-9_]+)=["']([^"]+)["']/g, "$1={$2}");
  // {{ variable }} to { variable }
  str = str.replace(/{{ *([^}]+) *}}/g, "{$1}");
  // @event="xxx" to onEvent={xxx}
  str = str.replace(/@([a-zA-Z0-9_]+)=["']([^"]+)["']/g, (_, $1, $2) => `on${pascal($1)}={${$2}}`);

  return str;
}

function jsx2Template(str) {
  // variable={value} to :variable="value"
  str = str.replace(/([a-zA-Z0-9_]+)={ *([^}]+) *}/g, ':$1="$2"');
  // { variable } to {{ variable }}
  str = str.replace(/{([^}]+)}/g, "{{$1}}");
  // onEvent={xxx} to @event="xxx"
  str = str.replace(/on([a-zA-Z0-9_]+)=({ *([^}]+) *})/g, (_, $1, $2) => `@${camel($1)}="${$2}"`);

  return str;
}

const isJsx = (str) => {
  return /([a-zA-Z0-9_]+)={ *([^}]+) *}/g.test(str);
};

const isTemplate = (str) => {
  return /:([a-zA-Z0-9_]+)=["']([^"]+)["']/g.test(str);
};

// 判断使用哪个函数
function convert(str) {
  // 判断是否存在 :variable="value"
  if (isJsx(str)) {
    return template2Jsx(str);
  } else {
    return jsx2Template(str);
  }
}

const convertMethods = {
  template2Jsx,
  jsx2Template,
  convert,
};

export { convertMethods, isJsx, isTemplate, template2Jsx, jsx2Template, convert };
