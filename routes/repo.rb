get '/repo/:r/?' do
  content_type :json
  GitHub.search_for_repo(params[:r]).to_json
end 

