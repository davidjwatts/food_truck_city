Rails.application.routes.draw do
  root 'angular#index'

  scope :api do
    scope :v1 do
      resources :reviews
    end
  end
end
