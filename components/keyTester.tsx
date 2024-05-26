export const keyTest = (key:string,authFunction:Function) => {

    const requestBody = {
            messaging_product: 'whatsapp',
            to: '94765572220',
            type: 'text',
            text: {
            "body": 'NEW LOGIN DETECTED WITH AUTH KEY'
            }
        };
    fetch(`${process.env.NEXT_PUBLIC_WHATSAPP_API_URL}`, {
        method: 'POST',
        headers: {
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    })
    .then((data) => {
        if (data.ok == true){
            authFunction(key)
        } else {
            authFunction('wrongKey')
        }
    })
}