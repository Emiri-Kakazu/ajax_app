function memo() {
/*submitをidで識別して、Javascript側で名前をつけている*/
  const submit = document.getElementById("submit");
  /*投稿ボタンをclickした際に実行されるイベントの関数 */
  submit.addEventListener("click", (e) => {
    /*FormDataは、フォームに入力された値を取得するオブジェクト。*/
    const formData = new FormData(document.getElementById("form"));
    /* XMLHttpRequest (XHR) は、JavaScriptなどのウェブブラウザ搭載のスクリプト言語でサーバとのHTTP通信を行うための、組み込みオブジェクト（API）である。
すでに読み込んだページからさらにHTTPリクエストを発することができ、ページ遷移することなしにデータを送受信できるAjaxの基幹技術である。
XMLHttpRequestを利用したWebアプリケーションは非常に多く存在し、例として、Google マップ、Facebookなどが挙げられる。   */
    const XHR = new XMLHttpRequest();
    /*openメソッドでリクエストの内容を引数へ追記する*/
    /*第一引数：HTTPメソッド、第二引数：パス、第三引数：非同期通信*/
    XHR.open("POST", "/posts", true);
    /*返却されるデータの形式をJSONに指定する*/
    XHR.responseType = "json";
    /*フォームデータを送信するオブジェクト*/
    XHR.send(formData);

    /*HTTPステータス200以外の時の処理*/
    XHR.onload = () => {
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      }
      /*レスポンスとして返却されたメモのレコードデータを取得*/
      const item = XHR.response.post;
      /*HTMLを描画する時に指定するのに使う「描画する親要素」のリストを取得する*/
      const list = document.getElementById("list");
      /*メモの入力フォームを取得（送信後に入力フォームの文字列を削除してもいいようにするため。
      非同期通信では画面の遷移がないため、文字が後に残らないようフォーム送信のつど削除する設定にしておく。）*/
      const formText = document.getElementById("content");

      /*メモとして描画する部分のHTMLを定義*/
      const HTML = `
        <div class="post" data-id=${item.id}>
          <div class="post-date">
            投稿日時：${item.created_at}
          </div>
          <div class="post-content">
          ${item.content}
          </div>
        </div>`;
      /*要素.insertAdjacentHTML("要素のどこに描画するか", 描画するHTML自体);*/
      list.insertAdjacentHTML("afterend", HTML);
      /*「メモの入力フォームに入力されたままの文字」はリセットされます。正確には、空の文字列に上書きされるような仕組みです。 */
      formText.value = "";
    };
    /*コントローラーのデフォルトの挙動（create）とJavaScriptの処理が重複するのを防ぐため、デフォルトのイベントを阻止する*/
    e.preventDefault();
  });
}
/* ページ読み込みのタイミングで関数を実行する*/
window.addEventListener("load", memo);