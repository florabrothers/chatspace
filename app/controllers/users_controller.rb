class UsersController < ApplicationController

  def index
    @users = User.where('name Like ? AND id != ?', "%#{params[:keyword]}%", current_user.id).limit(7)
    respond_to do |format|
      format.html
      format.json
    end
  end

  def edit
  end

  def update
    user = User.find(params[:id])
      if user.id == current_user.id
        user.update(user_params)
        redirect_to root_path
      end
  end

  def destroy
    flash[:alert] = "ログインまたは登録が必要です"
    user = User.find(params[:id])
    sign_out user
    redirect_to new_user_session_path
  end

  private

  def user_params
    params.require(:user).permit(:name, :email)
  end

end
