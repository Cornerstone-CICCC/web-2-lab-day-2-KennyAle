$(function () {
  let userId = 1
  const fetchUserById = (userId) => {
    $.ajax({
      url: `https://dummyjson.com/users/${userId}`,
      type: 'GET',
      success: function (response) {
        $('.posts ul li').remove()
        $('.todos ul li').remove()
        createContent(response)
        fetchUserPosts(response.id)
        fetchUserTodos(response.id)
      }
    })
  }
  fetchUserById(userId)
  $('header button:first-child').on('click', () => {
    if (userId == 1) {
      userId = 31
    }
    userId--
    fetchUserById(userId)
  })
  $('header button:last-child').on('click', () => {
    if (userId == 30) {
      userId = 0
    }
    userId++
    fetchUserById(userId)
  })
  $('.posts').on('click', function() {
    $('.posts').children('ul').slideToggle()
  })
  $('.todos').on('click', function() {
    $('.todos').children('ul').slideToggle()
  })
})

const fetchUserPosts = (userId) => {
  $.ajax({
    url: `https://dummyjson.com/users/${userId}/posts`,
    type: 'GET',
    success: function (response) {
      createPosts(response)
    }
  })
}

const fetchUserTodos = (userId) => {
  $.ajax({
    url: `https://dummyjson.com/users/${userId}/todos`,
    type: 'GET',
    success: function (response) {
      createTodos(response)
    }
  })
}

const fetchPostsContent = (postId) => {
  $.ajax({
    url: `https://dummyjson.com/posts/${postId}`,
    type: 'GET',
    success: function (response) {
      $('.posts ul').append(`<li>
        <h4>${response.title}</h4>
        <p>${response.body}</p>
        </li>`)
      $('.posts ul li h4').on('click', () => {
        createModal(response)
      })
    }
  })
}

function createModal(response) {
  $('body').append(`
      <div class="overlay">
        <div class="modal">
          <h3>${response.title}</h3>
          <p>${response.body}</p>
          <p><i><b>Views: </b>${response.views}</i></p>
          <button>Close Modal</button>
        </div>
      </div>
    `)
  $('.modal button').on('click', () => {
    $('.overlay').remove()
    $('.modal').remove()
  })
}

function createPosts(data) {
  if (!data.posts.length == 0) {
    data.posts.forEach(post => {
      fetchPostsContent(post.id)
    })
  } else {
    $('.posts ul').html(`
    <li>This user has no posts</li>
    `)
  }
}

function createTodos(data) {
  if (!data.todos.length == 0) {
    data.todos.forEach(todo => {
      $('.todos ul').append(`
      <li>${todo.todo}</li>
      `)
    });
  } else {
    $('.todos ul').html(`
    <li>This user has no todos</li>
    `)
  }
}

function createContent(data) {
  $('.info__image img').attr('src', `${data.image}`)
  $('.info__content').html(`
    <h1>${data.firstName} ${data.lastName}</h1>
    <p><b>Age:</b> ${data.age} </p>
    <p><b>Email:</b> ${data.email}</p>
    <p><b>Phone:</b> ${data.phone}</p>
    `)
  $('.posts h3').html(`${data.firstName}'s Posts`)
  $('.todos h3').html(`${data.firstName}'s To Dos`)
}
