const loginV = new FieldValidator('txtLoginId', function (val) {
  if (!val) {
    return '请填写账号'
  }

})
const txtLoginPwdV = new FieldValidator('txtLoginPwd', function (val) {
  if (!val) {
    return '请填写密码'
  }

})

const form = $('.user-form');
form.onsubmit = async function (e) {
  e.preventDefault();
  const result = await FieldValidator.validate(
    loginV,
    txtLoginPwdV
  )
  if (!result) {
    return;
  }

  // 获取表单值
  const formData = new FormData(form);
  // console.log(Object.fromEntries(formData.entries()));
  const data = Object.fromEntries(formData.entries());
  // 发送注册请求
  const resp = await API.login(data);
  if (resp.code === 0) {
    alert('登录成功，跳转到首页');
    location.href = './index.html'
  } else {
    alert(resp.msg)
  }
}