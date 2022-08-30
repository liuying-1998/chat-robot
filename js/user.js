// 登录和注册的验证

/**
 * 对某一个表单项进行验证的构造函数
 */

class FieldValidator {
  /**
   * 构造器
   * @param {string} txtId 文本框的id
   * @param {function} validatorFun 验证规则函数，传入参数为文本框的值，有错误时返回错误信息，无错误返回空或null
   */
  constructor(txtId, validatorFun) {
    // 获取元素
    this.input = $('#' + txtId);
    this.p = this.input.nextElementSibling; //input的兄弟元素就是err的p元素
    this.validatorFun = validatorFun;
    // 失去焦点的时候验证
    this.input.onblur = () => {
      this.validate();
    }
  }
  // 验证方法，成功返回true，错误返回false
  async validate() {
    const err = await this.validatorFun(this.input.value)
    if (err) {
      this.p.innerText = err;
      return false;
    } else {
      this.p.innerText = '';
      return true;
    }
  }

  /**
   * 验证所有表单项
   * @param {FieldValidator[]} validators 
   */
  static async validate(...validators) {
    const proms = validators.map((v) => v.validate());
    const result = await Promise.all(proms);
    return result.every((r) => r);
  }
}


// var loginV = new FieldValidator('txtLoginId', function (val) {
//   if (!val) {
//     return '请填写账号'
//   }

// })
// var nicknameV = new FieldValidator('txtNickname', function (val) {
//   if (!val) {
//     return '请填写昵称'
//   }

// })

// function test() {
//   FieldValidator.validate(loginV, nicknameV).then((res) => {
//     console.log(res)
//   })
// }