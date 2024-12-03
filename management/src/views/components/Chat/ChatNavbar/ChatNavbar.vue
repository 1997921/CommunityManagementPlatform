<template>
  <div>
    <div class="home-TUIKit-navbar">
      <div class="navbar">
        <!--    头像      -->
        <div class="header">
          <div class="user-info">
            <div class="avatar-container" style="width: 36px; height: 36px; border-radius: 5px;">
              <img class="avatar-image" :src="$store.state.user.avatar">
              <div class="placeholder hidden skeleton-animation"></div>
            </div>
            <div class="user-info-main">
              <div class="TUI-profile">
                <div class="TUI-profile-basic">
                  <img class="TUI-profile-basic-avatar"
                       :src="$store.state.user.avatar"
                  >
                  <div class="TUI-profile-basic-info">
                    <div class="TUI-profile-basic-info-nick">{{$store.state.user.nickName}}</div>
                    <div class="TUI-profile-basic-info-id">
                      <div class="TUI-profile-basic-info-id-value">

                      </div>
                      <div class="TUI-profile-basic-info-id-label">
                        警号: {{$store.state.user.policeNumber}}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!--      下面不用的动      -->
        <div class="navbar-list">
          <div class="navbar-list-item navbar-list-item-selected">
            <div class="common-icon-container">
              <!-- <img class="common-icon" src="@/assets/images/chat/message-selected-65e48d26.svg"
                   style="width: 24px; height: 24px;"
              > -->
            </div>
          </div>
        </div>

<!--        <div class="footer">-->
<!--          <div class="setting">-->
<!--            <div class="common-icon-container">-->
<!--              <img  class="common-icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAAAXNSR0IArs4c6QAAAYNJREFUSEu9lj9qwzAUxp+cGExBgyGeizN4Sa5Q0NYTeCp0KXjzHXQHb4YugU4+QTdDr5AsHhI6J+BBUAxJ4/IMcv2vdkhjafGgp/dD3/fJEuGcawAAm82G4Hdo7Pf7os6yrHyoFucXi0VRRxDUB5GNh5r2gRFGXNeddDW5FNBc+xewE2SaZiHntSNN03NzbQu03ZoapUkex/HpGhBjbCqEQ+bzOqwGQrniOM4555OZbVPjeCwNzzKdAIgGm4JhVGp0nRx2O8E5/2aMkaqMJUhC0LOn55d3IPAAAF8AcKmMKNcd5PDxtnp9jKKoBitB6EsYhudbgjzP06RfBaiasFK6mU3bUg25RuFw+JVOVqOELZAQglBKMQyt5AxhcJ4xpskevSA5+R9Q19nqlM73/en9cllL3SW7yXSdfK7XIgiCE6auc0eO45AxwpAkSV7zSBmo4k0+qnRND0YPg7J4j3pgUTYlvyAEKfupVmGjXhMydUouPglTcpVL2M0fJ8qeW6oekD8c55BexcuwlQAAAABJRU5ErkJggg=="-->
<!--              style="width: 20px; height: 20px;"></div>-->
<!--          </div>-->
<!--        </div>-->

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatNavbar'
}
</script>

<style scoped>
.home-TUIKit-navbar {
  box-sizing: border-box;
  display: flex;
  height: 100%;
}

.navbar {
  box-sizing: border-box;
  width: 60px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 56px 0 17px;
  background: #e8e8e9;
  -webkit-user-select: none;
  user-select: none;
}

.navbar .header, .navbar .footer {
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.navbar .header .user-info {
  padding: 12px;
  position: relative;
  cursor: pointer;
}

.avatar-container {
  position: relative;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  flex: 0 0 auto;
}

.avatar-container .avatar-image {
  width: 100%;
  height: 100%;
}

.avatar-container .placeholder.hidden {
  opacity: 0;
}

.avatar-container .placeholder.skeleton-animation {
  animation: breath-ebee2d22 2s linear .3s infinite;
}

.avatar-container .placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #ececec;
  transition: opacity .3s, background-color .1s ease-out;
}

.navbar .header .user-info .user-info-main {
  /*width: 100%;*/
  display: none;
  position: absolute;
  min-width: 165px;
  max-width: 200px;
  top: 0;
  left: 100%;
  z-index: 5;
  padding: 14px 20px;
  border-radius: 0 4px 4px 0;
  background: #fff;
  box-shadow: 0 1px 10px #02102b26;
}

.TUI-profile {
  background: #ffffff;
  display: flex;
  flex-direction: column;
}

.TUI-profile-basic {
  width: 200px;
  display: flex;
  flex-direction: row;
}

.TUI-profile-basic-avatar {
  width: 40px;
  height: 40px;
  border-radius: 5px;
  margin-right: 10px;
}

.TUI-profile-basic-info {
  font-size: 14px;
}

.TUI-profile-basic-info-nick {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.TUI-profile-basic-info-id {
  display: flex;
  flex-direction: row;
  overflow: hidden;
}

.TUI-profile-basic-info-id-label {
  font-weight: 400;
  color: #999;
}

.TUI-profile-basic-info-id-value {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.navbar .navbar-list{
  box-sizing: border-box;
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;
}
.navbar .navbar-list .navbar-list-item{
  padding: 13px;
  cursor: pointer;
}
.common-icon-container{
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}
.navbar .navbar-list .navbar-list-item-selected{
  background: #ddd;
}
.navbar .navbar-list .navbar-list-item{
  padding: 13px;
  cursor: pointer;
}
.navbar .footer .setting{
  cursor: pointer;
  padding: 12px;
  position: relative;
  flex: 1;
}
.common-icon-container{
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}
.navbar .header .user-info:hover .user-info-main{
  display: block
}
</style>
