/**
 * PostController
 *
 * @description :: Server-side logic for managing Posts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
"use strict";
module.exports = {



  /**
   * `PostController.create()`
   */
  create: function (req, res) {

    let categoryName = req.param('category_name'),
       title = req.param('title'),
       content =req.param('content'),
       userId = req.param('user_id');

       if(!categoryName){
         return res.badRequest({err : 'invalid category_name'});
       }
        if(!title){
         return res.badRequest({err : 'invalid title'});
       }
        if(!content){
         return res.badRequest({err : 'invalid content'});
       }


       const makeRequest = async () =>{

         try {

           const category = await Category.create({name:categoryName});
           const post = await Post.create({
            title,content,
            _user :req.token.id,
            _category: category.id
          });

            return {post,category};

         }catch (err){
           throw err;
         }
       };


     makeRequest()
       .then(result => res.ok(result))
       .catch(err => res.serverError(err));

  },


  /**
   * `PostController.findOne()`
   */
  findOne: function (req, res) {

    let postId = req.params.id;

    if(!postId){
      return res.badRequest({err : 'invalid post_id'});
    }

    Post.findOne({
      id : postId
    })
      .populate('_category')
      .then(post => {
        res.ok(post);
      })
      .catch(err => res.notFound(err));

  },


  /**
   * `PostController.findAll()`
   */
  findAll: function (req, res) {

    Post.find()
      .populate('_category')
      .then(posts => {

        if(!posts || posts.length ===0){
          throw new Error('No post found');
        }
        return res.ok(posts);
      })
      .catch(err => res.notFound(err));

  },


  /**
   * `PostController.update()`
   */
  update: function (req, res) {

    let postId = req.params.id;
    let title = req.param('title'),
       content = req.param('content'),
       userId = req.param('user_id'),
       categoryId = req.param('category_id');

    let post = {};

    if(title){
      post.title = title;
    }
    if(content){
      post.content = content;
    }
    if(userId){
      post._user = userId;
    }
    if(categoryId){
      post._category = categoryId;
    }

     Post.update({id : postId},post)
       .then(post => {

         return res.ok(post[0]);
       })
       .catch(err => res.serverError(err));

  },


  /**
   * `PostController.delete()`
   */
  delete: function (req, res) {

    let postId = req.params.id;

    if(!postId){
      return res.badRequest({err : 'invalid post_id'});
    }

    Post.destroy({
      id : postId
    })
      .then(post => {

        res.ok(`Post has been deleted with ID ${postId}`);

      })
      .catch(err => res.serverError(err));

  }
};

