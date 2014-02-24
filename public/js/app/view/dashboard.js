define([
	'jquery',
	'underscore',
	'backbone',
	'collection/users',
	'view/dashboard/singleUser',
	'text!tpl/dashboard.html'
], function($, _, Backbone, Users, SingleUserView, tpl){
	return Backbone.View.extend({
		el: $('#main'),
		template: _.template(tpl),
		users: new Users(),
		render: function(){
			this.$el.html(this.template);
			this.users.fetch({
				success: function(users){
					for(var i=0; i<users.length; ++i){
						var tr = $('<tr>').appendTo('tbody');
						new SingleUserView({el: tr, model: users.models[i]}).render();
					}
				},
				error: function(){}
			});
		}
	});
});