# extend Recent
module Recent
  def recent
    order("published_at DESC").limit(10)
  end
end
