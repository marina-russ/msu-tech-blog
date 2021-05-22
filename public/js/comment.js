const newComment = async (e) => {
  e.preventDefault();

  const id = document.querySelector('#post_id').value.trim();
  const body = document.querySelector('.comment-input').value.trim();

  if (body) {
    const response = await fetch(`/api/posts/${id}/comment`, {
      method: 'POST',
      body: JSON.stringify({ body }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.reload()
    }
  }
};

// add query selector from button
let confirmComment = document.querySelector('#confirm-comment');
if (confirmComment) {
  confirmComment.addEventListener('click', newComment)
};