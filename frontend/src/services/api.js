import axios from 'axios'

export async function findCombinations(queensAmount) {
    let response = await axios.get(`http://127.0.0.1:8000/queen/combinations?queens=${queensAmount}`)
    return response.data
}
