
export const sendMessage = (message:string,mobNumber:string,authKey:string) => {


  const requestBody = {
    messaging_product: 'whatsapp',
    to: mobNumber,
    type: 'text',
    text: {
      "body": message
    }
  };

  fetch(`${process.env.NEXT_PUBLIC_WHATSAPP_API_URL}`, {
    method: 'POST',
    headers: {
      'Authorization': `${authKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  })
  .catch(error => {
    console.error( error);
  });

  const data = {
    number: mobNumber,
    messageList : [
      {
        type: 'send',
        text: message
      }
    ]
  }
  fetch('https://staging-ng.smartzi.com/leap-node-twilio/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .catch(err => console.log(err))


};
  