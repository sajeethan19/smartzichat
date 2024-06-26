
export const addContact = (mobNumber:string,authKey:string) => {
    const requestBody = {
      messaging_product: 'whatsapp',
      to: mobNumber,
      type: 'template',
      template: {
        "name": "hello_world",
        "language": {
            "code":"en_US"
        }
      }
    };
    console.log("first")

    fetch(`${process.env.NEXT_PUBLIC_WHATSAPP_API_URL}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })
    .then(data => {
      console.log( data)
    })
    .catch(error => {
      console.error( error);
    });
  };
  