require 'rubygems'
require 'httparty'
require 'lingua/stemmer'
require 'json'

class GitHub
  include HTTParty
  base_uri 'http://github.com/api/v2'

  API = {
    :search => '/yaml/repos/search/',
    :commits => '/json/commits/list/',
    :repo => '/json/repos/show/'
  }

  def self.search_for_repo(repo)
    repos = []
    repos += search_repos(repo).map do |r|
      {:name => r[:name], :owner=> r[:owner]}
    end
    repos
  end

  def self.analyze_repo(repo)
    words = self.profanity_list
    commits_with_profanity = []
    word_count = {}

    commits = self.get_commits(repo)
    commits.each do |commit|
      commit[:message].split(" ").each do |word|
        word.downcase!
        word = Lingua::Stemmer.new.stem word
        if words.include?(word)
          word_count[word] ||= 0
          word_count[word] += 1
          commits_with_profanity << commit[:message]
        end
      end
    end
    {
      :commits_with_profanity => commits_with_profanity, 
      :ratio => "#{commits_with_profanity.size}/#{commits.size}", 
      :word_frequency => word_count
    }
  end

  private
  def self.search_repos(repo)
    self.get(API[:search]+repo)["repositories"]
  end

  def self.get_repository(repo)
    self.get(API[:repo]+"#{repo[:user]}/#{repo[:repository]}")["repository"]
  end

  def self.get_commits(repo)
    commits = []
    json = self.get(API[:commits]+"#{repo[:user]}/#{repo[:repo]}/master/?page")["commits"]
    commits += json.map do |commit|
      {:user => commit["committer"]["login"] != "" ? commit["committer"]["login"] : commit["committer"]["name"],
        :message => commit["message"],
        :date_time => commit["committed_date"]}
    end
    commits
  end

  def self.profanity_list
    words = []
    File.open('profanity.txt', 'r') do |file|
      words += file.gets.split(",")
    end
    words
  end

end
