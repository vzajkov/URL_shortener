class Link < ApplicationRecord
  before_save :link_shortener

  def link_shortener
    tail = self.url.split('/')[-1]
    alphabet = ("a".."z").to_a
    result = []
    tail.split("").each do |el|
     if alphabet.include?(el)
       result << alphabet.index(el)
     end
    end
    my_hash = result.reduce(:+).hash.to_s
    my_hash = my_hash[0...5] + my_hash[5..-1].to_i.to_s(36)
    self.shortened_url = "short_url" + my_hash
  end
end
