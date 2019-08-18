require 'httparty'
SALES_TARGET = 30000

SCHEDULER.every '2s', allow_overlapping: false do
  puts "Querying suse order processor"
  response = HTTParty.get("http://suse-order-processor.open-cloud.net/api/sales", headers: {
      "Accept" => "application/json"
    })
  puts "result: #{response}"

  visitors = response['count'].to_i
  revenue = response['total'].to_i
  achieved = (revenue.to_f / SALES_TARGET.to_f * 100).to_i # achieved sales target
  achieved = achieved > 100 ? 100 : achieved

  puts "visitors: #{visitors}"
  puts "revenue: #{revenue}"
  puts "achieved (revenue / #{SALES_TARGET}) x 100% : #{achieved}"

  send_event('visitors',  current: visitors )
  send_event('revenue',  current: revenue )
  send_event('achieved',  value: achieved )


  puts "Query top customer"
  response = HTTParty.get("http://suse-order-processor.open-cloud.net/api/getTop/type/cust", headers: {
    "Accept" => "application/json"
  })
  puts "result: #{response}" # ["Derek So","30","Roger Brown","13","Roger B","4"]
  mylabels = []
  mydata = []
  response.each_slice(2) do |pair|
    mylabels << pair[0]
    mydata << pair[1]
  end

  send_event("bar-chart-customer", {
    type: "bar",
    header: "Top 3 Customers",
    labels: mylabels,
    colorNames: ["green", "yellow", "blue"],
    datasets: mydata
  })

  puts "Query top payment type"
  response = HTTParty.get("http://suse-order-processor.open-cloud.net/api/getTop/type/pay", headers: {
    "Accept" => "application/json"
  })
  puts "result: #{response}"
  mylabels = []
  mydata = []
  response.each_slice(2) do |pair|
    mylabels << pair[0]
    mydata << pair[1]
  end

  send_event("pie-chart-pay", {
    type: "pie",
    header: "Payment Methods",
    labels: mylabels,
    colorNames: ["green", "yellow", "blue"],
    datasets: mydata
  })

  puts "Query top product"
  response = HTTParty.get("http://suse-order-processor.open-cloud.net/api/getTop/type/item", headers: {
    "Accept" => "application/json"
  })
  puts "result: #{response}"
  mylabels = []
  mydata = []
  response.each_slice(2) do |pair|
    mylabels << pair[0]
    mydata << pair[1]
  end

  send_event("bar-chart-product", {
    type: "bar",
    header: "Top 3 Product",
    labels: mylabels,
    colorNames: ["green", "yellow", "blue"],
    datasets: mydata
  })

end
