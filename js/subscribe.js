const form = document.getElementById('subscribeForm');

form.addEventListener('submit', async function (event) {
  event.preventDefault();
  const emailInput = document.getElementById('email');

  try {
    const response = await fetch('http://localhost:1337/api/subscriptions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          email: emailInput.value,
          subscriptionDate: new Date().toISOString(),
          status: true, 
        },
      }),
    });

    const result = await response.json();
    console.log('Email Input Value:', emailInput.value);  

    console.log(result); 

    if (response.ok) {
      emailInput.value = 'Thanks for submitting!';
      emailInput.setAttribute('disabled', 'true'); 
    } else {
      alert('Failed to subscribe. Please try again.');
    }
  } catch (error) {
    console.error('Error:', error);
  }
});


