class PostsController < ApplicationController

  def index
    @posts = Post.all.order(id: "DESC")
  end

  def create
    Post.create(content: params[:content])
    redirect_to action: :index
  end

  def checked
    #インスタンス生成
    #ルーティングの際にget 'posts/:id', to: 'posts#checked'で
    #pathパラメータにしてメモのIDが渡されるようにしている
    post = Post.find(params[:id])

    #既読か否か？を判定するプロパティ。trueだとすると…
    if post.checked
      #既読を解除するため、チェックを外してアップデート
      post.update(checked: false)
    else
      #elseつまり現在未読になっている場合、trueにして既読にする
      post.update(checked: true)
    end

    #更新後のレコードを取得し直す
    item = Post.find(params[:id])
    #JSON形式でJavascriptにデータを返す
    render json: { post: item }
  end

end
