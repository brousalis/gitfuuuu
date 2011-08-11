get '/search/:term/?' do
  content_type :json
  GitHub.search_for_repo(params[:term]).to_json
end 
