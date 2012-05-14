# extend Recent
module Recent
  def recent
    where(read: false).order("published_at DESC")
  end
end
