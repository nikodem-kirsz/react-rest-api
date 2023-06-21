import axios from 'axios';

const requestConfig = {
    username: '90316-125',
    password: 'pfX0Y7A2TYAlZ571IKEO7AKoXza6YlvsP8kKvAu3',
    acceptType: 'application/json',
    contentType: 'application/json',
    authorization: 'Basic OTAzMTYtMTI1OnBmWDBZN0EyVFlBbFo1NzFJS0VPN0FLb1h6YTZZbHZzUDhrS3ZBdTM='
}

const sandboxUrl = 'https://api-sandbox.mysitoo.com/v2/accounts/90316/sites/1'

const endpoints = {
    users: {
        get: `${sandboxUrl}/users.json`,
        post: `${sandboxUrl}}/users.json`,
    },
    products: {
        get: `${sandboxUrl}/productgroups.json`,
        post: `${sandboxUrl}/productgroups.json`,
    }
}

const CORS_PROXY = 'http://localhost:8088'
const LIMIT_RECOURCES = 30

export const fetchProducts = async () => {
    try {
        const response = await axios.get(`${CORS_PROXY}/${endpoints.products.get}?num=${LIMIT_RECOURCES}',`, {
            auth: {
                username: requestConfig.username,
                password: requestConfig.password
            },
            headers: {
                Accept: requestConfig.acceptType,
                "Content-Type": requestConfig.contentType,
                "Authorization": requestConfig.authorization
            }
        });
        return response?.data.items
    } catch (error: any) {
        console.log('Error: ', error)
    }
}

export const fetchUsers = async () => {
    try {
        const response = await axios.get(`${CORS_PROXY}/${endpoints.users.get}?num=${LIMIT_RECOURCES}',`, {
            auth: {
                username: requestConfig.username,
                password: requestConfig.password
            },
            headers: {
                Accept: requestConfig.acceptType,
                "Content-Type": requestConfig.contentType,
                "Authorization": requestConfig.authorization
            }
        });
        return response?.data.items
    } catch (error: any) {
        console.log('Error: ', error)
    }
}

export const createUser = async (user: any) => {
    try {
        const response = await axios.post(`${CORS_PROXY}/${endpoints.users.post}`, user, {
            auth: {
                username: requestConfig.username,
                password: requestConfig.password
            },
            headers: {
                Accept: requestConfig.acceptType,
                "Content-Type": requestConfig.contentType,
                "Authorization": requestConfig.authorization
            }
        });
        return response?.data.items
    } catch (error: any) {
        console.log('Error: ', error)
    }
}