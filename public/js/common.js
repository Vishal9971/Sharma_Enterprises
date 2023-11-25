const allLikeButton = document.querySelectorAll('.like-btn');

async function likeButton(productId,btn){
  try{
    let response = await axios({
      method:'post',
      url:`product/${productId}/like`,
      header:{'X-Requested-With':'XMLHttpRequest'},
    });
    if(btn.childern[0].classList.contains('fas')){
      btn.childern[0].classList.remove('fas');
      btn.childern[0].classList.add('far');
    }
    else{
      btn.childern[0].classList.remove('far');
      btn.childern[0].classList.add('fas');
    }
  }
  catch(e){
    window.location.replace('/login');
  }
}

for(let btn of allLikeButton){
  btn.addEventListener('click',()=>{
    let productId = btn.getAttribute('product-id');
    likeButton(productId,btn);
  })
}