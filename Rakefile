require 'rubygems'

task "rackme" do
  require 'rack'
  Rack::Handler::Thin.run(Rack::Builder.app {
    map("/") {
      use(Rack::Static, :urls => ["/"], :root => "public")
      use(Rack::Lint)
    }
  })
end

begin
  require 'vlad' # But we really mean gabrielg-vlad
  require 'vlad/core'
  require 'vlad/git'
  require 'deploy.rb'
rescue LoadError => e
  puts "Unable to load Vlad the Deployer - #{e.message}."
end
