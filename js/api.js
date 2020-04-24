Vue.prototype.$http = axios;

Vue.component('loading-screen', {
  template: '<div id="loading"><div class="ball"></div><div class="ball1"></div><div>'
});

var vm = new Vue({
    el: '#app',
    data: function(){
        return {
            websites:[],
            isLoading: true
        };
    },
    methods: {
        getWebsites: function(){
            this.$http.get('https://api.mitchelldawkins.com/wp-json/wp/v2/websites')
                .then(function (response) {
                    vm.websites = response.data;
                }).then(function(r) {
                  $.getScript("https://mitchelldawkins.com/js/webflow.js", function(){
                      console.log("Script loaded and executed.");
                  });
                });
        }
    },
    mounted () {
        setTimeout(() => {
            this.isLoading = false
        }, 2000)
    }
});
vm.getWebsites();

var vm1 = new Vue({
    el: '#graphics_api',
    data: function(){
        return {
            graphics_left: [],
            graphics_middle: [],
            graphics_right: []
            }
    },
    methods: {
        getGraphics : function(){
        this.$http.get('https://api.mitchelldawkins.com/wp-json/wp/v2/graphics?per_page=4')
                .then(function (response) {
                    vm1.graphics_left = response.data;
                })
        },
        getGraphicsMiddle : function(){
        this.$http.get('https://api.mitchelldawkins.com/wp-json/wp/v2/graphics?offset=4&per_page=4')
                .then(function (response) {
                    vm1.graphics_middle = response.data;

                })
        },
        getGraphicsRight : function(){
        this.$http.get('https://api.mitchelldawkins.com/wp-json/wp/v2/graphics?offset=8&per_page=4')
                .then(function (response) {
                    vm1.graphics_right = response.data;
                })
        }

    }
});
vm1.getGraphics();
vm1.getGraphicsMiddle();
vm1.getGraphicsRight();
