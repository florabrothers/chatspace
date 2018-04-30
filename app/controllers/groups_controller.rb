class GroupsController < ApplicationController
before_filter :require_login

  def index
    @users_group = current_user.groups
  end

  def new
    @group = current_user.groups.new
  end

  def create
    add_current_user
    @group = Group.new(group_params)
    if @group.save
      flash[:notice] = "グループを作成しました"
      redirect_to action: :index
    else
      render "new"
    end
  end

  def show
    @users_group = current_user.groups
    redirect_to controller: "messages", action: "index"
  end

  def edit
    @group = current_user.groups.find(params[:id])
  end

  def update
    add_current_user
    @group = current_user.groups.find(params[:id])
    if @group.update group_params
      flash[:notice] = "グループを更新しました"
      redirect_to action: :index
    else
      render "edit"
    end
  end

  def add_current_user
    params[:group][:user_ids].push(current_user.id.to_s)
  end

  private

  def group_params
    params.require(:group).permit(:name, user_ids: [])
  end

  def require_login
    if user_signed_in?
      super
    else
      redirect_to new_user_session_path
    end
  end

end
