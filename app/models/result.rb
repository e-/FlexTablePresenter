require 'json'

class Result < ApplicationRecord
  def parsed
    JSON.parse(json)
  end
end
