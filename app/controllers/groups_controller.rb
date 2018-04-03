class GroupsController < ApplicationController

  # def index
  # end

  def new
    @group = Group.new
  end

  def create
    @group = Group.new(group_params)
    if @group.save
      @user = User.find(current_user.id)
      @user.groups << Group.find(@group.id)
      flash[:notice] = "グループを作成しました"
      redirect_to action: "show", id: @group.id
    else
      render "new"
    end
  end

  def show
    @group = Group.all
    @users_group = current_user.groups.all
    redirect_to controller: "messages", action: "index"
  end

  def edit
  end

  private

  def group_params
    params.require(:group).permit(:name)
  end

end
