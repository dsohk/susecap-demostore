require 'httparty'

SCHEDULER.every '2s', allow_overlapping: false do
  puts "Querying suse order processor"
  response = HTTParty.get("http://suse-order-processor.open-cloud.net/api/sales", headers: { 
      "Accept" => "application/json" 
    })
  puts "result: #{response}"

  visitors = response['count'].to_i
  revenue = response['total'].to_i
  achieved = (revenue.to_f / 10000.to_f * 100).to_i # achieved sales target
  
  puts "visitors: #{visitors}"
  puts "revenue: #{revenue}"
  puts "achieved (revenue / 10000) x 100% : #{achieved}"
  
  send_event('visitors',  current: visitors )
  send_event('revenue',  current: revenue )
  send_event('achieved',  value: achieved )
end