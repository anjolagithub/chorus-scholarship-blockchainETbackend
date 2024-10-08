import axios from 'axios';

const createBasename = async (userAddress, desiredName) => {
    try {
        const response = await axios.post('https://api.basenames.com/create', {
            address: userAddress,
            name: desiredName,
        }, {
            headers: {
                'Authorization': `Bearer YOUR_API_KEY`,
            },
        });
        console.log('Basename created:', response.data);
    } catch (error) {
        console.error('Error creating basename:', error);
    }
};

export { createBasename };