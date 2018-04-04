Rails.application.routes.draw do
  root 'groups#index'
  devise_for :users
  resources :users
  resources :groups

end
