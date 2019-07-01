<template>
    <div id="MessageMain">
        <el-row>
          <el-col :xl="4" :lg="4" :xs="0">&nbsp;</el-col>

            <el-col :xl="4" :lg="4" :xs="24">
                <el-card style="height:75vh;">
                    <div>
                        <h3 style="text-align:center;"><span>联系人</span></h3>
                    </div>
                    <el-divider></el-divider>
                    <div v-for="user in users" :key="user.user_id">
                        <div class="message-slot" @click="clickUser(user)">
                          <el-badge :value="user.unread" v-if="user.unread !== '0'">
                            <el-avatar :src="imageUrlTemplate + user.avatar_key" size="small" style="vertical-align: middle;"></el-avatar>
                          </el-badge>
                          <el-avatar v-else :src="imageUrlTemplate + user.avatar_key" size="small" style="vertical-align: middle;"></el-avatar>
                            <span style="vertical-align:middle; padding-left:10px;">{{user.username}}</span>
                        </div>
                        <el-divider></el-divider>
                    </div>
                </el-card>
            </el-col>
            <el-col :xl="12" :lg="12" :xs="24">
                <el-card style="height:75vh; position: relative;">
                    <div class="message-box">
                        <div v-for="message in currentMessages" :key="message.id" style="width: 100%; padding-top:10px;">
                            <div v-if="message.is_self" style="width: 100%; text-align:right;">
                                <el-tag type="primary">
                                    <span>{{message.content}}</span>
                                </el-tag>
                            </div>
                            <div v-else style="width: 100%;">
                                <el-avatar :src="imageUrlTemplate + currentUser.avatar_key" size="small" style="vertical-align: middle;"></el-avatar>
                                <el-tag type="info">
                                    <span>{{message.content}}</span>
                                </el-tag>
                            </div>
                        </div>
                    </div>
                    <div class="message-input">
                        <el-input v-model="currentInput" autosize>
                            <el-button @click="sendMsg" type="info" slot="append"><i class="el-icon-s-promotion"></i><span>发送</span></el-button>
                        </el-input>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import {errorNotify, errorNotifyByResponse} from '../utils/error'
export default {
  name: 'MessageMain',
  data () {
    return {
      users: [],
      currentMessages: [],
      imageUrlTemplate: '/api/image?key=',
      currentInput: '',
      currentUser: {},
      messageApi: '/api/message',
      contactApi: '/api/message/contact'
    }
  },
  methods: {
    clickUser (user) {
      console.log(user)
      this.currentUser = user
      this.getMessages()
    },
    getMessages () {
      this.$http.get(this.messageApi, {params: {contact_id: this.currentUser.contact_id}}).then((response) => {
        if (response.body.code === 0) {
          var msgs = response.body.data.messages
          this.currentMessages = []
          for (var i = 0; i < msgs.length; i++) {
            this.currentMessages.push({
              id: msgs[i].id,
              content: msgs[i].content,
              is_self: msgs[i].to_id === this.currentUser.user_id
            })
          }
        } else {
          errorNotifyByResponse(this, response)
        }
      }).catch((response) => {
        console.log(response)
        errorNotify(this)
      })
    },
    sendMsg () {
      this.$http.post(this.messageApi, {
        contact_id: this.currentUser.contact_id,
        counterpart_id: this.currentUser.user_id,
        content: this.currentInput
      }).then((response) => {
        if (response.body.code === 0) {
          this.currentMessages.push({
            id: response.body.data.message_id,
            content: this.currentInput,
            is_self: true
          })
          this.currentInput = ''
        } else {
          errorNotifyByResponse(this, response)
        }
      }).catch((response) => {
        errorNotify(this)
      })
    }
  },
  created () {
    this.$http.get(this.contactApi).then((response) => {
      if (response.body.code === 0) {
        this.users = response.body.data.contacts
        console.log(response)
      } else {
        errorNotifyByResponse(this, response)
      }
    }).catch((response) => {
      console.log(response)
      errorNotify(this)
    })
  }
}
</script>

<style scoped>
.vertical-line {
    height: 75vh;
    width: 1px;
    vertical-align: middle;
    position: relative;
    background-color: #DCDFE6;
    display: inline-block;
    margin: 0 8px;
}

.h-line {
    width: 1px;
    background-color: rgb(7, 9, 14);
    margin: 0 2px;
    display: inline-block;
    position: relative;
}

.message-slot {
    cursor: pointer;
}

.message-box {
    height: 65vh;
}

.message-input {
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
}
</style>
