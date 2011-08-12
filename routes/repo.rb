get '/repo/:u/:r/?' do
  content_type :json
  repo = {:user => params[:u], :repo => params[:r]}
  GitHub.analyze_repo(repo).to_json
end 

