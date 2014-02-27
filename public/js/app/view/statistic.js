define([
	'jquery',
	'underscore',
	'backbone',
	'view/readPiece',
	'view/statisticPerson',
	'model/hasRead',
	'model/website',
	'model/statistic',
	'collection/hasReads',
	'text!tpl/statistic.html'
], function($, _, Backbone, ReadPieceView, StatisticPersonView, HasRead, Website, Statistic, HasReads, tpl){
	return Backbone.View.extend({
		el: $('#main'),
		template: _.template(tpl),
		render: function(){
			var self = this;
			//var this.users;
			var usersFinisher = $.Deferred(),
			    booksFinisher = $.Deferred();
			this.statistic = new Statistic();
			this.statistic.calculate(function(users){
				self.users = users;
				usersFinisher.resolve();
			});

			$.get('/books', function(data){
				self.books = data;
				booksFinisher.resolve();
			});

			$.when(usersFinisher, booksFinisher).done(function(){
				var showReadingButton = 0;
				if(Website.getUser())
					showReadingButton = 1;
				self.$el.html(self.template({showReadingButton: showReadingButton}));
				for(var i=0; i<self.users.length; ++i){
					var tr = $('<tr>').appendTo('#panel');
					new StatisticPersonView({el: tr, model: self.users.models[i], books: self.books}).render();
				}
			});	
		}
	});
});