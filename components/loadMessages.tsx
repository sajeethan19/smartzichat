export const loadMessages = async () => {
    const response = await fetch('https://staging-ng.smartzi.com/leap-node-twilio/messages/api')
    return response.json()
}