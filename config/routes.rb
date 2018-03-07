Rails.application.routes.draw do
  root 'welcome#index'

  resources :facilities, only: [:index, :show] do
    collection { post :search }
  end

  resources :search do
    collection {post :index}
  end

  # heartbeat page
  get 'heartbeat', to: 'heartbeat#show'
  get 'logout',   to: 'cals_base#logout'



  namespace :rfa do
    resources :a01 do
      resources :applicant, only: [:index, :create, :edit]
      resource :residence, only: [:show, :create, :edit]
      resources :packet
      resources :c01
    end
    resources :b01

  end
  #get 'geoservice', to: 'geoservice#show'
  resources :geoservice, only: [:create] do
    collection { post :validate }
  end
end
