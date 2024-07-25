import axios from 'axios';

const CONSUMER_API_BASE_URL = "https://exchange-btc.in:8080/api/v1/btc";

class ConsumerService {

    getConsumers(){
        return axios.get(CONSUMER_API_BASE_URL);
    }

    createConsumer(consumer){
        return axios.post(CONSUMER_API_BASE_URL, consumer);
    }

    getConsumerById(consumerId){
        return axios.get(CONSUMER_API_BASE_URL + '/' + consumerId);
    }

    updateConsumer(consumer, consumerId){
        return axios.put(CONSUMER_API_BASE_URL + '/' + consumerId, consumer);
    }

    deleteConsumer(consumerId){
        return axios.delete(CONSUMER_API_BASE_URL + '/' + consumerId);
    }
}

export default new ConsumerService()