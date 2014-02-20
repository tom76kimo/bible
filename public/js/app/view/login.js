define([
	'jquery',
	'underscore',
	'backbone',
	'bootstrap',
	'view/mainMessage',
	'text!tpl/login.html',
	'text!tpl/logged.html',
	'model/user',
	'model/website'
], function($, _, Backbone, bootstrap, MainMessage, tpl, loggedTpl, User, Website){
	return Backbone.View.extend({
		el: $('#login'),
		messageString: {
			BLANK_ID_PASSWORD: '帳號密碼不可以空白。',
			CHECK_ID_PASSWORD_CORRECTNESS: '<strong>注意!</strong>登入失敗，請檢查帳號密碼是否正確。',
			LOGIN_SUCCESS: '，您已經登入成功!!!',
			LOGOUT_SUCCESS: '您已經成功登出。'
		},
		initialize: function(){
			var self = this;
			this.mainMessage = new MainMessage();
			$.ajax({
				type: 'POST',
				async: false,
				url: '/logged',
				success: function(data){
					if(data.status === 1){
						var user = new User({_id: data.id});
						user.fetch({
							success: function(model, res, options){
								self.loggedRender(model.get('nickname') || model.get('username'));
								Website.setUser(model);
							},
							error: function(){
								self.render();
							}
						});
					}
					else
						self.render();
				}
			});
			/*
			$.post('/logged', function(data){
				if(data.status === 1){
					var user = new User({_id: data.id});
					user.fetch({
						success: function(model, res, options){
							self.loggedRender(model.get('nickname') || model.get('username'));
							Website.setUser(model);
						},
						error: function(){
							self.render();
						}
					});
				}
				else
					self.render();
			});*/
		},
		render: function(){
			var self = this;
			this.$el.html(_.template(tpl));
			this.$el.find('.navbar-form').keydown(function(event) {
				if(event.which === 13)
					self.login();
			});
			return this;
		},
		loggoutRender: function(){
			var self = this;
			this.fadeOut(function(){
				self.render().fadeIn();
			});
		},
		loggedRender: function(nickname){
			var self = this;
			//this.$el.animate({opacity: 0}, 400, changeContent);
			this.fadeOut(changeContent);
			function changeContent(){
				self.$el.html(_.template(loggedTpl, {nickname: nickname}));
				self.$('button').tooltip();
				self.$('a').tooltip();
				self.fadeIn();
			};
		},
		fadeOut: function(callback){
			this.$el.animate({opacity: 0}, 400, callback);
		},
		fadeIn: function(){
			this.$el.animate({opacity: 1}, 400);
		},
		events: {
			'click #loginBtn': 'login',
			'click #logout': 'logout'
		},
		login: function(){
			var userId = this.$('#userId').val(),
			    password = this.$('#password').val();

			if(userId === '' || password === ''){
				this.mainMessage.warning().render(this.messageString.BLANK_ID_PASSWORD);
				return;
			}
			var self = this;
			$.post('/login', {username: userId, password: password}, function(data){
				if(data.status === 1)
					hasLogged(data.id);
				else{
					self.mainMessage.danger().render(self.messageString.CHECK_ID_PASSWORD_CORRECTNESS);
				}
			}, 'json');

			function hasLogged(id){
				var user = new User({_id: id});
				user.fetch({
					success: function(model){
						Website.setUser(model);
						var nickname = model.get('nickname') || model.get('username');
						self.loggedRender(nickname);
						self.mainMessage.success().render('<strong>Hello!! ' + nickname + '</strong>' + self.messageString.LOGIN_SUCCESS);
					}
				});
			}
		},

		logout: function(){
			var self = this;
			$.post('/logout', {}, function(){
				Website.clearUser();
				self.loggoutRender();
				self.mainMessage.warning().render(self.messageString.LOGOUT_SUCCESS);
			});
		}
	});
});