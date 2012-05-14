# extend Recent
module Recent
  def recent
    where(read: false).order("published_at DESC").limit(10)
  end
end
