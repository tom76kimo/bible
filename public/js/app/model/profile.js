define([
	'underscore',
	'backbone'
], function(_, Backbone){
	return Backbone.Model.extend({
		idAttribute: "userId",
		urlRoot: '/profile',
		defaults: {
			userId: undefined,
			nickname: undefined,
			email: undefined,
			description: undefined
		}
	});
});