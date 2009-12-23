require 'rubygems'

task "rackup" do
  require 'rack'
  Rack::Handler::Thin.run(Rack::Builder.app {
    map("/") {
      use(Rack::Static, :urls => ["/"], :root => "public")
      use(Rack::Lint)
    }
  })
end

desc "Run less --watch on the .less files"
task "less:watch" do
  require 'less'
  options = { :watch => true, :source => "public/stylesheets/common.less",
    :compress => false, :debug => false, :growl => false, :timestamps => false, :color => STDOUT.tty? }
  Less::Command.new( options ).run! ? exit(0) : exit(1)
end

begin
  require 'vlad' # But we really mean gabrielg-vlad
  require 'vlad/core'
  require 'vlad/git'
  require 'deploy.rb'
rescue LoadError => e
  puts "Unable to load Vlad the Deployer - #{e.message}."
end
