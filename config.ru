require 'rubygems'
require 'bundler'
Bundler.require

require File.dirname(__FILE__)+"/app"
run Sinatra::Application
