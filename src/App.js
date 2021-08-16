import './App.css';
//import axios from 'axios';
// import Razorpay from 'razorpay'

function App() {

  function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
}

  async function callRazorPay(){
  const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
    );

if (!res) {
    alert("Razorpay SDK failed to load. Are you online?");
    return;
}
var options = {
  "key": "rzp_test_BF94q4V2hIcsnd", // Enter the Key ID generated from the Dashboard

  "key_secret": 'ryb6YJ8vFQ69DiFF1n2TsfGQ',
  "amount": "500", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
  "currency": "INR",
  "name": "SAM Corp",
  "description": "Test Transaction",
  // "image": "https://example.com/your_logo",
  
  "handler": function (response){
      alert( `The Payment id is ${response.razorpay_payment_id}`);
  },
  "prefill": {
      "name": "SAM",
      "email": "samram@example.com",
      "contact": "9999999999"
  },
  "notes": {
      "address": "Razorpay Corporate Office"
  },
  "theme": {
      "color": "#3399cc"
  }
};

var rzp1 = new window.Razorpay(options);

rzp1.on('payment.failed', function (response){
  alert(response.error.code);
  alert(response.error.description);
  alert(response.error.source);
  alert(response.error.step);
  alert(response.error.reason);
  alert(response.error.metadata.order_id);
  alert(response.error.metadata.payment_id);
});
rzp1.open()

  }
  return (
    <div className="App">
       <h1>Test version of Razorpay Integration</h1>
        <p>Trusted seller with thousands of happy customers!</p>
        <button id="rzp-button1" onClick={callRazorPay}>Pay</button>
    </div>
  );
}

export default App;
