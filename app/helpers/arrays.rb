class Arrays
  # Given an array and a block that returns results for some inputs and nils
  # for others (the partial function), returns an array with each element
  # transformed by the block, with the nils removed. i.e. the result array
  # contains only outputs where the function was defined for the input.
  def self.map_partial_function(array)
    result = []
    array.each do |item|
      processed = yield item 
      if not processed.nil?
        result.append processed
      end
    end

    result
  end
end
