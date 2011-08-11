require 'rubygems'
require './github'
require 'sinatra'
require 'haml'
require 'sass'

Dir["lib/**/*.rb"].each {|f| require "./#{f}"}
Dir['routes/*'].each { |r| require "./#{r}"}

helpers Sinatra::Partials

configure do
  set :haml, { :format => :html5 }
end

configure :development do
  require "sinatra/reloader"
end

configure :production do
  set :haml, { :ugly => true }
end

helpers do
  include Rack::Utils
  alias_method :h, :escape_html
end

get '/stylesheets/:name.css' do
  content_type 'text/css', :charset => 'utf-8'
  scss :"stylesheets/#{params[:name]}"
end

get "/" do
  haml :index
end

