require 'rubygems'
require 'httparty'

class GitHub
  include HTTParty
  base_uri 'http://github.com/api/v2/yaml'
  
  API = {
    :search => '/repos/search/' 
  }

  def self.search(repo)
    search_repos(repo).reject {|r|
      r[:name]
    } 
  end
    
  private
  def self.search_repos(repo)
    self.get(API[:search]+repo)["repositories"]
  end
  
end

GitHub.search("jquery")
