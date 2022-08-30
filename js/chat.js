(async function () {
  // 首先验证是否登录，利用profile接口
  const resp = await API.profile();
  const userData = resp.data;
  if (!userData) {
    alert('请登录或登录已过期');
    location.href = './login.html';
    return;
  }

  const doms = {
    aside: {
      nickname: $('#nickname'),
      loginId: $('#loginId')
    },
    close: $('.close'),
    chatContainer: $('.chat-container'),
    txtMsg: $('#txtMsg'),
    sendBtn: $('.msg-container button'),
    msgContainer: $('.msg-container')
  }

  setUserInfo();
  await loadHistory();
  // 加载历史记录
  async function loadHistory() {
    const resp = await API.getHistory();
    // console.log(resp)
    for (const item of resp.data) {
      setChatList(item)
    }
    setScroll();
  }

  // 创建聊天记录
  /**
   content: "你叫什么？"
   createdAt: 1661582086775
   from: "liuying"
   to: null
   */
  function setChatList(chatInfo) {
    const div = $$$('div');
    div.classList.add('chat-item');
    if (chatInfo.from) {
      div.classList.add('me')
    }
    const img = $$$('img');
    img.className = 'chat-avatar';
    img.src = chatInfo.from ? './asset/avatar.png' : './asset/robot-avatar.jpg';

    const content = $$$('div');
    content.className = 'chat-content';
    content.innerText = chatInfo.content;

    const date = $$$('div')
    date.className = 'chat-date'
    date.innerText = formDate(chatInfo.createdAt);

    div.appendChild(img)
    div.appendChild(content)
    div.appendChild(date);

    doms.chatContainer.appendChild(div);
  }

  function formDate(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');
    const sec = date.getSeconds().toString().padStart(2, '0');

    return `${year}-${month}-${day} ${hour}:${minute}:${sec}`
  }

  // 设置滚动条放在聊天框底部
  function setScroll() {
    // console.log(doms.chatContainer.scrollHeight)
    doms.chatContainer.scrollTop = doms.chatContainer.scrollHeight
  }

  // 设置用户信息
  function setUserInfo() {
    doms.aside.nickname.innerText = userData.nickname;
    doms.aside.loginId.innerText = userData.loginId
  }

  /**
   * 2、交互事件
   */

  // 发送聊天
  async function sendChat() {
    const content = doms.txtMsg.value.trim();
    if (!content) {
      return;
    }
    // 先把用户发送的消息展现再聊天框
    setChatList({
      content: content,
      createdAt: Date.now(),
      from: userData.loginId,
      to: null
    })
    doms.txtMsg.value = ''; //清空聊天输入框
    setScroll(); //滚动到底部
    const resp = await API.sendChat(content);
    // 获得机器人回复再展示再聊天框
    setChatList({
      ...resp.data,
      from: null,
      to: userData.loginId
    })
    setScroll();

  }

  // 发送聊天事件
  doms.msgContainer.onsubmit = function (e) {
    e.preventDefault();
    sendChat();
  }
  doms.sendBtn.onclick = function () {
    sendChat();
  }

  // 注销用户登录
  doms.close.onclick = function () {
    API.loginOut();
    location.href = './login.html';
  }


  window.sendChat = sendChat;
})()