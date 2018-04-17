# This code was all jacked from the rack-cors github documentation.
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins '*' # Allow from anywhere
    resource '*',
      :headers => :any,
      :methods => %i(get post put patch delete options head)
  end
end