class GroupsController < ApplicationController

  # def index
  # end

  def new
    @group = current_user.groups.new
  end

  def create
    add_current_user
    @group = Group.new(group_params)
    if @group.save
      flash[:notice] = "グループを作成しました"
      redirect_to action: "show", id: @group.id
    else
      render "new"
    end
  end

  def show
    @users_group = current_user.groups
    redirect_to controller: "messages", action: "index"
  end

  def edit
  end

  def add_current_user
    params[:group][:user_ids].push(current_user.id.to_s)
  end

  private

  def group_params
    params.require(:group).permit(:name, user_ids: [])
  end

end
