// Lấy chuỗi query từ URL
const queryString = window.location.search;

// Khởi tạo đối tượng URLSearchParams để xử lý tham số
const urlParams = new URLSearchParams(queryString);

// Lấy giá trị của một tham số cụ thể, ví dụ: "name"
const id = urlParams.get("id");
const accesskey = 'V2-4Amig-juZRn-aANvI-4augm-pyv3O-Hrtwr-Ey7GO-5JJjU';
const appid = 'da84c958-6f36-4579-af68-eee1c3bcb641';
// const id = "53b26d95";
function formatCurrency(amount) {
    // 1. Kiểm tra giá trị hợp lệ
    if (!amount) {
      return "Không có dữ liệu";
    }
  
    // 2. Chuyển đổi sang kiểu số (nếu có thể)
    let number = Number(amount);
    if (isNaN(number)) {
      return "Không hợp lệ";
    }
  
    // 3. Định dạng số theo tiền tệ
    return number.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }); // Hoặc 'en-US' cho đô la Mỹ
  }

async function getBill() {
 
  const tablename = "bill";
  const action = 'Find';
  const userSettings = { 'Option 1': "value1", 'Option 2': "value2" }; // Currently unused, but kept for consistency
  const properties = {
    "Locale": "en-US",
    "Location": "47.623098, -122.330184",
    "Timezone": "Pacific Standard Time"
  };
  const body = {
    'Action': action,
    'Properties': properties,
    "Rows": [{ "bill_id": id }]
  };
  const payload = JSON.stringify(body);

  const url = `https://api.appsheet.com/api/v2/apps/${appid}/tables/${tablename}/Action`; // Template literals for cleaner URL
  const method = 'POST'; // Uppercase for HTTP methods is generally preferred
  const headers = { 'ApplicationAccessKey': accesskey, 'Content-Type': 'application/json' }; // Include Content-Type

  try {
    const response = await fetch(url, {
      method: method,
      headers: headers,
      body: payload
    });

    if (!response.ok) {
      const errorText = await response.text(); // Get error details from the server
      throw new Error(`HTTP error ${response.status}: ${errorText}`); // Throw an error with details
    }

    const data = await response.json();
    console.log('Response data:', data);  // Log the successful response data

    // Now you have the data, you can update your HTML elements
    // Example (assuming you have elements with corresponding IDs):
    const billIdElement = document.getElementById('bill-id');
    const banIdElement = document.getElementById('ban-id');
    const checkInElement = document.getElementById('check-in');
    const checkOutElement = document.getElementById('check-out');
    const discountElement = document.getElementById('discount');
    const totalElement = document.getElementById('total');
    const subtotalElement = document.getElementById('subtotal');

    billIdElement.textContent = data[0].bill_id;
    banIdElement.textContent = data[0].ban_id;
    checkInElement.textContent = data[0].check_in;
    checkOutElement.textContent = data[0].check_out;
    subtotalElement.textContent =  formatCurrency(data[0].base_amount);
    discountElement.textContent = formatCurrency(data[0].discounted_amount);
    totalElement.textContent = formatCurrency(data[0].total);
    // ... update other elements similarly

  } catch (error) {
    console.error('Error fetching data:', error); // More informative error logging
    // Handle the error, e.g., display an error message on the page
    const errorElement = document.getElementById('error-message');
    if (errorElement) {
        errorElement.textContent = "Error fetching data. Please try again later.";
    }
  }
}
async function getDetailbill() {
 
    const tablename = "detail_bill";
    const action = 'Find';
    const userSettings = { 'Option 1': "value1", 'Option 2': "value2" }; // Currently unused, but kept for consistency
    const properties = {
      "Locale": "en-US",
      "Location": "47.623098, -122.330184",
      "Selector": `Filter(${tablename},[bill_id]=${id})`,
      "Timezone": "Pacific Standard Time"
    };
    const body = {
      'Action': action,
      'Properties': properties,
      "Rows": []
    };

    const payload = JSON.stringify(body);
    const url = `https://api.appsheet.com/api/v2/apps/${appid}/tables/${tablename}/Action`; // Template literals for cleaner URL
    const method = 'POST'; // Uppercase for HTTP methods is generally preferred
    const headers = { 'ApplicationAccessKey': accesskey, 'Content-Type': 'application/json' }; // Include Content-Type
  
    try {
      const response = await fetch(url, {
        method: method,
        headers: headers,
        body: payload
      });
  
      if (!response.ok) {
        const errorText = await response.text(); // Get error details from the server
        throw new Error(`HTTP error ${response.status}: ${errorText}`); // Throw an error with details
      }
  
      const data = await response.json();
      console.log('Response data:', data);
      const tableBody = document.getElementById('table-body');
      tableBody.innerHTML = ''; // Xóa dữ liệu cũ
      for (const item of data) {
        const row = tableBody.insertRow();

        const nameFoodCell = row.insertCell();
        const soLuongCell = row.insertCell();
        const donGiaCell = row.insertCell();
        const thanhTienCell = row.insertCell();

        nameFoodCell.textContent = item.name_food;
        soLuongCell.textContent = item.so_luong;
        donGiaCell.textContent = formatCurrency(item.don_gia);
        thanhTienCell.textContent = formatCurrency(item.thanh_tien);
      } 
       // Log the successful response data
      
      // Now you have the data, you can update your HTML elements
      // Example (assuming you have elements with corresponding IDs):
    //   const billIdElement = document.getElementById('bill-id');
    //   const banIdElement = document.getElementById('ban-id');
    //   const checkInElement = document.getElementById('check-in');
    //   const checkOutElement = document.getElementById('check-out');
    //   const discountElement = document.getElementById('discount');
    //   const totalElement = document.getElementById('total');
    //   const listFoodElement = document.getElementById('list-food');
  
    //   billIdElement.textContent = data[0].bill_id;
    //   banIdElement.textContent = data[0].ban_id;
    //   checkInElement.textContent = data[0].check_in;
    //   checkOutElement.textContent = data[0].check_out;
    //   discountElement.textContent = data[0].discount;
    //   totalElement.textContent = data[0].total;
    //   listFoodElement.textContent = data[0].List_food;
      // ... update other elements similarly
  
    } catch (error) {
      console.error('Error fetching data:', error); // More informative error logging
      // Handle the error, e.g., display an error message on the page
      const errorElement = document.getElementById('error-message');
      if (errorElement) {
          errorElement.textContent = "Error fetching data. Please try again later.";
      }
    }
  }


// Call the function to fetch the data when the page loads
document.addEventListener('DOMContentLoaded', function() {
  getBill();
  getDetailbill();
});  // Or 'load' if needed