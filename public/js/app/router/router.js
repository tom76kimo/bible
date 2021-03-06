define([
	'jquery',
	'underscore',
	'backbone',
	'model/user',
	'model/statistic',
	'view/main',
	'view/login',
	'view/signUp',
	'view/setting',
	'view/read',
	'view/statistic',
	'view/statisticAllNet',
	'view/blog/main',
	'view/blog/new',
	'view/blog/article',
	'view/blog/edit',
	'view/dashboard',
	'view/profile',
	'view/achievement',
	'model/website'
], function($, _, Backbone, User, Statistic, MainView, LoginView, SignUpView, SettingView, ReadView, StatisticView, StatisticAllNetView, BlogView, BlogNewView, BlogArticleView, BlogEditView, DashBoardView, ProfileView, AchievementView, Website){
	return Backbone.Router.extend({
		initialize: function(){
			new LoginView();
			Website.navigate = this.navigate;
		},
		checkAuth: function(exec){
			var self = this;
			/*
			if(!Website.getUser())
				this.navigate('/', {trigger: true, replace: true});
			else
				exec && exec();*/

			$.post('/logged', function(data){
				if(data.status === 1){
					if(!Website.getUser()){
						var user = new User({_id: data.user._id});
						user.fetch({
							success: function(model, res, options){
								Website.setUser(model);
								exec && exec();
							},
							error: function(){
								self.navigate('/', {trigger: true, replace: true});
							}
						});
					}
					else
						exec && exec();
				}
				else
					self.navigate('/', {trigger: true, replace: true});
			});
		},
		routes: {
			'': 'welcome',
			'help': 'help',
			'fail': 'fail',
			'signUp': 'signUp',
			'success': 'success',
			'setting': 'setting',
			'read': 'read',
			'statistics': 'statics',
			'statistics/:netId': 'staticsByNet',
			'blog/main': 'blog',
			'blog/article/:id': 'showArticle',
			'blog/new': 'blogNew',
			'blog/edit/:id': 'blogEdit',
			'dashboard': 'dashboard',
			'profile/:id': 'profile',
			'achievement': 'achievement',
			'test': 'test'
		},
		welcome: function(){
			new MainView().render();
			//new LoginView().render();
		},
		setting: function(){
			var self = this;
			this.checkAuth(function(){
				if(!self.settingView)
					self.settingView = new SettingView().render();
				else
					self.settingView.render();
			});
		},
		help: function(){

		},
		fail: function(){
			console.log('fail');
		},
		success: function(){
			console.log('Good Job!');
		},
		signUp: function(){
			new SignUpView().render();
			//new LoginView().render();
		},
		read: function(){
			this.checkAuth(function(){
				new ReadView().render();
			});
		},
		statics: function(){
			new StatisticAllNetView().render();
		},
		staticsByNet: function(netId){
			if (netId === 'all') {
				new StatisticView().render();
			} else {
				new StatisticView().render(netId);
			}
		},
		blog: function(){
			new BlogView().render();
		},
		blogNew: function(){
			this.checkAuth(function(){
				new BlogNewView().render();
			});
		},
		blogEdit: function(id){
			this.checkAuth(function(){
				new BlogEditView({articleId: id}).render();
			});
		},
		showArticle: function(id){
			new BlogArticleView({articleId: id}).render();
		},
		dashboard: function(){
			this.checkAuth(function(){
				new DashBoardView().render();
			});
		},
		profile: function(id){
			new ProfileView({userId: id}).render();
		},
		achievement: function(){
			this.checkAuth(function(){
				new AchievementView().render();
			});
		},
		test: function () {
			$.get('/statisticData/Tom', function(data){
				console.log(data);
			}, 'json');
		}
	});
});