desc 'Push source code to Github'
task :push do
  puts '* Pushing to Github'
  puts `git add .`
  puts `git commit -m "#{ENV['m']}" .`
  puts `git push origin master`
end

desc "Deploy to Heroku."
task :deploy do
   `git push heroku master`
end

desc 'Publish and sync'
  task :p => [:push, :deploy] do
end

