Rails.application.routes.draw do

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :v1, defaults: { format: :json } do
    resources :links
  end

  root 'static_pages#root'
  get "/:shortened_url", to: "links#show"
end
