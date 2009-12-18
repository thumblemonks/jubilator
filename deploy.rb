set :to,          ENV['to'] || 'production'
set :application, "jubilator"
set :revision,    ENV['REV'] || 'origin/master'
set :timestamp,   Time.now.strftime("%Y%m%d%H%M%S")

# set :repository,  "git://github.com/#{user}/jubilator.git"
# set :deploy_to,   "/path/to/#{application}"
# host 'user@hostname', :db, :app
require "#{to}"

#
# Routine tasks

namespace :deploy do
  # remote_task :symlink_configs, :roles => :app do
  #   run "ln -nfs #{shared_path}/something #{latest_release}/something"
  # end
end

remote_task 'vlad:update_symlinks', :roles => :app do
  # Rake::Task['deploy:symlink_configs'].invoke
end

desc "Deploys the latest set of code (use this most often)"
task 'vlad:deploy' => ['vlad:update', 'vlad:cleanup']

#
# One time tasks

remote_task 'vlad:setup_app', :roles => :app do
  # run "mkdir #{shared_path}/something"
end
