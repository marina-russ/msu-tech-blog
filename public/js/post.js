const newPost = async (e) => {
  e.preventDefault();

  const title = document.querySelector('.post-input').value.trim();
  const body = document.querySelector('.post-body').value.trim();
  console.log(title, body)

  if (title && body) {
    const response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({ title, body }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/')
    } else {
      alert(response.statusText);
    }
  }
};

const deleteButton = async (e) => {

  const id = e.target.getAttribute('id');
  const response = await fetch(`/api/posts/${id}`, {

    method: 'DELETE',
  });

  if (response.ok) {
    document.location.replace('/')
  }
}
let confirmPost = document.querySelector('#confirm-post');
if (confirmPost) {
  confirmPost.addEventListener('click', newPost)
};

let deletePost = document.querySelector('.post-deleter');
if (deletePost) {
  deletePost.addEventListener('click', deleteButton)
};