import pic from '../imgs/pic.png';

function createAvatar() {
  var img = new Image()
  img.src = pic
  img.classList.add('avatar')

  var dom = document.getElementById('root')
  dom.append(img)
}

export {createAvatar}