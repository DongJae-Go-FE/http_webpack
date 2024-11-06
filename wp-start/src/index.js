import _ from "lodash";

function component() {
  var element = document.createElement("div");

  /* lodash is required for the next line to work */
  element.innerHTML = _.join(["Hello", "webpack"], " ");
  //굳이 로대시를 쓴 이유는? 로대시 그냥 문자열 넣은 거 보여줄려소
  //https://lodash.com/docs/4.17.15#join 한번 읽어봐

  return element;
}

document.body.appendChild(component());
