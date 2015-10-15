Pages = new Mongo.Collection("pages");
Posts = new Mongo.Collection("posts");

Meteor.methods({

  newPage: function(options) {
    Pages.insert(options);
  },

  removePage: function(id) {
    Pages.remove(id);
  },

  newPost: function(options) {
    Posts.insert(options);
  },

  removePost: function(id) {
    Posts.remove(id);
  }

});

if (Meteor.isClient) {

  // form block events

  Template.form.events({

    "submit form": function(event, template) {
      event.preventDefault();
      var data = template.data;
      var formId = template.find('form').id;
      var options = form2js(formId);

      if (!data.method) {
        console.log("You have to specify a method to call.");
        return;
      }

      if (_.isEmpty(options)) {
        console.log("error");
        return;
      }

      Meteor.call(data.method, options, function(error, response) {
        if (!error) {
          $('form').trigger('reset');
        }
      });

    }

  });

  // this is why blaze awesome

  Template.removeButton.events({
    "click": function(e, t) {

      if (!this.method) {
        console.log("You have to specify a method to call.");
        return;
      }

      var id = Template.parentData(1)._id;
      Meteor.call(this.method, id);
    }
  });

  // some template helpers can be accessed globally

  var helper = Template.registerHelper;

  helper('find', function(collectionName) {
    return window[collectionName].find({});
  });

}
