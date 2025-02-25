const accesskey = 'V2-4Amig-juZRn-aANvI-4augm-pyv3O-Hrtwr-Ey7GO-5JJjU';
const appid = 'da84c958-6f36-4579-af68-eee1c3bcb641';

function getBill(){
 const id = "53b26d95";
 const tablename = "bill";
 const action = 'Find';
 const userSettings = {'Option 1': "value1", 'Option 2': "value2"};
 const properties = {
    "Locale": "en-US",
    "Location": "47.623098, -122.330184",
    "Timezone": "Pacific Standard Time"
  };
  const body ={
    'Action': action,
    'Properties': properties,
    "Rows": [{"bill_id":id}]
  };
  const payload = JSON.stringify(body);
  // Values universal to AppSheet API calls
  const url = 'https://api.appsheet.com/api/v2/apps/'+appid+'/tables/'+tablename +'/Action';
  const method = 'post';
  const headers = {'ApplicationAccessKey': accesskey};

  const params = {
    'method': method,
    'contentType': 'application/json',
    'headers': headers,
    'payload': payload, 
    'muteHttpExceptions': true
  };
  const requestSimulate = UrlFetchApp.getRequest(url, params);
  let response
  try{
    response = UrlFetchApp.fetch(url, params);
  }
  catch(err){
    console.log('err: ' + err);
  }
  finally{
    console.log ('requestSimulate:');
    console.log (requestSimulate);
    console.log ('response: ' + response);
  }
  // Giả sử response của bạn đã được lưu trữ trong biến 'response'
    const data = JSON.parse(response);

    // Lấy các thẻ HTML
    const billIdElement = document.getElementById('bill-id');
    const banIdElement = document.getElementById('ban-id');
    const checkInElement = document.getElementById('check-in');
    const checkOutElement = document.getElementById('check-out');
    const discountElement = document.getElementById('discount');
    const totalElement = document.getElementById('total');
    const listFoodElement = document.getElementById('list-food');

    // Đổ dữ liệu vào các thẻ HTML
    billIdElement.textContent = data[0].bill_id;
    banIdElement.textContent = data[0].ban_id;
    checkInElement.textContent = data[0].check_in;
    checkOutElement.textContent = data[0].check_out;
    discountElement.textContent = data[0].discount;
    totalElement.textContent = data[0].total;
    listFoodElement.textContent = data[0].List_food;
}
window.addEventListener('load', function() {
        getBill();
      });
