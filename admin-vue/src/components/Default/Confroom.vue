<template>
<div class="col-md-9">
<div class="panel panel-default my-panel">
    <div class="panel-heading">Conference room</div>
    <div class="panel-body">


    <div>{{userN}}</div>
    <div class="header">Select display name</div>
    <div class="content">
        <form id="login-form"  class="ui form">
            <div class="field">
                <label>Chat display name</label>
                <input name="displayname" type="text" v-model="user.displayName" value=""/>
            </div>
            <div class="field">
                <label>Gender</label>
                <select name="gender" v-model="user.gender">
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                </select>
            </div>
        </form>
        <div v-if="authErrors.length &gt; 0" class="ui error message">
            <ul>
                <li v-for="error in authErrors">{{error}}</li>
            </ul>
        </div>
    </div>
    <div class="actions">
        <button @click="submitLoginForm()" class="ui button primary">Join chat!</button>
    </div>
    <div class="ui fluid card">
        <!-- Header-->
        <div class="content">
            <div class="header">Chat<span v-if="user.authenticated" class="float-right">Logged on as:<i>{{user.displayName}}</i></span></div>
        </div>
        <!-- Content-->
        <div class="content">
            <div class="ui divided grid">
                <div class="row">
                    <!-- Sidebar heading-->
                    <div class="four wide column">
                        <h2 id="chat-sidebar-header">Online users</h2>
                    </div>
                    <!-- Active chat sessions menu-->
                    <div class="twelve wide column">
                        <div class="sessionMenuClass">
                            <a v-for="s in chatSessions" v-bind:class="{ 'active': activeChatSession.socketId == s.socketId }" @click="setActiveChatSession(s.socketId)" class="item">{{s.displayName}}
                            <div v-if="!s.online" class="offline"></div>
                                <i v-if="s.unread" class="comment icon unread-notification"></i>
                                <i @click="closeChatSession(s.socketId, $event)" class="remove icon close-session"></i></a>
                            <a v-if="chatSessions.length &lt; 1" class="item active">No active chat session</a></div>
                    </div>
                    <!-- User list sidebar-->
                    <div class="four wide column chat-sidebar">
                        <div v-if="onlineUsers.length &lt; 1" class="span">No online users</div>
                        <div id="chatUser" v-for="user in onlineUsers" @click="startChat(user)" class="ui left aligned green segment">{{user.displayName}}<i :class="user.genderClass"></i></div>
                    </div>
                    <!-- Main chat window-->
                    <div class="twelve wide column">
                        <div v-if="chat-msg-window" class="row message-window">
                            <div v-if="msg-window-content" class="div message-window-content">
                                <div v-for="message in activeChatSession.messages" class="chat-message">
                                    <div :class="{'contact': message.senderId != user.socketId, 'you': message.senderId == user.socketId}" class="ui raised segment"><span>{{message.content}}</span></div>
                                </div>
                            </div>
                        </div>
                        <div v-if="activeChatSession.socketId" class="">
                            <div class="ui form">
                                <div class="field">
                    <textarea id="message-input" rows="10" placeholder="Write something..." @keydown.enter="sendMessage($event)" v-model="messageContent"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>



    </div>
    </div>
    </div>

</template>

<script>
/* eslint-disable eqeqeq */

export default {

  data () {
    return {

      io: {},

      user: {
        authenticated: false,
        socketId: null,
        displayName: this.$store.getters.getName,
        // sessionPassword: null,
        name: '',
        gender: 'Male'
      },

      chatSessions: [],

      activeChatSession: {
        socketId: null,
        messages: []
      },

      onlineUsers: [],
      messageContent: '',

      authModalEl: null,
      authErrors: []

    }
  },

  mounted () {

    this.io = io('http://127.0.0.1:3000/')
    this.initChat()
    console.log('Chat compiled')
  },

  ready () {
    $('#auth-modal').modal()
    this.authModalEl = $('#auth-modal')
    this.authModalEl.modal('show')
  },

  methods: {

    initChat () {
      this.io.on('authError', (errors) => {
        for (let error of errors) {
          this.authErrors.push(error)
        }
      })

      this.io.on('authSuccess', (socketId) => {
        console.log('Logged in successfully')
        this.user.authenticated = true
        this.user.socketId = socketId
        this.authModalEl.modal('hide')
      })

      this.io.on('userListUpdate', (userList) => {
        this.onlineUsers = userList
        for (var user of this.onlineUsers) {
          user.genderClass = this.getGenderClass(user.gender)
        }
      })

      this.io.on('addUser', (user) => {
        user.genderClass = this.getGenderClass(user.gender)
        if (this.user.socketId != user.socketId) this.onlineUsers.push(user)
      })

      this.io.on('removeUser', (socketId) => {
        var userIndex = this.onlineUsers.findIndex(u => u.socketId == socketId)
        if (userIndex != -1) this.onlineUsers.splice(userIndex, 1)

        var activeSession = this.chatSessions.find(cs => cs.socketId == socketId)
        if (activeSession) activeSession.online = false
      })

      this.io.on('chatMessage', (msg) => {

        console.log('Received new chat message: ')
        console.log(JSON.stringify(msg))

        // Check if we have an active chat session with the sender
        var activeSession = this.chatSessions.find(cs => cs.socketId == msg.senderId)
        if (!activeSession) {
          this.addChatSession(msg.senderId, msg.senderDisplayName)
          activeSession = this.chatSessions[this.chatSessions.length - 1]
          if (!this.activeChatSession.socketId) {
            this.activeChatSession = activeSession
          }
        }

        if (this.activeChatSession.socketId != msg.senderId) {
          activeSession.unread = true
          activeSession.messages.push(msg)
        } else {
          this.addMsgToActiveChat(msg)
        }

      })
    },

    submitLoginForm () {

      console.log('Trying to log in user')
      this.authErrors = []
      this.io.emit('login', { displayName: this.user.displayName, gender: this.user.gender })
    },

    // Open chat session with user
    startChat (user) {
      var session = this.chatSessions.find(cs => cs.socketId == user.socketId)
      if (!session) {
        console.log('Starting new chat session with ' + user.displayName)
        this.addChatSession(user.socketId, user.displayName)
        session = this.chatSessions[this.chatSessions.length - 1]
      }
      this.activeChatSession = session
    },

    /** Send chat message from the textarea to the recipient **/
    sendMessage (e, socketId) {

      e.preventDefault()

      var msg = {
        content: this.messageContent,
        recipient: this.activeChatSession.socketId,
        senderId: this.user.socketId
      }

      this.addMsgToActiveChat(msg)
      this.messageContent = ''

      this.io.emit('sendMessage', msg)
    },

    addChatSession (socketId, displayName) {

      this.chatSessions.push({
        socketId: socketId,
        displayName: displayName,
        online: true,
        unread: false,
        messages: []
      })
    },

    setActiveChatSession (socketId) {
      console.log('Setting active session to ' + socketId)
      console.log(this.chatSessions[socketId])
      this.activeChatSession = this.chatSessions.find(cs => cs.socketId == socketId)
      this.activeChatSession.socketId = socketId
      this.activeChatSession.unread = false
      this.autoScroll()
    },

    closeChatSession (socketId, e) {

      e.stopPropagation()

      var sessionIndex = this.chatSessions.findIndex(cs => cs.socketId == socketId)
      if (this.activeChatSession.socketId == socketId) {
        this.activeChatSession = {
          socketId: null,
          messages: []
        }
      }
      if (sessionIndex != -1) this.chatSessions.splice(sessionIndex, 1)
      this.activeChatSession.socketId = null
    },

    addMsgToActiveChat (msg) {

      this.activeChatSession.messages.push(msg)
      this.autoScroll()
    },

    autoScroll () {

      // Not that pretty fix to allow the DOM to update before we autoscroll
      setTimeout(() => {
        this.$els.chatMsgWindow.scrollTop = this.$els.chatMsgWindowContent.scrollHeight
      }, 100)
    },

    getGenderClass (gender) {

      switch (gender) {
        case 'Male':
          return 'man'
        case 'Female':
          return 'woman'
        case 'Other':
          return 'other gender'
      }
    }
  },

  computed: {

    sessionMenuClass: function () {

      switch (this.chatSessions.length) {
        case 0:
        case 1:
          return 'one'
        case 2:
          return 'two'
        case 3:
          return 'three'
        case 4:
          return 'four'
        case 5:
          return 'five'
        case 6:
          return 'six'
      }
    },
    userN() {
        return this.$store.getters.getName;
    }
  },
  deactivated:{

  },
  activated:{

  },
  destroyed:{

  }
}
</script>




<style>


</style>
