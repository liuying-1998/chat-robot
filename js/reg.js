const loginV = new FieldValidator('txtLoginId', function (val) {
  if (!val) {
    return '请填写账号'
  }

})
const nicknameV = new FieldValidator('txtNickname', function (val) {
  if (!val) {
    return '请填写昵称'
  }

})
const txtLoginPwdV = new FieldValidator('txtLoginPwd', function (val) {
  if (!val) {
    return '请填写密码'
  }

})
const txtLoginPwdConfirmV = new FieldValidator('txtLoginPwdConfirm', function (val) {
  if (!val) {
    return '请再次填写密码'
  }
  if (val !== txtLoginPwdV.input.value) {
    return '两次密码不一致'
  }

})

const form = $('.user-form');
form.onsubmit = async function (e) {
  e.preventDefault();
  const result = await FieldValidator.validate(
    loginV,
    nicknameV,
    txtLoginPwdV,
    txtLoginPwdConfirmV
  )
  if (!result) {
    return;
  }

  // 获取表单值
  const formData = new FormData(form);
  // console.log(Object.fromEntries(formData.entries()));
  const data = Object.fromEntries(formData.entries());
  // const data = {
  //   loginId: loginV.input.value,
  //   loginPwd: txtLoginPwdV.input.value,
  //   nickname: nicknameV.input.value
  // }
  // 发送注册请求
  const resp = await API.reg(data);
  if (resp.code === 0) {
    alert('注册成功');
    location.href = './login.html'
  } else {
    alert(resp.msg)
  }
}

function test() {
  FieldValidator.validate(loginV, nicknameV).then((res) => {
    console.log(res)
  })
}