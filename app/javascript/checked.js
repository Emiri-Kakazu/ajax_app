function check() {
  /*要素1つずつに対して、『クリック』した際に動作するイベント駆動*/
  const posts = document.querySelectorAll(".post");
  posts.forEach(function (post) { 
    if (post.getAttribute("data-load") != null) {
      return null;
    }
    post.setAttribute("data-load", "true");
    post.addEventListener("click", () => { 
    /*getAttributeで属性を取得する、この場合はメモのidが取得できる*/
      const postId = post.getAttribute("data-id");
      /*変数XHRをオブジェクトとして生成する*/
      const XHR = new XMLHttpRequest();
      /*リクエストの詳細（順にHTTPメソッド、パス、非同期通信のON/OFF）を指定*/
    XHR.open("GET", `/posts/${postId}`, true);
      /*レスポンスの形式を指定*/
      XHR.responseType = "json";
      XHR.send();
      /*onloadは、レスポンスの受診が成功した時に呼び出されるイベントハンドラ */
      XHR.onload = () => {
        if (XHR.status != 200) {
          alert(`Error ${XHR.status}: ${XHR.statusText}`);
          return null;
        }
        /*レスポンスされてきたJSONにアクセスして取得、itemとして定義*/
        const item = XHR.response.post;
        if (item.checked === true) {
          post.setAttribute("data-check", "true");
        } else if (item.checked === false) {
          post.removeAttribute("data-check");
        }
      };
    });
  });
}
setInterval(check, 1000);