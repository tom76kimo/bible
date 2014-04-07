define([
	'jquery',
	'underscore',
	'backbone',
	'model/article',
	'text!tpl/blog/article.html'
], function($, _, Backbone, Article, tpl){
	return Backbone.View.extend({
		el: $('#main'),
		template: _.template(tpl),
		initialize: function(options){
			this.article = new Article({_id: options.articleId});
		},
		render: function(){
			var self = this;
			var windowHeight = $(window).height();
			this.article.fetch({
				success: function(article){
					var content = markdown.toHTML(article.get('content'));
					var writeTime = self.getNowTime(article.get('writeTime'));
					self.$el.html(self.template({data: JSON.stringify(article), content: content, writeTime: writeTime}));
					this.$('.articleMain').height(windowHeight-50);
				}
			});
			
		},

		getNowTime: function(timestamp){
			var timestamp = parseInt(timestamp);
			var today = new Date(timestamp),
				dd = today.getDate(),
				mm = today.getMonth()+1,
				yyyy = today.getFullYear();

			switch(mm){
				case 1: 
					mm = 'Jan';
					break;
				case 2: 
					mm = 'Feb';
					break;
				case 3: 
					mm = 'Mar';
					break;
				case 4: 
					mm = 'Apr';
					break;
				case 5: 
					mm = 'May';
					break;
				case 6: 
					mm = 'Jun';
					break;
				case 7: 
					mm = 'Jul';
					break;
				case 8: 
					mm = 'Aug';
					break;
				case 9: 
					mm = 'Sep';
					break;
				case 10: 
					mm = 'Oct';
					break;
				case 11: 
					mm = 'Nov';
					break;
				case 12: 
					mm = 'Dem';
					break;
				default: 
					//dd = 'Jan';
					break; 
			}

			if(dd === 1)
				dd += 'st';
			else if(dd === 2)
				dd += 'nd';
			else if(dd === 3)
				dd += 'rd';
			else
				dd += 'th';
			return mm + ', ' + dd + ', ' + yyyy;
		}
	});
});