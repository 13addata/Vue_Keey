<template>
  <div id="body" :class="{ hidden:showLogin}" v-cloak>
    <div class="headeradj"></div>
    <div class="pagetop">
      <div class="container">
        <div class="header"><img src="./assets/img/header.png"></div>
        <div class="search">
          <div class="searchbar">
            <!-- -----------Baidu---------- -->
            <form action="http://www.baidu.com/baidu" v-if="!google" v-clickoutside="iblur">
              <input :class="{ 'inputFocus':isF }" @click="ifocus" type="text" name=word placeholder="Get Started Here...">
              <button type="submit" class="fa fa-search" @click="ifocus"></button>
            </form>
            <!-- ----------Google---------- -->
            <form action="http://www.google.com/search" v-if="google" v-clickoutside="iblur">
              <input :class="{ 'inputFocus':isF }" @click="ifocus" type="text" name=q placeholder="Everything Starts Here...">
              <button type="submit" class="fa fa-search" @click="ifocus"></button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div class="pagebot">
      <div class="container">
        <table class="index-menu">
          <tr>
            <th>
              <span>Navgation</span>
              <a href="javascript:void(0);" class="conf-btn" @click.prevent="delseen=!delseen">
                <i class="fa fa-gear" title="manage shortcuts"></i>
              </a>
              <transition name="navtip">
                <ul class="navtip" v-if="delseen">
                  <li><a href="javascript:void(0);" @click.stop="showLogin=!showLogin"><i class="fa fa-user-circle navtip-icon"></i>Login</a></li>
                  <li><a href="javascript:void(0);" @click.prevent="tools=!tools">
                    <i class="fa fa-toggle-off navtip-icon" v-if="!tools"></i>
                    <i class="fa fa-toggle-on navtip-icon" v-if="tools"></i>TOOLS
                  </a></li>
                  <li><a href="javascript:void(0);" @click.prevent="others=!others">
                    <i class="fa fa-toggle-off navtip-icon" v-if="!others"></i>
                    <i class="fa fa-toggle-on navtip-icon" v-if="others"></i>OTHERS
                  </a></li>
                  <a href="javascript:void(0);" id="close" @click.prevent="delseen=!delseen"><i class="fa fa-times"></i></a>
                </ul>
              </transition>
            </th>
          </tr>
          <tr class="clearfloat" >
            <td>Favorite</td>
            <td v-for="(sc, index) in list" v-if="sc.group === 'Favorite'">
              <div class="menu-item">
                <a :href="sc.link" class="item-text" >
                  <img class="site-logo" :src="sc.icon">
                  <span>{{ sc.name }}</span>
                </a>
                <a href="javascript:void(0);" class="btn-delete fa fa-times" @click.prevent="del(index)" v-if="delseen"></a>
              </div>
            </td>
          </tr>
          <tr class="clearfloat" >
            <td>Social</td>
            <td v-for="(sc, index) in list" v-if="sc.group === 'Social'">
              <div class="menu-item">
                <a :href="sc.link" class="item-text" >
                  <img class="site-logo" :src="sc.icon">
                  <span>{{ sc.name }}</span>
                </a>
                <a href="javascript:void(0);" class="btn-delete fa fa-times" @click.prevent="del(index)" v-if="delseen"></a>
              </div>
            </td>
          </tr>
          <tr class="clearfloat" >
            <td>Academy</td>
            <td v-for="(sc, index) in list" v-if="sc.group === 'Academy'">
              <div class="menu-item">
                <a :href="sc.link" class="item-text" >
                  <img class="site-logo" :src="sc.icon">
                  <span>{{ sc.name }}</span>
                </a>
                <a href="javascript:void(0);" class="btn-delete fa fa-times" @click.prevent="del(index)" v-if="delseen"></a>
              </div>
            </td>
          </tr>
          <tr class="clearfloat">
            <td>News</td>
            <td v-for="(sc, index) in list" v-if="sc.group === 'News'">
              <div class="menu-item">
                <a :href="sc.link" class="item-text" >
                  <img class="site-logo" :src="sc.icon">
                  <span>{{ sc.name }}</span>
                </a>
                <a href="javascript:void(0);" class="btn-delete fa fa-times" @click.prevent="del(index)" v-if="delseen"></a>
              </div>
            </td>
          </tr>
          <tr class="clearfloat">
            <td>Entertainment</td>
            <td v-for="(sc, index) in list" v-if="sc.group === 'Entertainment'">
              <div class="menu-item">
                <a :href="sc.link" class="item-text" >
                  <img class="site-logo" :src="sc.icon">
                  <span>{{ sc.name }}</span>
                </a>
                <a href="javascript:void(0);" class="btn-delete fa fa-times" @click.prevent="del(index)" v-if="delseen"></a>
              </div>
            </td>
          </tr>
          <tr class="clearfloat" v-if="tools">
            <td>Tools</td>
            <td v-for="(sc, index) in list" v-if="sc.group === 'Tools'">
              <div class="menu-item">
                <a :href="sc.link" class="item-text" >
                  <img class="site-logo" :src="sc.icon">
                  <span>{{ sc.name }}</span>
                </a>
                <a href="javascript:void(0);" class="btn-delete fa fa-times" @click.prevent="del(index)" v-if="delseen"></a>
              </div>
            </td>
          </tr>
          <tr class="clearfloat" v-if="others">
            <td>Others</td>
            <td v-for="(sc, index) in list" v-if="sc.group === 'Others'">
              <div class="menu-item">
                <a :href="sc.link" class="item-text" >
                  <img class="site-logo" :src="sc.icon">
                  <span>{{ sc.name }}</span>
                </a>
                <a href="javascript:void(0);" class="btn-delete fa fa-times" @click.prevent="del(index)" v-if="delseen"></a>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div v-clickoutside="panelClose">
<!-- ===============PanelToggleButton=============== -->
      <a href="javascript:void(0);" @click.prevent="showPanel = !showPanel" class="panelbtn" id="enterbtn"><i class="fa fa-anchor" ></i></a>
<!-- ===============Panel================ -->
    
    <transition name="sidetrans">
      <div class="panel" v-show="showPanel">
      <div class="side-header">
        <h3><i class="fa fa-cog" style="color: #324b4e"></i>&nbsp SETTINGS</h3>
        <a href="javascript:void(0);" class="panelbtn" @click.prevent="showPanel = !showPanel"><i class="fa fa-times"></i></a>
      </div>

      <div class="side-menu">
        <div class="side-menu-title">Preference</div>
        <div class="side-menu-item clearfloat">
          <label>Use Google Search</label>
          <div class="switch-box">
                <a href="javascript:void(0);" class="slider" :class="{ on: google }" @click.prevent="google = !google"></a>
          </div>
        </div>
        <fieldset>
          <legend>Create A New Shortcut</legend>
            <span class="fa fa-globe">&nbsp&nbsp</span>
            <input type="text" placeholder="Enter website name" v-model="name">
            <br>
            <span class="fa fa-link">&nbsp&nbsp</span>
            <input type="text" placeholder="Enter website address" v-model="link" @focus="linkfill">

            <p class="tips">Tip: <br>The address must begins with 
              <b>"https://"</b> and ends with <b>"/"</b> or the icon will not be shown properly.</p><br>
            <p class="tips">Example: https://www.google.com/</p>
            <br>

            <select v-model="group" >
              <option value="void">--Select Group--</option>
              <option value="Favorite">Favorite</option>
              <option value="Social">Social</option>
              <option value="Academy">Academy</option>
              <option value="News">News</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Tools">Tools</option>
              <option value="Others">Others</option>
            </select>
            <br>
            <button id="btn-create" @click="createShortcut"><i class="fa fa-paper-plane"></i></button>
        </fieldset>
      </div>
      </div>
    </transition>
    </div>

    <!-- ===================Login================== -->
    <div v-clickoutside="loginClose">
      <transition name="logintrans">
        <div class="loginbox" v-if="showLogin">
          <h1>Keey</h1>
          <div class="login-input">
            <i class="fa fa-anchor"></i>
            <input type="text" placeholder="Username">
          </div>
          <div class="login-input">
            <i class="fa fa-lock"></i>
            <input type="text" placeholder="Password">
          </div>
          <a href="javascript:void(0);" class="btn-login"><i class="fa fa-check"></i></a>
        </div>
      </transition>
    </div>

    <!-- =================Login End================ -->
    <div class="logincover" v-if="showLogin"></div>
  </div>
</template>

<script>
export default {
    data () {
      return {
          name: '',
          link: '',
          group: 'void',
          tools: false,
          others: false,
          showPanel: false,
          delseen: false,
          showLogin: false,
          google: true,
          isF: false,
          switchBox: "switch-box-slider",
          list: [
          {
            name: 'Google',
            link: 'https://www.google.com/',
            icon: 'https://www.google.com/favicon.ico',
            group: 'Favorite'
          },
          {
            name: 'Baidu',
            link: 'https://www.baidu.com/',
            icon: 'https://www.baidu.com/favicon.ico',
            group: 'Favorite'
          },
          {
            name: 'Facebook',
            link: 'https://facebook.com/',
            icon: 'https://facebook.com/favicon.ico',
            group: 'Social'
          },
          {
            name: 'Twitter',
            link: 'https://twitter.com/',
            icon: 'https://twitter.com/favicon.ico',
            group: 'Social'
          },
          {
            name: 'Instagram',
            link: 'https://www.Instagram.com/',
            icon: 'https://www.Instagram.com/favicon.ico',
            group: 'Social'
          },
          {
            name: '博客园',
            link: 'https://www.cnblogs.com/',
            icon: 'https://www.cnblogs.com/favicon.ico',
            group: 'Academy'
          },
          {
            name: 'Segmentfault',
            link: 'https://www.segmentfault.com/',
            icon: 'https://www.segmentfault.com/favicon.ico',
            group: 'Academy'
          },
          {
            name: 'Vue.js',
            link: 'https://vuejs.org/v2/guide/',
            icon: 'https://vuejsexamples.com/favicon.ico',
            group: 'Academy'
          },
          {
            name: 'New York Times',
            link: 'https://www.nytimes.com/',
            icon: 'https://www.nytimes.com/favicon.ico',
            group: 'News'
          },
          {
            name: 'Youtube',
            link: 'https://www.youtube.com/',
            icon: 'https://www.youtube.com/favicon.ico',
            group: 'Entertainment'
          },
          {
            name: 'Netflix',
            link: 'https://www.netflix.com/',
            icon: 'https://www.netflix.com/favicon.ico',
            group: 'Entertainment'
          },
          ]
      }
  },
  methods : {
    panelClose() {
      this.showPanel = false
    },
    loginClose() {
      this.showLogin = false
    },
    linkfill() {
      this.link = 'https://'
    },
    createShortcut() {
      // var sc = { name: this.name, link: this.link, icon: this.link+"favicon.ico", group: this.group}
      // this.list.push(sc)
      // this.name = this.link =''
      if (this.group == 'void'){
        alert("Please select your group first!")
      }
      else {
        var sc = { name: this.name, link: this.link, icon: this.link+"favicon.ico", group: this.group}
        this.list.push(sc)
        this.name = this.link =''
      }
    },
    del(index) {
      this.list.splice(index,1);
    },
    ifocus() {
      this.isF = true
    },
    iblur() {
      this.isF = false
    },
  },
  directives: {        
    clickoutside:{            
      bind:function(el,binding,vnode){                
        function documentHandler(e){                    
          if(el.contains(e.target)){                        
            return false;                    
          }                    
          if(binding.expression){                        
            binding.value(e)                    
          }                
        }                
        el._vueClickOutside_ = documentHandler;                
        document.addEventListener('click',documentHandler);            
      },            
      unbind:function(el,binding){                
        document.removeEventListener('click',el._vueClickOutside_);                
        delete el._vueClickOutside_;            
      }        
    }    
  }
}

</script>

<style>
  @import 'assets/css/style.css';
  @import 'assets/css/fontAwesome.css';
</style>
